import type { Locale } from '@/lib/i18n'
import ar from '@/dictionaries/ar.json'
import en from '@/dictionaries/en.json'

const dictionaries = { ar, en }

export type Dictionary = typeof ar

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale]
}
