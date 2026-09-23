import type { NextConfig } from 'next'
import { withPayload } from '@payloadcms/next/withPayload'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    // Deliberately conservative: everything is locked to 'self' except the
    // specific third-party origins actually in use (Google Maps embed,
    // GA4 — see GoogleAnalytics.tsx, which itself only loads when
    // NEXT_PUBLIC_GA4_ID is set; allowing the origin here is harmless when
    // it's unused). See SECURITY.md.
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.google-analytics.com",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://www.googletagmanager.com",
      // The office-location embed is a Google Maps iframe — everything else
      // stays locked to 'self'.
      "frame-src https://www.google.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
]

// Mirrors src/lib/indexing.ts's isSiteIndexable() — duplicated rather than
// imported because next.config.ts is loaded outside the app's own module
// resolution (the "@/" path alias isn't guaranteed to resolve here). Keep
// both in sync if this logic changes.
function isSiteIndexable(): boolean {
  const override = process.env['SITE_INDEXABLE']
  if (override === 'true') return true
  if (override === 'false') return false
  const vercelEnv = process.env['VERCEL_ENV']
  if (vercelEnv) return vercelEnv === 'production'
  return true
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Admin must never be indexed even if robots.txt is misconfigured.
        source: '/admin/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      ...(isSiteIndexable()
        ? []
        : [
            {
              // Belt-and-braces: a non-production deployment (Vercel preview,
              // or SITE_INDEXABLE=false explicitly) gets this site-wide, not
              // just a robots.txt disallow — a preview URL that leaks or gets
              // linked to shouldn't end up indexed just because a crawler
              // ignored robots.txt.
              source: '/:path*',
              headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
            },
          ]),
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
