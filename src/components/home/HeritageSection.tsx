import type { Locale } from '@/lib/i18n'
import { getPayloadClient } from '@/lib/payload'
import { siteConfig } from '@/lib/site-config'

const copy = {
  ar: {
    heading: 'إرثنا',
    intro: 'أكثر من أربعة عقود من الممارسة القانونية، بدأت في دمياط عام 1983 وما زالت مستمرة حتى اليوم.',
  },
  en: {
    heading: 'Our Heritage',
    intro: 'Four decades-plus of legal practice, started in Damietta in 1983 and continuing today.',
  },
} as const

export async function HeritageSection({ locale }: { locale: Locale }) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'history-timeline',
    locale,
    sort: 'year',
    depth: 0,
  })
  const t = copy[locale]

  return (
    <div>
      <h2 className="text-2xl font-bold sm:text-3xl">{t.heading}</h2>
      <p className="mt-3 max-w-2xl text-navy-900/80">{t.intro}</p>
      <ol className="mt-8 space-y-6 border-s-2 border-cyan-600/30 ps-6">
        {result.docs.length > 0
          ? result.docs.map((doc) => (
              <li key={doc.id}>
                <p className="text-sm font-semibold text-cyan-600">{doc['year'] as number}</p>
                <p className="mt-1 text-base font-medium text-navy-950">{doc['title'] as string}</p>
                {doc['description'] ? (
                  <p className="mt-1 text-sm text-navy-900/75">{doc['description'] as string}</p>
                ) : null}
              </li>
            ))
          : (
              <li>
                <p className="text-sm font-semibold text-cyan-600">{siteConfig.foundingYear}</p>
                <p className="mt-1 text-base font-medium text-navy-950">
                  {locale === 'ar' ? `تأسيس المكتب على يد ${siteConfig.founderAr}` : `Founded by ${siteConfig.founderEn}`}
                </p>
              </li>
            )}
      </ol>
    </div>
  )
}
