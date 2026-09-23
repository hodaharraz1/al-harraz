import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { list, put, del } from '@vercel/blob'
import { getPayloadClient } from '@/lib/payload'

// Collections backed up here are deliberately limited to content that is
// already public on the live site (or, for `redirects`/`pages`, would be
// once published) — practice-areas/industries are also reproducible from
// src/seed/data.ts, but included anyway since an admin may have edited them
// in the CMS since seeding.
//
// `consultation-submissions` is excluded on purpose: it's the one
// collection holding real client PII (names, phone numbers, case
// descriptions). Vercel Blob only supports public-URL storage on this
// plan, and exporting client data to a public URL — even an unlisted one —
// isn't an acceptable trade for a JSON backup. That data stays protected by
// Neon's own point-in-time recovery inside the access-controlled database
// instead — see BACKUPS.md.
// `media` and `users` are excluded too: media file bytes aren't in
// Postgres (nothing to dump here), and users/passwords have no business in
// a plain JSON export.
const COLLECTIONS = [
  'practice-areas',
  'industries',
  'lawyers',
  'articles',
  'faqs',
  'history-timeline',
  'redirects',
  'pages',
] as const

const RETENTION_DAYS = 30

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env['CRON_SECRET']}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayloadClient()

    const snapshot: Record<string, unknown> = {
      generatedAt: new Date().toISOString(),
    }

    for (const collection of COLLECTIONS) {
      const result = await payload.find({ collection, limit: 0, depth: 0, overrideAccess: true })
      snapshot[collection] = result.docs
    }
    snapshot['site-settings'] = await payload.findGlobal({ slug: 'site-settings', overrideAccess: true })

    const filename = `backups/al-harraz-${new Date().toISOString().slice(0, 10)}.json`
    const blob = await put(filename, JSON.stringify(snapshot, null, 2), {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false,
      allowOverwrite: true,
    })

    const deleted = await cleanupOldBackups()

    return NextResponse.json({ ok: true, url: blob.url, deleted })
  } catch (error) {
    console.error('Backup cron failed', error)
    return NextResponse.json({ error: 'Backup failed' }, { status: 500 })
  }
}

async function cleanupOldBackups(): Promise<string[]> {
  const cutoff = Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000
  const { blobs } = await list({ prefix: 'backups/' })
  const stale = blobs.filter((blob) => new Date(blob.uploadedAt).getTime() < cutoff)
  if (stale.length > 0) {
    await del(stale.map((blob) => blob.url))
  }
  return stale.map((blob) => blob.pathname)
}
