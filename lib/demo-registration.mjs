import { createHash, createHmac, randomUUID } from "node:crypto";
import { INDUSTRIES, validateDemoRegistration } from "./demo-validation.mjs";

export { INDUSTRIES, validateDemoRegistration };

const MAX_BODY_BYTES = 8 * 1024;
const JSON_HEADERS = Object.freeze({
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
});

const ACCEPTED_MESSAGE =
  "If your request can proceed, we’ll send a secure iAcquireOS demo link to your work email.";

function jsonResponse(status, body, extraHeaders = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...extraHeaders },
  });
}

export function createRateLimiter({ limit = 5, windowMs = 60_000, now = Date.now } = {}) {
  const buckets = new Map();

  return function checkRateLimit(key) {
    const currentTime = now();
    const existing = buckets.get(key);

    if (!existing || currentTime >= existing.resetAt) {
      buckets.set(key, { count: 1, resetAt: currentTime + windowMs });
      return { allowed: true, retryAfter: 0 };
    }

    if (existing.count >= limit) {
      return {
        allowed: false,
        retryAfter: Math.max(1, Math.ceil((existing.resetAt - currentTime) / 1000)),
      };
    }

    existing.count += 1;
    return { allowed: true, retryAfter: 0 };
  };
}

const sharedLimiters = new Map();

function getSharedLimiter(limit, windowMs) {
  const key = `${limit}:${windowMs}`;
  if (!sharedLimiters.has(key)) {
    sharedLimiters.set(key, createRateLimiter({ limit, windowMs }));
  }
  return sharedLimiters.get(key);
}

export function createBackendSignature(timestamp, requestId, rawBody, secret) {
  const digest = createHmac("sha256", secret)
    .update(`${timestamp}.${requestId}.${rawBody}`, "utf8")
    .digest("hex");
  return `t=${timestamp},v1=${digest}`;
}

function isSameOriginRequest(request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    const parsedOrigin = new URL(origin);
    const requestOrigin = new URL(request.url).origin;
    if (parsedOrigin.origin !== requestOrigin || parsedOrigin.username || parsedOrigin.password) {
      return false;
    }
  } catch {
    return false;
  }

  const fetchSite = request.headers.get("sec-fetch-site");
  return !fetchSite || fetchSite === "same-origin";
}

async function readBodyLimited(request, maxBytes) {
  const announcedLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(announcedLength) && announcedLength > maxBytes) {
    return { tooLarge: true };
  }

  if (!request.body) return { text: "" };
  const reader = request.body.getReader();
  const chunks = [];
  let byteLength = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > maxBytes) {
        await reader.cancel();
        return { tooLarge: true };
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(byteLength);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return { text: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
}

function parsePositiveInteger(value, fallback, max) {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, max) : fallback;
}

