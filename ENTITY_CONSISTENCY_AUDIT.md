# Entity Consistency Audit

Verifies the business's core identity facts match, character-for-character, across every platform this project touches. Single source of truth: `src/lib/site-config.ts`.

## Canonical facts

| Field | Value |
|---|---|
| Name (AR) | مكتب آل حراز للمحاماة والاستشارات القانونية |
| Name (EN) | Al Harraz Law Firm & Legal Consultants |
| Founded | 1983 |
| Founder | الأستاذ محمد طه محمد حراز |
| Named lawyers | الأستاذ مصطفى محمد طه حراز، الأستاذ محمود محمد طه حراز |
| Team size | 15 lawyers |
| Address | دمياط – السنانية – أمام كوبري عبد المجيد – برج آل حراز – الدور الأول – جمهورية مصر العربية |
| Phone | 01005029501 / +201005029501 |
| Website | https://alharrazlaw.com |
| Branches | One — Damietta only |

## Cross-platform check

| Platform | Name | Address | Phone | Website | Status |
|---|---|---|---|---|---|
| Website (schema + footer + contact page) | ✅ | ✅ | ✅ | ✅ (self) | PASS |
| Google Business Profile | ✅ | ✅ (verified "برج آل حراز – الدور الأول – أمام كوبري عبد المجيد – السنانية – Damietta Governorate 34511") | Not re-checked this pass (correct as of the GBP verification session) | ✅ (updated to alharrazlaw.com, live-confirmed) | PASS |
| Google Search Console (Domain property) | N/A (no NAP displayed there) | N/A | N/A | ✅ Verified for exactly `alharrazlaw.com` | PASS |
| Bing Webmaster Tools | N/A | N/A | N/A | ✅ Verified for exactly `alharrazlaw.com` | PASS |
| Facebook Business Page | ⚠️ Page exists (linked from GBP social profiles) | NOT VERIFIED | NOT VERIFIED | NOT VERIFIED | **NOT VERIFIED** — flagged already in `LOCAL_NAP_AUDIT.md`, unchanged |
| Bing Places for Business | — | — | — | — | NOT STARTED — separate from Bing Webmaster Tools, see `LOCAL_CITATION_TRACKER.md` |

## Founding facts consistency (schema-level)
`organizationSchema()` in `src/lib/structured-data.ts` and the About/History pages both derive `foundingYear: 1983` and the founder's name from the same `siteConfig` — no hardcoded duplicate values anywhere that could drift out of sync. Checked via `grep -rn "1983\|foundingYear"` across `src/` during this session: every occurrence traces back to `siteConfig.foundingYear` or static copy that matches it exactly.

## No branches rule — verified
Searched the codebase and CMS seed data for any second address, branch, or city-specific office page: none found. `practice-areas` and `industries` collections contain service categories, not locations — consistent with the "one office, nationwide service" positioning. No action needed.

## Outstanding items
1. Facebook Business Page NAP — still not independently re-verified (same open item as `LOCAL_NAP_AUDIT.md`).
2. Bing Places for Business — not yet created (zero-cost, pending firm owner's Microsoft account time).
