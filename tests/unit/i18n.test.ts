import { describe, expect, it } from 'vitest'
import { isLocale, localeDirection, otherLocale, locales, defaultLocale } from '@/lib/i18n'
import { getDictionary } from '@/lib/dictionary'

describe('isLocale', () => {
  it('accepts ar and en', () => {
    expect(isLocale('ar')).toBe(true)
    expect(isLocale('en')).toBe(true)
  })

  it('rejects anything else', () => {
    expect(isLocale('fr')).toBe(false)
    expect(isLocale('robots.txt')).toBe(false)
    expect(isLocale('')).toBe(false)
  })
})

describe('localeDirection', () => {
  it('maps ar to rtl and en to ltr', () => {
    expect(localeDirection.ar).toBe('rtl')
    expect(localeDirection.en).toBe('ltr')
  })
})

describe('otherLocale', () => {
  it('is a reciprocal mapping', () => {
    expect(otherLocale.ar).toBe('en')
    expect(otherLocale.en).toBe('ar')
  })
})

describe('defaultLocale', () => {
  it('is Arabic, the primary target market', () => {
    expect(defaultLocale).toBe('ar')
  })
})

describe('getDictionary', () => {
  it('returns a dictionary for every locale with matching keys', () => {
    const [first, ...rest] = locales.map((locale) => Object.keys(getDictionary(locale)).sort())
    for (const keys of rest) {
      expect(keys).toEqual(first)
    }
  })
})
