# Legal Visual Identity Audit

## Status: PASS — implemented, deployed, and live-verified across every core page

## What was built

**`src/components/ui/JusticeMark.tsx`** — a single reusable thin line-art scales-of-justice SVG, derived from the proportions of the existing logo icon (`public/logo-icon.png`, which already uses a scales silhouette inside a hexagon). Rendered with `currentColor` strokes so it inherits whatever low-opacity brand color each placement uses; always `aria-hidden="true"` and `focusable="false"`.

**`PracticeAreaMark`** (inline in `src/components/home/PracticeAreasGrid.tsx`) — a small, single, consistent line-art document glyph used on every practice-area card. A deliberate restraint decision: with 42 live practice areas, one shared glyph keeps visual weight consistent; a distinct icon per specialty (civil = scales, contracts = document, real estate = property, etc., as sketched in the original brief) would risk an inconsistent 8+ icon library at this scale. Documented here as an open option if the firm later wants fuller per-category icons.

## Where it was applied (all live-verified by screenshot, see `VISUAL_REGRESSION_REPORT.md`)

| Page | Treatment |
|---|---|
| Homepage hero | Large asymmetric watermark, bottom-left (RTL-correct via logical `-end-*` positioning), 5–7% opacity, hidden below `md` |
| Footer | Small corner watermark, ~5% opacity, hidden below `md` |
| About | Corner watermark, 6% opacity, hidden below `lg` |
| Team (listing) | Corner watermark + every lawyer card got a monogram avatar (initial letter in a thin cyan-ringed circle with a tiny scales corner mark) replacing the previous blank gray circle |
| Team (individual profile) | Same monogram + legal-frame treatment, larger (128px) |
| Practice Areas (listing) | Corner watermark + document glyph on every card |
| Practice Areas (every detail page — Civil Litigation, Contracts, Real Estate, Inheritance, Commercial, Criminal, Administrative, Maritime, etc., all via the shared `[slug]` template) | Corner watermark, hidden below `xl` to clear the 3-column content/aside layout |
| Insights (listing) | Corner watermark |
| Insights (every article, via the shared `[slug]` template) | Corner watermark, hidden below `xl` |
| Contact | Corner watermark, clear of the map embed and contact details |
| Consultation | Corner watermark, clear of the form fields |

## Explicitly not changed
Layout, typography, color tokens, button styles, header, footer structure, content/copy, navigation, SEO metadata, routes, responsive breakpoint system — confirmed via `git diff --stat` showing only new SVG components and `className`/import additions, zero changes to existing markup structure or copy strings.

## Acceptance checklist (against the brief's own criteria)

- [x] Current layout preserved
- [x] Current typography preserved
- [x] Current colors preserved (only existing `cyan-*`/`navy-*` tokens used, no new colors introduced)
- [x] Homepage hero contains a subtle legal identity watermark
- [x] Scales of justice visible but refined (thin line-art, not filled/cartoon)
- [x] No cheesy legal imagery (no gavels, no courtroom photos, no marble/gold)
- [x] No stock lawyer photos (monogram treatment instead, per the firm's explicit no-photo policy)
- [x] Internal pages share the same legal visual language (10 page templates covered)
- [x] Mobile remains clean (all decorative marks hidden below `md`/`lg`/`xl` depending on page density)
- [x] No horizontal overflow (verified via live mobile screenshots)
- [x] Accessibility intact (`aria-hidden`, non-focusable, no contrast change to real content)
- [x] Performance impact negligible (inline SVG only, no new images/fonts/JS libraries)
- [x] No SEO changes (zero edits to canonical/hreflang/schema/sitemap/robots files)
- [x] No content changes
- [x] No regression — confirmed via live production screenshots, not local-only claims

## One bug found and fixed during this work
The first hero implementation sized the watermark as a percentage of container height (`h-[140%]`/`h-[170%]`), which combined with the hero's `overflow-hidden` crop produced an oversized, oddly-cropped shape (visible as two large triangle fragments rather than an elegant partial scale) — caught via a live screenshot after the first deploy, not assumed correct from code alone. Fixed by switching to fixed pixel heights (`h-80`/`lg:h-[28rem]`), matching the approach already proven on the About page, and re-verified live before calling it done.
