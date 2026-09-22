/**
 * Minimal in-memory, single-instance rate limiter for form submissions.
 * Sufficient for a low-traffic law-firm site on a single server process.
 * NOTE: resets on deploy/restart and does not share state across multiple
 * instances — if the app is horizontally scaled, replace this with a
 * shared store (e.g. Redis) before relying on it as the only defense.
 * See SECURITY.md.
 */
const attempts = new Map<string, number[]>()

const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_ATTEMPTS = 5

export function isRateLimited(key: string): boolean {
  const now = Date.now()
  const timestamps = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_ATTEMPTS) {
    attempts.set(key, timestamps)
    return true
  }

  timestamps.push(now)
  attempts.set(key, timestamps)
  return false
}
