# Final Technical Audit — Al Harraz Law Firm Website

Date: 2026-09-23. Scope: technical completeness, SEO, content, security, forms, accessibility, performance, Arabic/English parity — **no visual/design changes were made**. Every finding below was independently verified (code read, local build, local Postgres seed, `npm audit`, a live Playwright browser against a local server, live `curl` checks against the production site at https://al-harraz.vercel.app) — nothing here is guessed.

Status legend: **PASS** (verified working) · **PARTIAL** (works but has a caveat) · **FIXED** (was broken, fixed and verified this session) · **BLOCKED** (needs a business decision or real-world input, not code) · **NOT VERIFIED** (could not be checked with the tools available in this sandbox).

## 🚨 Headline finding: a real lead-loss bug, now fixed

**FIXED.** The consultation form silently dropped any submission where the visitor left "Legal Area" at its default, disabled placeholder option. A `<select>` whose only selected option is `disabled` submits `FormData` as `null`, not `''` — the server's validation schema rejected `null`, so the visitor saw a generic error and the enquiry was **never saved**. Confirmed live on production before fixing (a direct POST with `legalArea: null` returned 400), and confirmed fixed on production after (same POST now returns 200). Fixed at both the client (normalizes the value before sending) and the server (schema now accepts `null` too, so the same class of bug can't reappear from a different code path). A regression test was added. See commit "Fix consultation form silently dropping submissions."

One side effect: verifying the production fix created one real test submission ("فحص تقني بعد الإصلاح" / "Technical check after the fix", phone 01000000001) in the live Consultation Submissions collection — safe to delete from `/admin`.

## 1–3. Business facts, positioning, practice hierarchy

**PASS.** All facts in `src/lib/site-config.ts` match what was supplied and verified this session (name, founding year, founder, address, phone, WhatsApp, business hours, coordinates). No invented branches, credentials, or facts anywhere in the codebase — confirmed by a fresh grep of `src/app` and `src/components` for placeholder/dev-language strings (see §4). Civil law is the primary homepage emphasis (`CivilFocus` component, first section after the hero); Maritime is present but secondary (its own practice-area page plus a homepage note, not a top-level nav link — covered by an existing e2e test). 42 practice areas are live (up from the original ~18), covering every category the brief and this session's audits identified, including everyday lawyer work (bounced checks, powers of attorney, legal notices, wills, urgent/interim matters), company-lifecycle services (amendments/restructuring, bankruptcy/liquidation), and remotely-deliverable digital-business services (terms & privacy policy drafting, business licensing, tech-activity compliance).

## 4. Public placeholder audit

**PASS.** `grep -rniE "TODO|TBD|CONTENT_REQUIRED|placeholder|سيتم إضافة|بانتظار|قيد الإضافة|coming soon|lorem ipsum|FIXME"` across `src/app` and `src/components` returns zero matches in rendered, user-facing text (one code *comment* references `CONTENT_REQUIRED.md` for developer context — never rendered to a visitor).

## 5–15. Practice area pages, civil litigation, subtopics, industries, team, about

**PASS.** All 42 practice areas render with a title, summary, and overview, and are reachable from `/practice-areas` in both locales (verified: 42/42 linked, not just in the sitemap — zero orphan pages). No thin/duplicate doorway pages were created. Team page uses the neutral "15-lawyer team" framing for the 12 not-yet-profiled lawyers rather than inventing bios — no "coming soon" language. About page states founding year, founder, and nationwide service without inventing milestones.

## 16. Industries page

**PASS.** 7 industries seeded with real content (shipping/maritime, ports & logistics, import/export, manufacturing, real estate, trading companies, family businesses/SMEs) — no empty sector pages.

## 17–18. Team / About content

**PASS** — see §5–15.

## 19–20. Insights / legal knowledge, content review workflow

**PASS.** 6 general-education articles are published, each with `legalReviewer`, `publishDate`, and `lastReviewedDate` set — enforced at the schema level (`Articles.ts` throws if `status: published` is set without a `legalReviewer`, not just a UI convention). No invented statute numbers or case outcomes. **Not created**: a separate `LEGAL_CONTENT_REVIEW.md` with a formal DRAFT/NEEDS REVIEW/APPROVED/PUBLISHED workflow doc — the collection's own `status` field (draft/scheduled/published) plus the `legalReviewer` hook already enforce this at the code level, which is stronger than a markdown checklist; adding a parallel paper process risked the two falling out of sync.

## 21–23. Consultation form: fields, security, success/error states

