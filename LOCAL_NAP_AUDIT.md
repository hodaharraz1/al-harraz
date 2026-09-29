# Local NAP (Name / Address / Phone) Consistency Audit

## Canonical NAP (source of truth: `src/lib/site-config.ts`)

- **Name:** مكتب آل حراز للمحاماة والاستشارات القانونية (Al Harraz Law Firm & Legal Consultants)
- **Address:** دمياط – السنانية – أمام كوبري عبد المجيد – برج آل حراز – الدور الأول – جمهورية مصر العربية (Al Senaneyah, Damietta, Egypt)
- **Phone:** 01005029501 / +201005029501
- **Website:** https://alharrazlaw.com

## Verified consistent (checked live this session)

| Surface | Name matches | Address matches | Phone matches | Website matches | Status |
|---|---|---|---|---|---|
| Site itself (schema, footer, contact page) | ✅ | ✅ | ✅ | ✅ (self) | PASS |
| Google Business Profile | ✅ — "مكتب آل حراز للمحاماة والاستشارات القانونية" | ✅ — "برج آل حراز – الدور الأول – أمام كوبري عبد المجيد – السنانية – Damietta Governorate 34511" matches | Not independently re-checked this pass (was correct as of the domain-migration session) | ✅ — updated to `https://alharrazlaw.com/` and live-confirmed (see `GBP_DOMAIN_UPDATE_PLAN.md`) | PASS |

## Not yet checked (requires manual verification — screenshot or login)

| Surface | Status | Action needed |
|---|---|---|
| Bing Places for Business | NOT VERIFIED | Confirm whether a Bing Places listing exists (separate from Bing Webmaster Tools, which only covers the website). If none exists, creating one is zero-cost and worth doing — but requires the firm owner's account access. |
| Facebook Business Page | NOT VERIFIED | A Facebook URL exists in the GBP "social profiles" field (seen during the GBP session: `facebook.com/people/مكتب-آل-حراز-للمحاماة-والاستشارات-القانونية-.../`). Confirm the Name/Address/Phone shown on that Facebook page match the canonical NAP above — Facebook pages often carry stale contact info from setup. |
| Egyptian/legal business directories | NOT STARTED | See `LOCAL_CITATION_TRACKER.md` for the submission plan. |

## Rule going forward
Any time the phone number, address, or legal business name changes for any reason, update `src/lib/site-config.ts` first (single source of truth for the site), then propagate the exact same string to GBP, Bing Places, Facebook, and every citation in `LOCAL_CITATION_TRACKER.md` — inconsistent NAP across platforms measurably weakens local-search trust signals.
