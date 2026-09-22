import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { otherLocale } from '@/lib/i18n'

export function LanguageSwitch({ locale, currentPath }: { locale: Locale; currentPath: string }) {
  const target = otherLocale[locale]
  const rest = currentPath.replace(/^\/(ar|en)/, '')
  const href = `/${target}${rest || ''}`

  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center rounded-md border border-navy-900/20 px-3 py-2 text-sm font-medium text-navy-900 hover:bg-navy-900/5"
      hrefLang={target}
    >
      {target === 'ar' ? 'العربية' : 'English'}
    </Link>
  )
}
