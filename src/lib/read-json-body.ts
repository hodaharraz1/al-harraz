import type { NextRequest } from 'next/server'

const MAX_BODY_BYTES = 50 * 1024 // 50KB — generous for this text-only form, small enough to make an oversized-body abuse attempt cheap to reject

export class BodyTooLargeError extends Error {}

/**
 * Reads and parses a request body as JSON, rejecting anything over
 * MAX_BODY_BYTES before it's fully buffered into memory. Next.js Route
 * Handlers (App Router) have no built-in request body size limit the way
 * Pages API routes did — `request.json()` alone will happily buffer an
 * arbitrarily large body before any of our own validation runs.
 */
export async function readJsonBody(request: NextRequest): Promise<unknown> {
  const contentLength = request.headers.get('content-length')
  if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
    throw new BodyTooLargeError()
  }

  const reader = request.body?.getReader()
  if (!reader) {
    // No body stream at all (e.g. an empty request) — let JSON.parse('') fail normally below.
    return JSON.parse('')
  }

  const chunks: Uint8Array[] = []
  let received = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    received += value.byteLength
    if (received > MAX_BODY_BYTES) {
      await reader.cancel()
      throw new BodyTooLargeError()
    }
    chunks.push(value)
  }

  const bytes = new Uint8Array(received)
  let offset = 0
  for (const chunk of chunks) {
    bytes.set(chunk, offset)
    offset += chunk.byteLength
  }

  return JSON.parse(new TextDecoder().decode(bytes))
}
