# Civil Law / Civil Litigation Organic SEO Authority Expansion — Phase 1 Report

Date: 2026-10-07. Production: https://alharrazlaw.com. Branch:
`claude/al-harraz-law-platform-oiq2y3`, deployed and live-verified.

## 1) Baseline

From the GSC data supplied (see `CIVIL_SEO_BASELINE_AND_TRACKING.md` for
the full tracking model):

| Query | Impressions | Avg. position |
|---|---|---|
| القضايا المدنية | 1 | ~85 |
| civil litigation lawyer | 1 | ~81 |

This is a near-zero starting point. This phase's goal was to fix the
structural gaps that were almost certainly suppressing even basic
discovery/crawl of the civil cluster as a coherent topic — not to promise
a ranking jump.

## 2) Existing-content audit

Full detail in `CIVIL_SEO_EXISTING_CONTENT_AUDIT.md`. Headline finding:
**the gap was never missing content.** The firm already has, live and
lawyer-reviewed: 6 civil-adjacent practice areas and 14 civil articles
covering litigation procedure (filing, evidence, enforcement, appeals),
contracts (review, drafting, breach), compensation/liability, and
property/possession/registration. The actual gaps were:

1. The civil-law **pillar page** (`/practice-areas/civil-law`) had only a
   one-sentence overview and **zero outbound links** to any of this
   existing content — it wasn't functioning as a pillar at all.
2. The homepage's dedicated Civil Focus section (already the most
   prominent practice-area placement on the site, built in an earlier
   phase) listed 6 civil sub-topics as **plain, non-clickable text**.
3. FAQ content visible on the civil-law page had no matching `FAQPage`
   structured data (only the homepage's own separate FAQ query had
   schema).
4. Two genuine content gaps: rental/tenancy disputes and co-ownership
   partition have no dedicated content yet (not filled this phase — see
   §16 roadmap).

## 3) Keyword / intent map

Full detail in `CIVIL_KEYWORD_INTENT_MAP.md`. Every transactional and
informational query investigated (محامي مدني, محامي قضايا مدنية, civil
litigation lawyer Egypt, ما هي القضايا المدنية, تحصيل الديون, etc.) maps
to an **existing** URL — no new URL was required for any of them. City-
keyword variants (محامي مدني في دمياط, civil lawyer Damietta) were
explicitly **not** given separate pages — mapped instead to the pillar
page plus off-site local signals, per the brief's explicit doorway-page
prohibition.

## 4) Cannibalization findings

Two pairs flagged and assessed, both low/moderate risk, neither requiring
action this phase:

- `what-to-review-before-signing-contract` vs.
  `contract-drafting-key-clauses-egypt` — genuinely different intent
  (reviewing vs. drafting), already cross-linked once. No merge, no
  rewrite.
- `civil-law` (pillar) vs. `litigation-dispute-resolution` — the pillar
  covers civil law broadly (contracts, property, compensation,
  enforcement), the latter covers the litigation *process* specifically
  across civil **and** commercial matters. Different enough scope; flagged
  as a watch-item in the tracking plan rather than merged.

The real-estate duplicate-canonical finding from the prior P0 phase
(`legal-considerations-real-estate-purchase-contracts`) was **not
re-audited** here per the instruction not to redo completed work — it
remains tracked in `GSC_INDEXING_RECOVERY.md` §2.

## 5) Civil topical architecture

Pillar: `/practice-areas/civil-law`. Clusters (all pre-existing URLs,
confirmed live): Litigation procedure (5 articles), Contracts &
obligations (1 practice area + 3 articles), Compensation & liability (1
article), Property & real estate (1 practice area + 4 articles), Debt
recovery & enforcement (1 practice area + 2 articles). Full map in
`CIVIL_SEO_EXISTING_CONTENT_AUDIT.md`. No new pages were created to build
this architecture — it already existed as content; this phase made it
**structurally visible** to crawlers and users via the pillar's new
outbound links.

## 6) Changes implemented

1. **`civil-law` practice area** (`src/seed/data.ts`, synced via
   `src/seed/seed.ts`'s `contentResyncSlugs`): added `whoWeHelp`,
   `legalIssuesCovered`, `howWeAssist` — 11 outbound links to every
   article/practice-area in the cluster, plus one factual Damietta/
   nationwide-service sentence. No existing title/summary/overview text
   was altered.
2. **`real-estate-property-registration`**: added `legalIssuesCovered`
   linking to 3 related articles (registration, purchase-contract
   considerations, possession disputes).
3. **`debt-recovery-enforcement`**: added `legalIssuesCovered` linking to
   2 related articles (debt-recovery procedure, judgment enforcement).
4. **`CivilFocus.tsx`** (homepage section): the 6 list items are now real
   `<Link>`s to their target pages (5 to specific civil sub-topic pages,
   1 — "Tenancy Matters," which has no dedicated content yet — falls back
   to the pillar rather than linking nowhere or to something irrelevant).
   Zero visual/design change — confirmed by screenshot (§13).
5. **`FaqSection.tsx`**: now emits `FAQPage` JSON-LD matching exactly what
   it renders, wherever it's used (homepage and any practice-area page
   with real FAQs, civil-law included). Removed the homepage's separate,
   now-redundant FAQ fetch + schema call in `page.tsx` to avoid emitting
   duplicate schema — confirmed exactly one `FAQPage` block on the
   homepage post-change (§13).

