# Old Vercel Domain / Canonical Audit

Date: 2026-10-12. Triggered by GSC reporting 12 URLs under "Duplicate,
Google chose different canonical than user," with the example given
(`/ar/about`) showing Google selecting `https://al-harraz.vercel.app/ar/about`
over the user-declared `https://alharrazlaw.com/ar/about`.

**Headline finding: the preferred fix (a host-based permanent redirect
from `al-harraz.vercel.app` to `alharrazlaw.com`, preserving path) was
already implemented and deployed on 2026-09-28 — commit `8bf7ec8`, two
weeks before this audit — and is verified live and working correctly for
all 12 affected URLs below. This was not a previously-undiscovered defect
needing a new fix; it is a Google-side reprocessing lag on top of a fix
that predates this audit.** One small, genuinely-live, in-scope issue was
found and fixed during this audit: `public/llms.txt` still hardcoded 7
links to the old domain. See §D–F.

## A. Confirmed root cause

Google's indexing pipeline evaluates canonical signals as of its last
crawl/reprocessing of each URL, not in real time. `al-harraz.vercel.app`
was the site's only live hostname before the custom-domain cutover and
host-redirect were added (2026-09-28). Google had indexed/crawled pages
under that hostname before that date and, per standard behavior, can
continue treating a previously-indexed URL as the chosen canonical for
some time after the site technically changes — until Google recrawls that
specific URL (on both hosts) and reprocesses the canonical cluster. The
12 flagged URLs are consistent with this: a pre-existing crawl history on
the old host that Google has not yet reconciled with the current,
correctly-redirecting, correctly-self-canonical state. This is a
reprocessing-lag issue, not a live misconfiguration — confirmed by direct
verification below, not assumed.

## B. Current behavior of the old hostname

Tested directly, this session, against the live `al-harraz.vercel.app`
host — not assumed from documentation:

| Path | Result |
|---|---|
| `/` | `308` → `https://alharrazlaw.com/` → (app-level locale redirect) → `https://alharrazlaw.com/ar` → `200` |
| `/ar/about` | `308` → `https://alharrazlaw.com/ar/about` → `200` |
| `/en/about` | `308` → `https://alharrazlaw.com/en/about` → `200` |
| `/ar/contact` | `308` → `https://alharrazlaw.com/ar/contact` → `200` |
| `/en/insights` | `308` → `https://alharrazlaw.com/en/insights` → `200` |
| `/en/practice-areas/employment-labour-law` | `308` → `https://alharrazlaw.com/en/practice-areas/employment-labour-law` → `200` |

This is category **B (redirects)**, specifically a path-preserving
permanent (308) redirect — not A (duplicate 200 content), not C (404),
and it does not vary by route (checked all 12 GSC-flagged URLs below; all
behave identically). The redirect response itself carries this app's own
CSP/security headers and `x-powered-by: Next.js, Payload`, confirming it
is issued by the application's own middleware (`src/proxy.ts`, renamed
from `middleware.ts` per Next.js 16's convention — see `AGENTS.md`), not
a separate platform-level redirect rule that could drift out of sync with
the app.

## C. Why Google could still select the old domain despite a correct redirect

Three real, verified facts combine to explain this without requiring any
canonical tag to be wrong:
1. The redirect is **permanent (308)**, which Google does eventually
   consolidate on, but "eventually" is not instant — Google's own
   documentation describes canonical reprocessing as happening over the
   course of a normal recrawl cycle, not synchronously with a site change.
2. The redirect has only existed for about two weeks (since 2026-09-28)
   relative to this audit (2026-10-12) — short relative to Google's
   typical reprocessing cadence for a lower-crawl-frequency site.
3. GSC's Page Indexing report itself is not live — it reflects Google's
   last analysis of each URL, which can lag real crawl/indexing state by
   days to weeks even after Google has recrawled.

None of this means the canonical tags were ever wrong; it means Google's
report hadn't caught up yet. Confirmed directly (§I) that every one of
the 12 URLs' canonical/hreflang/OpenGraph tags on `alharrazlaw.com` are
correct right now.

## D. Repository references found

Searched the entire repository (code, config, and public static files —
not just documentation) for `al-harraz.vercel.app`:

- **`src/proxy.ts`** — only in a code *comment* explaining the redirect's
  purpose; never emitted as a URL value. Not an issue.
- **`public/llms.txt`** — a real, live, served static file
  (`https://alharrazlaw.com/llms.txt`) that hardcoded **7** links
  (practice-areas, industries, insights, team, about, contact, and the
  sitemap reference) to `al-harraz.vercel.app` instead of
  `alharrazlaw.com`. This predates the custom-domain cutover (added
  2026-09-28, commit `8dbce9c`, as a hand-authored file, never updated
  for the domain). **This is a genuine issue** — fixed during this audit,
  see §E–F. It is not a signal Google's indexing/canonical-selection
  pipeline reads (llms.txt is for LLM/AI crawlers, not a ranking or
  canonical signal), but it was still a real, live, wrong reference to
  the old domain on production, and the task asked for a complete audit
  of production output, not only signals Google's algorithm uses.
