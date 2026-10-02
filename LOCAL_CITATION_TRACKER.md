# Local Citation Tracker

Tracks legitimate directory submissions using the exact canonical NAP from `LOCAL_NAP_AUDIT.md`. No spam/link-farm directories (§35, §68).

| Directory | URL | Status | Submission date | NAP consistency | Link type | Notes |
|---|---|---|---|---|---|---|
| Google Business Profile | business.google.com | ✅ Live | Pre-existing | Consistent (verified `LOCAL_NAP_AUDIT.md`) | N/A (primary listing) | Verified 2026-09-29 |
| Bing Places for Business | bingplaces.com | NOT STARTED | — | — | Citation | Separate from Bing Webmaster Tools (already done for the site). Zero-cost, requires the firm owner's Microsoft account — same account used for Bing Webmaster Tools. |
| Facebook Business Page | facebook.com | ⚠️ NAME MISMATCH FOUND | Pre-existing | ❌ Business name does not exactly match canonical — see `LOCAL_NAP_AUDIT.md` for the exact diff | Citation + social | Firm owner needs to correct the Page name to match `src/lib/site-config.ts` exactly. |

## Candidate directories — found via live research (`SERP_GAP_ANALYSIS.md`), not yet submitted

| Directory | URL | Legitimacy note | Status |
|---|---|---|---|
| Egyptian Yellow Pages | yellowpages.com.eg | Confirmed real — has a dedicated, actively-ranking Damietta lawyers/law-firms category page. High local-visibility citation target. **Free submission form confirmed at yellowmedia.com.eg/ar/advertise-with-us-free** — "احصل على عملك مدرجًا مجانًا اليوم" (get listed free). Asks for: business name, category, city (select Damietta), area, optionally website/hours. Ready for the firm owner to submit using the exact canonical NAP from `LOCAL_NAP_AUDIT.md`. | READY TO SUBMIT — needs firm owner (form likely requires an account/contact details only the firm can provide) |
| Wakilly | wakilly.com | A lawyer-finder platform with per-specialty/per-city pages; appears real and active. **Submission process confirmed:** requires creating a lawyer/service-provider account directly on the platform, and uploading proof of license/authorization to practice (bar credentials). Not a simple directory-entry form — a real verified-provider marketplace. | BLOCKED — requires the firm owner's account + uploading real license documents, not something this session can prepare further |
| Hujja Egypt ("حُجّة مصر") | hujjaegypt.com | **Confirmed legitimate.** Real editorial directory: covers all 27 Egyptian governorates, 32+ practice-area categories, firm profiles show logos/specializations/contact info, and submissions go through an editorial review process before publication (register/claim-profile mechanism). Good citation target. | READY TO PURSUE — needs firm owner to register/claim the profile |
| El-Avocato | el-avocato.live | Legitimate directory structure (profiles by governorate/specialty), but no visible self-service "add/claim your listing" mechanism on the pages checked, and the page carries noticeably keyword-stuffed filler text at the bottom — a quality flag worth weighing. | LOWER PRIORITY — legitimacy borderline on the content-quality signal found; pursue Yellow Pages and Hujja Egypt first |

## Still to research
- Egyptian Bar Association member/firm directory, if it maintains a public online listing
- Any additional Damietta-specific business directories not yet surfaced

## Rule
Every submission uses the exact canonical NAP string from `LOCAL_NAP_AUDIT.md` — no abbreviations, no reordering, no alternate phone formatting. Log the submission here immediately, including the exact NAP string used, so future audits can catch drift.
