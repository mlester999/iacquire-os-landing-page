import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import test from "node:test";
import {
  createBackendSignature,
  createRateLimiter,
  handleDemoRegistrationRequest,
  INDUSTRIES,
  validateDemoRegistration,
} from "../lib/demo-registration.mjs";

const validInput = {
  fullName: "Ada Lovelace",
  email: "Ada@example.com",
  businessName: "Analytical Engines",
  industry: "consulting",
  consent: true,
  marketingOptIn: false,
  company_website: "",
};

const backendSecret = "isolated-test-only-secret-with-32-bytes-minimum";
const incomingId = "f553095f-562b-4aef-a4e3-4f560542a04d";
const compactId = incomingId.replaceAll("-", "");
const marketingOrigin = "https://marketing.test";

function makeRequest(body = validInput, options = {}) {
  return new Request("https://marketing.test/api/demo/register", {
    method: options.method ?? "POST",
    headers: {
      Origin: marketingOrigin,
      "Content-Type": options.contentType ?? "application/json",
      "Idempotency-Key": incomingId,
      ...(options.headers ?? {}),
    },
    body: options.rawBody ?? JSON.stringify(body),
  });
}

function makeBackendEnv(overrides = {}) {
  return {
    DEMO_REGISTRATION_MODE: "backend",
    NODE_ENV: "test",
    NEXT_PUBLIC_SITE_URL: marketingOrigin,
    IACQUIREOS_DEMO_REGISTER_URL: "https://www.iacquire.online/api/public/demo/register",
    IACQUIREOS_BACKEND_SIGNING_SECRET: backendSecret,
    ...overrides,
  };
}

function acceptedBackendResponse() {
  return new Response(JSON.stringify({ ok: true }), {
    status: 202,
    headers: { "Content-Type": "application/json" },
  });
}

test("maps the visible industry choices to the backend's canonical keys", () => {
  assert.deepEqual(
    INDUSTRIES.map(({ value }) => value),
    ["real_estate", "healthcare", "home_services", "agency", "consulting", "legal_finance", "local_services", "ecommerce", "other"],
  );

  const result = validateDemoRegistration(validInput);
  assert.equal(result.success, true);
  assert.equal(result.data?.email, "ada@example.com");
  assert.equal(result.data?.industry, "consulting");
  assert.equal(result.data?.consent, true);
  assert.equal(result.data?.marketingOptIn, false);
});

test("requires privacy-notice acknowledgement separately from optional marketing opt-in", () => {
  const noNotice = validateDemoRegistration({ ...validInput, consent: false, marketingOptIn: true });
  assert.equal(noNotice.success, false);
  assert.ok(noNotice.fieldErrors?.consent);
  assert.equal(noNotice.fieldErrors?.marketingOptIn, undefined);

  const noMarketing = validateDemoRegistration({ ...validInput, marketingOptIn: false });
  assert.equal(noMarketing.success, true);
  assert.equal(noMarketing.data?.consent, true);
  assert.equal(noMarketing.data?.marketingOptIn, false);
});

test("rejects invalid fields and non-canonical industry labels", () => {
  const result = validateDemoRegistration({
    ...validInput,
    fullName: " ",
    email: "not-an-email",
    businessName: " ",
    industry: "Professional services",
  });
  assert.equal(result.success, false);
  assert.ok(result.fieldErrors?.fullName);
  assert.ok(result.fieldErrors?.email);
  assert.ok(result.fieldErrors?.businessName);
  assert.ok(result.fieldErrors?.industry);
});

test("signatures use timestamp.requestId.rawBody and the backend header format", () => {
  const timestamp = "1793000000";
  const requestId = "f553095f562b4aefa4e34f560542a04d";
  const rawBody = "{\"a\":1}";
  const secret = backendSecret;
  const digest = createHmac("sha256", secret)
    .update(timestamp + "." + requestId + "." + rawBody, "utf8")
    .digest("hex");

  assert.equal(createBackendSignature(timestamp, requestId, rawBody, secret), "t=" + timestamp + ",v1=" + digest);
  assert.match(createBackendSignature(timestamp, requestId, rawBody, secret), /^t=\d+,v1=[a-f0-9]{64}$/);
  assert.notEqual(
    createBackendSignature(timestamp, requestId, rawBody, secret),
    createBackendSignature("1793000001", requestId, rawBody, secret),
  );
  assert.notEqual(
    createBackendSignature(timestamp, requestId, rawBody, secret),
    createBackendSignature(timestamp, requestId, "{\"a\":2}", secret),
  );
});

test("explicit local mock accepts without claiming an email was sent", async () => {
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env: { DEMO_REGISTRATION_MODE: "mock", NODE_ENV: "development" },
    rateLimiter: createRateLimiter({ limit: 5 }),
  });
  const body = await response.json();

  assert.equal(response.status, 202);
  assert.equal(body.ok, true);
  assert.equal(body.mode, "mock");
  assert.equal(body.message, "Local mock registration accepted. No email was sent.");
});

