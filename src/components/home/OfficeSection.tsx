import type { Locale } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'

const copy = {
  ar: {
    heading: 'مقر المكتب',
    directions: 'الحصول على الاتجاهات',
    callForDirections: 'اتصل بنا للاستفسار عن أقرب الطرق للوصول إلى المكتب.',
  },
  en: {
    heading: 'Our Office',
    directions: 'Get Directions',
    callForDirections: 'Call us and we can help you find the office.',
  },
} as const

export function OfficeSection({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const address = locale === 'ar' ? siteConfig.addressAr : siteConfig.addressEn

  return (
    <div>
      <h2 className="text-2xl font-bold sm:text-3xl font-heading">{t.heading}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-navy-900/85">{address}</p>
          <p className="mt-2 text-navy-900/85">
            <a href={`tel:${siteConfig.phoneInternational}`}>{siteConfig.phoneDisplay}</a>
          </p>
          {siteConfig.googleBusinessProfileUrl ? (
            <a
              href={siteConfig.googleBusinessProfileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-cyan-600"
            >
              {t.directions} →
            </a>
          ) : null}
        </div>
        <div className="flex items-center justify-center rounded-[var(--radius-card)] bg-neutral-100 p-8 text-center text-sm text-navy-900/70">
          {t.callForDirections}
        </div>
      </div>
    </div>
  )
}
