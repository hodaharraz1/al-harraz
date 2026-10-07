# GSC Indexing Recovery — P0

Date: 2026-10-07. See `MALFORMED_URL_ROOT_CAUSE.md` for the §1 malformed-URL
analysis (separate file per the brief). This document covers §2–§10.
Raw crawl evidence for every sitemap URL: `INTERNAL_LINK_CRAWL_EVIDENCE.tsv`.

## §2 — Duplicate canonical: `legal-considerations-real-estate-purchase-contracts`

**Audit performed:**
- HTTP status: 200. Confirmed live via `curl -I`.
- Declared canonical: self-referencing — `https://alharrazlaw.com/ar/insights/legal-considerations-real-estate-purchase-contracts` (verified in `INTERNAL_LINK_CRAWL_EVIDENCE.tsv`). **The canonical tag is correct and was never the bug** — `buildMetadata()` in `src/lib/seo.ts` always emits a self-referencing relative canonical for every locale, including this one.
- hreflang: correct — `ar` self, `en` alternate at the EN slug, `x-default` → `ar`.
- Old domain (`al-harraz.vercel.app`) and `www.alharrazlaw.com`: both 308-redirect cleanly to this exact canonical URL — not a source of duplication.
- Trailing-slash variant: 308s to the canonical (normal Next.js behavior).
- EN variant (`/en/insights/...`): 200, distinct content (translation, not a dupe of the AR page).

**Root cause: content cannibalization, not a tagging bug.** `src/seed/data.ts` contains three articles covering overlapping ground:

| Slug | Depth | Unique angle |
|---|---|---|
| `legal-considerations-real-estate-purchase-contracts` (flagged) | 4 short, generic paragraphs, no statute citations | "things to check in the purchase contract" — but every point it makes is a strict subset of the two below |
| `real-estate-registration-egypt` | Cites Law 114/1946, Civil Code 131/1948, Law 9/2022, the 37-day review window, required documents | why/how official registration works |
| `real-estate-buyer-legal-checklist-egypt` | 6-point practical checklist, most specific/actionable | pre-purchase checklist |