- Every other `.md` file matching (`GSC_INDEXING_RECOVERY.md`,
  `FINAL_DOMAIN_MIGRATION_REPORT.md`, `OLD_DOMAIN_MIGRATION.md`,
  `REDIRECT_TEST_REPORT.md`, `DOMAIN_MIGRATION_PLAN.md`, `DEPLOYMENT.md`,
  `PROJECT_HANDOFF.md`, etc.) is historical/process documentation, not
  served to the public or read by any crawler — left untouched per the
  "preserve everything else" instruction.

**Every live markup/data surface audited was already clean before this
session's one fix:**

| Surface | Source of truth | Finding |
|---|---|---|
| `metadataBase` (Next.js Metadata API) | `new URL(siteConfig.siteUrl)` — `src/app/(frontend)/[locale]/layout.tsx:32` | Clean |
| Canonical / `alternates.languages` (every page) | `buildMetadata()` — `src/lib/seo.ts`, resolved against `metadataBase` | Clean — confirmed live on all 12 URLs (§I) |
| `x-default` hreflang | `src/lib/seo.ts:33` and `layout.tsx:40` | Points to `/ar` version — present and correct on every page tested |
| OpenGraph `url` | `src/lib/seo.ts:40`, resolved against `metadataBase` | Clean |
| JSON-LD (`Organization`/`WebSite`/`BreadcrumbList`/`Article`) | `src/lib/structured-data.ts` — exclusively `siteConfig.siteUrl` | Clean, zero hardcoded hosts |
| `sitemap.xml` | `src/app/(frontend)/sitemap.ts` — exclusively `siteConfig.siteUrl` | Clean — live-fetched this session, 182 URLs, zero `vercel` matches |
| `robots.txt` | static route pointing at `siteConfig.siteUrl`-derived sitemap URL | Clean — live-fetched, `Sitemap: https://alharrazlaw.com/sitemap.xml` |
| `metadataBase`/`siteUrl` constants | `NEXT_PUBLIC_SITE_URL` env var, single source, read in `src/lib/site-config.ts`, `payload.config.ts` (`serverURL`), `src/proxy.ts` (`CANONICAL_HOST`) | One single source of truth across the whole app — no second hardcoded value anywhere to drift out of sync |
| Internal `<a>`/`<Link>` hrefs across `src/components`, `src/app` | n/a | Zero matches for `vercel.app` |
| Payload CMS content (`src/seed/data.ts`, the single content source) | n/a | Zero matches for `vercel` |
| Redirect configuration | `next.config.ts` has no `redirects()`/`rewrites()` at all; the only redirect logic is `src/proxy.ts` | No conflicting or duplicate redirect rule to cause a loop or double-hop |
| Vercel configuration (`vercel.json`) | Only defines a cron job (`/api/cron/backup`) | No domain/redirect rules here that could conflict with `proxy.ts` |
| Environment variables | `NEXT_PUBLIC_SITE_URL`, `VERCEL_ENV` | Both used correctly and exclusively for this purpose; no third variable holding a stale domain |

One **dead field** worth noting, not fixed because it is not live/active
and fixing it is outside this task's scope: `src/collections/fields/seo.ts`
defines a `canonicalOverride` text field on the CMS `seo` group (attached
to Articles, PracticeAreas, Industries, Lawyers, Pages), described as
"only set for pagination/near-duplicate edge cases." **No page template
anywhere in the codebase reads this field** (confirmed by grep — it only
appears in its own field definition) — only `metaTitle`/`metaDescription`/
`noindex` from that same group are actually read (e.g.
`src/app/(frontend)/[locale]/insights/[slug]/page.tsx:40`). It has zero
effect on any rendered canonical tag today, however it is set in the CMS.
Flagging this as a latent inconsistency (an editable field that silently
does nothing) for a future cleanup — not touched here, since touching it
isn't required for this host/canonical fix and could be seen as scope
creep into CMS schema changes.

## E. Exact fix implemented (this session)

One fix, strictly in scope:

- **`public/llms.txt`**: replaced all 7 occurrences of
  `al-harraz.vercel.app` with `alharrazlaw.com` (plain string
  replacement, no other content changed). Committed (`5b52f63`), pushed,
  deployed, and re-verified live:
  `curl https://alharrazlaw.com/llms.txt` now shows 7 `alharrazlaw.com`
  links and zero `vercel` matches.

**No other fix was needed.** The host-based permanent redirect the task
asked for as the "preferred fix" (§4 of the request) already exists,
already matches every stated requirement, and was independently
re-verified end-to-end this session (§B, §H, §L) rather than assumed from
its own commit history.

