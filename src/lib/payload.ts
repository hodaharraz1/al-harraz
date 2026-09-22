import { getPayload } from 'payload'
import config from '@payload-config'

let cached: ReturnType<typeof getPayload> | null = null

/**
 * Returns a singleton Payload Local API instance. Safe to call from React
 * Server Components and Route Handlers — never from the browser.
 */
export function getPayloadClient() {
  if (!cached) {
    cached = getPayload({ config })
  }
  return cached
}
