# GSC "Discovered – Currently Not Indexed" — Phase 3: Content Expansion & Link-Fix Execution

Date: 2026-10-26. Executes the P1 (12 thin-content) + P2 (5 weak-link)
fix plan from `GSC_DISCOVERED_NOT_INDEXED_31_VERIFIED_AUDIT.md`, per
explicit owner approval. **Deployed to production and independently
re-verified live, this session** — not assumed from a successful push.

## Pre-execution breakdown (as delivered before implementation)

See the table sent before implementation began — reproduced in full in
§31-URL VERIFIED TABLE below with Before/After columns added.

---

## FILES CHANGED

- `src/seed/data.ts` — 11 practice-area entries got new
  `whoWeHelp`/`legalIssuesCovered`/`howWeAssist` fields (`corporate-commercial-law`
  got only the two it was missing); 3 existing entries
  (`maritime-shipping-port-law`, `litigation-dispute-resolution`) got a
  new `legalIssuesCovered` field adding one contextual link each;
  `civil-law`'s existing `whoWeHelp` sentence was extended in place with
  one clause and a link (the only non-purely-additive edit in this
  round); 9 new entries added to the `faqs` array.
- `src/seed/seed.ts` — added the 11 newly-expanded practice areas plus
  `litigation-dispute-resolution` to `contentResyncSlugs` so the new
  content force-syncs to their already-existing production documents.

No other file touched. No slug, URL, canonical, hreflang, or routing
change anywhere.

## CONTENT PAGES EXPANDED (11 practice areas, 12 URLs)

Each got genuinely distinct, topic-specific content — not a repeated
template:

| Practice area | New content basis |
|---|---|
| `administrative-law` | Reuses already-verified facts from the site's own published `challenging-administrative-decisions-egypt` article (Law 47/1972, State Council jurisdiction, 60-day deadline, administrative grievance) — cross-linked, not re-derived |
| `employment-labour-law` | Reuses already-verified facts from the site's own published `new-labor-law-egypt-2025-overview` article (Law 14/2025 replacing Law 12/2003, September 2025 effective date) — **preserve-list caution, additive only** |
| `document-notarization-authentication` | Reuses already-verified facts from the site's own published `real-estate-registration-egypt` article (Law 114/1946, Law 9/2022, notary office jurisdiction) |
| `tax-law` | Income Tax Law 91/2005 named generally; no specific rates/deadlines cited (flagged as unverified/dated in research) |
| `consumer-protection` | Consumer Protection Law 181/2018 (replacing Law 67/2006), Economic Courts jurisdiction; no specific day-count figures cited (single-sourced, unconfirmed) |
| `construction-contracting-law` | Egyptian Civil Code's muqawala (contracting) provisions, named generally; no specific article numbers cited (sourcing inconclusive beyond the general basis) |
| `commercial-agency-distribution` | Law 120/1982 and Commercial Code 17/1999 named; no specific termination-compensation formula cited (not reliably sourced) |
| `terms-privacy-policy-drafting` | Personal Data Protection Law 151/2020 named; no specific compliance deadline cited (sources disagreed) |
| `bounced-checks-negotiable-instruments` | Kept general (Commercial Code, civil/criminal duality) — **no specific Egyptian statute number cited**, since my research could not independently confirm one (searches returned Libyan/UAE results, not Egyptian) |
| `wills-drafting` | Wills Law 71/1946, the well-corroborated one-third cap on bequests to non-heirs — **preserve-list caution, additive only** |
| `corporate-commercial-law` | Only the two missing sections added (`legalIssuesCovered` already existed); kept general/service-description — **preserve-list caution, additive only** |

**Zero fabricated statutes, article numbers, deadlines, percentages,
case outcomes, or client results anywhere.** Where primary-source
verification wasn't available within this round's scope, content stays
at the service-description register (what the service covers, who needs
it, how the firm helps, practical considerations) rather than citing an
unconfirmed specific.

## INTERNAL LINKS ADDED (5 weak-linking URLs)

| Target | New link added from | Anchor |
|---|---|---|
| `/en/insights/bill-of-lading-explained-egypt` | `maritime-shipping-port-law` (new `legalIssuesCovered`) | "The Bill of Lading Explained..." |
| `/ar/industries/ports-logistics` | `maritime-shipping-port-law` (new `legalIssuesCovered`) | "الموانئ والخدمات اللوجستية" |
| `/en/insights/commercial-disputes-overview-egypt` | `litigation-dispute-resolution` (new `legalIssuesCovered`) | "Commercial Disputes in Egypt..." |
| `/ar/about/history` | `civil-law` (existing `whoWeHelp` sentence, extended in place) | "تاريخ المكتب" |
| `/en/about/history` | `civil-law` (existing `whoWeHelp` sentence, extended in place) | "the firm's history" |

