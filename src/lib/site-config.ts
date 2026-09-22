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
  // Populate once a domain/mailbox exists — see CONTENT_REQUIRED.md.
  email: undefined as string | undefined,
  // Populate once supplied — see CONTENT_REQUIRED.md.
  facebookUrl: undefined as string | undefined,
  googleBusinessProfileUrl: undefined as string | undefined,
  siteUrl: process.env['NEXT_PUBLIC_SITE_URL'] ?? 'http://localhost:3000',
} as const

export function yearsOfExperience(): number {
  return new Date().getFullYear() - siteConfig.foundingYear
}
