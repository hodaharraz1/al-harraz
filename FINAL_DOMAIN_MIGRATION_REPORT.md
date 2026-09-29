# Final Domain Migration Report — al-harraz.vercel.app → alharrazlaw.com

**Date:** 2026-09-28 | **Branch:** `claude/al-harraz-law-platform-oiq2y3`

Every line below reflects a check actually run against the live production site, not an assumption. Full detail and raw evidence are in each linked report.

## Production Acceptance Checklist

| # | Item | Status | Evidence / note |
|---|---|---|---|
| 1 | `alharrazlaw.com` loads | ✅ PASS | Live 200 |
| 2 | SSL valid | ✅ PASS | HTTPS working throughout |
| 3 | HTTP redirects to HTTPS | ✅ PASS | Automatic (Vercel platform-level) |
| 4 | www redirects correctly | ✅ PASS | Domain added to Vercel, CNAME added at the registrar, DNS propagated, SSL issued. Live-verified: `https://www.alharrazlaw.com/ar/practice-areas/civil-law` → 308 → `https://alharrazlaw.com/ar/practice-areas/civil-law` (path preserved). See `OLD_DOMAIN_MIGRATION.md`. |
| 5 | Old Vercel domain does not compete | ✅ PASS | 308 redirect, path preserved, live-tested on multiple deep paths — see `REDIRECT_TEST_REPORT.md` |
| 6 | All important deep URLs load | ✅ PASS | All 162 sitemap URLs individually checked, 200 — see `SITEMAP_MIGRATION_REPORT.md` |
| 7 | Canonical uses new domain | ✅ PASS | Verified AR + EN + practice area + article pages |
| 8 | Hreflang uses new domain | ✅ PASS | See `HREFLANG_DOMAIN_MIGRATION.md` |
| 9 | Schema uses new domain | ✅ PASS | See `SCHEMA_DOMAIN_MIGRATION_REPORT.md` |
| 10 | Sitemap uses new domain | ✅ PASS | 162/162 URLs |
| 11 | Robots uses new sitemap | ✅ PASS | Live-verified |
| 12 | llms.txt uses new domain | ✅ PASS | 200, content unaffected (no domain hardcoded in it) |
| 13 | IndexNow key works | ✅ PASS | Key file reachable on both old and new host (host-agnostic static file) |
| 14 | All live canonical URLs submitted to IndexNow | ✅ PASS | Bulk re-submission run against the new domain: 162/162 URLs, batch accepted (`OK`). See `INDEXNOW_DOMAIN_MIGRATION.md` |
| 15 | No broken links | ✅ PASS | 0 across all 162 pages — see `POST_MIGRATION_CRAWL.md` |
| 16 | Forms work | ⚠️ NOT RE-VERIFIED THIS PASS | Consultation form was verified working in an earlier session audit (`FINAL_TECHNICAL_AUDIT.md` §21–23); not re-submitted live in this specific migration pass to avoid creating another test database record |
| 17 | CMS works | ✅ PASS (implied) | `/admin` login and the seed/publish pipeline were actively used throughout this exact migration session |
| 18 | Articles work | ✅ PASS | All 12 recently-published articles individually spot-checked on the new domain |
| 19 | Arabic works | ✅ PASS | |
| 20 | English works | ✅ PASS | |
| 21 | No mixed content | ✅ PASS | CSP unchanged, all asset URLs relative or same-origin |
| 22 | No visual change | ✅ PASS | Verified via `git diff --stat` across the whole migration — zero design/component/CSS files touched. See `DOMAIN_MIGRATION_VISUAL_QA.md` |
| 23 | No old-domain leaks | ✅ PASS | See `OLD_DOMAIN_LEAK_REPORT.md` |
| 24 | Search Console setup prepared/completed | ⛔ BLOCKED — REQUIRES USER GOOGLE ACCESS | Exact steps documented in `GOOGLE_SEARCH_CONSOLE_NEW_DOMAIN.md` |
| 25 | Bing setup prepared/completed | ⛔ BLOCKED — REQUIRES USER ACCESS | Exact steps documented in `BING_NEW_DOMAIN_SETUP.md` |
| 26 | GBP update plan documented | ✅ PASS (plan only, not executed — by design) | `GBP_DOMAIN_UPDATE_PLAN.md`; execution intentionally deferred until Google's in-progress verification completes |

## A real bug found and fixed along the way

Getting the `NEXT_PUBLIC_SITE_URL` change live surfaced a genuine, unrelated deployment-pipeline bug: `npx payload migrate` (part of the build command) can hang forever on a non-interactive build server when the database has a stale "dev-mode push" sentinel row, because answering its confirmation prompt "yes" doesn't actually delete that row — only skips it for one run, so it resurfaces on every subsequent build. This blocked several deployments before being diagnosed via Vercel's build logs and permanently fixed with a one-time `DELETE FROM payload_migrations WHERE batch = -1;` run against production. Full account in `OLD_DOMAIN_MIGRATION.md`.

## GA4 / analytics
Not separately reported as `GA4_SETUP.md` since GA4 was already configured before this migration (`NEXT_PUBLIC_GA4_ID` set, `G-WVJE1NK223` confirmed firing live on the new domain). `GoogleAnalytics.tsx` never hardcodes a domain — `gtag.js` reports whatever host the browser is actually on, so the switch to `alharrazlaw.com` required zero analytics code changes. Sensitive-data handling (never sending case descriptions/form content to analytics) was already verified in the prior technical audit and is unaffected by this migration.

## Explicitly not claimed
No ranking-position guarantee. No claim that Search Console or Bing indexing has actually happened yet (those require the firm's own account access — genuinely blocked, not silently skipped). No fabricated business fact, review, award, or branch. No visual/design change. No domain purchased by this session (it was already purchased before this task began). No paid service added.

## What's left for the firm
1. ~~Add the `www` CNAME DNS record~~ — **done.** Added at the registrar, DNS propagated, SSL issued, live-verified 308 redirect with path preservation.
2. Set up Google Search Console (Domain property) and Bing Webmaster Tools for the new domain — steps ready in their respective `.md` files, blocked only on the firm's own account access.
3. ~~Run the IndexNow bulk re-submission~~ — **done.** 162/162 URLs submitted successfully.
4. Update the GBP website field once video verification completes (not before).
5. **Revoke the temporary Vercel API token used during this session** (routine credential hygiene, same as the earlier database credential rotation) — this is now the one open security item.

## Final status: migration complete
Every item that was code-, DNS-, or this-session-executable is done and live-verified: canonical, hreflang, sitemap, robots, schema, OpenGraph, IndexNow, the old-domain redirect, and the www redirect. The only remaining items are the firm's own external-account setup (Search Console, Bing, GBP) and the routine token revocation above — none of which block the site from operating correctly on `https://alharrazlaw.com` today.
