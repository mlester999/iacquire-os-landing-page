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

See [INTEGRATION_CONTRACT.md](INTEGRATION_CONTRACT.md) for the request signature, payload, response, security boundary, first-entry timer requirements, and app-side work. Set `IACQUIREOS_DEMO_REGISTER_URL` to the actual endpoint supplied by the app team and `IACQUIREOS_BACKEND_SIGNING_SECRET` to a unique secret installed in the app's server-side secret store. Do not expose it as a public frontend variable. The marketing domain is not finalized; set `NEXT_PUBLIC_SITE_URL` only when it is selected so canonical, Open Graph URL, and sitemap values are correct.

The existing app repository and endpoint were not available in this workspace. Real registration, email delivery, verification, first activation, demo expiry, and provider delivery remain unverified.

## Commands

```bash
npm run typecheck
npm run lint
npm test
npm run test:e2e
npm run build
```

`npm run test:e2e` launches a local Next.js test server with the isolated mock mode enabled. It checks the page at 320, 375, 390, 430, 768, 1024, 1280, and 1440 px, tests the mobile menu, registration validation and mock acceptance, and keyboard use of the portfolio filters and project dialog. It also refreshes the before/after screenshots in `artifacts/screenshots/` from the supplied HTML and the migrated page.

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
| Server-side validation, origin checks, HMAC forwarding, payload limit, timeout handling | Implemented locally |
| Local mock mode | Implemented and tested locally; sends no email |
| App registration endpoint | Not integrated; application repository/endpoint unavailable |
| Email provider | Not verified |
| 24-hour first-confirmed-entry activation | Documented as an app-side contract; not end-to-end tested |
| Production domain, canonical URL, deployment | Not configured; deployment approval required |
| Desktop/mobile screenshots | Before/after full-page and first-screen captures saved under `artifacts/screenshots/` |
