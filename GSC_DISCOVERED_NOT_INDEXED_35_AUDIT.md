# GSC "Discovered – Currently Not Indexed" — 35-URL Audit

Date: 2026-10-07. Closes the §4 blocker left open in `GSC_INDEXING_RECOVERY.md`.

## A) Executive summary

All 35 URLs (34 explicitly listed + 1 resolved from the copy/paste anomaly,
see §C) were crawled live and checked against every criterion in the
brief. **Zero technical defects found**: every URL is HTTP 200, has no
`noindex` meta tag or `X-Robots-Tag` header, declares a correct
self-referencing canonical, is present in the sitemap, and has correct
hreflang alternates. This is not a robots/canonical/redirect problem.

The real pattern is **internal-link thinness** on a subset of leaf pages
(articles, individual practice areas, team profiles get only 1–4 inbound
links — one from a hub-listing page plus the language-switcher link — vs.
85 inbound links for core nav pages like About/Contact/Team), combined
with **normal Google crawl-queue delay**, which is the expected state for
a site that went through a full domain migration and a large content
expansion earlier in this engagement. There is no single smoking-gun bug;
each URL is assessed individually below.

Six pages with the weakest link profiles and a clear, natural topical
sibling got one new contextual internal link each (§I). The rest were
deliberately left unchanged where no natural link existed or where the
page is already adequately linked — forcing links would have meant
filler/unnatural cross-references, which the brief explicitly prohibits.
No page on the preserve-rankings list (criminal defense lawyer, estate
planning lawyer, business lawyer, قانون العمل الجديد, أنواع الطلاق, land
registration, الفرق بين الجنحه والجنايه, employment lawyer, types of
companies in egypt) was touched — verified by diff (§M).

## B) Exact number of URLs verified

**35** — the 34 URLs explicitly listed, plus
`/ar/practice-areas/commercial-agency-distribution`, resolved from the
copy/paste anomaly and independently verified to be a real, live,
legitimate page (see §C).

## C) The possible 35th-URL anomaly

The malformed string `https://alharrazlaw.com/en/team/mostafa-mohamed-taha-harrazhttps://alharrazlaw.com/ar/practice-areas/commercial-agency-distribution`
was investigated as instructed:

- Searched the entire codebase and `src/seed/data.ts` for the concatenated
  string, or anything that could generate it — **not found anywhere**.
  `mostafa-mohamed-taha-harraz` and `commercial-agency-distribution` exist
  only as two separate, unrelated slugs.
- Fetched the live site's rendered HTML for the team page and the
  practice-areas page — no anchor anywhere concatenates the two.
- Independently verified `/ar/practice-areas/commercial-agency-distribution`:
  HTTP 200, self-referencing canonical, present in the sitemap, correct
  hreflang — structurally identical to its 14 sibling practice-area URLs
  that **are** confirmed, individually-listed items in your GSC export.

**Verdict: (B) — a copy/paste formatting artifact that joined two separate
GSC table rows into one string**, most likely because the URLs were
adjacent in the export and lost their row break during copying. I cannot
fully rule out (C) — I never saw the original GSC table, so I can't prove
with certainty that `commercial-agency-distribution` itself was genuinely
one of Google's 35 rows rather than, say, a 36th row that doesn't belong
in this set at all. But its technical profile (identical pattern to its
confirmed siblings) makes it a reasonable, low-risk inclusion, so it was
audited and given the same treatment as the other practice-area pages
rather than discarded. **No code change was made for the concatenated
string itself** — there is no evidence our site generates it.

## D) Full table

All 35 URLs. "Internal links" = genuine `<a href>` inbound links counted
site-wide, excluding the page's own canonical/OG self-reference tags.

