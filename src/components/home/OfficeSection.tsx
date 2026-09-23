import type { Locale } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'

const copy = {
  ar: {
    heading: 'مقر المكتب',
    directions: 'الحصول على الاتجاهات',
    mapTitle: 'خريطة توضح موقع المكتب',
    hoursLabel: 'مواعيد العمل',
    openDays: 'السبت – الخميس',
    closedDay: 'الجمعة: مغلق',
  },
  en: {
    heading: 'Our Office',
    directions: 'Get Directions',
    mapTitle: 'Map showing the office location',
    hoursLabel: 'Working Hours',
    openDays: 'Saturday – Thursday',
    closedDay: 'Closed Fridays',
  },
} as const

function formatHour(time: string, locale: Locale): string {
  const [h, m] = time.split(':').map(Number)
  const date = new Date(Date.UTC(2000, 0, 1, h, m))
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG' : 'en-US', {
    hour: 'numeric',
    minute: m ? '2-digit' : undefined,
    hour12: true,
    timeZone: 'UTC',
  }).format(date)
}

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

          <div className="mt-5">
            <p className="text-sm font-semibold text-navy-950">{t.hoursLabel}</p>
            <p className="mt-1 text-sm text-navy-900/75">
              {t.openDays}: {formatHour(siteConfig.openingHours.opens, locale)} – {formatHour(siteConfig.openingHours.closes, locale)}
            </p>
            <p className="text-sm text-navy-900/75">{t.closedDay}</p>
          </div>

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
