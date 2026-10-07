# Civil Law — Existing Content Audit

Date: 2026-10-07. Phase 1 of `CIVIL_SEO_AUTHORITY_PHASE_1_REPORT.md`. Searched
`src/seed/data.ts` (the single source of truth for all practice-area,
article, and industry content) for every civil/contract/property/debt/
enforcement-related term listed in the brief. Found a substantial amount of
already-published, already-reviewed civil content — the gap was never
"no content," it was weak internal linking and a thin pillar page (fixed
in this phase — see the final report).

All URLs below are live, 200, self-canonical, in the sitemap (confirmed
in prior P0 indexing work — not re-audited here per instruction).

## Practice areas (6 directly civil, 2 adjacent)

| URL (AR) | Type | Primary topic | Intent | Depth (before this phase) | Inbound links (before) | Target query candidate | Overlap risk | Action |
|---|---|---|---|---|---|---|---|---|
| `/practice-areas/civil-law` | pillar candidate | Civil law generally | transactional, broad | 1-sentence overview only | 3 | القانون المدني, محامي مدني, civil litigation lawyer | none — this IS the pillar | **Strengthened into the pillar** (whoWeHelp/legalIssuesCovered/howWeAssist, 11 outbound links to cluster) |
| `/practice-areas/litigation-dispute-resolution` | cluster hub | Civil & commercial litigation process | transactional | 1-sentence overview | 3 | محامي قضايا مدنية, civil litigation lawyer | low — litigation *process* vs. civil-law's broader substantive scope | Left as-is; now receives 1 new inbound link from the pillar + the homepage CivilFocus list |
| `/practice-areas/contracts-commercial-agreements` | cluster hub | Contract drafting/review/negotiation | transactional | 1-sentence overview + prior-phase links (contract-translation, breach-of-contract) | 3 | محامي عقود, contract lawyer Egypt | none | Now also linked from the pillar |
| `/practice-areas/real-estate-property-registration` | cluster hub | Property transactions & registration | transactional | 1-sentence overview | 3 | محامي عقارات, land registration, real estate lawyer Egypt | low vs. the `real-estate` **industry** page (different intent — see below) | **Strengthened** with legalIssuesCovered linking to 3 related articles; now linked from pillar |
| `/practice-areas/debt-recovery-enforcement` | cluster hub | Debt collection & judgment enforcement | transactional | 1-sentence overview | 3 | محامي تحصيل ديون, محامي تنفيذ أحكام, debt recovery lawyer Egypt | none | **Strengthened** with legalIssuesCovered linking to 2 related articles; now linked from pillar |
| `/practice-areas/construction-contracting-law` | adjacent | Construction/contracting disputes | transactional, niche | 1-sentence overview | 2 | قانون المقاولات | low — distinct enough (construction-specific) | Left unchanged this phase (flagged in prior P0 audit as weak-link P1) |
| `/practice-areas/medical-malpractice-liability` | adjacent | Medical liability (a form of civil liability) | transactional, niche | 1-sentence overview | not re-crawled | الأخطاء الطبية | low — distinct specialty, not core civil cluster | Not touched |
| `/industries/real-estate` | **industry**, not civil cluster | B2B support for property developers/investors | different audience (businesses, not transacting individuals) | adequate | not re-crawled | real estate developer legal support | **Confirmed NOT a duplicate** of `real-estate-property-registration` — different intent (developer/investor support vs. individual buyer/owner transactions) | No action needed; correctly distinct |

## Articles (14 directly civil)

