# Civil Law Phase 2 — Legal Research Register (Final Verification Pass)

Date: 2026-10-07. Supersedes the first version of this file. Per-claim
detail for all three drafts, following a dedicated final verification pass
specifically requested to re-check the figures and article attributions
in the first draft round.

**Update (2026-10-07, same day):** the firm owner, Mahmoud Harraz, issued a
FINAL PUBLICATION AUTHORIZATION approving all three FINAL corrected drafts
below (reflecting both this verification pass and the subsequent FINAL
PRE-SIGN-OFF CORRECTIONS — see `LEGAL_SOURCE_REGISTER.md` for the exact
approval record). All three are now **LAWYER APPROVED — Mahmoud Harraz,
2026-10-07**, and their approved text has been added verbatim to
`src/seed/data.ts`. **Not yet live in production** — this sandbox has no
path to the production Postgres database, so `npm run seed` must still be
run against production (by someone with those credentials) before the
articles and their internal links actually appear on the site. See
`LEGAL_SOURCE_REGISTER.md` and `CIVIL_PHASE_2_PRODUCTION_EVIDENCE.md` for
the current status.

## Article 1 — Rental Disputes in Egypt (`rental-tenancy-disputes-egypt`)

| # | Statute | Article | Exact legal proposition | Source | Confidence | Verification date |
|---|---|---|---|---|---|---|
| 1 | Law No. 164 of 2025 | 2 | Old-rent residential contracts end within 7 years of the law's effective date; non-residential within 5 years | Eastlaws.com (official legislation DB); Ahmed Azim Elgamel; Egyptian Bar Association (egyls.com) | High (3 independent sources, consistent) | 2026-10-07 |
| 2 | Law No. 164 of 2025 | 4 | Residential rent increases to: 20x old rent (min. 1,000 EGP) in premium zones; 10x (min. 400 EGP) in medium zones; 10x (min. 250 EGP) in economic zones | Same 3 sources as #1, matching figures | High | 2026-10-07 |
| 3 | Law No. 164 of 2025 | 5 | Non-residential units rented to natural persons: rent increases to 5x the old rent | Same 3 sources as #1 | High | 2026-10-07 |
| 4 | Law No. 164 of 2025 | Not consistently attributed to one article number | 15% periodic annual rent increase during the transitional period | Eastlaws.com-derived summary; Ahmed Azim Elgamel (fact corroborated; article number diverges between sources — one folds it into Arts. 4/5, another cites a separate Art. 6) | Medium (fact solid, article number not) | 2026-10-07 — **no specific article number used in the draft for this figure**; final body text reads "the law also provides for a periodic annual increase of 15%" with no article attributed, per explicit instruction not to imply Articles 4/5 are the source until confirmed |
| 5 | Law No. 164 of 2025 | 8 | Original tenant (or spouse to whom contract was extended) entitled to an alternative unit (rental or ownership) from the state before the transitional period ends, conditioned on vacating the current unit, matching purpose and governorate, with priority for the original tenant | Ahmed Azim Elgamel; Egypt Telegraph (via search aggregation, re: Cabinet implementation decision) | Medium-high (2 independent sources) | 2026-10-07 |
| 6 | Law No. 164 of 2025 | 7 | A tenant's ownership of another suitable unit can itself be grounds for the landlord to seek earlier termination | Egyptian Bar Association (egyls.com) | Medium (single-sourced this pass; logically consistent with Art. 8 as a separate, complementary provision, not a contradiction) | 2026-10-07 |
| 7 | Law No. 4 of 1996 | (by law number only) | Post-1996 contracts are freely negotiated as to term and rent; tenancy ends automatically at the agreed term unless renewed | Lawyer Egypt; general search corroboration | Medium-high | 2026-10-07 |
| 8 | (general principle) | N/A | A landlord cannot lawfully evict a tenant through self-help (changing locks, cutting utilities) without the proper legal process | Not independently re-sourced to a specific provision this pass — stated as a baseline civil-procedure norm | Low-medium — **flagged for the firm's specific attention** | 2026-10-07 |
| 9 | Laws 49/1977, 136/1981, 6/1997 | (repeal provision, article not specified) | These old-rent laws are repealed once the transitional periods under Law 164/2025 end | shoeiblaw.com (original research pass) | Medium (single-sourced) | 2026-10-02 (original pass; not re-verified this pass) |

**Resolution of the prior conflict**: the original draft could not determine whether the "economic zone" residential multiplier was 10x or 5x (two sources disagreed). This pass found and cross-verified the law's actual article text (Articles 4 and 5) across 3 independent sources: **the economic zone is 10x** (Article 4, same tier as the medium zone, differing only in its 250 EGP vs. 400 EGP minimum); **5x is Article 5's separate non-residential multiplier**, which one of the original two sources had mistakenly presented as if it were the residential economic-zone figure.

## Article 2 — Partition of Co-Owned Property (`co-ownership-partition-egypt`)

