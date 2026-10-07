# Civil Law Authority — Phase 2 Report

Date: 2026-10-07. Production: https://alharrazlaw.com. Branch:
`claude/al-harraz-law-platform-oiq2y3`.

## Important note up front: a process error, caught and corrected

Partway through this phase, the three new civil-cluster articles (rental
disputes, co-ownership partition, civil-vs-criminal) were drafted and
**added directly to `src/seed/data.ts`**, along with internal links
pointing to them from the pillar and several existing pages. This was a
mistake: the project's own `LEGAL_SOURCE_REGISTER.md` explicitly documents
that new legal content must be **delivered as a draft file for a named
firm lawyer to review**, never added directly to `data.ts` (which
auto-publishes via the seed script with a `legalReviewer` field — doing so
would have misrepresented review that had not actually happened, exactly
what this phase's own brief explicitly prohibited in §10 and §29). Before
anything was committed or pushed, this was caught, and **the `data.ts`
change was fully reverted via `git checkout`** — confirmed via a clean
`git status`. Nothing from that mistaken attempt reached git history or
production. The three articles were instead written as standalone draft
files, delivered to you, and logged in `LEGAL_SOURCE_REGISTER.md` as
`NEEDS_HUMAN_LEGAL_REVIEW`, per the established process.

## A) What was found

- The civil-law pillar (`/practice-areas/civil-law`, strengthened in
  Phase 1) is healthy: 200, self-canonical, correct hreflang, in the
  sitemap, FAQPage schema present, all 18 of its outbound links resolve to
  200. No defect found — left untouched per the brief's audit-first rule.
- Three genuine content gaps remain from Phase 1's roadmap: rental/tenancy
  disputes, co-ownership partition, and civil-vs-criminal case selection.
- Primary-source-adjacent research surfaced a **very recent, high-stakes
  legal change**: Law No. 164 of 2025 (effective August 2025), ending the
  "old rent" tenancy regime via a multi-year transition. Two otherwise
  reliable sources disagree on one specific figure (the "economic zone"
  rent multiplier: 10x vs. 5x) — this could not be resolved with the tools
  available this session.
- Co-ownership/partition research found stable, well-corroborated Civil
  Code provisions (Articles 825, 834, 835, 848, with 836 referenced once).
- The civil-vs-criminal topic required an explicit cannibalization check
  against the existing, already-ranking `difference-between-misdemeanor-and-felony`
  article — confirmed genuinely distinct intent (track selection vs.
  severity classification).

## B) What was changed (in production)

**Nothing.** This phase made zero changes to the live site. The pillar
audit concluded "leave it alone" (per the brief's own instruction), and
the three new articles are correctly unpublished pending review.

## C) What was deliberately NOT changed

- The civil-law pillar page (audited, found healthy, no evidence-based
  reason to touch it).
- Any of the Phase 1 internal links or homepage changes (already live,
  not re-touched).
- The homepage's "Tenancy Matters" Civil Focus item — still falls back to
  the pillar, as set in Phase 1; will only be repointed to the real
  tenancy article after that article is approved, published, and
  production-verified.
- `difference-between-misdemeanor-and-felony` — not referenced, retitled,
  or linked from the new civil-vs-criminal draft.
- The real-estate duplicate-canonical issue from `GSC_INDEXING_RECOVERY.md`
  §2 — not reopened, per instruction.
- Any preserve-list page.

## D) New URLs created

None. (The three drafted articles have proposed URLs —
`insights/rental-tenancy-disputes-egypt`,
`insights/co-ownership-partition-egypt`,
`insights/civil-vs-criminal-cases-egypt` — but none exist in the CMS or
sitemap yet.)

## E) Existing URLs changed

None.

## F) Legal sources used

Full detail in `CIVIL_PHASE_2_LEGAL_RESEARCH_REGISTER.md` and
`LEGAL_SOURCE_REGISTER.md`. Summary: 5 sources for the tenancy draft
(shoeiblaw.com, Youm7, Al-Dostor, Al-Jazeera, Lawyer Egypt), 4 sources for
the co-ownership draft (Youm7, Mohamy Masr, Lawyer Egypt, Salama Law
Firm), 2 sources for the civil-vs-criminal draft (Lawyer Egypt, Mawdoo3).

## G) Which content passed legal verification

"Legal verification" here means source-corroboration (2+ independent
sources), which is this session's own research gate — **not** the firm's
lawyer-review gate, which is separate and has not yet happened for any of
the three drafts. Within that narrower sense:
- Co-ownership draft: all four cited Civil Code articles (825, 834, 835,
  848) corroborated with matching text across 2 independent sources each.
- Civil-vs-criminal draft: core mechanism corroborated across 2 sources,
  no specific article number claimed.
- Tenancy draft: **partially** — core facts (law number, transition
  periods, annual increase %, alternative-housing right, pre/post-1996
  structure) corroborated across 2+ sources; the per-zone rent multiplier
  table is **not** corroborated (sources conflict) and was deliberately
  excluded from the draft.

## H) Which content is awaiting lawyer review

All three: `rental-tenancy-disputes-egypt`, `co-ownership-partition-egypt`,
`civil-vs-criminal-cases-egypt`. Delivered as files (see the file
attachments). Logged in `LEGAL_SOURCE_REGISTER.md` under "Drafts — pending
lawyer review (2026-10-07, Civil Law authority expansion phase 2)".

## I) Internal links added

None live. The planned graph (16 links across the pillar, two practice
areas, and three existing articles) is fully specified in
`CIVIL_INTERNAL_LINK_GRAPH_PHASE_2.md`, ready to implement the moment each
article is approved and added to the CMS.

## J) Schema changes

None this phase (Phase 1's FAQPage schema fix remains live and
unchanged). No new schema was added since no new content was published.

## K) Canonical/hreflang/indexability results

Pillar re-confirmed healthy (§A). No other page was touched, so no other
canonical/hreflang/indexability check was needed this phase.

## L) Sitemap result

Unchanged — still 176 URLs (last confirmed in Phase 1; not re-counted
this phase since nothing that would affect it was deployed).

## M) Production verification

See `CIVIL_PHASE_2_PRODUCTION_EVIDENCE.md` for the full curl-based
evidence of the pillar's live health check. No other production
verification was applicable this phase (nothing else was deployed).

## N) Tests / typecheck / lint / build

- `npx tsc --noEmit`: clean, run both before and after the revert.
- `npx eslint`: clean, same pattern.
- Build: not run — no application-code changes to validate, and this
  sandbox has no live Postgres connection for static generation (same
  limitation noted in every prior phase).
- Tests: no test-relevant changes; not run.

## O) Preserve-ranking diff result

`git status` confirms the working tree is clean (the one file that was
changed, `src/seed/data.ts`, was fully reverted). There is no diff to
check against the preserve list this phase, because nothing was committed
that touches any page.

## P) GBP manual actions you must do

See `CIVIL_GBP_IMPLEMENTATION_CHECKLIST.md` in full. Summary: verify your
current primary category in the live GBP dashboard, consider adding
verified-to-exist secondary categories, add the civil-focused services
list, optionally update the business description with the provided
factual text, and re-confirm NAP consistency. Nothing here can be done
from this session — GBP access is entirely yours.

## Q) Google review actions you must do

See `GOOGLE_REVIEW_GROWTH_PLAN.md` in full. Summary: ask genuine clients
after resolved matters, using the provided WhatsApp template, never
incentivized; respond to reviews professionally without disclosing
confidential matter details.

## R) GSC manual actions you must do

None new this phase beyond what's already queued from
`GSC_DISCOVERED_NOT_INDEXED_35_AUDIT.md` §K (still the owner's to submit
separately, per your instruction that this is handled outside this
session). No new URLs exist yet to add to any indexing queue.

## S) Remaining blockers

1. **All three new articles are blocked on your (or Mahmoud Harraz's)
   legal review** — this is the primary blocker for this phase's actual
   content goal. The tenancy draft in particular needs the closest look,
   given the source conflict on the rent-multiplier figure and how recent
   the underlying law is.
2. No GSC API/UI access in this environment for fresh measurement data —
   the next measurement needs a fresh export from you, per
   `CIVIL_GSC_NEXT_MEASUREMENT.md`.
3. No GBP access in this environment — every GBP action in §P is yours to
   execute.

## T) Recommended next measurement date

**Early-to-mid November 2026** (3–4 weeks from today) — see
`CIVIL_GSC_NEXT_MEASUREMENT.md` for exactly what to check at that point.
If any of the three drafts are approved before then, let me know and I'll
implement the planned links, deploy, and production-verify them in a
follow-up session — that work is fully speced and ready to execute
(`CIVIL_INTERNAL_LINK_GRAPH_PHASE_2.md`), just gated on your review.
