# Civil Law Phase 2 — Publication Script Review

Date: 2026-10-07. This covers implementation + testing + dry-run only, per
the explicit authorization: **production writes, production CMS document
creation/updates, the full `npm run seed`, and any modification to
`seed.ts`'s existing behavior were all out of scope and none were done.**

## A. Script path

`src/seed/publish-civil-phase-2.ts` (new file; `src/seed/seed.ts` was not
touched — confirmed by `git status --short src/seed/` before this file was
added, which showed only the new file as untracked).

## B. Commit SHA

`3877008` on `claude/al-harraz-law-platform-oiq2y3`, pushed to origin.
(Preceding relevant commits: `0472c66` added the approved content to
`data.ts`; `3d58cef` added the safety audit this script implements.)

## C. Exact allowlisted write targets

```ts
const ALLOWED_NEW_ARTICLE_SLUGS = Object.freeze([
  'rental-tenancy-disputes-egypt',
  'co-ownership-partition-egypt',
  'civil-vs-criminal-cases-egypt',
])

const ALLOWED_LINK_UPDATE_ARTICLE_SLUGS = Object.freeze([
  'property-possession-disputes-egypt',
  'common-inheritance-disputes-egypt',
  'what-is-civil-lawsuit',
])

const ALLOWED_LINK_UPDATE_PRACTICE_AREA_SLUGS = Object.freeze([
  'civil-law',
  'real-estate-property-registration',
])
```

8 slugs total, exactly matching the authorization's list, nothing else.
`assertAllowed()` is called immediately before every single
`payload.create`/`payload.update` call in the file (6 call sites: lines
227, 330, 334, 434, 470–471 in the current file) and throws (aborting the
whole run) if the slug isn't in the relevant list. Static grep confirms
there is no loop over the full `approvedArticles`/`approvedPracticeAreas`
arrays anywhere (`grep -n "for (const .* of approvedArticles\|approvedPracticeAreas"` returns nothing) — every lookup goes through `findArticleBySlug`/`findPracticeAreaBySlug`, called only with one of the 8 allowlisted slugs.

## D. Proof dry-run is default

`main()` only ever reaches a write call inside the `if (!willExecute) { ...; return }` guard's **else** branch, and `willExecute = executeRequested && isProduction`. With no arguments and no `NODE_ENV`, `executeRequested` is `false`, so `willExecute` is `false` unconditionally, and the function returns after printing `DRY RUN — ZERO WRITES PERFORMED` before any `executeNewArticle`/`executeLinkUpdate` call is reached. Verified by actually running it (see §O) — it exited after the connection-guard message, never reaching the write path.

## E. Proof `--execute` is required for writes

```ts
const executeRequested = process.argv.includes('--execute')
const isProduction = process.env['NODE_ENV'] === 'production'
...
if (executeRequested && !isProduction) {
  console.log('REFUSED: --execute was passed but NODE_ENV is not "production"...')
  process.exitCode = 1
  return
}
const willExecute = executeRequested && isProduction
```

Both conditions are required (logical AND); passing `--execute` alone,
without `NODE_ENV=production`, is explicitly refused rather than silently
downgraded to a dry run (to avoid masking a misconfiguration). The
execute-mode code path (`withTransaction(...)`, `executeNewArticle`,
`executeLinkUpdate`) is only reached after `willExecute` is `true` **and**
every preflight check passed (`allOk`).

## F. Environment guards

- `NODE_ENV === 'production'` checked explicitly (§E).
- `--execute` flag checked explicitly (§E).
- Preflight must fully pass (§I/§J below) before any write.
- No environment variable other than `NODE_ENV` is ever read in this
  file — confirmed by `grep -n "process\.env\["` returning exactly one
  line (the `NODE_ENV` check/log). `DATABASE_URI` and `PAYLOAD_SECRET` are
  never referenced in this file at all (they're only read inside
  `payload.config.ts`, which this script imports but does not modify or
  introspect).

## G. Reviewer resolution result

