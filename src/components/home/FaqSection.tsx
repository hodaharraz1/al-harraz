import type { Locale } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'
import { AccentRule } from '@/components/ui/AccentRule'
import { faqPageSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'

export async function FaqSection({
  locale,
  heading,
  practiceAreaId,
}: {
  locale: Locale
  heading: string
  practiceAreaId?: number
}) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'faqs',
    locale,
    where: {
      status: { equals: 'published' },
      ...(practiceAreaId ? { relatedPracticeArea: { equals: practiceAreaId } } : {}),
    },
    limit: 10,
    depth: 0,
  })

  if (result.docs.length === 0) {
    return null
  }

  // FAQPage schema mirrors exactly what's rendered below (same query, same
  // items) — this makes every page that renders real FAQs (the homepage,
  // and any practice-area page with FAQs tied to it, e.g. civil-law)
  // correctly eligible for FAQ rich results, not just the homepage.
  const faqItems = result.docs.map((doc) => ({
    question: doc['question'] as string,
    answer: doc['answer'] as string,
  }))

  return (
    <div>
      <JsonLd data={faqPageSchema(faqItems)} />
      <AccentRule className="mb-3" />
      <h2 className="text-2xl font-bold sm:text-3xl font-heading">{heading}</h2>
      <dl className="mt-8 divide-y divide-navy-900/10">
        {result.docs.map((doc) => (
          <div key={doc.id} className="py-5">
            <dt className="text-base font-semibold text-navy-950">{doc['question'] as string}</dt>
            <dd className="mt-2 text-sm text-navy-900/75">{doc['answer'] as string}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
