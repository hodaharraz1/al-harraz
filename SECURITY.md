# Security

Status: implemented and manually verified in this session (see `TESTING.md` for what was actually run). Not independently penetration-tested — do not describe this as "fully secure."

## Transport & Headers

Configured in `next.config.ts`, applied to every response:
- `Strict-Transport-Security` (HSTS, 2-year max-age, includeSubDomains, preload) — only takes effect once the production domain is served over HTTPS end-to-end; verify with a real cert before relying on it (brief §34).
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` disabling camera/microphone/geolocation/FLoC
- `Content-Security-Policy` — `default-src 'self'` with `script-src`/`style-src` allowing `'unsafe-inline'` for Next's hydration/Tailwind. **Known gap**: this is not a nonce-based strict CSP. Before launch, move to Next's nonce-based CSP (via middleware) to drop `'unsafe-inline'` from `script-src`.
- `/admin/*` additionally gets `X-Robots-Tag: noindex, nofollow`.

## Admin / CMS Access

- Payload's `Users` collection is the only auth mechanism; no user is seeded — the first person to open `/admin` is prompted to create the first admin account (Payload's built-in flow), so no default/shared credentials ever exist in this repo.
- `/admin` and `/api` are disallowed in `robots.txt` and additionally carry `X-Robots-Tag: noindex`.
- Collection-level access control (`src/access/isStaff.ts`): published content is publicly readable, drafts are staff-only, and writes require an authenticated Payload user — except `consultation-submissions`, whose public `create` is disabled entirely (see below).
- 2FA: not yet configured — Payload supports it; add it before granting non-owner staff access (tracked in `LAUNCH_CHECKLIST.md`).

## Form / Lead-Gen Protection

The consultation form (`src/app/(frontend)/api/consultation/route.ts`):
1. Server-side Zod validation (`src/lib/validation.ts`) — nothing is trusted from the client.
2. Honeypot field (`companyWebsite`) — must stay empty; a bot filling it gets a fake success response so it doesn't learn to avoid the field.
3. In-memory IP-based rate limiting (`src/lib/rate-limit.ts`) — 5 submissions per 10 minutes per IP. **Known limitation**: resets on deploy/restart and does not share state across multiple server instances; replace with a shared store (Redis or similar) before horizontally scaling.
4. The `consultation-submissions` collection's public `create` access is `() => false` — the only way to write to it is the server route, which calls Payload's Local API with `overrideAccess: true` *after* validation passes. Direct POSTs to Payload's own REST/GraphQL API cannot create a submission.
5. No case-description text is ever sent to client-side analytics (see `POST_LAUNCH_PLAN.md` for what GA4 events are/aren't tracked).

## Data Handling

- All consultation-submission fields stay in Postgres, readable only by authenticated staff.
- The UI displays a standing warning not to send highly sensitive information or original documents through the form (brief §15).
- No enquiry payload is ever written to server logs — `route.ts` logs only the error object on failure, never the submission body (brief §33).
- File uploads are not enabled anywhere in V1 (no consultation attachment field) — per brief §15, this stays off until a secure, access-controlled, malware-scanned, private-storage pipeline exists.

## Dependency Hygiene

`npm audit --omit=dev` at last check: 0 critical/high in production dependencies. Remaining moderate findings are transitive dev-only tooling bundled by `@payloadcms/db-postgres` (its `drizzle-kit` migration CLI pulls an old `esbuild`) and by Payload's admin richtext editor (`monaco-editor` → `dompurify`) — both are upstream Payload dependencies, not something this project can patch directly; re-run `npm audit` after each Payload version bump.

## Secrets

- `.env` is git-ignored; `.env.example` documents every variable with no real values.
- `PAYLOAD_SECRET` must be a long random string (`openssl rand -base64 48`) — never reuse the local dev value in production.
- The Postgres connection string, GA4 ID, and any future API keys are read from environment variables only — never hardcoded.

## Still To Do Before Production Launch

- Nonce-based CSP (drop `script-src 'unsafe-inline'`).
- 2FA for admin accounts.
- Shared-store rate limiting if deployed across multiple instances.
- A real backup/restore rehearsal against the production database (see `DEPLOYMENT.md`).
