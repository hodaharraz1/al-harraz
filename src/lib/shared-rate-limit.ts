import crypto from 'node:crypto'
import { getPayloadClient } from './payload'

/**
 * Postgres-backed rate limiting for the consultation form, replacing an
 * in-memory version. An in-memory limiter resets on every deploy/restart
 * and — more importantly — is tracked per serverless function instance,
 * not per deployment: Vercel can and does run multiple concurrent
 * instances of the same route under real traffic, each with its own
 * separate in-memory counter, so "5 requests per 10 minutes" was actually
 * closer to "5 requests per 10 minutes per instance currently warm." This
 * shares one counter across every instance via the `rate-limit-entries`
 * collection (see RateLimitEntries.ts) — no new service, no cost, and
 * (unlike an earlier attempt at a raw out-of-band SQL table) fully visible
 * to Payload's own schema management.
 *
 * Fails OPEN on any database error: a rate-limiter outage should never be
 * the reason a real enquiry gets rejected. The error is logged so a real
 * outage is still visible, but the form keeps accepting submissions.
 */
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_ATTEMPTS = 5

// The key is derived (HMAC-SHA256, keyed with PAYLOAD_SECRET) rather than
// storing the raw IP address directly — this collection only needs to
// answer "have I seen this key too many times recently," never "what IP
// was this," so there's no reason to persist the identifying value itself.
function deriveKey(rawKey: string): string {
  const secret = process.env['PAYLOAD_SECRET'] ?? ''
  return crypto.createHmac('sha256', secret).update(rawKey).digest('hex')
}

export async function isRateLimitedShared(rawKey: string): Promise<boolean> {
  try {
    const payload = await getPayloadClient()
    const key = deriveKey(rawKey)
    const now = Date.now()
    const windowStart = now - WINDOW_MS

    const existing = await payload.find({
      collection: 'rate-limit-entries',
      where: { key: { equals: key } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const doc = existing.docs[0]
    const recentAttempts = ((doc?.attempts as number[] | undefined) ?? []).filter(
      (timestamp) => timestamp > windowStart,
    )

    const limited = recentAttempts.length >= MAX_ATTEMPTS
    if (!limited) {
      recentAttempts.push(now)
    }

    if (doc) {
      await payload.update({
        collection: 'rate-limit-entries',
        id: doc.id,
        data: { attempts: recentAttempts },
        overrideAccess: true,
      })
    } else {
      await payload.create({
        collection: 'rate-limit-entries',
        data: { key, attempts: recentAttempts },
        overrideAccess: true,
      })
    }

    return limited
  } catch (error) {
    console.error('Shared rate limit check failed — failing open (request allowed)', error)
    return false
  }
}
