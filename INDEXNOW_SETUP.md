# IndexNow Setup

[IndexNow](https://www.indexnow.org/) lets the site push a changed URL directly into the crawl queue of participating search engines (Bing, Yandex, Seznam, Naver, and others), instead of waiting for their own crawlers to notice the change. **Google does not participate in IndexNow** — this has no effect on Google indexing, which is handled separately via Search Console/sitemap.

## Key

- Key: `78b8835f0c80979083412bc56e66c97c`
- Key file: `public/78b8835f0c80979083412bc56e66c97c.txt` — a static file, so it's served at whatever host the deployment answers for. Now that `alharrazlaw.com` points at the same deployment, it's reachable at both `https://alharrazlaw.com/78b8835f0c80979083412bc56e66c97c.txt` and the old `al-harraz.vercel.app` URL — no key regeneration needed for the domain migration, since IndexNow verifies per-submission `host`, not a fixed registered domain.
- IndexNow verifies a submission by checking that this file is reachable at the submitted host and contains exactly the key — this proves ownership without a separate account/login.
- Submissions are host-scoped: once `NEXT_PUBLIC_SITE_URL` is updated to `https://alharrazlaw.com` (see `OLD_DOMAIN_MIGRATION.md`), `submitToIndexNow()`'s `host` value automatically becomes `alharrazlaw.com` — no code change needed here, since it's derived from `siteConfig.siteUrl` like everything else. See `INDEXNOW_DOMAIN_MIGRATION.md` for the post-cutover re-submission step.

## Endpoint

`POST https://api.indexnow.org/indexnow` with `{ host, key, keyLocation, urlList }` — submitting to this generic endpoint is picked up by every participating engine, no per-engine registration needed.

## Automatic submission

`src/lib/indexnow.ts` exports `submitToIndexNow()` / `submitSlugToIndexNow()`. Wired into `afterChange` hooks on the **Articles** and **PracticeAreas** collections (`src/collections/Articles.ts`, `src/collections/PracticeAreas.ts`): any save that leaves a document with `status: 'published'` pings IndexNow for both the `/ar/` and `/en/` URLs. Fire-and-forget — a failed ping is logged but never blocks or fails the CMS save.

Not yet wired into Industries, FAQs, or Pages — those change far less often; add the same pattern there if that becomes worth doing.

## One-time bulk submission

Run once to push everything already live (new collections/pages after this only need the automatic hook above):

```bash
npx tsx scripts/submit-all-to-indexnow.ts
```
