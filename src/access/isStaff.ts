import type { Access, FieldAccess } from 'payload'

export const isStaff: Access = ({ req }) => Boolean(req.user)

export const isStaffField: FieldAccess = ({ req }) => Boolean(req.user)

export const publishedOrStaff: Access = ({ req }) => {
  if (req.user) return true
  return {
    status: { equals: 'published' },
  }
}

export const isAdmin: Access = ({ req }) => req.user?.role === 'admin'

export const isAdminField: FieldAccess = ({ req }) => req.user?.role === 'admin'

// Any logged-in user may read/update their own account; only an admin may
// read or edit anyone else's. Used by Users.ts — see the comment there for
// why this collection needs role-based access at all (it previously had
// none, which meant any authenticated user, any role, had full access to
// every other user's account).
export const isAdminOrSelf: Access = ({ req, id }) => {
  if (!req.user) return false
  if (req.user.role === 'admin') return true
  if (!id) return { id: { equals: req.user.id } }
  return req.user.id === id
}
