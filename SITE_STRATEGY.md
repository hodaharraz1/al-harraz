# Site Strategy

Status: Phase 1.

## 1. Objective

Turn Al Harraz's heritage (since 1983) and 15-lawyer full-service bench into a credible, high-performing bilingual digital platform that generates qualified consultation requests from individuals and businesses across Egypt.

**Positioning correction (client direction, post-launch-prep review)**: the firm does not want the site centered on maritime law. Civil and criminal litigation are the firm's core, everyday strength and should read as the headline practice areas — the homepage's practice-area preview surfaces Civil Law and Criminal Law first (`featured` field, see `CONTENT_ARCHITECTURE.md`), and there is no longer a dedicated maritime spotlight section or elevated maritime nav link. Maritime/shipping remains a genuine practice area (real Damietta-location asset) but is presented as one of ~16 services, not a specialty headline. See `CMS_GUIDE.md`.

## 2. Audiences (see also §67 user segments in the brief)

- Individuals with an urgent legal issue (civil, criminal, family, inheritance) — primary focus
- Business owners / SMEs (contracts, corporate, disputes)
- Corporate legal departments and investors
- Foreign businesses seeking Egyptian counsel (English site)
- Importers/exporters, shipping and logistics companies (secondary — maritime/shipping practice area, not a homepage focus)

## 3. Positioning Pillars

A. Heritage (since 1983) · B. Team (15 lawyers) · C. Full-service capability, with civil and criminal litigation as the core strength · D. Damietta presence (full-service, nationwide reach; maritime/shipping expertise available as one of many practice areas, not the headline).

No superlative claims ("best", "#1", "highest success rate") without independently verifiable evidence.

## 4. Language Strategy

- Arabic (`/ar/`) is the primary, independently authored language — not a translation layer.
- English (`/en/`) targets corporate/maritime/foreign-client audiences — independently authored, not machine-translated.
- `hreflang="ar"`, `hreflang="en"`, `x-default` reciprocal on every page pair.

## 5. Content Governance (YMYL discipline)

- No fabricated statute numbers, case outcomes, rankings, awards, or testimonials — ever (see `CONTENT_REQUIRED.md` for what's missing).
- Every article/practice page shows author/reviewer, publish date, last-reviewed date.
- Standard disclaimer on every legal-content page: information is general education, not individualized legal advice; no attorney-client relationship is formed by browsing or submitting an enquiry.
- Only publish a standalone page when there is enough real, reviewed content to justify it; otherwise fold the topic into a broader authoritative page (no thin pages for SEO's own sake).

## 6. Existing-Site / SEO-Equity Policy

No existing indexed Al Harraz website was found or supplied in this session (see `DISCOVERY_REPORT.md`). Treat this as a greenfield launch. If a legacy site or indexed URLs are discovered before launch: audit its URLs, preserve valuable content, and implement 301 redirects rather than letting old URLs 404 — tracked as a `Redirects` CMS collection so this can be done without a code deploy.

## 7. Success Metrics (post-launch)

- Consultation form starts/submits, phone clicks, WhatsApp clicks (tracked via GA4 events, no case-detail text ever sent to analytics — see `SECURITY.md`)
- Organic sessions and ranking positions for the clusters in `KEYWORD_MAP.md`
- Core Web Vitals (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1) on representative pages
- Indexed page count vs. published page count (no orphaned/duplicate pages)

## 8. What This Phase Does NOT Include

- No client portal, no online payment, no booking/calendar integration (explicitly deferred per brief §63-64; architecture leaves room for them but nothing is built in V1).
- No fabricated trust content published under any circumstance.