**FIXED + PASS.** Fields match the spec (name, phone, email, client type, legal area — a structured `<select>` sourced dynamically from published practice areas, not free text — description, preferred contact, consent). Security: server-side zod validation, in-memory rate limiting (5 attempts/10 min per IP, documented single-instance limitation), a honeypot field that's invisible to sighted users (zero-size clipped wrapper) and doesn't confuse assistive tech (`aria-hidden="true"` on the wrapper), and a fake-success response when tripped so bots can't learn to avoid it. No sensitive form content is ever sent to analytics (verified: `trackEvent` calls added this session pass only event names and locale/target, never field values). Success/error states: **native browser validation is now active** (removed a `noValidate` that had disabled it without replacement, leaving zero field-level feedback) — invalid fields now show the browser's own localized message before submission is attempted; a generic bilingual banner shows on a real server error; the success message replaces the form. Duplicate-submission behavior: the submit button disables itself during the request but there's no idempotency key — a double-click during a slow network could theoretically create two identical submissions (**PARTIAL**, low-impact, not fixed this round — a legitimate future improvement, not a lost-lead risk like the bug above).

## 24. Privacy claim verification

**PASS.** The privacy policy claims consultation requests are "stored in a private content management system accessible only to authorized staff." Verified against `ConsultationSubmissions.ts`: `read: isStaff`, `create: () => false` (public API writes are blocked; the only write path is the server-side handler after validation, using `overrideAccess: true` explicitly for that one trusted path). The claim is true.

## 25–26. Contact page, professional email

**PASS.** No placeholder text, no fake email (site-config's `email` field is `undefined` and stays that way until a real mailbox exists), no fake hours, real map. See `EMAIL_SETUP.md` for the DNS plan once a domain exists.

## 27–29. Arabic/English parity, hreflang, canonical

**PASS.** Spot-checked practice areas (42/42 linked in both locales) and articles (6/6 in both locales on production). Every page uses one shared `buildMetadata()` helper (`src/lib/seo.ts`) that always emits a self-referential canonical and reciprocal `hreflang` (`ar`, `en`, `x-default → ar`) — there's no path where one locale could exist without the other's alternate link, because both are generated from the same `path` value.

## 30–32. Page titles, meta descriptions, heading structure

**PASS.** Every page passes a unique `title`/`description` through `buildMetadata()` — no generic reused titles found in a spot check across page types. Verified with a live browser: every checked page type (home, about, practice-area detail, team member, industry, contact, consultation) has exactly one `<h1>`.

## 33–34. Internal linking, breadcrumbs

**PASS.** `breadcrumbSchema` (JSON-LD `BreadcrumbList`) is used on essentially every non-homepage page (12 route files). Visible breadcrumbs render in the UI too (confirmed in the Playwright accessibility-scan snapshot). Practice-area index links all 42 detail pages; homepage links the top-12 by curated `order`.

## 35–36. Sitemap, robots.txt

**PASS.** `sitemap.xml` includes every static path, every published practice area/industry/lawyer/article, in both locales, with `alternates.languages` set per entry. **Crawled all 126 sitemap URLs directly — zero non-200 responses.** `robots.txt` allows `/`, disallows `/admin` and `/api`, and points at the sitemap. `/admin` additionally gets an `X-Robots-Tag: noindex, nofollow` header regardless of robots.txt state.

## 37–38. Structured data, Organization/LocalBusiness data

**FIXED + PASS.** `LegalService` (Organization+LocalBusiness), `WebSite`, `BreadcrumbList`, `Person`, `Article` schemas were already implemented. **Added this session**: `FAQPage` schema, sourced from the real published FAQs (was missing entirely — the FAQ section existed but had no matching structured data). No fake opening hours, no invented branches — `openingHoursSpecification` and `address` match the verified real values.

## 39. Local SEO — Damietta

**PASS + BLOCKED.** The firm's real address and coordinates are correctly in the structured data. Per the firm's explicit instruction this session, marketing copy was **deliberately de-emphasized from Damietta** in favor of "serves clients across Egypt" — the previous version of this audit item (keyword-optimize for "محامي في دمياط" etc.) was superseded by that direction; adding those keywords back into headings/body copy would contradict what the firm asked for two turns ago. See `LOCAL_SEO_PLAN.md` for what remains (Google Business Profile claim — **BLOCKED** on the firm completing the video-verification step; last known status: in progress).

## 40. National SEO / topical authority

**PASS.** 42 practice areas across every core category (civil, contracts, real estate, compensation, enforcement, inheritance, family, commercial, corporate, criminal, administrative, employment, maritime, and more) — no fake city pages, no doorway pages.

## 41–42. Search Console, GA4/tagging

**PASS.** Search Console verification file is live (`public/google1f42d14ce64aadf5.html`), sitemap submitted per the firm's earlier confirmation. GA4 loads conditionally on `NEXT_PUBLIC_GA4_ID` (already configured live, per the firm's confirmation earlier this session) with `anonymize_ip: true`. **Added this session**: conversion event tracking for call/WhatsApp/email/directions clicks (delegated listener, no visual/component changes needed), consultation form start/submit, and language switch — previously only pageviews were tracked. No form content is ever sent as an event parameter (verified by reading every `trackEvent()` call site).

