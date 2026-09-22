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

  it('rejects an unknown locale', () => {
    // @ts-expect-error deliberately invalid input
    const result = consultationSchema.safeParse({ ...validPayload, locale: 'fr' })
    expect(result.success).toBe(false)
  })
})
