import type { Metadata } from 'next'
import { isLocale } from '@/lib/i18n'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { TeamPreview } from '@/components/home/TeamPreview'

// CMS-backed page: revalidate periodically so CMS publishes appear without a redeploy.
export const revalidate = 60

const copy = {
  ar: { title: 'المحامون', description: 'فريق مكتب آل حراز يضم 15 محاميًا يغطون مختلف فروع القانون المصري.' },
  en: { title: 'People', description: 'The Al Harraz team of 15 lawyers covers the main areas of Egyptian law.' },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = copy[locale]
  return buildMetadata({ locale, path: '/team', title: t.title, description: t.description })
}

export default async function TeamIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = copy[locale]
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` },
    { name: t.title, url: `/${locale}/team` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Section tone="light">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.title}</h1>
        <p className="mt-3 max-w-2xl text-navy-900/80">{t.description}</p>
        <p className="mt-6 text-sm text-navy-900/60">
          {locale === 'ar'
            ? 'يتم نشر الملفات الشخصية للفريق المكون من 15 محاميًا تباعًا فور توفر بياناتها الموثقة.'
            : 'Profiles for the 15-lawyer team are published progressively as verified data becomes available.'}
        </p>
        <div className="mt-10">
          <TeamPreview locale={locale} heading="" limit={100} />
        </div>
      </Section>
    </>
  )
}
