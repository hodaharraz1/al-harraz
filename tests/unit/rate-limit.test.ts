import { describe, expect, it } from 'vitest'
import { isRateLimited } from '@/lib/rate-limit'

describe('isRateLimited', () => {
  it('allows the first several requests from a key', () => {
    const key = `test-key-${Math.random()}`
    for (let i = 0; i < 5; i++) {
      expect(isRateLimited(key)).toBe(false)
    }
  })

  it('blocks requests once the limit is exceeded', () => {
    const key = `test-key-${Math.random()}`
    for (let i = 0; i < 5; i++) {
      isRateLimited(key)
    }
    expect(isRateLimited(key)).toBe(true)
  })

  it('tracks keys independently', () => {
    const keyA = `test-key-a-${Math.random()}`
    const keyB = `test-key-b-${Math.random()}`
    for (let i = 0; i < 5; i++) {
      isRateLimited(keyA)
    }
    expect(isRateLimited(keyA)).toBe(true)
    expect(isRateLimited(keyB)).toBe(false)
  })
})
