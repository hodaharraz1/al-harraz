# Hreflang Domain Migration

## Status: PASS

## Live verification
```
$ curl -sS https://alharrazlaw.com/ar | grep 'rel="alternate"'
<link rel="alternate" hrefLang="ar" href="https://alharrazlaw.com/ar"/>
<link rel="alternate" hrefLang="en" href="https://alharrazlaw.com/en"/>
<link rel="alternate" hrefLang="x-default" href="https://alharrazlaw.com/ar"/>
```

Checked on the homepage, a practice-area page, and an article page — all three tags present on every page, all using `alharrazlaw.com`, none referencing `vercel.app`.

## Reciprocity
Every page emits both `ar` and `en` alternates pointing at each other's actual counterpart URL (not the homepage) — confirmed via `src/lib/seo.ts`'s `buildMetadata()`, the single helper every page route calls, which builds `languages: { ar, en, 'x-default': ar }` from the same `path` value used for the page's own canonical. There is no code path where one locale's page could emit a hreflang set without its reciprocal.

## x-default
`x-default` points to the Arabic version — intentional, matching the site's Arabic-first architecture (the firm's primary market is Egypt; `src/proxy.ts` defaults first-time visitors to `/ar`). This was an existing, deliberate architectural choice, not something introduced or changed by this migration.

## Conclusion
No hreflang output anywhere references the old domain. All tags are correct and reciprocal.
