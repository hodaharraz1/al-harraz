# Civil Law Phase 2 — Production Evidence

Date: 2026-10-07.

## Update: FINAL PUBLICATION AUTHORIZATION — execution status (same day)

The firm owner, Mahmoud Harraz, issued a FINAL PUBLICATION AUTHORIZATION
approving all three final corrected drafts (rental/tenancy disputes,
co-ownership partition, civil-vs-criminal cases) for publication. Status:

**CODE COMPLETE — WAITING FOR PRODUCTION SEED.** This is not yet
"COMPLETE": the code is written, verified, committed, and pushed, but the
three articles and their internal links do not yet exist in the live CMS,
and no production URL for them can be verified until that changes.

What was done this session:
- The three lawyer-approved drafts were transcribed **verbatim** (no
  rewriting, no summarizing) into `src/seed/data.ts`'s `articles` array —
  slugs `rental-tenancy-disputes-egypt`, `co-ownership-partition-egypt`,
  `civil-vs-criminal-cases-egypt`.
- The internal links specified in `CIVIL_INTERNAL_LINK_GRAPH_PHASE_2.md`
  were added as strictly additive paragraphs/sentences to the existing
  `civil-law` pillar, `real-estate-property-registration`,
  `property-possession-disputes-egypt`, `common-inheritance-disputes-egypt`,
  and `what-is-civil-lawsuit` entries in the same file. The `civil-law`
  pillar's title, H1, URL, canonical, metadata, and all Phase-1 prose were
  left untouched — only one new linking paragraph was appended to its
  `legalIssuesCovered` field.
- `LEGAL_SOURCE_REGISTER.md` and `CIVIL_PHASE_2_LEGAL_RESEARCH_REGISTER.md`
  were updated to record the approval: status for all three is now
  **LAWYER APPROVED — Mahmoud Harraz, 2026-10-07**. The INTERNAL LEGAL
  MAINTENANCE NOTE on the Law 174/2025 future-expiry risk for
  `civil-vs-criminal-cases-egypt` was kept intact and unmodified.
- The reviewer mechanism in `src/seed/seed.ts` was confirmed unchanged and
  reused as-is: it resolves `legalReviewer` from the existing admin account
  for `hodaharraz1@gmail.com` (the firm owner's own account) — no new
  reviewer identity was invented or added.
- `npx tsc --noEmit -p .`: clean.
- `npx eslint src/seed/data.ts src/seed/seed.ts src/components/home/CivilFocus.tsx`: clean.
- `npm run build`: **not run** — this sandbox has no live Postgres
  connection (confirmed this session: `DATABASE_URI` points to
  `127.0.0.1:5432`, and that port is unreachable here), consistent with
  every prior phase of this engagement. Payload's build step requires a
  reachable database.
- Changes were committed and pushed to `claude/al-harraz-law-platform-oiq2y3`.

**What was deliberately NOT pushed this session:** the homepage
`CivilFocus.tsx` "Tenancy/الإيجارات" link update (from the `civil-law`
pillar fallback to `/insights/rental-tenancy-disputes-egypt`). This is a
Next.js code change that deploys immediately on push, independent of the
CMS/seed state. Pushing it now — before the rental article actually exists
in production — would put a dead link on the live homepage until the seed
step below is run. The change is prepared (verified with `tsc`/`eslint`)
and held locally; it will be pushed as a small follow-up commit only after
the rental article is confirmed live (HTTP 200, correct title/body) in
production, per the explicit sequencing rule in
`CIVIL_INTERNAL_LINK_GRAPH_PHASE_2.md`.

**Why production isn't updated yet:** this sandbox has no network path to
the production Postgres database (same constraint documented in
`LEGAL_SOURCE_REGISTER.md` for the 2026-09-28 publication of the previous
12 articles). `src/seed/seed.ts`'s `articles` loop — which creates new
article records and re-syncs existing ones' title/excerpt/body — only runs
against whatever `DATABASE_URI`/`POSTGRES_URL` the environment running
`npm run seed` is configured with. In this sandbox that resolves to an
unreachable local placeholder, not production. Someone with production
database access (the firm owner, as before, via `vercel env pull` for the
production credentials, or a CI/deploy step with that access) must run
`npm run seed` against production for these changes to actually appear in
the CMS and on the live site.

**Once that seed run happens**, the following still need to happen before
this phase can be reported complete:
1. Verify all 6 new URLs (`/ar/` and `/en/` × 3 slugs) return HTTP 200,
   with correct canonical/hreflang/title/H1/body/internal links and no
   accidental noindex.
2. Verify the sitemap count increased by 6 and includes the new URLs.
3. Push the held-back `CivilFocus.tsx` homepage link commit, then verify
   the homepage's rendered "Tenancy/الإيجارات" link resolves to the new
   article.
4. Verify the existing pages that received new additive links
   (`civil-law`, `real-estate-property-registration`,
   `property-possession-disputes-egypt`,
   `common-inheritance-disputes-egypt`, `what-is-civil-lawsuit`) still
   return 200 and now render the new links.
5. Confirm `difference-between-misdemeanor-and-felony` and the 8
   preserve-ranking-list pages are unchanged (a `git diff` check already
   confirms no preserve-list content was touched by this session's code
   changes — see below).
6. Resubmit IndexNow (Bing-only) for the 6 new/changed URLs.
7. Manually queue the 6 new URLs in Google Search Console (Google does not
   auto-index new pages; this is a required manual step, not automatic).

## Preserve-ranking diff check (this session)

`git diff` against all files touched this session was grepped for every
string on the preserve-list (the 8 GSC query-baseline pages, plus
`difference-between-misdemeanor-and-felony`, plus
`rights-of-the-accused-in-criminal-cases`): **no matches** — none of those
pages' content was touched. The `criminal-law` practice area (which links
to `difference-between-misdemeanor-and-felony`) was not touched either.

