/**
 * One-time (or occasional manual re-run) bulk IndexNow submission of every
 * URL currently in the live sitemap. Ongoing new/updated content is
 * already covered automatically by the afterChange hooks on Articles and
 * PracticeAreas (src/lib/indexnow.ts) — this script exists to push
 * everything that existed *before* that hook was added, and as a manual
 * fallback if IndexNow ever needs a full re-sync.
 *
 * Usage: npx tsx scripts/submit-all-to-indexnow.ts
 */
import { submitToIndexNow } from '../src/lib/indexnow'
import { siteConfig } from '../src/lib/site-config'

async function main() {
  const sitemapUrl = `${siteConfig.siteUrl}/sitemap.xml`
  const response = await fetch(sitemapUrl)
  if (!response.ok) {
    console.error(`Failed to fetch sitemap: ${response.status}`)
    process.exit(1)
  }
  const xml = await response.text()
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])

  if (urls.length === 0) {
    console.error('No URLs found in sitemap.')
    process.exit(1)
  }

  console.log(`Submitting ${urls.length} URLs to IndexNow...`)

  // IndexNow accepts up to 10,000 URLs per request — well within our count,
  // but batch anyway in case the sitemap grows a lot later.
  const BATCH_SIZE = 5000
  let allOk = true
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE)
    const ok = await submitToIndexNow(batch)
    console.log(`Batch ${i / BATCH_SIZE + 1}: ${ok ? 'OK' : 'FAILED'} (${batch.length} URLs)`)
    allOk = allOk && ok
  }

  process.exit(allOk ? 0 : 1)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
