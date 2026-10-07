# Production Seed Safety Audit

Date: 2026-10-07. Read-only audit. **No code was modified, no seed was
run, no deployment was triggered, and no production credentials were
accessed or displayed as part of producing this document.** This is a
code-evidence audit of `npm run seed` as it exists in the repository
right now (commit `0472c66`, branch `claude/al-harraz-law-platform-oiq2y3`).

## What `npm run seed` actually does

`package.json`:
```json
"seed": "tsx src/seed/seed.ts"
```

It runs `src/seed/seed.ts` directly with `tsx`, against whatever
`DATABASE_URI` is set in the environment it's invoked from (`payload.config.ts`
line 63: `connectionString: process.env['DATABASE_URI'] ?? ''`). There is no
`--dry-run`, no confirmation prompt, and no environment guard inside the
script itself — it will run against whatever database the connection
string in the environment points to, production included, without asking.

The script performs, **in this exact order**, against these collections:

| Order | Collection | Operation | Guarded by |
|---|---|---|---|
| 1 | `users` | `find` (role=admin) → `update` role **only if zero admins exist** | self-healing, no-ops if any admin exists (seed.ts:17-25) |
| 2 | `site-settings` (global) | `updateGlobal` (AR, then EN) — **unconditional, every run** | none — always overwrites these specific fields |
| 3 | `history-timeline` | `create` **only if the collection is empty** | `existingTimeline.docs.length === 0` (seed.ts:57) |
| 4 | `lawyers` | `find` by slug → `create` only if missing; never updates an existing lawyer doc | `if (existing.docs.length > 0) continue` (seed.ts:83) |
| 5 | `practice-areas` | `find` by slug → `create` if missing; if it exists, only patches `featured`/`order`/`status` fields, never title/overview/body | seed.ts:106-118 |
| 6 | `practice-areas` (9 specific slugs only) | `update` — force-resyncs `summary`/`overview`/`whoWeHelp`/`legalIssuesCovered`/`howWeAssist` **every run** | hardcoded `contentResyncSlugs` allowlist (seed.ts:171-181) — only those 9 slugs, nothing else |
| 7 | `industries` | `find` by slug → `create` if missing; if exists, only patches `status` | seed.ts:218-223 |
| 8 | `articles` | `find` by slug → `create` if missing; if exists, **updates title/category/excerpt/body every run** (AR+EN), plus `status`/`legalReviewer`/`lastReviewedDate` only if not already published | seed.ts:264-299 |
| 9 | `faqs` (6 hardcoded AR question strings) | `delete` if an exact AR-text match exists | `retiredFaqQuestionsAr` list, data.ts:1498-1505 |
| 10 | `faqs` (all faqs in data.ts) | `find` by exact AR question text → `create` if missing; if exists, only patches `status`/`relatedPracticeArea` | seed.ts:366-374 |

Collections it **never touches at all**: `media`, `consultation-submissions`
(the contact-form collection), `pages`, `redirects`, `rate-limit-entries`.
There is no "reviews"/"testimonials" collection in this codebase
(`src/collections/` — confirmed by listing: `Articles.ts`,
`ConsultationSubmissions.ts`, `FAQs.ts`, `HistoryTimeline.ts`,
`Industries.ts`, `Lawyers.ts`, `Media.ts`, `Pages.ts`, `PracticeAreas.ts`,
`RateLimitEntries.ts`, `Redirects.ts`, `Users.ts`).

---

## Answers to the 10 questions

### 1. Is the seed idempotent?

**Mostly yes, per-record, but not side-effect-free.** Every collection loop
does a `find`-by-slug-or-text check before deciding create vs. update —
there is no blind `create` that would throw or duplicate on a second run.
Running it twice in a row produces the same end state for data. However,
it is **not a no-op on a second run**: the `articles` loop (step 8) and the
`contentResyncSlugs` loop (step 6) **unconditionally re-write** content
fields on every single run, for every existing article and for 9 specific
practice areas — not just the new ones. This matters because `Articles.ts`
has an `afterChange` hook (`src/collections/Articles.ts:24-30`) that fires
an IndexNow ping on every save where `status === 'published'`. Re-running
seed **re-pings IndexNow for every one of the ~17 existing published
articles**, not just the 3 new ones, every time. Harmless (fire-and-forget,
Bing-only, no DB effect) but not nothing.

### 2. Does it use create, update, upsert, delete, truncate, reset, drop, or overwrite operations?

