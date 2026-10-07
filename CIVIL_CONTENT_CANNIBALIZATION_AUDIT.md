# Civil Law — Content Cannibalization Audit (Phase 2)

Date: 2026-10-07. Continues the monitoring established in
`CIVIL_SEO_BASELINE_AND_TRACKING.md` and the Phase 1 report's §4 findings.
No automatic merges were made — every pair below was assessed on intent,
not just topic overlap.

## Carried over from Phase 1 (unchanged, not re-touched this phase)

| Pair | Risk | Status |
|---|---|---|
| `civil-law` (pillar) vs. `litigation-dispute-resolution` | Low | Watch-item. Pillar covers civil law broadly; the other covers litigation *process* across civil and commercial matters. Not merged. |
| `what-to-review-before-signing-contract` vs. `contract-drafting-key-clauses-egypt` | Low–moderate | Genuinely different intent (reviewing vs. drafting), already cross-linked. Not touched. |
| `legal-considerations-real-estate-purchase-contracts` and the broader real-estate article cluster | Known, separately tracked | See `GSC_INDEXING_RECOVERY.md` §2 — not re-opened here per the brief's instruction not to risk this as a side effect of Phase 2. |

## New pairs assessed this phase (all three new drafts, currently unpublished)

### `civil-vs-criminal-cases-egypt` (draft) vs. `difference-between-misdemeanor-and-felony` (live, on the preserve list)

**Risk: low, by design.** This was the one pairing the brief explicitly flagged as a hard constraint ("This article must NOT become another 'الفرق بين الجنحة والجناية' article... Its intent must be clearly different").

- `difference-between-misdemeanor-and-felony` — intent: **crime-severity classification**. Answers "I'm already facing a criminal charge — how serious is this tier, and what court/penalties apply?" Already earning real impressions for "ايه الفرق بين الجنحه والجنايه" (preserve-list, avg. position 10.0).
- `civil-vs-criminal-cases-egypt` (draft) — intent: **track selection**. Answers "Something happened to me — is this a civil matter, a criminal matter, or both?" A completely different moment in a reader's decision process (before choosing a track, not after already being in one).
- No shared H1/title phrasing, no shared primary keyword target, no link from the draft to the existing article (deliberately, to avoid even an indirect equity-dilution signal), and the existing article's title/content/URL is untouched.
- **Verdict: distinct intents, safe to proceed once legally approved. No merge, no rewrite of the existing article.**

### `civil-vs-criminal-cases-egypt` (draft) vs. `what-is-civil-lawsuit` (live)

**Risk: low, intentionally complementary.** `what-is-civil-lawsuit` already contains one sentence distinguishing civil from criminal cases in passing; the new draft is the dedicated deep-dive on that specific distinction. The draft's internal-link plan makes this relationship explicit (reciprocal link) rather than letting the two compete silently for the same query. Not a duplicate — one is a general "what is a civil lawsuit" primer, the other is specifically about the civil/criminal fork.

### `rental-tenancy-disputes-egypt` (draft) vs. existing real-estate cluster

**Risk: none identified.** No existing article or practice area addresses tenancy/rental law at all (confirmed gap in the Phase 1 audit) — this is genuinely new topical ground, not an overlap.

### `co-ownership-partition-egypt` (draft) vs. `common-inheritance-disputes-egypt` (live) and `property-possession-disputes-egypt` (live)

**Risk: low, complementary by design.** `common-inheritance-disputes-egypt` already mentions the difficulty of dividing indivisible inherited real estate as one of several dispute *types* within inheritance — it doesn't explain the partition *mechanism* itself (consensual vs. judicial vs. muhaya'a). `property-possession-disputes-egypt` covers possessory actions, a legally distinct concept from partition (protecting physical possession vs. ending co-ownership). The new draft is the dedicated page for the partition mechanism specifically, with reciprocal links to both rather than either of them trying to cover partition in-depth themselves. No overlap in primary intent.

## Monitoring going forward

Once any of the three drafts is approved and published, re-run this
assessment against real GSC query-to-page data (not available in this
sandbox) rather than intent alone — see
`CIVIL_GSC_NEXT_MEASUREMENT.md` for the specific signal to watch
(the civil-law pillar vs. litigation-dispute-resolution watch-item
especially, since that one predates this phase and remains open).
