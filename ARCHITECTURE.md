# Architecture

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript** (strict mode)
- **Tailwind CSS v4** (CSS-first `@theme` tokens, no `tailwind.config.js`)
- **Payload CMS 3** co-located inside the same Next.js app (not a separate service)
- **Postgres** via `@payloadcms/db-postgres` (Drizzle under the hood)
- **Zod** for server-side form validation
- **Vitest** (unit) + **Playwright** (e2e)

### Why this stack (brief §17 asks for the reasoning when deviating — this doesn't deviate, but the choices are documented anyway)

The brief's preferred stack (Next.js + TypeScript + Tailwind + Payload + Postgres) was used as specified. Two implementation decisions worth calling out:

1. **Payload's native `localization` config instead of hand-rolled `fieldAr`/`fieldEn` pairs** for bilingual content (see `CONTENT_ARCHITECTURE.md` "Bilingual Field Pattern"). This halves the schema/generated-types size and gives editors a standard locale switcher in the admin UI, with `fallback: false` so an untranslated field returns `null` instead of silently serving the other language.
2. **Content lives in Postgres via Payload from day one**, not a temporary static/JSON layer. Postgres was available in the build environment, so there was no reason to build a throwaway static layer first — collections, access control, and the seed script all target the real database directly.

## Directory Layout

```
payload.config.ts          # Payload collections/globals/db adapter — single source of CMS truth
middleware.ts               # locale detection + redirect (root project, not under src/app)
src/
  app/
    (frontend)/             # public site — route group, its own root layout (multi-root-layout pattern)
      [locale]/              # /ar/* and /en/*
      api/consultation/       # the ONE custom API route outside Payload's catch-all
      sitemap.ts             # -> /sitemap.xml (dynamic, CMS-driven)
    robots.ts                 # -> /robots.txt (kept at the true app root — see note below)
    (payload)/               # Payload's own admin + REST/GraphQL routes, untouched from its template
  collections/                # Payload collection configs
  components/
    ui/                       # Button, Card, Section, Container, Badge, Breadcrumbs, RichText
    layout/                   # Header, Footer, MobileCtaBar, LanguageSwitch, SkipLink
    home/                     # CMS-fetching section components, reused across home + index pages
    forms/                    # ConsultationForm (client component)
    seo/                      # JsonLd
  lib/                        # i18n, dictionary, site-config, seo, structured-data, whatsapp, payload client, validation, rate-limit
  dictionaries/                # ar.json / en.json UI strings
  seed/                        # seed.ts + data.ts — verified-facts-only seed data
tests/
  unit/                        # Vitest
  e2e/                          # Playwright
```

**Note on `robots.ts` placement**: it was originally nested under `src/app/(frontend)/`, alongside `sitemap.ts`. In this environment, Turbopack silently failed to register it as a route from that nested route-group location (`sitemap.ts` in the same directory worked fine — see `TESTING.md` for how this was diagnosed). Moving the file to `src/app/robots.ts` (the app root) resolved it. This may be worth re-testing on a future Next.js patch release; it did not reproduce for `sitemap.ts`, so it's not a general route-group limitation.

## Routing & i18n

- `middleware.ts` redirects the bare `/` (and any path without a `/ar` or `/en` prefix) to the visitor's preferred locale, detected from `Accept-Language` on first visit and then persisted via a `locale` cookie. It explicitly skips `/admin`, `/api`, `/_next`, and any path with a file extension.
- `[locale]/layout.tsx` is a **root layout** (renders `<html lang dir>`) — there is no `app/layout.tsx`, using Next's documented multi-root-layout pattern so `(frontend)` and `(payload)` can each own their own `<html>`.
- `x-default` in every `hreflang` set points to `/ar` (Arabic is the primary market — see `SITE_STRATEGY.md` §4), not `/en`.

## Data Flow

Server Components call Payload's **Local API** directly (`src/lib/payload.ts` → `getPayload({ config })`), not HTTP round-trips to Payload's own REST endpoint — this is the standard, fastest pattern for a co-located Payload+Next app. The one place that goes through HTTP is the browser's `fetch('/api/consultation')` call from the client-side form.

## Rendering Strategy

Static pages with no CMS dependency (`/privacy-policy`, `/terms`) are fully static. CMS-backed pages (home, team, practice-areas, industries, insights, history) use `export const revalidate = 60` (ISR) so a CMS publish appears within a minute **without a redeploy** — this was deliberately added after discovering that plain SSG pages built before the seed script ran would otherwise never pick up new content (see `TESTING.md`). Detail pages (`[slug]`) are server-rendered on demand (`ƒ` in the Next build output) since their set of valid slugs changes as content is published.

## Defensive Linking to Draft Content

`src/lib/maritime.ts` checks whether the flagship Maritime practice area is published, wrapped in React's `cache()` so the layout (Header/Footer) and the homepage share one query per request instead of three. The Header nav, Footer nav, and homepage feature block all consume this and only render a link to the hub page when it's actually live. This exists because an internal-link crawl during testing found that hard-coded links to a still-draft page produced site-wide 404s — see `TESTING.md`. The same pattern (check publish status before linking, rather than assuming a known slug is live) should be followed for any other CMS content linked from static/shared components.

## Security Headers & CSP

Configured centrally in `next.config.ts` — see `SECURITY.md` for the full list and its known gaps (CSP still allows `'unsafe-inline'` for scripts/styles; nonce-based CSP is a pre-launch follow-up).
