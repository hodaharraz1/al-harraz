import type { Locale } from '@/lib/i18n'

export function SkipLink({ locale }: { locale: Locale }) {
  const label = locale === 'ar' ? 'تخطَّ إلى المحتوى' : 'Skip to content'
  return (
    <a href="#main-content" className="skip-link">
      {label}
    </a>
  )
}
