import { describe, expect, it } from 'vitest'
import { siteConfig, yearsOfExperience } from '@/lib/site-config'

describe('siteConfig', () => {
  it('matches the verified founding year', () => {
    expect(siteConfig.foundingYear).toBe(1983)
  })

  it('does not claim a fake email, Facebook, or Google Business Profile URL', () => {
    expect(siteConfig.email).toBeUndefined()
    expect(siteConfig.facebookUrl).toBeUndefined()
    expect(siteConfig.googleBusinessProfileUrl).toBeUndefined()
  })
})

describe('yearsOfExperience', () => {
  it('computes dynamically from the founding year rather than a hardcoded number', () => {
    const expected = new Date().getFullYear() - siteConfig.foundingYear
    expect(yearsOfExperience()).toBe(expected)
  })
})
