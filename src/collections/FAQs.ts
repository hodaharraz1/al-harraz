import type { CollectionConfig } from 'payload'
import { isStaff, publishedOrStaff } from '@/access/isStaff'
import { statusField } from '@/collections/fields/seo'

export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    useAsTitle: 'question',
  },
  access: {
    read: publishedOrStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    { name: 'question', type: 'text', required: true, localized: true },
    { name: 'answer', type: 'textarea', required: true, localized: true },
    { name: 'relatedPracticeArea', type: 'relationship', relationTo: 'practice-areas' },
    { name: 'relatedIndustry', type: 'relationship', relationTo: 'industries' },
    statusField,
  ],
}
