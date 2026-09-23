import { describe, expect, it } from 'vitest'
import { safeJsonLdString } from '@/components/seo/JsonLd'

describe('safeJsonLdString', () => {
  it('escapes </script> so CMS text cannot close the surrounding script tag', () => {
    const out = safeJsonLdString({ headline: 'Title</script><script>alert(1)</script>' })
    expect(out).not.toContain('</script>')
    expect(out).not.toContain('<script>')
  })

  it('round-trips back to the original data once parsed', () => {
    const data = { headline: 'A <b>bold</b> claim & more' }
    const parsed = JSON.parse(safeJsonLdString(data).replace(/\\u003c/g, '<').replace(/\\u003e/g, '>').replace(/\\u0026/g, '&'))
    expect(parsed).toEqual(data)
  })

  it('escapes U+2028/U+2029 line separators', () => {
    const out = safeJsonLdString({ text: 'line one line two line three' })
    expect(out).not.toContain(' ')
    expect(out).not.toContain(' ')
  })
})