test("production mock mode is disabled", async () => {
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env: { DEMO_REGISTRATION_MODE: "mock", NODE_ENV: "production" },
    rateLimiter: createRateLimiter({ limit: 5 }),
  });
  assert.equal(response.status, 503);
});

test("backend request maps the body, compacts the request ID, and signs the exact forwarded bytes", async () => {
  let captured;
  const env = makeBackendEnv();
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env,
    now: () => 1_793_000_000_000,
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async (url, init) => {
      captured = { url, init };
      return acceptedBackendResponse();
    },
  });
  const responseBody = await response.json();
  const headers = captured.init.headers;
  const timestamp = headers["IACQUIREOS-Timestamp"];
  const expectedDigest = createHmac("sha256", backendSecret)
    .update(timestamp + "." + headers["IACQUIREOS-Request-Id"] + "." + captured.init.body, "utf8")
    .digest("hex");

  assert.equal(response.status, 202);
  assert.deepEqual(responseBody, {
    ok: true,
    mode: "backend",
    message: "If your request can proceed, we’ll send a secure iAcquireOS demo link to your work email.",
  });
  assert.equal(captured.url, env.IACQUIREOS_DEMO_REGISTER_URL);
  assert.equal(captured.init.method, "POST");
  assert.equal(captured.init.cache, "no-store");
  assert.equal(headers.Accept, "application/json");
  assert.equal(headers["Content-Type"], "application/json");
  assert.equal(headers.Origin, marketingOrigin);
  assert.equal(headers["IACQUIREOS-Request-Id"], compactId);
  assert.match(headers["IACQUIREOS-Request-Id"], /^[A-Za-z0-9_-]{16,64}$/);
  assert.equal(timestamp, "1793000000");
  assert.equal(headers["IACQUIREOS-Signature"], "t=" + timestamp + ",v1=" + expectedDigest);
  assert.deepEqual(JSON.parse(captured.init.body), {
    name: "Ada Lovelace",
    email: "ada@example.com",
    business: "Analytical Engines",
    industry: "consulting",
    consent: true,
    marketingOptIn: false,
    utm_source: "marketing-website",
    company_website: "",
  });
});

test("invalid browser request IDs are replaced with a backend-compatible random ID", async () => {
  let requestId;
  const response = await handleDemoRegistrationRequest(
    makeRequest(validInput, { headers: { "Idempotency-Key": "invalid id with spaces" } }),
    {
      env: makeBackendEnv(),
      rateLimiter: createRateLimiter({ limit: 5 }),
      fetchImpl: async (_url, init) => {
        requestId = init.headers["IACQUIREOS-Request-Id"];
        return acceptedBackendResponse();
      },
    },
  );

  assert.equal(response.status, 202);
  assert.match(requestId, /^[A-Za-z0-9_-]{16,64}$/);
  assert.notEqual(requestId, "invalid id with spaces");
});

test("a network failure retries once with the same request ID, signature, timestamp, and body", async () => {
  const attempts = [];
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env: makeBackendEnv(),
    now: () => 1_793_000_000_000,
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async (url, init) => {
      attempts.push({ url, method: init.method, body: init.body, headers: { ...init.headers } });
      if (attempts.length === 1) throw new Error("simulated isolated network timeout");
      return acceptedBackendResponse();
    },
  });

  assert.equal(response.status, 202);
  assert.equal(attempts.length, 2);
  assert.deepEqual(attempts[1], attempts[0]);
});

test("retries an exhausted network failure safely and does not expose transport details", async () => {
  let calls = 0;
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env: makeBackendEnv(),
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async () => {
      calls += 1;
      throw new Error("private endpoint detail");
    },
  });

  assert.equal(calls, 2);
  assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /private endpoint detail/);
});

test("backend 202 is accepted only when the JSON body is { ok: true }", async () => {
  const legacy = await handleDemoRegistrationRequest(makeRequest(), {
    env: makeBackendEnv(),
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async () => new Response(JSON.stringify({ status: "accepted" }), { status: 202 }),
  });
  const malformed = await handleDemoRegistrationRequest(makeRequest(), {
    env: makeBackendEnv(),
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async () => new Response("not json", { status: 202 }),
  });

  assert.equal(legacy.status, 503);
  assert.equal(malformed.status, 503);
});

test("legitimate duplicate prospects retain the backend's generic accepted response", async () => {
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env: makeBackendEnv(),
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async () => acceptedBackendResponse(),
  });

  assert.equal(response.status, 202);
  assert.equal((await response.json()).ok, true);
});

test("request-ID replay conflicts are not reported as registration success", async () => {
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env: makeBackendEnv(),
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async () => new Response(
      JSON.stringify({ ok: false, error: { code: "replayed_request" } }),
      { status: 409 },
    ),
  });

  assert.equal(response.status, 409);
  assert.equal((await response.json()).ok, false);
});