`create` and `update` (via Payload's Local API) — yes, extensively.
`delete` — yes, but only in one place: step 9, the `retiredFaqQuestionsAr`
loop (seed.ts:330-340), and only for FAQs whose **AR question text
exactly matches one of 6 hardcoded strings**. No `truncate`, `reset`, or
`drop` of any kind appears anywhere in `seed.ts`, `data.ts`, or
`payload.config.ts` — confirmed by grep (`grep -n "delete\|drop\|truncate\|reset" src/seed/seed.ts` returns only the one FAQ-delete call and an unrelated code comment using the word "dropped"). There is no raw SQL anywhere in the seed path; every operation goes through Payload's Local API (`payload.create`/`payload.update`/`payload.delete`/`payload.find`/`payload.updateGlobal`), which applies the same access-control and validation logic as the admin UI.

### 3. Can running it again modify or delete existing production data?

Broken out by the categories asked:

- **Articles**: existing articles' `title`/`excerpt`/`body` (AR+EN) **are
  overwritten on every run** to match `data.ts` exactly (seed.ts:271-291).
  This is intentional, documented behavior (the comment at seed.ts:265-270
  explicitly says content fixes are meant to go live this way) — but it
  means **any edit made directly in the CMS admin UI to an existing
  seeded article's title/excerpt/body, that isn't also reflected in
  `data.ts`, would be silently overwritten back to `data.ts`'s version**
  on the next seed run. No articles are deleted.
- **Users**: never deleted. Only mutated if zero admins exist anywhere
  (seed.ts:17-25), in which case the oldest account is promoted to admin —
  a one-time self-healing step, not something that touches `hodaharraz1@gmail.com`'s
  account if it's already an admin (which it must already be, since it's
  resolved as `legalReviewer` on the existing 18 live articles per
  `LEGAL_SOURCE_REGISTER.md`).
- **Admins**: see above — not demoted or altered unless literally zero
  admins exist.
- **Media**: never referenced anywhere in `seed.ts`. Zero risk.
- **Reviews**: no such collection exists in this codebase.
- **Contact submissions** (`consultation-submissions`): never referenced
  anywhere in `seed.ts`. Zero risk.
- **CMS content generally**: practice areas and industries follow the
  same pattern as articles — existing docs are either left alone (most
  fields) or selectively patched (`featured`/`order`/`status`, or for the
  9-slug resync allowlist, their full body text) — never deleted.
