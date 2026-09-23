# Deployment

**Live now**: https://al-harraz.vercel.app — Vercel (free tier) + Neon Postgres (free tier, via Vercel's marketplace integration). The project's build command is `npx payload migrate && npm run seed && next build`, so every deploy runs migrations and the idempotent seed before building. Not yet on a custom domain — see `DOMAIN_MIGRATION_PLAN.md`.

## Architecture (as deployed)

- **App hosting**: Vercel — first-party Next.js support, handles the Turbopack build and ISR out of the box.
- **Database**: Neon Postgres, connected via Vercel Storage.
- **Media storage**: no lawyer/office photography exists yet to upload (see `CONTENT_REQUIRED.md`), so this hasn't been exercised in production. Payload's local `media/` upload dir does **not** survive redeploys on Vercel's ephemeral filesystem — before any real image is uploaded through the CMS, add `@payloadcms/storage-s3` (or an equivalent adapter) pointing at S3/R2/Vercel Blob. **Not yet configured.**
- **CDN**: Vercel's edge network — no extra configuration needed for this app.
- **Content backups**: daily Vercel Blob export of public content (`src/app/(frontend)/api/cron/backup/route.ts`) plus Neon's own point-in-time recovery — see `BACKUPS.md`.

## Environments

Per brief §51: separate Development / Staging / Production.

- **Staging** must be password-protected or set to `noindex` site-wide (e.g. via Basic Auth at the edge, or a global `X-Robots-Tag: noindex` on the staging host) — this repo's `robots.ts` only controls the production robots.txt; staging needs its own indexing block at the hosting/edge layer, not in application code, so a misconfigured env var can't accidentally leak it into production.
- **Production** environment variables (see `.env.example`): `DATABASE_URI`, `PAYLOAD_SECRET` (unique per environment, never shared with dev), `NEXT_PUBLIC_SITE_URL` (the real domain), `NEXT_PUBLIC_FIRM_PHONE`, `NEXT_PUBLIC_FIRM_WHATSAPP`, `NEXT_PUBLIC_GA4_ID` (once analytics is approved).

## Deploy Steps (once a domain + hosting + managed Postgres exist)

1. Provision the managed Postgres instance; set `DATABASE_URI` in the host's env config.
2. Generate a fresh `PAYLOAD_SECRET` (`openssl rand -base64 48`) — do not reuse the local dev value.
3. Run migrations against the production database: `npm run payload migrate` (this repo already has `src/migrations/20260922_134849_initial.ts` covering the current schema — review it before applying to production, and generate a new migration with `npm run payload migrate:create <name>` for any schema change instead of relying on dev-mode auto-push).
4. `npm run build` on the host (or let the host run it).
5. Open `/admin` on the production URL and create the first admin account immediately — don't leave this step for later.
6. Run the seed script **only if the production database is genuinely empty** (`npm run seed`) — it's idempotent (skips anything that already exists by slug) but is meant for initial setup, not repeated runs against live edited content.
7. Point DNS at the host; verify HTTPS/HSTS actually takes effect (see `SECURITY.md`).
8. Submit the production domain + sitemap to Google Search Console (see `POST_LAUNCH_PLAN.md`).

## Backups

- **Database**: rely on the managed Postgres provider's automated backups/point-in-time recovery — confirm retention window and test a real restore before go-live (not yet tested in this session, since no production database exists yet).
- **Media**: whichever object storage adapter is configured (see above) should have versioning/lifecycle rules matching the provider's own backup guarantees.
- **CMS content**: Payload's versioning (`versions: { drafts: true }`) is enabled on all public-facing collections, which gives in-app rollback for content edits — this is not a substitute for a real database backup.

## Rollback

Standard for the chosen host (e.g. Vercel's instant rollback to a previous deployment). Database migrations should be written to be forward-only where practical; a schema rollback needs a corresponding down-migration reviewed by hand before running (`payload migrate:down`).

## Estimated Monthly Infrastructure Cost (indicative, not quoted)

- Hosting (Vercel Pro or equivalent Node host): ~$20–25/mo for a low-traffic site.
- Managed Postgres (smallest production tier): ~$15–25/mo.
- Object storage for media: single-digit dollars at this scale.
- Domain: ~$10–15/yr.

These are rough, unverified planning numbers — get real quotes from the chosen providers before committing.