## F. Files changed

- `public/llms.txt` — 7 string replacements (committed `5b52f63`).

Nothing else was touched: `src/proxy.ts`, `next.config.ts`, `vercel.json`,
`src/lib/seo.ts`, `src/lib/structured-data.ts`,
`src/app/(frontend)/sitemap.ts`, `src/seed/data.ts`, `src/seed/seed.ts`,
`src/seed/publish-civil-phase-2.ts`, every practice-area/article page
template, and the homepage were all read for this audit but none required
or received any change.

## G. Redirect implementation (already live, re-verified not re-built)

`src/proxy.ts` (Next.js 16's `proxy.ts`, the renamed `middleware.ts`):

```ts
const CANONICAL_HOST = new URL(siteConfig.siteUrl).host
const ENFORCE_CANONICAL_HOST = process.env['VERCEL_ENV'] === 'production'
...
const requestHost = request.headers.get('host')
if (ENFORCE_CANONICAL_HOST && requestHost && requestHost !== CANONICAL_HOST) {
  const canonicalUrl = request.nextUrl.clone()
  canonicalUrl.protocol = 'https'
  canonicalUrl.host = CANONICAL_HOST
  canonicalUrl.port = ''
  return NextResponse.redirect(canonicalUrl, 308)
}
```

- **Host-matched only**: triggers only when the incoming `Host` header
  differs from `CANONICAL_HOST` (derived from `siteConfig.siteUrl`, i.e.
  `alharrazlaw.com`). A request already on `alharrazlaw.com` never
  matches this condition — confirmed empirically (§B, §I: every
  `alharrazlaw.com` request returned `200` directly, never a `308`), so
  there is no redirect loop.
- **Path and query preserved**: `request.nextUrl.clone()` carries the
  full pathname and search params; only `protocol`/`host`/`port` are
  overwritten. Verified directly — every one of the 12 test paths
  redirected to the *identical* path on the new host (§H), not to the
  homepage.
- **308 (permanent)**, appropriate for a permanent domain migration.
- **www alias covered by the same logic** (tested this session:
  `https://www.alharrazlaw.com/ar/about` → `308` →
  `https://alharrazlaw.com/ar/about`), since `www.alharrazlaw.com` is
  just another `Host` value that doesn't match `CANONICAL_HOST`.
- **Guarded to `VERCEL_ENV === 'production'`** specifically so Vercel
  preview deployments and local dev (each with their own legitimately
  different host) are never caught by this redirect.

## H. Redirect tests (this session, live)

All 12 GSC-flagged URLs tested directly against `al-harraz.vercel.app`,
single-hop (no `-L`), this session:

| Old URL (path) | HTTP status | Location header |
|---|---|---|
| `/ar/contact` | 308 | `https://alharrazlaw.com/ar/contact` |
| `/ar/about` | 308 | `https://alharrazlaw.com/ar/about` |
| `/ar/insights/how-civil-judgments-are-enforced` | 308 | `https://alharrazlaw.com/ar/insights/how-civil-judgments-are-enforced` |
| `/en/industries/import-export` | 308 | `https://alharrazlaw.com/en/industries/import-export` |
| `/en/practice-areas/employment-labour-law` | 308 | `https://alharrazlaw.com/en/practice-areas/employment-labour-law` |
| `/en/about` | 308 | `https://alharrazlaw.com/en/about` |
| `/en/practice-areas/ngo-foundation-registration` | 308 | `https://alharrazlaw.com/en/practice-areas/ngo-foundation-registration` |
| `/en/practice-areas/arbitration` | 308 | `https://alharrazlaw.com/en/practice-areas/arbitration` |
| `/en/practice-areas/commercial-activity-business-licensing` | 308 | `https://alharrazlaw.com/en/practice-areas/commercial-activity-business-licensing` |
| `/ar/practice-areas/competition-law` | 308 | `https://alharrazlaw.com/ar/practice-areas/competition-law` |
| `/en/insights` | 308 | `https://alharrazlaw.com/en/insights` |
| `/en/practice-areas/banking-finance-law` | 308 | `https://alharrazlaw.com/en/practice-areas/banking-finance-law` |

12/12: correct status, correct path-preserving `Location`, zero
homepage-only redirects, zero exceptions.

## I. Canonical tests (this session, live)

Same 12 URLs, fetched directly on `alharrazlaw.com`:

| URL (path) | HTTP | Canonical tag | Robots |
|---|---|---|---|
| `/ar/contact` | 200 | self | index, follow |
| `/ar/about` | 200 | self | index, follow |
| `/ar/insights/how-civil-judgments-are-enforced` | 200 | self | index, follow |
| `/en/industries/import-export` | 200 | self | index, follow |
| `/en/practice-areas/employment-labour-law` | 200 | self | index, follow |
| `/en/about` | 200 | self | index, follow |
| `/en/practice-areas/ngo-foundation-registration` | 200 | self | index, follow |
| `/en/practice-areas/arbitration` | 200 | self | index, follow |
| `/en/practice-areas/commercial-activity-business-licensing` | 200 | self | index, follow |
| `/ar/practice-areas/competition-law` | 200 | self | index, follow |
| `/en/insights` | 200 | self | index, follow |
| `/en/practice-areas/banking-finance-law` | 200 | self | index, follow |

12/12 self-canonical, 12/12 indexable, zero `vercel` string matches in
any of the 12 pages' HTML, zero `X-Robots-Tag` response header on any of
them (no noindex at the header level either).

## J. Hreflang tests

All 12 pages carry exactly 3 `<link rel="alternate">` tags (`ar`, `en`,
`x-default`), each resolving to `alharrazlaw.com`. Example (`/ar/about`):

```html
<link rel="canonical" href="https://alharrazlaw.com/ar/about"/>
<link rel="alternate" hrefLang="ar" href="https://alharrazlaw.com/ar/about"/>
<link rel="alternate" hrefLang="en" href="https://alharrazlaw.com/en/about"/>
<link rel="alternate" hrefLang="x-default" href="https://alharrazlaw.com/ar/about"/>
<meta property="og:url" content="https://alharrazlaw.com/ar/about"/>
```

`x-default` consistently points to the Arabic version, matching the
site's Arabic-first design (`src/proxy.ts`'s own locale-redirect default).

