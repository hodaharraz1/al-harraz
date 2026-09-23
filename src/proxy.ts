import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, isLocale } from '@/lib/i18n'

const PUBLIC_FILE = /\.(.*)$/

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next()
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
