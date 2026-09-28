# Redirect Test Report

## Status: PASS (apex + old domain) / BLOCKED (www — no DNS record yet)

## Live test results

| From | Result | Hops | Final destination |
|---|---|---|---|
| `http://alharrazlaw.com` | 200 | 2 (http→https automatic upgrade, then `/`→`/ar` locale redirect) | `https://alharrazlaw.com/ar` |
| `https://alharrazlaw.com` | 200 | 1 (`/`→`/ar` locale redirect — pre-existing site behavior, not new to this migration) | `https://alharrazlaw.com/ar` |
| `https://al-harraz.vercel.app/ar` | 308 | 1 | `https://alharrazlaw.com/ar` |
| `https://al-harraz.vercel.app/en/insights/bill-of-lading-explained-egypt` | 200 (following redirect) | 1 | `https://alharrazlaw.com/en/insights/bill-of-lading-explained-egypt` (path fully preserved) |
| `https://www.alharrazlaw.com` | Unreachable | — | **BLOCKED** — no DNS record exists for this subdomain yet (confirmed via direct DNS lookup: NXDOMAIN). The redirect code (`src/proxy.ts`) is ready and will handle it the moment the domain is added in Vercel and its DNS record propagates — see `OLD_DOMAIN_MIGRATION.md`. |

## Redirect chain length
Maximum observed: 2 hops, only for the plain-HTTP, path-less entry point (`http://alharrazlaw.com` with no path) — and that's inherent to combining Vercel's platform-level HTTP→HTTPS upgrade with the app's own pre-existing locale-detection redirect (`/` → `/ar`), which existed before this migration and is unrelated to it. Every deep-path request (the case that actually matters for SEO — real pages, not the bare domain) resolves in exactly 1 hop.

## Method
`curl -L -w "%{http_code} -> %{url_effective} (%{num_redirects} hops)"` against each entry above, executed against the live production site.

## Conclusion
The old domain and the HTTP/apex-root cases redirect correctly with paths preserved and no excessive redirect chains. The one BLOCKED item (`www`) is a DNS/Vercel-domain configuration step outside code, tracked in `OLD_DOMAIN_MIGRATION.md`.
