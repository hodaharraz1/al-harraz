import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { defaultLocale, isLocale } from '@/lib/i18n'

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
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

  const cookieLocale = request.cookies.get('locale')?.value
  const preferredLocale = cookieLocale && isLocale(cookieLocale) ? cookieLocale : detectLocale(request)

  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale}${pathname === '/' ? '' : pathname}`

  const response = NextResponse.redirect(url)
  response.cookies.set('locale', preferredLocale, { maxAge: 60 * 60 * 24 * 365, path: '/' })
  return response
}

function detectLocale(request: NextRequest): 'ar' | 'en' {
  const header = request.headers.get('accept-language') ?? ''
  if (header.toLowerCase().includes('en') && !header.toLowerCase().includes('ar')) {
    return 'en'
  }
  return defaultLocale
}

export const config = {
  matcher: ['/((?!admin|api|_next/static|_next/image|favicon.ico).*)'],
}