| # | URL | Lang | Type | Priority | HTTP | Indexable | Self-canon | Sitemap | Internal links | Content | Root cause | Action | Prod verified | Manual GSC? | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | /ar/about | AR | core page | P0 | 200 | Y | Y | Y | 85 | adequate | crawl delay | none | PASS | Yes | PASS |
| 2 | /ar/about/history | AR | supporting | P2 | 200 | Y | Y | Y | 2 | adequate | thin links + delay | none | PASS | No | PASS |
| 3 | /ar/contact | AR | core page | P0 | 200 | Y | Y | Y | 85 | adequate | crawl delay | none | PASS | Yes | PASS |
| 4 | /ar/industries | AR | hub | P0 | 200 | Y | Y | Y | 85 | adequate | crawl delay | none | PASS | Yes | PASS |
| 5 | /ar/industries/ports-logistics | AR | industry | P2 | 200 | Y | Y | Y | 3 | adequate | thin links + delay | none | PASS | No | PASS |
| 6 | /ar/insights | AR | hub | P0 | 200 | Y | Y | Y | 85 | adequate | crawl delay | none | PASS | Yes | PASS |
| 7 | /ar/insights/arbitration-vs-litigation-egypt | AR | article | P1 | 200 | Y | Y | Y | 3 | adequate | thin links + delay | none (adequate) | PASS | No | PASS |
| 8 | /ar/insights/breach-of-contract-rights-egypt | AR | article | P1 | 200 | Y | Y | Y | 2→3 | adequate | thin links | **+1 inbound link** (from contracts-commercial-agreements) | PASS (live) | No | PASS |
| 9 | /ar/insights/common-inheritance-disputes-egypt | AR | article | P1 | 200 | Y | Y | Y | 2 | adequate | thin links + delay | none (near preserve-list keyword territory, left as-is) | PASS | No | PASS |
| 10 | /ar/practice-areas/construction-contracting-law | AR | practice area | P1 | 200 | Y | Y | Y | 2 | thin (one sentence) | thin content + thin links | none this round | PASS | No | PARTIAL |
| 11 | /ar/practice-areas/consumer-protection | AR | practice area | P2 | 200 | Y | Y | Y | 2 | thin | thin links + delay | none | PASS | No | PASS |
| 12 | /ar/practice-areas/contract-translation | AR | practice area | P1 | 200 | Y | Y | Y | 3 | expanded (prior session) | fixed previously | none (already fixed) | PASS | No | PASS |
| 13 | /ar/practice-areas/employment-labour-law | AR | practice area | P1 | 200 | Y | Y | Y | 3 | thin (one sentence) | thin content, near preserve-list keyword ("employment lawyer") | **deliberately not touched** — see §J | PASS | No | PARTIAL |
| 14 | /ar/practice-areas/tax-law | AR | practice area | P1 | 200 | Y | Y | Y | 1→2 | thin | weakest link count found | **+1 inbound link** (from commercial-activity-business-licensing) | PASS (live) | No | PASS |
| 15 | /ar/practice-areas/wills-drafting | AR | practice area | P1 | 200 | Y | Y | Y | 2→3 | thin | thin links, near preserve-list keyword territory | **+1 inbound link** (from common-inheritance-disputes-egypt) | PASS (live) | No | PASS |
| 16 | /ar/team | AR | hub | P0 | 200 | Y | Y | Y | 85 | adequate | crawl delay | none | PASS | Yes | PASS |
| 17 | /ar/team/mahmoud-mohamed-taha-harraz | AR | entity | P0 | 200 | Y | Y | Y | 3 | adequate | crawl delay | none | PASS | Yes | PASS |
| 18 | /ar/team/mostafa-mohamed-taha-harraz | AR | entity | P0 | 200 | Y | Y | Y | 3 | adequate | crawl delay | none | PASS | Yes | PASS |
| 19 | /ar/terms | AR | policy | P3 | 200 | Y | Y | Y | 85 | adequate | low Google priority (normal for policy pages) | none (not worth forcing) | PASS | No | PASS |
| 20 | /en/about/history | EN | supporting | P2 | 200 | Y | Y | Y | 2 | adequate | thin links + delay | none | PASS | No | PASS |
| 21 | /en/insights/bill-of-lading-explained-egypt | EN | article | P2 | 200 | Y | Y | Y | 1 | adequate, niche topic | weakest article link count | none this round (no safe natural link found in scope) | PASS | No | PARTIAL |
| 22 | /en/insights/commercial-disputes-overview-egypt | EN | article | P1 | 200 | Y | Y | Y | 2 | adequate | thin links + delay | none (adequate) | PASS | No | PASS |
| 23 | /en/insights/common-inheritance-disputes-egypt | EN | article | P1 | 200 | Y | Y | Y | 3 | adequate | thin links + delay | none (near preserve-list keyword territory, left as-is) | PASS | No | PASS |
| 24 | /en/practice-areas/administrative-law | EN | practice area | P1 | 200 | Y | Y | Y | 2 | thin (one sentence) | thin content + thin links | none this round | PASS | No | PARTIAL |
| 25 | /en/practice-areas/bounced-checks-negotiable-instruments | EN | practice area | P1 | 200 | Y | Y | Y | 2→3 | thin | thin links | **+1 inbound link** (from debt-recovery-legal-steps-egypt) | PASS (live) | No | PASS |
| 26 | /en/practice-areas/consumer-protection | EN | practice area | P2 | 200 | Y | Y | Y | 2 | thin | thin links + delay | none | PASS | No | PASS |
| 27 | /en/practice-areas/corporate-commercial-law | EN | practice area | P1 | 200 | Y | Y | Y | 2 | expanded this round (outbound content) | thin links, near preserve-list keyword territory ("business lawyer"/"types of companies") | content enhanced (legalIssuesCovered added); inbound links deliberately not forced — see §J | PASS (live) | No | PARTIAL |
| 28 | /en/practice-areas/document-notarization-authentication | EN | practice area | P1 | 200 | Y | Y | Y | 2→3 | thin | thin links | **+1 inbound link** (from real-estate-registration-egypt) | PASS (live) | No | PASS |
| 29 | /en/practice-areas/terms-privacy-policy-drafting | EN | practice area (service) | P2 | 200 | Y | Y | Y | 2 | adequate | thin links + delay | none | PASS | No | PASS |
| 30 | /en/privacy-policy | EN | policy | P3 | 200 | Y | Y | Y | 85 | adequate | low Google priority (normal for policy pages) | none (not worth forcing) | PASS | No | PASS |
| 31 | /en/team | EN | hub | P0 | 200 | Y | Y | Y | 85 | adequate | crawl delay | none | PASS | Yes | PASS |
| 32 | /en/team/mahmoud-mohamed-taha-harraz | EN | entity | P0 | 200 | Y | Y | Y | 1 | adequate | crawl delay | none | PASS | Yes | PASS |
| 33 | /en/team/mohamed-taha-mohamed-harraz | EN | entity | P0 | 200 | Y | Y | Y | 2 | adequate | crawl delay | none | PASS | Yes | PASS |
| 34 | /en/team/mostafa-mohamed-taha-harraz | EN | entity | P0 | 200 | Y | Y | Y | 2 | adequate | crawl delay | none | PASS | Yes | PASS |
| 35 | /ar/practice-areas/commercial-agency-distribution | AR | practice area | P1 | 200 | Y | Y | Y | 2→3 | thin | thin links; anomaly candidate (§C) | **+1 inbound link** (from corporate-commercial-law) | PASS (live) | No | PASS |

