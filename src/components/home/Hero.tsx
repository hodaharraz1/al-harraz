import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionary'
import { LinkButton } from '@/components/ui/Button'
import { buildWhatsAppLink, buildTelLink } from '@/lib/whatsapp'

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section
      className="relative overflow-hidden bg-navy-950 text-neutral-50"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(53, 194, 221, 0.16), transparent), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(166, 124, 61, 0.12), transparent)',
      }}
    >
      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">{dict.trust.since}</p>
        <h1 className="font-heading mx-auto mt-5 max-w-3xl text-5xl leading-[1.05] sm:text-7xl lg:text-8xl">
          {dict.hero.headline}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-xl font-medium text-cyan-300 sm:text-2xl">{dict.hero.subheadline}</p>
        <p className="mx-auto mt-6 max-w-2xl text-base text-neutral-100/80 sm:text-lg">{dict.hero.valueProp}</p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 py-8 text-sm text-neutral-100/70 sm:px-6">
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
