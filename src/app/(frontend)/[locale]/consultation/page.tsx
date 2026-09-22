import type { Metadata } from 'next'
import { isLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { ConsultationForm } from '@/components/forms/ConsultationForm'

const copy = {
  ar: { title: 'احجز استشارة', description: 'احجز استشارة قانونية مع فريق مكتب آل حراز.' },
  en: { title: 'Book a Consultation', description: 'Book a legal consultation with the Al Harraz Law Firm team.' },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = copy[locale]
  return buildMetadata({ locale, path: '/consultation', title: t.title, description: t.description })
}

export default async function ConsultationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const dict = getDictionary(locale)
  const t = copy[locale]
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` },
    { name: t.title, url: `/${locale}/consultation` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Section tone="light">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.title}</h1>
        <p className="mt-3 max-w-xl text-navy-900/80">{t.description}</p>
        <p className="mt-3 max-w-xl text-sm font-medium text-alert-red">{dict.consultationWarning}</p>

        <div className="mt-10 max-w-xl">
          <ConsultationForm locale={locale} sourcePage={`/${locale}/consultation`} />
        </div>

        <p className="mt-10 max-w-xl border-t border-navy-900/10 pt-6 text-xs text-navy-900/70">{dict.disclaimer}</p>
      </Section>
    </>
  )
}