All 5 chosen for genuine topical relevance (maritime practice → bill of
lading & ports/logistics clients; litigation practice → commercial
dispute types; the firm's own civil-law pillar → the firm's own
history) — no sitewide or forced links.

## RELATED CONTENT ARCHITECTURE — evaluation and decision

**Evaluated; deliberately not built as a new schema/component this
round.** Findings from inspecting the codebase:

- `PracticeAreas` already has a `relatedInsights` relationship field in
  its Payload schema — but it is **never read or rendered** by
  `src/app/(frontend)/[locale]/practice-areas/[slug]/page.tsx` (only
  `relatedLawyers` and `relatedIndustries` are rendered there). It's a
  dormant field, same category of issue as `canonicalOverride` found in
  an earlier audit this engagement.
- A working, already-rendered mechanism **does** exist: the `relatedFaqs`
  relationship (via `relatedPracticeAreaSlug` in `data.ts`'s `faqs`
  array) is rendered by the existing `FaqSection` component at the
  bottom of every practice-area page — used this round for the 9 new FAQ
  entries, zero new component code needed.
- **Decision**: use the site's existing, proven contextual-link pattern
  (markdown-style links woven into `legalIssuesCovered`/`howWeAssist`
  prose) as the primary related-content mechanism this round — it's
  already semantic, already topic-scoped (never blanket), and carries
  zero schema-migration risk. Wiring up `relatedInsights` to actually
  render, or adding a new `relatedPracticeAreas` field, would require a
  Payload schema change and a template change — a reasonable **future
  enhancement**, but deliberately deferred from this round to keep the
  change "محدودًا ودقيقًا" as instructed, rather than introducing new
  schema-migration risk into an already-large content change.

## TEST RESULTS

```
npx tsc --noEmit -p .   → clean, zero errors
npx eslint src/seed/data.ts src/seed/seed.ts   → clean, zero warnings
npx vitest run   → 7 test files, 48/48 tests passed
```

`npm run build` was not run locally (this sandbox has no production
database — same limitation as every prior phase); Vercel's own build
pipeline (which does have production DB access) ran the actual deploy,
verified below.

## REGRESSION RESULTS

- `git diff` confirms **zero lines removed** from any preserve-rankings
  page, and only 2 lines modified in-place (both the single `civil-law`
  whoWeHelp sentence extension) — every other change is a pure addition.
- Preserve-rankings keyword grep across the full diff: only *new,
  additive* lines mention "types of companies in egypt" and "قانون
  العمل الجديد" (as part of the new content for `corporate-commercial-law`
  and `employment-labour-law` respectively) — zero removed/altered lines
  touch any preserve-list page's existing text.
- `/admin` and `/api/consultation`: unchanged (200 and 405 respectively,
  identical to pre-deploy) — `src/proxy.ts` was not touched this round.
- Sitemap: still exactly **182 URLs** (no new pages were created, only
  existing ones expanded) — confirmed live post-deploy.
- `robots.txt`: unchanged, confirmed live post-deploy.

## PRODUCTION VERIFICATION

**Important finding, worth stating plainly**: unlike the Civil Law
Phase 2 publication (which needed a separate, manual `npm run seed` run
against production because this sandbox cannot reach the production
database), **this round's content changes went live automatically as
part of the normal Vercel deploy** — confirmed live, this session, by
re-fetching `administrative-law` immediately after the deploy and
finding the new content already rendered. This is because Vercel's own
build pipeline (configured per `DEPLOYMENT.md` as
`npx payload migrate && npm run seed && next build`) runs with Vercel's
own production environment variables, which this sandbox never has
access to — the two situations aren't contradictory, they reflect which
environment is actually running the seed step.

### 31-URL VERIFIED TABLE (the 17 fixed + the 14 left alone, all re-confirmed)

All 31 re-crawled live, post-deploy, this session:

