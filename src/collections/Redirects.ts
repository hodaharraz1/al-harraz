import type { CollectionConfig } from 'payload'
import { isStaff } from '@/access/isStaff'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'fromPath',
    description:
      'Old URL → new URL. NOT YET consulted automatically by the app — this table is a place to record URL changes for when redirect handling is implemented (see REDIRECT_MAP.md). Until then, a moved/renamed page must also be wired up in code.',
  },
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    { name: 'fromPath', type: 'text', required: true, unique: true },
    { name: 'toPath', type: 'text', required: true },
    {
      name: 'statusCode',
      type: 'select',
      defaultValue: '301',
      options: [
        { label: '301 (Permanent)', value: '301' },
        { label: '302 (Temporary)', value: '302' },
      ],
    },
    { name: 'active', type: 'checkbox', defaultValue: true },
  ],
}
