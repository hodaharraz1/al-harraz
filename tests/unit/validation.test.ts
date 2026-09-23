import { describe, expect, it } from 'vitest'
import { consultationSchema } from '@/lib/validation'

const validPayload = {
  name: 'Test User',
  phone: '01000000000',
  email: '',
  clientType: 'individual' as const,
  legalArea: '',
  preferredContact: 'phone' as const,
  message: '',
  urgency: 'normal' as const,
  consent: true as const,
  sourcePage: '/ar/consultation',
  locale: 'ar' as const,
  companyWebsite: '',
}

describe('consultationSchema', () => {
  it('accepts a valid submission', () => {
    const result = consultationSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
  })

  it('rejects a submission missing consent', () => {
    const result = consultationSchema.safeParse({ ...validPayload, consent: false })
    expect(result.success).toBe(false)
  })

  it('rejects a submission with a filled honeypot field', () => {
    const result = consultationSchema.safeParse({ ...validPayload, companyWebsite: 'http://spam.example' })
    expect(result.success).toBe(false)
  })

  it('rejects a name that is too short', () => {
    const result = consultationSchema.safeParse({ ...validPayload, name: 'A' })
    expect(result.success).toBe(false)
  })

  it('rejects an invalid email when provided', () => {
    const result = consultationSchema.safeParse({ ...validPayload, email: 'not-an-email' })
    expect(result.success).toBe(false)
  })

  it('accepts a null legalArea (an unselected <select> submits null, not empty string)', () => {
    const result = consultationSchema.safeParse({ ...validPayload, legalArea: null })
    expect(result.success).toBe(true)
  })

  it('rejects an unknown locale', () => {
    // safeParse's input is `unknown` at the type level (runtime validation is
    // the point), so the invalid value is injected via a plain object rather
    // than relying on a compile-time type error.
    const invalid: Record<string, unknown> = { ...validPayload, locale: 'fr' }
    const result = consultationSchema.safeParse(invalid)
    expect(result.success).toBe(false)
  })
})
