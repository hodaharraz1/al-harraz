# Backups

Two separate mechanisms cover two different kinds of data. Neither requires
action from the firm — both are already live.

## 1. Database-level: Neon point-in-time recovery

The Postgres database (Neon, connected via Vercel Storage) keeps a rolling
history of every write, independent of anything in this codebase. This is
what protects **all** data, including `consultation-submissions` (client
names, phone numbers, case descriptions) — the one collection deliberately
kept out of mechanism #2 below, since it's real client PII.

To restore: open the Neon project from Vercel → Storage → the Postgres
store → "Restore" (or "Branches" → create a branch from a past timestamp),
pick a point in time, and either restore in place or point `DATABASE_URI`
at the new branch temporarily to pull data out.

**Caveat, stated plainly:** exactly how many days of history the *free*
Neon tier retains was not independently verified in this codebase — Neon's
own dashboard (Project → Settings → Restore) is the source of truth, not
this document. If continuous history beyond that window matters, that's a
Neon plan upgrade, not a code change.

## 2. Content-level: daily JSON export to Vercel Blob

`src/app/(frontend)/api/cron/backup/route.ts`, scheduled daily at 02:00 UTC
via `vercel.json`. On each run it:

- Exports every document from `practice-areas`, `industries`, `lawyers`,
  `articles`, `faqs`, `history-timeline`, `redirects`, `pages`, and the
  `site-settings` global to a single JSON file.
- Uploads it to the `al-harraz-backups` Vercel Blob store as
  `backups/al-harraz-YYYY-MM-DD.json` (overwriting that day's file if the
  cron re-runs).
- Deletes any backup file older than 30 days.
- Requires the `CRON_SECRET` environment variable to match the
  `Authorization: Bearer …` header Vercel's cron scheduler sends
  automatically — calling the endpoint without it returns 401.

**Why `consultation-submissions` isn't in this export:** Vercel Blob on
this plan only serves files from a public URL (no authenticated/private
blob access available). A JSON export of client leads sitting behind a
guessable-if-leaked public URL is not an acceptable trade for a backup —
that data stays inside the access-controlled database and is covered by
mechanism #1 instead.

### Restoring from a JSON backup

1. Vercel dashboard → Storage → `al-harraz-backups` → find the dated file,
   or list it with the Vercel API (`GET /v1/storage/stores/{storeId}` or
   the Blob `list()` API) and download it.
2. The file is one JSON object keyed by collection slug, each an array of
   full Payload documents (as returned by `payload.find`, `depth: 0`).
3. Re-importing is a manual step via Payload's local API or admin UI — write
   a one-off script that loops the array and calls `payload.create`/
   `payload.update` per document (matching on `slug` to avoid duplicates),
   the same shape `src/seed/seed.ts` already uses.

This mechanism exists as a secondary, portable safety net (a copy of
content outside Neon entirely) — mechanism #1 is the primary, more complete
one and covers this same data too.
