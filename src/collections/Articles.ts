import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { isStaff, publishedOrStaff } from '@/access/isStaff'
import { seoField } from '@/collections/fields/seo'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: { singular: 'Article', plural: 'Insights' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishDate'],
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
      name: 'category',
      type: 'select',
      options: [
        { label: 'Legal Guides', value: 'guides' },
        { label: 'Legal Updates', value: 'updates' },
        { label: 'Business Law', value: 'business' },
        { label: 'Litigation', value: 'litigation' },
        { label: 'Family Law', value: 'family' },
        { label: 'Criminal Law', value: 'criminal' },
        { label: 'Corporate', value: 'corporate' },
        { label: 'Maritime & Shipping', value: 'maritime' },
        { label: 'Customs & Import/Export', value: 'customs' },
        { label: 'Employment', value: 'employment' },
        { label: 'Real Estate', value: 'real-estate' },
        { label: 'FAQs', value: 'faqs' },
      ],
    },
    { name: 'excerpt', type: 'textarea', localized: true },
    { name: 'body', type: 'richText', localized: true, editor: lexicalEditor() },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'author', type: 'relationship', relationTo: 'lawyers' },
    {
      name: 'legalReviewer',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      admin: { description: 'Required before publish — YMYL content discipline (SITE_STRATEGY.md §5).' },
    },
    { name: 'publishDate', type: 'date' },
    { name: 'lastReviewedDate', type: 'date', required: true },
    { name: 'relatedPracticeAreas', type: 'relationship', relationTo: 'practice-areas', hasMany: true },
    { name: 'relatedIndustries', type: 'relationship', relationTo: 'industries', hasMany: true },
    { name: 'relatedArticles', type: 'relationship', relationTo: 'articles', hasMany: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Published', value: 'published' },
      ],
      admin: { position: 'sidebar' },
      hooks: {
        beforeChange: [
          ({ value, siblingData }) => {
            if (value === 'published' && !siblingData['legalReviewer']) {
              throw new Error('An article cannot be published without a legalReviewer set (YMYL discipline).')
            }
            return value
          },
        ],
      },
    },
    seoField,
  ],
}
