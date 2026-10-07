# Civil Law — Internal Link Graph, Phase 2

Date: 2026-10-07. **Update (same day, after FINAL PUBLICATION
AUTHORIZATION):** every link in the table below has now been added to
`src/seed/data.ts` (code committed and pushed). **Still not live** — this
sandbox cannot reach the production database, so these links (and the
three new articles they point to) only take effect once someone with
production access runs `npm run seed` against it. See
`CIVIL_PHASE_2_PRODUCTION_EVIDENCE.md` for the current status. The table's
original planning rationale is kept below for reference.

## Planned graph

```
                         civil-law (pillar)
                              |
        ┌─────────────────────┼─────────────────────┐
        |                     |                      |
real-estate-property-   what-is-civil-lawsuit    (direct pillar
registration (existing)   (existing)                 link only)
        |                     |
        ├─ rental-tenancy-        civil-vs-criminal-
        |  disputes-egypt (new)   cases-egypt (new)
        |
        └─ co-ownership-
           partition-egypt (new)
                |
                ├─→ common-inheritance-disputes-egypt (existing, reciprocal)
                └─→ property-possession-disputes-egypt (existing, reciprocal)
```

## Links, by source page

| Source (existing, live) | New outbound link to | Anchor text (AR / EN) | Status |
|---|---|---|---|
| `civil-law` pillar | `rental-tenancy-disputes-egypt` | "نزاعات الإيجار في مصر" / "Rental Disputes in Egypt" | Added to `data.ts`, pending seed |
| `civil-law` pillar | `co-ownership-partition-egypt` | "قسمة المال الشائع" / "Partition of Co-Owned Property" | Added to `data.ts`, pending seed |
| `civil-law` pillar | `civil-vs-criminal-cases-egypt` | "الفرق بين الدعوى المدنية والدعوى الجنائية" / "Civil vs. Criminal Cases in Egypt" | Added to `data.ts`, pending seed |
| `real-estate-property-registration` | `rental-tenancy-disputes-egypt` | same as above | Added to `data.ts`, pending seed |
| `real-estate-property-registration` | `co-ownership-partition-egypt` | same as above | Added to `data.ts`, pending seed |
| `property-possession-disputes-egypt` | `co-ownership-partition-egypt` | "قسمة المال الشائع" / "Partition of Co-Owned Property" | Added to `data.ts`, pending seed |
| `common-inheritance-disputes-egypt` | `co-ownership-partition-egypt` | same as above | Added to `data.ts`, pending seed |
| `what-is-civil-lawsuit` | `civil-vs-criminal-cases-egypt` | "الفرق بين الدعوى المدنية والدعوى الجنائية" / "Civil vs. Criminal Cases in Egypt" | Added to `data.ts`, pending seed |

Anchor text varies by destination (no repeated exact-match spam), matching
the pattern already used throughout Phase 1.

## Explicitly NOT planned

- **No link from `civil-vs-criminal-cases-egypt` to `difference-between-misdemeanor-and-felony`**, or vice versa — keeps the two articles' intents clearly separated per the cannibalization audit.
- **No homepage change pushed yet.** The homepage's "Tenancy Matters" Civil Focus item still falls back to the civil-law pillar (set in Phase 1) in the deployed code. The article is now (a) legally approved and (b) added to `data.ts`, but not yet (c) seeded into the CMS or (d) production-verified. The `CivilFocus.tsx` edit itself is prepared locally and will be pushed as its own follow-up commit only once (c) and (d) are both true — not before. See `CIVIL_PHASE_2_PRODUCTION_EVIDENCE.md` for current status.
- **No new doorway pages** of any kind (confirmed — zero new URLs beyond the three cluster articles themselves, each mapped to a genuinely distinct search intent per `CIVIL_KEYWORD_INTENT_MAP.md`).

## Sequencing — status as of 2026-10-07

1. ~~Add the approved article(s) to `src/seed/data.ts`~~ — **done**, this session, following the FINAL PUBLICATION AUTHORIZATION (`legalReviewer` is still only set via the normal seed mechanism, which resolves to the existing `hodaharraz1@gmail.com` admin account — no new reviewer identity invented).
2. ~~Add the links from this table for the now-real target(s)~~ — **done**, this session.
3. Deploy, verify production (status, canonical, hreflang, sitemap, rendered links) — **pending**: requires `npm run seed` against production first (this sandbox cannot reach it).
4. Only after that verification, update `CivilFocus.tsx`'s "Tenancy Matters" item — **prepared, not yet pushed**.
5. Resubmit IndexNow for the changed URLs — **pending**, after step 3.
