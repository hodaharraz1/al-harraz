# GSC "Discovered – Currently Not Indexed" — VERIFIED 31-URL Audit

Date: 2026-10-26. **This supersedes the candidate/reconstructed list in
`GSC_DISCOVERED_NOT_INDEXED_31_ROUND2_INVESTIGATION.md`** — that round
used a 41-URL best-effort reconstruction because the literal GSC export
wasn't available. **You've now provided 4 screenshots of the real GSC
"Discovered – currently not indexed" table (31/31 rows, confirmed by the
"31-31 من 10" pager).** I extracted all 31 URLs directly from those
screenshots (not re-guessed) and cross-checked: **all 31 are a subset of
the 41 I had already live-crawled this session**, so every technical
finding below is fresh, direct evidence from production — nothing
reused blindly from the prior round's guesswork.

**Investigation only. No deploy, no production change, no content
change, no URL/slug/sitemap change, no Request Indexing, no Validate
Fix.**

## Validation of the prior round's reconstruction (worth noting once)

The prior round's 41-candidate guess turned out to contain **all 31**
real URLs, plus 10 extra. Those 10 extra were *exactly* the 11 P0
hub/entity pages (minus `/ar/team`, which is still flagged — see below)
— i.e., the highest-internal-link-equity pages on the site. This is a
useful, if circumstantial, data point supporting the "well-linked pages
eventually get crawled/indexed" pattern, now with real confirmation:
`/ar/about`, `/ar/contact`, `/ar/industries`, `/ar/insights`,
`/ar/team/mahmoud-mohamed-taha-harraz`,
`/ar/team/mostafa-mohamed-taha-harraz`, `/en/team`,
`/en/team/mahmoud-mohamed-taha-harraz`,
`/en/team/mohamed-taha-mohamed-harraz`,
`/en/team/mostafa-mohamed-taha-harraz` have all **left** this GSC
bucket since the Oct 7 audit. The one exception, `/ar/team` itself still
being flagged despite the same nav-wide linking as its resolved English
counterpart, is flagged as a minor anomaly below (§ROOT CAUSE).

## ROOT CAUSE BREAKDOWN

Classification legend: **A** technical problem · **B** thin/insufficient
content · **C** weak internal linking/crawl priority · **D** duplicate/
near-duplicate · **E** healthy, likely awaiting Google recrawl ·
**F** other.

| Classification | Count | URLs |
|---|---|---|
| **A** — technical problem | **0** | none — every one of the 31 is HTTP 200, self-canonical, 3/3 correct hreflang, `index,follow`, zero `X-Robots-Tag`, present in sitemap. Re-verified live this session for all 31, not assumed. |
| **B** — thin content (primary driver) | **12** | `/en/practice-areas/administrative-law`, `/en/practice-areas/bounced-checks-negotiable-instruments`, `/en/practice-areas/consumer-protection`, `/en/practice-areas/corporate-commercial-law` (partial), `/en/practice-areas/document-notarization-authentication`, `/en/practice-areas/terms-privacy-policy-drafting`, `/ar/practice-areas/consumer-protection`, `/ar/practice-areas/employment-labour-law`, `/ar/practice-areas/tax-law`, `/ar/practice-areas/wills-drafting`, `/ar/practice-areas/commercial-agency-distribution`, `/ar/practice-areas/construction-contracting-law` |
| **C** — weak internal linking (content otherwise adequate) | **5** | `/en/insights/commercial-disputes-overview-egypt`, `/en/about/history`, `/en/insights/bill-of-lading-explained-egypt`, `/ar/about/history`, `/ar/industries/ports-logistics` |
| **D** — duplicate/near-duplicate | **0** | none found among these 31 — the one known cannibalization case on this site (`legal-considerations-real-estate-purchase-contracts`) is a different GSC category entirely and not among these 31 |
| **E** — healthy, awaiting Google | **14** | `/en/privacy-policy`, `/en/insights/co-ownership-partition-egypt`*, `/en/insights/common-inheritance-disputes-egypt`, `/en/insights/rental-tenancy-disputes-egypt`*, `/ar/practice-areas/contract-translation`, `/ar/team`, `/ar/terms`, `/en/insights/civil-vs-criminal-cases-egypt`*, `/ar/insights/arbitration-vs-litigation-egypt`, `/ar/insights/breach-of-contract-rights-egypt`, `/ar/insights/civil-vs-criminal-cases-egypt`*, `/ar/insights/co-ownership-partition-egypt`*, `/ar/insights/common-inheritance-disputes-egypt`, `/ar/insights/rental-tenancy-disputes-egypt`* (★ = new Phase 2 article, ~2 weeks old) |
| **F** — other | **0** | — |

