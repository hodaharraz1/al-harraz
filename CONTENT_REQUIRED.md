# Content Required Before Launch

Status: living document — update as facts are confirmed. Nothing listed here has been fabricated anywhere in the codebase; every gap below is either left blank, unset, or (for practice areas/industries) seeded as an unpublished **draft** pending review. See `SITE_STRATEGY.md` §5 and brief §57 (No Fabrication Rule).

## Blocking for Launch

- [ ] Domain purchase + DNS (`alharrazlaw.com` or an approved alternative — see `DISCOVERY_REPORT.md` §3; availability not yet confirmed).
- [ ] `NEXT_PUBLIC_SITE_URL` and production `DATABASE_URI`/`PAYLOAD_SECRET` set in the real hosting environment.
- [ ] Legal review and sign-off on every seeded practice-area/industry description before flipping its status to `published` in the CMS (currently all seeded as drafts — see `src/seed/data.ts`).
- [ ] At minimum, placeholder or licensed photography for hero/team (see `SHOT_LIST` below) — current UI uses plain gray circle/placeholder blocks, not stock photos of unrelated people, per brief §37.

## Not Blocking, but Needed Soon

### Firm facts
- [ ] Verified standardized English postal address (current `siteConfig.addressEn` is a working translation, not a verified official form).
- [ ] Business hours (not currently displayed anywhere — no hours are invented).
- [ ] Professional email addresses (`info@`, `consultations@`, `maritime@`) — pending domain purchase; see `README.md` DNS section for the SPF/DKIM/DMARC setup once a domain and mailbox provider are chosen.
- [ ] Facebook page URL (exists per the brief, but the URL was not supplied to this session).
- [ ] LinkedIn / Instagram / YouTube URLs, if/when created.
- [ ] Google Business Profile URL — required before the Contact/Home office map section can embed a real map (currently shows a clearly-labeled "map pending" placeholder, never a fake one).

### Team (People)
- [ ] Bios, qualifications, education, court admission level, years of experience, languages, and photos for all 15 lawyers. Currently only the 3 named lawyers in the brief are seeded (name + founder flag only, `status: published`) — 12 more lawyer profiles are entirely missing and must be added via the CMS once HR/the firm supplies verified data. Do **not** invent placeholder names to reach "15."
- [ ] Confirm whether any of the 3 named lawyers hold a specific verified court-admission level before publishing that field.

### Content
- [ ] Legally reviewed Insights/articles — none are seeded (brief explicitly warns against filler AI articles). See `SEO_STRATEGY.md` §6 and the editorial cadence in `POST_LAUNCH_PLAN.md`.
- [ ] FAQs — none seeded yet; add real, reviewed Q&As per practice area via the CMS.
- [ ] Any real, permissioned client testimonials (none exist yet — none are fabricated).
- [ ] Any verifiable case experience suitable for public description (service-capability language is used instead everywhere currently).

## Shot List (photography, brief §37-38)

- Founder / historical images, if available
- Partners / lead lawyers — professional portraits, consistent background, high resolution, no filters
- Full team photo
- Office exterior and reception
- A meeting/consultation room
- Damietta contextual imagery (licensed only)
- Maritime/port contextual imagery (licensed only — no claim of port affiliation should be implied by the image choice)

## Do Not Fabricate (reminder, brief §57)

Lawyers, branches, case outcomes, court victories, named clients, awards, certifications, degrees, international partnerships, rankings (Legal 500/Chambers), testimonials, business hours, or any government/port relationship. If it isn't verified, it stays out of the codebase and gets logged here instead.