- **legalReviewer relations**: only ever *set* (to the `hodaharraz1@gmail.com`
  account's ID), never cleared or reassigned to a different reviewer. An
  article already `status: 'published'` keeps whatever `legalReviewer` it
  already has — the reviewer is only (re-)set at the moment status
  transitions to `published` (seed.ts:292-298, 310).
- **IDs**: Payload/Postgres auto-generated IDs are never touched by the
  seed — `find`-then-`update` always targets the existing doc's own `id`.
- **Slugs**: article/practice-area/industry/lawyer slugs are only ever
  set at `create` time; the update paths never write a `slug` field, so an
  existing doc's slug cannot be changed by re-running seed.
- **Timestamps**: `publishDate` is only set at creation (seed.ts:311).
  `lastReviewedDate` is only updated at the moment of first publish
  (seed.ts:296), not on every content resync. Payload's own
  `createdAt`/`updatedAt` will of course update on any `update` call, as
  they do for any CMS edit.
- **SEO metadata**: `seedField`/meta title/description are not referenced
  anywhere in `seed.ts` — the SEO field (`src/collections/fields/seo.ts`,
  referenced from `Articles.ts`) isn't touched by this script at all,
  seeded or not.

### 4. Does it recreate the database or any collection?

No. There is no schema DDL in `seed.ts` at all — it only calls Payload's
Local API, which issues ordinary parameterized INSERT/UPDATE statements
against collections whose table schema is already defined by the
**migrations** in `src/migrations/` (`20260922_145839_initial.ts`,
`20260922_191449_add_practice_area_order.ts`,
`20260923_192527_add_rate_limit_entries.ts`), not by the seed script.
One relevant caveat worth flagging explicitly: Payload's Postgres adapter
runs a **dev-mode schema auto-push whenever `NODE_ENV` isn't `"production"`**
— this is documented in this exact codebase's own comment
(`src/collections/RateLimitEntries.ts:7-11`): *"Payload's dev-mode schema
auto-push (active whenever NODE_ENV isn't 'production') silently dropped
[a table] on every local getPayload() call."* This is not something
`seed.ts` does deliberately — it's a property of how `getPayload({config})`
behaves depending on `NODE_ENV` at the moment the script runs. **This
means the safety of running `npm run seed` depends on `NODE_ENV=production`
being set in whatever environment actually executes it** — which the
2026-09-28 precedent (`vercel env pull` for production credentials)
would have provided, since Vercel's pulled production env sets
`NODE_ENV=production`. This should be explicitly re-confirmed, not assumed,
before the next run (see recommendation below).

### 5. Does it delete records that are not present in data.ts?

Only in one narrow, pre-existing, already-deployed case: the 6 hardcoded
`retiredFaqQuestionsAr` strings (data.ts:1498-1505) are deleted from the
`faqs` collection **if an FAQ with that exact Arabic question text
exists** — this logic predates this session and is unrelated to the 3
new articles. Outside of that one FAQ-cleanup list, nothing else is
deleted. A practice area, industry, lawyer, or article that exists in
production but has been *removed* from `data.ts` would simply be left
alone forever — the seed only ever looks up what's *in* `data.ts` and
acts on those slugs; it never enumerates "what's in the DB but not in the
file" for articles/practice-areas/industries/lawyers.

### 6. What happens if an article slug already exists?

It goes through the `existingArticleDoc` branch (seed.ts:264-299): title,
category, excerpt, and body are overwritten (AR+EN) to match `data.ts`,
and `status`/`legalReviewer`/`lastReviewedDate` are only touched if the
doc isn't already `published`. It is **not** re-created, and its `id` and
`slug` are untouched. The `slug` field also has `unique: true` at the
schema level (`src/collections/Articles.ts`), so even a hypothetical bug
that tried to `create` a second doc with the same slug would be rejected
by the database — but that code path doesn't exist here since the
`find`-first check already prevents it from being attempted.

### 7. What happens to the existing 176 sitemap URLs?

Nothing — none of them are removed or altered in a way that would change
their URL, slug, or indexability. The 3 new articles, once actually
created in the DB by a seed run, would appear as 6 new sitemap entries (AR
+ EN), taking the count from 176 to 182 — confirmed by the identical
pattern recorded for the 2026-09-28 publication ("sitemap grew from 138
to 162 URLs (12 × 2 locales)" — `LEGAL_SOURCE_REGISTER.md` line 12).

### 8. Will running it insert ONLY missing seed content, or re-process existing seeded content?

**Re-process.** This is the central finding of this audit. Every run
re-writes `site-settings` (unconditionally), re-syncs the 9
`contentResyncSlugs` practice areas' full body content (unconditionally),
and re-writes every existing article's title/excerpt/body (unconditionally,
step 8) — regardless of whether that content actually changed since the
last run. It does **not** insert only the missing 3 articles; it touches
essentially the entire seeded content surface (~17 existing articles, 9
practice areas, all FAQs) on every single invocation. Nothing in that
reprocessing is destructive (per Q3), but it is a much larger blast
radius than "publish these 3 articles."

### 9. Is there any risk to real production data created after the original seed?

Low, but not zero, and it's a *content-overwrite* risk rather than a
*deletion* risk: if a staff member has, since 2026-09-28, edited any
existing seeded article's title, excerpt, or body **directly in the CMS
admin UI** (bypassing the `data.ts` → draft-file → `LEGAL_SOURCE_REGISTER.md`
→ re-seed workflow this project documents as the required process), that
admin-UI edit would be **silently overwritten back** to whatever `data.ts`
currently says, the next time anyone runs `npm run seed` for any reason —
including this one. This is a pre-existing property of the script, not
something introduced for the 3 new articles, but it is a real answer to
this question and should be flagged to whoever runs it: if any live
article's content has been hand-edited since the last seed, check that
`data.ts` still matches before running. Content in collections the seed
never touches (media, consultation submissions, SEO metadata) carries no
such risk at all.

### 10. Is there any transaction/rollback protection if the seed fails halfway?

**No overarching transaction.** Every `payload.create`/`payload.update`/
`payload.delete`/`payload.updateGlobal` call in `seed.ts` is issued
independently — none of them pass a shared `req`/transaction context, and
there is no `try/catch` wrapping groups of operations together. The only
error handling is the top-level `run().catch(...)` at the bottom of the
file (seed.ts:480-483), which logs the error and `process.exit(1)`s. If
the script fails partway through — say, on article #2 of 3 — whatever
succeeded before the failure (article #1, any practice-area resyncs that
already ran, etc.) **stays committed**; nothing rolls back. Re-running the
script after fixing the failure is safe (per Q1's idempotency finding) and
will simply pick up wherever it left off, since every operation re-checks
existence first.

---

## Verdict

**C) DO NOT RUN THE FULL SEED AGAINST PRODUCTION for this publication.**

To be precise about *why*, since the two most likely verdicts could be
confused here: **the full seed is not destructive.** There is no
truncate/drop, no unconditional delete outside one narrow pre-existing
FAQ-cleanup list, and every create/update path is idempotent and
guarded by an existence check. If forced to choose only between "safe" and
"unsafe," it leans safe.

But that is the wrong question for *this* task. You asked for a mechanism
that will "create/update only the 3 approved articles" and "preserve all
unrelated production records" with a narrow, auditable blast radius. The
full seed does not do that — by design, every run re-touches ~17 existing
articles' full content, 9 practice areas' full content, and every FAQ,
none of which needs to change to publish these 3 articles. That is a
disproportionate blast radius for a task this specific, it multiplies the
things a reviewer would need to check after the run (vs. 3 articles + 5
additive link paragraphs), and it fires IndexNow pings for ~17 unrelated
URLs for no reason. It is also where the `NODE_ENV` schema-push caveat
(Q4) and the admin-UI-overwrite caveat (Q9) both live — risks that a
narrower script simply wouldn't carry, because it wouldn't touch those
other 17 articles or 9 practice areas at all.

## Recommended publication mechanism

**Option 2 from the requested hierarchy: a dedicated, idempotent
publication script scoped to exactly these 3 articles and their 5
additive link-paragraph updates**, reusing Payload's Local API (the same
API `seed.ts` already uses — this is not a raw-SQL alternative, just a
narrower caller of the same, already-trusted API).

Design (not yet implemented — no code was written for this audit, per
your instruction):

- **Input**: a small, separate array — either a trimmed copy of just the
  3 new article objects plus the 5 existing docs' link-paragraph fields
  (extracted from the current `data.ts`), or by importing `articles` from
  `data.ts` and filtering to exactly the 3 new slugs for the create/update
  step, with the 5 existing-doc link additions as explicit, separate,
  named operations — not a loop over the full array.
- **Articles step**: for each of the 3 slugs, `payload.find` by slug
  first. If found, log a clear "already exists — would update to the
  approved text, no new doc created" message (idempotent, matches the
  existing article behavior) rather than silently proceeding, so a
  duplicate-slug situation is visible, not just handled. If not found,
  `create` (AR) then `update` (EN), exactly as `seed.ts` already does,
  reusing its `richTextFromParagraphs` helper and resolving `legalReviewer`
  the same way (`find` by `hodaharraz1@gmail.com`, fail loudly if not
  found — never fall back to inventing or guessing a reviewer).
