import type { Field } from 'payload'

export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      localized: true,
      admin: { description: 'Falls back to the page title if left empty.' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'canonicalOverride',
      type: 'text',
      admin: { description: 'Only set for pagination/near-duplicate edge cases.' },
    },
    {
      name: 'noindex',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'ogImage',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

export const statusField: Field = {
  name: 'status',
  type: 'select',
  defaultValue: 'draft',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Published', value: 'published' },
  ],
  admin: { position: 'sidebar' },
}
