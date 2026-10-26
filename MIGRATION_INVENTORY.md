# iAcquireOS landing page migration inventory

## Source reviewed

- Source: `iAcquireOS_LandingWebsitePortfolio (1).html`, supplied separately from this project.
- Document title: “iAcquireOS by Argel Platon — Client Acquisition System”.
- Description: founder-led acquisition system for high-ticket B2B SaaS companies and agencies.
- One inline stylesheet, one inline JavaScript block, no external CSS or JavaScript libraries, no existing form, and no separate logo asset.
- The HTML is 5.68 MB because two founder photos are embedded as data URIs: a 1094×1438 PNG (3.54 MB) and a 768×1369 JPEG (680 KB). They will be stored locally in optimized formats.

## Existing visual identity

| Token | Source value |
| --- | --- |
| Page background | `#040712` |
| Main surface | `#0a1120e8` |
| Raised surface | `#0d1729` |
| Main text | `#f3f7ff` |
| Muted text | `#96a6bf` |
| Blue | `#4f8cff` |
| Violet | `#805cff` |
| Cyan | `#36c8ff` |
| Green | `#45e0ad` |
| Amber | `#ffc86b` |
| Content width | `1180px` |

The page uses an Inter/system sans-serif stack, dark technical surfaces, thin translucent borders, blue/violet CTA gradients, cyan/green status accents, rounded cards, a CSS dashboard illustration, compact labels, hover lifts, and scroll reveals. Mobile rules are present at 900px and 620px, with additional component-specific breakpoints.

## Original sections

1. Hero and dashboard preview, founder photo, audience/economics summary.
2. Revenue gap: founder-led sales, referrals, and disconnected tools.
3. Connected acquisition system and five-stage flow.
4. Four operating stages, six AI Employees, connected tools, and a caveat about staged testing.
5. Commercial model.
6. Founder accountability and trust.
7. Build/use/measure/document/deploy process proof.
8. “Systems & Products We’ve Built” portfolio with category filters and project details.
9. Founder profile, work history, capabilities, and contact destinations.
10. Free demo CTA.
11. Two-step demo and consultation contact section.

## Existing interactions and content issues

- Fixed navigation, mobile menu, anchor scrolling, hover states, scroll-reveal effects, portfolio category filters, and a project detail modal are implemented in the inline script/CSS.
- Demo CTAs point to a shared invitation URL. Consultation CTAs include `#` placeholders. These are not a secure, personalized registration flow.
- There is no registration form, inline validation, loading/error/success state, consent control, or backend integration.
- The source describes no monthly retainer and performance commission. The current brief supersedes that offer: starting implementation is US$1,499 once, with optional Managed Maintenance + Automation Studio at US$299/month.
- The existing source includes valid founder contact links to LinkedIn, WhatsApp, and email. Preserve them. Use WhatsApp or email for consultation inquiries until a real booking URL is supplied.
- Keep the portfolio as attributable project examples. Do not add performance metrics or imply these projects are iAcquireOS screenshots.

## Migration decisions

- **Preserve:** the headline and product story, audience, deep navy palette, cool-blue iAcquireOS identity, original sections, six-person AI workforce, staged implementation caveat, founder photos, portfolio examples, and known contact links.
- **Improve:** responsive composition at phone/tablet widths, typography hierarchy, contrast and focus states, accessible navigation, reduced-motion support, component boundaries, SEO metadata, image size, and clear product-preview labeling.
- **Replace:** the shared invite URL and placeholder booking links with a secure demo-registration form and working consultation contact action; inline CSS/JS with typed App Router components; the obsolete offer terms with current pricing from the brief.
- **Add:** a Next.js server-side integration endpoint, explicit local mock adapter, `.env.example`, integration contract, registration privacy notice, and accurate demo FAQs. The application API and email delivery remain unverified because the separate `iacquire.online` repository and credentials are not present here.
