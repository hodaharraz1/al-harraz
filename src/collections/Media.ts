import type { CollectionConfig } from 'payload'
import { isStaff } from '@/access/isStaff'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 800, height: 600, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Required — describes the image for accessibility and SEO.' },
    },
  ],
}
