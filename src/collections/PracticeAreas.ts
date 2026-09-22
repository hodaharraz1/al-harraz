import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { isStaff, publishedOrStaff } from '@/access/isStaff'
import { seoField, statusField } from '@/collections/fields/seo'

export const PracticeAreas: CollectionConfig = {
  slug: 'practice-areas',
  labels: { singular: 'Practice Area', plural: 'Practice Areas' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'status', 'lastReviewedDate'],
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
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL slug, e.g. maritime-shipping-port-law. Same slug used under /ar/ and /en/.' },
    },
    { name: 'summary', type: 'textarea', localized: true, admin: { description: 'Short summary used on index/cards.' } },
    { name: 'overview', type: 'richText', localized: true, editor: lexicalEditor() },
    { name: 'whoWeHelp', type: 'richText', localized: true, editor: lexicalEditor() },
    { name: 'legalIssuesCovered', type: 'richText', localized: true, editor: lexicalEditor() },
    { name: 'howWeAssist', type: 'richText', localized: true, editor: lexicalEditor() },
    { name: 'relatedIndustries', type: 'relationship', relationTo: 'industries', hasMany: true },
    { name: 'relatedLawyers', type: 'relationship', relationTo: 'lawyers', hasMany: true },
    { name: 'relatedFaqs', type: 'relationship', relationTo: 'faqs', hasMany: true },
    { name: 'relatedInsights', type: 'relationship', relationTo: 'articles', hasMany: true },
    { name: 'isFlagship', type: 'checkbox', defaultValue: false, admin: { description: 'True only for the Maritime, Shipping & Port Law Center hub.' } },
    { name: 'legalReviewer', type: 'relationship', relationTo: 'users' },
    { name: 'lastReviewedDate', type: 'date' },
    statusField,
    seoField,
  ],
}
