# Google Search Console — New Domain Setup Plan

## Status: PASS — Domain property verified, sitemap submitted

**Update 2026-09-29:** The firm owner created a **Domain property** for `alharrazlaw.com` himself (this session has no Google account access, so this required his own action, per the standing BLOCKED rule — now resolved). Verified via **DNS TXT record**: `google-site-verification=KyjEgthDqnW8M-dG_9ogGbDIm5KNyfJ_uvLMIMg4TDU` added at the registrar (Namecheap Advanced DNS, host `@`), propagated, then confirmed by Search Console: "تم التحقّق من الملكية" (Ownership verified). Sitemap submitted immediately after at `https://alharrazlaw.com/sitemap.xml` → confirmed "تم إرسال ملف خريطة الموقع بنجاح" (Sitemap submitted successfully), status "تم الإجراء بنجاح" with 162 pages discovered.

Note: submitting the bare relative path `sitemap.xml` was initially rejected as invalid by this Domain property's submission form ("عنوان خريطة الموقع غير صالح"); the full absolute URL `https://alharrazlaw.com/sitemap.xml` was required and worked on the retry — documented here in case it recurs.

The pre-existing `al-harraz.vercel.app` URL-prefix property was intentionally left in place (not deleted), per the original plan below — it retains historical performance data and lets Google observe the live 308 redirects from the old domain.

## Original plan (steps as executed)

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
