import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site-config'
import { isSiteIndexable } from '@/lib/indexing'

export default function robots(): MetadataRoute.Robots {
  if (!isSiteIndexable()) {
    return { rules: { userAgent: '*', disallow: '/' } }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    sitemap: `${siteConfig.siteUrl}/sitemap.xml`,
  }
}
