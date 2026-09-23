# Zero-Cost Hosting

The firm has been explicit: no paid hosting, no domain purchase, no card on file, no service that silently converts a free trial into a paid subscription. This document is the honest state of that constraint as of 2026-09-23, based on the hosting providers' own current published terms — not assumed.

## 🚨 Current setup: Vercel Hobby — likely not compliant for this site

The site is live in production on Vercel's **Hobby** (free) plan. Vercel's own Fair Use Guidelines state plainly:

> "Hobby teams are restricted to non-commercial personal use only. All commercial usage of the platform requires either a Pro or Enterprise plan."

Vercel defines "commercial" broadly — it explicitly includes **"any Deployment that is used for the purpose of financial gain of anyone involved in any part of the production of the project, including a paid employee or consultant writing the code."** A real law firm's live business website — built by a paid developer, marketing paid legal services — falls squarely inside that definition. Donations are the one thing explicitly carved out as non-commercial; a law firm's marketing site is not that.

Source: [vercel.com/docs/limits/fair-use-guidelines](https://vercel.com/docs/limits/fair-use-guidelines) (page states "last_updated: 2026-09-14"), cross-referenced from [vercel.com/docs/plans/hobby](https://vercel.com/docs/plans/hobby) and [vercel.com/legal/terms](https://vercel.com/legal/terms).

**What this means in practice**: Vercel hasn't taken any action against this deployment (as of this writing it's live and working), but it is not operating within Vercel's own published terms for the Hobby tier. Vercel could pause or remove a Hobby deployment it identifies as commercial at its discretion. This is a real compliance gap, not a hypothetical one — **this needs the firm's decision**, not a unilateral migration on my part (moving hosting providers is a significant, hard-to-reverse action).

## The ToS-safe free alternative: Netlify Free

Netlify's own announcement of its Free plan states directly:

> "On the Free plan, you can deploy commercial projects, personal sites, or other creative explorations you want to share on the web."

Its Self-Serve Subscription Agreement contains **no commercial-use prohibition** for the Free tier — the only reservation is Netlify's right to disable a Free-tier site "at our sole discretion" if it's not a good fit for the tier (a standard abuse-prevention clause, not a commercial-use ban), and that the tier itself can be changed or discontinued.

Sources: [netlify.com/blog/introducing-netlify-free-plan](https://www.netlify.com/blog/introducing-netlify-free-plan/), [netlify.com/legal/self-serve-subscription-agreement](https://www.netlify.com/legal/self-serve-subscription-agreement/).

**This is the safer choice for a commercial site on a genuinely free tier.**

### Important: Netlify changed its free-tier limits on 2025-09-04

There are two different Free-tier shapes depending on when an account was created:

- **Legacy accounts** (created before 2025-09-04): flat limits — 100 GB bandwidth/month, 300 build minutes/month.
- **New accounts** (created after 2025-09-04): credit-based — **300 credits/month, no top-ups on Free.** That works out to roughly:
  - ~15 GB bandwidth/month (20 credits/GB)
  - ~20 production deploys/month (15 credits/deploy)
  - 1,500,000 requests/month
  - **1 concurrent build only**
  - Functions: 10-second synchronous execution timeout; ~1,000,000 Edge Function invocations/month tracked separately

Sources: [Netlify credit-based pricing docs](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/), [Netlify pricing-update changelog](https://www.netlify.com/changelog/netlify-pricing-update-introducing-credit-based-plans/).

If/when a Netlify account is created for this project, check its dashboard to see which model applies. The new 15 GB/20-deploys-per-month caps are tight for a site the firm might redeploy on every content change — worth planning around (e.g., batching CMS publishes rather than triggering a rebuild per edit, though Payload's CMS content doesn't require a rebuild at all since pages are server-rendered per request via ISR — only *code* changes need a redeploy).

### `netlify.toml`

A `netlify.toml` was prepared in this repo for a future Netlify deploy, but **has not been tested against a real Netlify deployment.** Before relying on it: confirm the Next.js Runtime plugin builds this project correctly (Payload's admin panel and API routes need Node.js server functions, not a static export), and that `DATABASE_URI`/`PAYLOAD_SECRET`/etc. are set as Netlify environment variables the same way they are in Vercel today.

## Database: Neon Postgres (unaffected by an app-hosting change)

The database is Neon Postgres, connected today via Vercel's Storage integration. Neon itself has its own separate free tier and isn't tied to Vercel — if the app hosting ever moves to Netlify, Neon's connection string (`DATABASE_URI`) just gets reconfigured as a Netlify environment variable instead; the database itself doesn't need to move.

## Other genuinely free options (not evaluated in depth, mentioned for completeness)

- **Cloudflare Pages** — generous free tier, commercial use permitted under Cloudflare's own free-tier terms, has a Next.js adapter (`@cloudflare/next-on-pages`). Not evaluated for Payload CMS compatibility specifically (Payload needs a persistent Node.js runtime for its admin panel/API, which Cloudflare's edge-first model may or may not support cleanly — would need real testing before committing to it).
- **GitHub Pages** — free, commercial-use-friendly, but **static-only** — no server-side rendering or API routes, so it cannot host this app as-is (Payload's admin panel and the consultation form's API route both need a real server).

## What this document is not

Not a recommendation to migrate right now. Migrating hosting providers is a real, hard-to-reverse action (DNS, environment variables, testing a full deploy end-to-end) that should happen deliberately, with the firm's explicit go-ahead, not as a side effect of a technical audit. This document exists so that decision can be made with accurate information rather than a guess.
