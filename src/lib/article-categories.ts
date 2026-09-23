import type { Locale } from '@/lib/i18n'

// Mirrors the `category` select options in src/collections/Articles.ts —
// the field stores the English enum value, so it needs a label lookup to
// display in Arabic rather than leaking the raw value ("litigation").
const labels: Record<string, { ar: string; en: string }> = {
  guides: { ar: 'أدلة قانونية', en: 'Legal Guides' },
  updates: { ar: 'تحديثات قانونية', en: 'Legal Updates' },
  business: { ar: 'قانون الأعمال', en: 'Business Law' },
  litigation: { ar: 'التقاضي والمنازعات', en: 'Litigation' },
  family: { ar: 'الأحوال الشخصية', en: 'Family Law' },
  criminal: { ar: 'القانون الجنائي', en: 'Criminal Law' },
  corporate: { ar: 'الشركات', en: 'Corporate' },
  maritime: { ar: 'القانون البحري والشحن', en: 'Maritime & Shipping' },
  customs: { ar: 'الجمارك والاستيراد والتصدير', en: 'Customs & Import/Export' },
  employment: { ar: 'قانون العمل', en: 'Employment' },
  'real-estate': { ar: 'العقارات', en: 'Real Estate' },
  faqs: { ar: 'الأسئلة الشائعة', en: 'FAQs' },
}

export function articleCategoryLabel(category: string, locale: Locale): string {
  return labels[category]?.[locale] ?? category
}