function safeBackendUrl(value, isProduction) {
  try {
    const url = new URL(value);
    const localHttp =
      !isProduction &&
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1");
    if (url.username || url.password || (url.protocol !== "https:" && !localHttp)) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function getMarketingOrigin(request, env) {
  const requestOrigin = new URL(request.url).origin;
  if (env.NODE_ENV !== "production") return requestOrigin;

  try {
    const configured = new URL(env.NEXT_PUBLIC_SITE_URL ?? "");
    if (configured.protocol !== "https:" || configured.origin !== requestOrigin || configured.username || configured.password) {
      return null;
    }
    return configured.origin;
  } catch {
    return null;
  }
}

function cleanText(value, maxLength) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function safeIpKey(request) {
  // Deployment must overwrite x-real-ip at a trusted edge. The platform must
  // enforce its own distributed rate limit because this in-memory guard resets.
  const address = request.headers.get("x-real-ip")?.trim() || "unknown";
  return createHash("sha256").update(address).digest("hex");
}

function isUuid(value) {
  return typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function backendRequestId(value) {
  if (isUuid(value)) return value.replaceAll("-", "");
  if (typeof value === "string" && /^[A-Za-z0-9_-]{16,64}$/.test(value)) return value;
  return randomUUID().replaceAll("-", "");
}

function localFieldErrors(fields = {}) {
  const names = {
    name: "fullName",
    email: "email",
    business: "businessName",
    industry: "industry",
    consent: "consent",
  };
  return Object.fromEntries(
    Object.entries(fields)
      .filter(([key, message]) => Object.hasOwn(names, key) && typeof message === "string")
      .map(([key, message]) => [names[key], message]),
  );
}

function readRetryAfter(headers) {
  const seconds = Number.parseInt(headers.get("retry-after") ?? "", 10);
  return Number.isInteger(seconds) && seconds > 0 ? Math.min(seconds, 3600) : null;
}

const UNAVAILABLE_MESSAGE =
  "Demo registration is temporarily unavailable. Please try again later or contact Argel.";

export async function handleDemoRegistrationRequest(request, options = {}) {
  const env = options.env ?? process.env;
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;

  if (request.method !== "POST") {
    return jsonResponse(405, { message: "Use POST to request demo access." }, { Allow: "POST" });
  }

  if (!isSameOriginRequest(request)) {
    return jsonResponse(403, { message: "This request could not be processed. Refresh and try again." });
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return jsonResponse(415, { message: "This request could not be processed. Refresh and try again." });
  }

  const bodyResult = await readBodyLimited(request, MAX_BODY_BYTES);
  if (bodyResult.tooLarge) {
    return jsonResponse(413, { message: "This request is too large. Please try again." });
  }

  let input;
  try {
    input = JSON.parse(bodyResult.text);
  } catch {
    return jsonResponse(400, { message: "Check the required fields and try again." });
  }

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return jsonResponse(400, { message: "Check the required fields and try again." });
  }

  const validation = validateDemoRegistration(input);
  if (!validation.success) {
    return jsonResponse(400, {
      message: "Check the required fields and try again.",
      fieldErrors: validation.fieldErrors,
    });
  }

  const limit = parsePositiveInteger(env.DEMO_RATE_LIMIT_MAX, 5, 60);
  const windowMs = parsePositiveInteger(env.DEMO_RATE_LIMIT_WINDOW_MS, 60_000, 3_600_000);
  const limiter = options.rateLimiter ?? getSharedLimiter(limit, windowMs);
  const limitResult = limiter(safeIpKey(request));
  if (!limitResult.allowed) {
    return jsonResponse(
      429,
      { message: "Too many attempts. Please wait a moment and try again." },
      { "Retry-After": String(limitResult.retryAfter) },
    );
  }

  const mode = env.DEMO_REGISTRATION_MODE?.trim() || "backend";
  if (mode === "mock") {
    if (env.NODE_ENV === "production") {
      return jsonResponse(503, { ok: false, message: UNAVAILABLE_MESSAGE });
    }
    return jsonResponse(202, {
      ok: true,
      mode: "mock",
      message: "Local mock registration accepted. No email was sent.",
    });
  }

  if (mode !== "backend") {
    return jsonResponse(503, { ok: false, message: UNAVAILABLE_MESSAGE });
  }

  const endpoint = safeBackendUrl(env.IACQUIREOS_DEMO_REGISTER_URL, env.NODE_ENV === "production");
  const secret = env.IACQUIREOS_BACKEND_SIGNING_SECRET;
  if (!endpoint || typeof secret !== "string" || Buffer.byteLength(secret) < 32) {
    return jsonResponse(503, { ok: false, message: UNAVAILABLE_MESSAGE });
  }

  const requestId = backendRequestId(request.headers.get("idempotency-key"));
  const forwarded = JSON.stringify({
    name: validation.data.fullName,
    email: validation.data.email,
    business: validation.data.businessName,
    industry: validation.data.industry,
    consent: validation.data.consent,
    marketingOptIn: validation.data.marketingOptIn,
    utm_source: "marketing-website",
    company_website: cleanText(input.company_website, 200),
  });
  const timestamp = String(Math.floor((options.now?.() ?? Date.now()) / 1000));
  const signature = createBackendSignature(timestamp, requestId, forwarded, secret);
  const timeoutMs = parsePositiveInteger(env.DEMO_REGISTRATION_TIMEOUT_MS, 13_000, 15_000);
  const origin = getMarketingOrigin(request, env);
  if (!origin) return jsonResponse(503, { ok: false, message: UNAVAILABLE_MESSAGE });

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "IACQUIREOS-Request-Id": requestId,
    "IACQUIREOS-Timestamp": timestamp,
    "IACQUIREOS-Signature": signature,
    Origin: origin,
  };

  let upstream;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      upstream = await fetchImpl(endpoint, {
        method: "POST",
        redirect: "error",
        cache: "no-store",
        headers,
        body: forwarded,
        signal: AbortSignal.timeout(timeoutMs),
      });
      break;
    } catch {
      // The backend's replay ledger accepts the same request id and exact body without sending a second email.
      if (attempt === 1) return jsonResponse(503, { ok: false, message: UNAVAILABLE_MESSAGE });
    }
  }

  if (!upstream) return jsonResponse(503, { ok: false, message: UNAVAILABLE_MESSAGE });
  if (upstream.status === 409) {
    return jsonResponse(409, {
      ok: false,
      message: "We could not safely confirm this request. Refresh the page and try again.",
    });
  }

  if (upstream.status === 422) {
    const result = await upstream.json().catch(() => null);
    return jsonResponse(422, {
      ok: false,
      message: "Check the highlighted fields and try again.",
      fieldErrors: localFieldErrors(result?.fields),
    });
  }

  if (upstream.status === 429) {
    const retryAfter = readRetryAfter(upstream.headers);
    return jsonResponse(
      429,
      { ok: false, message: "Too many attempts. Please wait a moment and try again." },
      retryAfter ? { "Retry-After": String(retryAfter) } : {},
    );
  }

  if (upstream.status !== 202) {
    const retryAfter = upstream.status === 503 ? readRetryAfter(upstream.headers) : null;
    return jsonResponse(
      503,
      { ok: false, message: UNAVAILABLE_MESSAGE },
      retryAfter ? { "Retry-After": String(retryAfter) } : {},
    );
  }

  const result = await upstream.json().catch(() => null);
  if (!result || result.ok !== true) {
    return jsonResponse(503, { ok: false, message: UNAVAILABLE_MESSAGE });
  }

  return jsonResponse(202, { ok: true, mode: "backend", message: ACCEPTED_MESSAGE });
}
