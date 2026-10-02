import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'
import { Card } from '@/components/ui/Card'
import { JusticeMark } from '@/components/ui/JusticeMark'

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
      <h2 className={visuallyHiddenHeading ? 'sr-only' : 'text-2xl font-bold sm:text-3xl font-heading'}>{heading}</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {result.docs.map((doc) => (
          <Link key={doc.id} href={`/${locale}/team/${doc['slug']}`}>
            <Card className="h-full text-center">
              <div
                className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan-600/20 bg-navy-900/5"
                aria-hidden="true"
              >
                <span className="font-heading text-2xl text-navy-900/35">{(doc['name'] as string).trim().charAt(0)}</span>
                <JusticeMark className="pointer-events-none absolute -bottom-0.5 -end-0.5 h-5 w-5 text-cyan-600/60" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-navy-950">{doc['name'] as string}</h3>
              {doc['role'] ? <p className="mt-1 text-xs text-navy-900/70">{doc['role'] as string}</p> : null}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
