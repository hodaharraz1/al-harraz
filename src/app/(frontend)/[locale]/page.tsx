import type { Metadata } from 'next'
import { isLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { buildMetadata } from '@/lib/seo'
import { organizationSchema, websiteSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { Hero } from '@/components/home/Hero'
import { HelpSplit } from '@/components/home/HelpSplit'
import { PracticeAreasGrid } from '@/components/home/PracticeAreasGrid'
import { MaritimeFeature } from '@/components/home/MaritimeFeature'
import { isMaritimeHubPublished } from '@/lib/maritime'
import { HeritageSection } from '@/components/home/HeritageSection'
import { TeamPreview } from '@/components/home/TeamPreview'
import { IndustriesGrid } from '@/components/home/IndustriesGrid'
import { WhyUs } from '@/components/home/WhyUs'
import { InsightsPreview } from '@/components/home/InsightsPreview'
import { FaqSection } from '@/components/home/FaqSection'
import { ConsultationCta } from '@/components/home/ConsultationCta'
import { OfficeSection } from '@/components/home/OfficeSection'

// CMS-backed page: revalidate periodically so CMS publishes appear without a redeploy.
export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const dict = getDictionary(locale)
  return buildMetadata({
    locale,
    path: '',
    title: dict.hero.headline,
    description: dict.hero.valueProp,
  })
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const dict = getDictionary(locale)
  const maritimeHubPublished = await isMaritimeHubPublished()

  return (
    <>
      <JsonLd data={organizationSchema(locale)} />
      <JsonLd data={websiteSchema()} />

      <Hero locale={locale} dict={dict} />

      <Section tone="light">
        <PracticeAreasGrid locale={locale} limit={6} heading={locale === 'ar' ? 'أبرز مجالات العمل' : 'Major Practice Areas'} />
      </Section>

      <HelpSplit locale={locale} />

      <Section tone="light">
        <MaritimeFeature locale={locale} isPublished={maritimeHubPublished} />
      </Section>

      <Section tone="neutral">
        <HeritageSection locale={locale} />
      </Section>

      <Section tone="light">
        <TeamPreview locale={locale} heading={locale === 'ar' ? 'تعرف على فريقنا' : 'Meet the Team'} />
      </Section>

      <Section tone="neutral">
        <IndustriesGrid locale={locale} limit={8} heading={locale === 'ar' ? 'القطاعات' : 'Industries'} />
      </Section>

      <Section tone="light">
        <WhyUs locale={locale} />
      </Section>

      <Section tone="neutral">
        <InsightsPreview locale={locale} heading={locale === 'ar' ? 'أحدث المقالات' : 'Latest Insights'} />
      </Section>

      <Section tone="light">
        <FaqSection locale={locale} heading={dict.common.faqs} />
      </Section>

      <Section tone="dark">
        <ConsultationCta locale={locale} dict={dict} />
      </Section>

      <Section tone="light">
        <OfficeSection locale={locale} />
      </Section>
    </>
  )
}
