# Project Handoff — Al Harraz Law Firm Website

This document orients an engineer picking up this project cold. For deeper detail on any topic, follow the references below rather than re-deriving them — the project has extensive existing documentation (see the full `.md` file list in the repo root).

## Live site

- Production: https://al-harraz.vercel.app (not yet on a custom domain — see `DOMAIN_MIGRATION_PLAN.md`)
- Admin/CMS: https://al-harraz.vercel.app/admin
- Repo: `hodaharraz1/al-harraz` on GitHub, this snapshot is branch `claude/al-harraz-law-platform-oiq2y3`.

## Tech stack

| Layer | Choice | Version (pinned in `package.json`) |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | `16.3.5` |
| UI library | React | `19.3.0` |
| Language | TypeScript (strict) | via `typescript` devDependency |
| CMS | Payload CMS 3 | `3.90.1` (`@payloadcms/next`, `@payloadcms/db-postgres`, `@payloadcms/richtext-lexical`) |
| Database | Postgres (Neon, serverless, connected via Vercel Storage in production) | via `pg` / `@payloadcms/db-postgres` |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens, no `tailwind.config.js`) | `@tailwindcss/postcss ^4.3.3` |
| Media processing | `sharp` | `^0.35.4` |
| Validation | `zod` | `^3.23.8` |
| File storage (backups) | `@vercel/blob` | `^2.8.0` |
| Hosting | Vercel (free tier) | — |
| Testing | Vitest (unit) + Playwright (e2e) | `^2.1.9` / `^1.51.1` |

**Important — read before writing any code**: this Next.js version has real breaking changes from what an LLM's training data assumes (e.g. `middleware.ts` was renamed to `proxy.ts` in v16, and Proxy now defaults to the Node.js runtime instead of edge-only). See `AGENTS.md`/`CLAUDE.md` at the repo root — they point at `node_modules/next/dist/docs/` as the source of truth for this exact installed version. Always check there before assuming API behavior from memory.

## Deployment architecture

- **Vercel project**, connected to the GitHub repo. Build command: `npx payload migrate && npm run seed && next build` — every deploy runs pending DB migrations and the idempotent seed script *before* building, so the production database is always schema-current and never empty.
- **Neon Postgres**, provisioned via Vercel's Storage tab (Neon marketplace integration), connected with `DATABASE_URI`.
- **Vercel Blob** store (`al-harraz-backups`), used only by the daily backup cron (see below) — not used for media uploads yet (no S3/Blob storage adapter is configured for Payload's `Media` collection; see `DEPLOYMENT.md`'s note on this being untested since no real photography has been uploaded yet).
- **Vercel Cron** (`vercel.json`) triggers `GET /api/cron/backup` daily at 02:00 UTC.
- Full detail: `DEPLOYMENT.md`, `BACKUPS.md`.

## Where consultation form data lives

Submitted via the public form at `/[locale]/consultation` → client component `src/components/forms/ConsultationForm.tsx` → `POST /api/consultation` (`src/app/(frontend)/api/consultation/route.ts`) → validated with the `consultationSchema` Zod schema (`src/lib/validation.ts`) → rate-limited (`src/lib/rate-limit.ts`, in-memory, per-IP) → written via Payload's Local API with `overrideAccess: true` into the **`consultation-submissions`** collection (`src/collections/ConsultationSubmissions.ts`). That collection's own access control blocks public REST/GraphQL writes (`create: () => false`) and restricts reads to staff (`read: isStaff`) — the only legitimate write path is the server-side route above. View submissions at `/admin` → Consultation Submissions.

**Known-fixed bug** (see `FINAL_TECHNICAL_AUDIT.md`'s headline finding): a `<select>` whose only selected option is `disabled` (the "Legal Area" field's unset placeholder) submits `FormData` as `null`, not `''` — this used to silently fail server-side validation, meaning a real visitor's enquiry could be lost with no error surfaced to them or to staff. Fixed at both the client (normalizes `null` → `''` before sending) and the schema (`.nullable()` added, so the fix holds even if another code path reintroduces a `null`). Regression test: `tests/unit/validation.test.ts`.

