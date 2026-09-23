import type { CollectionConfig } from 'payload'

/**
 * Internal bookkeeping for the shared consultation-form rate limiter (see
 * src/lib/shared-rate-limit.ts) — not real content, never shown in the
 * admin nav, never accessible via the public REST/GraphQL API. A raw SQL
 * table (outside Payload's own collection system) was tried first, but
 * Payload's dev-mode schema auto-push (active whenever NODE_ENV isn't
 * "production") silently dropped it on every local `getPayload()` call,
 * since it wasn't part of Payload's known schema — modeling it as a real
 * collection makes it visible to both migrate and dev-push consistently.
 */
export const RateLimitEntries: CollectionConfig = {
  slug: 'rate-limit-entries',
  admin: {
    hidden: true,
  },
  access: {
    create: () => false,
    read: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    { name: 'key', type: 'text', required: true, unique: true },
    // Unix-ms timestamps of recent attempts within the current window.
    { name: 'attempts', type: 'json' },
  ],
}