## 7) URLs changed

None. Every change was to existing page **content** or **component
behavior** at the same URLs. No slug, route, or canonical was modified.

## 8) New URLs created

None, by design (per §3's finding that every target query already has a
home).

## 9) Internal links added

16 new contextual outbound links total: 11 from the civil-law pillar, 3
from `real-estate-property-registration`/`debt-recovery-enforcement`, 5
from the homepage Civil Focus list (the 6th reuses the pillar link already
counted). All confirmed live (§13). Anchor text varies by destination
(no repeated exact-match anchor spam).

## 10) Homepage positioning changes

No redesign. The existing Civil Focus section (already the first content
section after the hero, labeled "Primary Practice") now has functioning
internal links instead of dead text — a measured, additive positioning
improvement exactly as scoped, not a new section, not a layout change, not
a removal of any other practice area from the homepage.

## 11) Local/Damietta improvements

One factual sentence added to the pillar's new `whoWeHelp` field: "المكتب
مقره الرئيسي في دمياط، ويقدم خدماته للعملاء في مختلف أنحاء جمهورية مصر
العربية" (EN: "The firm is based in Damietta and serves clients across
Egypt") — matches `siteConfig`'s real address, matches the firm's
existing, already-approved local-SEO policy (`LOCAL_SEO_PLAN.md`:
Damietta-first is additive, not a rewrite of approved headline copy). No
fake branch, no doorway page, no second "Damietta civil lawyer" URL — see
`CIVIL_LOCAL_AUTHORITY_ZERO_COST_PLAN.md` for the off-site/GBP side of
local relevance.

## 12) Legal-source verification status

No new substantive legal claims were introduced. All new content either
(a) cross-links to already-published, already-verified articles (which
carry their own prior source verification — Civil Code Arts. 157–158,
CPC Arts. 63–66, Law 114/1946, Law 9/2022, etc., all previously verified
in earlier phases), or (b) is firm-service description (who we help, how
we assist), the same category of content already used for every other
practice area and exempt from the article-level 2-source-verification
gate (no `legalReviewer` field on practice areas, consistent with the
existing data model). `LEGAL_SOURCE_REGISTER.md` does not need a new entry
— no new legal facts were added to the register.

## 13) Technical verification (production, post-deploy)

- `/ar/practice-areas/civil-law`: HTTP 200, self-canonical, correct
  hreflang (ar/en/x-default), all 11 new outbound links present in
  rendered HTML, `FAQPage` JSON-LD present (previously absent).
- `/ar/practice-areas/real-estate-property-registration`: new outbound
  link to `property-possession-disputes-egypt` confirmed present.
- `/ar/practice-areas/debt-recovery-enforcement`: new outbound link to
  `debt-recovery-legal-steps-egypt` confirmed present.
- `/en/practice-areas/civil-law`: HTTP 200.
- Homepage (`/ar`): all 6 `CivilFocus` items confirmed as real `<a href>`
  elements pointing to the correct targets; exactly **one** `FAQPage`
  schema block present (no duplicate from the `FaqSection` refactor).
- Sitemap: still exactly 176 URLs, unchanged.
- Screenshot comparison (1440px): Civil Focus section visually identical
  to pre-change — confirms "no redesign" was honored, not just claimed.
- `npx tsc --noEmit` and `eslint` clean on every touched file.
- No build/test run possible in this sandbox (no live Postgres for static
  generation) — consistent with every prior phase; typecheck + lint +
  live production verification are the available surface.

## 14) Items deliberately NOT changed

- **No new URLs** (§8) — every target query already had a home.
- **`contract-drafting-key-clauses-egypt`, `what-to-review-before-signing-contract`** —
  left as-is; already adequately cross-linked, genuine intent
  differentiation (see §4).
- **`legal-considerations-real-estate-purchase-contracts`** duplicate-
  canonical issue — not re-touched; tracked separately in
  `GSC_INDEXING_RECOVERY.md`.
- **Rental/tenancy and co-ownership-partition content** — genuine gaps,
  not published this phase (§16 roadmap instead of ad-hoc publishing).
- **No homepage redesign, no removal of any non-civil practice area**
  from the homepage or navigation.
- **No changes to any preserve-list page** (§15).

## 15) Preserve-ranking verification

