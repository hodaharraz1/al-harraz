/**
 * Whether this deployment should be crawlable/indexable at all. Vercel sets
 * VERCEL_ENV automatically (production/preview/development) — any deploy
 * that isn't production (a PR preview, a branch deploy) is blocked from
 * indexing by default, since previously nothing here checked the
 * environment at all and robots.txt unconditionally allowed indexing on
 * every deployment, preview URLs included.
 *
 * SITE_INDEXABLE is an explicit override for hosts that don't set
 * VERCEL_ENV (e.g. Netlify, or `next start` outside Vercel) — set it to
 * "true" to allow indexing there, or "false" to force it off even on
 * Vercel production (e.g. before the site is ready to be found).
 */
export function isSiteIndexable(): boolean {
  const override = process.env['SITE_INDEXABLE']
  if (override === 'true') return true
  if (override === 'false') return false

  const vercelEnv = process.env['VERCEL_ENV']
  if (vercelEnv) return vercelEnv === 'production'

  // No Vercel env and no explicit override — most likely a non-Vercel host
  // or a plain `next start`. Default to indexable so a real, intentional
  // deployment isn't silently noindexed; set SITE_INDEXABLE=false
  // explicitly for a non-Vercel staging deploy.
  return true
}
