# IndexNow Setup

[IndexNow](https://www.indexnow.org/) lets the site push a changed URL directly into the crawl queue of participating search engines (Bing, Yandex, Seznam, Naver, and others), instead of waiting for their own crawlers to notice the change. **Google does not participate in IndexNow** — this has no effect on Google indexing, which is handled separately via Search Console/sitemap.

## Key

- Key: `78b8835f0c80979083412bc56e66c97c`
- Key file: `public/78b8835f0c80979083412bc56e66c97c.txt` → served at `https://al-harraz.vercel.app/78b8835f0c80979083412bc56e66c97c.txt`
- IndexNow verifies a submission by checking that this file is reachable at the submitted host and contains exactly the key — this proves ownership without a separate account/login.

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
