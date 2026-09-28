# Old Domain Migration — al-harraz.vercel.app + www.alharrazlaw.com

## Status: PARTIAL — code shipped, two dashboard actions pending

## What's done (code-side, shipped and deployed)

`src/proxy.ts` now issues a `308 Permanent Redirect` to the canonical host for any request whose `Host` header doesn't match `siteConfig.siteUrl`'s host — covering **both** the old `al-harraz.vercel.app` alias and a future `www.alharrazlaw.com` alias in one place, with the path and query string preserved (no redirect-to-homepage). It only activates when `VERCEL_ENV === 'production'`, so it can never interfere with preview deployments or local development (each has its own legitimate host that would otherwise trip the same check).

This means: **as soon as `NEXT_PUBLIC_SITE_URL` is updated to `https://alharrazlaw.com` in Vercel's Production environment and redeployed, both the old domain and any www traffic will automatically 308-redirect to the canonical domain** — no further app code changes needed.

## What's still pending (two Vercel dashboard actions, not app code)

### 1. Update `NEXT_PUBLIC_SITE_URL` (blocks everything downstream)

Vercel → project `al-harraz` → Settings → Environment Variables → edit `NEXT_PUBLIC_SITE_URL` (Production scope) to `https://alharrazlaw.com` → redeploy. This single variable is what `CANONICAL_HOST` in the redirect logic above derives from, and what every canonical/hreflang/sitemap/schema/OG/IndexNow URL in the app derives from — see `DOMAIN_REFERENCE_AUDIT.md`.

### 2. Add `www.alharrazlaw.com` as a domain in Vercel

DNS lookup during this migration confirmed **no DNS record currently exists for `www.alharrazlaw.com`** (NXDOMAIN). The app-side redirect logic is ready for it, but Vercel can't route traffic for a host it doesn't know about — the domain needs to be added under Vercel → project → Settings → Domains → Add → `www.alharrazlaw.com`. Vercel will show the DNS record to add (typically a CNAME) at the domain registrar. Once that propagates, the same `src/proxy.ts` redirect will pick it up automatically — no separate code path needed since it's host-agnostic.

## Why an app-level redirect instead of a Vercel-platform-level domain redirect

Vercel's dashboard also offers a "redirect this domain" toggle when multiple domains are attached to one project. Either approach reaches the same result, but the app-level redirect in `src/proxy.ts` was chosen because:
- It's version-controlled and reviewable like any other code change, not a dashboard setting invisible to this repo.
- It correctly preserves the full path and query string for every route, including dynamic ones (practice areas, articles, team members) without needing per-pattern configuration.
- It automatically follows `NEXT_PUBLIC_SITE_URL` if the canonical domain ever changes again, with zero additional configuration.

If Vercel's own domain-level redirect is also enabled for `www` from the dashboard (some setups do this automatically when both domains are added to one project), that's not a conflict — whichever layer responds first produces the same destination.

## Redirect behavior once both actions are complete (to be live-verified after)

| From | Expected result |
|---|---|
| `http://alharrazlaw.com/ar/practice-areas/civil-law` | → `https://alharrazlaw.com/ar/practice-areas/civil-law` (Vercel's automatic HTTPS upgrade, already confirmed working today) |
| `https://www.alharrazlaw.com/ar` | → `https://alharrazlaw.com/ar` (308, via `src/proxy.ts`, once the www domain is added) |
| `https://al-harraz.vercel.app/ar/practice-areas/civil-law` | → `https://alharrazlaw.com/ar/practice-areas/civil-law` (308, via `src/proxy.ts`) |
| `https://al-harraz.vercel.app/admin` | **Not redirected** — `/admin` and `/api` are excluded from this proxy's route matcher entirely (see `config.matcher` in `src/proxy.ts`), so admin sessions and API calls keep working on either host during the transition rather than risking a redirect loop or a broken in-flight form submission. This can be tightened once the migration is confirmed stable, if desired. |

Full live verification (actual curl output, redirect chain length, status codes) will be added to `REDIRECT_TEST_REPORT.md` once the two actions above are complete — reporting it as done now, before it can be tested against the real change, would be exactly the kind of false-completion claim these rules prohibit.
