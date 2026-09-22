# CMS Guide

Payload CMS admin lives at `/admin`. First visit with an empty `users` table shows Payload's built-in "create your first admin account" screen — no credentials are seeded anywhere in this repo (see `SECURITY.md`).

## Collections (what each one is for)

| Collection | Purpose | Draft/Publish | Notes |
|---|---|---|---|
| `pages` | Flexible standalone pages (About body copy, disclaimers, etc.) | Yes | Not yet wired into a live route — currently About/Privacy/Terms content is hardcoded bilingual copy in their page components, not CMS-driven. See "Known Gap" below. |
| `practice-areas` | Service pages (16 seeded, incl. a distinct Civil Law entry and Maritime, Shipping & Port Law) | Yes | Seeded as **drafts** — not publicly visible until reviewed and published. Civil Law and Criminal Law are marked `featured: true` so they surface first in the homepage/index previews, per client direction — see `CONTENT_REQUIRED.md`. |
| `industries` | Sector pages, written from the client's business-problem angle | Yes | Seeded as 7 **drafts**. |
| `lawyers` | Team directory + individual profiles | Yes | Only the 3 named lawyers from the brief are seeded, and only with verified fields (name, founder flag) — **published**, since those facts are verified. The other 12 slots are not fabricated; add them here as real data arrives. |
| `articles` | Insights/blog. Requires a `legalReviewer` before `status` can be set to `published` — enforced by a `beforeChange` hook, not just a UI hint. | Yes | Nothing seeded — see `CONTENT_REQUIRED.md`. |
| `faqs` | Q&A, optionally tied to a practice area or industry | Yes (via `status`) | Nothing seeded yet. |
| `media` | Uploads, with 3 auto-generated image sizes (thumbnail/card/og) | — | `alt` text is a required field. |
| `history-timeline` | Firm milestones | — | Only the verified 1983 founding entry is seeded. Add future milestones here as they're confirmed — never invent intermediate ones (brief §12). |
| `redirects` | Old path → new path, for URL changes post-launch | — | Empty until needed; **not yet consulted by `middleware.ts`** — see "Known Gap" below. |
| `consultation-submissions` | Lead inbox | — | Staff-read only; public `create` is disabled at the collection level (writes only happen through the validated server route — see `SECURITY.md`). |
| `users` | Staff accounts | — | `role` field (admin/editor/reviewer) exists but does not yet gate any UI — it's a label for now, not an enforced permission tier. |

Global: `site-settings` (firm name, tagline, phone, WhatsApp, address, socials, disclaimer — bilingual). Update this instead of touching code when firm facts change.

## Publishing a Practice Area or Industry

1. Log into `/admin`.
2. Open the collection, find the draft (all seeded ones start as drafts).
3. Review/edit the copy in both the `ar` and `en` locale tabs (top of the edit screen).
4. Fill in a `legalReviewer` where applicable (Articles require this before publish; PracticeAreas/Industries don't hard-require it but should still be reviewed).
5. Change `status` to `published`. It appears on the public site within 60 seconds (ISR revalidation — see `ARCHITECTURE.md`), no redeploy needed.

## Adding a Lawyer

Create a `lawyers` entry with only verified fields filled in. Leave `courtAdmissionLevel`, `yearsExperience`, `education`, etc. blank if not yet confirmed — the frontend already handles missing fields gracefully (they just don't render), so there's no need to fill placeholders.

## Known Gaps (documented, not hidden)

- **`pages` collection isn't consumed by the frontend yet.** About, History, Privacy, and Terms currently render hardcoded bilingual copy directly in their page components (`src/app/(frontend)/[locale]/about/page.tsx` etc.), not from this collection. Wiring these to `pages` is a reasonable next step once the firm wants to edit that copy without a code change — the collection schema is ready for it.
- **`redirects` collection isn't read by `middleware.ts` yet.** It exists so old URLs can be mapped without a deploy, but the actual lookup-and-redirect logic in middleware hasn't been implemented — there's nothing to redirect yet on a greenfield site. Add this before any URL restructuring happens post-launch.
- **`users.role` is not enforced.** All authenticated users currently have the same collection-level access (any logged-in user can edit any collection). Add role-based access control before onboarding more than a couple of trusted staff.
