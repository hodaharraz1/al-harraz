# Civil Law — Internal Link Graph, Phase 2 (Planned)

Date: 2026-10-07. **None of this is live** — it describes the internal-link
plan for the three drafted-but-unpublished articles
(`CIVIL_PHASE_2_LEGAL_RESEARCH_REGISTER.md`), to be implemented only once
each article clears legal review and is actually added to `src/seed/data.ts`.
No code was changed to add these links this phase (the premature version
was reverted — see `CIVIL_SEO_AUTHORITY_PHASE_2_REPORT.md`).

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

## Planned links, by source page

| Source (existing, live) | New outbound link to | Anchor text (AR / EN) | Status |
|---|---|---|---|
| `civil-law` pillar | `rental-tenancy-disputes-egypt` | "نزاعات الإيجار في مصر" / "Rental Disputes in Egypt" | Planned, not added |
| `civil-law` pillar | `co-ownership-partition-egypt` | "قسمة المال الشائع" / "Partition of Co-Owned Property" | Planned, not added |
| `civil-law` pillar | `civil-vs-criminal-cases-egypt` | "الفرق بين الدعوى المدنية والدعوى الجنائية" / "Civil vs. Criminal Cases in Egypt" | Planned, not added |
| `real-estate-property-registration` | `rental-tenancy-disputes-egypt` | same as above | Planned, not added |
| `real-estate-property-registration` | `co-ownership-partition-egypt` | same as above | Planned, not added |
| `property-possession-disputes-egypt` | `co-ownership-partition-egypt` | "قسمة المال الشائع" / "Partition of Co-Owned Property" | Planned, not added |
| `common-inheritance-disputes-egypt` | `co-ownership-partition-egypt` | same as above | Planned, not added |
| `what-is-civil-lawsuit` | `civil-vs-criminal-cases-egypt` | "الفرق بين الدعوى المدنية والدعوى الجنائية" / "Civil vs. Criminal Cases in Egypt" | Planned, not added |

Anchor text varies by destination (no repeated exact-match spam), matching
the pattern already used throughout Phase 1.

## Explicitly NOT planned

- **No link from `civil-vs-criminal-cases-egypt` to `difference-between-misdemeanor-and-felony`**, or vice versa — keeps the two articles' intents clearly separated per the cannibalization audit.
- **No homepage change yet.** The homepage's "Tenancy Matters" Civil Focus item currently falls back to the civil-law pillar (set in Phase 1). Per the brief's explicit sequencing rule, it should only be repointed to `rental-tenancy-disputes-egypt` **after** that article is (a) legally approved, (b) added to the CMS, (c) deployed, and (d) production-verified — not before. This is the one homepage change queued for a future session, not this one.
- **No new doorway pages** of any kind (confirmed — zero new URLs beyond the three cluster articles themselves, each mapped to a genuinely distinct search intent per `CIVIL_KEYWORD_INTENT_MAP.md`).

## Sequencing for a future session, once legal review clears

1. Add the approved article(s) to `src/seed/data.ts`, with `legalReviewer` only set via the normal seed mechanism once review is genuinely complete.
2. Add the links from this table for the now-real target(s).
3. Deploy, verify production (status, canonical, hreflang, sitemap, rendered links).
4. Only after that verification, update `CivilFocus.tsx`'s "Tenancy Matters" item (if the tenancy article is the one approved).
5. Resubmit IndexNow for the changed URLs.
