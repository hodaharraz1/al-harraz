import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionary'
import { LinkButton } from '@/components/ui/Button'
import { HeroJusticeEmblem } from '@/components/ui/HeroJusticeEmblem'
import { buildWhatsAppLink, buildTelLink } from '@/lib/whatsapp'
import { siteConfig } from '@/lib/site-config'

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section
      className="relative overflow-hidden bg-navy-950 text-neutral-50"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(53, 194, 221, 0.16), transparent), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(166, 124, 61, 0.12), transparent)',
      }}
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:py-32">
        <div className="text-center lg:text-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" aria-hidden="true" />
            {dict.trust.since}
          </span>

          <h1 className="font-heading mx-auto mt-6 max-w-2xl text-5xl leading-[1.05] sm:text-6xl lg:mx-0 lg:text-7xl">
            {dict.hero.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-xl font-medium text-cyan-300 sm:text-2xl lg:mx-0">
            {dict.hero.subheadline}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base text-neutral-100/80 sm:text-lg lg:mx-0">
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

        <div className="relative mx-auto flex w-full max-w-sm items-center justify-center lg:max-w-none">
          <HeroJusticeEmblem className="h-64 w-64 text-cyan-300 sm:h-80 sm:w-80 lg:h-[26rem] lg:w-[26rem]" />
          <div className="absolute inset-x-0 bottom-2 flex justify-center sm:bottom-6 lg:bottom-10">
            <span className="inline-flex flex-col items-center rounded-lg border border-bronze-400/30 bg-navy-950/60 px-5 py-2 text-center backdrop-blur-sm">
              <span className="font-heading text-2xl text-bronze-100 sm:text-3xl">{siteConfig.foundingYear}</span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-bronze-400">
                {dict.trust.since}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-8 text-sm text-neutral-100/70 sm:px-6">
          <TrustItem label={dict.trust.since} />
          <Divider />
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