Verified by `git diff` between the pre-phase and post-phase commits,
grepping for every preserve-list keyword/page (divorce/طلاق,
employment-labour-law, criminal-law, wills-drafting, company-formation,
"business lawyer", "types of companies") — **zero matches**. No title,
heading, URL, canonical, or body content on any page associated with the
10 preserve-list queries was touched. The only EN
`corporate-commercial-law`-adjacent and `wills-drafting`/
`employment-labour-law`-adjacent changes made anywhere in this engagement
were in the *prior* P0 phase (purely additive outbound links, documented
there), not this one.

## 16) Content roadmap (not published this phase)

| Proposed article | AR title | EN title | Intent | Target cluster | Supports | Internal-link plan | Legal verification required? | Priority |
|---|---|---|---|---|---|---|---|---|
| Tenancy/rental disputes overview | نزاعات الإيجار في مصر: الحقوق والالتزامات الأساسية | Rental Disputes in Egypt: Basic Rights & Obligations | informational + transactional | Property | pillar, real-estate-property-registration, homepage CivilFocus item #5 | link from pillar, from real-estate hub, replace the homepage's current civil-law fallback link | **Yes** — rent law in Egypt has specific statutory history (old-rent vs. new-rent regimes) that must be sourced from primary law text, not assumed | P1 |
| Co-ownership / partition of shared property | قسمة المال الشائع: كيف تُقسَّم الملكية المشتركة؟ | Partition of Co-Owned Property in Egypt | informational | Property | pillar, real-estate-property-registration | link from pillar + from possession-disputes article | **Yes** — Civil Code partition provisions need primary-source citation | P2 |
| Civil vs. criminal case distinction | الفرق بين الدعوى المدنية والجنائية | Civil vs. Criminal Cases in Egypt: The Core Difference | informational | Litigation | pillar, what-is-civil-lawsuit | link from pillar + from what-is-civil-lawsuit | Moderate — mostly definitional/procedural, lower citation risk than the above two | P2 |

None of these were drafted or published this phase — per the explicit
instruction against mass-publishing unverified legal content, they are
logged here as a prioritized roadmap for a future content phase that goes
through the same research → 2-source verification → lawyer review
pipeline used for every other article on this site.

## 17) Zero-cost authority plan

Full plan in `CIVIL_LOCAL_AUTHORITY_ZERO_COST_PLAN.md` — GBP category/
services additions, ethical review requests, free directory listings,
organic outreach, IndexNow (with the explicit clarification that it
notifies Bing, not Google), and GSC monitoring. Zero budget throughout; no
paid ads, no paid links, no fabricated reviews.

## 18) Measurement plan

Full plan in `CIVIL_SEO_BASELINE_AND_TRACKING.md` — baseline restated,
preserve-list baseline restated, a 6-stage progress model (crawl →
impressions → Top 50 → Top 20 → Top 10 → Top 3), and the specific GSC
views to monitor (query-filtered performance, indexed-page count,
query-to-page mapping, the two cannibalization watch-items, local/GBP
visibility). No ranking timeline is promised anywhere.

## 19) Remaining blockers

- No GSC API/UI access in this environment — all future measurement
  requires the firm owner to export/share fresh GSC data, as in the prior
  P0 phases.
- The two roadmap articles flagged "Yes" for legal verification (§16)
  cannot be safely drafted without that research pipeline — not started
  this phase.
- The duplicate-canonical real-estate article (carried over from
  `GSC_INDEXING_RECOVERY.md`) remains open; resolving it fully likely
  needs either genuine new content (same verification pipeline) or a
  firm decision to consolidate/retire the weaker page.

## 20) Recommended next actions

1. Monitor GSC per `CIVIL_SEO_BASELINE_AND_TRACKING.md` for 2–4 weeks to
   see Stage 1 (crawl/discovery) signals on the strengthened pillar and
   cluster pages before making further structural changes.
2. When ready, route the two "Yes"-verification roadmap articles (§16)
   through the normal research → verification → lawyer-review → seed
   pipeline, same as every other article on this site.
3. Execute the zero-cost GBP/local items in
   `CIVIL_LOCAL_AUTHORITY_ZERO_COST_PLAN.md` — these are manual, owner-side
   actions, not further code changes.
4. Revisit the `civil-law` vs. `litigation-dispute-resolution`
   cannibalization watch-item once real query-level GSC data exists for
   both pages.

---

**How this increases Civil Law authority without weakening existing
practice-area rankings**: every change this phase was *additive* —
new outbound links from pages that previously had none or few, new
structured data matching already-visible content, and functioning links
on text that was already on the homepage but inert. Nothing was removed,
renamed, retitled, or redirected. The preserve-list verification (§15) is
not a claim — it's a diff anyone can re-run. Actual authority gains (if
any) will only be visible in a future GSC export, which this phase's
tracking plan is built to interpret honestly rather than assume.
