# Domain Migration Plan

The site is live in production at `https://al-harraz.vercel.app` — a free Vercel URL, not the long-term domain. This is a real, working, indexable site today; nothing here is blocking current operation. This plan is what to execute once a real domain is purchased.

## 1. Buy the domain

Candidates and availability were researched earlier in `DISCOVERY_REPORT.md` §3 — re-check availability before buying, since time has passed. Not purchased automatically; requires the firm's decision and payment.

## 2. Attach it in Vercel

- Vercel dashboard → Project → Settings → Domains → add the domain.
- Vercel gives exact DNS records to add at the registrar (usually an `A`/`ALIAS` record for the apex and a `CNAME` for `www`, or nameserver delegation if using Vercel DNS).
- Vercel auto-provisions and renews the TLS certificate — no manual cert work.
- Decide `www` vs. apex as the canonical host (either is fine; Vercel redirects the other to it automatically once both are added) and stick with it everywhere below.

## 3. Update the app

One env var change, no code change needed elsewhere (everything already reads from it):

```
NEXT_PUBLIC_SITE_URL=https://<the real domain>
```

This alone fixes: canonical URLs (`buildMetadata()`), hreflang alternates, the sitemap's `<loc>` values, `robots.txt`'s sitemap pointer, Open Graph `og:url`, and structured data `url` fields — all of them derive from `siteConfig.siteUrl`, which reads this one env var.

## 4. Redirect the old URL

Once the custom domain is live and verified working, `al-harraz.vercel.app` should **redirect** to it rather than both staying live (avoids duplicate-content confusion). Vercel's own domain settings can do this at the platform level (redirect a project's `.vercel.app` alias) — check current Vercel docs for the exact toggle, since this is a platform feature that changes over time, not app code.

## 5. Search Console

- Add the new domain as a **separate property** in Search Console (domain properties and URL-prefix properties are tracked independently — the existing verification for the `.vercel.app` URL does not carry over).
- Verify it (the existing `google-site-verification` file pattern in `public/` works the same way — or DNS TXT verification if using a domain-level property, which is usually the better choice since it covers both `www` and non-`www` and any subdomain automatically).
- Submit `https://<domain>/sitemap.xml`.
- Use the URL Inspection tool to request indexing for the homepage once DNS has propagated.

## 6. Analytics

GA4 doesn't need a code change (it tracks by measurement ID, not domain), but check the GA4 property's configured "default URL" / cross-domain settings if this ever needs to compare vercel.app vs. custom-domain traffic during the transition.

## 7. Email

See `EMAIL_SETUP.md` — email setup is a separate DNS workstream on the same domain, can happen in parallel with steps 2–3.

## 8. Google Business Profile

Once the GBP claim (see `LOCAL_SEO_PLAN.md`) is confirmed, its "website" field should point at the new domain, not the Vercel URL.

## Nothing above is time-sensitive to do together

Steps 1–4 can happen the same day. Steps 5–8 can trail by days/weeks without breaking anything — the site keeps working on the Vercel URL the whole time.
