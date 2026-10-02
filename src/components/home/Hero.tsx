import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionary'
import { LinkButton } from '@/components/ui/Button'
import { HeroBackdrop } from '@/components/ui/HeroBackdrop'
import { AccentRule } from '@/components/ui/AccentRule'
import { buildWhatsAppLink, buildTelLink } from '@/lib/whatsapp'

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-neutral-50">
      <HeroBackdrop locale={locale} />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-xl text-center lg:mx-0 lg:me-auto lg:max-w-2xl lg:text-start">
          <div className="flex flex-col items-center gap-3 lg:items-start">
            <AccentRule />
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">{dict.trust.since}</p>
          </div>

          <h1 className="font-heading mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
            {dict.hero.headline}
          </h1>
          <p className="mt-6 text-xl font-medium text-cyan-300 sm:text-2xl">{dict.hero.subheadline}</p>
          <p className="mx-auto mt-6 max-w-lg text-base text-neutral-100/80 sm:text-lg lg:mx-0">
            {dict.hero.valueProp}
          </p>

          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <LinkButton href={`/${locale}/consultation`} variant="invert">
                {dict.hero.ctaPrimary}
              </LinkButton>
              <LinkButton
                href={buildWhatsAppLink(locale, 'general')}
                variant="invert-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {dict.hero.ctaSecondary}
              </LinkButton>
            </div>

            <p className="mt-6 text-sm">
              <a href={buildTelLink()} className="text-cyan-300 underline-offset-4 hover:underline">
                {dict.hero.ctaTertiary}
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-8 text-sm text-neutral-100/70 sm:px-6">
          <TrustItem label={dict.trust.team} />
          <Divider />
          <TrustItem label={dict.trust.fullService} />
          <Divider />
          <TrustItem label={dict.trust.nationwide} />
        </div>
      </div>
    </section>
  )
}

function TrustItem({ label }: { label: string }) {
  return <p className="font-medium">{label}</p>
}

function Divider() {
  return <span className="hidden h-3 w-px bg-white/20 sm:block" aria-hidden="true" />
}
