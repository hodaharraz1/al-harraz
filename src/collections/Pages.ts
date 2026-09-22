import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { isStaff, publishedOrStaff } from '@/access/isStaff'
import { seoField, statusField } from '@/collections/fields/seo'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status'],
    description: 'Flexible standalone pages: About, History, Why Al Harraz, Privacy, Terms, Disclaimer, Contact copy.',
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
    { name: 'body', type: 'richText', localized: true, editor: lexicalEditor() },
    statusField,
    seoField,
  ],
}