- **Link-paragraph step**: for each of the 5 existing docs
  (`civil-law`, `real-estate-property-registration`,
  `property-possession-disputes-egypt`, `common-inheritance-disputes-egypt`,
  `what-is-civil-lawsuit`), `payload.find` by slug, diff its current live
  field against the new value from `data.ts`, and only `update` if it
  actually differs — log a skip instead of a silent no-op write if it
  already matches (covers being re-run after a partial success).
- **Fail-safe behavior**: wrap each of the 3 article operations and 5
  link updates in its own `try/catch`; log which of the 8 succeeded and
  which failed, and exit non-zero if any failed, without attempting the
  remaining ones blindly — same per-step idempotency as today's seed, but
  scoped, so a partial failure is easy to reason about (8 named steps, not
  "somewhere in a loop of 30+").
- **Duplicate-slug detection**: explicit, per the "Articles step" above —
  never silently treated as success.
- **Secrets**: never log `DATABASE_URI`, `PAYLOAD_SECRET`, or any
  connection string; only log slugs, doc IDs, and success/failure per
  step (matches how `seed.ts` already logs — it never prints the
  connection string either).
- **Dry-run**: practical and recommended — add a `--dry-run` flag that
  runs every `find`/diff step and prints exactly what it *would* create or
  update, skipping every `create`/`update` call. Since every write
  decision in this design is already preceded by a `find` and an explicit
  diff, adding a dry-run mode is a small, low-risk addition (gate the
  final `payload.create`/`payload.update` calls behind `if (!dryRun)`),
  not a parallel code path that could drift from the real one.
- **Explicitly not in scope for this script**: `site-settings`,
  `history-timeline`, `lawyers`, the other 6 practice areas in
  `contentResyncSlugs`, industries, and FAQs — none of those need to
  change for this publication, so this script would not import or touch
  them at all.

This is a **new, separate script** (e.g. `src/seed/publish-civil-phase-2.ts`,
run via its own `tsx` invocation) rather than a modification to `seed.ts` —
per your instruction not to modify the existing seed to "make it safe,"
and because `seed.ts`'s current behavior (full reprocessing) is
intentional, documented, existing behavior relied on by the 2026-09-28
precedent; narrowing it in place would change what every *future* full
seed run does, which is a separate decision from today's publication.

**Before running anything against production — whichever mechanism is
ultimately used** — explicitly confirm `NODE_ENV=production` is set in
whatever shell/environment executes it (per Q4), and confirm no article
in `src/seed/data.ts`'s existing 17 entries has been hand-edited in the
CMS admin UI since the last seed without a matching `data.ts` update (per
Q9), since either full seed or this narrower script would overwrite such
an edit back to `data.ts`'s current text for any of the 3 slugs it
touches (this narrower script only for those 3, not all 17).

I have not written `src/seed/publish-civil-phase-2.ts` or any other code.
Tell me if you'd like me to implement this design — as its own new file,
not a change to `seed.ts` — so it can be reviewed before anyone runs it
against production.
