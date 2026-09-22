import type { CollectionConfig } from 'payload'
import { isStaff, publishedOrStaff } from '@/access/isStaff'

export const HistoryTimeline: CollectionConfig = {
  slug: 'history-timeline',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['year', 'title'],
    description: 'Only add a milestone once it is independently verified — see brief §12 (no invented intermediate milestones).',
  },
  access: {
    read: publishedOrStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  defaultSort: 'year',
  fields: [
    { name: 'year', type: 'number', required: true },
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', localized: true },
  ],
}