## How Arabic/English localization works

Two independent-but-parallel systems:

1. **UI strings** (nav labels, buttons, static copy): `src/dictionaries/ar.json` and `en.json`, loaded via `src/lib/dictionary.ts`'s `getDictionary(locale)`. Plain JSON, no i18n library.
2. **CMS content** (practice areas, industries, articles, FAQs, lawyers, site settings): Payload's built-in localization feature (`localization` block in `payload.config.ts` — `ar` is `defaultLocale`, `fallback: false`, meaning a missing English translation returns empty rather than silently falling back to Arabic). Every `payload.find()`/`payload.create()` call in the app passes `locale` explicitly.

**Routing**: every page lives under `src/app/(frontend)/[locale]/...` — locale is a first-class route segment, not a query param or cookie-only scheme. `src/proxy.ts` (the Next.js 16 successor to `middleware.ts` — see the breaking-change note above) redirects a bare `/` to `/ar` by default (Arabic-first, deliberately **not** based on the browser's `Accept-Language` header — see the comment in `proxy.ts` for why), and remembers a manual language switch via a `locale` cookie for one year. `src/lib/i18n.ts` defines the `Locale` type, `locales` array, and `isLocale()` guard used everywhere for type-narrowing an unknown route param.

## How the sitemap is generated

`src/app/(frontend)/sitemap.ts` — a Next.js `MetadataRoute.Sitemap` route. Combines a hardcoded `STATIC_PATHS` array (about, team, practice-areas index, etc.) with dynamically-fetched published documents (practice areas, industries, lawyers, articles), and emits one `<url>` entry per path **per locale**, each with `alternates.languages` set to both locales — so hreflang and the sitemap are generated from the same underlying path list, they can't drift apart. Served at `/sitemap.xml`.

## How robots.txt is generated

`src/app/robots.ts` — a Next.js `MetadataRoute.Robots` route. Allows `/`, disallows `/admin` and `/api`, points at `/sitemap.xml`. `/admin` additionally gets a hard `X-Robots-Tag: noindex, nofollow` response header set in `next.config.ts`, independent of robots.txt, as a second layer.

## How metadata / canonical / hreflang are generated

One shared helper: `buildMetadata()` in `src/lib/seo.ts`. Every page's `generateMetadata()` export calls it with `{ locale, path, title, description }` and gets back a full Next.js `Metadata` object: self-referential canonical, reciprocal `hreflang` (`ar`/`en`/`x-default → ar`), Open Graph, and Twitter card tags — all derived from the same `path` value, so there's no code path where one locale's page could exist without its alternate-language link. Structured data (JSON-LD: `LegalService`/`Organization`, `WebSite`, `BreadcrumbList`, `Person`, `Article`, `FAQPage`) is separate, in `src/lib/structured-data.ts`, rendered via the `<JsonLd>` component per-page.

## Where content types are defined

| Content | Payload collection (schema) | Seed data (initial/reference content) |
|---|---|---|
| Practice Areas | `src/collections/PracticeAreas.ts` | `practiceAreas` array in `src/seed/data.ts` (42 entries) |
| Industries | `src/collections/Industries.ts` | `industries` array in `src/seed/data.ts` (7 entries) |
| Team (Lawyers) | `src/collections/Lawyers.ts` | `namedLawyers` array inline in `src/seed/seed.ts` (only the 3 verified named lawyers — 12 more profiles are a real content gap, see `CONTENT_REQUIRED.md`) |
| Insights (Articles) | `src/collections/Articles.ts` (note: publishing without a `legalReviewer` set throws — enforced by a `beforeChange` hook, not just a UI convention) | `articles` array in `src/seed/data.ts` (6 entries) |
| FAQs | `src/collections/FAQs.ts` | `faqs` array in `src/seed/data.ts` (9 entries) |

`npm run seed` (`src/seed/seed.ts`) is idempotent — it finds-or-creates by slug (or by Arabic question text for FAQs, which have no slug field), so re-running it against a populated database is safe and is exactly what happens on every production deploy.

## What's still incomplete (real gaps, not fabricated to fill)

See `CONTENT_REQUIRED.md` for the full, current, actively-maintained list. Summary: no custom domain yet, no professional email yet, 12 of 15 lawyer profiles are unwritten (only the 3 named lawyers from the original brief exist), no real photography anywhere on the site (logo only), Facebook/social URLs not supplied, Google Business Profile claim status last known as "in progress, unconfirmed" (video verification step is done in person, outside this codebase), and the `redirects` CMS collection exists but has no code path consuming it yet (see `REDIRECT_MAP.md` for the reasoning and recommended implementation).

## Known issues (as of this handoff)

1. **Consultation form bug — already fixed** (see above and `FINAL_TECHNICAL_AUDIT.md`'s headline finding). Flagging here so a reviewing engineer knows to check the fix is still intact if they touch `ConsultationForm.tsx` or `validation.ts`.
2. **`redirects` collection is inert** — see `REDIRECT_MAP.md`. Not a bug (nothing has broken), but its own admin description used to claim behavior it didn't have; that's been corrected to state the true status.
3. **Two `npm audit` findings** (both moderate, both transitive, both in admin/build tooling only — never in code a site visitor's browser runs): `dompurify` via Payload admin's `monaco-editor`, and `esbuild`'s dev-server issue via `drizzle-kit`. See `DEPENDENCY_AUDIT.md` — no safe fix exists yet without an unvalidated major-version bump.
4. **No production Lighthouse/PageSpeed run has been done** — this development sandbox cannot reach the public internet from a headless browser (a pre-existing, documented environment limitation — see `TESTING.md`). Local/lab timing looked healthy (small bundle, fast local paint times), but that is not a substitute for real field data. Recommended next step for whoever has real network access.
5. **Media storage adapter not configured** — Payload's `Media` collection would currently store uploads to local disk, which does not persist across Vercel redeploys. Add `@payloadcms/storage-s3` (or equivalent) **before** the first real image is uploaded through the CMS.

## Running locally

```bash
npm install
cp .env.example .env   # fill in DATABASE_URI (a local Postgres instance) and PAYLOAD_SECRET at minimum
npm run dev             # http://localhost:3000
```

First run against an empty database: `npm run payload migrate` then `npm run seed` (or let `next dev` auto-push the schema in dev mode, then seed).

## Commands

```bash
npm run build       # production build (next build)
npm run start        # serve the production build (next start)
npm run dev            # dev server (Turbopack)
npm run lint             # ESLint (flat config, eslint .)
npm run typecheck         # tsc --noEmit
npm run test:unit          # Vitest — 24 tests
npm run test:e2e             # Playwright — 11 tests, needs a running server (see TESTING.md for the pre-installed-Chromium setup this sandbox uses)
npm run seed                   # idempotent content seed (src/seed/seed.ts)
npm run payload migrate:create <name>   # generate a new migration after a schema change
npm run payload migrate                  # apply pending migrations
```

## Where to read more

- `ARCHITECTURE.md` — overall system design.
- `SECURITY.md` — security posture and rationale.
- `CMS_GUIDE.md` — how to use the Payload admin panel day-to-day.
- `TESTING.md` — this sandbox's specific testing constraints (pre-installed Chromium path, proxy quirks).
- `BACKUPS.md` — the two backup mechanisms (Neon PITR + daily Blob export) and restore steps.
- `FINAL_TECHNICAL_AUDIT.md` — the most recent full technical/SEO/security/accessibility audit, with verified (not guessed) PASS/FAIL/PARTIAL/BLOCKED status per item.
