# Civil Law — Google Business Profile Implementation Checklist

Date: 2026-10-07. This environment has no access to Google Business Profile
— nothing here was or can be edited in GBP from this session. Every item
below is a manual action for the firm owner. **No category name below is
confirmed to exist in Google's live taxonomy for Egypt** — each is marked
for verification as instructed.

## 1) Category strategy

- **Primary category** (already likely set per `LOCAL_SEO_PLAN.md`): "Law
  firm" or "Attorney" — these are well-established, near-certainly-real GBP
  categories. `VERIFY IN LIVE GBP UI BEFORE USING` — confirm the exact
  current primary category in the listing itself rather than assuming.
- **Candidate secondary categories** to civil-law positioning (add only
  those that actually appear as selectable options in your GBP dashboard):
  - "Civil law attorney" — `VERIFY IN LIVE GBP UI BEFORE USING` — plausible but not confirmed to exist as a distinct category.
  - "Litigation lawyer" — `VERIFY IN LIVE GBP UI BEFORE USING`.
  - "Legal services" — `VERIFY IN LIVE GBP UI BEFORE USING` — more likely to exist as a broader category.
  - Do **not** add a category you cannot find in the live picker just because it sounds right — an invented/mismatched category can itself be a trust signal problem with Google.

## 2) Services section (GBP "Services" list)

List only real services the firm already performs, matching what's live on
the website — do not invent anything beyond what the practice-area pages
already describe:

- Civil Litigation / التقاضي المدني
- Contract Disputes / منازعات العقود
- Debt Recovery / تحصيل الديون
- Property & Real Estate Disputes / منازعات الملكية والعقارات
- Judgment Enforcement / تنفيذ الأحكام

These map directly to the live `civil-law`, `litigation-dispute-resolution`,
`contracts-commercial-agreements`, `debt-recovery-enforcement`, and
`real-estate-property-registration` practice-area pages — no new claims
beyond what's already published.

## 3) Business description

A factual description the firm can paste into GBP's "Business description"
field (editable, not prescriptive — adjust wording to the owner's voice):

> مكتب آل حراز للمحاماة والاستشارات القانونية، تأسس عام 1983 ومقره الرئيسي في دمياط، يقدم خدماته القانونية للأفراد والشركات في مختلف أنحاء جمهورية مصر العربية. يتمتع المكتب بخبرة واسعة في القضايا والمنازعات المدنية — من العقود والالتزامات إلى منازعات الملكية وتحصيل الديون وتنفيذ الأحكام — إلى جانب خدماته القانونية الشاملة في فروع القانون المصري الأخرى.

(EN equivalent: "Al Harraz Law Firm & Legal Consultants, founded in 1983
and based in Damietta, provides legal services to individuals and
businesses across Egypt. The firm has extensive experience in civil
litigation and disputes — from contracts and obligations to property
disputes, debt recovery, and judgment enforcement — alongside its
full-service practice across other areas of Egyptian law.")

No superlatives ("best," "#1," "leading"), no invented statistics, no
claim beyond what's already true and published on the site.

## 4) GBP Posts linked to real articles

Once published (not before — these link to currently-unpublished drafts),
short GBP posts can drive traffic to:
- The civil-law pillar page.
- `rental-tenancy-disputes-egypt`, once approved and live.
- `co-ownership-partition-egypt`, once approved and live.
- `civil-vs-criminal-cases-egypt`, once approved and live.

Do not post about draft content as if it's already live.

## 5) NAP consistency checklist

Confirm the GBP listing matches `siteConfig` exactly, character for
character:

- [ ] Business name (AR): مكتب آل حراز للمحاماة والاستشارات القانونية
- [ ] Business name (EN): Al Harraz Law Firm & Legal Consultants
- [ ] Address: دمياط – السنانية – أمام كوبري عبد المجيد – برج آل حراز – الدور الأول – جمهورية مصر العربية
- [ ] Phone (display): 01005029501
- [ ] Phone (international): +20 100 502 9501
- [ ] Website field points to https://alharrazlaw.com (not the old Vercel domain)
- [ ] Hours match `siteConfig.openingHours` (every day except Friday)

This duplicates the checklist already in `LOCAL_SEO_PLAN.md` — re-stated
here only so the civil-specific items (category, services, description)
have a single reference alongside it, not to replace that document.

## What this checklist explicitly does NOT include

- No fabricated review counts, ratings, or "verified" badges.
- No second/fake office location.
- No category presented as confirmed without the firm checking the live
  GBP category picker first.
