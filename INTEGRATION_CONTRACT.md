# iAcquireOS demo registration integration

## Backend source of truth

The landing integration is matched to `mlester999/iacquire-dashboard` `master` at commit `b82b241bdcd176bb67687fc2c501c176a2404e53`. The implementation is in [`registration.ts`](https://github.com/mlester999/iacquire-dashboard/blob/b82b241bdcd176bb67687fc2c501c176a2404e53/src/server/demo/registration.ts), with its route in [`route.ts`](https://github.com/mlester999/iacquire-dashboard/blob/b82b241bdcd176bb67687fc2c501c176a2404e53/src/app/api/public/demo/register/route.ts) and the full app-side contract in [`demo-external-registration.md`](https://github.com/mlester999/iacquire-dashboard/blob/b82b241bdcd176bb67687fc2c501c176a2404e53/docs/demo-external-registration.md).

The landing browser posts only to `POST /api/demo/register` on this site. The Next.js server forwards a signed request to:

`POST https://www.iacquire.online/api/public/demo/register`

The existing application owns prospect records, verification email delivery, verification, demo activation, message limits, return access, and expiry. The landing page does not create a second demo system.

## Form fields and mapping

The form collects a name, work email, business name, industry, required acknowledgement of the demo privacy notice, and a separate optional marketing preference.

| Landing value | Backend field | Notes |
| --- | --- | --- |
| `fullName` | `name` | Trimmed and limited to 120 characters |
| `email` | `email` | Lowercased before forwarding |
| `businessName` | `business` | Trimmed and limited to 160 characters |
| Industry selection | `industry` | Sends the canonical key shown below |
| Required privacy acknowledgement | `consent: true` | This records acceptance of the demo notice; unchecked submission is rejected |
| Optional product updates | `marketingOptIn` | Boolean, unchecked by default; independent of notice acknowledgement |
| Hidden website field | `company_website` | Backend honeypot; a filled value is answered generically and does not send an email |
| Fixed campaign tag | `utm_source: "marketing-website"` | Stored only through the backend's supported UTM field handling |

| Display label | Backend industry key |
| --- | --- |
| Real estate | `real_estate` |
| Healthcare | `healthcare` |
| Home services | `home_services` |
| Marketing or creative agency | `agency` |
| Consulting | `consulting` |
| Legal or financial services | `legal_finance` |
| Local services | `local_services` |
| Ecommerce | `ecommerce` |
| Other | `other` |

The required notice checkbox is separate from the optional marketing checkbox. The form links the required acknowledgement to `/privacy` and sends `consent: true` only when checked.

## Signed server-to-server request

The landing server serializes the backend JSON once. It signs and sends the same string as UTF-8 bytes.

Headers:

| Header | Required value |
| --- | --- |
| `Content-Type` | `application/json` |
| `Accept` | `application/json` |
| `Origin` | `https://iacquire-os.vercel.app` in production; must be allowlisted by the application |
| `IACQUIREOS-Request-Id` | `[A-Za-z0-9_-]{16,64}`; a 32-character random hexadecimal ID |
| `IACQUIREOS-Timestamp` | Unix seconds |
| `IACQUIREOS-Signature` | `t=<timestamp>,v1=<64 lowercase hex characters>` |

The signature is HMAC-SHA256 with the shared secret and this exact message:

    <timestamp>.<requestId>.<rawBody>

A representative body is:

    {"name":"Ada Lovelace","email":"ada@example.com","business":"Analytical Engines","industry":"consulting","consent":true,"marketingOptIn":false,"utm_source":"marketing-website","company_website":""}

The browser creates one compact idempotency key per serialized form attempt. The server normalizes legacy dashed UUID keys by removing their dashes before using them as the backend request ID. The HMAC secret stays in server environment variables and never reaches browser code.

## Responses and privacy

The backend accepts a registration only with HTTP `202` and JSON `{"ok":true}`. The landing route requires both conditions before showing the inbox confirmation. Existing prospects and new prospects receive the same accepted result from the backend to prevent email enumeration.

| Backend response | Landing behavior |
| --- | --- |
| `202 {"ok":true}` | Return generic accepted confirmation |
| `400`, `401`, `403`, unexpected status/body | Return a generic temporary-unavailability response; do not show success |
| `409` | Return a non-success conflict message; never treat it as a duplicate registration |
| `422` | Map supported backend field errors to the matching form fields |
| `429` | Show a generic rate-limit message and preserve a bounded `Retry-After` |
| `503` | Show a generic temporary-unavailability message and preserve a bounded `Retry-After` |

The landing route never returns backend error details, provider responses, secrets, or prospect data to the browser.

## Retry and timeout behavior

The backend keeps a request-ID ledger. Reusing the same ID and exact body returns `202` without another email; reusing the ID with a different body returns `409`. The backend documentation says an unfinished claim can be taken over after two minutes and refused or transiently failed requests release their ID.

The landing route makes one automatic retry only when the network call throws or times out. Both calls reuse the same request ID, timestamp, signature, headers, and exact serialized body. It does not retry HTTP error responses. A visitor retry after a timeout reuses the same compact request ID and browser body while the fields are unchanged; editing the form creates a new logical attempt. Each new server request uses a fresh timestamp and matching signature.

The per-call timeout is 13 seconds, above the backend email provider's documented 10-second ceiling. The route allows up to 30 seconds for the two bounded calls. `409`, `422`, `429`, and `503` are not hidden as success.

## Environment configuration

Marketing-site Vercel project:

    NEXT_PUBLIC_SITE_URL=https://iacquire-os.vercel.app
    NEXT_PUBLIC_APP_ORIGIN=https://www.iacquire.online
    IACQUIREOS_DEMO_REGISTER_URL=https://www.iacquire.online/api/public/demo/register
    IACQUIREOS_BACKEND_SIGNING_SECRET=<server-only-shared-secret>
    DEMO_REGISTRATION_MODE=backend
    DEMO_REGISTRATION_TIMEOUT_MS=13000

The secret must be a unique value of at least 32 random bytes. Store it only as the server-side `IACQUIREOS_BACKEND_SIGNING_SECRET` in the marketing project and as `DEMO_REGISTRATION_SIGNING_SECRET` in the application project.

Application environment/configuration:

    DEMO_REGISTRATION_SIGNING_SECRET=<same-server-only-shared-secret>
    DEMO_REGISTRATION_ALLOWED_ORIGINS=https://iacquire-os.vercel.app

The application must also have its demo registration feature enabled and email delivery configured. For staging integration tests, configure its capture email provider and an isolated staging database; do not use the production email provider or production prospect store.

`.env.example` contains public endpoint/origin defaults and an empty secret value. Add the secret in Vercel's server environment; never commit it or place it in a `NEXT_PUBLIC_*` variable.

## Verification status and remaining work

The landing validation, request mapping, request ID, HMAC header, timeout retry, response mapping, browser form state, and mock mode are covered by local tests using an isolated fake backend response. The Playwright web server is pinned to mock mode and sends no email.

No staging credentials or capture-mail backend are present in this workspace. The integration has therefore **not** been exercised against a real isolated application server. Email capture, repeated verification-link GET, explicit verification, first-entry 24-hour activation, ten-message quota, return access, and server-side expiry still require the application's staging environment and a controlled synthetic `@example.test` address. Production form submission and real email delivery have not been attempted.
