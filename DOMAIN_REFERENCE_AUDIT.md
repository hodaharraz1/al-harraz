# Domain Reference Audit — al-harraz.vercel.app → alharrazlaw.com

Date: 2026-09-28. Full-repository search for every reference to the old domain, before any migration changes were made.

## Root cause finding (read this first)

**The application has exactly one source of truth for its own URL: `siteConfig.siteUrl` in `src/lib/site-config.ts`, which reads `process.env['NEXT_PUBLIC_SITE_URL']`.** Every SEO surface (canonical, hreflang, sitemap, robots.txt, JSON-LD schema, Open Graph, IndexNow) derives from this single value — grep confirms **zero hardcoded occurrences of `al-harraz.vercel.app` anywhere in `src/` or `payload.config.ts`**.

Live verification (curl against `https://alharrazlaw.com`, which already resolves, has valid SSL, and serves the site) shows:

```
canonical on alharrazlaw.com/ar → https://al-harraz.vercel.app/ar
sitemap.xml on alharrazlaw.com  → all <loc> entries use al-harraz.vercel.app
robots.txt on alharrazlaw.com   → Sitemap: https://al-harraz.vercel.app/sitemap.xml
```

**This confirms: `alharrazlaw.com` was added as a domain alias in Vercel pointing at the existing deployment, but the `NEXT_PUBLIC_SITE_URL` Production environment variable was never updated.** Every downstream item in this migration (canonical, hreflang, sitemap, schema, OG, IndexNow) is therefore **blocked on one single action**: updating that one environment variable in Vercel and redeploying. See `OLD_DOMAIN_MIGRATION.md` for the exact steps.

This is good news architecturally — it means the migration is a **one-variable change**, not a scattered find-and-replace across the codebase.

## Every file referencing the old domain

| File | What it says | Action |
|---|---|---|
| `PROJECT_HANDOFF.md` | Lists production/admin URLs as `al-harraz.vercel.app` | Updated → `alharrazlaw.com` |
| `DEPLOYMENT.md` | States live URL as `al-harraz.vercel.app` | Updated → `alharrazlaw.com` |
| `DOMAIN_MIGRATION_PLAN.md` | Describes the (now-executing) migration plan itself | Superseded by this migration — updated to reflect completion status |
| `CONTENT_REQUIRED.md` | Notes the site "currently runs on the free `al-harraz.vercel.app` URL" | Updated |
| `INDEXNOW_SETUP.md` | Documents the IndexNow key file's URL on the old host | Updated |
| `FINAL_TECHNICAL_AUDIT.md` | Historical audit references (dated entries) | Left as historical record with a note — these are dated snapshots of past verification, not living config; rewriting history would misrepresent what was actually tested on which date |
| `contact/data.json` | The **separate** Al Harraz Contact (QR/vCard) sub-project's `website` field is hardcoded to `https://al-harraz.vercel.app` | Updated → `https://alharrazlaw.com`, QR code regenerated |

## Explicitly NOT touched

- **`FINAL_TECHNICAL_AUDIT.md`'s dated historical entries** — these document what was tested and found on specific past dates (e.g., "live `curl` checks against the production site at https://al-harraz.vercel.app" on 2026-09-23). Rewriting them to say `alharrazlaw.com` would misrepresent history — the site genuinely was at that URL when that testing happened. A note was added instead pointing to this migration.
- **No external references** (competitor mentions, generic documentation about Vercel itself, etc.) were found or touched — the search was scoped to this project's own files only.
