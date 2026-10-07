import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, isLocale } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'

// Matches a file extension on the LAST path segment only (e.g. "/logo.png",
// "/sitemap.xml"). The previous `/\.(.*)$/` matched a dot anywhere in the
// whole path, so a garbage path like "/https:/alharrazlaw.com" (its last
// segment "alharrazlaw.com" looks like a filename because of the ".com")
// was wrongly treated as a static-file request and fell through without
// ever reaching the locale-redirect / not-found handling below — see
// MALFORMED_URL_ROOT_CAUSE.md.
const PUBLIC_FILE = /\.[^/]+$/

// The canonical production host, derived from the same siteConfig.siteUrl
// every other SEO surface (canonical/sitemap/schema/IndexNow) already
// uses — so this redirect and every URL the app emits stay in sync
// automatically whenever NEXT_PUBLIC_SITE_URL changes, with nothing
// hardcoded here. Any other host this deployment answers for (the old
// al-harraz.vercel.app alias, a www. alias) gets a permanent redirect to
// the canonical host instead of serving duplicate, competing content —
// see OLD_DOMAIN_MIGRATION.md.
//
// Guarded to VERCEL_ENV === 'production' only: NEXT_PUBLIC_SITE_URL is a
// single fixed value, but Vercel preview deployments and local dev each
// get their own real host (a unique *.vercel.app URL, or localhost) that
// legitimately differs from it — without this guard, every preview
// deployment and local dev server would immediately redirect itself to
// production instead of being previewable/testable. VERCEL_ENV is unset
// outside Vercel (local dev, CI, tests), so the check also naturally
// no-ops there.
const CANONICAL_HOST = new URL(siteConfig.siteUrl).host
const ENFORCE_CANONICAL_HOST = process.env['VERCEL_ENV'] === 'production'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // A path whose first segment looks like a URL scheme fragment (e.g.
  // "/https:/alharrazlaw.com", the form Vercel/Next.js's own double-slash
  // normalization leaves after a request for "/https://alharrazlaw.com")
  // is never a real route — most likely an external link or historical
  // crawl artifact pointing at "<site>/<full-url>" rather than a real
  // page (see MALFORMED_URL_ROOT_CAUSE.md). Resolve it with a direct 404
  // in one hop instead of letting it accidentally match PUBLIC_FILE below
  // (its last segment is typically a domain like "alharrazlaw.com", which
  // looks like a filename because of the ".com").
  if (/^\/https?:\//i.test(pathname)) {
    return new NextResponse(null, { status: 404 })
  }

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
  }

  const requestHost = request.headers.get('host')
  if (ENFORCE_CANONICAL_HOST && requestHost && requestHost !== CANONICAL_HOST) {
    const canonicalUrl = request.nextUrl.clone()
    canonicalUrl.protocol = 'https'
    canonicalUrl.host = CANONICAL_HOST
    canonicalUrl.port = ''
    return NextResponse.redirect(canonicalUrl, 308)
  }

  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]
  if (firstSegment && isLocale(firstSegment)) {
    return NextResponse.next()
  }

  // Arabic-first by design: the firm's primary market is Egypt, so a first
  // visit always lands on /ar regardless of the browser's Accept-Language
  // (a visitor with an English-language OS/browser — common even among
  // Arabic speakers — was previously redirected straight to English, which
  // is wrong for this audience). Once someone uses the language switch,
  // the cookie remembers their actual choice on later visits.
  const cookieLocale = request.cookies.get('locale')?.value
  const preferredLocale = cookieLocale && isLocale(cookieLocale) ? cookieLocale : defaultLocale

  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale}${pathname === '/' ? '' : pathname}`

  const response = NextResponse.redirect(url)
  response.cookies.set('locale', preferredLocale, { maxAge: 60 * 60 * 24 * 365, path: '/' })
  return response
}

export const config = {
  matcher: ['/((?!admin|api|_next/static|_next/image|favicon.ico).*)'],
}
