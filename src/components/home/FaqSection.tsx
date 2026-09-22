import type { Locale } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'

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

  return (
    <div>
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
