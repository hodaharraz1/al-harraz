import type { Access, FieldAccess } from 'payload'

export const isStaff: Access = ({ req }) => Boolean(req.user)

export const isStaffField: FieldAccess = ({ req }) => Boolean(req.user)

export const publishedOrStaff: Access = ({ req }) => {
  if (req.user) return true
  return {
    status: { equals: 'published' },
  }
}
