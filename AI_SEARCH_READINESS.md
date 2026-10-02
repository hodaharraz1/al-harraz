# AI Search Readiness Audit

## Status: PASS (crawl access) / PARTIAL (overall readiness — some signals verified, some require tools this session doesn't have)

## 1. Crawler access — verified live, PASS

Checked `https://alharrazlaw.com/robots.txt` directly:
```
User-Agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://alharrazlaw.com/sitemap.xml
```
A single wildcard `User-Agent: *` rule allows everything except `/admin` and `/api` — this covers Googlebot, Bingbot, **and every AI-assistant crawler** (OAI-SearchBot, GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.) identically, since there is no bot-specific disallow rule anywhere in `src/app/robots.ts`. No crawler is singled out or blocked.

Also checked the codebase for any secondary blocking mechanism:
- No `User-Agent` string matching anywhere outside `robots.ts` (`grep` across `src/`) — so no hidden WAF-style bot filter in application code.
- `next.config.ts` headers: `X-Robots-Tag: noindex, nofollow` is applied only to `/admin/:path*`, and site-wide only when `isSiteIndexable()` is false (i.e., only on non-production/preview deployments — production content pages carry no such header). Confirmed this doesn't inadvertently cover real content.

**Not verified from this session (requires Vercel dashboard access):** Vercel's own platform-level Bot/Attack Challenge protection (if enabled) operates above the application code and isn't visible from the repository — if the firm's Vercel plan has "Bot Protection" or "Attack Challenge Mode" turned on in Project Settings → Firewall, it could still challenge/block AI crawlers even though the app-level rules are clean. This should be checked directly in the Vercel dashboard (Settings → Firewall) — marking this specific sub-item **NOT VERIFIED**, not assumed clean.

## 2. Structured data — PASS

The site already emits JSON-LD on every page (confirmed throughout this project's build and the domain-migration pass): `organizationSchema`, `breadcrumbSchema`, `articleSchema`, `personSchema` (lawyer profiles). This gives AI crawlers machine-readable entity facts (name, address, phone, founding year, authorship) rather than requiring them to parse prose.

## 3. Entity consistency — see `ENTITY_CONSISTENCY_AUDIT.md`
Cross-checked separately; summary: consistent across the site, GBP, and Bing as of this session.

## 4. Content quality signals — PASS, by existing design
- Every published article and practice-area page carries a `legalReviewer` and (where applicable) `lastReviewedDate` — real authorship/review signals, not anonymous AI-generated text.
- `LEGAL_SOURCE_REGISTER.md` documents the two-source verification behind every substantive legal claim — this is the kind of provenance AI systems are increasingly weighted to prefer, though no platform publishes a way to directly verify that weighting.
- FAQs exist site-wide and per practice area, giving clear Q&A-structured content AI systems can extract directly.

## 5. llms.txt — already exists, host-agnostic (see `INDEXNOW_DOMAIN_MIGRATION.md` for the equivalent finding on IndexNow) — no code change needed, verified reachable.

## Explicitly not claimed
No guarantee of visibility in ChatGPT, Gemini, Perplexity, Copilot, or any other AI-assisted search product — no platform publishes ranking mechanics, and none were tested live in this audit (this session cannot query those products' live indexes to confirm actual inclusion). This audit confirms the *preconditions* (crawlability, structured data, entity consistency, sourced content) are in place — not an outcome.

## Action item
Ask the firm owner to check Vercel → Project Settings → Firewall for any Bot/Attack Challenge protection and confirm it isn't blocking legitimate AI crawlers — the one sub-item this session cannot verify directly.
