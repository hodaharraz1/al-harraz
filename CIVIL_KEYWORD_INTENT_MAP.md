# Civil Law — Keyword / Intent Map

Date: 2026-10-07. Phase 2 of `CIVIL_SEO_AUTHORITY_PHASE_1_REPORT.md`. Built
from actual GSC signals supplied in the brief, the existing content
inventory (`CIVIL_SEO_EXISTING_CONTENT_AUDIT.md`), and real user intent for
Egyptian civil-law queries — not volume guesses. No new pages were created
to chase individual queries; existing pages are mapped to clusters of
semantically related queries, per the brief's explicit instruction against
doorway pages and city-keyword duplication.

## A) Transactional / lawyer-intent queries

| Query / topic | Lang | Intent | Target audience | Existing target URL | New URL required? | Parent cluster | Priority | Cannibalization risk | Local intent? | Recommended title direction |
|---|---|---|---|---|---|---|---|---|---|---|
| محامي مدني / محامي قضايا مدنية | AR | transactional | individuals/businesses in a civil dispute | `/practice-areas/civil-law` | No | Pillar | P0 | none (pillar is the single target) | national, secondarily Damietta | Keep existing title "القانون المدني" — already natural, no forced "محامي مدني" repetition |
| مكتب محاماة قضايا مدنية | AR | transactional | businesses/individuals seeking representation | `/practice-areas/civil-law` | No | Pillar | P0 | none | national | same |
| محامي مدني في دمياط / محامي قضايا مدنية في دمياط | AR | transactional, local | Damietta-area clients | `/practice-areas/civil-law` (with factual Damietta mention added — see Phase 5) | **No — explicitly avoid creating a separate "Damietta civil lawyer" page** | Pillar | P1 | **high if a separate page were created** (doorway-page risk flagged explicitly in the brief) — mitigated by keeping this on the pillar | Damietta | N/A — no new page; handled via one factual sentence on the pillar + GBP (see zero-cost plan) |
| محامي عقود | AR | transactional | parties needing contract drafting/review | `/practice-areas/contracts-commercial-agreements` | No | Contracts cluster | P1 | none | national | existing title fine |
| محامي تعويضات | AR | transactional | parties with a compensation claim | `/insights/when-can-you-claim-compensation` (article; no dedicated "compensation" practice area exists) | No — article already serves this well | Compensation cluster | P1 | none | national | existing title fine |
| محامي عقارات | AR | transactional | property buyers/owners | `/practice-areas/real-estate-property-registration` | No | Property cluster | P0 | low vs. `/industries/real-estate` (different audience — developers vs. individuals; see audit) | national | existing title fine |
| محامي تنفيذ أحكام / محامي تحصيل ديون | AR | transactional | judgment creditors, debt collection | `/practice-areas/debt-recovery-enforcement` | No | Enforcement cluster | P0 | none | national | existing title fine |
| civil lawyer Egypt / civil litigation lawyer Egypt / civil litigation lawyer in Egypt | EN | transactional | English-reading individuals/businesses | `/en/practice-areas/civil-law` | No | Pillar | P0 | none | national | this is the exact query in the GSC baseline (position ~81) — pillar strengthening targets this directly |
| civil lawyer Damietta / civil litigation lawyer Damietta | EN | transactional, local | — | `/en/practice-areas/civil-law` | **No — same doorway-page risk as the AR equivalent** | Pillar | P2 | high if separated | Damietta | handled via GBP + one factual EN sentence, not a page |
| contract lawyer Egypt | EN | transactional | — | `/en/practice-areas/contracts-commercial-agreements` | No | Contracts cluster | P1 | none | national | existing title fine |
| real estate lawyer Egypt | EN | transactional | — | `/en/practice-areas/real-estate-property-registration` | No | Property cluster | P1 | none | national | existing title fine |
| debt recovery lawyer Egypt | EN | transactional | — | `/en/practice-areas/debt-recovery-enforcement` | No | Enforcement cluster | P1 | none | national | existing title fine |

## B) Informational queries

| Query / topic | Lang | Intent | Existing target URL | New URL required? | Parent cluster | Priority | Cannibalization risk |
|---|---|---|---|---|---|---|---|
| ما هي القضايا المدنية / أنواع القضايا المدنية | AR | informational | `/insights/what-is-civil-lawsuit` | No | Litigation | P0 | none |
| إجراءات رفع دعوى مدنية | AR | informational | `/insights/filing-a-civil-lawsuit-in-egypt` | No | Litigation | P0 | none |
| الفرق بين الدعوى المدنية والجنائية | AR | informational | **gap** — no dedicated article; `what-is-civil-lawsuit` touches the civil side only | Possibly, but **not created this phase** | Litigation | P2 (roadmap) | low — would be a genuinely new angle, not a duplicate |
| فسخ العقد | AR | informational | `/insights/breach-of-contract-rights-egypt` (covers judicial termination under Art. 157) | No | Contracts | P1 | none |
| التعويض في القانون المدني / المسؤولية المدنية | AR | informational | `/insights/when-can-you-claim-compensation` | No | Compensation | P0 | none |
| تنفيذ الأحكام المدنية | AR | informational | `/insights/how-civil-judgments-are-enforced` | No | Enforcement | P0 | none |
| تحصيل الديون | AR | informational | `/insights/debt-recovery-legal-steps-egypt` | No | Enforcement | P0 | none |
| منازعات الملكية / منازعات الحيازة | AR | informational | `/insights/property-possession-disputes-egypt` | No | Property | P1 | none |
| قسمة المال الشائع | AR | informational | **genuine gap** — no existing content | Yes, future (roadmap, not created this phase) | Property | P2 (roadmap) | none — net-new topic |
| الإيجارات / نزاعات الإيجار | AR | informational + transactional | **genuine gap** | Yes, future (roadmap, not created this phase) | Property/Tenancy | P1 (roadmap — also the one unlinked item in the homepage Civil Focus list) | none — net-new topic |

## Clustering decisions (avoiding doorway pages)

- **One pillar, not one page per query.** All "محامي مدني" variants
  (generic, "قضايا مدنية", "مكتب محاماة") resolve to the single
  `/practice-areas/civil-law` page — never split into near-duplicate pages
  differentiated only by phrasing.
- **City-keyword duplication explicitly avoided.** No "محامي مدني دمياط" /
  "أفضل محامي مدني دمياط" pages were created or are planned. Damietta
  relevance is carried by one factual sentence on the pillar (Phase 5) plus
  off-site local signals (GBP, citations — see
  `CIVIL_LOCAL_AUTHORITY_ZERO_COST_PLAN.md`), never a second page.
- **Litigation-process sub-cluster** (what-is-civil-lawsuit → filing →
  evidence → enforcement → appeals) already exists as 5 distinct articles,
  each covering a genuinely different procedural stage — not merged, since
  each stage is a distinct search intent with its own content already
  live and now cross-linked through the pillar.
- **Contract review vs. contract drafting** (`what-to-review-before-signing-contract`
  vs. `contract-drafting-key-clauses-egypt`) — flagged as moderate overlap
  in the audit; kept separate because the intent genuinely differs
  (reviewing someone else's draft vs. drafting your own) and they already
  cross-link to each other once. Not merged, not duplicated further.
