import assert from "node:assert/strict";
import test from "node:test";
import {
  createBackendSignature,
  createRateLimiter,
  handleDemoRegistrationRequest,
  validateDemoRegistration,
} from "../lib/demo-registration.mjs";

const validInput = {
  fullName: "Ada Lovelace",
  email: "Ada@example.com",
  businessName: "Analytical Engines",
  industry: "B2B SaaS",
  marketingConsent: false,
};

function makeRequest(body = validInput, options = {}) {
  return new Request("https://marketing.test/api/demo/register", {
    method: options.method ?? "POST",
    headers: {
      Origin: "https://marketing.test",
      "Content-Type": options.contentType ?? "application/json",
      "Idempotency-Key": "f553095f-562b-4aef-a4e3-4f560542a04d",
      ...(options.headers ?? {}),
    },
    body: options.rawBody ?? JSON.stringify(body),
  });
}

test("validates and normalizes demo registration fields", () => {
  const result = validateDemoRegistration(validInput);
  assert.equal(result.success, true);
  assert.equal(result.data?.email, "ada@example.com");
  assert.equal(result.data?.marketingConsent, false);
});

test("rejects malformed email, missing company, and unsupported industry", () => {
  const result = validateDemoRegistration({
    ...validInput,
    email: "not-an-email",
    businessName: " ",
    industry: "Unlisted industry",
  });
  assert.equal(result.success, false);
  assert.ok(result.fieldErrors?.email);
  assert.ok(result.fieldErrors?.businessName);
  assert.ok(result.fieldErrors?.industry);
});

test("signatures are tied to both the timestamp and exact request body", () => {
  const first = createBackendSignature("1793000000", "{\"a\":1}", "test-secret-that-is-long-enough-123456");
  assert.match(first, /^sha256=[a-f0-9]{64}$/);
  assert.notEqual(
    first,
    createBackendSignature("1793000001", "{\"a\":1}", "test-secret-that-is-long-enough-123456"),
  );
  assert.notEqual(
    first,
    createBackendSignature("1793000000", "{\"a\":2}", "test-secret-that-is-long-enough-123456"),
  );
});

test("explicit local mock accepts a request without claiming an email was sent", async () => {
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env: { DEMO_REGISTRATION_MODE: "mock", NODE_ENV: "development" },
    rateLimiter: createRateLimiter({ limit: 5 }),
  });
  const body = await response.json();

  assert.equal(response.status, 202);
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

test("backend request is signed server-side and forwards an idempotency key", async () => {
  let captured;
  const env = {
    DEMO_REGISTRATION_MODE: "backend",
    NODE_ENV: "test",
    IACQUIREOS_DEMO_REGISTER_URL: "https://platform.test/custom/registration-endpoint",
    IACQUIREOS_BACKEND_SIGNING_SECRET: "test-secret-that-is-long-enough-123456",
  };
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env,
    now: () => 1_793_000_000_000,
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async (url, init) => {
      captured = { url, init };
      return new Response(JSON.stringify({ status: "accepted" }), {
        status: 202,
        headers: { "Content-Type": "application/json" },
      });
    },
  });
  const body = await response.json();
  const timestamp = captured.init.headers["X-IAcquire-Timestamp"];

  assert.equal(response.status, 202);
  assert.equal(body.mode, "backend");
  assert.equal(captured.url, env.IACQUIREOS_DEMO_REGISTER_URL);
  assert.equal(captured.init.headers["Idempotency-Key"], "f553095f-562b-4aef-a4e3-4f560542a04d");
  assert.equal(
    captured.init.headers["X-IAcquire-Signature"],
    createBackendSignature(timestamp, captured.init.body, env.IACQUIREOS_BACKEND_SIGNING_SECRET),
  );
  assert.equal(JSON.parse(captured.init.body).source, "marketing-website");
  assert.equal(JSON.parse(captured.init.body).email, "ada@example.com");
});

test("duplicate backend responses use the same generic accepted result", async () => {
  const response = await handleDemoRegistrationRequest(makeRequest(), {
    env: {
      DEMO_REGISTRATION_MODE: "backend",
      NODE_ENV: "test",
      IACQUIREOS_DEMO_REGISTER_URL: "https://platform.test/register",
      IACQUIREOS_BACKEND_SIGNING_SECRET: "test-secret-that-is-long-enough-123456",
    },
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async () => new Response(null, { status: 409 }),
  });
  const body = await response.json();

  assert.equal(response.status, 202);
  assert.match(body.message, /Check your email/);
});

test("missing backend configuration and backend outages fail safely", async () => {
  const missing = await handleDemoRegistrationRequest(makeRequest(), {
    env: { DEMO_REGISTRATION_MODE: "backend", NODE_ENV: "production" },
    rateLimiter: createRateLimiter({ limit: 5 }),
  });
  assert.equal(missing.status, 503);

  const outage = await handleDemoRegistrationRequest(makeRequest(), {
    env: {
      DEMO_REGISTRATION_MODE: "backend",
      NODE_ENV: "test",
      IACQUIREOS_DEMO_REGISTER_URL: "https://platform.test/register",
      IACQUIREOS_BACKEND_SIGNING_SECRET: "test-secret-that-is-long-enough-123456",
    },
    rateLimiter: createRateLimiter({ limit: 5 }),
    fetchImpl: async () => {
      throw new Error("private backend detail must not be returned");
    },
  });
  assert.equal(outage.status, 503);
  assert.doesNotMatch(await outage.text(), /private backend detail/);
});

test("rejects cross-origin, non-JSON, oversized, and invalid requests", async () => {
  const crossOrigin = await handleDemoRegistrationRequest(
    makeRequest(validInput, { headers: { Origin: "https://attacker.test" } }),
    { rateLimiter: createRateLimiter({ limit: 5 }) },
  );
  const nonJson = await handleDemoRegistrationRequest(
    makeRequest(validInput, { contentType: "text/plain" }),
    { rateLimiter: createRateLimiter({ limit: 5 }) },
  );
  const tooLarge = await handleDemoRegistrationRequest(
    makeRequest(validInput, { rawBody: JSON.stringify({ ...validInput, fullName: "x".repeat(9000) }) }),
    { rateLimiter: createRateLimiter({ limit: 5 }) },
  );
  const invalid = await handleDemoRegistrationRequest(
    makeRequest({ ...validInput, email: "invalid" }),
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
