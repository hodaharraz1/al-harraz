import type { Metadata } from 'next'
import { isLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { OfficeSection } from '@/components/home/OfficeSection'
import { LinkButton } from '@/components/ui/Button'
import { buildWhatsAppLink, buildTelLink } from '@/lib/whatsapp'

const copy = {
  ar: { title: 'تواصل معنا', description: 'تواصل مع مكتب آل حراز للمحاماة والاستشارات القانونية في دمياط.' },
  en: { title: 'Contact', description: 'Get in touch with Al Harraz Law Firm & Legal Consultants in Damietta.' },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = copy[locale]
  return buildMetadata({ locale, path: '/contact', title: t.title, description: t.description })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const dict = getDictionary(locale)
  const t = copy[locale]
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` },
    { name: t.title, url: `/${locale}/contact` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Section tone="light">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.title}</h1>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href={buildTelLink()} variant="primary">
            {dict.cta.call}
          </LinkButton>
          <LinkButton href={buildWhatsAppLink(locale, 'general')} variant="secondary" target="_blank" rel="noopener noreferrer">
            {dict.cta.whatsapp}
          </LinkButton>
          <LinkButton href={`/${locale}/consultation`} variant="ghost">
            {dict.nav.consultation}
          </LinkButton>
        </div>
        <div className="mt-12">
          <OfficeSection locale={locale} />
        </div>
      </Section>
    </>
  )
}
