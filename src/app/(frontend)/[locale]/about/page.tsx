import type { Metadata } from 'next'
import { isLocale } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'
import { buildMetadata } from '@/lib/seo'
import { breadcrumbSchema } from '@/lib/structured-data'
import { JsonLd } from '@/components/seo/JsonLd'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'
import { LinkButton } from '@/components/ui/Button'
import { WhyUs } from '@/components/home/WhyUs'

const copy = {
  ar: {
    title: 'عن المكتب',
    description: 'مكتب آل حراز للمحاماة والاستشارات القانونية — خبرة قانونية ممتدة منذ عام 1983.',
    overviewHeading: 'نبذة عن المكتب',
    overviewBody: `تأسس مكتب آل حراز عام ${siteConfig.foundingYear} على يد ${siteConfig.founderAr}، ويضم اليوم فريقًا من ${siteConfig.teamSize} محاميًا يقدمون خدمات المحاماة والاستشارات القانونية للأفراد والشركات في مختلف فروع القانون داخل دمياط وجميع أنحاء جمهورية مصر العربية.`,
    founderHeading: 'المؤسس',
    founderBody: `أسس ${siteConfig.founderAr} المكتب عام ${siteConfig.foundingYear} في دمياط.`,
    historyLink: 'استعرض تاريخ المكتب',
    teamLink: 'تعرف على فريقنا',
  },
  en: {
    title: 'About Us',
    description: 'Al Harraz Law Firm & Legal Consultants — legal experience since 1983.',
    overviewHeading: 'Firm Overview',
    overviewBody: `Founded in ${siteConfig.foundingYear} by ${siteConfig.founderEn}, Al Harraz Law Firm is a full-service Egyptian law firm with a team of ${siteConfig.teamSize} lawyers providing legal representation and advisory services to individuals and businesses in Damietta and across Egypt.`,
    founderHeading: 'Founder',
    founderBody: `${siteConfig.founderEn} founded the firm in ${siteConfig.foundingYear} in Damietta.`,
    historyLink: 'View Our History',
    teamLink: 'Meet the Team',
  },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = copy[locale]
  return buildMetadata({ locale, path: '/about', title: t.title, description: t.description })
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = copy[locale]
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` },
    { name: t.title, url: `/${locale}/about` },
  ]

  return (
    <>
      <JsonLd data={breadcrumbSchema(breadcrumbs)} />
      <Section tone="light">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.title}</h1>

        <div className="mt-8 max-w-2xl space-y-4">
          <h2 className="text-xl font-semibold">{t.overviewHeading}</h2>
          <p className="text-navy-900/85">{t.overviewBody}</p>
        </div>

        <div className="mt-8 max-w-2xl space-y-2 border-t border-navy-900/10 pt-8">
          <h2 className="text-xl font-semibold">{t.founderHeading}</h2>
          <p className="text-navy-900/85">{t.founderBody}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href={`/${locale}/about/history`} variant="ghost">
            {t.historyLink}
          </LinkButton>
          <LinkButton href={`/${locale}/team`} variant="ghost">
            {t.teamLink}
          </LinkButton>
        </div>
      </Section>

      <Section tone="neutral">
        <WhyUs locale={locale} />
      </Section>
    </>
  )
}
