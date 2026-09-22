# Testing

## What Has Actually Been Run (this session)

- `npx tsc --noEmit` — clean, 0 errors.
- `npx eslint .` (flat config, `eslint-config-next`) — clean, 0 errors/warnings.
- `npm run build` (`next build`, Turbopack) — succeeds; all 27 routes compile, including SSG for locale-static pages and dynamic rendering for `[slug]` pages.
- `npx vitest run` — 22/22 unit tests passing (`tests/unit/*.test.ts`): WhatsApp link builder, i18n helpers, Zod validation schema, rate limiter, site-config invariants (no fabricated facts).
- `npx playwright test` — 11/11 e2e smoke tests passing (`tests/e2e/smoke.spec.ts`), run against a real `next start` production server + the real seeded Postgres database: locale redirect/RTL/LTR, language switch, primary nav, Maritime hub link, custom 404, mobile CTA bar hrefs, full consultation-form submission (writes to Postgres, verified), robots.txt content, sitemap.xml content, admin noindex header.
- Manual `curl` smoke tests of every top-level route (200s confirmed), the admin panel (`/admin` loads, shows "Dashboard - Al Harraz CMS"), and a direct Postgres query confirming a form submission and the seeded lawyers/practice-areas/industries/history landed correctly.

## Lighthouse Audit (run in this session, against the real production build + seeded database)

Ran via the `lighthouse` CLI against the local Chromium binary (`CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`), one page at a time, `--only-categories=performance,accessibility,best-practices,seo`.

**13 pages audited** (both locales' homepage, About, History, Team index + one profile, Practice Areas, Industries, Insights, Contact, Consultation, Privacy, Terms):

| Category | Result across all 13 pages |
|---|---|
| Accessibility | **100/100 on every page** |
| Best Practices | **100/100 on every page** |
| SEO | **100/100 on every page** |
| Performance | 98-100 (LCP ~1.7s, CLS 0, TBT ~100ms on the homepage) |

This was not clean on the first run — three real, verified bugs were found and fixed as a direct result of this audit:

1. **Color contrast failures (WCAG AA)**: the brand `cyan-600` token (`#0891a8`) only hit ~3.7:1 contrast for white-on-cyan buttons and cyan-on-white text, failing the 4.5:1 requirement. Fixed by darkening the token to `#086d80` (5.5-6:1 in both directions) in `globals.css` — a single token change fixed every affected component. Separately, several `text-navy-900/50` and `/60` secondary-text usages across 7 files were computed at 3.1-4.3:1 and bumped to `/70` (5.6-6.1:1). Verified by computing exact WCAG contrast ratios in Python, then re-confirmed via Lighthouse.
2. **Missing meta description on lawyer profile pages**: `generateMetadata` fell back to the (unset) `role` field, producing an empty description tag. Fixed with a real bilingual fallback string. Also made `summary`/`excerpt` **required** fields on PracticeAreas, Industries, and Articles in the CMS so this class of bug can't recur as content gets published.
3. **Invalid heading hierarchy (h1 → h3, skipping h2)** on index pages (`/team`, `/insights`, `/practice-areas`, `/industries`) where a shared grid component conditionally omitted its `<h2>` when passed an empty heading. Fixed by making `heading` a required prop on all four grid components (`TeamPreview`, `InsightsPreview`, `PracticeAreasGrid`, `IndustriesGrid`) with a new `visuallyHiddenHeading` prop (renders `sr-only` instead of skipping the heading entirely) — so the heading is always present in the DOM for assistive tech, whether or not it's shown visually.
4. **Console error**: `/favicon.ico` 404'd on every page load (browsers probe this path directly, independent of `<link rel="icon">`). Fixed by generating a placeholder "AH" monogram favicon (`src/app/favicon.ico` + `src/app/(frontend)/icon.svg`) — flagged in `CONTENT_REQUIRED.md` for replacement once the real logo exists.

## Structured Data Validation

Extracted and parsed every `application/ld+json` block from the rendered homepage — valid JSON, correct required `schema.org` properties for `LegalService`, `WebSite`, `BreadcrumbList`, `Person`, and `Article`. This confirms syntactic/structural validity only; it has not been run through Google's Rich Results Test (no access to that specific external tool from this session) — do that once the site is live and the real production URL exists.

## Internal Link Crawl (run in this session)

A Python crawler starting from `/ar` and `/en`, following every internal `href`, found **2 broken links** on the first pass: the Header nav, Footer nav, and homepage's Maritime feature block all hard-linked to `/practice-areas/maritime-shipping-port-law`, which 404s because that practice area is seeded as a draft (see `CONTENT_REQUIRED.md`). Fixed by computing publish status once per request (`src/lib/maritime.ts`, wrapped in React's `cache()` so the layout and homepage share one query) and conditionally rendering the link only when the page is actually published. Re-crawled after the fix: **0 broken links** across all 28 sitemap-listed URLs.

## What Has NOT Been Run (be explicit about this — don't claim more than was verified)

- No cross-browser testing beyond the single pre-installed Chromium build in this sandbox (see below) — Safari/Firefox/Edge and real iOS/Android devices are untested.
- No load/concurrency testing of the rate limiter or the Postgres connection pool.
- No penetration testing.
- Lighthouse was run against a local server in a sandboxed container, not the real production host/network — re-run once deployed, since real-world network conditions and CDN caching will change the Performance numbers (likely for the better, given they're already 98-100 locally).

## Two things that were diagnosed and fixed during this session (worth knowing about)

1. **`payload generate:types`/`migrate:create` failed with `ERR_REQUIRE_ASYNC_MODULE`** until `"type": "module"` was added to `package.json`. This is a Payload CLI + `@payloadcms/richtext-lexical` ESM interop issue on Node 22, not a code bug — documented here in case a future Payload upgrade changes this requirement.
2. **`robots.ts` silently failed to register as a route** when placed at `src/app/(frontend)/robots.ts` (same directory as the working `sitemap.ts`) under Turbopack. Confirmed via a clean `rm -rf .next && next build` that it never appeared in the build's route table or `.next/server/app/`, while `sitemap.ts` in the same folder worked every time. Moving it one level up to `src/app/robots.ts` fixed it immediately with a clean build. If re-testing on a future Next.js version, it may be worth moving it back to keep the frontend group self-contained.

## Playwright Environment Note

This sandbox has a pre-installed Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` that doesn't match the `chrome-headless-shell` revision `@playwright/test` 1.51.x expects by default, and outbound download of a matching browser isn't available. `playwright.config.ts` sets `launchOptions.executablePath` explicitly to the pre-installed binary. If browser tests fail with "Executable doesn't exist" on a different machine, update that path or run `npx playwright install` where network access allows it.

## Running the Suite Locally

```bash
npm run typecheck
npm run lint
npm run build
npm run test:unit
# e2e requires a running server on :3000 with a seeded database:
npm run start &
npm run test:e2e
```
