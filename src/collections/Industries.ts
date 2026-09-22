import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { isStaff, publishedOrStaff } from '@/access/isStaff'
import { seoField, statusField } from '@/collections/fields/seo'

export const Industries: CollectionConfig = {
  slug: 'industries',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
  },
  access: {
    read: publishedOrStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  versions: { drafts: true },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'summary',
      type: 'textarea',
      localized: true,
      required: true,
      admin: { description: 'Used as the SEO meta description fallback. Keep it non-empty.' },
    },
    {
      name: 'businessProblems',
      type: 'richText',
      localized: true,
      editor: lexicalEditor(),
      admin: { description: 'Describe the sector\'s business problems, not just a mirrored service list (brief §09).' },
    },
    { name: 'relatedPracticeAreas', type: 'relationship', relationTo: 'practice-areas', hasMany: true },
    statusField,
    seoField,
  ],
}
