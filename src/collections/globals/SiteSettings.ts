import type { GlobalConfig } from 'payload'
import { isStaff } from '@/access/isStaff'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: { description: 'Global firm facts. Only edit with verified information — see CONTENT_REQUIRED.md.' },
  access: {
    read: () => true,
    update: isStaff,
  },
  fields: [
    { name: 'legalName', type: 'text', localized: true },
    { name: 'tagline', type: 'text', localized: true },
    { name: 'foundingYear', type: 'number', defaultValue: 1983 },
    { name: 'phoneDisplay', type: 'text' },
    { name: 'phoneInternational', type: 'text' },
    { name: 'whatsappNumber', type: 'text' },
    { name: 'address', type: 'textarea', localized: true },
    { name: 'email', type: 'email' },
    { name: 'facebookUrl', type: 'text' },
    { name: 'linkedInUrl', type: 'text' },
    { name: 'instagramUrl', type: 'text' },
    { name: 'googleBusinessProfileUrl', type: 'text' },
    { name: 'defaultOgImage', type: 'upload', relationTo: 'media' },
    { name: 'disclaimer', type: 'textarea', localized: true },
  ],
}
