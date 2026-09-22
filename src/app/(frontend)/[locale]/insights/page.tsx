import type { Metadata } from 'next'
import { isLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { InsightsPreview } from '@/components/home/InsightsPreview'

// CMS-backed page: revalidate periodically so CMS publishes appear without a redeploy.
export const revalidate = 60

const copy = {
  ar: {
    title: 'المكتبة القانونية',
    description: 'مقالات وأدلة قانونية بمراجعة قانونية متخصصة، تشمل التحديثات القانونية وقضايا الشحن والقانون البحري.',
  },
  en: {
    title: 'Insights',
    description: 'Legally reviewed articles and guides, including legal updates and maritime/shipping law topics.',
  },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = copy[locale]
  return buildMetadata({ locale, path: '/insights', title: t.title, description: t.description })
}

export default async function InsightsIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const dict = getDictionary(locale)
  const t = copy[locale]
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` },
    { name: t.title, url: `/${locale}/insights` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Section tone="light">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.title}</h1>
        <p className="mt-3 max-w-2xl text-navy-900/80">{t.description}</p>
        <p className="mt-4 max-w-2xl text-xs text-navy-900/50">{dict.disclaimer}</p>
        <div className="mt-10">
          <InsightsPreview locale={locale} heading="" limit={100} />
        </div>
      </Section>
    </>
  )
}