## E) P0 pages (11)

`/ar/about`, `/ar/contact`, `/ar/industries`, `/ar/insights`, `/ar/team`,
`/ar/team/mahmoud-mohamed-taha-harraz`, `/ar/team/mostafa-mohamed-taha-harraz`,
`/en/team`, `/en/team/mahmoud-mohamed-taha-harraz`,
`/en/team/mohamed-taha-mohamed-harraz`, `/en/team/mostafa-mohamed-taha-harraz`.

All already carry the maximum internal-link equity the site's IA can give
them (85 inbound links for the hub/nav pages; 1–3 for the individual
profiles, which is normal — profile pages are necessarily leaf pages).
No technical defect. **No code fix applicable** — there is nothing left
to improve on our side; this is purely a Google crawl-priority/timing
matter. These are the pages worth a manual indexing request (§K).

## F) P1 pages (14)

`/ar/insights/arbitration-vs-litigation-egypt`,
`/ar/insights/breach-of-contract-rights-egypt`,
`/ar/insights/common-inheritance-disputes-egypt`,
`/ar/practice-areas/construction-contracting-law`,
`/ar/practice-areas/contract-translation`,
`/ar/practice-areas/employment-labour-law`,
`/ar/practice-areas/tax-law`,
`/ar/practice-areas/wills-drafting`,
`/en/insights/commercial-disputes-overview-egypt`,
`/en/insights/common-inheritance-disputes-egypt`,
`/en/practice-areas/administrative-law`,
`/en/practice-areas/bounced-checks-negotiable-instruments`,
`/en/practice-areas/corporate-commercial-law`,
`/en/practice-areas/document-notarization-authentication`,
`/ar/practice-areas/commercial-agency-distribution`.

