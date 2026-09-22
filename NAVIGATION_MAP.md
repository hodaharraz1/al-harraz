# Navigation Map

Status: Phase 2. **Updated**: per client direction, Maritime is no longer given elevated top-level nav placement — it's reachable via Expertise like every other practice area, so the site doesn't read as maritime-centric (see `SITE_STRATEGY.md` §1).

## Desktop Primary Navigation

1. About (dropdown: Firm Overview, Our History, Our Team, Why Al Harraz)
2. People (Team Directory)
3. Expertise (mega-menu: Practice Areas grouped — Civil Law / Criminal Law / Litigation & Disputes / Corporate & Commercial / Family & Personal Status / Real Estate / Administrative & Tax / Maritime & Shipping / Advisory)
4. Industries
5. Insights
6. Contact
7. **Book a Consultation** (primary CTA button, visually distinct from nav links)

Arabic equivalent uses the same structure, mirrored for RTL.

## Mobile Navigation

- Hamburger menu opening a full-screen panel, single-level-deep accordions for About/Expertise (no nested mega-menu on mobile).
- Book a Consultation remains one tap from the menu root.
- Persistent bottom/sticky bar (mobile only): Call · WhatsApp · Book Consultation — always visible, not dependent on scroll position (per brief §14).

## Footer Navigation

Logo + short description · Practice Areas (top 6-8 links + "View all") · Industries · Insights · Team · Contact block (address/phone/WhatsApp/email once configured) · Social links · Privacy / Terms / Disclaimer · Language switch · Dynamic copyright year.

## Language Switch

Present in header (desktop + mobile) and footer. Switching language keeps the visitor on the translated equivalent of the current page when it exists; falls back to the equivalent section's index page (never to a 404) if a specific translated slug is missing.
