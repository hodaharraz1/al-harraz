# Bing Webmaster Tools — New Domain Setup Plan

## Status: BLOCKED — REQUIRES USER ACCESS (Microsoft/Bing account)

This session has no access to the firm's Bing Webmaster Tools account, so nothing below has been executed.

## Exact steps

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
