# Dependency Audit

`npm audit` (2026-09-23): **7 vulnerabilities (1 low, 6 moderate)**, all transitive, none in code that runs for a public visitor.

## Findings

### 1. `dompurify` (moderate, multiple advisories) — via `monaco-editor` → Payload admin

`monaco-editor` (the code editor Payload's admin panel can use) depends on a vulnerable `dompurify`. This only loads inside the **staff-only, authenticated, noindexed `/admin` panel** (see `SECURITY_AUDIT.md` / `next.config.ts`'s `X-Robots-Tag` on `/admin`) — never in anything a site visitor's browser loads. `npm audit fix` offers a fix, but it would bump `@payloadcms/db-postgres` (a major framework dependency) — not applied without validating against the exact Payload version pinned in `package.json` (`3.90.1`) first.

### 2. `esbuild` (moderate) — via `drizzle-kit` → `@payloadcms/db-postgres`

The advisory is specifically about `esbuild`'s **development server** accepting requests from any origin — this only matters if `esbuild`'s dev server is actually running and reachable, which it isn't in this app (drizzle-kit is a migration-generation CLI tool, not a runtime dependency of the deployed app). No fix is available upstream yet.

## Recommendation

Neither issue is reachable by a site visitor. Re-run `npm audit` after any future Payload major-version upgrade (which would need its own regression pass regardless) rather than forcing an isolated `npm audit fix --force` now, which could silently downgrade or break Payload/drizzle-kit in ways this session has no way to test.

## Other dependencies

Core runtime dependencies (`next@16.3.5`, `react@19.3.0`, `payload@3.90.1`, `zod@3.23.8`) have no open advisories. No major-version upgrades were performed this session — out of scope for a technical/SEO audit that explicitly excluded visual and structural risk-taking.
