import type { Locale } from '@/lib/i18n'
import { siteConfig, yearsOfExperience } from '@/lib/site-config'

export function organizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: locale === 'ar' ? siteConfig.legalNameAr : siteConfig.legalNameEn,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/logo-full.png`,
    image: `${siteConfig.siteUrl}/logo-full.png`,
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

export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function articleSchema({
  title,
  description,
  authorName,
  publishDate,
  lastReviewedDate,
  imageUrl,
}: {
  title: string
  description: string
  authorName?: string
  publishDate?: string
  lastReviewedDate?: string
  /** Article cover image, if the CMS entry has one — falls back to the firm's logo, matching Google's Article schema guidance that `image` be present. */
  imageUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: imageUrl ?? `${siteConfig.siteUrl}/logo-full.png`,
    publisher: {
      '@type': 'Organization',
      name: siteConfig.legalNameEn,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.siteUrl}/logo-full.png`,
      },
    },
    ...(authorName ? { author: { '@type': 'Person', name: authorName } } : {}),
    ...(publishDate ? { datePublished: publishDate } : {}),
    ...(lastReviewedDate ? { dateModified: lastReviewedDate } : {}),
  }
}

export { yearsOfExperience }
