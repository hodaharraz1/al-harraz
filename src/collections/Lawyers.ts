import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { isStaff, publishedOrStaff } from '@/access/isStaff'
import { seoField, statusField } from '@/collections/fields/seo'

export const Lawyers: CollectionConfig = {
  slug: 'lawyers',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'status'],
  },
  access: {
    read: publishedOrStaff,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  versions: { drafts: true },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'role', type: 'text', localized: true },
    { name: 'isFounder', type: 'checkbox', defaultValue: false },
    {
      name: 'courtAdmissionLevel',
      type: 'text',
      admin: { description: 'Only set once individually verified — do not assume appellate level (brief §01).' },
    },
    { name: 'yearsExperience', type: 'number' },
    { name: 'education', type: 'array', fields: [{ name: 'item', type: 'text', localized: true }] },
    { name: 'practiceAreas', type: 'relationship', relationTo: 'practice-areas', hasMany: true },
    { name: 'industries', type: 'relationship', relationTo: 'industries', hasMany: true },
    { name: 'languages', type: 'array', fields: [{ name: 'item', type: 'text' }] },
    { name: 'professionalSummary', type: 'richText', localized: true, editor: lexicalEditor() },
    { name: 'selectedExperience', type: 'richText', localized: true, editor: lexicalEditor() },
    { name: 'linkedIn', type: 'text' },
    { name: 'email', type: 'text' },
    statusField,
    seoField,
  ],
}
