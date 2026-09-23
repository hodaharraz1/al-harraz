# Redirect Map

## Current state

The `redirects` collection exists in the CMS (`src/collections/Redirects.ts` — `fromPath`, `toPath`, `statusCode`, `active`) but is **currently empty** and **not consulted by any code path**. Its own admin description used to claim it was "consulted by middleware" — that was false (a documentation bug, corrected this session). No URL has moved or been retired yet, so this has had no real-world effect.

## Why it isn't wired up yet

Implementing this properly has a real design decision to make: `src/proxy.ts` now defaults to the Node.js runtime in Next.js 16 (previously edge-only), so a Payload Local API lookup inside proxy *would* technically work — but running a full CMS query on **every single request** (including every asset-adjacent navigation) is an untested performance cost against a currently-empty table with zero business need. Shipping that risk into a live, working site without the ability to load-test it in this environment isn't worth it yet.

## Recommended implementation, when it's actually needed (i.e., the first time a real URL is renamed or retired)

Prefer a **404-path lookup**, not a per-request middleware check:

1. In the `[locale]/[...slug]` catch points that currently call `notFound()` (practice-area, industry, article, and lawyer detail pages), query the `redirects` collection for a matching `fromPath` **only on the miss path** — this means the DB is hit only for genuinely-unmatched URLs, not every request.
2. On a match, use `redirect()` (returns a 307) for `statusCode: '302'` entries and `permanentRedirect()` (returns a 308) for `statusCode: '301'` entries — Next.js doesn't let a Server Component set an exact 301/302, but 307/308 are the modern, correctly-treated-as-permanent-or-temporary equivalents search engines already understand.
3. Add a small unit test asserting a known `fromPath` redirects and an unknown one still 404s.

## Do not

- Do not implement a blanket "check every request against the DB" pattern in `proxy.ts` — it adds latency to every page load for a feature with zero current entries.
- Do not silently drop the misleading collection description again — if this doc's status changes, update the collection's `admin.description` to match.
