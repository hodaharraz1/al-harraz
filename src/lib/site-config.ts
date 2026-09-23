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
  // Not yet the firm's own claimed Google Business Profile (see
  // CONTENT_REQUIRED.md) — this is a plain coordinates-based Maps link,
  // used for the "Get Directions" CTA and the embedded map only.
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=31.4181633,31.7882557',
  siteUrl: process.env['NEXT_PUBLIC_SITE_URL'] ?? 'http://localhost:3000',
} as const

export function yearsOfExperience(): number {
  return new Date().getFullYear() - siteConfig.foundingYear
}
