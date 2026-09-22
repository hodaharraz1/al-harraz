import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { isLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { RichText } from '@/components/ui/RichText'
import { Card } from '@/components/ui/Card'

// CMS-backed page: revalidate periodically so CMS publishes appear without a redeploy.
export const revalidate = 60

async function getIndustry(locale: Locale, slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'industries',
    locale,
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
    depth: 1,
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
  const doc = await getIndustry(locale, slug)
  if (!doc) return {}
  const seo = doc['seo'] as { metaTitle?: string; metaDescription?: string; noindex?: boolean } | undefined
  return buildMetadata({
    locale,
    path: `/industries/${slug}`,
    title: seo?.metaTitle || (doc['title'] as string),
    description: seo?.metaDescription || (doc['summary'] as string) || '',
    noindex: seo?.noindex,
  })
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const dict = getDictionary(locale)
  const doc = await getIndustry(locale, slug)
  if (!doc) notFound()

  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` },
    { name: dict.footer.industries, url: `/${locale}/industries` },
    { name: doc['title'] as string, url: `/${locale}/industries/${slug}` },
  ]
  const relatedPracticeAreas = (doc['relatedPracticeAreas'] as Array<{ id: number; slug: string; title: string }>) || []

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Section tone="light">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 font-heading text-3xl sm:text-4xl">{doc['title'] as string}</h1>
        {doc['summary'] ? <p className="mt-3 max-w-2xl text-lg text-navy-900/80">{doc['summary'] as string}</p> : null}

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RichText data={doc['businessProblems'] as never} />
          </div>
          {relatedPracticeAreas.length > 0 ? (
            <aside>
              <Card>
                <h2 className="text-sm font-semibold text-navy-950">{dict.common.relatedServices}</h2>
                <ul className="mt-3 space-y-2 text-sm">
                  {relatedPracticeAreas.map((pa) => (
                    <li key={pa.id}>
                      <Link href={`/${locale}/practice-areas/${pa.slug}`} className="text-cyan-600 hover:underline">
                        {pa.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            </aside>
          ) : null}
        </div>
      </Section>
    </>
  )
}
