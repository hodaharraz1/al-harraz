import type { Locale } from '@/lib/i18n'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { LinkButton } from '@/components/ui/Button'

const copy = {
  ar: {
    heading: 'كيف يمكننا مساعدتك؟',
    individuals: {
      title: 'للأفراد',
      body: 'قضايا الأحوال الشخصية، الميراث، المنازعات المدنية والجنائية، والاستشارات القانونية الشخصية.',
      cta: 'استشارة للأفراد',
    },
    businesses: {
      title: 'للشركات والمؤسسات',
      body: 'تأسيس الشركات، العقود، المنازعات التجارية، الشحن والجمارك، والاستشارات القانونية للأعمال.',
      cta: 'استشارة للشركات',
    },
  },
  en: {
    heading: 'How Can We Help?',
    individuals: {
      title: 'For Individuals',
      body: 'Personal status matters, inheritance, civil and criminal disputes, and personal legal advisory.',
      cta: 'Individual Consultation',
    },
    businesses: {
      title: 'For Businesses',
      body: 'Company formation, contracts, commercial disputes, shipping and customs, and business legal advisory.',
      cta: 'Business Consultation',
    },
  },
} as const

export function HelpSplit({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return (
    <Section tone="neutral">
      <h2 className="text-2xl font-bold sm:text-3xl">{t.heading}</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Card>
          <h3 className="text-lg font-semibold">{t.individuals.title}</h3>
          <p className="mt-2 text-sm text-navy-900/80">{t.individuals.body}</p>
          <LinkButton href={`/${locale}/consultation`} variant="primary" className="mt-4">
            {t.individuals.cta}
          </LinkButton>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold">{t.businesses.title}</h3>
          <p className="mt-2 text-sm text-navy-900/80">{t.businesses.body}</p>
          <LinkButton href={`/${locale}/consultation`} variant="primary" className="mt-4">
            {t.businesses.cta}
          </LinkButton>
        </Card>
      </div>
    </Section>
  )
}
