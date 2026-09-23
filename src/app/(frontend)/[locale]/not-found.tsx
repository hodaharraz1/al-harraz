import { getDictionary } from '@/lib/dictionary'
import { defaultLocale } from '@/lib/i18n'
import { Section } from '@/components/ui/Section'
import { LinkButton } from '@/components/ui/Button'

export default function NotFound() {
  // Locale-aware routing lives in [locale]/layout.tsx; a not-found triggered
  // deeper in the tree still renders inside that layout, so we fall back to
  // the default locale copy here rather than duplicating locale detection.
  const dict = getDictionary(defaultLocale)

  return (
    <Section tone="light" className="text-center">
      <p className="font-heading text-6xl text-navy-900/15">404</p>
      <h1 className="mt-4 font-heading text-2xl">{dict.common.notFoundTitle}</h1>
      <p className="mt-2 text-navy-900/75">{dict.common.notFoundBody}</p>
      <LinkButton href={`/${defaultLocale}`} variant="primary" className="mt-6">
        {dict.common.backHome}
      </LinkButton>
    </Section>
  )
}
