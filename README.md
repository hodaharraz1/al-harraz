# Al Harraz Law Firm — Bilingual Website + SEO + Lead Generation Platform

مكتب آل حراز للمحاماة والاستشارات القانونية — Al Harraz Law Firm & Legal Consultants.

A bilingual (Arabic/English) Next.js + Payload CMS platform built around the firm's heritage since 1983, its 15-lawyer team, and its Damietta-based maritime/shipping specialization. See `MASTER EXECUTION PROMPT` context in project history for the full brief this was built against.

**Status**: functional and internally tested (see `TESTING.md`), not yet deployed to production or content-reviewed for public launch. Read `LAUNCH_CHECKLIST.md` before treating this as launch-ready.

## Documentation Map

| Doc | Covers |
|---|---|
| `DISCOVERY_REPORT.md` | Verified business facts, existing online presence audit, domain availability |
| `SITE_STRATEGY.md` | Positioning, audiences, content governance |
| `SEO_STRATEGY.md` / `KEYWORD_MAP.md` | Technical + on-page SEO, local/national targeting |
| `CONTENT_ARCHITECTURE.md` | CMS content model |
| `COMPETITOR_BENCHMARK.md` | Regional law-firm site research and differentiation |
| `SITEMAP.md` / `URL_MAP.md` / `NAVIGATION_MAP.md` / `INTERNAL_LINKING_PLAN.md` | Information architecture |
| `ARCHITECTURE.md` | Technical stack, directory layout, rendering strategy |
| `DESIGN_SYSTEM.md` | Colors, typography, components, RTL/LTR |
| `CMS_GUIDE.md` | Payload collections, publishing workflow, known gaps |
| `SECURITY.md` | Headers, form protection, access control, known gaps |
| `TESTING.md` | What was actually tested and how, including two environment quirks that were diagnosed and fixed |
| `DEPLOYMENT.md` | Hosting recommendation, deploy steps, backups |
| `LAUNCH_CHECKLIST.md` | ✅/⚠️/❌ status of every launch criterion |
| `CONTENT_REQUIRED.md` | Every piece of real-world information still needed, and what's blocking vs. not |
| `POST_LAUNCH_PLAN.md` | Analytics, GBP checklist, 6-month SEO roadmap, backlink strategy |

## Getting Started (local development)

Requires Node ≥20.9 and a running Postgres instance.

```bash
npm install
cp .env.example .env   # fill in DATABASE_URI and a generated PAYLOAD_SECRET
npm run payload migrate   # apply the schema
npm run seed               # verified-facts-only seed data (idempotent)
npm run dev
```

Visit `http://localhost:3000` (redirects to `/ar` or `/en` based on browser language) and `http://localhost:3000/admin` to create your first CMS admin account.

## Scripts

```bash
npm run dev          # Next dev server (Turbopack)
npm run build         # production build
npm run start          # serve the production build
npm run lint            # ESLint (flat config)
npm run typecheck        # tsc --noEmit
npm run test:unit         # Vitest
npm run test:e2e           # Playwright (needs a running server — see TESTING.md)
npm run seed                 # seed verified content (src/seed)
npm run payload migrate:create <name>   # generate a new DB migration after a schema change
npm run payload migrate                  # apply pending migrations
```

## Domain & Email (not yet configured — brief §16/§41)

No domain is purchased yet. Candidates and availability status are in `DISCOVERY_REPORT.md` §3. Once a domain is chosen, configure at the DNS provider:

- **MX**: point to the chosen mailbox provider (e.g. Google Workspace, Microsoft 365, or a lower-cost transactional provider if only `info@`/`consultations@`/`maritime@` forwarding is needed).
- **SPF**: `v=spf1 include:<provider's SPF include> ~all`
- **DKIM**: the provider-specific selector/TXT record, generated from that provider's admin console.
- **DMARC**: start at `v=DMARC1; p=none; rua=mailto:<a monitoring address>` and tighten to `p=quarantine`/`p=reject` once mail flow is confirmed clean.

Exact records depend on the mailbox provider chosen — this is a placeholder pattern, not a copy-pasteable final config.

## No-Fabrication Discipline

This codebase treats `CONTENT_REQUIRED.md` as the single place unknown information is tracked. Search that file (and `DISCOVERY_REPORT.md`) before assuming any firm fact not already verified there.
