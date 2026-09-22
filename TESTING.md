# Testing

## What Has Actually Been Run (this session)

- `npx tsc --noEmit` — clean, 0 errors.
- `npx eslint .` (flat config, `eslint-config-next`) — clean, 0 errors/warnings.
- `npm run build` (`next build`, Turbopack) — succeeds; all 27 routes compile, including SSG for locale-static pages and dynamic rendering for `[slug]` pages.
- `npx vitest run` — 22/22 unit tests passing (`tests/unit/*.test.ts`): WhatsApp link builder, i18n helpers, Zod validation schema, rate limiter, site-config invariants (no fabricated facts).
- `npx playwright test` — 11/11 e2e smoke tests passing (`tests/e2e/smoke.spec.ts`), run against a real `next start` production server + the real seeded Postgres database: locale redirect/RTL/LTR, language switch, primary nav, Maritime hub link, custom 404, mobile CTA bar hrefs, full consultation-form submission (writes to Postgres, verified), robots.txt content, sitemap.xml content, admin noindex header.
- Manual `curl` smoke tests of every top-level route (200s confirmed), the admin panel (`/admin` loads, shows "Dashboard - Al Harraz CMS"), and a direct Postgres query confirming a form submission and the seeded lawyers/practice-areas/industries/history landed correctly.

## What Has NOT Been Run (be explicit about this — don't claim more than was verified)

- No automated accessibility audit (axe-core, Lighthouse) has been executed. `DESIGN_SYSTEM.md` lists the accessibility baseline that *was* built in, but WCAG 2.2 AA is a target, not a verified/certified outcome.
- No Core Web Vitals measurement (no Lighthouse run) — the performance budget in the original brief (LCP ≤2.5s etc.) is a target, not a measured result.
- No cross-browser testing beyond the single pre-installed Chromium build in this sandbox (see below) — Safari/Firefox/Edge and real iOS/Android devices are untested.
- No load/concurrency testing of the rate limiter or the Postgres connection pool.
- No penetration testing.

## Two things that were diagnosed and fixed during this session (worth knowing about)

1. **`payload generate:types`/`migrate:create` failed with `ERR_REQUIRE_ASYNC_MODULE`** until `"type": "module"` was added to `package.json`. This is a Payload CLI + `@payloadcms/richtext-lexical` ESM interop issue on Node 22, not a code bug — documented here in case a future Payload upgrade changes this requirement.
2. **`robots.ts` silently failed to register as a route** when placed at `src/app/(frontend)/robots.ts` (same directory as the working `sitemap.ts`) under Turbopack. Confirmed via a clean `rm -rf .next && next build` that it never appeared in the build's route table or `.next/server/app/`, while `sitemap.ts` in the same folder worked every time. Moving it one level up to `src/app/robots.ts` fixed it immediately with a clean build. If re-testing on a future Next.js version, it may be worth moving it back to keep the frontend group self-contained.

## Playwright Environment Note

This sandbox has a pre-installed Chromium at `/opt/pw-browsers/chromium-1194/chrome-linux/chrome` that doesn't match the `chrome-headless-shell` revision `@playwright/test` 1.51.x expects by default, and outbound download of a matching browser isn't available. `playwright.config.ts` sets `launchOptions.executablePath` explicitly to the pre-installed binary. If browser tests fail with "Executable doesn't exist" on a different machine, update that path or run `npx playwright install` where network access allows it.

## Running the Suite Locally

```bash
npm run typecheck
npm run lint
npm run build
npm run test:unit
# e2e requires a running server on :3000 with a seeded database:
npm run start &
npm run test:e2e
```
