import type { Metadata } from 'next'
import { isLocale } from '@/lib/i18n'
import { buildMetadata } from '@/lib/seo'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

const content = {
  ar: {
    title: 'الشروط وإخلاء المسؤولية',
    description: 'شروط استخدام موقع مكتب آل حراز وإخلاء المسؤولية القانوني.',
    sections: [
      {
        heading: 'معلومات عامة وليست استشارة قانونية',
        body: 'المحتوى المنشور على هذا الموقع، بما في ذلك المقالات والأدلة القانونية، هو لأغراض التوعية العامة فقط ولا يُعد استشارة قانونية مخصصة لحالتك. يجب عدم الاعتماد عليه كبديل عن استشارة محامٍ مختص بشأن مسألتك الخاصة.',
      },
      {
        heading: 'لا يوجد علاقة محامٍ وموكل',
        body: 'تصفح هذا الموقع أو إرسال استفسار عبر نموذج التواصل أو حجز الاستشارة لا ينشئ بحد ذاته علاقة محامٍ وموكل مع مكتب آل حراز. تنشأ هذه العلاقة فقط بموجب اتفاق مكتوب صريح بين الطرفين.',
      },
      {
        heading: 'دقة المحتوى',
        body: 'نبذل جهدًا معقولًا لضمان دقة المحتوى وقت نشره، لكن القوانين قد تتغير، ولا نضمن اكتمال أو حداثة كل المعلومات في جميع الأوقات.',
      },
      {
        heading: 'السرية',
        body: 'يُرجى عدم إرسال معلومات شديدة الحساسية أو مستندات أصلية عبر نماذج الموقع قبل إنشاء علاقة تمثيل قانوني رسمية عبر قناة آمنة.',
      },
    ],
  },
  en: {
    title: 'Terms & Website Disclaimer',
    description: 'Terms of use for the Al Harraz Law Firm website and its legal disclaimer.',
    sections: [
      {
        heading: 'General Information, Not Legal Advice',
        body: 'Content published on this website, including articles and legal guides, is for general informational purposes only and does not constitute individualized legal advice for your situation. It should not be relied upon as a substitute for consulting a qualified lawyer about your specific matter.',
      },
      {
        heading: 'No Attorney-Client Relationship',
        body: 'Browsing this website or submitting an enquiry through a contact or consultation form does not by itself create an attorney-client relationship with Al Harraz Law Firm. Such a relationship is only established through an explicit written agreement between the parties.',
      },
      {
        heading: 'Accuracy of Content',
        body: 'We take reasonable care to ensure content is accurate at the time of publication, but laws can change, and we do not guarantee that all information remains complete or current at all times.',
      },
      {
        heading: 'Confidentiality',
        body: 'Please do not send highly sensitive information or original documents through website forms before a formal legal representation relationship has been established through a secure channel.',
      },
    ],
  },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = content[locale]
  return buildMetadata({ locale, path: '/terms', title: t.title, description: t.description })
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = content[locale]
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` },
    { name: t.title, url: `/${locale}/terms` },
  ]

  return (
    <Section tone="light">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{t.title}</h1>
      <div className="mt-8 max-w-2xl space-y-8">
        {t.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-lg font-semibold text-navy-950">{section.heading}</h2>
            <p className="mt-2 text-navy-900/85">{section.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
