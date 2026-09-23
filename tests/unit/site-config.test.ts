import { describe, expect, it } from 'vitest'
import { siteConfig, yearsOfExperience } from '@/lib/site-config'

describe('siteConfig', () => {
  it('matches the verified founding year', () => {
    expect(siteConfig.foundingYear).toBe(1983)
  })

  it('does not claim a fake email or Facebook URL', () => {
    expect(siteConfig.email).toBeUndefined()
    expect(siteConfig.facebookUrl).toBeUndefined()
  })

  it('has firm-confirmed office coordinates for the map embed', () => {
    expect(siteConfig.latitude).toBeCloseTo(31.4181633)
    expect(siteConfig.longitude).toBeCloseTo(31.7882557)
  })
})

describe('yearsOfExperience', () => {
  it('computes dynamically from the founding year rather than a hardcoded number', () => {
    const expected = new Date().getFullYear() - siteConfig.foundingYear
    expect(yearsOfExperience()).toBe(expected)
  })
})