test("backend field validation is mapped to the landing form's field names", async () => {
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env: makeBackendEnv(),
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async () => new Response(JSON.stringify({
      ok: false,
      error: { code: "invalid", message: "private backend copy" },
      fields: {
        name: "Enter your name.",
        business: "Enter your business.",
        industry: "Choose an industry.",
        consent: "Acknowledge the notice.",
        unknown: "Do not forward this field.",
      },
    }), { status: 422 }),
  });

  assert.equal(response.status, 422);
  assert.deepEqual(await response.json(), {
    ok: false,
    message: "Check the highlighted fields and try again.",
    fieldErrors: {
      fullName: "Enter your name.",
      businessName: "Enter your business.",
      industry: "Choose an industry.",
      consent: "Acknowledge the notice.",
    },
  });
});

test("rate limits preserve a bounded Retry-After value", async () => {
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env: makeBackendEnv(),
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async () => new Response(JSON.stringify({ ok: false }), {
      status: 429,
      headers: { "Retry-After": "5000" },
    }),
  });

  assert.equal(response.status, 429);
  assert.equal(response.headers.get("retry-after"), "3600");
  assert.equal((await response.json()).ok, false);
});

test("backend request and authorization failures map to a generic unavailable response", async () => {
  for (const status of [200, 201, 400, 401, 403, 415, 503]) {
    const response = await handleDemoRegistrationRequest(makeRequest(), {
      env: makeBackendEnv(),
      rateLimiter: createRateLimiter({ limit: 5 }),
      fetchImpl: async () => new Response(
        JSON.stringify({ ok: false, error: { message: "private backend details" } }),
        { status },
      ),
    });
    assert.equal(response.status, 503, "upstream status " + status);
    const body = await response.text();
    assert.equal(JSON.parse(body).ok, false);
    assert.doesNotMatch(body, /private backend details/);
  }
});

test("missing backend configuration and backend outages fail safely", async () => {
  const missing = await handleDemoRegistrationRequest(makeRequest(), {
    env: { DEMO_REGISTRATION_MODE: "backend", NODE_ENV: "production" },
    rateLimiter: createRateLimiter({ limit: 5 }),
  });
  assert.equal(missing.status, 503);

  const outage = await handleDemoRegistrationRequest(makeRequest(), {
    env: makeBackendEnv(),
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async () => {
      throw new Error("private backend detail");
    },
  });
  assert.equal(outage.status, 503);
  assert.doesNotMatch(await outage.text(), /private backend detail/);
});

test("production requires the configured marketing origin to match the request host", async () => {
  let calls = 0;
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env: makeBackendEnv({ NODE_ENV: "production", NEXT_PUBLIC_SITE_URL: "https://different.test" }),
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async () => {
      calls += 1;
      return acceptedBackendResponse();
    },
  });

  assert.equal(response.status, 503);
  assert.equal(calls, 0);
});

test("production forwards only the configured, matching marketing origin", async () => {
  let origin;
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env: makeBackendEnv({ NODE_ENV: "production", NEXT_PUBLIC_SITE_URL: marketingOrigin }),
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async (_url, init) => {
      origin = init.headers.Origin;
      return acceptedBackendResponse();
    },
  });

  assert.equal(response.status, 202);
  assert.equal(origin, marketingOrigin);
});

test("rejects cross-origin, non-JSON, oversized, and invalid form requests", async () => {
  const crossOrigin = await handleDemoRegistrationRequest(
    makeRequest(validInput, { headers: { Origin: "https://attacker.test" } }),
    { rateLimiter: createRateLimiter({ limit: 5 }) },
  );
  const nonJson = await handleDemoRegistrationRequest(
    makeRequest(validInput, { contentType: "text/plain" }),
    { rateLimiter: createRateLimiter({ limit: 5 }) },
  );
  const tooLarge = await handleDemoRegistrationRequest(
    makeRequest({ ...validInput, fullName: "x".repeat(9000) }),
    { rateLimiter: createRateLimiter({ limit: 5 }) },
  );
  const invalid = await handleDemoRegistrationRequest(
    makeRequest({ ...validInput, consent: false }),
    { rateLimiter: createRateLimiter({ limit: 5 }) },
  );

  assert.equal(crossOrigin.status, 403);
  assert.equal(nonJson.status, 415);
  assert.equal(tooLarge.status, 413);
  assert.equal(invalid.status, 400);
});

test("rate limiter returns a bounded retry window", () => {
  let now = 1000;
  const check = createRateLimiter({ limit: 1, windowMs: 5000, now: () => now });
  assert.equal(check("client").allowed, true);
  assert.deepEqual(check("client"), { allowed: false, retryAfter: 5 });
  now += 5001;
  assert.equal(check("client").allowed, true);
});
