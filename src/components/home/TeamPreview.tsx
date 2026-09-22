import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'
import { Card } from '@/components/ui/Card'

export async function TeamPreview({
  locale,
  heading,
  limit = 4,
}: {
  locale: Locale
  heading: string
  limit?: number
}) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'lawyers',
    locale,
    where: { status: { equals: 'published' } },
    limit,
    sort: '-isFounder',
    depth: 1,
  })

  if (result.docs.length === 0) {
    return null
  }

  return (
    <div>
      {heading ? <h2 className="text-2xl font-bold sm:text-3xl">{heading}</h2> : null}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {result.docs.map((doc) => (
          <Link key={doc.id} href={`/${locale}/team/${doc['slug']}`}>
            <Card className="h-full text-center">
              <div className="mx-auto h-20 w-20 rounded-full bg-navy-900/10" aria-hidden="true" />
              <h3 className="mt-4 text-sm font-semibold text-navy-950">{doc['name'] as string}</h3>
              {doc['role'] ? <p className="mt-1 text-xs text-navy-900/70">{doc['role'] as string}</p> : null}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
