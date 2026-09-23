import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { consultationSchema } from '@/lib/validation'
import { isRateLimitedShared } from '@/lib/shared-rate-limit'
import { getPayloadClient } from '@/lib/payload'
import { readJsonBody, BodyTooLargeError } from '@/lib/read-json-body'

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (await isRateLimitedShared(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.toLowerCase().includes('application/json')) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  // Lightweight CSRF mitigation: this endpoint has no session/auth token to
  // protect (it's a public lead-gen form), so a full CSRF-token scheme
  // would be overkill — but a cross-site page could still script a fetch()
  // POST here, so reject any request whose Origin (or, if the browser
  // omitted it, Referer) doesn't match the host this request actually
  // arrived on. Deliberately compared against the request's own host
  // (request.nextUrl.origin), not a separately-configured site URL, so this
  // can't drift out of sync with reality (e.g. on a preview deployment).
  const siteOrigin = request.nextUrl.origin
  const requestOrigin = request.headers.get('origin')
  const requestReferer = request.headers.get('referer')
  let sourceOrigin: string | null = requestOrigin
  if (sourceOrigin === null && requestReferer) {
    try {
      sourceOrigin = new URL(requestReferer).origin
    } catch {
      sourceOrigin = null
    }
  }
  if (sourceOrigin !== null && sourceOrigin !== siteOrigin) {
    return NextResponse.json({ error: 'Invalid request origin.' }, { status: 403 })
  }

  let body: unknown
  try {
    body = await readJsonBody(request)
  } catch (error) {
    if (error instanceof BodyTooLargeError) {
      return NextResponse.json({ error: 'Request body too large.' }, { status: 413 })
    }
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const parsed = consultationSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 })
  }

  // Honeypot tripped — pretend success so bots don't learn to avoid the field.
  if (parsed.data.companyWebsite) {
    return NextResponse.json({ ok: true })
  }

  const { locale: _locale, companyWebsite: _honeypot, ...data } = parsed.data

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'consultation-submissions',
      // Trusted server-side write after validation above — bypasses the
      // collection's public-facing access control, which intentionally
      // blocks direct create via REST/GraphQL (see ConsultationSubmissions.ts).
      overrideAccess: true,
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || undefined,
        clientType: data.clientType,
        legalArea: data.legalArea || undefined,
        preferredContact: data.preferredContact,
        message: data.message || undefined,
        urgency: data.urgency,
        consent: data.consent,
        sourcePage: data.sourcePage || undefined,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Failed to save consultation submission', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again or contact us by phone.' }, { status: 500 })
  }
}
