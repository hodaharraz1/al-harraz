import { describe, expect, it } from 'vitest'
import { buildWhatsAppLink, buildTelLink } from '@/lib/whatsapp'
import { siteConfig } from '@/lib/site-config'

describe('buildWhatsAppLink', () => {
  it('builds a wa.me link with the firm WhatsApp number', () => {
    const link = buildWhatsAppLink('ar', 'general')
    expect(link.startsWith(`https://wa.me/${siteConfig.whatsappNumber}?text=`)).toBe(true)
  })

  it('produces a different, URL-safe message per context', () => {
    const general = buildWhatsAppLink('ar', 'general')
    const consultation = buildWhatsAppLink('ar', 'consultation')
    expect(general).not.toEqual(consultation)
    for (const link of [general, consultation]) {
      expect(() => new URL(link)).not.toThrow()
    }
  })

  it('produces locale-appropriate messages for ar and en', () => {
    const ar = decodeURIComponent(buildWhatsAppLink('ar', 'general'))
    const en = decodeURIComponent(buildWhatsAppLink('en', 'general'))
    expect(ar).toContain('استشارة')
    expect(en).toContain('consultation')
  })
})

describe('buildTelLink', () => {
  it('builds a tel: link using the international phone number', () => {
    expect(buildTelLink()).toBe(`tel:${siteConfig.phoneInternational}`)
  })
})
