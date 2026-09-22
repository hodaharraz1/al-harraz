import { siteConfig } from '@/lib/site-config'
import type { Locale } from '@/lib/i18n'

export type WhatsAppContext = 'general' | 'maritime' | 'consultation'

const messages: Record<Locale, Record<WhatsAppContext, string>> = {
  ar: {
    general: 'مرحبًا، أريد الاستفسار عن استشارة قانونية من خلال موقع مكتب آل حراز.',
    maritime: 'مرحبًا، لدي استفسار بخصوص مسألة قانونية متعلقة بالشحن/القانون البحري.',
    consultation: 'مرحبًا، أرغب في حجز استشارة قانونية مع مكتب آل حراز.',
  },
  en: {
    general: 'Hello, I would like to enquire about a legal consultation via the Al Harraz Law Firm website.',
    maritime: 'Hello, I have an enquiry regarding a shipping/maritime law matter.',
    consultation: 'Hello, I would like to book a legal consultation with Al Harraz Law Firm.',
  },
}

export function buildWhatsAppLink(locale: Locale, context: WhatsAppContext = 'general'): string {
  const text = encodeURIComponent(messages[locale][context])
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`
}

export function buildTelLink(): string {
  return `tel:${siteConfig.phoneInternational}`
}
