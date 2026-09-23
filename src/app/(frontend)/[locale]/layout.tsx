import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { notFound } from 'next/navigation'
import { isLocale, localeDirection, locales } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { siteConfig } from '@/lib/site-config'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileCtaBar } from '@/components/layout/MobileCtaBar'
import { SkipLink } from '@/components/layout/SkipLink'
import { fontVariables } from '@/lib/fonts'
import '../globals.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const dict = getDictionary(locale)

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: dict.hero.headline,
      template: `%s | ${dict.hero.headline}`,
    },
    description: dict.hero.valueProp,
    alternates: {
      languages: {
        ar: '/ar',
        en: '/en',
        'x-default': '/ar',
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!isLocale(rawLocale)) notFound()
  const locale = rawLocale
  const dict = getDictionary(locale)

  return (
    <html lang={locale} dir={localeDirection[locale]} className={`no-js ${fontVariables}`}>
      <head>
        {/* Synchronous, before first paint: flips the reveal-on-scroll
            animations from "always visible" (the no-js/SSR default) to
            "hidden until scrolled into view" only once JS is actually
            running — see the .reveal rules in globals.css. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.replace('no-js','js')" }} />
      </head>
      <body className="min-h-screen bg-neutral-50 pb-16 text-navy-950 antialiased lg:pb-0">
        <SkipLink locale={locale} />
        <Header locale={locale} dict={dict} />
        <main id="main-content">{children}</main>
        <Footer locale={locale} dict={dict} />
        <MobileCtaBar locale={locale} dict={dict} />
      </body>
    </html>
  )
}
