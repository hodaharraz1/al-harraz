import type { Locale } from '@/lib/i18n'
import { siteConfig, yearsOfExperience } from '@/lib/site-config'

export function organizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: locale === 'ar' ? siteConfig.legalNameAr : siteConfig.legalNameEn,
    url: siteConfig.siteUrl,
    telephone: siteConfig.phoneInternational,
    foundingDate: `${siteConfig.foundingYear}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: locale === 'ar' ? siteConfig.addressAr : siteConfig.addressEn,
      addressLocality: 'Damietta',
      addressCountry: 'EG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: siteConfig.latitude,
      longitude: siteConfig.longitude,
    },
    hasMap: siteConfig.googleMapsUrl,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: siteConfig.openingHours.daysOpen,
      opens: siteConfig.openingHours.opens,
      closes: siteConfig.openingHours.closes,
    },
    areaServed: 'EG',
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.legalNameEn,
    url: siteConfig.siteUrl,
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.siteUrl}${item.url}`,
    })),
  }
}

export function personSchema({
  name,
  locale,
  role,
  jobTitleFallback,
}: {
  name: string
  locale: Locale
  role?: string
  jobTitleFallback: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle: role ?? jobTitleFallback,
    worksFor: {
      '@type': 'LegalService',
      name: locale === 'ar' ? siteConfig.legalNameAr : siteConfig.legalNameEn,
    },
  }
}

export function articleSchema({
  title,
  description,
  authorName,
  publishDate,
  lastReviewedDate,
}: {
  title: string
  description: string
  authorName?: string
  publishDate?: string
  lastReviewedDate?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    ...(authorName ? { author: { '@type': 'Person', name: authorName } } : {}),
    ...(publishDate ? { datePublished: publishDate } : {}),
    ...(lastReviewedDate ? { dateModified: lastReviewedDate } : {}),
  }
}

export { yearsOfExperience }
