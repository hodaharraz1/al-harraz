import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminField, isAdminOrSelf } from '@/access/isStaff'

// This collection previously had no `access` block at all, which meant
// Payload's own default (`Boolean(user)` — any authenticated user, any
// role) applied to every operation. In practice that meant a brand-new
// "editor" or "reviewer" account could list every staff email address, or
// edit ANY other user's account including an admin's — see the `role`
// field's own access below for the specific self-promotion path this also
// closes. isAdminOrSelf lets any logged-in user read/update their own
// account (name, password); only an admin can touch anyone else's.

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    description: 'Staff accounts for the CMS admin panel. Not public-facing.',
  },
  access: {
    // Not `create: () => false` — Payload's own "create first user" flow on
    // an empty collection goes through a separate init operation, not this
    // access check, so restricting it to admins doesn't block initial setup.
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: 'editor',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Legal Reviewer', value: 'reviewer' },
      ],
      // Document-level access above lets a user update their own record,
      // but this field-level check still applies on top of that — without
      // it, any editor could set their own role to "admin" in the same
      // request that updates their name.
      access: {
        update: isAdminField,
      },
    },
  ],
}
