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

## Facebook Business Page — checked this session, real mismatch found

**Status: ⚠️ NAME MISMATCH — needs the firm owner to fix**

Fetched the firm's Facebook page directly. The business name shown there is:
```
مكتب ال حراز للإستشارات القانونيه وأعمال المحاماه
```
This does **not** exactly match the canonical name:
```
مكتب آل حراز للمحاماة والاستشارات القانونية
```
Two concrete differences: (1) "ال حراز" is missing the ألف (ا) with hamza/madda that "آل حراز" should have, and (2) the word order is reversed ("legal consulting and law practice" vs. the canonical "law practice and legal consulting") and spelled with an extra alef ("الإستشارات" vs. "الاستشارات"). Location field showed "Damietta" correctly. The phone number was not visible in what this session could fetch (Facebook may restrict this for non-logged-in requests) — the firm owner should verify the phone field directly when fixing the name.

**Action:** the firm owner should edit the Facebook Page's name/details to exactly match the canonical string above — character-for-character NAP mismatches across platforms are a real, measurable local-SEO drag, and this is a confirmed one, not a hypothetical.

## Not yet checked (requires manual verification — screenshot or login)

| Surface | Status | Action needed |
|---|---|---|
| Bing Places for Business | NOT VERIFIED | Confirm whether a Bing Places listing exists (separate from Bing Webmaster Tools, which only covers the website). If none exists, creating one is zero-cost and worth doing — but requires the firm owner's account access. |
| Egyptian/legal business directories | NOT STARTED | See `LOCAL_CITATION_TRACKER.md` for the submission plan. |

## Rule going forward
Any time the phone number, address, or legal business name changes for any reason, update `src/lib/site-config.ts` first (single source of truth for the site), then propagate the exact same string to GBP, Bing Places, Facebook, and every citation in `LOCAL_CITATION_TRACKER.md` — inconsistent NAP across platforms measurably weakens local-search trust signals.
