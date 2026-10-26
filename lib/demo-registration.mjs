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
  "Check your email. We’ve sent you a secure link to access your personalized iAcquireOS demo.";

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

export function createBackendSignature(timestamp, body, secret) {
  return `sha256=${createHmac("sha256", secret).update(`${timestamp}\n${body}`).digest("hex")}`;
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

  if (cleanText(input.website, 200)) {
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
      return jsonResponse(503, {
        message: "Demo registration is temporarily unavailable. Please try again later or contact Argel.",
      });
    }
    return jsonResponse(202, {
      status: "accepted",
      mode: "mock",
      message: "Local mock registration accepted. No email was sent.",
    });
  }

  if (mode !== "backend") {
    return jsonResponse(503, {
      message: "Demo registration is temporarily unavailable. Please try again later or contact Argel.",
    });
  }

  const endpoint = safeBackendUrl(env.IACQUIREOS_DEMO_REGISTER_URL, env.NODE_ENV === "production");
  const secret = env.IACQUIREOS_BACKEND_SIGNING_SECRET;
  if (!endpoint || typeof secret !== "string" || Buffer.byteLength(secret) < 32) {
    return jsonResponse(503, {
      message: "Demo registration is temporarily unavailable. Please try again later or contact Argel.",
    });
  }

  const idempotencyKey = isUuid(request.headers.get("idempotency-key"))
    ? request.headers.get("idempotency-key")
    : randomUUID();
  const forwarded = JSON.stringify({
    ...validation.data,
    source: "marketing-website",
  });
  const timestamp = String(Math.floor((options.now?.() ?? Date.now()) / 1000));
  const signature = createBackendSignature(timestamp, forwarded, secret);
  const timeoutMs = parsePositiveInteger(env.DEMO_REGISTRATION_TIMEOUT_MS, 8_000, 15_000);
  const origin = new URL(request.url).origin;

  try {
    const upstream = await fetchImpl(endpoint, {
      method: "POST",
      redirect: "error",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-IAcquire-Timestamp": timestamp,
        "X-IAcquire-Signature": signature,
        "Idempotency-Key": idempotencyKey,
        Origin: origin,
      },
      body: forwarded,
      signal: AbortSignal.timeout(timeoutMs),
    });

    // Duplicate/existing requests deliberately receive the same public result.
    if (upstream.status === 409) {
      return jsonResponse(202, { status: "accepted", mode: "backend", message: ACCEPTED_MESSAGE });
    }

    if (upstream.status === 429) {
      const retryAfter = Number.parseInt(upstream.headers.get("retry-after") ?? "", 10);
      return jsonResponse(
        429,
        { message: "Too many attempts. Please wait a moment and try again." },
        Number.isInteger(retryAfter) && retryAfter > 0
          ? { "Retry-After": String(Math.min(retryAfter, 3600)) }
          : {},
      );
    }

    if (![200, 201, 202].includes(upstream.status)) {
      return jsonResponse(503, {
        message: "Demo registration is temporarily unavailable. Please try again later or contact Argel.",
      });
    }

    let result;
    try {
      result = await upstream.json();
    } catch {
      result = null;
    }

    if (!result || result.status !== "accepted") {
      return jsonResponse(503, {
        message: "Demo registration is temporarily unavailable. Please try again later or contact Argel.",
      });
    }

    return jsonResponse(202, { status: "accepted", mode: "backend", message: ACCEPTED_MESSAGE });
  } catch {
    return jsonResponse(503, {
      message: "Demo registration is temporarily unavailable. Please try again later or contact Argel.",
    });
  }
}
