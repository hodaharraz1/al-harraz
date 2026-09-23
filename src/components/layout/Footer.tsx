import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionary'
import { siteConfig } from '@/lib/site-config'
import { Container } from '@/components/ui/Container'
import { buildWhatsAppLink } from '@/lib/whatsapp'

const tagline = {
  ar: 'خبرة قانونية ممتدة منذ عام 1983',
  en: 'Legal Experience Since 1983',
} as const

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const p = `/${locale}`
  const year = new Date().getFullYear()
  const name = locale === 'ar' ? siteConfig.legalNameAr : siteConfig.legalNameEn
  const address = locale === 'ar' ? siteConfig.addressAr : siteConfig.addressEn

  return (
    <footer className="border-t border-navy-900/10 bg-navy-950 text-neutral-100">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Image src="/logo-icon.png" alt="" width={36} height={36} className="h-9 w-9" />
            <p className="font-heading text-lg text-white">{name}</p>
          </div>
          <p className="mt-2 text-sm text-bronze-400">{tagline[locale]}</p>
          <p className="mt-3 text-sm text-neutral-100/80">{dict.footer.description}</p>
        </div>

        <nav aria-label={dict.footer.practiceAreas}>
          <h2 className="text-sm font-semibold text-white">{dict.footer.practiceAreas}</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-100/80">
            <li><Link href={`${p}/practice-areas`}>{dict.common.viewAll}</Link></li>
            <li><Link href={`${p}/industries`}>{dict.footer.industries}</Link></li>
          </ul>
        </nav>

        <nav aria-label={dict.footer.team}>
          <h2 className="text-sm font-semibold text-white">{dict.footer.team}</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-100/80">
            <li><Link href={`${p}/team`}>{dict.footer.team}</Link></li>
            <li><Link href={`${p}/insights`}>{dict.footer.insights}</Link></li>
            <li><Link href={`${p}/about`}>{dict.nav.about}</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold text-white">{dict.footer.contact}</h2>
          <ul className="mt-3 space-y-2 text-sm text-neutral-100/80">
            <li>{address}</li>
            <li><a href={`tel:${siteConfig.phoneInternational}`}>{siteConfig.phoneDisplay}</a></li>
            <li><a href={buildWhatsAppLink(locale, 'general')} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            {siteConfig.email ? <li><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li> : null}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-neutral-100/70 sm:flex-row">
          <p>
            © {year} {name}. {dict.footer.rights}.
          </p>
          <div className="flex gap-4">
            <Link href={`${p}/privacy-policy`}>{dict.footer.privacy}</Link>
            <Link href={`${p}/terms`}>{dict.footer.terms}</Link>
          </div>
        </Container>
      </div>
    </footer>
  )
}
