# Launch Checklist

Status legend: ✅ done and verified this session · ⚠️ built but not independently verified/completed · ❌ not started.

## Content

- ❌ Domain purchased and DNS live (`DISCOVERY_REPORT.md` §3)
- ⚠️ Practice areas / industries reviewed and published (currently all 15/7 seeded as drafts — `CONTENT_REQUIRED.md`)
- ❌ Remaining 12 lawyer profiles added
- ❌ Real team/office photography added (placeholders in use)
- ❌ Facebook/social URLs confirmed and linked
- ❌ Google Business Profile created and linked
- ❌ Business hours confirmed
- ❌ Professional email addresses configured

## Technical

- ✅ Bilingual (ar/en) routing with hreflang + x-default
- ✅ RTL/LTR rendering verified (Playwright)
- ✅ Mobile responsive (Tailwind breakpoints; manually reviewed, not device-lab tested)
- ✅ CMS operational (Payload admin loads, collections verified via seed + manual query)
- ✅ Practice-area / industry / lawyer / insights page templates operational
- ✅ Maritime hub page operational (flagship practice area)
- ✅ Contact + Consultation flows operational, submission verified end-to-end in Postgres
- ✅ Phone / WhatsApp CTAs correct and contextual
- ✅ SEO metadata, canonical, hreflang implemented on every page
- ✅ Dynamic sitemap.xml + robots.txt, both verified serving correctly
- ✅ JSON-LD (Organization/LegalService, WebSite, BreadcrumbList, Person, Article) implemented — not validated against Google's Rich Results Test (no network access to Google's tool from this session; do this before launch)
- ❌ `redirects` collection wired into `middleware.ts` (schema exists, lookup logic doesn't yet — `CMS_GUIDE.md`)
- ⚠️ No broken internal links check has been run as an automated crawl — only the specific links covered by the Playwright suite were verified
- ❌ No console-error audit across all pages in a real browser session (only the smoke-tested pages were watched)

## Accessibility

- ⚠️ Baseline built in (skip link, `prefers-reduced-motion`, tap targets, required alt text) — no automated axe/Lighthouse audit run (`TESTING.md`)

## Security

- ✅ Security headers, CSP (basic), honeypot, rate limiting, access control — see `SECURITY.md` for the full list and its known gaps (no nonce-based CSP yet, no 2FA yet)
- ✅ `/admin` not indexed (verified via header check in Playwright)
- ✅ No secrets committed (`.env` gitignored, `.env.example` has no real values)
- ✅ `npm audit` clean of critical/high in production deps

## Performance

- ❌ No Lighthouse/Core Web Vitals measurement taken (`TESTING.md`)

## Forms Anti-Spam

- ✅ Server-side validation, honeypot, rate limiting all implemented and tested

## Production Readiness

- ❌ Production environment provisioned (`DEPLOYMENT.md`)
- ❌ Backups configured and a restore rehearsed
- ❌ Analytics (GA4/GSC) wired up (`POST_LAUNCH_PLAN.md`)
- ❌ Search Console verification + sitemap submission

**Do not mark this project "launch ready" until every ❌ above is resolved and every ⚠️ has been independently re-verified against production data**, per the instruction not to claim "production ready" without actual verification.
