# Content Cannibalization Report

Audits the 20 live articles and 42 live practice-area pages (full inventory: `src/seed/data.ts`) for competing intent. This is a structural audit of what's actually published — not based on Search Console query data (not available this session; see `SEO_OPPORTUNITY_QUEUE.md`). Re-run this audit whenever GSC query data becomes available, since real overlapping rankings are the stronger signal.

## Method
Compared every article/practice-area title and target intent pairwise for topic overlap, per §27 of the SEO growth program.

## Findings

### 1. Flagged — related intent, same cluster, NOT true cannibalization (keep both, strengthen the link between them)

| Page A | Page B | Relationship | Action |
|---|---|---|---|
| `/insights/what-is-civil-lawsuit` ("What Is a Civil Lawsuit?" — definitional) | `/insights/filing-a-civil-lawsuit-in-egypt` ("How to File a Civil Lawsuit in Egypt" — procedural) | Same topic, different search intent (definition vs. how-to). Legitimate to keep both **only if** each stays disciplined to its own intent. | Verify neither page drifts into the other's territory. Add an explicit cross-link between them ("What is a civil lawsuit?" → link to the filing-steps article, and vice versa). No merge needed — different SERP intents (people-also-ask "ما هي" vs. "كيف"). |
| `/insights/how-civil-judgments-are-enforced` (judgment enforcement, general) | `/insights/debt-recovery-legal-steps-egypt` (debt recovery, specific) | Enforcement is the final stage of debt recovery — adjacent, not duplicate. | Cross-link both directions; make sure the debt-recovery article treats enforcement as one step in its sequence rather than re-explaining it in full (avoid duplicating depth). |
| Practice area `debt-recovery-enforcement` | Article `how-civil-judgments-are-enforced` + Article `debt-recovery-legal-steps-egypt` | Service page vs. two supporting articles — correct hub-and-spoke structure. | No action — this is the intended pattern (see `CIVIL_AUTHORITY_MAP.md`). Confirm the practice-area page links out to both articles. |

### 2. No cannibalization found among the remaining 18 articles / 42 practice areas
Every other article maps to exactly one practice area with no second article or practice area competing for the same query intent (e.g., inheritance has one article + one practice area, arbitration has one of each, labor law has one of each). Practice-area pages are transactional/service-intent by design; articles are informational — the split itself avoids most cannibalization risk structurally.

### 3. Risk to monitor going forward
As the content engine adds 4–8 articles/month (§7), the highest cannibalization risk is **civil litigation** and **contracts**, since they're the primary growth cluster (§8–9) and will accumulate the most content fastest. Before publishing any new civil/contracts article, check this file's list first and confirm the new piece targets a genuinely distinct query intent, not a rewrite of an existing one.

## Next audit trigger
Re-run this report:
- Before publishing any new article (quick manual check against the table above)
- Monthly, as part of `MONTHLY_SEO_REPORT_*.md`
- Whenever Search Console data becomes available, cross-check for two site pages both ranking for the same query (the definitive signal this report cannot currently detect without that data)