## K. Sitemap result

Live-fetched `https://alharrazlaw.com/sitemap.xml` this session: **182
URLs** (`<loc>` count), **zero** `vercel` string matches anywhere in the
file. (182 also confirms the Civil Law Phase 2 articles — `rental-
tenancy-disputes-egypt`, `co-ownership-partition-egypt`,
`civil-vs-criminal-cases-egypt` — are now live in production, 6 sitemap
references each counting `<loc>` + hreflang `<xhtml:link>` entries,
consistent with the 176→182 increase expected from that separate,
already-reported publication.) No regeneration was needed or performed —
`src/app/(frontend)/sitemap.ts` already builds every URL exclusively from
`siteConfig.siteUrl`.

## L. All 12 affected URLs — consolidated check

Every one of the 12 URLs GSC flagged:
- ✅ Returns `200` on `alharrazlaw.com` with a correct self-referencing
  canonical tag, correct hreflang set, `index, follow`, zero old-domain
  references in its markup.
- ✅ Its corresponding `al-harraz.vercel.app` URL returns a `308`
  permanent redirect to the exact same path on `alharrazlaw.com`, which
  itself resolves to `200`.

See §H and §I for the full per-URL tables.

## M. Remaining Google-side waiting period

None of the above is instantaneous on Google's side. Expect:
- Google to recrawl `al-harraz.vercel.app` URLs and observe the 308 (this
  can take anywhere from days to several weeks depending on that URL's
  crawl frequency — these are lower-priority URLs for Googlebot, being a
  redirect target rather than canonical content).
- The Page Indexing report's "Duplicate, Google chose different
  canonical" count to decrease only after Google reprocesses each
  affected URL's canonical cluster, not immediately after a "Validate
  Fix" click or a new deploy.
- No specific guaranteed timeline — Search Console's own guidance is that
  validation runs over roughly two weeks and can take longer; this audit
  does not shorten that.

## N. Is it now safe to click GSC "Validate Fix"?

**Yes, safe to click — but clicking it does not make the issue resolved,
and nothing about this audit should be read as claiming it is.**

**TECHNICAL FIX VERIFIED**: the host-based permanent redirect
(`al-harraz.vercel.app/* → https://alharrazlaw.com/:path`, 308, path- and
query-preserving) is live, correctly implemented, and has been
independently re-verified end-to-end this session against all 12
GSC-flagged URLs plus the homepage and the `www` alias. The one
genuinely-live old-domain reference found (`public/llms.txt`) has been
fixed and deployed. Every canonical/hreflang/OpenGraph/JSON-LD/sitemap/
robots.txt signal on the real domain is correct right now.

**GOOGLE REPROCESSING PENDING**: Google's Search Console report still
reflects pre-reprocessing data as of when GSC generated it. Clicking
"Validate Fix" starts Google's own recrawl/reprocessing of the flagged
URLs — it is the correct next action, and it is safe (it does not change
anything on the site, only tells Google to re-check it) — but the issue
should be considered **GOOGLE REPROCESSING PENDING**, not resolved, until
GSC's own report shows the 12-URL count drop after that reprocessing
completes. I have not clicked it myself — that is a Search Console
account action for the firm owner, not something this session has access
to or should do unprompted.