| URL (AR) | Category | Primary topic | Depth | Inbound links (before) | Overlap risk | Action |
|---|---|---|---|---|---|---|
| `/insights/what-is-civil-lawsuit` | guides | Defines what a civil lawsuit is | adequate (4 paragraphs) | 3 | none — foundational/definitional, feeds the litigation sub-cluster | Now linked from pillar |
| `/insights/filing-a-civil-lawsuit-in-egypt` | litigation | How to file a civil suit, step by step | adequate, cites CPC Arts. 63–66 | 4 | none | Now linked from pillar |
| `/insights/evidence-in-civil-cases-egypt` | litigation | Means of proof in civil cases | adequate | 2 (weakest in litigation sub-cluster) | none | Now linked from pillar |
| `/insights/how-civil-judgments-are-enforced` | litigation | Enforcement procedure | adequate | 3 | none | Now linked from pillar |
| `/insights/civil-appeals-process-egypt` | litigation | Appeal conditions/deadlines | adequate | 3 | none | Now linked from pillar |
| `/insights/when-can-you-claim-compensation` | litigation | Civil liability / compensation | adequate | 2 (weak) | none | Now linked from pillar + homepage CivilFocus list |
| `/insights/what-to-review-before-signing-contract` | business | Contract review checklist (receiving party) | adequate | 3 | **moderate** vs. `contract-drafting-key-clauses-egypt` (see below) — already cross-linked once, intent genuinely differs (reviewing vs. drafting) | Now linked from pillar |
| `/insights/contract-drafting-key-clauses-egypt` | business | Clauses to include when drafting | adequate | 2 (weak) | same as above | Not touched this phase (already adequately cross-linked to its sibling) |
| `/insights/breach-of-contract-rights-egypt` | business | Remedies for breach (Civil Code Arts. 157–158) | adequate | 3 (gained 1 link last P0 phase) | none | Already fixed in prior phase |
| `/insights/legal-considerations-real-estate-purchase-contracts` | real-estate | Pre-signing contract checks | thin, **GSC-flagged duplicate-canonical** (documented in `GSC_INDEXING_RECOVERY.md` §2 — not re-audited here) | 4 | **documented and already mitigated** in prior phase | No new action — tracked separately |
| `/insights/real-estate-registration-egypt` | real-estate | Why/how to register property | strong, cites Law 114/1946, 131/1948, 9/2022 | 4 | low | Not touched this phase |
| `/insights/real-estate-buyer-legal-checklist-egypt` | real-estate | 6-point buyer checklist | strong | 4 | low | Not touched this phase |
| `/insights/property-possession-disputes-egypt` | real-estate | Possession vs. ownership disputes | adequate | 3 | none | Now linked from `real-estate-property-registration` practice area |
| `/insights/debt-recovery-legal-steps-egypt` | litigation | Debt recovery procedure | adequate | 3 (gained 1 link last P0 phase) | none | Now linked from `debt-recovery-enforcement` practice area |

Each of the above also has a live, verified EN counterpart at `/en/insights/...` with the same structure and link profile (not tabulated separately for brevity — the EN and AR trees are structurally identical per `buildMetadata`'s hreflang handling).

## Homepage

`/ar` and `/en` already dedicate the first section after the hero to Civil
Law (`CivilFocus.tsx`, eyebrow "مجال العمل الرئيسي" / "Primary Practice") —
this was built in an earlier phase of the engagement and already gives
Civil Law the most prominent homepage real estate of any practice area.
**Gap found**: its 6-item list (disputes, contracts, compensation,
property, tenancy, enforcement) was plain text with zero links — fixed in
this phase (see final report).

## FAQs

3 FAQs are tied to `civil-law` via `relatedPracticeAreaSlug`, rendered
live on the practice-area page through `FaqSection`. No `FAQPage`
structured data previously matched this visible content (only the
homepage had schema, for its own separate, unfiltered FAQ query) — fixed
in this phase (see final report, Structured Data section).

## Team

No team member currently has civil-law-specific metadata beyond the
general `practiceAreas` relationship already wired into the `lawyers`
collection and rendered on `/team/[slug]`. No fabricated specialization
claims were added — per the brief's explicit prohibition on inventing
years of specialization, case counts, etc.

## Genuine content gaps identified (not filled this phase — see roadmap)

- **Rental/lease disputes** ("الإيجارات") — no dedicated article or
  practice-area despite being item #5 in the homepage's own Civil Focus
  list. Currently that homepage item links to the civil-law pillar as a
  safe fallback rather than a non-existent dedicated page.
- **Co-ownership / partition of jointly-owned property** ("قسمة المال
  الشائع") — no dedicated content.
- **Eviction procedure** — no dedicated content (closely related to
  tenancy).

Both are flagged in the Phase 9 content roadmap in the final report, not
published this round, per the explicit instruction against mass-publishing
unverified content.
