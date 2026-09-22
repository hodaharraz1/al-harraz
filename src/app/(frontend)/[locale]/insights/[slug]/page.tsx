import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { isLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { articleSchema, breadcrumbSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { RichText } from '@/components/ui/RichText'
import { Badge } from '@/components/ui/Badge'

// CMS-backed page: revalidate periodically so CMS publishes appear without a redeploy.
export const revalidate = 60

async function getArticle(locale: Locale, slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
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
  const doc = await getArticle(locale, slug)
  if (!doc) return {}
  const seo = doc['seo'] as { metaTitle?: string; metaDescription?: string; noindex?: boolean } | undefined
  return buildMetadata({
    locale,
    path: `/insights/${slug}`,
    title: seo?.metaTitle || (doc['title'] as string),
    description: seo?.metaDescription || (doc['excerpt'] as string) || '',
    noindex: seo?.noindex,
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const dict = getDictionary(locale)
  const doc = await getArticle(locale, slug)
  if (!doc) notFound()

  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` },
    { name: dict.nav.insights, url: `/${locale}/insights` },
    { name: doc['title'] as string, url: `/${locale}/insights/${slug}` },
  ]
  const author = doc['author'] as { name?: string } | null
  const publishDate = doc['publishDate'] as string | undefined
  const lastReviewedDate = doc['lastReviewedDate'] as string | undefined

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={articleSchema({
          title: doc['title'] as string,
          description: (doc['excerpt'] as string) || '',
          authorName: author?.name,
          publishDate,
          lastReviewedDate,
        })}
      />
      <Section tone="light">
        <Breadcrumbs items={breadcrumbs} />
        {doc['category'] ? <div className="mt-4"><Badge>{doc['category'] as string}</Badge></div> : null}
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{doc['title'] as string}</h1>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-900/60">
          {author?.name ? <span>{author.name}</span> : null}
          {publishDate ? <span>{new Date(publishDate).toLocaleDateString(locale)}</span> : null}
          {lastReviewedDate ? (
            <span>
              {dict.common.lastReviewed}: {new Date(lastReviewedDate).toLocaleDateString(locale)}
            </span>
          ) : null}
        </div>

        <div className="mt-10 max-w-3xl">
          <RichText data={doc['body'] as never} />
        </div>

        <p className="mt-10 max-w-3xl border-t border-navy-900/10 pt-6 text-xs text-navy-900/60">{dict.disclaimer}</p>
      </Section>
    </>
  )
}
