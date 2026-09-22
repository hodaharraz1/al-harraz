import type { Locale } from '@/lib/i18n'
import { LinkButton } from '@/components/ui/Button'
import { buildWhatsAppLink } from '@/lib/whatsapp'

const copy = {
  ar: {
    eyebrow: 'تخصص استراتيجي',
    heading: 'القانون البحري والشحن والخدمات القانونية المرتبطة بالموانئ',
    body: 'بحكم موقعنا في دمياط، نقدم خبرة قانونية متخصصة في منازعات الشحن، مطالبات البضائع، سندات الشحن، مسؤولية الناقل، الجمارك، والتجارة الدولية — دون أي ادعاء بالتبعية الرسمية لميناء دمياط.',
    cta: 'استكشف مركز القانون البحري',
    whatsapp: 'استفسار بحري عبر واتساب',
  },
  en: {
    eyebrow: 'Strategic Specialization',
    heading: 'Maritime, Shipping & Port-Related Legal Services',
    body: 'Given our Damietta location, we provide specialized legal expertise in shipping disputes, cargo claims, bills of lading, carrier liability, customs, and international trade — with no claim of official affiliation with Damietta Port.',
    cta: 'Explore the Maritime Law Center',
    whatsapp: 'Maritime enquiry via WhatsApp',
  },
} as const

export function MaritimeFeature({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return (
    <div className="rounded-[var(--radius-card)] bg-navy-900 p-8 text-neutral-50 sm:p-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-400">{t.eyebrow}</p>
      <h2 className="mt-2 max-w-2xl text-2xl font-bold sm:text-3xl">{t.heading}</h2>
      <p className="mt-4 max-w-2xl text-neutral-100/85">{t.body}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <LinkButton href={`/${locale}/practice-areas/maritime-shipping-port-law`} variant="primary">
          {t.cta}
        </LinkButton>
        <LinkButton
          href={buildWhatsAppLink(locale, 'maritime')}
          variant="ghost"
          className="border-white/30 text-white hover:bg-white/10"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.whatsapp}
        </LinkButton>
      </div>
    </div>
  )
}
