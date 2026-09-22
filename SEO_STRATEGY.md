# SEO Strategy

Status: Phase 1. Implementation is tracked in `SEO_LAUNCH_PLAN.md` (post-build) and executed per `POST_LAUNCH_PLAN.md` for the first 6 months.

## 1. Foundations (every page)

- Unique `<title>` and meta description per locale, generated from CMS `seo{}` fields with a sane fallback (never a duplicate/generic default across pages).
- Canonical URL (self-referencing, or `canonicalOverride` from CMS for pagination/near-duplicate cases).
- `hreflang="ar"` / `hreflang="en"` / `x-default` reciprocal pair on every localized page.
- OpenGraph + Twitter Card metadata with a defined fallback OG image.
- `robots` meta driven by CMS `noindex` flag (defaults to indexable; draft content is never publicly routable, let alone indexable).
- Breadcrumbs (visual + `BreadcrumbList` JSON-LD) on all non-home pages.
- One `<h1>` per page, correct heading hierarchy enforced by component design, not by convention alone.

## 2. Structured Data

- `Organization` + `WebSite` — global, from `SiteSettings`.
- `LegalService` — home + practice-area pages, using only verified NAP data.
- `Person` — lawyer profile pages, only for published, verified profiles.
- `Article` — Insights pages, with author/reviewer/dates.
- `BreadcrumbList` — all non-home pages.
- `FAQPage` — only on pages where the visible on-page content genuinely is a Q&A list (no invisible/duplicated schema-only content).
- No schema type is emitted unless the underlying page content actually supports every required property with real data — unsupported/spammy markup is out of scope by design.

## 3. Technical SEO

- `sitemap.xml` generated dynamically from published CMS content (Pages, PracticeAreas, Industries, Lawyers, Articles), locale-aware, excluding drafts/noindex/admin/API routes.
- `robots.txt` allows public routes, disallows `/admin`, `/api`, and any staging host outright (staging is also password-protected/noindex at the infra level — see `DEPLOYMENT.md`).
- 301 `Redirects` collection consulted at the edge/middleware layer so URL changes never silently 404.
- No parameterized/duplicate URLs (`?id=`); clean slugs only (see `URL_MAP.md`).

## 4. Local SEO — Damietta

- Single verified NAP (Name/Address/Phone) used identically across the website footer, Contact page, `LegalService`/`LocalBusiness` schema, and (once created) the Google Business Profile — see `POST_LAUNCH_PLAN.md` checklist.
- No fabricated additional office/location pages. Copy explicitly states: HQ in Damietta, service available nationwide (per brief §01/§22 — never implies branch offices that don't exist).
- Google Map embed only added once a verified Google Business Profile / place URL exists (tracked in `CONTENT_REQUIRED.md`).

## 5. National SEO — Egypt

- Target service-intent clusters (see `KEYWORD_MAP.md`) via topical authority — deep practice-area and Maritime-hub content — rather than dozens of near-duplicate city pages (explicitly ruled out per brief §23).

## 6. Content/On-Page Discipline

- Topical clusters, not thin-page volume: a page is published only when it earns its own search intent and has enough real, reviewed content (brief §10, §25).
- Every article/practice page: publish date, last-reviewed date, author/reviewer, YMYL disclaimer.
- Internal linking plan defined in `INTERNAL_LINKING_PLAN.md` — every page reachable within 3 clicks from home, no orphans.

## 7. Monitoring (post-launch)

Google Search Console (domain property verification, sitemap submission, index coverage, Core Web Vitals report, structured data report), GA4 events (see `SECURITY.md` for what is/isn't sent to analytics).
