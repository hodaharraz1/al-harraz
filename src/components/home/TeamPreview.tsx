import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'
import { Card } from '@/components/ui/Card'
import { Hexagon } from '@/components/ui/Hexagon'
import { AccentRule } from '@/components/ui/AccentRule'

export async function TeamPreview({
  locale,
  heading,
  visuallyHiddenHeading = false,
  limit = 4,
}: {
  locale: Locale
  heading: string
  visuallyHiddenHeading?: boolean
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
      {visuallyHiddenHeading ? null : <AccentRule className="mb-3" />}
      <h2 className={visuallyHiddenHeading ? 'sr-only' : 'text-2xl font-bold sm:text-3xl font-heading'}>{heading}</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {result.docs.map((doc) => (
          <Link key={doc.id} href={`/${locale}/team/${doc['slug']}`}>
            <Card className="h-full text-center">
              <Hexagon className="mx-auto h-20 w-20 bg-cyan-500">
                <span className="font-heading text-2xl text-white">{(doc['name'] as string).trim().charAt(0)}</span>
              </Hexagon>
              <h3 className="mt-4 text-sm font-semibold text-navy-950">{doc['name'] as string}</h3>
              {doc['role'] ? <p className="mt-1 text-xs text-navy-900/70">{doc['role'] as string}</p> : null}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