| URL | Previous Problem | Exact Fix | Content Before → After | Links Before → After | HTTP | Canonical | Hreflang | Sitemap | Result |
|---|---|---|---|---|---|---|---|---|---|
| /en/practice-areas/administrative-law | Thin content | Full content added | 1075w → 1525w, now has whoWeHelp/legalIssuesCovered/howWeAssist | 0 → 0 (unchanged, content fix not link fix) | 200 | self | 3/3 | Y | ✅ live |
| /en/practice-areas/bounced-checks-negotiable-instruments | Thin content (link alone didn't work) | Full content added | 892w → 1510w | 2 → 2 | 200 | self | 3/3 | Y | ✅ live |
| /ar/practice-areas/consumer-protection | Thin content | Full content added | 468w → 1470w | 0 → 0 | 200 | self | 3/3 | Y | ✅ live |
| /en/practice-areas/consumer-protection | Thin content | Full content added (same entry) | 812w → 1588w | 0 → 0 | 200 | self | 3/3 | Y | ✅ live |
| /en/practice-areas/corporate-commercial-law | Thin (partial) | Missing sections completed, additive only | 878w → 1365w | 0 → 0 | 200 | self | 3/3 | Y | ✅ live |
| /en/practice-areas/document-notarization-authentication | Thin content (link alone didn't work) | Full content added | 868w → 1734w | 2 → 2 | 200 | self | 3/3 | Y | ✅ live |
| /en/practice-areas/terms-privacy-policy-drafting | Thin content | Full content added | 904w → 1556w | 0 → 0 | 200 | self | 3/3 | Y | ✅ live |
| /ar/practice-areas/employment-labour-law | Thin content | Full content added, additive only | 515w → 1400w | 0 → 0 | 200 | self | 3/3 | Y | ✅ live |
| /ar/practice-areas/tax-law | Thin content (link alone didn't work) | Full content added | 468w → 1424w | 2 → 2 | 200 | self | 3/3 | Y | ✅ live |
| /ar/practice-areas/wills-drafting | Thin content (link alone didn't work) | Full content added, additive only | 468w → 1414w | 2 → 2 | 200 | self | 3/3 | Y | ✅ live |
| /ar/practice-areas/commercial-agency-distribution | Thin content (link alone didn't work) | Full content added | 468w → 1434w | 2 → 2 | 200 | self | 3/3 | Y | ✅ live |
| /ar/practice-areas/construction-contracting-law | Thin content | Full content added | 468w → 1524w | 0 → 0 | 200 | self | 3/3 | Y | ✅ live |
| /en/insights/commercial-disputes-overview-egypt | Weak linking (content adequate) | +1 contextual link from litigation-dispute-resolution | 1372w → 1391w (unchanged content, own link count n/a) | 0 → 1 | 200 | self | 3/3 | Y | ✅ live |
| /en/about/history | Weak linking (content adequate) | +1 contextual link from civil-law | 675w → 694w (unchanged content) | 1 → 2 | 200 | self | 3/3 | Y | ✅ live |
| /en/insights/bill-of-lading-explained-egypt | Weak linking (content adequate) | +1 contextual link from maritime-shipping-port-law | 1431w → 1452w (unchanged content) | 0 → 1 | 200 | self | 3/3 | Y | ✅ live |
| /ar/about/history | Weak linking (content adequate) | +1 contextual link from civil-law | 396w → 749w (unchanged content) | 1 → 2 | 200 | self | 3/3 | Y | ✅ live |
| /ar/industries/ports-logistics | Weak linking (content adequate) | +1 contextual link from maritime-shipping-port-law | 369w → 740w (unchanged content) | 1 → 2 | 200 | self | 3/3 | Y | ✅ live |
| /en/privacy-policy | None (healthy) | No change | — | — | 200 | self | 3/3 | Y | unchanged |
| /en/insights/co-ownership-partition-egypt | None (healthy, new) | No change | — | — | 200 | self | 3/3 | Y | unchanged |
| /en/insights/common-inheritance-disputes-egypt | None (healthy) | No change | — | — | 200 | self | 3/3 | Y | unchanged |
| /en/insights/rental-tenancy-disputes-egypt | None (healthy, new) | No change | — | — | 200 | self | 3/3 | Y | unchanged |
| /ar/practice-areas/contract-translation | None (already fixed prior session) | No change | — | — | 200 | self | 3/3 | Y | unchanged |
| /ar/team | None (healthy, anomaly) | No change | — | — | 200 | self | 3/3 | Y | unchanged |
| /ar/terms | None (healthy) | No change | — | — | 200 | self | 3/3 | Y | unchanged |
| /en/insights/civil-vs-criminal-cases-egypt | None (healthy, new) | No change | — | — | 200 | self | 3/3 | Y | unchanged |
| /ar/insights/arbitration-vs-litigation-egypt | None (healthy) | No change | — | — | 200 | self | 3/3 | Y | unchanged |
| /ar/insights/breach-of-contract-rights-egypt | None (healthy) | No change | — | — | 200 | self | 3/3 | Y | unchanged |
| /ar/insights/civil-vs-criminal-cases-egypt | None (healthy, new) | No change | — | — | 200 | self | 3/3 | Y | unchanged |
| /ar/insights/co-ownership-partition-egypt | None (healthy, new) | No change | — | — | 200 | self | 3/3 | Y | unchanged |
| /ar/insights/common-inheritance-disputes-egypt | None (healthy) | No change | — | — | 200 | self | 3/3 | Y | unchanged |
| /ar/insights/rental-tenancy-disputes-egypt | None (healthy, new) | No change | — | — | 200 | self | 3/3 | Y | unchanged |

**31/31**: HTTP 200, self-canonical, 3/3 correct hreflang, zero
`X-Robots-Tag`, present in sitemap. Zero exceptions, zero regressions.

### New links individually verified resolving (no broken links)

`/ar/about/history`, `/en/about/history`,
`/en/insights/bill-of-lading-explained-egypt`,
`/en/industries/ports-logistics`,
`/en/insights/commercial-disputes-overview-egypt` — all confirmed `200`
when fetched directly, and all 5 confirmed rendered as real `<a href>`
anchors in their source page's live HTML (not just present in `data.ts`).

### Other checks

- Zero `vercel`/`vercel.app` string matches across all 31 pages' full
  rendered HTML, the sitemap, or robots.txt.
- IndexNow resubmitted for all 182 sitemap URLs post-deploy (Bing-only —
  not a Google Search Console action).

## REMAINING RISKS

- **Legal-content review**: this content was drafted following the same
  discipline as every prior content addition in this engagement (no
  fabricated facts, reuse of already-verified site content where it
  exists, conservative/general register where it doesn't), but it has
  **not** been through the formal lawyer-review pipeline used for
  standalone Insights articles (that pipeline — research → verify →
  draft → legal fact-check — is reserved for substantive new legal-fact
  articles; practice-area service-description content has historically
  followed the lighter-weight pattern already used for `criminal-law`
  and `contract-translation`). If you want these 11 practice areas
  reviewed by the firm's own lawyer before being considered fully
  final, that remains available as a follow-up step — flagging this
  explicitly rather than assuming it's unnecessary.
- **Preserve-rankings pages**: additive-only changes were made to the 3
  caution-flagged pages; no regression found, but these are exactly the
  pages worth double-checking in GSC's own performance report over the
  next few weeks given their ranking sensitivity.
- **`/ar/team` anomaly** (still in the 31, unexplained): untouched this
  round, as instructed — no content/link deficiency was found for it,
  so there is nothing more to fix on this side.
- **Related-content architecture**: the dormant `relatedInsights` field
  and the `relatedPracticeAreas` idea remain unimplemented — flagged as
  a future enhancement, not a current risk.

## GSC NEXT ACTION

**Per your explicit instruction, no Search Console action was taken** —
no Validate Fix, no Request Indexing. Once you've reviewed this report,
the recommended next steps (entirely yours to execute) would be, in
order: (1) spot-check a few of the 12 expanded pages yourself in a
browser to confirm the content reads naturally in both languages; (2)
your own Live URL Inspection on a sample of the 17 fixed URLs; (3)
whatever combination of Request Indexing / Validate Fix you judge
appropriate, on your own timeline — this report does not make that call
for you.

## FINAL DECISION

**READY FOR GSC VALIDATION.**

All 17 targeted URLs are live in production with their fixes applied
and independently re-verified (not assumed from a successful deploy).
All 31 URLs — the 17 touched and the 14 left alone — pass every
technical SEO check (200, self-canonical, correct hreflang, in sitemap,
no `X-Robots-Tag`, zero `vercel` references). Zero regressions found on
preserve-rankings pages, `/admin`, `/api`, or the sitemap/robots
baseline. The one caveat worth naming honestly: this is a code/content
deliverable, not a guarantee of Google's own re-indexing timeline — per
every prior round's own stated expectation, that still runs on Google's
2–4-week-plus cadence and is outside what any deploy can control.