| # | Statute | Article | Exact legal proposition | Source | Confidence | Verification date |
|---|---|---|---|---|---|---|
| 1 | Egyptian Civil Code | 825 | Two or more people owning an undivided thing, each with a share, are co-owners (shuyu') | Youm7; Mohamy Masr; Horuslaw.com | High (3 sources, matching quoted text) | 2026-10-07 |
| 2 | Egyptian Civil Code | 834 | Any co-owner may demand partition at any time, unless bound to remain undivided by law or agreement | Same 3 sources, plus Elmo7amy.tv | High (4 sources) | 2026-10-07 |
| 3 | Egyptian Civil Code | 835 | If all co-owners agree, they may partition the property however they see fit (consensual partition) | Same 4 sources as #2 | High | 2026-10-07 |
| 4 | Egyptian Civil Code | 836 | If co-owners disagree, the one seeking to exit must summon the others before the competent court, which may appoint an expert to value and divide the property if physically divisible without significant value loss | Mohamy Masr; Horuslaw.com; Elmo7amy.tv | High (3 sources, consistent) | 2026-10-07 |
| 5 | Egyptian Civil Code | 837 | The expert divides shares based on the smallest share; where exact division isn't possible, shares are allocated with a cash adjustment for any shortfall | Elmo7amy.tv; general search aggregation | Medium-high (2 sources, matching quoted text) | 2026-10-07 |
| 6 | Egyptian Civil Code | 841 | If physical division isn't feasible or would significantly harm the property's value, it is sold per the Civil and Commercial Procedure Law, with bidding restricted to co-owners if unanimously requested | Elmo7amy.tv; general search aggregation | Medium-high (2 sources, matching quoted text) | 2026-10-07 |
| 7 | Egyptian Civil Code | 848 | Usufructuary/rotational partition (muhaya'a) is governed by lease-contract rules as to third-party effect and the co-owners' rights/obligations | Youm7; Mohamy Masr; Horuslaw.com | High (3 sources, matching quoted text) | 2026-10-07 |

**Not included** (single-sourced this pass, below the 2-source bar): Article 846 (possible 5-year cap on muhaya'a duration); Articles 838–840 (court-jurisdiction and judgment-formality refinements) — these were outside the specific article list the review scope asked about and were not independently cross-checked.

**Correction from the prior draft**: judicial partition, the division mechanics, and the sale-when-indivisible rule were previously all loosely attributed to "Article 836." They are now correctly distributed across **Article 836** (procedure/court jurisdiction), **Article 837** (division/demarcation mechanics), and **Article 841** (sale when division isn't feasible).

## Article 3 — Civil vs. Criminal Cases in Egypt (`civil-vs-criminal-cases-egypt`)

**⚠ See the INTERNAL LEGAL MAINTENANCE NOTE in `LEGAL_SOURCE_REGISTER.md`** —
this article's statutory basis (Code of Criminal Procedure, Law 150/1950)
has a known future expiry. The new Code of Criminal Procedure, Law No.
174 of 2025, is currently expected to take effect around 1 October 2027
(a date that has itself moved once already as of very recent legislative
action). This article's analysis was deliberately **not** rewritten
against the new code — it remains correct against current (1950-code) law
as of this verification date, but requires a full re-verification before
the new code takes effect, not an automatic carry-over of its article
numbers.

| # | Statute | Article | Exact legal proposition | Source | Confidence | Verification date |
|---|---|---|---|---|---|---|
| 1 | Code of Criminal Procedure (Law 150/1950) | 1 | The Public Prosecution alone has the authority to bring and conduct a criminal case, as the representative of society | Youm7; Egyptian Bar Association (egyls.com) | High (2 sources) | 2026-10-07 |
| 2 | Code of Criminal Procedure (Law 150/1950) | 3 | Certain crimes (specified Penal Code articles: 185, 274, 277, 279, 292, 293, 303, 306, 307, 308) cannot be prosecuted without a complaint from the victim or their representative | Youm7 (direct article citation) | Medium-high (directly sourced once, with the general complaint-requirement concept corroborated by a second source) | 2026-10-07 |
| 3 | Code of Criminal Procedure (Law 150/1950) | 232 | For misdemeanors and infractions (not felonies), a harmed party may bring the case directly before the court as a civil-rights claimant, without the Prosecution having acted first ("direct accusation") | Mohamah.net (two separate articles, both citing Art. 232 directly with consistent framing) | High (2 independent sources, matching article number and substance) | 2026-10-07 |
| 4 | Code of Criminal Procedure (Law 150/1950) | (restrictions on Art. 232, not separately numbered in sources) | Direct accusation is unavailable before juvenile courts, military courts, and state security courts, for felonies, and remains subject to any complaint/request/permission prerequisite the Prosecution itself would need | Mohamah.net | Medium (single-sourced this pass) | 2026-10-07 |
| 5 | Code of Criminal Procedure (general mechanism) | Not pinned to a specific article this pass | A victim harmed by conduct that is also a crime may bring a civil claim ancillary to the criminal case ("دعوى مدنية بالتبعية") to claim compensation without a separate civil suit, or may choose an independent civil claim instead | Lawyer Egypt (original research pass) | Medium (concept well-established, specific article number not independently verified) | 2026-10-02 (original pass) / re-confirmed conceptually 2026-10-07 |

**Correction from the prior draft**: the original draft stated as a flat rule that criminal cases are "brought by the Public Prosecution ... not by private individuals." This pass added the two named, legally-recognized exceptions (complaint-required crimes under Article 3; direct accusation under Article 232) so the article no longer states an absolute that the law itself qualifies.

## Publication status (updated 2026-10-07)

All three drafts are now **LAWYER APPROVED — Mahmoud Harraz, 2026-10-07**
(see the approval record in `LEGAL_SOURCE_REGISTER.md`) and their approved
text has been added verbatim to `src/seed/data.ts`, with the internal
links specified in `CIVIL_INTERNAL_LINK_GRAPH_PHASE_2.md`. They are **not
yet live**: this sandbox cannot reach the production Postgres database, so
someone with production DB access must run `npm run seed` (e.g. with
credentials from `vercel env pull`) before these records actually exist in
the CMS. See `CIVIL_PHASE_2_PRODUCTION_EVIDENCE.md` for the live
verification status once that seed run has happened.
