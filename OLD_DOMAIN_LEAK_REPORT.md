# Old Domain Leak Report

## Method

`grep -rn "al-harraz\.vercel\.app"` across the entire repository (`src/`, `payload.config.ts`, every `*.md`, `*.json`, config files), excluding `node_modules` and `.git`. Cross-checked against live output: rendered HTML (`curl` homepage), `sitemap.xml`, `robots.txt`, and JSON-LD from the production site.

## Result: ZERO leaks in application code or rendered output beyond the one already-identified, already-being-fixed source

| Location type | Old-domain references found | Status |
|---|---|---|
| Application source (`src/`, `payload.config.ts`) | **0** | PASS — confirmed by grep, see `DOMAIN_REFERENCE_AUDIT.md` |
| Rendered HTML / canonical / sitemap / robots.txt / JSON-LD | Present, but **all trace back to the single `siteConfig.siteUrl` value**, not a hardcoded second copy anywhere | PARTIAL — will resolve to PASS automatically the moment `NEXT_PUBLIC_SITE_URL` is updated (no code fix needed) |
| Project documentation (`*.md`) | 6 files, listed and fixed in `DOMAIN_REFERENCE_AUDIT.md` | FIXED |
| Database content (Articles/PracticeAreas/FAQs body text, CTA links) | **0** — spot-checked seed content and a live article page's rendered body for any hardcoded absolute link; none found (internal links in this app are relative paths, not absolute URLs) | PASS |
| Separate Al Harraz Contact (QR/vCard) sub-project | 1 (`contact/data.json`'s `website` field) | FIXED — updated, QR regenerated |
| Environment variable examples (`.env.example`) | 0 — `NEXT_PUBLIC_SITE_URL` example there is `http://localhost:3000` (correct for a *local dev* example, not a leak) | PASS |

## Conclusion

There is no scattered old-domain leak problem to hunt down file-by-file. The architecture centralizes the site URL in one place by design (see `DOMAIN_REFERENCE_AUDIT.md`'s root-cause finding), so the "leak" is really just that one central value not having been updated yet — not dozens of hardcoded copies drifting out of sync. Once `NEXT_PUBLIC_SITE_URL` is updated and the site redeployed, this report's PARTIAL row becomes PASS with no further code changes, and will be re-verified live at that point.
