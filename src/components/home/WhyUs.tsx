import type { Locale } from '@/lib/i18n'

const copy = {
  ar: {
    heading: 'لماذا آل حراز',
    items: [
      { title: 'خبرة ممتدة منذ 1983', body: 'ممارسة قانونية مستمرة في دمياط لأكثر من أربعة عقود.' },
      { title: 'فريق يضم 15 محاميًا', body: 'تغطية لمختلف فروع القانون المصري تحت سقف واحد.' },
      { title: 'خدمات قانونية شاملة', body: 'من الاستشارات إلى التقاضي والتحكيم والصياغة القانونية.' },
      { title: 'موقع استراتيجي بحري', body: 'خبرة في القانون البحري والشحن والجمارك نظرًا لموقعنا في دمياط.' },
    ],
  },
  en: {
    heading: 'Why Al Harraz',
    items: [
      { title: 'Experience Since 1983', body: 'Continuous legal practice in Damietta for over four decades.' },
      { title: 'A Team of 15 Lawyers', body: 'Coverage across major fields of Egyptian law under one roof.' },
      { title: 'Full-Service Capability', body: 'From advisory to litigation, arbitration and legal drafting.' },
      { title: 'Strategic Maritime Location', body: 'Maritime, shipping and customs expertise rooted in our Damietta location.' },
    ],
  },
} as const

export function WhyUs({ locale }: { locale: Locale }) {
  const t = copy[locale]
  return (
    <div>
      <h2 className="text-2xl font-bold sm:text-3xl">{t.heading}</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((item) => (
          <div key={item.title}>
            <h3 className="text-base font-semibold text-navy-950">{item.title}</h3>
            <p className="mt-2 text-sm text-navy-900/75">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
