import type { CollectionConfig } from 'payload'
import { isStaff } from '@/access/isStaff'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'fromPath',
    description: 'Old URL → new URL, consulted by middleware so URL changes never silently 404 (SEO_STRATEGY.md §3).',
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
