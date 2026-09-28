# Schema (JSON-LD) Domain Migration Report

## Status: PASS

## Method
Fetched live rendered HTML from the homepage and a representative article page, extracted every `<script type="application/ld+json">` block, and inspected every URL-bearing field.

## Homepage — verified schemas
- **LegalService**: `url`, `logo`, `image`, `hasMap` all `alharrazlaw.com` (or, for `hasMap`, the real Google Maps link — correct, that's meant to point off-site). `telephone`, `address`, `geo`, `openingHoursSpecification` all match the real, previously-verified business facts — nothing changed by this migration, nothing fabricated.
- **WebSite**: `url` → `alharrazlaw.com`.
- **FAQPage**: real, previously-published FAQ content, no URLs in this schema type to migrate — unaffected either way.

## Article page — verified schema
- **Article**: `image` and `publisher.logo.url` → `alharrazlaw.com/logo-full.png`. `datePublished`/`dateModified` are the article's real, unaltered dates — not artificially refreshed by this migration (per the standing content-freshness rule).

## Breadcrumb schema
`breadcrumbSchema()` in `src/lib/structured-data.ts` builds every `item` URL from `siteConfig.siteUrl` — same central source as everything else, so it's correct by construction; not separately fetched/tested per-page beyond the homepage/article check above, since the code path is identical for all pages.

## What was explicitly checked for and NOT found
No fabricated reviews, ratings, awards, branch locations, or opening-hours values were introduced anywhere in this migration — the schema fields are byte-for-byte the same business facts as before, only the `url`/`logo`/`image` host changed.

## Conclusion
All structured data on the live site correctly uses `https://alharrazlaw.com`. No `vercel.app` references found in any JSON-LD block checked.
