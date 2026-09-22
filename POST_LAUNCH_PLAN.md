# Post-Launch Plan

## Analytics Setup (once approved for production)

- **GA4**: set `NEXT_PUBLIC_GA4_ID`, wire up the standard page-view + the following custom events, none of which should ever include enquiry/case-description text (`SECURITY.md`):
  - `phone_click`, `whatsapp_click` (with a `context` param: general/maritime/consultation, matching `src/lib/whatsapp.ts`'s contexts)
  - `consultation_form_start` (first field interaction), `consultation_form_submit`
  - `contact_form_submit` (if a separate simple contact form is added later)
  - `language_switch`
  - `directions_click` (once the Google Business Profile map is live)
- **Google Search Console**: verify the production domain, submit `/sitemap.xml`, monitor index coverage, Core Web Vitals report, and the structured-data report weekly for the first month.
- **Microsoft Clarity**: optional, low-cost session-replay addition — defer until GA4 is stable.

## Google Business Profile Checklist (brief §43)

Correct firm name / address / phone (matching the website NAP exactly) · category · services list · website link · hours (once confirmed) · logo · photos · a few introductory posts · monitor and respond to Q&A · **never fabricate reviews** — only request real reviews from actual clients once representation has concluded, following applicable bar/ethics rules on solicitation.

## 6-Month SEO Roadmap (framework — see `KEYWORD_MAP.md` for the qualitative priority list; re-run keyword research with real Search Console/Keyword Planner data before finalizing each month's exact topics)

- **Month 1**: technical indexing verification (GSC coverage report clean), Local SEO (Damietta) foundation, publish/review the primary service pages currently seeded as drafts.
- **Month 2**: Damietta local content + Corporate/Criminal/Civil clusters.
- **Month 3**: Maritime/Shipping cluster — the strategic priority; expand the flagship hub with legally-reviewed sub-articles (bills of lading, cargo claims, carrier liability, ship arrest, marine insurance — see `KEYWORD_MAP.md`).
- **Month 4**: Contracts/Company Formation/Employment/Real Estate clusters.
- **Month 5**: FAQ expansion + long-tail informational content.
- **Month 6**: content refresh pass on Month 1-2 pages, backlink/outreach plan execution (`SEO_STRATEGY.md`), conversion-rate review of the consultation funnel.

## Backlink Strategy (ethical only, brief §62)

Egyptian/regional legal directories, professional associations, Damietta business/chamber-of-commerce directories, shipping/logistics trade publications, original legal research/commentary pieces pitched to industry press. No purchased or automated link schemes.

## Content Governance Cadence

- Every published Article/PracticeArea gets a `lastReviewedDate` refresh at least annually, or sooner if the underlying law changes.
- New Articles always carry a real `legalReviewer` before publish (enforced by the CMS hook — `CMS_GUIDE.md`).

## Review Acquisition (brief §31)

Add a simple, ethics-compliant post-engagement prompt asking satisfied clients to leave a Google review once representation concludes. Never display a testimonial that hasn't been explicitly permissioned in writing.

## Recurring Technical Maintenance

- `npm audit` after every dependency bump, especially Payload version upgrades (see the transitive findings tracked in `SECURITY.md`).
- Re-run the Playwright + Vitest suites in CI on every deploy once a CI pipeline is set up (none exists yet in this repo).
- Quarterly Lighthouse/Core Web Vitals check against the live production site (no baseline measurement exists yet — see `TESTING.md`).
