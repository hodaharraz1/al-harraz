import type { Locale } from '@/lib/i18n'
import { LinkButton } from '@/components/ui/Button'

const copy = {
  ar: {
    eyebrow: 'مجال العمل الرئيسي',
    heading: 'خبرة واسعة في المنازعات والقضايا المدنية',
    body: 'يمثل التقاضي والمنازعات المدنية جوهر ممارسة مكتب آل حراز منذ تأسيسه عام 1983 — من صياغة العقود ومراجعتها إلى تمثيل الموكلين في المطالبات والمنازعات أمام المحاكم المدنية بمختلف درجاتها.',
    items: [
      'المنازعات والتقاضي المدني',
      'العقود والالتزامات',
      'التعويضات والمسؤولية المدنية',
      'الملكية والنزاعات العقارية',
      'الإيجارات',
      'تنفيذ الأحكام وتحصيل الحقوق',
    ],
    cta: 'استشارة في قضية مدنية',
  },
  en: {
    eyebrow: 'Primary Practice',
    heading: 'Extensive Experience in Civil Litigation & Disputes',
    body: 'Civil litigation and disputes have been the core of Al Harraz Law Firm’s practice since its founding in 1983 — from drafting and reviewing contracts to representing clients in claims and disputes before the civil courts at every level.',
    items: [
      'Civil Litigation & Disputes',
      'Contracts & Obligations',
      'Compensation & Civil Liability',
      'Property & Real Estate Disputes',
      'Tenancy Matters',
      'Judgment Enforcement & Debt Recovery',
    ],
    cta: 'Request a Civil Law Consultation',
  },
} as const

export function CivilFocus({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-bronze-500">{t.eyebrow}</p>
        <h2 className="font-heading mt-3 text-2xl leading-tight sm:text-4xl">{t.heading}</h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-900/80 sm:text-lg">{t.body}</p>
        <LinkButton href={`/${locale}/practice-areas/civil-law`} variant="secondary" className="mt-6">
          {t.cta}
        </LinkButton>
      </div>

      <ul className="divide-y divide-navy-900/10 border-t border-navy-900/10 lg:mt-2">
        {t.items.map((item, i) => (
          <li key={item} className="flex items-baseline gap-4 py-4">
            <span className="font-heading text-sm text-bronze-500">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-base font-medium text-navy-950">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