The flagged article was also an **orphan** — zero other pages linked to it — while the checklist article already linked twice to the registration article. Google's own duplicate-detection algorithm evidently decided the flagged page's content was redundant with one of the other two and is suppressing the declared canonical in favor of a different URL for overlapping queries. Per the brief, this page should **not** be canonicalized to another language or page (and wasn't) — the fix is to differentiate and cross-link, not retag.

**Fix applied** (`src/seed/data.ts`, picked up by `src/seed/seed.ts`'s article loop, which re-syncs `title`/`excerpt`/`body` on every run):
- Added contextual internal links between all three articles (previously a one-way link existed only from the checklist → registration article; now all three cross-link).
- This directly addresses the "orphan page, zero inbound links" factor. Genuinely rewriting the flagged article with new, distinct legal substance (e.g. a deep dive on specific contract clauses — penalty clauses, deposit handling, dispute-resolution clauses) was deliberately **not** attempted here: per this engagement's established anti-fabrication rule, new legal-fact content requires 2-source verification and lawyer review before publishing, which is outside the scope of a same-session SEO fix. **Recommendation**: if cross-linking alone doesn't resolve the duplicate-canonical flag within 2–4 weeks of re-crawl, the next step is genuinely expanding this article's unique angle (contract clause specifics) through the normal content pipeline, or formally retiring/merging it into the checklist article (301 the old slug) rather than leaving three overlapping pages competing.

**PASS/PARTIAL**: PARTIAL — canonical tag itself was already correct (PASS); content-overlap root cause is mitigated (cross-linking) but not fully eliminated (requires genuine content expansion or consolidation, flagged above).

## §3 — Crawled, currently not indexed (2 URLs)

### `/ar/practice-areas/criminal-law`
- Before: title + one-sentence `summary` + one-sentence `overview` only (~40 words of unique body text). Despite being `featured: true` and linked from the homepage's top-12 practice-area grid (`order: 10`) plus 2 existing articles, the page itself had almost no unique content for Google to index as distinct from the homepage teaser.
- **Fix**: added `whoWeHelp`, `legalIssuesCovered`, `howWeAssist` sections (`src/seed/data.ts`) — who the service is for, the misdemeanor/felony distinction with court-jurisdiction consequences, defendant's core rights (presumption of innocence, right to counsel, protection against self-incrimination), and how the firm assists end-to-end. Content reuses only facts already verified and published in the existing `rights-of-the-accused-in-criminal-cases` and `difference-between-misdemeanor-and-felony` articles (cross-linked to both) — no new unverified legal claims introduced.
- Also added two new inbound links: both of those articles' closing CTAs now link to this practice-area page (previously they only linked to the generic consultation page).

### `/en/practice-areas/contract-translation`
- Before: same one-sentence-overview thinness, **and** structurally weaker — `order: 22` puts it outside the homepage's top-12 teaser grid, and it had zero inbound links from any article or other practice area. A near-orphan page.
- **Fix**: added the same three content sections (who needs legal translation, document types covered, our review process) — service-description content, not fact-citing legal content, so no verification gate applies. Added a reciprocal link from the topically-adjacent `contracts-commercial-agreements` practice area page (`howWeAssist`), giving it its first inbound internal link from outside the practice-areas index.

**Both pages**: HTTP 200, self-canonical, indexable, in sitemap, correct hreflang (all confirmed in the full crawl — see §6/§7). Thinness and (for contract-translation) orphan status were the root cause, not technical indexability.

**PASS**: content depth and internal linking fixed for both; actual re-indexing outcome depends on Google's re-crawl (see §10 validation plan).

## §4 — Discovered, currently not indexed (35 URLs) — BLOCKED, needs input

**I do not have access to Google Search Console's UI or API from this environment**, and the task description provided only the aggregate count (35) plus category context, not the actual list of affected URLs. Classifying 35 specific URLs into P0/P1/P2/P3 without seeing which 35 they are would mean guessing — which the brief explicitly prohibits ("Do not declare resolved without evidence").

**What I need from you**: export the "Discovered – currently not indexed" table from GSC (Indexing → Pages → click that row → Export, CSV/Sheets) and share the list of URLs. Once I have it, I'll classify each against the P0–P3 scheme in the brief and apply the same treatment used for §3 (content depth + internal linking) to whichever ones warrant indexing, while leaving P3 legal-policy pages (privacy/terms) alone.

**What's already true, independent of the list**: every one of the 176 URLs actually in the sitemap today is 200, self-canonical, and indexable (full crawl, §6/§7) — so if any of the 35 are sitemap URLs, they are not blocked by a technical issue, only by crawl budget / content depth / internal-link signals, the same pattern found and fixed in §3. The newest content (the real-estate article cross-links and the 4 new practice-area content expansions in this session) should also help the overall domain's crawl signals.

## §5 — Important pages first / internal linking

Checked each page the brief names as priority:

| Page | Status | Internal links in |
|---|---|---|
| `/ar/about` | 200, in sitemap, linked from footer + nav | OK |
| `/ar/contact` | 200, in sitemap, linked from nav + CTAs sitewide | OK |
| `/ar/team` | 200, in sitemap, linked from footer + nav | OK |
| `/ar/team/mahmoud-mohamed-taha-harraz` | 200 (lawyer slug confirmed live) | linked from team index |
| `/ar/team/mostafa-mohamed-taha-harraz` | 200 | linked from team index |
| `civil-law`, `contracts`, `real-estate`, `compensation`, `enforcement`, `inheritance` practice areas | all 200, self-canonical | `civil-law` has the strongest internal-link profile sitewide (homepage `CivilFocus` section, order:1); the others are standard practice-area-grid links |

No privacy/terms page is prioritized over these in internal linking — they're footer-only links, same as before.

## §6 — Sitemap audit

Full re-check of the live sitemap (176 URLs, `src/app/(frontend)/sitemap.ts`):
- All 176 entries are 200, canonical, indexable, production URLs (own-domain, no `www`, no `http://`, no trailing slash, no query params) — see `INTERNAL_LINK_CRAWL_EVIDENCE.tsv`.
- No malformed, redirect, duplicate, old-domain, or variant URLs present. Nothing to remove.

**PASS.**

## §7 — Internal link crawl

Crawled all 176 sitemap URLs live and grepped every returned HTML document for `href="/https` / `href="/http:`.

**Result: zero matches across all 176 pages.** Full per-URL status + declared-canonical table: `INTERNAL_LINK_CRAWL_EVIDENCE.tsv`. (A handful of requests failed transiently on the first pass — a known, previously-documented sandbox-proxy flake in this environment, not a site defect — and were confirmed 200 on retry; the table reflects the retried values.)

**PASS — zero internal links containing `/https://` or `/http://`.**

## §8 — URL normalization

- `https://alharrazlaw.com` is enforced as the canonical host by `src/proxy.ts` (`ENFORCE_CANONICAL_HOST`, production-only guard).
- `http://alharrazlaw.com`, `https://www.alharrazlaw.com`, `http://www.alharrazlaw.com`, and the old `al-harraz.vercel.app` alias all 308-redirect in a single hop to the canonical host, path preserved (verified live for `www` and the old Vercel domain in §2's checks; the proxy logic is host-agnostic so all four physically-possible host variants resolve through the same code path).

**PASS.**

## §9 — Index requests

**I cannot submit GSC "Request Indexing" actions from this environment** — that requires interactive access to the Search Console UI (or the Indexing API with a verified service account, which isn't configured here). This has to be done manually.

**Recommended first batch** (do this after the fixes in this report are deployed and re-verified — see §10), in order:
1. `https://alharrazlaw.com/ar` (homepage)
2. `https://alharrazlaw.com/ar/about`
3. `https://alharrazlaw.com/ar/contact`
4. `https://alharrazlaw.com/ar/practice-areas/civil-law`
5. `https://alharrazlaw.com/ar/practice-areas/contracts-commercial-agreements`
6. `https://alharrazlaw.com/ar/practice-areas/real-estate-property-registration`
7. `https://alharrazlaw.com/ar/practice-areas/debt-recovery-enforcement`
8. `https://alharrazlaw.com/ar/practice-areas/inheritance-estates`
9. `https://alharrazlaw.com/ar/practice-areas/criminal-law` (this report's §3 fix)
10. `https://alharrazlaw.com/en/practice-areas/contract-translation` (this report's §3 fix)
11. `https://alharrazlaw.com/ar/insights/legal-considerations-real-estate-purchase-contracts` (this report's §2 fix)
12. `https://alharrazlaw.com/ar/insights/real-estate-registration-egypt`
13. `https://alharrazlaw.com/ar/insights/real-estate-buyer-legal-checklist-egypt`

Do not bulk-request the 35 "discovered" URLs — once you share that list (§4), I'll fold the genuinely P0/P1 ones into a second small prioritized batch instead.

## §10 — Validation plan

1. Deploy this branch (commit pending).
2. Re-run the IndexNow bulk submission (`NEXT_PUBLIC_SITE_URL=https://alharrazlaw.com npx tsx scripts/submit-all-to-indexnow.ts`) so Bing picks up the updated real-estate articles and the two expanded practice-area pages.
3. Re-verify live: the 2 §3 pages now render `whoWeHelp`/`legalIssuesCovered`/`howWeAssist`, and the 3 real-estate articles show the new cross-links.
4. You submit the §9 batch manually in GSC.
5. Monitor GSC's Pages report for 7–14 days: the malformed-URL "Page with redirect" count should age out on its own re-crawl (likely reclassifying as 404/Not Found); the duplicate-canonical flag and the 2 crawled-not-indexed pages should move toward "Indexed" if the content/linking fixes were sufficient — if not, see the §2 escalation recommendation (expand or consolidate) and share a refreshed GSC export so I can re-diagnose with real post-fix data rather than guessing.