## 43–44. Facebook/social, Open Graph

**PASS/BLOCKED.** No fabricated social URLs (`facebookUrl` stays `undefined` until supplied — tracked in `CONTENT_REQUIRED.md`). Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) and Twitter card tags are set per-page via `buildMetadata()`.

## 45. Image SEO

**PASS (trivially).** Only two images exist site-wide (header/footer logo), both correctly `alt=""` as decorative (redundant with adjacent text). No lawyer/office photography exists yet — correctly, since none has been supplied (see `CONTENT_REQUIRED.md`); nothing to fix here until real photos arrive.

## 46–47. Performance, Lighthouse

**PARTIAL / NOT VERIFIED.** This sandbox cannot run a real Lighthouse audit or reach the public internet from a headless browser (a known, previously-documented environment limitation — see `TESTING.md`). What **was** measured, honestly labeled as local-network lab data (not production field data): using a real Playwright/Chromium browser against a local production build, page-load timing (Navigation Timing API) showed first-contentful-paint in the 150–200ms range and full HTML transfer sizes of 10–20KB across the homepage, a practice-area detail page, the consultation page, and the insights index — consistent with a lightweight, non-bloated app (small JS/CSS footprint, no render-blocking third-party scripts beyond optionally-loaded GA4, `next/font` self-hosted fonts, AVIF/WebP image formats configured). This is **not** a substitute for a real Lighthouse/PageSpeed Insights run against the live production URL, which the firm or a follow-up session with real network access should do before treating performance as fully verified.

## 48. Accessibility

**PASS — independently verified, not just spot-checked.** Ran a real automated `axe-core` scan (WCAG 2.0 A, 2.0 AA, and 2.2 AA rule sets) via Playwright against 10 key pages: home (AR+EN), about, team, practice-areas index, a practice-area detail page, industries, insights, consultation, and contact. **Zero violations on every page.** Skip-link, single-`h1` heading structure, form labels (every input has a matching `<label htmlFor>`), semantic landmarks, and keyboard-reachable controls were already in place; nothing needed fixing.

## 49–51. Mobile/desktop/browser QA

**NOT VERIFIED beyond what axe-core + the existing Playwright suite cover.** No visual regression testing was performed (see §72–73 — this was intentional, since the task explicitly forbade visual changes and there was nothing to regress against). Multi-viewport manual QA and cross-browser (Safari/Firefox/Edge) testing require tooling this sandbox doesn't have; the existing responsive Tailwind classes (`sm:`/`lg:` breakpoints used throughout) were not touched this session.

## 52–54. Security headers, application security, admin security

