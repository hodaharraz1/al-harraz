# Old Vercel Domain — Root Cause Investigation (Round 2)

Date: 2026-10-26. **Investigation only — no deploy, no production change, no
URL deletion, no Search Console Validation was performed, per explicit
instruction.** Triggered by fresh GSC evidence for
`https://alharrazlaw.com/ar/contact`: user-declared canonical = itself,
Google-selected canonical = `https://al-harraz.vercel.app/ar/contact`,
crawl allowed = Yes, fetch = Successful, indexing allowed = Yes, last
crawl = 2026-10-23 — i.e. Google recently recrawled the *real* page,
confirmed it's healthy, and still did not switch its canonical choice.
This round re-investigates with that specific new fact in mind, rather
than assuming the prior "just wait" conclusion still fully holds.

## Investigation scope note (read first)

Two of the ten requested checks (§5 "other Vercel domains/aliases/preview
deployments" and §6 "Vercel project settings — Domains, Production
Domain, Redirects, aliases, Deployment Protection, headers") require
either the Vercel dashboard or an authenticated Vercel API token. **I do
not have either**, and per this session's own established boundary I did
not request, accept, or use one (an account-scoped token was offered
earlier in this conversation and declined for the same reason: a token
pasted into chat becomes a standing, hard-to-revoke secret in the
transcript, and is a different trust boundary than you running commands
on your own machine). Everything below that *can* be verified from the
outside (HTTP behavior, DNS, TLS, repository source, public search
indexes, the Wayback Machine) was verified directly, live, this session —
not assumed. Where dashboard-only information would change the
conclusion, that is flagged explicitly as an open item for you to check
yourself (read-only, no setting changes), with exact click paths.

## 1–2. Is `al-harraz.vercel.app` still public, and do the same pages return 200?

**Public: yes. Returns 200 on the same page: no — it 308-redirects.**
Tested fresh, live, this session (not reused from the prior audit):

| Path | Result |
|---|---|
| `/ar/contact` (default User-Agent) | `308` → `https://alharrazlaw.com/ar/contact` |
| `/ar/contact` (User-Agent spoofed to `Googlebot/2.1`) | **identical** `308` → `https://alharrazlaw.com/ar/contact` — no cloaking, no UA-based difference |
| `/` | `308` → `https://alharrazlaw.com/` |
| `/en/insights/rental-tenancy-disputes-egypt` (a page created *after* the Sept 28 redirect fix, to rule out "only old pages redirect") | `308` → correct path on `alharrazlaw.com` |

The redirect response carries `cache-control: public, max-age=0,
must-revalidate` and is computed by the application itself (same CSP
headers as the real site, `x-powered-by: Next.js, Payload`) — confirmed
freshly computed per request, not a stale cached response.

## 3. What canonical does `al-harraz.vercel.app` itself declare?

**N/A for page paths — they never render a canonical tag because they
redirect at the HTTP layer (308) before any HTML, including any
canonical tag, is produced.** There is no page content to carry a
self-canonical or any other canonical on that host.

## 4. Sitemap / robots / metadata / internal links on the Vercel host — **real finding here**

This is where this round found something the first audit did not test
specifically: **`src/proxy.ts`'s own `PUBLIC_FILE` check runs *before*
the host-redirect check**, and explicitly exempts any path ending in a
file extension from the redirect:

```ts
// src/proxy.ts
const PUBLIC_FILE = /\.[^/]+$/
...
if (
  pathname.startsWith('/admin') ||
  pathname.startsWith('/api') ||
  pathname.startsWith('/_next') ||
  PUBLIC_FILE.test(pathname)          // <-- robots.txt, sitemap.xml, llms.txt, images all match this
) {
  return NextResponse.next()           // <-- served directly, host check below never runs
}

const requestHost = request.headers.get('host')
if (ENFORCE_CANONICAL_HOST && requestHost && requestHost !== CANONICAL_HOST) {
  ... // the 308 redirect — never reached for the paths above
}
```

Verified live, this session:

| Path on `al-harraz.vercel.app` | Result |
|---|---|
| `/robots.txt` | **200**, served from Vercel's edge cache (`x-vercel-cache: HIT`, `age: 906601`s ≈ 10.5 days old), content: `Allow: /` ... `Sitemap: https://alharrazlaw.com/sitemap.xml` |
| `/sitemap.xml` | **200**, edge-cached (`age: 883508`s ≈ 10.2 days), 65,777 bytes, content verified to list **only** `alharrazlaw.com` URLs (zero `vercel` string matches in the body) |
| `/llms.txt` | **200**, same pattern |
| `/favicon.ico`, `/logo-full.png` | **200**, same pattern (not SEO-relevant, just confirms the general bypass scope) |

**What this means, precisely:** the *content* served at these paths is
not wrong (the sitemap only ever lists `alharrazlaw.com` URLs, since it's
built from `siteConfig.siteUrl` regardless of which host served the
request) — but `al-harraz.vercel.app/robots.txt` returning `Allow: /`
is a standing, present-tense statement to any crawler that this
specific host is fully crawlable. robots.txt directives are
evaluated per-origin; Google does not infer "this is a duplicate of
another host" from it. This does not, by itself, reproduce duplicate
*page* content (every actual page path still correctly 308s, confirmed
above including under the Googlebot UA), but it is a real, confirmable
inconsistency: every other kind of path on this host enforces the
canonical-host policy, these specific metadata/asset paths don't.

## 5. Other Vercel domains/aliases/preview/old deployments

**Not fully verifiable from here — dashboard/API access required (declined by design — see scope note above).** What I *could* check externally:

- DNS: `alharrazlaw.com` → `216.198.79.1` (Vercel's custom-domain edge
  IP). `al-harraz.vercel.app` → `216.198.79.131`, `64.29.17.131`
  (Vercel's shared `*.vercel.app` wildcard infrastructure — a different,
  generic routing path, consistent with it being the project's
  auto-assigned alias rather than a custom domain).
- TLS certificates: each host has its own single-SAN certificate (just
  its own hostname) — no shared certificate revealing other aliases.
- Public search engines (via this session's web-search tool) and the
  **Wayback Machine**: zero results for `al-harraz.vercel.app`, and zero
  archived snapshots exist at `archive.org` for either
  `al-harraz.vercel.app` or `al-harraz.vercel.app/ar/contact`. This is a
  *weak* signal (this search tool isn't Google itself, and absence of a
  Wayback snapshot doesn't prove absence from Google's index), but it
  does not support a theory of strong external backlinks or wide
  crawl/archival history for that host.
- Vercel's standard behavior (documented publicly, not project-specific):
  every deployment gets its own unique, immutable URL
  (`<project>-<hash>-<team>.vercel.app`), in addition to the project's
  stable alias (`al-harraz.vercel.app`) and the production custom domain.
  Old deployment URLs are **not automatically deleted** and, unless
  Deployment Protection is enabled, remain directly fetchable — each
  serving whatever code was live *at that deployment*, including
  possibly a build from **before** the Sept 28 redirect existed. If such
  a URL was ever crawled while un-redirected, it could be a real (if
  historical) explanation for how Google first came to treat a
  `vercel.app` URL as an alternate version — **but this would not be
  `al-harraz.vercel.app` itself** (that alias, confirmed above, correctly
  redirects today) — it would be a different, hash-suffixed URL that GSC
  is not currently citing. I cannot confirm or rule this out without
  dashboard access.

**What I need from you (read-only, no setting changes):** in the Vercel
dashboard, open your project → **Deployments** tab, and tell me (or just
screenshot) whether you see more than a small handful of entries, and
whether any very old one near the bottom shows a different/unique
`*.vercel.app` URL you don't recognize. Separately, open **Settings →
Domains** and tell me every hostname listed there. This fills the one
real gap in this investigation.

## 6. Vercel project settings (Domains / redirects / aliases / Deployment Protection / headers)

Same limitation as §5. One relevant thing I *can* state from what's
externally observable: whatever Deployment Protection setting exists, it
does **not** currently block anonymous/unauthenticated requests to
`al-harraz.vercel.app` — every test above (including the Googlebot-UA
one) got a normal 308 or 200, never an auth challenge or a Vercel
protection-bypass page. So Deployment Protection, if configured at all,
is not the mechanism keeping this host from being crawled — the
application's own `proxy.ts` redirect is doing that work for page paths,
and nothing is doing it for the file-extension paths in §4.

## 7. Best fix to stop Google treating `*.vercel.app` as an independently indexable alternate

Two complementary layers, neither alone being "robots.txt only" (per
your explicit instruction not to rely on robots.txt alone where it would
block Google from seeing the redirect — robots.txt never blocks a
redirect response itself, a `Disallow` only stops Google from *requesting*
a URL in the first place, which is a different mechanism from this
project's actual fix):

1. **Keep the existing host-based permanent redirect as the primary
   mechanism** (already correct and live for every actual content page —
   nothing to change here).
2. **Close the one real gap**: make the host-canonical check run for
   *every* path, including ones that currently match `PUBLIC_FILE`, so
   `al-harraz.vercel.app/robots.txt`, `/sitemap.xml`, and `/llms.txt`
   redirect too, instead of serving 200 content directly. This is not
   "robots.txt as the fix" — the fix is still the redirect; this closes
   the one place where the redirect currently doesn't apply. (Static
   binary assets like `/favicon.ico`/images are lower priority — they
   carry no canonical/indexing signal on their own — but the same
   one-line reordering would cover them too, with no real downside.)

This does **not** require noindexing real `alharrazlaw.com` pages,
changing their canonical, removing content, blocking the old host via
`robots.txt` as a standalone measure, or redirecting everything to the
homepage — none of those were used or are being proposed.

## 8. Why would Google still choose Vercel despite a correct, verified self-canonical?

This is the central question this round was asked to re-examine, given
the fresh Oct 23 crawl. The most evidence-consistent explanation,
**not based on assumption but on how Google's own documentation describes
canonicalization as a process**: crawling and canonicalization are two
separate stages. Google can recrawl and re-verify `alharrazlaw.com/ar/contact`
(as it did, successfully, on Oct 23) **without** that triggering a
recomputation of which URL in a known duplicate cluster is canonical —
that recomputation specifically requires Google to also revisit the
*other* URL in the pair (`al-harraz.vercel.app/ar/contact`) and observe
its current behavior. A URL Google has already decided is a
"duplicate, non-canonical, low-value" alternate is, by Google's own
stated crawl-budget logic, deprioritized for re-crawling — which can
create exactly this kind of standoff: the real page gets recrawled
often (it's considered valuable), the duplicate rarely (it's considered
not), so Google's record of the duplicate's behavior can lag the real
page's recrawl cadence by a wide margin, sometimes well beyond what
feels reasonable for a human watching a dashboard. This is consistent
with, and not contradicted by, everything directly observable today:
the redirect is live, fresh, un-cached, and served identically to a
real Googlebot UA — the technical fix is not failing, Google's record of
the *other side* of the duplicate pair is simply still stale.

The §4 finding (robots.txt/sitemap.xml bypass) is a secondary,
real-but-smaller contributing factor: it does not create live duplicate
*page* content, but it does mean nothing on this project's side is
actively encouraging Google to stop considering that host crawl-eligible
— if anything, its robots.txt still invites further crawling of it,
which is at best neutral and at worst a very minor reason for Google's
crawler to keep returning to that host at all (even though what it finds
there, for every real page, is now just a redirect).

## 9. Does this explain all 12 flagged URLs, or are there additional/different causes?

**Same explanation for all 12 — no evidence of a per-URL-specific
additional cause.** Both factors identified above (canonicalization-lag
on Google's side; the robots.txt/sitemap.xml redirect-bypass on this
project's side) are **host-wide**, not specific to any particular
page's slug, category, or content. There is nothing about `/ar/contact`,
`/ar/about`, `/en/insights`, or any of the other 9 previously-flagged
URLs that would need its own distinct explanation — they are all on the
same shared infrastructure, going through the same middleware, affected
by the same Google-side reprocessing cadence.

## 10. Hardcoded `vercel.app` references — full repository re-scan

Re-ran, fresh, this session (not assumed from the prior audit, since 14
days had passed): `grep -rli "al-harraz\.vercel\.app"` across every
`.ts`/`.tsx`/`.txt`/`.json`/`.js` file in the repository. **One match**:
`src/proxy.ts` itself — and that is only the explanatory code *comment*
describing the redirect's purpose, never emitted as a value (confirmed:
it does not appear in any canonical tag, hreflang, OpenGraph URL,
JSON-LD, sitemap entry, or internal link — all of those are generated
exclusively from `siteConfig.siteUrl` / `NEXT_PUBLIC_SITE_URL`, unchanged
since the last audit). `git log` confirms **zero commits** have touched
this repository between 2026-10-12 and today (2026-10-26) — nothing
regressed; the `public/llms.txt` fix from the first audit is still in
place and still live (re-verified: 200, correct `alharrazlaw.com` links,
zero `vercel` matches).

---

## ROOT CAUSE

**Primary**: Google's canonicalization decision for this URL cluster has
not yet been recomputed since the Sept 28, 2026 fix, because that
recomputation requires Google to recrawl `al-harraz.vercel.app` itself
(the deprioritized/"duplicate" side of the pair) — which it crawls far
less often than the real page precisely *because* it's already been
classified as a low-value duplicate. This is a Google-side reprocessing
lag, not a live defect in the redirect, which is verified correct,
fresh, and un-cached right now, including under a Googlebot User-Agent.

**Secondary, confirmed, real, and fixable**: `src/proxy.ts`'s
`PUBLIC_FILE` check short-circuits before the host-canonical-redirect
check, so `/robots.txt`, `/sitemap.xml`, `/llms.txt`, and other
file-extension paths are served directly (200) from
`al-harraz.vercel.app` instead of redirecting — most notably,
`al-harraz.vercel.app/robots.txt` still tells crawlers `Allow: /` for
that host. This does not reproduce duplicate page content (every actual
page still correctly redirects, Googlebot UA included) but is an
inconsistency worth closing.

**Unresolved/unverifiable from this sandbox**: whether any other
`*.vercel.app` alias, old immutable deployment URL, or preview
deployment exists and is independently crawlable without going through
this project's current `proxy.ts` redirect. Requires your Vercel
dashboard (Deployments + Settings → Domains), read-only.

## EVIDENCE

See §1–§4, §9, §10 above — every claim is backed by a live `curl`
result, a DNS/TLS lookup, a `git log`/`grep` result, or a web/Wayback
Machine query run this session, not inferred or carried over unverified
from the prior round.

## AFFECTED URL PATTERN

- **Page paths** (`/ar/...`, `/en/...`, any route without a file
  extension): correctly redirect host-wide — not affected by the §4 gap,
  confirmed for all 12 GSC-flagged URLs plus the homepage plus a
  post-fix-era page.
- **Metadata/asset paths** (anything matching `PUBLIC_FILE`, i.e. ending
  in a file extension — `/robots.txt`, `/sitemap.xml`, `/llms.txt`,
  images, `/favicon.ico`): do **not** redirect; served 200 directly from
  the old host. This is the one concretely affected pattern this round
  surfaced.

## CURRENT VERCEL BEHAVIOR

- `al-harraz.vercel.app` is live, public, unauthenticated, reachable.
- Every page-like path: `308` permanent redirect, correct path, fresh
  per-request (no stale caching), identical for a spoofed Googlebot UA.
- Every file-extension path: `200`, served directly, some from a
  ~10-day-old Vercel edge cache (`x-vercel-cache: HIT`), bypassing the
  application's own redirect logic entirely.
- No evidence (from outside) of Deployment Protection blocking anonymous
  access — the redirect/bypass behavior above is the real, full picture
  of what an outside crawler sees.

## RECOMMENDED FIX

1. **No change to the core redirect** — it is correct and should not be
   touched.
2. **Reorder `src/proxy.ts`** so the host-canonical check runs before (or
   independent of) the `PUBLIC_FILE` short-circuit, so `/robots.txt`,
   `/sitemap.xml`, `/llms.txt` (at minimum; optionally all file-extension
   paths) on any non-canonical host also get the `308` redirect instead
   of being served directly. This is a small, surgical reordering, not a
   rewrite of the matching logic.
3. **Do not** add a robots.txt `Disallow` on the Vercel host as a
   standalone fix (per your instruction) — once (2) is done, there will
   be no 200 `robots.txt` response on that host to even carry such a
   directive; the redirect itself becomes the single consistent signal
   for every path type.
4. **Wait for Google's own reprocessing** of the canonical cluster for
   the primary cause — no code change accelerates this. The only
   available levers to *prompt* faster reprocessing are Search
   Console's "Validate Fix" workflow or Request Indexing — both
   explicitly out of scope for this round per your instruction, to be
   considered separately once you give that authorization.
5. **Close the one open unknown** (§5/§6) by checking Vercel's
   Deployments and Domains lists yourself, read-only, so we can confirm
   or rule out an old/alternate deployment URL independent of
   `al-harraz.vercel.app`.

## FILES/CONFIG TO CHANGE (if you approve — not yet done)

- `src/proxy.ts` only. Specifically: move the `PUBLIC_FILE`/admin/api/`_next`
  early-return below the host-canonical-redirect check (or add an
  explicit exception within it for the specific metadata paths), so a
  non-canonical host never reaches a 200 response for any path. No other
  file needs to change — `next.config.ts`, `vercel.json`, `src/lib/seo.ts`,
  `src/app/(frontend)/sitemap.ts`, and the `robots.txt`/`sitemap.xml`
  route handlers themselves are all already correct and host-agnostic by
  design; only the middleware's path-matching order is the issue.

## RISKS

- **Low risk, narrowly scoped.** The change affects only requests whose
  `Host` header differs from the canonical host (`VERCEL_ENV === 'production'`
  guard already in place) — real production traffic on `alharrazlaw.com`
  is entirely unaffected, since that host never enters the
  `requestHost !== CANONICAL_HOST` branch regardless of reordering.
- **Preview deployments and local dev remain unaffected** — the existing
  `ENFORCE_CANONICAL_HOST` guard (`VERCEL_ENV === 'production'` only)
  is untouched by this reordering, so a developer's own preview URL still
  serves its own `robots.txt`/`sitemap.xml` normally.
- **Main thing to verify post-change**: that `/admin`, `/api`, and
  `/_next` paths still correctly bypass the redirect on the canonical
  host itself (they must never redirect when already on `alharrazlaw.com`)
  — this is already guaranteed by the existing `requestHost !== CANONICAL_HOST`
  condition and is not something the reordering changes, but it's worth
  an explicit regression test given it's the same file.
- No risk to Civil Phase 2 content, CMS data, the publication script, or
  any ranking page — this change is confined to `src/proxy.ts`'s path
  ordering only.

## ACCEPTANCE TESTS (to run after an approved deploy — not yet done)

1. `alharrazlaw.com/robots.txt`, `/sitemap.xml`, `/admin`, `/api/*` — all
   still behave exactly as today (200/normal) on the canonical host.
2. `al-harraz.vercel.app/robots.txt` → now `308` → `https://alharrazlaw.com/robots.txt` → `200`.
3. `al-harraz.vercel.app/sitemap.xml` → now `308` → `https://alharrazlaw.com/sitemap.xml` → `200`.
4. `al-harraz.vercel.app/llms.txt` → now `308` → `https://alharrazlaw.com/llms.txt` → `200`.
5. Every one of the 12 GSC-flagged page URLs — re-verify still `308` on
   the old host, still self-canonical with correct hreflang on the real
   host (regression check against the first audit's results).
6. Confirm, with a spoofed Googlebot UA, that all of the above hold
   identically (no UA-based difference introduced).
7. Confirm `/admin/*` and `/api/*` on `al-harraz.vercel.app` **still do
   NOT redirect to the real domain's admin/api** (those should remain
   served as before — check they aren't accidentally swept into the
   redirect by the reordering, since leaking an admin-panel redirect
   target would be a real regression to catch here).

## Side observation (out of scope for this fix, flagging only)

`al-harraz.vercel.app/admin` also returns `200` directly today (same
early-return block as the `PUBLIC_FILE` paths — `/admin`/`/api`/`/_next`
are excluded from the host-redirect by the same `if` condition). This is
pre-existing behavior, not something introduced by this investigation,
and it's not a Google-canonical issue (the admin login screen isn't
indexable content, and both hosts' `robots.txt` already `Disallow: /admin`).
Not recommending any change here as part of this round — it's outside
"canonical consolidation" scope — just flagging it for awareness since
it means the CMS login screen is reachable from either hostname today.

---

**No changes were made to the repository, Vercel, Search Console, or any
other system during this investigation.** Waiting for your explicit
approval before implementing the §"RECOMMENDED FIX" §2 change to
`src/proxy.ts`.

---

## IMPLEMENTATION + DEPLOY + VERIFICATION — 2026-10-26T12:25:05Z

Approved and implemented per owner authorization (2026-10-26). Scope
strictly limited to §"RECOMMENDED FIX" §2 above — nothing else.

### 1. Commit hash

`540113a` — `fix(seo): redirect public-file paths on non-canonical hosts too`
on `claude/al-harraz-law-platform-oiq2y3`, pushed to origin.

### 2. Files changed

`src/proxy.ts` only. No other file touched — no content, CMS data,
slugs, routing config, Civil Phase 2 files, or publication script.

### 3. Diff (full — it's small)

```diff
-  if (
-    pathname.startsWith('/admin') ||
-    pathname.startsWith('/api') ||
-    pathname.startsWith('/_next') ||
-    PUBLIC_FILE.test(pathname)
-  ) {
+  // /admin, /api, and /_next are never subject to the canonical-host
+  // redirect below, on any host — unchanged by the reordering further
+  // down this function (see VERCEL_CANONICAL_ROOT_CAUSE_INVESTIGATION.md,
+  // which scoped that fix to public files only, explicitly leaving these
+  // three untouched).
+  if (pathname.startsWith('/admin') || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
     return NextResponse.next()
   }

   const requestHost = request.headers.get('host')
@@ -66,6 +66,19 @@
     return NextResponse.redirect(canonicalUrl, 308)
   }

+  // Public files (robots.txt, sitemap.xml, llms.txt, images, ...) are
+  // served as-is on the canonical host — this check runs AFTER the host
+  // redirect above specifically so the same paths on a non-canonical host
+  // (the old al-harraz.vercel.app alias, a www. alias) redirect instead of
+  // being served directly as duplicate, un-redirected content. [...]
+  if (PUBLIC_FILE.test(pathname)) {
+    return NextResponse.next()
+  }
+
   const segments = pathname.split('/').filter(Boolean)
```

Net effect: `/admin`, `/api`, `/_next` still bypass the redirect
unconditionally, exactly as before — only their position relative to the
host-redirect check (still first) is unchanged; what moved is the
`PUBLIC_FILE` check, from before the host-redirect to after it.

### 4. Build / test results

- Fresh sandbox this session required `npm ci` first (`node_modules` was
  empty — unrelated to this change, just this container's starting
  state); 753 packages installed cleanly.
- `npx tsc --noEmit -p .`: clean, zero errors.
- `npx eslint src/proxy.ts`: clean, zero warnings/errors.
- `npx vitest run`: **48/48 tests passed** (7 files) — no regression in
  the existing unit suite (none target `proxy.ts` directly, but this
  confirms nothing else in the app broke).
- Full `npm run build` (which per `DEPLOYMENT.md` runs
  `npx payload migrate && npm run seed && next build`) was not run
  locally — this sandbox has no production database, consistent with
  every prior phase of this engagement. Vercel's own build (which does
  have database access) is what actually ran for the deploy below.

### 5. Deployment URL/status

Pushed to `claude/al-harraz-law-platform-oiq2y3`, which auto-deploys to
production (`https://alharrazlaw.com`) on this project. Waited ~3.5
minutes for the deploy, then verified live (see below) — the fix is
confirmed live in production, not just pushed to git.

### 6. 12 GSC-flagged URLs — full results table

| Path | Old host (`al-harraz.vercel.app`) | Old host, Googlebot UA | Production (`alharrazlaw.com`) | Canonical | Hreflang | `vercel` refs in page |
|---|---|---|---|---|---|---|
| `/ar/contact` | 308 → correct path | 308 → correct path (identical) | 200 | self | 3 (ar/en/x-default) | 0 |
| `/ar/about` | 308 → correct path | 308 → correct path (identical) | 200 | self | 3 | 0 |
| `/ar/insights/how-civil-judgments-are-enforced` | 308 → correct path | 308 → correct path (identical) | 200 | self | 3 | 0 |
| `/en/industries/import-export` | 308 → correct path | 308 → correct path (identical) | 200 | self | 3 | 0 |
| `/en/practice-areas/employment-labour-law` | 308 → correct path | 308 → correct path (identical) | 200 | self | 3 | 0 |
| `/en/about` | 308 → correct path | 308 → correct path (identical) | 200 | self | 3 | 0 |
| `/en/practice-areas/ngo-foundation-registration` | 308 → correct path | 308 → correct path (identical) | 200 | self | 3 | 0 |
| `/en/practice-areas/arbitration` | 308 → correct path | 308 → correct path (identical) | 200 | self | 3 | 0 |
| `/en/practice-areas/commercial-activity-business-licensing` | 308 → correct path | 308 → correct path (identical) | 200 | self | 3 | 0 |
| `/ar/practice-areas/competition-law` | 308 → correct path | 308 → correct path (identical) | 200 | self | 3 | 0 |
| `/en/insights` | 308 → correct path | 308 → correct path (identical) | 200 | self | 3 | 0 |
| `/en/practice-areas/banking-finance-law` | 308 → correct path | 308 → correct path (identical) | 200 | self | 3 | 0 |

12/12 — no exceptions, no redirect chains (single 308 hop every time,
landing directly on a 200), identical behavior under a spoofed Googlebot
User-Agent.

### 7. robots.txt / sitemap.xml / llms.txt results

| Old URL | HTTP status | Location header | Final URL | Final status |
|---|---|---|---|---|
| `https://al-harraz.vercel.app/robots.txt` | 308 | `https://alharrazlaw.com/robots.txt` | same | 200 |
| `https://al-harraz.vercel.app/sitemap.xml` | 308 | `https://alharrazlaw.com/sitemap.xml` | same | 200 |
| `https://al-harraz.vercel.app/llms.txt` | 308 | `https://alharrazlaw.com/llms.txt` | same | 200 |

Identical under the Googlebot UA for all three. Production
`robots.txt` unchanged (`Allow: /`, `Disallow: /admin`, `Disallow: /api`,
correct sitemap pointer). Production `sitemap.xml`: **182 `<loc>`
entries, zero non-`alharrazlaw.com` locs, zero `vercel` string matches**
in the full file body.

### Regression tests — `/admin`, `/api`, `/_next`

| Path | Production | Old host | Redirect introduced? |
|---|---|---|---|
| `/admin` | 200 | 200 (unchanged) | No |
| `/api/consultation` (GET, a real POST-only route) | 405 | 405 (identical) | No |
| `/_next/static/...` | 404 (guessed filename) | 404 (identical) | No |

All three categories behave identically on both hosts, exactly as before
this change — confirming the fix did not widen scope beyond the public
files it targeted.

### 8. Remaining issues

- **Google-side reprocessing is still pending** — this was never
  something a code fix could resolve directly (see the investigation's
  root-cause section). Nothing observed this round changes that
  assessment.
- **Unverified from this sandbox**: whether any other `*.vercel.app`
  alias or old immutable deployment URL exists outside
  `al-harraz.vercel.app` itself (§5/§6 of the investigation, still open,
  requires your read-only check of the Vercel dashboard).
- No new issues surfaced by this round's testing. Zero exceptions across
  all 12 URLs, the 3 metadata files, and the 3 regression-test
  categories.

### 9. Final verdict

**TECHNICAL FIX VERIFIED.**

This refers strictly to the code-level fix implemented and deployed this
round (the `robots.txt`/`sitemap.xml`/`llms.txt` redirect gap) — it does
not mean the GSC "Duplicate, Google chose different canonical" issue is
resolved; that remains **GOOGLE REPROCESSING PENDING**, unchanged from
the prior round's conclusion, and is not something any deploy can
directly resolve.

**Per your explicit instruction: no Search Console action was taken or
requested — no Validate Fix, no Request Indexing, no other GSC change.**
That remains entirely yours to initiate, after you've reviewed this
evidence, starting with your own Live URL Inspection.
