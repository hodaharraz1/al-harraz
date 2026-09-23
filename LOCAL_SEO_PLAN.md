# Local SEO Plan

## Positioning note (important — read before acting on anything below)

Earlier in this project, local SEO content leaned on "محامي في دمياط" / Damietta-first framing. The firm has since explicitly directed the opposite: the site now leads with **"serves clients across Egypt"** and Damietta was deliberately de-emphasized in the homepage, footer, about page, and elsewhere (kept only where factually required — the real office address, and the map). **Do not re-introduce heavy Damietta keyword targeting into page copy or headings without asking the firm first** — it would contradict their most recent, explicit instruction. Local SEO here means "make sure the real office is findable and accurately represented," not "optimize copy for city-name keywords."

## Google Business Profile (GBP)

**Status: in progress, last known state unconfirmed this session.** The firm found a pre-existing unclaimed listing matching their real phone number and was walking through the claim flow (business name correction, category selection, hours correction) as of earlier in this project; the final step — video verification, done in person at the office — was left for the firm to complete.

- [ ] Confirm the video verification step was completed (business.google.com → the listing should show "Verified," not "Pending verification").
- [ ] Once verified, copy the listing's own share link and replace `googleMapsUrl` in `src/lib/site-config.ts` with it, so "Get Directions" and the map embed point at the firm's own claimed listing instead of a plain coordinates-only Maps link.
- [ ] Set the GBP "website" field to the live site URL (update again after the domain migration — see `DOMAIN_MIGRATION_PLAN.md`).
- [ ] Upload real office photos to GBP once available (same photography referenced in `CONTENT_REQUIRED.md`'s shot list) — GBP listings with photos get materially more engagement than ones without.
- [ ] Business hours on the GBP listing must match `siteConfig.openingHours` exactly (every day except Friday, 11:00–23:00) — mismatched hours between GBP and the site actively hurt local trust signals.

## NAP (Name/Address/Phone) consistency

**PASS — already consistent.** `siteConfig` is the single source of truth the whole app reads from (structured data, contact page, office section) — there's no second, independently-typed copy of the address/phone anywhere that could drift.

- [ ] Once GBP is claimed, spot-check that the GBP listing's own name/address/phone fields match `siteConfig` exactly (character-for-character address formatting mismatches between GBP and the site are a common, avoidable local-SEO ding).

## Reviews strategy

**BLOCKED — needs the firm's decision**, not a code change. Once GBP is claimed and verified:
- [ ] Decide a simple, ethical ask (e.g. a follow-up WhatsApp message after a resolved matter, asking for a review — never incentivized, never written by staff on a client's behalf).
- [ ] No review content should ever be fabricated on the site itself — `CONTENT_REQUIRED.md` already tracks "no fake testimonials" as a hard rule.

## Photo strategy

See `CONTENT_REQUIRED.md`'s shot list (founder/historical images if available, partner portraits, full team photo, office exterior/reception, a meeting room). Same photography set serves the website, GBP, and any future social presence — no need to shoot twice.

## Local citations

Once a domain and NAP are finalized (post-migration), list the firm consistently on relevant Egyptian legal/business directories (e.g. any bar-association-adjacent directories, general business directories) using the exact same name/address/phone formatting as `siteConfig` — this is a manual, ongoing task outside this codebase, not something to automate or fabricate entries for.

## Google Maps integration

**PASS.** Real coordinates (`siteConfig.latitude`/`longitude`, confirmed by the firm as the pin for برج آل حراز) are embedded via a Google Maps iframe (CSP already scoped to allow it — see `SECURITY_AUDIT.md`) and included in the `LegalService` structured data's `geo`/`hasMap` fields.

## Local legal content

The site already covers general Egyptian-law topics rather than city-specific ones, consistent with the "serves all of Egypt" positioning above — no further local-content work is recommended unless the firm's positioning changes again.