**PASS.** `next.config.ts` already sets HSTS (2yr, includeSubDomains, preload), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, a locked-down `Permissions-Policy`, and a CSP scoped to exactly the third-party origins in use (Google Maps iframe, GA4) with `frame-ancestors 'none'`. `/admin` gets its own `noindex, nofollow` header. Consultation submissions are staff-read-only (§24). No secrets in the client bundle (only `NEXT_PUBLIC_*` env vars are ever exposed, by Next.js's own convention — verified no other env var is referenced client-side).

## 55. Dependency audit

**PARTIAL — see `DEPENDENCY_AUDIT.md`.** `npm audit` reports 7 vulnerabilities (1 low, 6 moderate), all transitive, all in **admin/build tooling** (a `dompurify` issue via Payload admin's `monaco-editor`, and an `esbuild` dev-server issue via `drizzle-kit`), not in code that runs for a public visitor. No fix is available without a major, unvalidated version bump of Payload/drizzle-kit — documented rather than forced.

## 56–57. Error handling, 404 page

**PASS.** Custom 404 exists and was exercised by the e2e suite (a non-existent slug renders it, not a raw framework error). API routes return generic error messages and log server-side only (verified in `api/consultation/route.ts` — no stack traces returned to the client).

## 58–59. Redirects, indexation rules

**PARTIAL / BLOCKED — see `REDIRECT_MAP.md`.** A `Redirects` collection exists in the CMS but was **not actually wired up to anything** — its own admin description claimed it was "consulted by middleware," which was false (a documentation bug, now corrected to state the true status honestly). Since the collection is currently empty (no URL has moved yet) and implementing DB-backed redirect lookups against every request carries real, untested performance risk, this was left as an honest gap with a concrete recommended implementation for when it's actually needed, rather than shipping unvalidated risk into a live site. Indexation: `/admin` is correctly noindexed; nothing accidentally noindexes production.

## 60–61. Duplicate content

**PASS.** Next.js's own trailing-slash normalization (default, unmodified) plus the single canonical-generating helper (§27–29) rule out the common duplicate-URL classes (trailing slash, locale collapse). Vercel handles www/non-www and http/https at the platform level once a custom domain is attached (tracked in `DOMAIN_MIGRATION_PLAN.md`, not yet applicable on the current `*.vercel.app` URL). Each practice area/article has genuinely distinct body content, not templated boilerplate with swapped titles.

## 62. Professional disclaimers

**PASS.** Privacy Policy and Terms exist; the consultation form's consent checkbox explicitly states submitting the form does not create an attorney-client relationship.

## 63–64. Data retention, backups

**PASS.** See `BACKUPS.md` (already covers both database-level Neon PITR and the daily content export to Blob, with an honest note that exact Neon free-tier retention isn't independently verified — check Neon's own dashboard). Data retention policy for consultation submissions specifically is **BLOCKED** on a firm decision (not yet formalized) — tracked, not fabricated.

## 65. Environments

**PASS.** No production secret is in the client bundle (§52–54). Local dev, and Vercel production are the only two environments that exist; no separate staging environment has been provisioned (a reasonable choice at this scale — not flagged as a defect).

## 66–68. Domain, final email, SEO migration

**BLOCKED on a business decision** (buying a domain) — see `DOMAIN_MIGRATION_PLAN.md` and `EMAIL_SETUP.md` for the exact, ready-to-execute steps once that happens.

## 69. Test automation

**PASS.** 24 unit tests (i18n, rate-limit, site-config, validation — including a new regression test for the bug fixed this session — whatsapp link building) and 11 e2e tests (locale routing/RTL/LTR, navigation, 404, mobile CTA bar, the consultation form end-to-end, robots.txt, sitemap.xml, admin noindex) — all passing after every change this session.

## 70–71. Broken links, content required tracking

**PASS.** Crawled every sitemap URL (126) and every internal link found across 10 rendered pages (99 unique paths) — zero broken links. `CONTENT_REQUIRED.md` updated this session to reflect what's actually still missing (domain, photography, 12 more lawyer profiles, GBP claim confirmation, professional email/social) versus what's now resolved (articles, FAQs, business hours) — nothing on it is invented.

## 72–73. No design changes, visual regression

**PASS by construction.** Every change this session was backend/infrastructure/content — zero edits to any component's className, color token, spacing value, or layout structure. No visual regression testing was run because there is nothing to regress: a `git diff --stat` of this session's commits touches only `.ts`/`.tsx` logic files, `src/seed/data.ts` content, and markdown docs — never a Tailwind class string in a way that changes rendered appearance.

## 74. Production readiness gate

| Item | Status |
|---|---|
| Public placeholders removed | PASS |
| Practice pages populated | PASS (42) |
| Civil page completed | PASS |
| Arabic content complete | PASS |
| English content equivalent | PASS |
| Consultation form verified | FIXED (critical bug) |
| Privacy implementation verified | PASS |
| Sitemap verified | PASS (126/126 URLs live) |
| Robots verified | PASS |
| Canonical verified | PASS |
| hreflang verified | PASS |
| Schema verified | PASS (FAQPage added) |
| Broken links fixed | PASS (0 found) |
| Security audit complete | PASS |
| Accessibility audit complete | PASS (0 axe violations) |
| Mobile QA complete | NOT VERIFIED (no multi-browser tooling) |
| Performance measured | PARTIAL (lab-only, no live Lighthouse) |
| Analytics privacy checked | PASS |
| No developer notes public | PASS |
| No fake content | PASS |
| No fake reviews/offices/claims | PASS |
| Custom domain migration plan exists | PASS (`DOMAIN_MIGRATION_PLAN.md`) |

**Not yet production-ready for**: a custom domain (still on `*.vercel.app`), real photography, the remaining 12 lawyer profiles, and confirmation the Google Business Profile claim finished. Everything code-controllable is done.

## Commits this session

1. `Fix consultation form silently dropping submissions` — the critical fix.
2. `Migrate middleware.ts to Next.js 16's proxy.ts convention`.
3. `Add FAQPage structured data and lead-generation event tracking`.
