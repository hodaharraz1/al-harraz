import type { Locale } from '@/lib/i18n'
import Link from 'next/link'

const copy = {
  ar: {
    heading: 'القانون البحري والشحن',
    body: 'بحكم موقعنا في دمياط، نقدم أيضًا خدمات قانونية للمسائل المتعلقة بالنقل البحري والشحن والجمارك والأعمال المرتبطة بالموانئ.',
    cta: 'تعرف على خدمات القانون البحري',
  },
  en: {
    heading: 'Maritime, Shipping & Ports',
    body: 'Given our Damietta location, we also provide legal services for matters related to shipping, maritime transport, customs, and port-related business.',
    cta: 'Explore Maritime Legal Services',
  },
} as const

export function MaritimeNote({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return (
    <div className="flex flex-col items-start justify-between gap-4 border-t border-navy-900/10 pt-8 sm:flex-row sm:items-center">
      <div>
        <h3 className="text-base font-semibold text-navy-950">{t.heading}</h3>
        <p className="mt-1 max-w-xl text-sm text-navy-900/70">{t.body}</p>
      </div>
      <Link
        href={`/${locale}/practice-areas/maritime-shipping-port-law`}
        className="shrink-0 text-sm font-semibold text-cyan-600 underline-offset-4 hover:underline"
      >
        {t.cta} →
      </Link>
    </div>
  )
}
