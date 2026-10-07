# Civil Law Phase 2 — Legal Research Register

Date: 2026-10-07. Per-article detail supporting the entries already logged in
`LEGAL_SOURCE_REGISTER.md`. All three articles are **NEEDS_HUMAN_LEGAL_REVIEW
— not published, not in the CMS, not live** — see
`CIVIL_SEO_AUTHORITY_PHASE_2_REPORT.md` for why direct publication was
reverted after it was mistakenly started.

## Article 1 — Rental Disputes in Egypt

| Field | Detail |
|---|---|
| Legal issue | Which rental regime governs a given lease (pre-1996 "old rent" vs. post-1996 "new rent" under Law 4/1996), and the 2025 reform ending the old regime |
| Primary source | Law No. 164 of 2025, published in the Official Gazette, August 2025 (not directly accessed as primary legislative text in this pass — see Uncertainty) |
| Secondary verification | shoeiblaw.com, Youm7, Al-Dostor, Al-Jazeera (AR news/legal-practice coverage); Lawyer Egypt (Law 4/1996 contract structure) |
| Verification date | 2026-10-07 |
| Legal provisions used | Law No. 164 of 2025 (by number only, no specific article cited); Law No. 4 of 1996 (by number only) |
| Uncertainty | **Material conflict between two sources on the "economic zone" rent multiplier (10x vs. 5x)** — not resolved, so no multiplier table was drafted. The general "no self-help eviction" statement is a standard civil-procedure principle, not independently re-sourced to a specific provision in this pass. No primary Official Gazette text was directly fetched — all verification is via secondary legal/news coverage of the primary law. |
| Publication status | **AWAITING LEGAL REVIEW.** Given this is the single highest-risk topic in this phase (very recent, actively-evolving legislation with a confirmed source conflict on at least one figure), this is the draft the firm should scrutinize most closely before any approval — recommend the firm's own copy of the law or its executive regulations be checked against the draft's claims before sign-off. |

## Article 2 — Partition of Co-Owned Property

| Field | Detail |
|---|---|
| Legal issue | A co-owner's right to partition jointly-held property; consensual vs. judicial partition; usufructuary (muhaya'a) partition |
| Primary source | Egyptian Civil Code (not directly accessed as primary legislative text in this pass — see Uncertainty) |
| Secondary verification | Youm7, Mohamy Masr, Lawyer Egypt, Salama Law Firm (all AR legal-practice sources) |
| Verification date | 2026-10-07 |
| Legal provisions used | Civil Code Articles 825, 834, 835, 848 (each corroborated with matching quoted text across 2 independent sources); Article 836 referenced for judicial-partition procedure (single direct citation, underlying mechanism corroborated by 2 further sources without always naming the article) |
| Uncertainty | Article 836's exact text was not cross-quoted identically across two sources the way 825/834/835/848 were — treat as the one citation in this draft needing the closest check. No procedural timelines or court fees stated. |
| Publication status | **AWAITING LEGAL REVIEW.** Moderate risk — stable, long-standing provisions, but specific article numbers are being published under the firm's name and need the standard sign-off regardless of how well-corroborated they appear. |

## Article 3 — Civil vs. Criminal Cases in Egypt

| Field | Detail |
|---|---|
| Legal issue | The civil/criminal track distinction, and the ancillary-civil-claim mechanism within a criminal case |
| Primary source | Not applicable in the usual sense — this is a conceptual/procedural-structure topic rather than a specific statute; the ancillary-civil-claim mechanism is a feature of the Code of Criminal Procedure |
| Secondary verification | Lawyer Egypt, Mawdoo3 (AR) |
| Verification date | 2026-10-07 |
| Legal provisions used | None cited by specific article number — described conceptually only |
| Uncertainty | The ancillary-civil-claim mechanism's specific Code of Criminal Procedure article number was not independently pinned down to a specific citation in this pass; the draft describes it without one. |
| Publication status | **AWAITING LEGAL REVIEW.** Lowest legal-fact risk of the three, but still requires sign-off per the project's governance rule — and the cannibalization check against `difference-between-misdemeanor-and-felony` (see `CIVIL_CONTENT_CANNIBALIZATION_AUDIT.md`) should be re-confirmed by the firm as part of that review, not just taken on this session's word. |

## Why none of these were published this phase

Per `LEGAL_SOURCE_REGISTER.md`'s own documented method (point 6): "Deliver as a draft file, not a CMS record — the `legalReviewer` field cannot be honestly satisfied without a real lawyer's review." This phase initially added all three directly to `src/seed/data.ts` (which auto-publishes with `legalReviewer` set to an admin account on the next seed run) before catching the error and reverting it — see the full account in `CIVIL_SEO_AUTHORITY_PHASE_2_REPORT.md`. The three drafts are instead delivered as standalone files and logged here as `NEEDS_HUMAN_LEGAL_REVIEW`, exactly like every prior article in this project's history.
