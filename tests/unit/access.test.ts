import { describe, expect, it } from 'vitest'
import { isAdmin, isAdminField, isAdminOrSelf, isStaff, publishedOrStaff } from '@/access/isStaff'

function fakeReq(user: { id: string; role?: string } | null) {
  return { req: { user } } as never
}

describe('isStaff / publishedOrStaff (unchanged behavior)', () => {
  it('isStaff allows any logged-in user', () => {
    expect(isStaff(fakeReq({ id: '1', role: 'editor' }))).toBe(true)
  })

  it('isStaff denies an anonymous request', () => {
    expect(isStaff(fakeReq(null))).toBe(false)
  })

  it('publishedOrStaff lets staff see everything', () => {
    expect(publishedOrStaff(fakeReq({ id: '1', role: 'editor' }))).toBe(true)
  })

  it('publishedOrStaff scopes an anonymous request to published only', () => {
    expect(publishedOrStaff(fakeReq(null))).toEqual({ status: { equals: 'published' } })
  })
})

describe('isAdmin / isAdminField', () => {
  it('allows a user with role: admin', () => {
    expect(isAdmin(fakeReq({ id: '1', role: 'admin' }))).toBe(true)
    expect(isAdminField(fakeReq({ id: '1', role: 'admin' }))).toBe(true)
  })

  it('denies a user with role: editor', () => {
    expect(isAdmin(fakeReq({ id: '1', role: 'editor' }))).toBe(false)
  })

  it('denies a user with role: reviewer', () => {
    expect(isAdmin(fakeReq({ id: '1', role: 'reviewer' }))).toBe(false)
  })

  it('denies an anonymous request', () => {
    expect(isAdmin(fakeReq(null))).toBe(false)
  })
})

describe('isAdminOrSelf (Users collection access — the critical self-escalation guard)', () => {
  it('denies an anonymous request entirely', () => {
    const result = isAdminOrSelf({ req: { user: null }, id: 'someone-else' } as never)
    expect(result).toBe(false)
  })

  it('an admin can access any specific document by id', () => {
    const result = isAdminOrSelf({ req: { user: { id: 'admin-1', role: 'admin' } }, id: 'someone-else' } as never)
    expect(result).toBe(true)
  })

  it('an admin gets unrestricted access on a list query (no id)', () => {
    const result = isAdminOrSelf({ req: { user: { id: 'admin-1', role: 'admin' } } } as never)
    expect(result).toBe(true)
  })

  it('a non-admin CANNOT access a different user\'s specific document', () => {
    const result = isAdminOrSelf({ req: { user: { id: 'editor-1', role: 'editor' } }, id: 'someone-else' } as never)
    expect(result).toBe(false)
  })

  it('a non-admin CAN access their own specific document', () => {
    const result = isAdminOrSelf({ req: { user: { id: 'editor-1', role: 'editor' } }, id: 'editor-1' } as never)
    expect(result).toBe(true)
  })

  it('a non-admin listing users is scoped to only their own record', () => {
    const result = isAdminOrSelf({ req: { user: { id: 'editor-1', role: 'editor' } } } as never)
    expect(result).toEqual({ id: { equals: 'editor-1' } })
  })
})
