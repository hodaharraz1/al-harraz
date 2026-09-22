import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { isLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema, organizationSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { RichText } from '@/components/ui/RichText'
import { Card } from '@/components/ui/Card'
import { LinkButton } from '@/components/ui/Button'
import { FaqSection } from '@/components/home/FaqSection'

// CMS-backed page: revalidate periodically so CMS publishes appear without a redeploy.
export const revalidate = 60

async function getPracticeArea(locale: Locale, slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'practice-areas',
    locale,
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 2,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const doc = await getPracticeArea(locale, slug)
  if (!doc) return {}

  const seo = doc['seo'] as { metaTitle?: string; metaDescription?: string; noindex?: boolean } | undefined
  return buildMetadata({
    locale,
    path: `/practice-areas/${slug}`,
    title: seo?.metaTitle || (doc['title'] as string),
    description: seo?.metaDescription || (doc['summary'] as string) || '',
    noindex: seo?.noindex,
  })
}

export default async function PracticeAreaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const dict = getDictionary(locale)
  const doc = await getPracticeArea(locale, slug)
  if (!doc) notFound()

  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` },
    { name: dict.nav.expertise, url: `/${locale}/practice-areas` },
    { name: doc['title'] as string, url: `/${locale}/practice-areas/${slug}` },
  ]

  const relatedLawyers = (doc['relatedLawyers'] as Array<{ id: number; slug: string; name: string; role?: string }>) || []
  const relatedIndustries = (doc['relatedIndustries'] as Array<{ id: number; slug: string; title: string }>) || []

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd data={organizationSchema(locale)} />

      <Section tone="light">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 font-heading text-3xl sm:text-4xl">{doc['title'] as string}</h1>
        {doc['summary'] ? <p className="mt-3 max-w-2xl text-lg text-navy-900/80">{doc['summary'] as string}</p> : null}
        {doc['lastReviewedDate'] ? (
          <p className="mt-2 text-xs text-navy-900/70">
            {dict.common.lastReviewed}: {new Date(doc['lastReviewedDate'] as string).toLocaleDateString(locale)}
          </p>
        ) : null}

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <RichText data={doc['overview'] as never} />
            {doc['whoWeHelp'] ? <RichText data={doc['whoWeHelp'] as never} /> : null}
            {doc['legalIssuesCovered'] ? <RichText data={doc['legalIssuesCovered'] as never} /> : null}
            {doc['howWeAssist'] ? <RichText data={doc['howWeAssist'] as never} /> : null}
          </div>

          <aside className="space-y-6">
            <Card>
              <h2 className="text-sm font-semibold text-navy-950">{dict.hero.headline}</h2>
              <p className="mt-2 text-sm text-navy-900/75">{dict.hero.valueProp}</p>
              <LinkButton href={`/${locale}/consultation`} variant="primary" className="mt-4 w-full justify-center">
                {dict.nav.consultation}
              </LinkButton>
            </Card>

            {relatedLawyers.length > 0 ? (
              <Card>
                <h2 className="text-sm font-semibold text-navy-950">{dict.common.relatedLawyers}</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {relatedLawyers.map((lawyer) => (
                    <li key={lawyer.id}>
                      <Link href={`/${locale}/team/${lawyer.slug}`} className="text-cyan-600 hover:underline">
                        {lawyer.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ) : null}

            {relatedIndustries.length > 0 ? (
              <Card>
                <h2 className="text-sm font-semibold text-navy-950">{dict.footer.industries}</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {relatedIndustries.map((industry) => (
                    <li key={industry.id}>
                      <Link href={`/${locale}/industries/${industry.slug}`} className="text-cyan-600 hover:underline">
                        {industry.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ) : null}
          </aside>
        </div>
      </Section>

      <Section tone="neutral">
        <FaqSection locale={locale} heading={dict.common.faqs} practiceAreaId={doc['id'] as number} />
      </Section>
    </>
  )
}
