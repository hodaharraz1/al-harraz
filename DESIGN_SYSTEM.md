# Design System

Implemented as Tailwind v4 CSS-first tokens in `src/app/(frontend)/globals.css` (`@theme` block). No `tailwind.config.js` — Tailwind v4 generates utility classes directly from these custom properties (e.g. `--color-navy-900` → `bg-navy-900`, `text-navy-900`, `border-navy-900`, etc.).

## Color

| Token | Value | Use |
|---|---|---|
| `--color-navy-950` … `-600` | `#05141f` → `#1d5679` | Primary — headers, dark sections, primary text on light backgrounds |
| `--color-cyan-600` … `-300` | `#086d80` → `#7cd8ea` | Secondary/accent — derived from the existing logo, used for CTAs and highlights. `cyan-600` was darkened from the initial `#0891a8` after a Lighthouse audit measured it at only ~3.7:1 contrast (fails WCAG AA's 4.5:1) for both white-on-cyan buttons and cyan-on-white text — `#086d80` clears AA (5.5–6:1) in both directions while staying the same hue. See `TESTING.md`. |
| `--color-bronze-500` / `-400` | `#a67c3d` / `#c0975a` | Reserved, restrained accent — not yet used in a component; available for a future premium touch without becoming a "black-and-gold cliché" (brief §04 explicitly warns against this) |
| `--color-neutral-950` / `-50` / `-100` | near-black / warm off-white / light gray | Text and section backgrounds |
| `--color-alert-red` | `#b3261e` | Form errors, the consultation-form sensitivity warning |

No stock gavel/scales imagery, no heavy gradients, no gold-heavy treatment — per brief §04.

## Typography

- Arabic: `IBM Plex Sans Arabic`/`Tajawal` fallback stack (`--font-sans-ar`), applied automatically when `dir="rtl"`.
- English: `Inter` fallback stack (`--font-sans-en`), applied when `dir="ltr"`.
- **Known gap**: no `@font-face`/Google Fonts `<link>` is wired up yet — the stack currently falls back to system fonts of the same shape. Adding the actual webfonts is a one-line addition once font licensing/self-hosting is decided (see `LAUNCH_CHECKLIST.md`).
- Font selection switches automatically via the `[dir='rtl'] body` / `[dir='ltr'] body` rules in `globals.css` — no per-component logic needed.

## Spacing & Layout

- `Container` (`src/components/ui/Container.tsx`): `max-w-6xl`, responsive `px-4 sm:px-6 lg:px-8`.
- `Section` (`src/components/ui/Section.tsx`): consistent `py-14 sm:py-20` rhythm, with a `tone` prop (`light` / `neutral` / `dark`) so every page section keeps one of three consistent backgrounds instead of ad hoc colors per page.
- `--radius-card: 0.75rem` — the one shared corner radius for cards and feature blocks.

## Components

`Button`/`LinkButton` (3 variants: primary/secondary/ghost, `min-h-11` for comfortable tap targets per brief §19), `Card`, `Badge`, `Breadcrumbs`, `RichText` (renders Payload lexical JSON with hand-rolled `.legal-richtext` prose styling — see below).

## RTL / LTR

Every layout uses logical CSS properties where it matters (`border-s-2`, `ps-6`, `inset-inline-start`) rather than hardcoded `left`/`right`, so the same components render correctly mirrored under `dir="rtl"` without a separate RTL stylesheet. `[locale]/layout.tsx` sets `dir` on `<html>` from `localeDirection` (`src/lib/i18n.ts`), which is the single source of truth consumed everywhere direction-sensitive styling is needed.

## Accessibility Baseline

- Skip-to-content link (`SkipLink`), visually hidden until focused.
- `prefers-reduced-motion` respected globally (`globals.css`).
- Minimum `44px`/`min-h-11` touch targets on all buttons and the mobile CTA bar.
- Every `<img>`-equivalent (Payload `Media` uploads) has a **required** `alt` field in the CMS (`src/collections/Media.ts`) — content cannot be saved without it.
- Lighthouse's automated Accessibility audit scores 100/100 on all 13 pages tested (`TESTING.md`), after fixing two real contrast failures and a heading-hierarchy bug it caught. That is a real, useful signal but it is not the same thing as a full WCAG 2.2 AA conformance review — Lighthouse/axe-core only catches a subset of WCAG success criteria (contrast, headings, labels, ARIA misuse, etc.), not things like logical tab order across complex interactions, screen-reader-only manual testing, or every 2.2-specific criterion. Treat "100/100" as "no automated red flags," not "certified AA compliant."

## Logo

The current raster logo is not embedded in the codebase yet (no asset was supplied to this session). The header (`src/components/layout/Header.tsx`) currently renders the firm name as text in the nav slot specifically so a future SVG logo can drop into that same slot without touching layout/navigation code — see brief §05 and `CONTENT_REQUIRED.md`.

## Not Yet Typography-Plugin-Styled

`@tailwindcss/typography` was tried for CMS richtext styling and dropped — it failed to resolve through Turbopack's CSS `@plugin` loader in this environment (see `TESTING.md` for the full diagnosis). Richtext is styled instead by a small hand-written `.legal-richtext` ruleset in `globals.css`, which covers headings, paragraphs, lists, links, and blockquotes — the actual set Payload's lexical editor produces. If a future Next.js/Tailwind version fixes the plugin resolution, this can be swapped back with no component changes (`RichText.tsx` only needs its wrapper class renamed).
