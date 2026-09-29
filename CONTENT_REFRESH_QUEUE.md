# Content Refresh Queue

## Data-driven refresh (declining traffic/CTR) — BLOCKED
Identifying pages losing impressions/clicks/CTR requires Search Console history, which this session cannot pull live (see `SEO_OPPORTUNITY_QUEUE.md`). Nothing in this file claims a page is "declining" without that evidence.

## Age-based refresh schedule (per §73 — applies once pages have been live long enough)

| Content type | Review cadence | Next due |
|---|---|---|
| Service/practice-area pages (42 live) | Quarterly | First review: December 2026 (3 months from the 2026-09 domain migration, which is the most recent full technical pass) |
| Evergreen legal articles (20 live) | Every 6 months | First review: March 2027 |
| Any page touching a law that changes | Immediately on the law's effective date | Ongoing — see below |

## Known law-change triggers to watch (from `LEGAL_SOURCE_REGISTER.md`)
- `/insights/new-labor-law-egypt-2025-overview` — this article already flags itself as needing the closest lawyer read of the register (severance-figure ambiguity across sources). Treat as **P1 refresh candidate now**, not on the 6-month schedule, once a lawyer can confirm the exact multiplier from the primary legislative text.
- Any future amendment to Law 13/1968 (civil procedure), Law 114/1946 + Law 9/2022 (property registration), Law 27/1994 (arbitration), or Law 159/1981 (companies) should trigger an immediate refresh of the corresponding article, not wait for the scheduled cycle.

## Refresh checklist (when a page comes due)
1. Re-verify every factual/legal claim against current primary sources (not just re-reading the old sources).
2. Check whether the page still matches current search intent (compare against a fresh SERP scan).
3. Update internal links to any new content published since the original piece (cross-reference `CIVIL_AUTHORITY_MAP.md`).
4. Refresh FAQs based on any new query patterns observed in Search Console, once available.
5. Update the `updatedAt` / lastmod signal so sitemap and schema reflect the real edit date — do not fake a freshness date without a real edit (§73).
6. Log the refresh in `LEGAL_SOURCE_REGISTER.md` if any legal claim changed.
