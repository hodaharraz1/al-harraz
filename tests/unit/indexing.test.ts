import { afterEach, describe, expect, it } from 'vitest'
import { isSiteIndexable } from '@/lib/indexing'

function resetEnv() {
  delete process.env['SITE_INDEXABLE']
  delete process.env['VERCEL_ENV']
}

describe('isSiteIndexable', () => {
  afterEach(resetEnv)

  it('is indexable on Vercel production', () => {
    process.env['VERCEL_ENV'] = 'production'
    expect(isSiteIndexable()).toBe(true)
  })

  it('is not indexable on a Vercel preview deployment', () => {
    process.env['VERCEL_ENV'] = 'preview'
    expect(isSiteIndexable()).toBe(false)
  })

  it('is not indexable on Vercel development', () => {
    process.env['VERCEL_ENV'] = 'development'
    expect(isSiteIndexable()).toBe(false)
  })

  it('defaults to indexable off Vercel (e.g. Netlify) with no override', () => {
    expect(isSiteIndexable()).toBe(true)
  })

  it('SITE_INDEXABLE=false overrides Vercel production', () => {
    process.env['VERCEL_ENV'] = 'production'
    process.env['SITE_INDEXABLE'] = 'false'
    expect(isSiteIndexable()).toBe(false)
  })

  it('SITE_INDEXABLE=true overrides a Vercel preview', () => {
    process.env['VERCEL_ENV'] = 'preview'
    process.env['SITE_INDEXABLE'] = 'true'
    expect(isSiteIndexable()).toBe(true)
  })
})
