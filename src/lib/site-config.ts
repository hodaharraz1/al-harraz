/**
 * Verified firm facts only — see DISCOVERY_REPORT.md and CONTENT_REQUIRED.md.
 * Never add a field here with an invented value; leave it undefined and
 * track it in CONTENT_REQUIRED.md instead.
 */
export const siteConfig = {
  legalNameAr: 'مكتب آل حراز للمحاماة والاستشارات القانونية',
  legalNameEn: 'Al Harraz Law Firm & Legal Consultants',
  foundingYear: 1983,
  founderAr: 'الأستاذ محمد طه محمد حراز',
  founderEn: 'Mohamed Taha Mohamed Harraz',
  teamSize: 15,
  addressAr: 'دمياط – السنانية – أمام كوبري عبد المجيد – برج آل حراز – الدور الأول – جمهورية مصر العربية',
  addressEn: 'Al Senaneyah, Damietta, Egypt',
  phoneDisplay: '01005029501',
  phoneInternational: '+201005029501',
  whatsappNumber: '201005029501',
  // Coordinates for برج آل حراز (confirmed by the firm, given as the pin for
  // a landmark in the same building — see CONTENT_REQUIRED.md for why this
  // isn't yet the firm's own claimed Google Business Profile listing).
  latitude: 31.4181633,
  longitude: 31.7882557,
  // Populate once a domain/mailbox exists — see CONTENT_REQUIRED.md.
  email: undefined as string | undefined,
  // Populate once supplied — see CONTENT_REQUIRED.md.
  facebookUrl: undefined as string | undefined,
  // A plain coordinates-based Maps link — kept only as the `hasMap` value in
  // the LegalService structured data (src/lib/structured-data.ts), which is
  // rendered on several Practice Area pages currently frozen under a GSC
  // "Discovered – currently not indexed" Validate Fix. Left unchanged
  // deliberately so that frozen pages' JSON-LD output doesn't shift mid-
  // validation. The site's visible "Get Directions" CTA uses
  // `googleBusinessProfileUrl` below instead — see CONTENT_REQUIRED.md.
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=31.4181633,31.7882557',
  // The firm's claimed Google Business Profile listing, identified via its
  // Place ID. Verified by resolving the firm's own official review-request
  // link (https://g.page/r/CWTVPJR4DtWMEAE/review, supplied by the firm) —
  // Google's server redirects that exact link to
  // search.google.com/local/writereview?placeid=ChIJ0SsDNbjl-RQRZNU8lHgO1Yw,
  // so this Place ID is the one Google itself associates with the firm's
  // review-solicitation link, not a guessed or invented identifier. The URL
  // below is Google's own documented format for linking to a place by its
  // Place ID. Used for the "Get Directions" CTA (src/components/home/OfficeSection.tsx).
  googleBusinessProfileUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJ0SsDNbjl-RQRZNU8lHgO1Yw',
  // The firm's official "write a review" link, as supplied by the firm.
  // Not wired to any UI yet — kept here for when a Reviews feature is
  // built (see LOCAL_SEO_PLAN.md's Reviews strategy section).
  googleReviewUrl: 'https://g.page/r/CWTVPJR4DtWMEAE/review',
  // Confirmed by the firm: open every day except Friday, 11:00–23:00.
  openingHours: {
    opens: '11:00',
    closes: '23:00',
    // schema.org day-of-week names, in week order starting Saturday (the
    // start of the work week in Egypt) — Friday is the day off.
    daysOpen: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'] as const,
    dayClosed: 'Friday',
  },
  siteUrl: process.env['NEXT_PUBLIC_SITE_URL'] ?? 'http://localhost:3000',
} as const

export function yearsOfExperience(): number {
  return new Date().getFullYear() - siteConfig.foundingYear
}
