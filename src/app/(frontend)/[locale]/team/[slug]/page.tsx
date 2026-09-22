import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { isLocale, type Locale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'
import { getPayloadClient } from '@/lib/payload'
import { siteConfig } from '@/lib/site-config'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema, personSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { RichText } from '@/components/ui/RichText'

// CMS-backed page: revalidate periodically so CMS publishes appear without a redeploy.
export const revalidate = 60

async function getLawyer(locale: Locale, slug: string) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'lawyers',
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
  const doc = await getLawyer(locale, slug)
  if (!doc) return {}
  const seo = doc['seo'] as { metaTitle?: string; metaDescription?: string } | undefined
  const name = doc['name'] as string
  const role = doc['role'] as string | undefined
  const firmName = locale === 'ar' ? siteConfig.legalNameAr : siteConfig.legalNameEn
  const fallbackDescription =
    role ||
    (locale === 'ar' ? `${name} — ${firmName}، دمياط.` : `${name} — ${firmName}, Damietta, Egypt.`)
  return buildMetadata({
    locale,
    path: `/team/${slug}`,
    title: seo?.metaTitle || name,
    description: seo?.metaDescription || fallbackDescription,
  })
}

export default async function LawyerProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale: rawLocale, slug } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const dict = getDictionary(locale)
  const doc = await getLawyer(locale, slug)
  if (!doc) notFound()

  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` },
    { name: dict.nav.people, url: `/${locale}/team` },
    { name: doc['name'] as string, url: `/${locale}/team/${slug}` },
  ]
  const practiceAreas = (doc['practiceAreas'] as Array<{ id: number; slug: string; title: string }>) || []
  const education = (doc['education'] as Array<{ item: string }>) || []

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <JsonLd
        data={personSchema({
          name: doc['name'] as string,
          locale,
          role: doc['role'] as string | undefined,
          jobTitleFallback: locale === 'ar' ? 'محامٍ' : 'Lawyer',
        })}
      />
      <Section tone="light">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="h-32 w-32 shrink-0 rounded-full bg-navy-900/10" aria-hidden="true" />
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl">{doc['name'] as string}</h1>
            {doc['role'] ? <p className="mt-1 text-lg text-cyan-600">{doc['role'] as string}</p> : null}
            {doc['isFounder'] ? (
              <p className="mt-2 text-sm text-navy-900/70">
                {locale === 'ar' ? 'مؤسس المكتب' : 'Founder'}
              </p>
            ) : null}
            {doc['courtAdmissionLevel'] ? (
              <p className="mt-1 text-sm text-navy-900/70">{doc['courtAdmissionLevel'] as string}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {doc['professionalSummary'] ? <RichText data={doc['professionalSummary'] as never} /> : null}
            {doc['selectedExperience'] ? <RichText data={doc['selectedExperience'] as never} /> : null}
          </div>
          <aside className="space-y-6 text-sm">
            {education.length > 0 ? (
              <div>
                <h2 className="text-sm font-semibold text-navy-950">
                  {locale === 'ar' ? 'المؤهلات العلمية' : 'Education'}
                </h2>
                <ul className="mt-2 space-y-1 text-navy-900/75">
                  {education.map((entry, i) => (
                    <li key={i}>{entry.item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {practiceAreas.length > 0 ? (
              <div>
                <h2 className="text-sm font-semibold text-navy-950">{dict.nav.expertise}</h2>
                <ul className="mt-2 space-y-1">
                  {practiceAreas.map((pa) => (
                    <li key={pa.id}>
                      <Link href={`/${locale}/practice-areas/${pa.slug}`} className="text-cyan-600 hover:underline">
                        {pa.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </Section>
    </>
  )
}
