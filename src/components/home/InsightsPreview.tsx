import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

export async function InsightsPreview({
  locale,
  heading,
  visuallyHiddenHeading = false,
  limit = 3,
}: {
  locale: Locale
  heading: string
  visuallyHiddenHeading?: boolean
  limit?: number
}) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'articles',
    locale,
    where: { status: { equals: 'published' } },
    limit,
    sort: '-publishDate',
    depth: 0,
  })

  if (result.docs.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className={visuallyHiddenHeading ? 'sr-only' : 'text-2xl font-bold sm:text-3xl font-heading'}>{heading}</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {result.docs.map((doc) => (
          <Link key={doc.id} href={`/${locale}/insights/${doc['slug']}`}>
            <Card className="h-full">
              {doc['category'] ? <Badge>{doc['category'] as string}</Badge> : null}
              <h3 className="mt-3 text-sm font-semibold text-navy-950">{doc['title'] as string}</h3>
              {doc['excerpt'] ? (
                <p className="mt-2 line-clamp-2 text-xs text-navy-900/70">{doc['excerpt'] as string}</p>
              ) : null}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
