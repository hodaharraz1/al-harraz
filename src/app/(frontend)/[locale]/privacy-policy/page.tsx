import type { Metadata } from 'next'
import { isLocale } from '@/lib/i18n'
import { siteConfig } from '@/lib/site-config'
import { buildMetadata } from '@/lib/seo'
import { Section } from '@/components/ui/Section'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs'

const content = {
  ar: {
    title: 'سياسة الخصوصية',
    description: 'كيف يتعامل مكتب آل حراز مع بيانات زوار الموقع ومقدمي طلبات الاستشارة.',
    sections: [
      {
        heading: 'البيانات التي نجمعها',
        body: 'نجمع فقط البيانات التي تقدمها بنفسك عبر نماذج التواصل أو حجز الاستشارة (مثل الاسم ورقم الهاتف والبريد الإلكتروني ووصف مختصر لطلبك)، بالإضافة إلى بيانات تحليلية عامة غير شخصية عند تفعيل أدوات التحليل.',
      },
      {
        heading: 'كيف نستخدم بياناتك',
        body: 'تُستخدم بياناتك فقط للرد على استفسارك أو التواصل بخصوص طلب الاستشارة. لا نبيع أو نشارك بياناتك مع أطراف ثالثة لأغراض تسويقية.',
      },
      {
        heading: 'أمان البيانات',
        body: 'يتم نقل جميع البيانات عبر اتصال مشفر (HTTPS). تُخزَّن طلبات الاستشارة في نظام إدارة محتوى خاص يصل إليه فقط الموظفون المصرح لهم.',
      },
      {
        heading: 'الاحتفاظ بالبيانات',
        body: 'نحتفظ ببيانات طلبات الاستشارة للمدة اللازمة لمتابعة الطلب فقط، وفقًا لسياسة الاحتفاظ الداخلية للمكتب.',
      },
      {
        heading: 'حقوقك',
        body: 'يمكنك التواصل معنا في أي وقت لطلب الاطلاع على بياناتك أو تصحيحها أو حذفها.',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    description: 'How Al Harraz Law Firm handles website visitor and consultation-request data.',
    sections: [
      {
        heading: 'Data We Collect',
        body: 'We only collect data you provide directly through our contact or consultation forms (such as name, phone number, email, and a short description of your enquiry), plus general non-personal analytics data where analytics tools are enabled.',
      },
      {
        heading: 'How We Use Your Data',
        body: 'Your data is used solely to respond to your enquiry or follow up on a consultation request. We do not sell or share your data with third parties for marketing purposes.',
      },
      {
        heading: 'Data Security',
        body: 'All data is transmitted over an encrypted connection (HTTPS). Consultation requests are stored in a private content management system accessible only to authorized staff.',
      },
      {
        heading: 'Data Retention',
        body: 'We retain consultation request data only for as long as necessary to follow up on the request, in line with the firm’s internal retention policy.',
      },
      {
        heading: 'Your Rights',
        body: 'You may contact us at any time to request access to, correction of, or deletion of your data.',
      },
    ],
  },
} as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = content[locale]
  return buildMetadata({ locale, path: '/privacy-policy', title: t.title, description: t.description })
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params
  const locale = isLocale(rawLocale) ? rawLocale : 'ar'
  const t = content[locale]
  const breadcrumbs = [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', url: `/${locale}` },
    { name: t.title, url: `/${locale}/privacy-policy` },
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
        <p className="text-sm text-navy-900/70">
          {locale === 'ar'
            ? `للاستفسار عن هذه السياسة، تواصل معنا على ${siteConfig.phoneDisplay}.`
            : `Questions about this policy can be directed to us at ${siteConfig.phoneDisplay}.`}
        </p>
      </div>
    </Section>
  )
}
