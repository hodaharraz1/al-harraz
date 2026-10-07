# Civil Law — SEO Baseline & Tracking Plan

Date: 2026-10-07. Baseline figures below are exactly the GSC data supplied
in the brief — nothing here is independently measured or estimated, since
this environment has no GSC API/UI access (consistent with every prior
phase of this engagement).

## Baseline (as supplied, date of query unknown — taken as given)

| Query | Impressions | Avg. position |
|---|---|---|
| القضايا المدنية | 1 | ~85 |
| civil litigation lawyer | 1 | ~81 |

This is the starting point this phase works to improve. No ranking
timeline is promised — positions in the 80s mean Google has barely begun
to associate the site with these queries at all; the realistic first
milestone is consistent crawling/indexing of the strengthened civil
cluster, not a position jump.

## Preserve-list baseline (must not regress — re-stated from the brief for this document's own record)

| Query | Impressions | Avg. position |
|---|---|---|
| criminal defense lawyer | 14 | 3.4 |
| estate planning lawyer | 13 | 5.5 |
| business lawyer | 1 | 2.0 |
| قانون العمل الجديد | 1 | 3.0 |
| أنواع الطلاق في القانون المصري | 2 | 9.0 |
| land registration | 2 | 9.5 |
| انواع الطلاق في مصر | 2 | 9.5 |
| ايه الفرق بين الجنحه والجنايه | 2 | 10.0 |
| employment lawyer | 5 | 11.0 |
| types of companies in egypt | 6 | 16.5 |

Verified by diff (see `CIVIL_SEO_AUTHORITY_PHASE_1_REPORT.md` §15) that no
page associated with any of these queries was modified in this phase.

## Staged progress model

Track against these stages — do not expect to skip from Stage 1 straight
to rankings:

- **Stage 1 — Discovery/crawl.** Google's crawler revisits the
  strengthened civil-law pillar and the cluster pages that gained new
  inbound links. Signal: GSC's "Pages" report shows these URLs moving out
  of "Discovered — currently not indexed" (if they were ever flagged) or
  shows a recent "Last crawled" date after this phase's deploy.
- **Stage 2 — Impressions appear.** Civil queries (القضايا المدنية, محامي
  مدني, civil litigation lawyer Egypt, and long-tail variants of the
  informational queries in `CIVIL_KEYWORD_INTENT_MAP.md`) start generating
  non-zero impressions in GSC Performance, even at very low positions.
- **Stage 3 — Top 50.** Average position for the baseline queries moves
  from the 80s into the 50s.
- **Stage 4 — Top 20.**
- **Stage 5 — Top 10.**
- **Stage 6 — Top 3**, realistically achievable only for the pillar query
  itself over a longer horizon, not promised on any timeline.

## What to track in GSC going forward

- **Impressions, clicks, CTR, average position** — filtered by query
  containing "مدني"/"civil", and separately by URL for
  `/practice-areas/civil-law` and each civil-cluster article/practice-area
  URL listed in `CIVIL_SEO_EXISTING_CONTENT_AUDIT.md`.
- **Indexed-page count** — confirm the civil cluster's URLs remain in the
  "Indexed" bucket (not regressing into "Discovered" or "Crawled — not
  indexed", the categories closed out in the prior P0 phase).
- **Query-to-page mapping** — watch for which specific civil-cluster URL
  each query lands on, to catch unintended cannibalization early (e.g. if
  both the pillar and `litigation-dispute-resolution` start competing for
  the same exact query, that's a signal to revisit differentiation, not
  to panic-merge pages).
- **Cannibalization watch-list** (from the keyword map): `what-to-review-before-signing-contract`
  vs. `contract-drafting-key-clauses-egypt`; the pillar
  (`civil-law`) vs. `litigation-dispute-resolution`. Both are currently
  assessed as low-risk due to genuine intent differentiation — re-assess
  if GSC data later shows them splitting the same query's impressions in
  a way that suggests confusion rather than complementary coverage.
- **Local/GBP visibility** — where measurable (GBP Insights, once set up
  per `CIVIL_LOCAL_AUTHORITY_ZERO_COST_PLAN.md`): views, search queries
  reaching the listing, and direction requests.

## Reporting cadence

No automated reporting exists in this codebase (no GSC API integration).
Tracking is manual, in GSC's own UI, by the firm owner or in a future
session with fresh GSC exports — the same pattern already established for
the P0 indexing work (the owner supplied the GSC export; this environment
has no live API access to pull it automatically).
