import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'
import { Card } from '@/components/ui/Card'

export async function IndustriesGrid({
  locale,
  limit,
  heading,
}: {
  locale: Locale
  limit?: number
  heading?: string
}) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'industries',
    locale,
    where: { status: { equals: 'published' } },
    limit: limit ?? 100,
    sort: 'title',
    depth: 0,
  })

  if (result.docs.length === 0) {
    return null
  }

  return (
    <div>
      {heading ? <h2 className="text-2xl font-bold sm:text-3xl">{heading}</h2> : null}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {result.docs.map((doc) => (
          <Link key={doc.id} href={`/${locale}/industries/${doc['slug']}`}>
            <Card className="h-full">
              <h3 className="text-sm font-semibold text-navy-950">{doc['title'] as string}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
