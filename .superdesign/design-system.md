# iAcquireOS — Design System

## Product and source of truth

iAcquireOS is a founder-led client acquisition system for high-ticket B2B SaaS companies and agencies. It connects prospect research, lead response, qualification, appointment booking, CRM follow-up, and customer retention.

The supplied HTML is the visual and copy source of truth. The current implementation brief is the source of truth for current pricing, demo registration, and product architecture when it differs from the older HTML or saved design drafts. Do not present planned or untested integrations as production-live. Do not invent customers, testimonials, outcomes, guarantees, or performance metrics.

## Brand

- Background: `#040712`.
- Raised surfaces: `#0a1120` and `#0d1729`.
- Main text: `#f3f7ff`; muted text: `#96a6bf`.
- Brand blue: `#4f8cff`; violet: `#805cff`; cyan: `#36c8ff`.
- Status green: `#45e0ad`; amber: `#ffc86b`.
- Borders use white at roughly 8–12% opacity.
- Use the existing Inter/system sans-serif stack and compact system labels. No logo asset is supplied; render the iAcquireOS wordmark as text.
- Keep the recognizable cool blue and restrained violet accents. Use gradients only where they already fit the original treatment, mainly on primary actions and small hero accents. Avoid full-page glows, heavy glass panels, and persistent decorative grids.
- Use 14–24px surface radii, 10–12px buttons, thin borders, and subtle shadows. Keep one clear primary action per view.

## Main page

1. **Navigation:** text wordmark, section links, “Try Free Demo,” and an accessible mobile menu.
2. **Hero:** keep the original core message, “If you're still manually handling leads, you don't have a sales system.” Explain the connected acquisition workflow. Show a clearly labeled illustrative product preview with sample data; never imply that a mock dashboard is a live screenshot.
3. **Revenue gap:** founder-led sales, referral gaps, and disconnected tools.
4. **System overview:** Find → Connect → Qualify → Book → Convert, with four product stages: Data Hunt, Appointment Setter, Sales + Follow-Up, and Customer Retention. Identify human review points.
5. **Six AI Employees:** Lead Hunter, Zeng Operations Manager, Appointment Setter, Sales Assistant, CRM Manager, and Performance Analyst.
6. **Technology and implementation:** accurately describe the tools and staged work; distinguish intended architecture from integrations that still need activation or QA.
7. **Selected work:** retain original project examples as portfolio work. Attribute each example to its named project; never label another product's work as an iAcquireOS screenshot or outcome.
8. **Offer:** US$1,499 one-time starting implementation fee; optional Managed Maintenance + Automation Studio at US$299/month. The consultation is the primary sales-conversion action; purchase is optional.
9. **Founder and accountability:** Argel Platon, using the supplied portraits and the factual experience shown in the HTML.
10. **Demo registration:** required full name, work email, business name, and industry. Optional, unchecked marketing consent. Explain that a secure link is emailed after registration. The 24-hour demo begins only on first confirmed entry in the existing iAcquireOS app; never show a local countdown or fabricate a session.
11. **FAQ, consultation, final CTA, and footer:** answer only from known product details. Use the supplied LinkedIn, WhatsApp, and email destinations. The marketing domain remains configurable.

## Demo registration and security

The marketing page is a client of the existing `iacquire.online` platform. It must not create a second demo funnel, prospect store, authentication service, email sender, session, quota, or payment flow. Browser JavaScript calls the Next.js server endpoint; the server forwards an allowlisted, validated request to a configurable platform endpoint using a server-only HMAC credential. The platform remains authoritative for prospect records, verification, allocation, email, first activation, expiry, quota, and return access.

Never expose provider credentials, tokens, or verification links to the browser. Avoid permissive CORS and unsafe logging. Use a generic response for existing registrations. An explicit local mock mode may confirm only that the form path was exercised; it must say that no email was sent. A GET request to a verification URL must never activate a demo.

## Responsive and interaction rules

- Preserve the source page's section hierarchy while tightening copy and spacing.
- Use intentional layouts for desktop, tablet, and narrow phones. Avoid horizontal overflow at 320px.
- Keep fields, links, and buttons keyboard accessible with visible focus rings and labels.
- Use inline field errors and polite live status for registration. Disable duplicate submits while pending and retain a stable idempotency key across retries.
- Support reduced motion; keep reveals subtle and avoid making content depend on animation.
- Use local optimized copies of supplied founder images. Do not add stock imagery or generic robot art.
