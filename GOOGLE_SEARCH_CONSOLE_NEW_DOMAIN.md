# Google Search Console — New Domain Setup Plan

## Status: BLOCKED — REQUIRES USER GOOGLE ACCESS

This session has no access to the firm's Google account, so none of the steps below have been executed — this is a precise plan to execute, not a completion claim.

## Recommended property type: Domain property

A **Domain property** (rather than a URL-prefix property) is recommended because it automatically covers `https://`, `http://`, `www.`, and non-`www.` variants of `alharrazlaw.com` under one property — useful during a migration where multiple host variants may briefly be reachable.

## Exact steps

1. Go to [Google Search Console](https://search.google.com/search-console) and sign in with the account that already manages the existing `al-harraz.vercel.app` property (or a new one if preferred).
2. Click **Add Property** → choose **Domain** (left option, not "URL prefix") → enter `alharrazlaw.com` (no `https://`, no `www`, no trailing slash).
3. Google will show a **DNS TXT record** to add. Copy it.
4. Go to the domain registrar's DNS management panel (wherever `alharrazlaw.com`'s nameservers are managed) → add a new **TXT record** at the root (`@`) with the exact value Google provided.
5. Return to Search Console and click **Verify**. DNS propagation can take a few minutes to a few hours; if verification fails immediately, wait and retry rather than assuming failure.
6. Once verified, go to **Sitemaps** (left sidebar) → submit: `https://alharrazlaw.com/sitemap.xml`
7. Use **URL Inspection** (top search bar) to check:
   - `https://alharrazlaw.com/ar`
   - `https://alharrazlaw.com/en`
   - 2–3 high-priority practice-area pages (e.g., civil law)
   - 1–2 representative article pages
   For each, if not yet indexed, use "Request Indexing."
8. Going forward, monitor under the left sidebar: **Indexing → Pages**, **Core Web Vitals**, **Search results** (Performance), **Security & Manual Actions**.

## Relationship to the existing `al-harraz.vercel.app` property

Keep the existing property in Search Console rather than deleting it — it retains historical performance data and lets Google's own systems observe the 308 redirects (once live) from the old domain to the new one, which is the standard, Google-recommended way to signal a site move. Do **not** use Search Console's formal "Change of Address" tool for a `*.vercel.app` → custom-domain move unless Google's own guidance explicitly recommends it for this exact scenario at the time this is executed — that tool has specific eligibility requirements this plan does not assume are met without checking Google's current documentation first.

## What this plan does NOT claim

No claim of guaranteed indexing speed, ranking position, or crawl priority. Search Console setup makes the site inspectable and submittable — it does not itself change how Google ranks anything.
