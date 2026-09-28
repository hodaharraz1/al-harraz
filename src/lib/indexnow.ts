import { siteConfig } from '@/lib/site-config'

/**
 * IndexNow (indexnow.org) — lets the site push a changed URL straight into
 * Bing's, Yandex's, and other participating engines' crawl queue instead of
 * waiting for them to rediscover it on their own schedule. Google does not
 * participate in IndexNow; this only helps non-Google engines.
 *
 * The key file at public/<INDEXNOW_KEY>.txt (containing just the key) is
 * what proves to IndexNow that whoever is submitting URLs actually controls
 * this site — the protocol checks that the key file is reachable at the
 * submitted host before accepting the submission.
 */
const INDEXNOW_KEY = '78b8835f0c80979083412bc56e66c97c'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

/**
 * Submits one or more absolute URLs to IndexNow. Fails silently (logs and
 * returns false) on any error — a failed IndexNow ping must never break a
 * CMS save or a page request; it's a best-effort discovery signal, not a
 * critical path.
 */
export async function submitToIndexNow(urls: string[]): Promise<boolean> {
  const validUrls = urls.filter((url) => url.startsWith(siteConfig.siteUrl))
  if (validUrls.length === 0) {
    return false
  }

  try {
    const host = new URL(siteConfig.siteUrl).host
    const response = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host,
        key: INDEXNOW_KEY,
        keyLocation: `${siteConfig.siteUrl}/${INDEXNOW_KEY}.txt`,
        urlList: validUrls,
      }),
    })
    // IndexNow returns 200 or 202 on success; other 2xx/429/etc. are
    // logged but not thrown — see indexnow.org/documentation for codes.
    if (!response.ok) {
      console.error(`IndexNow submission returned ${response.status} for`, validUrls)
      return false
    }
    return true
  } catch (error) {
    console.error('IndexNow submission failed', error)
    return false
  }
}

/** Submits both locale URLs for a single slug under a given path segment. */
export async function submitSlugToIndexNow(pathSegment: string, slug: string): Promise<boolean> {
  return submitToIndexNow([
    `${siteConfig.siteUrl}/ar/${pathSegment}/${slug}`,
    `${siteConfig.siteUrl}/en/${pathSegment}/${slug}`,
  ])
}