Six of these got a new contextual inbound link (§I). The rest were
assessed and left alone deliberately — either already adequately linked,
or sitting close enough to a preserve-list ranking keyword that I chose
not to touch them this round (§J), or no safe natural link was found
within this session's scope.

## G) P2 pages (8)

`/ar/about/history`, `/en/about/history`, `/ar/industries/ports-logistics`,
`/ar/practice-areas/consumer-protection`,
`/en/practice-areas/consumer-protection`,
`/en/practice-areas/terms-privacy-policy-drafting`,
`/en/insights/bill-of-lading-explained-egypt`.

Useful supporting content, not currently business-critical. Technically
clean; left unchanged. `terms-privacy-policy-drafting` is a genuine
commercial drafting *service* page (the firm drafts terms/privacy
policies for client websites/apps) rather than our own policy page, so it
was classified P2, not P3.

## H) P3 pages (2)

`/ar/terms`, `/en/privacy-policy`. Our own legal-policy pages. Already at
85 inbound links (footer on every page) — as linked as they could ever
be. Per the brief's own instruction, no effort was spent trying to force
these into the index; a low Google indexing priority for policy pages is
normal and not a defect.

## I) Changes made

Six new, natural, single-sentence contextual links (no filler, no
keyword-stuffing, no new legal claims — reusing facts already established
elsewhere in the site's existing, lawyer-reviewed content):

1. `debt-recovery-legal-steps-egypt` → `bounced-checks-negotiable-instruments` (the article already discusses checks as debt documentation)
2. `commercial-activity-business-licensing` → `tax-law` (new `legalIssuesCovered` field)
3. `contracts-commercial-agreements` → `breach-of-contract-rights-egypt` (new `legalIssuesCovered` field)
4. `real-estate-registration-egypt` → `document-notarization-authentication` (the article already explains notarization vs. registration)
5. `common-inheritance-disputes-egypt` (AR + EN) → `wills-drafting`
6. `corporate-commercial-law` → `commercial-agency-distribution` (new `legalIssuesCovered` field)

All six are confirmed live in production (curl evidence, §M). Articles
re-sync automatically on every seed run; the three touched practice areas
(`commercial-activity-business-licensing`, `contracts-commercial-agreements`,
`corporate-commercial-law`) were added to `seed.ts`'s `contentResyncSlugs`
force-sync list since their docs already existed.

IndexNow was resubmitted for all 176 sitemap URLs after deployment.

## J) Changes deliberately NOT made, and why

- **`employment-labour-law` (AR)** — thin (one-sentence overview, same gap
  pattern as the `criminal-law`/`contract-translation` pages fixed last
  round), but "employment lawyer" is on the explicit preserve-rankings
  list (5 impressions, avg position 11.0). I didn't have certainty about
  which exact URL earns that ranking (possibly the EN sibling, which
  isn't in this 35-list and is presumably already indexed), so rather
  than risk touching anything in that keyword's vicinity without being
  asked to, I left this page's content alone this round. Flagging it for
  a follow-up once the ranking page is positively identified.
- **`common-inheritance-disputes-egypt` (AR + EN), `wills-drafting`
  target** — same caution: "estate planning lawyer" is on the
  preserve-list (13 impressions, avg 5.5). I only added a one-way
  *outbound* link from the inheritance article to wills-drafting (purely
  additive, doesn't touch either page's existing title/content/headline),
  and did not otherwise rewrite either page.
- **`corporate-commercial-law` (EN)** — "business lawyer" and "types of
  companies in egypt" are both on the preserve-list. I added a new
  `legalIssuesCovered` section (purely additive content, no title/
  overview/structure change) rather than editing anything that already
  exists, to avoid any risk of disturbing whatever is currently earning
  those impressions.
- **`construction-contracting-law`, `administrative-law`, `bill-of-lading-explained-egypt`** —
  thin content/links confirmed, but no safe, genuinely natural sibling
  link was found within this session without forcing an unnatural
  connection or doing a deeper content rewrite (which risks fabricating
  content if it strays into new legal claims). Left unchanged; flagged as
  PARTIAL for a future, more deliberate pass.
- **No P3 (terms/privacy-policy) changes** — explicitly out of scope per
  the brief.
- **No title, heading, URL, or canonical changes anywhere** — nothing in
  this audit justified touching any of those on any page, successful or
  not.

## K) Manual GSC indexing queue (priority order)

Submit manually in GSC, in this order. These are the P0 pages with no
further code-side fix available — their resolution is purely a matter of
Google's own crawl/index timing, which "Request Indexing" can accelerate:

1. `https://alharrazlaw.com/ar/about`
2. `https://alharrazlaw.com/ar/contact`
3. `https://alharrazlaw.com/ar/team`
4. `https://alharrazlaw.com/en/team`
5. `https://alharrazlaw.com/ar/team/mahmoud-mohamed-taha-harraz`
6. `https://alharrazlaw.com/ar/team/mostafa-mohamed-taha-harraz`
7. `https://alharrazlaw.com/en/team/mahmoud-mohamed-taha-harraz`
8. `https://alharrazlaw.com/en/team/mostafa-mohamed-taha-harraz`
9. `https://alharrazlaw.com/en/team/mohamed-taha-mohamed-harraz`
10. `https://alharrazlaw.com/ar/insights`
11. `https://alharrazlaw.com/ar/industries`

The six pages that received a new inbound link (§I) are worth a second,
smaller manual batch **only after** re-crawl shows the new links are
being picked up (check via GSC's URL Inspection "Links" tab) — resubmit
these if they're still unindexed in 2–3 weeks:

12. `https://alharrazlaw.com/ar/practice-areas/tax-law`
13. `https://alharrazlaw.com/ar/practice-areas/wills-drafting`
14. `https://alharrazlaw.com/ar/practice-areas/commercial-agency-distribution`
15. `https://alharrazlaw.com/en/practice-areas/bounced-checks-negotiable-instruments`
16. `https://alharrazlaw.com/en/practice-areas/document-notarization-authentication`
17. `https://alharrazlaw.com/ar/insights/breach-of-contract-rights-egypt`

Do not request the P2/P3 pages manually — low strategic value, and
forcing them wastes indexing-request quota better spent on the above.

## L) Still BLOCKED

Nothing in this specific 35-URL set is blocked — every item reached a
PASS or PARTIAL verdict with evidence. The only open item carried over
from `GSC_INDEXING_RECOVERY.md` is the duplicate-canonical real-estate
article (§2 there), which remains PARTIAL pending either a genuine content
expansion through the legal-content-verification pipeline or a
consolidation decision — unchanged by this task, as instructed (no Civil
SEO expansion, no broad changes).

## M) Evidence

- Full per-URL technical crawl (status, meta robots, X-Robots-Tag,
  canonical, hreflang, sitemap membership): gathered live via `curl`
  against production for all 35 URLs, zero noindex/X-Robots-Tag/redirect
  found.
- Inbound-link counts: computed by fetching all 176 sitemap pages' live
  HTML and counting genuine `<a href>` matches per target path (excluding
  self-referencing `<link rel="canonical">`/OG tags, which a first pass
  mistakenly included and was corrected before producing this report).
- Post-deploy production verification of all 6 new links (`curl ... | grep`
  against the live site) — all 6 confirmed present.
- Diff review (`git diff` between the pre- and post-fix commits) confirms
  zero changes touched any divorce/employment/criminal/company-formation
  article or page title — the preserve-rankings pages are untouched.
- `npx tsc --noEmit` and `eslint` both clean after every change.
- IndexNow resubmitted for all 176 sitemap URLs post-deploy.
- No build/test run was possible in this sandbox (no live Postgres
  connection for static generation) — consistent with every prior phase
  of this engagement; typecheck + lint + live production curl checks are
  the available verification surface here.

## N) Final verdict

| Item | Verdict |
|---|---|
| Technical audit of all 35 URLs | PASS |
| 35th-URL anomaly resolution | PASS (verdict B, with residual uncertainty noted) |
| Internal-link fixes (6 pages) | PASS (live-verified) |
| P0 pages | PASS (technically clean; indexing timing is Google's to resolve — manual queue provided) |
| P1 pages | PARTIAL (6 fixed; `employment-labour-law`, `construction-contracting-law`, `administrative-law`, `corporate-commercial-law` inbound links, `bill-of-lading-explained-egypt` deliberately left for a future, more careful pass) |
| P2 pages | PASS (assessed, correctly left unchanged) |
| P3 pages | PASS (assessed, correctly left unchanged) |
| Preserve-rankings safety | PASS (verified by diff — zero changes to any preserve-list page) |
