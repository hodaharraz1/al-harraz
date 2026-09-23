import type { Locale } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'

const copy = {
  ar: {
    heading: 'مقر المكتب',
    directions: 'الحصول على الاتجاهات',
    mapTitle: 'خريطة توضح موقع المكتب',
  },
  en: {
    heading: 'Our Office',
    directions: 'Get Directions',
    mapTitle: 'Map showing the office location',
  },
} as const

export function OfficeSection({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const address = locale === 'ar' ? siteConfig.addressAr : siteConfig.addressEn
  const embedSrc = `https://www.google.com/maps?q=${siteConfig.latitude},${siteConfig.longitude}&z=16&output=embed`

  return (
    <div>
      <h2 className="font-heading text-2xl sm:text-3xl">{t.heading}</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-navy-900/85">{address}</p>
          <p className="mt-2 text-navy-900/85">
            <a href={`tel:${siteConfig.phoneInternational}`}>{siteConfig.phoneDisplay}</a>
          </p>
          <a
            href={siteConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm font-semibold text-cyan-600 underline-offset-4 hover:underline"
          >
            {t.directions} →
          </a>
        </div>
        <div className="overflow-hidden rounded-[var(--radius-card)]">
          <iframe
            src={embedSrc}
            title={t.mapTitle}
            className="h-64 w-full border-0 sm:h-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  )
}
