import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionary'
import { LinkButton } from '@/components/ui/Button'
import { buildWhatsAppLink } from '@/lib/whatsapp'

const copy = {
  ar: { heading: 'هل لديك مسألة قانونية؟', body: 'تواصل معنا اليوم لحجز استشارة مع فريقنا القانوني.' },
  en: { heading: 'Have a Legal Matter?', body: 'Get in touch today to book a consultation with our legal team.' },
} as const

export function ConsultationCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = copy[locale]
  return (
    <div className="rounded-[var(--radius-card)] bg-cyan-600 p-8 text-center text-white sm:p-12">
      <h2 className="text-2xl font-bold sm:text-3xl font-heading">{t.heading}</h2>
      <p className="mt-2 text-cyan-50">{t.body}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <LinkButton href={`/${locale}/consultation`} variant="secondary">
          {dict.hero.ctaPrimary}
        </LinkButton>
        <LinkButton
          href={buildWhatsAppLink(locale, 'consultation')}
          variant="ghost"
          className="border-white/40 text-white hover:bg-white/10"
          target="_blank"
          rel="noopener noreferrer"
        >
          {dict.hero.ctaSecondary}
        </LinkButton>
      </div>
    </div>
  )
}
