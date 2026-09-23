# Launch Checklist

Status legend: ✅ done and verified this session · ⚠️ built but not independently verified/completed · ❌ not started.

## Content

- ❌ Domain purchased and DNS live (`DISCOVERY_REPORT.md` §3)
- ✅ Practice areas / industries published (all 21/7, generic non-fabricated service-capability copy — `CONTENT_REQUIRED.md`). Display order follows business priority (`order` field): civil litigation, contracts, real estate, debt recovery, inheritance and family law lead; maritime and customs are last — `SITE_STRATEGY.md` §1. Still worth a firm/legal read-through in `/admin` before treating the copy as final.
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
- ✅ JSON-LD (Organization/LegalService, WebSite, BreadcrumbList, Person, Article) — valid JSON with correct schema.org properties, verified by parsing the rendered output; not yet run through Google's Rich Results Test (needs the real production URL — do this once live)
- ❌ `redirects` collection wired into `middleware.ts` (schema exists, lookup logic doesn't yet — `CMS_GUIDE.md`)
- ✅ Automated internal-link crawl run (`TESTING.md`) — found and fixed 2 dead-link sources (Header/Footer/homepage hard-linking to the still-draft Maritime hub); re-crawl after the fix found 0 broken links across all 28 sitemap URLs
- ✅ Console-error audit run via Lighthouse on 13 pages — found and fixed a missing-favicon 404; 0 console errors on the final pass

## Accessibility

- ✅ Lighthouse Accessibility: **100/100 on all 13 audited pages** (`TESTING.md`). Found and fixed 2 real WCAG AA contrast failures (brand cyan token, secondary text opacity) and an invalid heading hierarchy on 4 index pages before reaching 100 — this was not clean on the first pass, so treat it as "measured and fixed," not "designed to pass."

## Security

- ✅ Security headers, CSP (basic), honeypot, rate limiting, access control — see `SECURITY.md` for the full list and its known gaps (no nonce-based CSP yet, no 2FA yet)
- ✅ `/admin` not indexed (verified via header check in Playwright)
- ✅ No secrets committed (`.env` gitignored, `.env.example` has no real values)
- ✅ `npm audit` clean of critical/high in production deps

## Performance

- ✅ Lighthouse Performance: 98-100/100 across all 13 audited pages; homepage LCP ~1.7s, CLS 0, TBT ~100ms (`TESTING.md`). Measured against a local server in this sandbox, not the real production host — re-measure once deployed.
- ✅ Lighthouse Best Practices and SEO: **100/100 on all 13 pages**

## Forms Anti-Spam

- ✅ Server-side validation, honeypot, rate limiting all implemented and tested

## Production Readiness

- ❌ Production environment provisioned (`DEPLOYMENT.md`)
- ❌ Backups configured and a restore rehearsed
- ❌ Analytics (GA4/GSC) wired up (`POST_LAUNCH_PLAN.md`)
- ❌ Search Console verification + sitemap submission

**Do not mark this project "launch ready" until every ❌ above is resolved and every ⚠️ has been independently re-verified against production data**, per the instruction not to claim "production ready" without actual verification.
