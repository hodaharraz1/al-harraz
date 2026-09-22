import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { consultationSchema } from '@/lib/validation'
import { isRateLimited } from '@/lib/rate-limit'
import { getPayloadClient } from '@/lib/payload'

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
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
