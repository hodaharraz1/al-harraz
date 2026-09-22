import type { Metadata } from 'next'
import type { Locale } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'

type PageSeoInput = {
  locale: Locale
  /** Path without locale prefix, e.g. "/about" or "/practice-areas/maritime-shipping-port-law" */
  path: string
  title: string
  description: string
  noindex?: boolean
  ogImagePath?: string
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  noindex = false,
  ogImagePath,
}: PageSeoInput): Metadata {
  const localizedPath = `/${locale}${path}`

  return {
    title,
    description,
    alternates: {
      canonical: localizedPath,
      languages: {
        ar: `/ar${path}`,
        en: `/en${path}`,
        'x-default': `/ar${path}`,
      },
    },
    robots: noindex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: localizedPath,
      siteName: locale === 'ar' ? siteConfig.legalNameAr : siteConfig.legalNameEn,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
      images: ogImagePath ? [{ url: ogImagePath }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}