**Design verified by code inspection; not executed against a real
database this session (none reachable — see §O).** `resolveReviewer()`:
read-only `payload.find` on `users` filtered by `email: { equals: 'hodaharraz1@gmail.com' }`,
with `select: { email: true, role: true, name: true }` (never pulls back
password hash/salt or other fields beyond what's needed to prove identity).
Requires exactly one match (`docs.length === 1`); zero matches or more
than one both abort with a clear message. The single match's `role` must
be `'admin'` or `'reviewer'` (per `src/collections/Users.ts`'s role
options) or it's refused. No `create`, `update`, or `delete` is ever
issued against the `users` collection anywhere in this file (confirmed —
`grep -n "collection: 'users'"` shows exactly one usage, inside this
read-only `find` call).

## H. Duplicate-slug behavior

For each of the 3 new article slugs: `payload.find` by slug. **If found,
the entire batch aborts** (`ABORT_EXISTS`), reporting the slug, the
existing document's `id`, and its current `status` — exactly as required
("for the FIRST production publication of this batch, I do NOT want an
unexpected existing article silently overwritten"). There is no update
path for the 3 new-article slugs in this script at all; a second
successful run after a genuine first publication would always report
`ABORT_EXISTS` for all three (by design — this script is scoped to the
*first* publication only, not an ongoing content-fix tool).

## I. Content-drift protection

For the 5 existing link-update targets, `preflightLinkUpdates()` fetches
the live document (`locale: 'all'`) and reconstructs its current
`body`/`legalIssuesCovered` field back into plain paragraph strings via a
hand-written reverse-serializer (`paragraphsFromRichText`, mirroring
`seed.ts`'s `richTextFromParagraphs` exactly). It then compares that
**current live value** against two others:

1. **Expected pre-change baseline** — loaded from actual git history at
   commit `ce06b1c9ea7164d5a6ef300280ca1ce567a4e8ee` (the commit
   immediately before this publication's `data.ts` edits), via
   `git show <ref>:src/seed/data.ts` into an isolated temp file and a
   dynamic `import()` — not hand-transcribed text, to avoid any risk of
   transcription error in the baseline itself.
2. **Proposed value** — from the currently-imported `data.ts` (the
   approved text).

Three outcomes: live === proposed → `ALREADY_APPLIED` (no-op, safe to
re-run); live === baseline → `UPDATE` (safe, matches the known starting
point); live matches **neither** → `ABORT_DRIFT`, printing all three
values for manual review, and the write is refused. This is a real
three-way comparison, not a cosmetic check — independently verified this
session (see §O) by loading the actual baseline commit and confirming,
e.g., that `civil-law`'s baseline `legalIssuesCovered.ar` has exactly 2
paragraphs (not 3) and that `what-is-civil-lawsuit`'s baseline body has
no link to `civil-vs-criminal-cases-egypt` — i.e. the baseline is
genuinely "before," not accidentally identical to "after."

Per the failure model (requirement 9), a drift finding on even one of the
5 targets fails the overall preflight (`allOk = findings.every(f => f.ok)`),
which blocks **all** writes for the batch, not just that one document —
reconciling "skip/abort that document" (the per-document report) with
"any preflight failure → zero writes" (the batch-level gate).

## J. Delete-operation audit

```
$ grep -n "payload\.delete\|truncate\|DROP\|\.drop(" src/seed/publish-civil-phase-2.ts
NONE FOUND
```

Zero delete calls anywhere in the file. No FAQ cleanup, no
retired-content cleanup, no delete/recreate pattern. This is a
mechanical fact, not a design intention — grep confirms it directly.

## K. Transaction support finding

**Genuinely supported — verified against the installed package, not
assumed.** `node_modules/payload/dist/database/types.d.ts`:
- Line 12: `beginTransaction: BeginTransaction;`
- Line 24: `commitTransaction: CommitTransaction;`
- Line 112: `rollbackTransaction: RollbackTransaction;`
- Lines 151–153: `BeginTransaction = (options?) => Promise<null | number | string>`, etc.

`node_modules/payload/dist/collections/operations/local/create.d.ts:75`
and `.../update.d.ts:89` both accept `req?: Partial<PayloadRequest>`,
and `PayloadRequest.transactionID` (`node_modules/payload/dist/types/index.d.ts:63`)
is how a call is scoped to a specific transaction.

This script's `withTransaction()` helper calls `payload.db.beginTransaction()`
once per execute-mode run; if it returns a real id, every
`create`/`update` call in that run passes `req: { transactionID }`, and
the whole batch is committed together at the end or rolled back together
on any thrown error. **If `beginTransaction()` returns `null`/`undefined`
(no transaction could be established), the script does not invent a
substitute — it throws `"NO GLOBAL TRANSACTION AVAILABLE..."` and aborts
with zero writes**, rather than silently proceeding without the
protection this run was asked to provide. This was not exercised against
a live transaction this session (no reachable database — §O), so the
*runtime* behavior of `beginTransaction()` against the real production
Postgres instance is not yet proven, only that the API genuinely exists
in the installed adapter and that this script calls it correctly per its
documented type signature.

## L. Typecheck result

```
$ npx tsc --noEmit -p .
(no output — clean, exit 0)
```

Two real type errors were found and fixed during implementation (a union
type missing a `children` property guard, and an `unknown` reviewer-id
type not matching Payload's generated `legalReviewer` field type) — both
fixed by narrowing types, not by casting away the error. Final run is
clean across the whole repo, not just this file.

## M. Lint result

```
$ npx eslint src/seed/publish-civil-phase-2.ts
(no output — clean, exit 0)
```

## N. Test result

No existing test in `tests/unit/` targets seed scripts, so none covers
this file directly. The full existing unit suite still passes
unaffected by this addition:

```
$ npx vitest run
 Test Files  7 passed (7)
      Tests  48 passed (48)
```

Two pieces of this script's new logic were independently verified
standalone this session (decoupled from any database connection, since
none is reachable here):
1. **Git-based baseline loader** — loaded the actual `ce06b1c` commit and
   confirmed `civil-law`'s baseline has 2 (not 3) `legalIssuesCovered.ar`
   paragraphs, `what-is-civil-lawsuit`'s baseline body paragraph has no
   link to the new article, and `rental-tenancy-disputes-egypt` is absent
   from the baseline's `articles` array entirely.
2. **richText round-trip serializer** — fed a set of paragraphs (plain
   text, Arabic with two links, and multiple links in one paragraph)
   through `richTextFromParagraphs` then back through
   `paragraphsFromRichText`, and confirmed byte-for-byte equality with
   the original input, plus confirmed an empty/missing richText value
   reverses to `[]` rather than throwing.

Both test scripts were temporary, run from the scratchpad directory, and
deleted after use — not committed.

## O. Dry-run result

```
==============================================================================
Civil Law Phase 2 — dedicated publication script
Mode requested: dry-run (default)
NODE_ENV: (unset)
==============================================================================
DRY-RUN BLOCKED — PRODUCTION CONNECTION UNAVAILABLE
Could not initialize Payload / connect to the configured database: Error: missing secret key. A secret key is needed to secure Payload.
(No connection string or secret is printed here, by design.)
```

**DRY-RUN BLOCKED — PRODUCTION CONNECTION UNAVAILABLE.** This sandbox has
no `PAYLOAD_SECRET` (and, as established in `PRODUCTION_SEED_SAFETY_AUDIT.md`,
no reachable database either — `DATABASE_URI` here points to
`127.0.0.1:5432`, which is unreachable in this sandbox). The script's own
`try/catch` around `getPayload({ config })` caught this and reported it
exactly as designed, without printing the secret or connection string. I
did not fabricate a dry-run result, and did not attempt to source
production credentials to work around this — doing so wasn't authorized
and wasn't necessary to complete the implementation/testing/dry-run scope
given. Confirming this script's full preflight output against the real
production database is therefore still outstanding and belongs to a
separate, explicitly-authorized dry-run step once someone with production
access can run it.

## P. Exact planned production operations

If run with `--execute` against production (not done), and assuming the
preflight passes cleanly (all 3 new slugs absent, all 5 link targets
present and matching the known baseline, reviewer resolves), the writes
issued would be exactly:

1. `articles.create` (locale `ar`) + `articles.update` (locale `en`) for
   `rental-tenancy-disputes-egypt` — title/excerpt/body (AR+EN),
   `category: 'real-estate'`, `status: 'published'`, `legalReviewer` set
   to the resolved `hodaharraz1@gmail.com` user id, `publishDate`/`lastReviewedDate` set to today.
2. Same pattern for `co-ownership-partition-egypt` (`category: 'real-estate'`).
3. Same pattern for `civil-vs-criminal-cases-egypt` (`category: 'guides'`).
4. `practice-areas.update` (locale `ar`) + `update` (locale `en`) for
   `civil-law` — `legalIssuesCovered` field only, replaced with the
   3-paragraph proposed value (2 unchanged + 1 new, additive).
5. Same pattern for `real-estate-property-registration` — `legalIssuesCovered`
   replaced with its 2-paragraph proposed value (1 unchanged + 1 new).
6. `articles.update` (locale `ar`) + `update` (locale `en`) for
   `property-possession-disputes-egypt` — `body` field only, replaced
   with the proposed array (same paragraph count, last paragraph's text
   extended with one additional clause and link).
7. Same pattern for `common-inheritance-disputes-egypt` — `body` field,
   last paragraph extended.
8. Same pattern for `what-is-civil-lawsuit` — `body` field, one paragraph
   extended with one additional sentence and link.

All 8 operations would be scoped to one transaction (§K) and committed or
rolled back together. Nothing else — no other collection, field, or
document — would be touched.

## Q. Confirmation that ZERO production writes occurred

Confirmed. No `--execute` flag was ever passed in this session. The one
actual run of the script (§O) never reached `getPayload()` successfully,
let alone the write path, and exited with the connection-unavailable
message. `src/seed/seed.ts` was not modified, not run, and not invoked
by this script. No production credentials were read, sourced, or printed
at any point. `git log` on this branch shows only documentation and this
one new script file added since the last confirmed-safe state.

---

## FINAL STATUS

**BLOCKED — no reachable production (or any) database/credentials in
this sandbox to run the dry-run against the real production CMS and
confirm the preflight checks (reviewer resolution, duplicate-slug
absence, content-drift baseline match) actually pass there.**

The script itself is implemented, typechecked, linted, statically
verified (no deletes, allowlist-gated writes only), and its two novel
pieces of logic (baseline loader, richText round-trip) are independently
tested and correct. What remains before this can honestly be called
**READY FOR PRODUCTION EXECUTION AUTHORIZATION** is a real dry run against
production — i.e. `NODE_ENV=production tsx src/seed/publish-civil-phase-2.ts`
(no `--execute`) run from an environment with real production database
access (e.g. the firm owner's machine via `vercel env pull`, the same
mechanism used on 2026-09-28) — so that §G/§I/§O above can be confirmed
against the real live data instead of only by code inspection and
standalone unit-style checks. I have not fabricated that result and am
not claiming it.

Once that real dry run comes back clean (all 8 preflight checks green,
planned operations matching §P exactly, no content drift reported), the
script would be ready for a separate, explicit `--execute` authorization
— which this instruction does not grant and I have not acted as though
it did.

---

## REAL PRODUCTION DRY-RUN — 2026-10-12T09:05:42Z

Scope of this round: implementation-verified, dry-run-only, against this
sandbox's real environment. `--execute` was never passed. `npm run seed`
was never run. No code, environment variable, or production data was
modified. No secret was printed, obtained, reconstructed, or worked
around — the result below is the actual, unmodified output of the
command this authorization specified.

### Pre-check: credential availability (before attempting anything)

Checked, did not attempt to obtain or create: `PAYLOAD_SECRET` — not set.
`DATABASE_URI` — not set. No `.env.production`/`.env.production.local`
file in the repo. No `vercel` CLI installed, no `.vercel/` project link,
no `VERCEL_*`/`POSTGRES_*` environment variables present. This sandbox
has never had production database access at any point in this
engagement (same finding reported in `PRODUCTION_SEED_SAFETY_AUDIT.md`
and the original script review above).

### Command actually run

```
NODE_ENV=production npx tsx src/seed/publish-civil-phase-2.ts
```
(equivalent to the specified `NODE_ENV=production tsx src/seed/publish-civil-phase-2.ts`, no `--execute`)

### Actual output

```
==============================================================================
Civil Law Phase 2 — dedicated publication script
Mode requested: dry-run (default)
NODE_ENV: production
==============================================================================
DRY-RUN BLOCKED — PRODUCTION CONNECTION UNAVAILABLE
Could not initialize Payload / connect to the configured database: Error: missing secret key. A secret key is needed to secure Payload.
(No connection string or secret is printed here, by design.)
```

Exit code 1. The script failed at `getPayload({ config })` — before any
`find`, before reviewer resolution, before any preflight check, before
any possibility of a write. No secret, connection string, or credential
of any kind appears in the output above, by the script's own design
(confirmed again: it prints nothing from `process.env` except `NODE_ENV`).

### A. Production connection

**FAIL.** No production database or Payload instance was reachable from
this environment. Nothing was worked around.

### B. NODE_ENV

Confirmed set to `production` for this invocation (shown in the script's
own log line above: `NODE_ENV: production`) — the environment-guard
condition on the `NODE_ENV` side was satisfied; the failure was purely
the missing `PAYLOAD_SECRET`/database connection, not the guard logic.

### C. Script integrity

**PASS.** Verified before running anything:
- `git log --oneline -- src/seed/publish-civil-phase-2.ts` shows exactly
  one commit (`3877008`, the reviewed implementation) — zero commits
  since.
- `git status --short` — clean, no uncommitted changes to this file or
  any other.
- `md5sum` of the working-tree file matches `git show 3877008:src/seed/publish-civil-phase-2.ts` byte-for-byte.
- `grep -n "payload\.delete\|truncate\|DROP"` — no matches (zero delete
  operations, unchanged from the original review).
- Dry-run-by-default and the `--execute` + `NODE_ENV=production` write
  guard are both present and unchanged (`executeRequested`, `isProduction`,
  `willExecute` at lines 500/501/515, same logic as reviewed).
- No changes were made to the script to force the dry-run to pass — it
  was run exactly as committed, and failed exactly as it should given no
  production connection exists here.

### D. Reviewer

**FAIL (not reached).** `resolveReviewer()` requires a live `payload.find`
call, which never executed because `getPayload()` itself failed first.
No read, write, or any access to the `hodaharraz1@gmail.com` account or
any user record occurred.

### E. rental-tenancy-disputes-egypt

**Not checked — blocked by §A.** No query against the real `articles`
collection was possible.

### F. co-ownership-partition-egypt

**Not checked — blocked by §A.**

### G. civil-vs-criminal-cases-egypt

**Not checked — blocked by §A.**

### H. civil-law

**Not checked — blocked by §A.** No live content was read; no
baseline/proposed comparison was possible.

### I. real-estate-property-registration

**Not checked — blocked by §A.**

### J. property-possession-disputes-egypt

**Not checked — blocked by §A.**

### K. common-inheritance-disputes-egypt

**Not checked — blocked by §A.**

### L. what-is-civil-lawsuit

**Not checked — blocked by §A.**

### M. Transaction support

**Not exercised this round (unreachable — blocked by §A).** The static
finding from the original review stands unchanged: `payload.db.beginTransaction`/
`commitTransaction`/`rollbackTransaction` are genuinely present in the
installed `payload`/`@payloadcms/db-postgres` packages' type definitions
(cited with file/line in the original review above), and this script
calls them correctly per their documented signature. Whether
`beginTransaction()` actually returns a usable transaction id against the
*real* production Postgres instance remains unproven — it was unproven
before this round too, and this round could not change that, since the
database was never reached.

### N. Total preflight

**0 of 8 target-level checks could run** (3 new-article checks + 5
existing-document checks). The only checks that *could* run before the
connection attempt — script integrity (§C) and the `NODE_ENV` guard
condition (§B) — both passed. Everything downstream of `getPayload()` is
unevaluated, not failed-on-its-own-merits; it simply never got a chance
to run.

### O. Planned production writes IF separately authorized later

Unchanged from the original review (nothing new to add — the plan itself
doesn't depend on this round's connection attempt): if a future real
dry-run against a reachable production database passes all 8 preflight
checks, `--execute` would issue exactly 8 writes inside one transaction —
3 article creates (AR+EN each) for the 3 new slugs, and 5 additive field
updates (AR+EN each) to `civil-law` and `real-estate-property-registration`'s
`legalIssuesCovered`, and to `property-possession-disputes-egypt`,
`common-inheritance-disputes-egypt`, and `what-is-civil-lawsuit`'s `body`.
Nothing else.

### P. Actual writes during this task

**ZERO.** No `create`, `update`, or `delete` call was ever issued — the
script never got past its own connection step. No code was modified (the
one-line integrity checks above were read-only `git`/`md5sum` commands,
not edits). No environment variable was set outside this single command
invocation's own shell. No secret was printed.

### Q. Explicit final line

**DRY RUN — ZERO WRITES PERFORMED**

---

## FINAL STATUS (this round)

**BLOCKED — DRY-RUN BLOCKED — PRODUCTION CONNECTION UNAVAILABLE.** This
sandbox has no `PAYLOAD_SECRET`, no `DATABASE_URI` pointing at production,
and no other means of reaching the real Payload/Postgres instance. Per
the explicit instruction for this round, I did not attempt to obtain,
reconstruct, or work around that. The script itself is unchanged,
integrity-verified, and exited safely and informatively the moment it
could not connect — it did not hang, did not guess, and did not fall
back to any other data source.

This is not a new finding — it is the same constraint already recorded
in `PRODUCTION_SEED_SAFETY_AUDIT.md` and the original review above. A
real dry-run that actually exercises reviewer resolution, the 3
new-article checks, and the 5 content-drift checks against live
production data still requires running this exact command from an
environment that has real production credentials (e.g. the firm owner's
own machine, with `vercel env pull` for the production environment, the
same mechanism used for the 2026-09-28 publication). I have not fabricated
a result for any of the 8 target checks above, and none of them should be
read as having passed.
