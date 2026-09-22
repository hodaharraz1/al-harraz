import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionary'
import { LinkButton } from '@/components/ui/Button'
import { buildWhatsAppLink, buildTelLink } from '@/lib/whatsapp'

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="bg-navy-950 text-neutral-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-400">{dict.trust.since}</p>
        <h1 className="font-heading mt-3 max-w-3xl text-3xl leading-tight sm:text-5xl">{dict.hero.headline}</h1>
        <p className="mt-3 text-lg font-medium text-cyan-300">{dict.hero.subheadline}</p>
        <p className="mt-5 max-w-2xl text-base text-neutral-100/85 sm:text-lg">{dict.hero.valueProp}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href={`/${locale}/consultation`} variant="primary">
            {dict.hero.ctaPrimary}
          </LinkButton>
          <LinkButton
            href={buildWhatsAppLink(locale, 'general')}
            variant="secondary"
            className="border-white text-white hover:bg-white hover:text-navy-950"
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.hero.ctaSecondary}
          </LinkButton>
          <LinkButton href={buildTelLink()} variant="ghost" className="border-white/30 text-white hover:bg-white/10">
            {dict.hero.ctaTertiary}
          </LinkButton>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 text-sm sm:grid-cols-4 sm:px-6 lg:px-8">
          <TrustItem label={dict.trust.since} />
          <TrustItem label={dict.trust.team} />
          <TrustItem label={dict.trust.fullService} />
          <TrustItem label={dict.trust.nationwide} />
        </div>
      </div>
    </section>
  )
}

function TrustItem({ label }: { label: string }) {
  return <p className="font-semibold text-neutral-50/90">{label}</p>
}
