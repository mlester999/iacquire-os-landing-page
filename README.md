# iAcquireOS marketing site

Modern Next.js App Router migration of the supplied iAcquireOS landing page. The implementation preserves the original dark navy and cool-blue brand identity, founder portraits, audience story, system stages, AI Employees, portfolio examples, founder accountability, and contact links. It replaces the old shared invite links with a secure-registration front end for the existing iAcquireOS application.

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

To exercise the form without credentials, set `DEMO_REGISTRATION_MODE=mock` in `.env.local` and restart the development server. The mock mode validates the form and displays a local-only confirmation that no email was sent. It creates no prospect, verification link, demo session, or timer and is disabled in production.

## Configure the existing app integration

The landing page calls the application endpoint at `https://www.iacquire.online/api/public/demo/register` through its same-origin Next.js route. It maps the form values to the app's canonical industry keys and payload, signs the exact JSON string with the documented HMAC format, and verifies the app's `202 {"ok":true}` response. See [INTEGRATION_CONTRACT.md](INTEGRATION_CONTRACT.md) for headers, retries, responses, and the app-side environment settings.

Set these values in the marketing site's Vercel project:

```text
NEXT_PUBLIC_SITE_URL=https://iacquire-os.vercel.app
NEXT_PUBLIC_APP_ORIGIN=https://www.iacquire.online
IACQUIREOS_DEMO_REGISTER_URL=https://www.iacquire.online/api/public/demo/register
IACQUIREOS_BACKEND_SIGNING_SECRET=<server-only-shared-secret>
DEMO_REGISTRATION_MODE=backend
DEMO_REGISTRATION_TIMEOUT_MS=13000
```

Generate a unique shared secret with at least 32 random bytes. Store it as `IACQUIREOS_BACKEND_SIGNING_SECRET` in the marketing Vercel project and as `DEMO_REGISTRATION_SIGNING_SECRET` in the application server's secret store. On the application, set `DEMO_REGISTRATION_ALLOWED_ORIGINS=https://iacquire-os.vercel.app`. Never put the secret in a `NEXT_PUBLIC_*` variable, commit it, or expose it to browser code.

The backend implementation was inspected on `mlester999/iacquire-dashboard` `master` at `b82b241bdcd176bb67687fc2c501c176a2404e53`. The local adapter and browser flow are tested against isolated mocks; this workspace has no staging backend credentials, so registration email capture, verification, first-entry timing, message quota, return access, and expiry were not exercised end to end.

## Commands

```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
```

`npm run test:e2e` launches a local Next.js test server with the isolated mock mode enabled. It checks the page at 320, 375, 390, 430, 768, 1024, 1280, and 1440 px, tests the mobile menu, privacy acknowledgement, canonical industry values, stable browser retry IDs, mock acceptance, and keyboard use of the portfolio filters and project dialog. It also refreshes the before/after screenshots in `artifacts/screenshots/` from the supplied HTML and the migrated page. The test server never calls the application or sends email.

## Design and migration files

- [MIGRATION_INVENTORY.md](MIGRATION_INVENTORY.md) records the supplied HTML audit and migration decisions.
- [INTEGRATION_CONTRACT.md](INTEGRATION_CONTRACT.md) documents the application API and exact app-side changes required.
- [docs/demo-verification-email.html](docs/demo-verification-email.html) is a branded email template specification for the existing application email service.
- `.superdesign/design-system.md` records current visual and product constraints.

Founder portraits are extracted from the supplied HTML and optimized as local images in `public/images/`.

## Responsive screenshots

The full-page captures and first-screen previews are saved under [`artifacts/screenshots/`](artifacts/screenshots/):

| | Desktop, 1440 px | Mobile, 390 px |
| --- | --- | --- |
| Before | [Full page](artifacts/screenshots/before-desktop.png) · [First screen](artifacts/screenshots/before-desktop-fold.png) | [Full page](artifacts/screenshots/before-mobile.png) · [First screen](artifacts/screenshots/before-mobile-fold.png) |
| After | [Full page](artifacts/screenshots/after-desktop.png) · [First screen](artifacts/screenshots/after-desktop-fold.png) | [Full page](artifacts/screenshots/after-mobile.png) · [First screen](artifacts/screenshots/after-mobile-fold.png) |

## Status matrix

| Area | Status |
| --- | --- |
| Next.js landing page and responsive layouts | Implemented locally |
| Demo registration UI and same-origin API client | Implemented locally |
| Server-side validation, same-origin checks, backend HMAC headers, exact payload mapping, payload limit, and idempotent timeout retry | Implemented locally; covered with an isolated backend-response stub |
| Local mock mode | Implemented and tested locally; sends no email |
| Application registration endpoint | Contract matched against the current application `master` source; hosted staging request not run |
| Email provider and captured verification email | Not tested; requires isolated backend credentials and capture provider |
| 24-hour first-confirmed-entry activation, ten-message quota, return access, and expiry | Application-owned; not end-to-end tested from this workspace |
| Production environment variables | Values documented in `.env.example`; add them to Vercel and configure the matching application allowlist/secret |
| Production deployment | Not deployed; deployment approval required |
| Desktop/mobile screenshots | Before/after full-page and first-screen captures saved under `artifacts/screenshots/` |