## Civil-law pillar — prior live health check (2026-10-07, earlier this session, before the publication authorization)

```
GET https://alharrazlaw.com/ar/practice-areas/civil-law → 200
  canonical: https://alharrazlaw.com/ar/practice-areas/civil-law (self)
  meta robots: index, follow
  in sitemap: yes (confirmed via sitemap.xml grep)

GET https://alharrazlaw.com/en/practice-areas/civil-law → 200
  canonical: https://alharrazlaw.com/en/practice-areas/civil-law (self)
```

All 18 outbound links present in the pillar's rendered HTML were
individually curled and confirmed 200:
`/ar/about`, `/ar/consultation`, `/ar/contact`, `/ar/industries`,
`/ar/insights`, `/ar/insights/civil-appeals-process-egypt`,
`/ar/insights/evidence-in-civil-cases-egypt`,
`/ar/insights/filing-a-civil-lawsuit-in-egypt`,
`/ar/insights/how-civil-judgments-are-enforced`,
`/ar/insights/property-possession-disputes-egypt`,
`/ar/insights/what-is-civil-lawsuit`,
`/ar/insights/what-to-review-before-signing-contract`,
`/ar/insights/when-can-you-claim-compensation`, `/ar/practice-areas`,
`/ar/practice-areas/contracts-commercial-agreements`,
`/ar/practice-areas/debt-recovery-enforcement`,
`/ar/practice-areas/litigation-dispute-resolution`,
`/ar/practice-areas/real-estate-property-registration`.

No broken links. No accidental noindex. No duplicate metadata observed.
This was the pillar's state immediately before this session's publication
work — a baseline, not evidence of the new changes (those are not live
yet; see above).

## Prior phase history (unchanged record)

Earlier in Phase 2 (before the publication authorization), the three
articles were briefly, mistakenly added directly to `src/seed/data.ts`
before legal review — caught and reverted via `git checkout` before any
commit or push reached git history. See `CIVIL_SEO_AUTHORITY_PHASE_2_REPORT.md`
for the full disclosure. That mistake is unrelated to today's properly
authorized publication, which followed the correct review chain (FINAL
VERIFICATION PASS → FINAL PRE-SIGN-OFF CORRECTIONS → FINAL PUBLICATION
AUTHORIZATION) before any code reached `data.ts`.
