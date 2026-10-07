# Civil Law — Next GSC Measurement Plan

Date: 2026-10-07. Extends `CIVIL_SEO_BASELINE_AND_TRACKING.md` (Phase 1)
with what specifically changed this phase and what to look for next.

## What actually changed in production this phase

**Nothing content-wise.** The civil-law pillar was audited and found
healthy (200, self-canonical, correct hreflang, in sitemap, FAQPage schema
present, no broken links) — left untouched per the brief's own
audit-first rule. The three new articles are drafted but not published
(awaiting lawyer review). No homepage change was made this phase (the
Tenancy Matters link change is queued for after the tenancy article is
approved — see `CIVIL_INTERNAL_LINK_GRAPH_PHASE_2.md`).

**This means: do not expect any movement in the civil baseline numbers
attributable to this phase specifically** — Phase 1's changes (the pillar
strengthening, the 16 new internal links, the homepage CivilFocus links,
the FAQPage schema fix) are still the most recent live changes and are
what any near-term GSC movement would reflect.

## Baseline carried forward (unchanged since Phase 1)

| Query | Impressions | Avg. position |
|---|---|---|
| القضايا المدنية | 1 | ~85 |
| civil litigation lawyer | 1 | ~81 |

## What to check at the next measurement date

1. **Crawl confirmation**: in GSC, check "Last crawled" on
   `/ar/practice-areas/civil-law` and `/en/practice-areas/civil-law` — a
   date after the Phase 1 deploy (2026-10-07) would confirm Google has
   revisited the strengthened pillar.
2. **Impressions movement** on the baseline queries and the broader query
   set from `CIVIL_KEYWORD_INTENT_MAP.md` (محامي مدني, محامي قضايا مدنية,
   civil lawyer Egypt, etc.) — even a move from 0–1 impressions to a
   handful would be the first real Stage-2 signal.
3. **Indexed-page count** for the civil cluster (6 practice areas + 14
   articles from the Phase 1 audit) — confirm none regressed out of the
   indexed state.
4. **Cannibalization watch-items** — query-to-page mapping for
   `civil-law` vs. `litigation-dispute-resolution`, and (once published)
   `civil-vs-criminal-cases-egypt` vs. `difference-between-misdemeanor-and-felony`.
5. **Preserve-list re-check** — confirm all 10 preserve-list queries are
   still at or near their Phase 1 baseline positions (criminal defense
   lawyer 3.4, estate planning lawyer 5.5, business lawyer 2.0, etc.) —
   any material regression here would need investigation regardless of
   civil-cluster progress.

## Recommended next measurement date

**3–4 weeks from this phase's deploy** (i.e., early-to-mid November 2026)
— enough time for at least one Google re-crawl cycle of the strengthened
pages, without expecting unrealistic ranking movement on such a short
horizon. Bring a fresh GSC export at that point (same format as the one
supplied for this phase) rather than relying on recall.

## If the three drafted articles are approved and published before then

Re-run this measurement plan's §2–4 against their specific URLs too once
live, and update `CIVIL_INTERNAL_LINK_GRAPH_PHASE_2.md`'s links from
"Planned" to confirmed-live with production evidence, following the same
pattern used throughout this engagement.
