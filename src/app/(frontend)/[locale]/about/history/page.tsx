import type { Metadata } from 'next'
import { isLocale } from '@/lib/i18n'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { HeritageSection } from '@/components/home/HeritageSection'

// CMS-backed page: revalidate periodically so CMS publishes appear without a redeploy.
export const revalidate = 60

const copy = {
  ar: { title: 'تاريخ المكتب', description: 'أبرز محطات مكتب آل حراز للمحاماة منذ تأسيسه عام 1983.' },
  en: { title: 'Our History', description: 'Key milestones of Al Harraz Law Firm since its founding in 1983.' },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = copy[locale]
  return buildMetadata({ locale, path: '/about/history', title: t.title, description: t.description })
}

export default async function HistoryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = copy[locale]
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` },
    { name: locale === 'ar' ? 'عن المكتب' : 'About', url: `/${locale}/about` },
    { name: t.title, url: `/${locale}/about/history` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Section tone="light">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.title}</h1>
        <div className="mt-10">
          <HeritageSection locale={locale} />
        </div>
      </Section>
    </>
  )
}
