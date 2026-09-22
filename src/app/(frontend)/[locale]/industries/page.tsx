import type { Metadata } from 'next'
import { isLocale } from '@/lib/i18n'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { IndustriesGrid } from '@/components/home/IndustriesGrid'

// CMS-backed page: revalidate periodically so CMS publishes appear without a redeploy.
export const revalidate = 60

const copy = {
  ar: { title: 'القطاعات', description: 'نقدم خدماتنا القانونية لمجموعة من القطاعات، مع فهم للتحديات التجارية الخاصة بكل قطاع.' },
  en: { title: 'Industries', description: 'We serve a range of sectors, with an understanding of each industry’s specific business challenges.' },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = copy[locale]
  return buildMetadata({ locale, path: '/industries', title: t.title, description: t.description })
}

export default async function IndustriesIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = copy[locale]
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` },
    { name: t.title, url: `/${locale}/industries` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Section tone="light">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.title}</h1>
        <p className="mt-3 max-w-2xl text-navy-900/80">{t.description}</p>
        <div className="mt-10">
          <IndustriesGrid locale={locale} />
        </div>
      </Section>
    </>
  )
}
