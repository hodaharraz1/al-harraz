# Content Architecture

Status: Phase 1. Defines the CMS content model that `CMS_GUIDE.md` implements in Payload.

## Collections

### SiteSettings (global singleton)
Firm name (AR/EN), tagline, founding year, phone, WhatsApp number, address (AR/EN), social links, default SEO/OG image, disclaimer text (AR/EN).

### Navigation (singleton, per locale)
Ordered menu items, mega-menu groups for Expertise.

### Lawyers
`slug`, name (AR/EN), role, photo, isFounder (bool), foundingYear (for founder), courtAdmissionLevel (optional, verified only), yearsExperience (optional), education (optional), practiceAreas (relationship), industries (relationship), languages, professionalSummary (AR/EN, richtext), selectedExperience (optional), articles (relationship), contact, linkedIn (optional), seo{title, description}, status (draft/published).

### PracticeAreas
`slug`, title (AR/EN), overview (richtext), whoWeHelp, legalIssuesCovered, howWeAssist, relatedIndustries (relationship), relatedLawyers (relationship), faqs (relationship), relatedInsights (relationship), seo{}, lastReviewedDate, breadcrumbParent, status.

### Industries
`slug`, title (AR/EN), businessProblemsNarrative (richtext), relatedPracticeAreas (relationship), seo{}, status.

### Articles (Insights)
`slug`, title (AR/EN), category, body (richtext), author, legalReviewer, publishDate, lastReviewedDate, relatedPracticeAreas, relatedIndustries, seo{}, status (draft/published/scheduled).

### FAQs
`question` (AR/EN), `answer` (AR/EN), relatedPracticeArea (optional), relatedIndustry (optional), status.

### Pages (flexible — About, History, Why Al Harraz, Privacy, Terms, Disclaimer, Contact, Home sections)
`slug`, title (AR/EN), sections (block-based richtext/component blocks), seo{}, status.

### HistoryTimeline
`year`, title (AR/EN), description (AR/EN, optional) — 1983 founding is the only seeded verified entry.

### Redirects
`fromPath`, `toPath`, `statusCode` (301/302), `active`.

### ContactSubmissions / ConsultationSubmissions
`name`, `phone`, `email`, `type` (individual/company), `legalArea`, `preferredContact`, `message`, `urgency`, `consent`, `submittedAt`, `status` (new/contacted/closed), `sourcePage`. Private collection — staff-auth-only, never publicly readable, not indexed.

## Shared Field Group: SEO
`metaTitle`, `metaDescription`, `canonicalOverride` (optional), `noindex` (bool), `ogImage` (optional).

## Bilingual Field Pattern

Implemented via Payload's native localization (`localization: { locales: ['ar', 'en'], defaultLocale: 'ar', fallback: false }`). Every public-facing text/richtext field sets `localized: true`. `fallback: false` is the deliberate choice here: if an English (or Arabic) value hasn't been authored yet, Payload returns `null` for that locale rather than silently serving the other language's text, so the frontend can detect and skip/flag missing translations instead of ever publishing a page that looks translated but isn't. This was chosen over hand-rolled `fieldAr`/`fieldEn` field pairs because it gives non-technical editors a standard locale switcher in the admin UI (per brief §46) and keeps the schema and generated types half the size.

## Relationship Rules

- A PracticeArea can relate to many Lawyers, Industries, FAQs, Articles.
- An Industry describes business problems and links back to relevant PracticeAreas (see brief §9 — described from the client's problem, not just a mirrored service list).
- Maritime content: modeled as PracticeArea slug `maritime-shipping-port-law` acting as the hub, linking out to any future sub-articles rather than being force-split into many thin PracticeArea entries (see brief §10 — no thin pages).

## Draft/Publish & Review

All collections with public content support Payload's draft/publish + versioning. `Articles` and `PracticeAreas` additionally carry `legalReviewer` and `lastReviewedDate` — required before a status can move to `published` (enforced via a Payload access/validation hook).
