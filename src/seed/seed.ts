import { getPayload } from 'payload'
import config from '../../payload.config'
import { siteConfig } from '@/lib/site-config'
import { practiceAreas, industries } from './data'

async function run() {
  const payload = await getPayload({ config })

  payload.logger.info('Seeding SiteSettings (verified firm facts)...')
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'ar',
    data: {
      legalName: siteConfig.legalNameAr,
      tagline: 'خبرة قانونية ممتدة منذ عام 1983',
      foundingYear: siteConfig.foundingYear,
      phoneDisplay: siteConfig.phoneDisplay,
      phoneInternational: siteConfig.phoneInternational,
      whatsappNumber: siteConfig.whatsappNumber,
      address: siteConfig.addressAr,
      disclaimer:
        'المعلومات الواردة في هذا الموقع لأغراض التوعية العامة ولا تُعد استشارة قانونية مخصصة.',
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      legalName: siteConfig.legalNameEn,
      tagline: 'Legal Experience Since 1983',
      address: siteConfig.addressEn,
      disclaimer:
        'The information on this website is for general informational purposes only and does not constitute individualized legal advice.',
    },
  })

  payload.logger.info('Seeding HistoryTimeline (1983 founding only)...')
  const existingTimeline = await payload.find({ collection: 'history-timeline', limit: 1 })
  if (existingTimeline.docs.length === 0) {
    await payload.create({
      collection: 'history-timeline',
      locale: 'ar',
      data: { year: 1983, title: `تأسيس المكتب على يد ${siteConfig.founderAr}` },
    })
    const created = await payload.find({ collection: 'history-timeline', limit: 1, sort: '-createdAt' })
    const doc = created.docs[0]
    if (doc) {
      await payload.update({
        collection: 'history-timeline',
        id: doc.id,
        locale: 'en',
        data: { title: `Founded by ${siteConfig.founderEn}` },
      })
    }
  }

  payload.logger.info('Seeding the 3 currently named lawyers (verified names only)...')
  const namedLawyers = [
    { slug: 'mohamed-taha-mohamed-harraz', nameAr: 'محمد طه محمد حراز', nameEn: 'Mohamed Taha Mohamed Harraz', isFounder: true },
    { slug: 'mostafa-mohamed-taha-harraz', nameAr: 'مصطفى محمد طه حراز', nameEn: 'Mostafa Mohamed Taha Harraz', isFounder: false },
    { slug: 'mahmoud-mohamed-taha-harraz', nameAr: 'محمود محمد طه حراز', nameEn: 'Mahmoud Mohamed Taha Harraz', isFounder: false },
  ]
  for (const lawyer of namedLawyers) {
    const existing = await payload.find({ collection: 'lawyers', where: { slug: { equals: lawyer.slug } }, limit: 1 })
    if (existing.docs.length > 0) continue
    const doc = await payload.create({
      collection: 'lawyers',
      locale: 'ar',
      data: {
        name: lawyer.nameAr,
        slug: lawyer.slug,
        isFounder: lawyer.isFounder,
        status: 'published',
      },
    })
    await payload.update({
      collection: 'lawyers',
      id: doc.id,
      locale: 'en',
      data: { name: lawyer.nameEn },
    })
  }

  payload.logger.info('Seeding practice areas (generic, non-fabricated service-capability copy; published per firm direction)...')
  for (const pa of practiceAreas) {
    const existing = await payload.find({ collection: 'practice-areas', where: { slug: { equals: pa.slug } }, limit: 1 })
    const existingDoc = existing.docs[0]
    if (existingDoc) {
      // Content is left alone once a doc exists (may have been reviewed/
      // edited in the CMS since), but `featured`, `order` and `status`
      // reflect the curated homepage priority set in data.ts, so keep
      // those in sync.
      const patch: Record<string, unknown> = {}
      if (Boolean(existingDoc['featured']) !== Boolean(pa.featured)) patch.featured = pa.featured ?? false
      if (existingDoc['order'] !== pa.order) patch.order = pa.order
      if (existingDoc['status'] !== 'published') patch.status = 'published'
      if (Object.keys(patch).length > 0) {
        await payload.update({ collection: 'practice-areas', id: existingDoc.id, data: patch })
      }
      continue
    }
    const doc = await payload.create({
      collection: 'practice-areas',
      locale: 'ar',
      data: {
        title: pa.title.ar,
        slug: pa.slug,
        summary: pa.summary.ar,
        featured: pa.featured ?? false,
        order: pa.order,
        status: 'published',
        overview: richTextFromPlainText(pa.overview.ar),
      },
    })
    await payload.update({
      collection: 'practice-areas',
      id: doc.id,
      locale: 'en',
      data: {
        title: pa.title.en,
        summary: pa.summary.en,
        overview: richTextFromPlainText(pa.overview.en),
      },
    })
  }

  payload.logger.info('Seeding industries (generic, non-fabricated copy; published per firm direction)...')
  for (const ind of industries) {
    const existing = await payload.find({ collection: 'industries', where: { slug: { equals: ind.slug } }, limit: 1 })
    const existingIndDoc = existing.docs[0]
    if (existingIndDoc) {
      if (existingIndDoc['status'] !== 'published') {
        await payload.update({ collection: 'industries', id: existingIndDoc.id, data: { status: 'published' } })
      }
      continue
    }
    const doc = await payload.create({
      collection: 'industries',
      locale: 'ar',
      data: {
        title: ind.title.ar,
        slug: ind.slug,
        summary: ind.summary.ar,
        status: 'published',
        businessProblems: richTextFromPlainText(ind.businessProblems.ar),
      },
    })
    await payload.update({
      collection: 'industries',
      id: doc.id,
      locale: 'en',
      data: {
        title: ind.title.en,
        summary: ind.summary.en,
        businessProblems: richTextFromPlainText(ind.businessProblems.en),
      },
    })
  }

  payload.logger.info('Seed complete.')
  process.exit(0)
}

function richTextFromPlainText(text: string) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: null,
      children: [
        {
          type: 'paragraph',
          format: '' as const,
          indent: 0,
          version: 1,
          direction: null,
          children: [{ type: 'text', format: 0, style: '', mode: 'normal', detail: 0, text, version: 1 }],
        },
      ],
    },
  }
}

run().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
