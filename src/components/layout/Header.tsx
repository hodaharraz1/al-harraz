'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionary'
import { LanguageSwitch } from '@/components/layout/LanguageSwitch'
import { LinkButton } from '@/components/ui/Button'

type NavItem = { href: string; label: string; highlight?: boolean }

function buildNavItems(locale: Locale, dict: Dictionary, maritimeHubPublished: boolean): NavItem[] {
  const p = `/${locale}`
  return [
    { href: `${p}/about`, label: dict.nav.about },
    { href: `${p}/team`, label: dict.nav.people },
    { href: `${p}/practice-areas`, label: dict.nav.expertise },
    { href: `${p}/industries`, label: dict.nav.industries },
    // Only linked once published — otherwise this is a dead 404 link on
    // every page's nav (caught during a pre-launch internal-link crawl).
    ...(maritimeHubPublished ? [{ href: `${p}/practice-areas/maritime-shipping-port-law`, label: dict.nav.maritime }] : []),
    { href: `${p}/insights`, label: dict.nav.insights },
    { href: `${p}/contact`, label: dict.nav.contact },
  ]
}

export function Header({
  locale,
  dict,
  maritimeHubPublished,
}: {
  locale: Locale
  dict: Dictionary
  maritimeHubPublished: boolean
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const navItems = buildNavItems(locale, dict, maritimeHubPublished)
  const homeHref = `/${locale}`

  return (
    <header className="sticky top-0 z-40 border-b border-navy-900/10 bg-neutral-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={homeHref} className="flex items-center gap-2 text-base font-bold text-navy-950">
          {locale === 'ar' ? 'آل حراز' : 'Al Harraz'}
        </Link>

        <nav aria-label={locale === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'} className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-navy-900 hover:text-cyan-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitch locale={locale} currentPath={pathname} />
          <LinkButton href={`/${locale}/consultation`} variant="primary">
            {dict.nav.consultation}
          </LinkButton>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-navy-900/20 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={locale === 'ar' ? 'فتح القائمة' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-navy-900/10 bg-neutral-50 lg:hidden">
          <nav aria-label={locale === 'ar' ? 'قائمة الجوال' : 'Mobile navigation'} className="flex flex-col gap-1 px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-11 rounded-md px-2 py-2.5 text-sm font-medium text-navy-900 hover:bg-navy-900/5"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-3 px-2">
              <LanguageSwitch locale={locale} currentPath={pathname} />
            </div>
            <LinkButton href={`/${locale}/consultation`} variant="primary" className="mt-2 justify-center">
              {dict.nav.consultation}
            </LinkButton>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
