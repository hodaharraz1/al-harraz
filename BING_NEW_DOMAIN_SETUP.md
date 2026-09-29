# Bing Webmaster Tools — New Domain Setup Plan

## Status: PASS — site verified and sitemap submitted

**Update 2026-09-29:** The firm owner added `https://alharrazlaw.com` to Bing Webmaster Tools himself (this session has no Bing/Microsoft account access, so this required his own action, per the standing BLOCKED rule — now resolved). Verified via **DNS CNAME**: record `aed88ab2579cd89829078a3f62b89032` → `verify.bing.com` added at the registrar (Namecheap Advanced DNS), propagated, then confirmed by Bing with "Congratulations! Site addition successful — Your domain https://alharrazlaw.com/ is successfully added to Bing Webmaster Tools." Sitemap submitted immediately after: `https://alharrazlaw.com/sitemap.xml` → confirmed "Success: https://alharrazlaw.com/sitemap.xml is successfully submitted for processing," listed under Sitemaps with status "Processing" (normal — Bing crawls it shortly after submission; this is not a claim that indexing has completed, only that the sitemap was accepted).

This was done through the site-switcher at the top of Bing Webmaster Tools (it defaults to whichever site was last open — the firm's existing unrelated `baytk-jeddah.com` property — so the sitemap submission had to be retried once after switching the selector to `alharrazlaw.com`; documented here in case it recurs).

## Original plan (steps as executed)

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters) and sign in (a Microsoft account).
2. **If the old `al-harraz.vercel.app` property already exists there:** use Bing's "Add a new site" flow for `https://alharrazlaw.com` — Bing also offers an **Import from Google Search Console** option if the GSC domain property above is verified first, which can save re-doing DNS verification. Otherwise, verify independently:
3. Add site: `https://alharrazlaw.com`.
4. Choose a verification method — **DNS (TXT/CNAME record)** is recommended for consistency with the Google Search Console setup (one DNS change covers both, if using the same TXT-style approach; check Bing's exact current record format, since it differs from Google's).
5. Add the record at the domain registrar, then click **Verify** in Bing Webmaster Tools.
6. Submit sitemap: **Sitemaps** (left sidebar) → **Submit sitemap** → `https://alharrazlaw.com/sitemap.xml`.
7. Confirm **IndexNow** is recognized: Bing Webmaster Tools has its own IndexNow status page (under **IndexNow** in the sidebar) — it should show submissions arriving once the bulk re-submission in `INDEXNOW_DOMAIN_MIGRATION.md` runs, since Bing is one of the participating engines.
8. Monitor: **Site Explorer** (crawl status), **Reports & Data → Index Explorer**, and any crawl-error reports Bing surfaces.

## What this plan does NOT claim

No guarantee of crawl speed, indexing timeline, or ranking. This registers the domain for visibility into Bing's own crawl/index status — it does not itself change anything about how Bing ranks the site.
