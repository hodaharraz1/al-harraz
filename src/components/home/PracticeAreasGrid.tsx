import Link from 'next/link'
import type { Locale } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'
import { Card } from '@/components/ui/Card'

/**
 * One shared line-art document mark for every practice-area card, rather
 * than a distinct icon per specialty — with 40+ practice areas, a single
 * consistent glyph keeps the same restrained visual weight the rest of the
 * legal-identity system uses (see JusticeMark) instead of risking a mixed,
 * inconsistent icon library across dozens of categories.
 */
function PracticeAreaMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 3h7l4 4v14H7z" />
      <path d="M14 3v4h4" />
      <path d="M9.5 12.5h5" />
      <path d="M9.5 16h5" />
    </svg>
  )
}

export async function PracticeAreasGrid({
  locale,
  limit,
  heading,
  visuallyHiddenHeading = false,
}: {
  locale: Locale
  limit?: number
  heading: string
  visuallyHiddenHeading?: boolean
}) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'practice-areas',
    locale,
    where: { status: { equals: 'published' } },
    limit: limit ?? 100,
    sort: 'order',
    depth: 0,
  })

  if (result.docs.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className={visuallyHiddenHeading ? 'sr-only' : 'text-2xl font-bold sm:text-3xl font-heading'}>{heading}</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {result.docs.map((doc) => (
          <Link key={doc.id} href={`/${locale}/practice-areas/${doc['slug']}`}>
            <Card className="h-full">
              <PracticeAreaMark className="h-6 w-6 text-cyan-600/70" />
              <h3 className="mt-3 text-base font-semibold text-navy-950">{doc['title'] as string}</h3>
              {doc['summary'] ? (
                <p className="mt-2 line-clamp-3 text-sm text-navy-900/75">{doc['summary'] as string}</p>
              ) : null}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