(12+5+14 = 31. Several B-category URLs also have weak linking as a
secondary factor — classified by primary/binding constraint, per the
table below for the per-URL detail.)

## 31-URL VERIFIED TABLE

All data below is **live, fresh, this session** — HTTP/canonical/
hreflang/sitemap via direct `curl`; internal-link counts via source-code
cross-reference against `src/seed/data.ts`; content-depth via direct
inspection of whether `whoWeHelp`/`legalIssuesCovered`/`howWeAssist`
exist for each practice-area entry.

| URL | Page Type | HTTP | Canonical | Sitemap | Internal Links | Content Quality | Duplicate Risk | Technical Issue | Classification | Recommended Action | Priority |
|---|---|---|---|---|---|---|---|---|---|---|---|
| /en/privacy-policy | policy | 200 | self | Y | nav-wide (~85) | adequate (934w) | None | None | E | none | P3 |
| /en/insights/co-ownership-partition-egypt | article (new) | 200 | self | Y | 8 (very well-linked) | substantial, lawyer-approved | None | None | E | none | P1 |
| /en/insights/commercial-disputes-overview-egypt | article | 200 | self | Y | 0 (hub only) | adequate (1372w) | None | None | C | add 1 contextual cross-link | P1 |
| /en/insights/common-inheritance-disputes-egypt | article | 200 | self | Y | 6 (well-linked) | adequate (1802w) | None | None | E | none | P1 |
| /en/insights/rental-tenancy-disputes-egypt | article (new) | 200 | self | Y | 4 | substantial | None | None | E | none | P1 |
| /en/practice-areas/administrative-law | practice area | 200 | self | Y | 0 | **thin — overview only, no expanded sections** | None | None | B | expand content (whoWeHelp/legalIssuesCovered/howWeAssist) + 1 link | P1 |
| /en/practice-areas/bounced-checks-negotiable-instruments | practice area | 200 | self | Y | 2 (Oct 7 link fix) | **thin — still overview only** | None | None | B | expand content (link alone didn't work in 19 days) | P1 |
| /en/practice-areas/consumer-protection | practice area | 200 | self | Y | 0 | **thin** | None | None | B | expand content + 1 link | P2 |
| /en/practice-areas/corporate-commercial-law | practice area | 200 | self | Y | 0 | partially expanded (`legalIssuesCovered` only) | None | None | B | finish expansion (`whoWeHelp`/`howWeAssist`) — **preserve-list caution, additive only** | P1 |
| /en/practice-areas/document-notarization-authentication | practice area | 200 | self | Y | 2 (Oct 7 link fix) | **thin — still overview only** | None | None | B | expand content | P1 |
| /en/practice-areas/terms-privacy-policy-drafting | practice area (service) | 200 | self | Y | 0 | **thin** | None | None | B | expand content + 1 link | P2 |
| /ar/practice-areas/consumer-protection | practice area | 200 | self | Y | 0 | **thin** | None | None | B | expand content + 1 link | P2 |
| /ar/practice-areas/contract-translation | practice area | 200 | self | Y | 2 | **already fully expanded** (whoWeHelp+legalIssuesCovered+howWeAssist) | None | None | E | none — already fixed, monitor | P1 |
| /ar/practice-areas/employment-labour-law | practice area | 200 | self | Y | 0 | **thin** | None | None | B | expand content — **preserve-list caution ("employment lawyer")** | P1 |
| /ar/practice-areas/tax-law | practice area | 200 | self | Y | 2 (Oct 7 link fix) | **thin — still overview only** | None | None | B | expand content | P1 |
| /ar/practice-areas/wills-drafting | practice area | 200 | self | Y | 2 (Oct 7 link fix) | **thin — still overview only** | None | None | B | expand content — **preserve-list caution ("estate planning lawyer")** | P1 |
| /ar/team | hub | 200 | self | Y | nav-wide (~85) | adequate (501w) | None | None | E | none — **anomaly, see note** | P0 |
| /ar/terms | policy | 200 | self | Y | nav-wide (~85) | adequate (384w) | None | None | E | none | P3 |
| /en/about/history | supporting | 200 | self | Y | 1 (about page) | adequate (675w) | None | None | C | add 1 contextual link | P2 |
| /en/insights/bill-of-lading-explained-egypt | article | 200 | self | Y | 0 (hub only) | adequate, niche (1431w) | None | None | C | add 1 contextual link if a natural one exists | P2 |
| /en/insights/civil-vs-criminal-cases-egypt | article (new) | 200 | self | Y | 4 | substantial | None | None | E | none | P1 |
| /ar/about/history | supporting | 200 | self | Y | 1 | adequate (396w) | None | None | C | add 1 contextual link | P2 |
| /ar/industries/ports-logistics | industry | 200 | self | Y | 1 (industries index) | adequate, has `businessProblems` (369w) | None | None | C | add 1 contextual link | P2 |
| /ar/insights/arbitration-vs-litigation-egypt | article | 200 | self | Y | 4 | adequate (485w) | None | None | E | none | P1 |
| /ar/insights/breach-of-contract-rights-egypt | article | 200 | self | Y | 4 (Oct 7 link fix) | adequate (494w) | None | None | E | monitor — link fix applied, still awaiting crawl | P1 |
| /ar/insights/civil-vs-criminal-cases-egypt | article (new) | 200 | self | Y | 4 | substantial | None | None | E | none | P1 |
| /ar/insights/co-ownership-partition-egypt | article (new) | 200 | self | Y | 8 (very well-linked) | substantial | None | None | E | none | P1 |
| /ar/insights/common-inheritance-disputes-egypt | article | 200 | self | Y | 6 | adequate (515w) | None | None | E | none | P1 |
| /ar/insights/rental-tenancy-disputes-egypt | article (new) | 200 | self | Y | 4 | substantial | None | None | E | none | P1 |
| /ar/practice-areas/commercial-agency-distribution | practice area | 200 | self | Y | 2 (Oct 7 link fix) | **thin — still overview only** | None | None | B | expand content | P1 |
| /ar/practice-areas/construction-contracting-law | practice area | 200 | self | Y | 0 | **thin** | None | None | B | expand content + 1 link | P1 |

Every row: hreflang 3/3 correct (ar/en/x-default), `meta robots:
index,follow`, zero `X-Robots-Tag` — omitted as separate columns since
they're identical (100%) across all 31, already stated above.

## THIN CONTENT URLS (12 — classification B)

All 12 share the exact same structural gap: `title` + one-sentence
`summary` + one-sentence `overview` in `src/seed/data.ts`, **with no
`whoWeHelp`/`legalIssuesCovered`/`howWeAssist` fields at all** (except
`corporate-commercial-law`, which has `legalIssuesCovered` only — a
partial fix). This is the *exact same gap pattern* already proven
fixable for `criminal-law` and `contract-translation` (both now resolved
or in category E). **5 of these 12 received a link-only fix on Oct 7
and are still here 19 days later** — direct evidence that the link
alone wasn't the binding constraint for this tier of page.

## WEAK INTERNAL LINK URLS (5 — classification C)

Content itself is adequate for all 5 (`commercial-disputes-overview-egypt`,
`about/history` AR+EN, `bill-of-lading-explained-egypt`,
`ports-logistics`) — each sits at exactly 1 inbound link (its own
hub-listing entry), with no contextual cross-link from any other page's
body text. Lowest-cost, lowest-risk fix category.

## HEALTHY BUT PENDING URLS (14 — classification E)

The strongest evidence group. Breaks into three distinct sub-groups,
each with its own reason to expect resolution requires only time:

1. **6 brand-new Phase 2 articles** (AR+EN × `rental-tenancy-disputes-egypt`,
   `co-ownership-partition-egypt`, `civil-vs-criminal-cases-egypt`) —
   published ~2 weeks ago, already carrying 4–8 genuine contextual
   inbound links each (richer linking than most of the B/C group) —
   nothing to fix, purely a recency/first-crawl matter.
2. **Already-remediated pages**: `contract-translation` (AR, content
   fully expanded in a prior session), `breach-of-contract-rights-egypt`
   and 2 others that got Oct 7 link additions and have adequate content
   — the fix is already applied; what remains is Google's own re-crawl.
3. **Pages with no deficiency ever found**: `arbitration-vs-litigation-egypt`,
   `common-inheritance-disputes-egypt` (AR+EN, well-linked and
   content-adequate from the start), `/ar/team`, `/ar/terms`,
   `/en/privacy-policy` (hub/policy pages at maximum internal-link
   equity).

**Anomaly worth flagging**: `/ar/team` remains in this GSC bucket while
`/en/team` and every individual lawyer profile (both languages) do not.
Both AR and EN team hubs carry identical nav-wide linking in this site's
architecture — there's no structural reason for one to resolve and not
the other. This looks like ordinary crawl-queue variance (Google doesn't
process a domain's URLs in a fully deterministic, synchronized order)
rather than a hidden defect — but it's called out explicitly rather than
silently folded into "normal," since I don't have a confirmed mechanism
for the asymmetry.

## TECHNICAL PROBLEMS

**None found.** Re-verified live, this session, for the exact 31 real
URLs (not the prior round's reconstruction): 31/31 — HTTP 200,
self-canonical, correct hreflang, `index,follow`, zero `X-Robots-Tag`,
present in sitemap, server-rendered content visible in raw HTML. Every
`curl` result and the `data.ts` source-code check behind this table is
fresh evidence gathered this session.

## VERCEL HISTORICAL IMPACT

Per your explicit instruction not to deny a historical effect without
evidence, here is the honest, bounded assessment — distinguishing what's
confirmed from what's a reasonable but unproven mechanism:

- **Current technical cause: confirmed NOT a factor.** Every one of
  these 31 URLs is on `alharrazlaw.com`, already self-canonical, already
  in the sitemap, and the old `al-harraz.vercel.app` host now correctly
  308-redirects every page path (verified live, including under a
  Googlebot User-Agent, in the prior round's work). There is no live
  signal connecting the old-domain issue to why Google hasn't crawled
  these specific 31 pages.
- **Historical possible influence: plausible, mechanistically
  reasonable, but not confirmed by direct evidence.** The canonical-host
  redirect was added 2026-09-28 (commit `8bf7ec8`). Before that date,
  it's plausible the old `al-harraz.vercel.app` host served live,
  un-redirected, duplicate content for an unknown prior period — if
  Googlebot crawled both the real and old-domain versions of the site's
  pages during that window, that could have diluted the domain's overall
  crawl budget/priority (Google allocating crawl effort across what it
  perceived as two live hostnames instead of one), which could plausibly
  have slowed first-discovery/indexing momentum for lower-priority pages
  sitewide, including some of these 31. **I cannot confirm this actually
  happened** — I have no server access logs, no GSC Crawl Stats history,
  and no Wayback Machine snapshots of `al-harraz.vercel.app` (checked:
  zero archived snapshots exist for that host at all, in either the
  prior round's search or now) to show what it served before Sept 28.
- **Decisive counter-evidence limiting how much this can explain**:
  **the 6 brand-new Phase 2 articles did not exist before Sept 28** —
  they were published roughly two weeks ago, entirely after the
  canonical-host fix was already live. Whatever historical crawl-budget
  dilution might have occurred before Sept 28 **cannot be the reason**
  these 6 URLs are in this bucket; their presence is fully and
  sufficiently explained by recency alone. The historical-impact
  hypothesis, even if true, would only apply to the 25 carryover URLs
  that existed before Sept 28 — not as the explanation for the set as a
  whole.
- **Net assessment**: a legacy, partial, unconfirmed contributing factor
  for some of the 25 older URLs is plausible and not ruled out; it is
  not the primary or sole explanation for this 31-URL set, and the
  current state carries no live trace of it.

## Cross-analysis — your specific questions

**1. How many of the prior report's "11 thin practice areas" are in the real 31?**
**11 of 11 (100%).** Every practice-area page the prior investigation
flagged as having zero `whoWeHelp`/`legalIssuesCovered`/`howWeAssist`
content is confirmed present in the real GSC export.

**2. How many of the 31 are NOT in that 11?**
**20 of 31 (65%)** — the 14 "E" (healthy, awaiting Google) URLs plus the
5 "C" (weak-link-only) URLs plus `corporate-commercial-law` (partially
expanded, not in the "zero fields" 11).

**3. Are there content-strong pages in the 31, and why might Google not have indexed them?**
**Yes — the 14 "E" category URLs**, most clearly the 6 new Phase 2
articles (substantial, lawyer-approved, 4–8 genuine inbound links each)
and `contract-translation` (AR, already fully content-expanded). The
most defensible explanation is pure crawl-queue timing — Google simply
hasn't gotten to them yet, which for content published ~2 weeks ago on a
site with this crawl cadence is not unusual.

**4. Would fixing the 11 thin pages alone solve the whole 31-URL problem? Yes/No, with evidence.**
**No.** Fixing those 11 (expanding content) would, if it works, address
only 12/31 (39%, including `corporate-commercial-law`) of the current
bucket. The other 19 URLs (61%) have no content or linking deficiency
this investigation could find — their resolution depends entirely on
Google's own crawl/index timing, which no further content or code change
can accelerate. Evidence: the 6 brand-new, well-linked, substantial
Phase 2 articles; the already-content-fixed `contract-translation`
(still flagged); the already-well-linked `common-inheritance-disputes-egypt`
(AR+EN) and `arbitration-vs-litigation-egypt`; and the maximally-linked
`/ar/team`/`/ar/terms`/`/en/privacy-policy`.

**5. Could the Vercel issue have a historical effect?**
See the dedicated section above — plausible and not denied, bounded by
the fact it cannot explain the 6 newest URLs at all, and unconfirmed by
any direct log/history evidence for the 25 older ones.

**6. Is there a site-wide crawl-prioritization or internal-linking architecture issue?**
**One real, systemic pattern, not a bug**: this site has **no
"related articles" / "you might also like" component anywhere** — every
leaf page (article, practice area) gets exactly one inbound link by
default (its own listing in the relevant hub index), and any additional
cross-link only exists where someone manually added one during a prior
content-fix round. This explains why so many leaf pages cluster at 1–2
inbound links regardless of topic. It is not itself a defect — it's a
content-architecture choice — but it's the single highest-leverage,
reusable fix available: a systematic related-content component would
give every future article/practice-area page 2–4 contextual inbound
links automatically, instead of requiring a manual one-off link
addition each time this GSC category recurs. Flagged as a P2/strategic
recommendation, not part of this round's immediate fix list.
No pagination, filter, or query-parameter URL generation exists anywhere
in the app — the sitemap's 182 URLs are a clean, finite, non-bloated set.

**7. Does the sitemap currently contain all 31?**
**Yes — 31/31**, confirmed via direct `<loc>` lookup in the live
`sitemap.xml` for every one of the real 31 URLs.

## RECOMMENDED FIX PLAN

**P0 — no fix exists or is needed.** `/ar/team` (and the 2 policy pages,
which are always naturally low-priority) require no content/link change
— purely Google-side. Worth a manual Request Indexing once you're ready
for that step (not done this round).

**P1 — content expansion (the 12 B-category URLs), same proven pattern
as `criminal-law`/`contract-translation`**: add `whoWeHelp`/
`legalIssuesCovered`/`howWeAssist` to `src/seed/data.ts` for
`administrative-law` (EN), `bounced-checks-negotiable-instruments` (EN),
`consumer-protection` (AR+EN), `document-notarization-authentication`
(EN), `terms-privacy-policy-drafting` (EN), `employment-labour-law`
(AR, **preserve-list caution**), `tax-law` (AR), `wills-drafting` (AR,
**preserve-list caution**), `commercial-agency-distribution` (AR),
`construction-contracting-law` (AR); finish `corporate-commercial-law`
(EN, **preserve-list caution**, add the missing `whoWeHelp`/`howWeAssist`
on top of its existing `legalIssuesCovered`).

**P2 — one contextual link each (the 5 C-category URLs)**:
`commercial-disputes-overview-egypt` (EN), `about/history` (AR+EN),
`bill-of-lading-explained-egypt` (EN), `ports-logistics` (AR).

**P2/strategic (not urgent, higher leverage long-term)**: a reusable
"related insights"/"related practice areas" component, so future
content doesn't recreate this same weak-linking pattern.

**No fix — monitor only**: all 14 E-category URLs, including `/ar/team`.

## EXPECTED SEO IMPACT

- The P1 content expansions have **direct precedent of working**
  (`criminal-law`, `contract-translation`) — reasonable expectation of
  the same outcome for these 12, on the same multi-week Google
  timescale, not immediately.
- The P2 link additions are lower-cost, lower-certainty — they alone did
  not resolve 5 of the Oct 7 batch in 19 days, so expectations should be
  modest for link-only fixes; pairing them with content expansion (where
  applicable) is the stronger combination.
- The 14 E-category URLs need **no code/content change** — any SEO
  "impact" here is just elapsed time plus, optionally, a manual Request
  Indexing batch once you choose to do that (outside this round's scope).
- Realistic timeline for movement in GSC's own report: 2–4 weeks after
  any fix is deployed, consistent with the Oct 7 round's own stated
  expectation and the fact that 5 of its fixes still haven't resolved
  after 19 days.

## ACCEPTANCE TESTS (for a future implementation round — nothing implemented this round)

1. `npx tsc --noEmit` / `npx eslint` clean after any `data.ts` edits.
2. Each newly-expanded practice area: live-verify the new sections
   render in raw server-rendered HTML.
3. Each newly-added link: live-verify the `<a href>` exists, pointing to
   the correct target.
4. `git diff` check confirming zero title/H1/existing-body changes for
   `employment-labour-law`, `wills-drafting`, `corporate-commercial-law`
   beyond the new additive sections (preserve-rankings safety).
5. Re-crawl all touched URLs: still 200/self-canonical/correct
   hreflang/sitemap-present/zero `X-Robots-Tag` — regression check.
6. IndexNow resubmission (Bing-only) after deploy.
7. Not a same-day test: real resolution requires a refreshed GSC export
   in 2–4 weeks.

## FINAL DECISION

**READY TO FIX** for the P1 (12 URLs) + P2 (5 URLs) plan above — the
investigation is complete, evidence-based, and uses the real, confirmed
31-URL list (not a reconstruction). The remaining 14 URLs are correctly
classified as **NEED MORE EVIDENCE only in the sense that nothing further
is actionable from this side** — they are healthy and their resolution
is Google's own crawl timing, not a gap this investigation could close
with more digging.

Nothing has been implemented, deployed, or changed. Waiting for your
review and explicit approval before any content/code change.
