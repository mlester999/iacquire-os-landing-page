# iAcquireOS demo registration integration contract

## Boundary

The marketing site owns only the public form and a same-origin Next.js server endpoint. The existing iAcquireOS application at `https://iacquire.online` remains the authority for prospects, verification, allocation, email delivery, demo activation, expiry, message quotas, return access, and administration.

The application repository and credentials were not present in this workspace. The landing site therefore uses a configurable backend URL and does not claim that registration or email delivery is live.

## Landing endpoint

`POST /api/demo/register`

The browser sends same-origin JSON to this route:

```json
{
  "fullName": "Ada Lovelace",
  "email": "ada@example.com",
  "businessName": "Analytical Engines",
  "industry": "B2B SaaS",
  "marketingConsent": false,
  "website": ""
}
```

`website` is a honeypot and must remain empty. Valid industry values are `B2B SaaS`, `Marketing or creative agency`, `Professional services`, `Home services`, `Ecommerce`, and `Other`. The server normalizes email to lowercase, validates field lengths and shape, rejects non-JSON and oversized payloads, requires a same-origin `Origin`, and returns no CORS headers.

The browser sends a UUID in `Idempotency-Key`. Duplicate submits are disabled in the UI; the application must enforce idempotency across server instances and retries.

## Configurable application endpoint

Set `IACQUIREOS_DEMO_REGISTER_URL` to the exact registration route supplied by the application team. The landing project intentionally does not guess that route. Set `IACQUIREOS_BACKEND_SIGNING_SECRET` to a unique random secret shared with the application server; it must contain at least 32 bytes and must never use a `NEXT_PUBLIC_` variable.

The Next.js server forwards a normalized request body:

```json
{
  "fullName": "Ada Lovelace",
  "email": "ada@example.com",
  "businessName": "Analytical Engines",
  "industry": "B2B SaaS",
  "marketingConsent": false,
  "source": "marketing-website"
}
```

It sends these headers:

| Header | Value |
| --- | --- |
| `Content-Type` | `application/json` |
| `Accept` | `application/json` |
| `Origin` | Origin of the marketing site request; validate against an application allowlist |
| `Idempotency-Key` | Browser-generated UUID, or a server-generated UUID if invalid/missing |
| `X-IAcquire-Timestamp` | Unix time in seconds from the landing server |
| `X-IAcquire-Signature` | `sha256=` plus lowercase hex HMAC-SHA256 of `${timestamp}\n${exactRawBody}` |

The application must reject stale timestamps (recommended maximum age: five minutes), compare signatures in constant time, validate the origin and payload independently, enforce distributed IP/email rate limits and abuse controls, and make the registration idempotent. It must not trust the landing page as a substitute for its own validation.

## Application behavior required

1. Validate the signature, timestamp, origin allowlist, JSON schema, idempotency key, and rate limits.
2. Create or update a pending record in the existing Demo & Prospects service. Do not create a client workspace or grant customer permissions.
3. Treat repeat requests for an existing prospect as the same public outcome to prevent email enumeration. Do not return prospect details.
4. Send the verification email through the existing authorized email provider. Return `202` with `{"status":"accepted"}` only when the request has been accepted for email delivery. Do not return verification tokens or links to the marketing site.
5. Generate the unique, expiring verification link using the configured canonical application origin, currently intended to be `https://iacquire.online`. Do not hardcode an unconfirmed route in the marketing project.
6. A verification-link `GET` must display a secure entry page without consuming the token or activating the demo. Link scanners, previews, refreshes, and email delivery must not start the timer.
7. On an explicit protected `POST` confirmation, validate and consume the token, establish the authenticated demo session, and atomically set `first_access_at` only if it is null. Set `expires_at = first_access_at + 24 hours` using database/server time. Repeat access, resends, devices, and refreshes must not reset either value.
8. Enforce the existing one-allocation policy, four-step guided experience, ten-message quota, persistent return access, consultation path, optional verified checkout, and expiry behavior. Only Super Admin may extend an allocation.
9. Provide a controlled resend for expired verification links that does not consume an allocation or start/reset demo time.
10. Never log full verification URLs, tokens, secrets, or submitted personal data. Keep email-enumeration responses generic.

## Response contract

Accepted registration:

```http
HTTP/1.1 202 Accepted
Content-Type: application/json
Cache-Control: no-store
```

```json
{"status":"accepted"}
```

Return the same accepted response for a new or already-registered address. The landing endpoint maps that to a generic confirmation. For overload, return `429` with an optional bounded `Retry-After`. For temporary unavailability, return a generic `5xx`; do not include stack traces or provider responses.

## Local mock mode

`DEMO_REGISTRATION_MODE=mock` is available only outside production. It exercises validation and the success UI, returns `mode: "mock"`, and clearly tells the user that no email was sent. It creates no prospect, token, demo session, or countdown. Production mock mode is rejected.

## Email template

See [docs/demo-verification-email.html](docs/demo-verification-email.html). The application should render escaped variables, insert its own verification URL and actual link-expiry time, and send the message through its existing email service. The email explains that verification-link expiry is separate from the 24-hour demo period.

## App-side changes needed

- Add the signed registration handler to the existing prospect service and expose its actual route to this project owner.
- Configure the exact allowed marketing origin after that domain is chosen.
- Share a new server-only HMAC secret through the deployment secret store.
- Enforce schema validation, distributed abuse controls, idempotency, duplicate-safe responses, and safe logs in the app.
- Use the existing email provider and provide the expiring verification email/controlled resend behavior.
- Keep `GET` token access non-consuming; activate only on explicit protected confirmation and atomically set the first-access timestamps.
- Confirm the app's actual verification route and template-variable contract before production deployment.
- Run the full integrated journey in an isolated test environment: registration → email capture → verification view → explicit first entry → 24-hour expiry → return access.

## Current integration status

| Area | Status |
| --- | --- |
| Landing form and same-origin route | Implemented locally |
| Validation, CSRF boundary, payload limit, signed BFF request | Implemented locally |
| Local mock adapter | Implemented locally; no email is sent |
| Existing application endpoint | Not integrated; route and app repository unavailable |
| Email provider and actual verification link | Not verified |
| First-access activation and 24-hour timer | App-side contract only; not tested here |
| Production marketing origin / canonical URL | Not configured |
