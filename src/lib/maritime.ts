import { cache } from 'react'
import { getPayloadClient } from '@/lib/payload'

export const MARITIME_HUB_SLUG = 'maritime-shipping-port-law'

/**
 * The Maritime hub is linked from the persistent Header/Footer nav on every
 * page plus a dedicated homepage feature block, so its publish state is
 * checked once per request and threaded down as a prop — rather than each
 * component querying independently — to avoid a prominent site-wide link
 * pointing at an unpublished (404) page. See TESTING.md for how this was
 * caught (a pre-launch internal-link crawl).
 *
 * Wrapped in React's `cache()` so the layout and the homepage can each call
 * it without issuing a second identical query within the same request.
 */
export const isMaritimeHubPublished = cache(async (): Promise<boolean> => {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'practice-areas',
    where: { slug: { equals: MARITIME_HUB_SLUG }, status: { equals: 'published' } },
    limit: 1,
    depth: 0,
  })
  return result.docs.length > 0
})
