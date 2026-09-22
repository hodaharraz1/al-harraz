import type { MetadataRoute } from 'next'
import { locales } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'
import { getPayloadClient } from '@/lib/payload'

const STATIC_PATHS = [
  '',
  '/about',
  '/about/history',
  '/team',
  '/practice-areas',
  '/industries',
  '/insights',
  '/contact',
  '/consultation',
  '/privacy-policy',
  '/terms',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayloadClient()

  const [practiceAreas, industries, lawyers, articles] = await Promise.all([
    payload.find({ collection: 'practice-areas', where: { status: { equals: 'published' } }, limit: 500, depth: 0 }),
    payload.find({ collection: 'industries', where: { status: { equals: 'published' } }, limit: 500, depth: 0 }),
    payload.find({ collection: 'lawyers', where: { status: { equals: 'published' } }, limit: 500, depth: 0 }),
    payload.find({ collection: 'articles', where: { status: { equals: 'published' } }, limit: 1000, depth: 0 }),
  ])

  const dynamicPaths = [
    ...practiceAreas.docs.map((doc) => `/practice-areas/${doc['slug']}`),
    ...industries.docs.map((doc) => `/industries/${doc['slug']}`),
    ...lawyers.docs.map((doc) => `/team/${doc['slug']}`),
    ...articles.docs.map((doc) => `/insights/${doc['slug']}`),
  ]

  const allPaths = [...STATIC_PATHS, ...dynamicPaths]

  return allPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteConfig.siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteConfig.siteUrl}/${l}${path}`])),
      },
    })),
  )
}
