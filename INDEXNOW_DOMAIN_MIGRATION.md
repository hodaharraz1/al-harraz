# IndexNow Domain Migration

## Status: PARTIAL — ready, pending the same env-var update as everything else

## Verification key: no change needed

The IndexNow key file (`public/78b8835f0c80979083412bc56e66c97c.txt`) is a static file served by the same Next.js deployment regardless of which domain the request came in on. Live-checked during this migration:

```
https://alharrazlaw.com/78b8835f0c80979083412bc56e66c97c.txt        → 200, correct key
https://al-harraz.vercel.app/78b8835f0c80979083412bc56e66c97c.txt   → 200, correct key (unchanged)
```

Both are reachable today. IndexNow verifies ownership per-submission (the `host` field in each request must match a reachable key file at that host) — it does not require a single "registered" domain, so no new key or re-verification step is needed for the migration itself.

## Submission host: derives from `NEXT_PUBLIC_SITE_URL`, no code change

`src/lib/indexnow.ts`'s `submitToIndexNow()` builds its `host` and `keyLocation` fields from `siteConfig.siteUrl` — the same central value everything else in this migration depends on. Once that env var is updated to `https://alharrazlaw.com`:
- The `afterChange` hooks on Articles and PracticeAreas (already wired, unchanged by this migration) will automatically submit `alharrazlaw.com` URLs on every future publish.
- The bulk-submission script (`scripts/submit-all-to-indexnow.ts`) will submit `alharrazlaw.com` URLs the next time it's run.

## What remains to actually do (after the env var update + redeploy)

1. Re-run the bulk submission against the new domain, to push every currently-live canonical URL under the new host into Bing/Yandex's crawl queue proactively:
   ```bash
   NEXT_PUBLIC_SITE_URL=https://alharrazlaw.com npx tsx scripts/submit-all-to-indexnow.ts
   ```
   (Or simply let it run with the env var already updated in the deployed environment — the script reads the same variable.)
2. Verify the submission response is 200/202 (success codes per IndexNow's own documentation), not the 403 rate-limit response seen once during this session's earlier seed run (a transient rate-limit on a single automatic hook call, not a sign of misconfiguration — the manual bulk run uses a single batched request, not one per document).
3. Spot-check a handful of URLs from the response to confirm they use `alharrazlaw.com`, not the old host.

This step is sequenced *after* the env var update in `OLD_DOMAIN_MIGRATION.md`, since running it before would just re-submit the old domain's URLs again — not useful, and not what this migration is for.

**Do not submit the old `al-harraz.vercel.app` URLs as canonical content going forward** — per the directive's own instruction. Once the redirect in `src/proxy.ts` is live (see `OLD_DOMAIN_MIGRATION.md`), the old URLs will 308 to the new ones anyway, so there is nothing further to do about them on the IndexNow side beyond letting that redirect exist.
