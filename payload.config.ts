import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { PracticeAreas } from '@/collections/PracticeAreas'
import { Industries } from '@/collections/Industries'
import { Lawyers } from '@/collections/Lawyers'
import { Articles } from '@/collections/Articles'
import { FAQs } from '@/collections/FAQs'
import { Pages } from '@/collections/Pages'
import { HistoryTimeline } from '@/collections/HistoryTimeline'
import { Redirects } from '@/collections/Redirects'
import { ConsultationSubmissions } from '@/collections/ConsultationSubmissions'
import { RateLimitEntries } from '@/collections/RateLimitEntries'
import { SiteSettings } from '@/collections/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env['NEXT_PUBLIC_SITE_URL'] ?? 'http://localhost:3000',
  admin: {
    user: Users.slug,
    // The admin panel itself is already disallowed in robots.txt and sent
    // X-Robots-Tag: noindex via next.config.ts — this is belt-and-braces.
    meta: { titleSuffix: '- Al Harraz CMS' },
  },
  editor: lexicalEditor(),
  collections: [
    Users,
    Media,
    PracticeAreas,
    Industries,
    Lawyers,
    Articles,
    FAQs,
    Pages,
    HistoryTimeline,
    Redirects,
    ConsultationSubmissions,
    RateLimitEntries,
  ],
  globals: [SiteSettings],
  localization: {
    locales: [
      { label: 'العربية', code: 'ar', rtl: true },
      { label: 'English', code: 'en', rtl: false },
    ],
    defaultLocale: 'ar',
    fallback: false,
  },
  secret: process.env['PAYLOAD_SECRET'] ?? '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env['DATABASE_URI'] ?? '',
    },
  }),
  sharp,
})
