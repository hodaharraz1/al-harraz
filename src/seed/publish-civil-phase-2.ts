/**
 * Civil Law Phase 2 — dedicated, narrowly-scoped publication script.
 *
 * Publishes ONLY the 3 lawyer-approved Civil Law Phase 2 articles and the
 * 5 additive internal-link updates to existing documents, per the FINAL
 * PUBLICATION AUTHORIZATION (Mahmoud Harraz, 2026-10-07) and the design in
 * PRODUCTION_SEED_SAFETY_AUDIT.md. This is intentionally NOT a change to
 * `seed.ts` — `seed.ts`'s full-reprocessing behavior is unchanged and is
 * not invoked by this file at all.
 *
 * DEFAULT MODE IS DRY-RUN. No write (`create`/`update`) is ever issued
 * unless ALL of the following are true:
 *   1. `--execute` is passed on the command line, AND
 *   2. `process.env.NODE_ENV === 'production'`, AND
 *   3. every preflight check below passes for all 8 allowlisted targets.
 *
 * Usage:
 *   tsx src/seed/publish-civil-phase-2.ts            # dry run (default)
 *   tsx src/seed/publish-civil-phase-2.ts --execute   # real writes, only
 *                                                      # if NODE_ENV=production
 *                                                      # and preflight passes
 */

import { execFileSync } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { getPayload, type Payload } from 'payload'
import config from '../../payload.config'
import { articles as approvedArticles, practiceAreas as approvedPracticeAreas } from './data'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const REPO_ROOT = join(__dirname, '..', '..')

// ---------------------------------------------------------------------------
// 1. STRICT, IMMUTABLE ALLOWLISTS — the only slugs this script may ever
//    create or update. Every write call asserts its target slug is in the
//    right list immediately before issuing the write; there is no loop
//    over "all articles" or "all practice areas" anywhere in this file.
// ---------------------------------------------------------------------------

const ALLOWED_NEW_ARTICLE_SLUGS = Object.freeze([
  'rental-tenancy-disputes-egypt',
  'co-ownership-partition-egypt',
  'civil-vs-criminal-cases-egypt',
] as const)

const ALLOWED_LINK_UPDATE_ARTICLE_SLUGS = Object.freeze([
  'property-possession-disputes-egypt',
  'common-inheritance-disputes-egypt',
  'what-is-civil-lawsuit',
] as const)

const ALLOWED_LINK_UPDATE_PRACTICE_AREA_SLUGS = Object.freeze([
  'civil-law',
  'real-estate-property-registration',
] as const)

type NewArticleSlug = (typeof ALLOWED_NEW_ARTICLE_SLUGS)[number]
type LinkUpdateArticleSlug = (typeof ALLOWED_LINK_UPDATE_ARTICLE_SLUGS)[number]
type LinkUpdatePracticeAreaSlug = (typeof ALLOWED_LINK_UPDATE_PRACTICE_AREA_SLUGS)[number]

/** Throws (aborting the whole run) if `slug` is not in `list`. Call this
 * immediately before every single create/update in this script — never
 * trust a caller's claim about which slug it's touching. */
function assertAllowed<T extends string>(list: readonly T[], slug: string, context: string): T {
  if (!(list as readonly string[]).includes(slug)) {
    throw new Error(
      `REFUSED: "${slug}" is not in the allowlist for ${context}. ` +
        `This script may only touch: ${list.join(', ')}. Aborting — zero writes issued.`,
    )
  }
  return slug as T
}

const REVIEWER_EMAIL = 'hodaharraz1@gmail.com'

/** The commit immediately before the Civil Law Phase 2 publication edits
 * (commit 0472c66) — i.e. the last known-good state of `data.ts` before
 * this session added the 3 new articles and the 5 additive link updates.
 * Used as the "expected pre-change baseline" for content-drift detection
 * (requirement 7). Pinned to a full SHA, not a branch/tag, so this never
 * silently drifts if history moves. */
const BASELINE_GIT_REF = 'ce06b1c9ea7164d5a6ef300280ca1ce567a4e8ee'

// ---------------------------------------------------------------------------
// 2. Minimal Lexical richText <-> paragraph-string helpers.
//    These exactly mirror richTextFromParagraphs / textNode / linkNode in
//    seed.ts, so that a document written by seed.ts's convention can be
//    read back out as the same `[label](url)`-style paragraph strings
//    used in data.ts, for direct textual comparison.
// ---------------------------------------------------------------------------

type LexicalTextNode = { type: 'text'; text: string }
type LexicalLinkNode = { type: 'link'; fields?: { url?: string }; children?: LexicalNode[] }
type LexicalParagraphNode = { type: 'paragraph'; children?: LexicalNode[] }
type LexicalNode = LexicalTextNode | LexicalLinkNode | LexicalParagraphNode | { type: string; children?: LexicalNode[] }
type LexicalRichText = { root?: { children?: LexicalNode[] } } | null | undefined

function inlineNodeToString(node: LexicalNode): string {
  if (node.type === 'text') return (node as LexicalTextNode).text ?? ''
  if (node.type === 'link') {
    const link = node as LexicalLinkNode
    const url = link.fields?.url ?? ''
    const label = (link.children ?? []).map(inlineNodeToString).join('')
    return `[${label}](${url})`
  }
  const children = 'children' in node ? node.children ?? [] : []
  return children.map(inlineNodeToString).join('')
}

/** Reverses richTextFromParagraphs: Lexical richText -> string[] paragraphs,
 * each with `[label](url)` markers restored for link nodes. Returns []
 * for empty/missing richText so a never-populated field compares equal
 * to an empty baseline rather than throwing. */
function paragraphsFromRichText(value: LexicalRichText): string[] {
  const children = value?.root?.children ?? []
  return children
    .filter((n): n is LexicalParagraphNode => n.type === 'paragraph')
    .map((p) => (p.children ?? []).map(inlineNodeToString).join(''))
}

function arraysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i])
}

// ---------------------------------------------------------------------------
// 3. Baseline loader — reads src/seed/data.ts as it existed at
//    BASELINE_GIT_REF, via `git show`, into an isolated temp file, so the
//    "expected pre-change value" comes from actual git history rather
//    than hand-transcribed text that could silently drift from the truth.
// ---------------------------------------------------------------------------

async function loadBaselineSeedData(): Promise<{
  articles: typeof approvedArticles
  practiceAreas: typeof approvedPracticeAreas
}> {
  const fileContent = execFileSync('git', ['show', `${BASELINE_GIT_REF}:src/seed/data.ts`], {
    cwd: REPO_ROOT,
    encoding: 'utf-8',
    maxBuffer: 10 * 1024 * 1024,
  })
  const tmpDir = mkdtempSync(join(tmpdir(), 'civil-phase-2-baseline-'))
  const tmpPath = join(tmpDir, 'data.baseline.ts')
  writeFileSync(tmpPath, fileContent, 'utf-8')
  try {
    const mod = (await import(pathToFileURL(tmpPath).href)) as {
      articles: typeof approvedArticles
      practiceAreas: typeof approvedPracticeAreas
    }
    return { articles: mod.articles, practiceAreas: mod.practiceAreas }
  } finally {
    rmSync(tmpDir, { recursive: true, force: true })
  }
}

function findArticleBySlug(list: typeof approvedArticles, slug: string) {
  return list.find((a) => a.slug === slug)
}
function findPracticeAreaBySlug(list: typeof approvedPracticeAreas, slug: string) {
  return list.find((p) => p.slug === slug)
}

// ---------------------------------------------------------------------------
// 4. Preflight result types + report accumulation.
// ---------------------------------------------------------------------------

type Finding = { ok: boolean; label: string; detail: string }
const findings: Finding[] = []
function record(ok: boolean, label: string, detail: string) {
  findings.push({ ok, label, detail })
  const tag = ok ? 'OK  ' : 'FAIL'
  console.log(`[${tag}] ${label} — ${detail}`)
}

// ---------------------------------------------------------------------------
// 5. Reviewer resolution — READ-ONLY. Never creates, never changes role,
//    never changes email. Requires exactly one match with an admin/reviewer
//    role, or the whole run aborts.
// ---------------------------------------------------------------------------

async function resolveReviewer(payload: Payload): Promise<{ id: number; role: string } | null> {
  const result = await payload.find({
    collection: 'users',
    where: { email: { equals: REVIEWER_EMAIL } },
    select: { email: true, role: true, name: true },
    limit: 10,
  })
  if (result.docs.length === 0) {
    record(false, 'Reviewer resolution', `No user found for ${REVIEWER_EMAIL}. Aborting — a reviewer must already exist; this script never creates one.`)
    return null
  }
  if (result.docs.length > 1) {
    record(
      false,
      'Reviewer resolution',
      `${result.docs.length} users found for ${REVIEWER_EMAIL} — ambiguous, aborting rather than guessing which one is correct.`,
    )
    return null
  }
  const user = result.docs[0] as { id: number; role?: string }
  const role = user.role ?? '(none)'
  if (role !== 'admin' && role !== 'reviewer') {
    record(
      false,
      'Reviewer resolution',
      `User for ${REVIEWER_EMAIL} resolved (id ${String(user.id)}) but role is "${role}", not "admin" or "reviewer" — refusing to use it as legalReviewer.`,
    )
    return null
  }
  record(true, 'Reviewer resolution', `Resolved exactly one user for ${REVIEWER_EMAIL} (id ${String(user.id)}, role "${role}"). Read-only — no changes made to this account.`)
  return { id: user.id, role }
}

// ---------------------------------------------------------------------------
// 6. Preflight: the 3 new articles must NOT already exist (fail-closed
//    first-run duplicate policy — requirement 6).
// ---------------------------------------------------------------------------

type ArticlePlan = { slug: NewArticleSlug; action: 'CREATE' } | { slug: NewArticleSlug; action: 'ABORT_EXISTS'; id: unknown; status: unknown }

async function preflightNewArticles(payload: Payload): Promise<ArticlePlan[]> {
  const plans: ArticlePlan[] = []
  for (const rawSlug of ALLOWED_NEW_ARTICLE_SLUGS) {
    const slug = assertAllowed(ALLOWED_NEW_ARTICLE_SLUGS, rawSlug, 'new-article preflight')
    const existing = await payload.find({ collection: 'articles', where: { slug: { equals: slug } }, limit: 1 })
    const doc = existing.docs[0] as { id: unknown; status?: unknown } | undefined
    if (doc) {
      record(
        false,
        `New article "${slug}"`,
        `ALREADY EXISTS (id ${String(doc.id)}, status "${String(doc.status)}") — this is the first production publication for this batch, so an existing document is treated as unexpected/unexplained and the batch aborts rather than silently updating it. Investigate how this document was created before re-running.`,
      )
      plans.push({ slug, action: 'ABORT_EXISTS', id: doc.id, status: doc.status })
    } else {
      record(true, `New article "${slug}"`, 'NOT FOUND — would create.')
      plans.push({ slug, action: 'CREATE' })
    }
  }
  return plans
}

// ---------------------------------------------------------------------------
// 7. Preflight: the 5 existing link-update targets must exist, and their
//    live content must match the known pre-change baseline exactly before
//    this script will touch them (content-drift protection — requirement 7).
//    Idempotency note: if the live value already equals the PROPOSED value
//    (i.e. this exact update already applied successfully in a prior run),
//    that document is reported as already up to date and skipped, not
//    treated as drift.
// ---------------------------------------------------------------------------

type LinkField = 'legalIssuesCovered' | 'body'

type LinkUpdatePlan =
  | { kind: 'article' | 'practiceArea'; slug: string; field: LinkField; action: 'UPDATE'; id: unknown }
  | { kind: 'article' | 'practiceArea'; slug: string; field: LinkField; action: 'ALREADY_APPLIED'; id: unknown }
  | { kind: 'article' | 'practiceArea'; slug: string; field: LinkField; action: 'ABORT_DRIFT' | 'ABORT_MISSING' }

async function preflightLinkUpdates(
  payload: Payload,
  baseline: { articles: typeof approvedArticles; practiceAreas: typeof approvedPracticeAreas },
): Promise<LinkUpdatePlan[]> {
  const plans: LinkUpdatePlan[] = []

  async function checkOne(kind: 'article' | 'practiceArea', slug: string, field: LinkField) {
    const collection = kind === 'article' ? 'articles' : 'practice-areas'
    const existing = await payload.find({ collection, where: { slug: { equals: slug } }, locale: 'all', limit: 1 })
    const doc = existing.docs[0] as Record<string, unknown> | undefined
    if (!doc) {
      record(false, `Link target "${slug}" (${kind})`, 'NOT FOUND in production — expected to already exist. Aborting.')
      plans.push({ kind, slug, field, action: 'ABORT_MISSING' })
      return
    }

    const liveRaw = doc[field] as { ar?: LexicalRichText; en?: LexicalRichText } | undefined
    const liveAr = paragraphsFromRichText(liveRaw?.ar)
    const liveEn = paragraphsFromRichText(liveRaw?.en)

    const baselineEntry =
      kind === 'article' ? findArticleBySlug(baseline.articles, slug) : findPracticeAreaBySlug(baseline.practiceAreas, slug)
    const proposedEntry =
      kind === 'article' ? findArticleBySlug(approvedArticles, slug) : findPracticeAreaBySlug(approvedPracticeAreas, slug)
    const baselineField = (baselineEntry as Record<string, unknown> | undefined)?.[field] as
      | { ar: string[]; en: string[] }
      | undefined
    const proposedField = (proposedEntry as Record<string, unknown> | undefined)?.[field] as
      | { ar: string[]; en: string[] }
      | undefined

    if (!proposedField) {
      record(false, `Link target "${slug}" (${kind})`, `No "${field}" found in data.ts for this slug — cannot proceed.`)
      plans.push({ kind, slug, field, action: 'ABORT_MISSING' })
      return
    }

    const matchesProposed = arraysEqual(liveAr, proposedField.ar) && arraysEqual(liveEn, proposedField.en)
    if (matchesProposed) {
      record(true, `Link target "${slug}" (${kind}.${field})`, 'Live value already matches the proposed (approved) value — nothing to do.')
      plans.push({ kind, slug, field, action: 'ALREADY_APPLIED', id: doc['id'] })
      return
    }

    const matchesBaseline = baselineField
      ? arraysEqual(liveAr, baselineField.ar) && arraysEqual(liveEn, baselineField.en)
      : false
    if (matchesBaseline) {
      record(true, `Link target "${slug}" (${kind}.${field})`, 'Live value matches the known pre-change baseline exactly — safe to apply the additive update.')
      plans.push({ kind, slug, field, action: 'UPDATE', id: doc['id'] })
      return
    }

    record(
      false,
      `Link target "${slug}" (${kind}.${field})`,
      'CONTENT DRIFT: live value matches neither the expected pre-change baseline nor the proposed value — someone may have edited this in the CMS admin UI since the baseline commit. Refusing to overwrite. See the printed CURRENT/BASELINE/PROPOSED values above for manual review.',
    )
    console.log(`  CURRENT LIVE VALUE (ar): ${JSON.stringify(liveAr)}`)
    console.log(`  CURRENT LIVE VALUE (en): ${JSON.stringify(liveEn)}`)
    console.log(`  EXPECTED BASELINE (ar): ${JSON.stringify(baselineField?.ar ?? '(not found in baseline)')}`)
    console.log(`  EXPECTED BASELINE (en): ${JSON.stringify(baselineField?.en ?? '(not found in baseline)')}`)
    console.log(`  PROPOSED VALUE (ar): ${JSON.stringify(proposedField.ar)}`)
    console.log(`  PROPOSED VALUE (en): ${JSON.stringify(proposedField.en)}`)
    plans.push({ kind, slug, field, action: 'ABORT_DRIFT' })
  }

  for (const rawSlug of ALLOWED_LINK_UPDATE_ARTICLE_SLUGS) {
    const slug = assertAllowed(ALLOWED_LINK_UPDATE_ARTICLE_SLUGS, rawSlug, 'link-update article preflight')
    await checkOne('article', slug, 'body')
  }
  for (const rawSlug of ALLOWED_LINK_UPDATE_PRACTICE_AREA_SLUGS) {
    const slug = assertAllowed(ALLOWED_LINK_UPDATE_PRACTICE_AREA_SLUGS, rawSlug, 'link-update practice-area preflight')
    await checkOne('practiceArea', slug, 'legalIssuesCovered')
  }
  return plans
}

// ---------------------------------------------------------------------------
// 8. Transaction helper. Payload's Postgres adapter genuinely supports
//    beginTransaction/commitTransaction/rollbackTransaction (confirmed in
//    node_modules/payload/dist/database/types.d.ts — BaseDatabaseAdapter;
//    see CIVIL_PHASE_2_PUBLICATION_SCRIPT_REVIEW.md §K for the exact
//    citation). If a transaction ID can be established, every write in
//    this script is scoped to it via `req: { transactionID }` and the
//    whole batch commits or rolls back together. If the adapter returns
//    null (no transaction could be established), this is reported
//    explicitly and the run aborts rather than silently writing without
//    the protection this script was asked to provide — it does not invent
//    a fallback transaction.
// ---------------------------------------------------------------------------

async function withTransaction<T>(payload: Payload, fn: (transactionID: number | string) => Promise<T>): Promise<T> {
  const transactionID = await payload.db.beginTransaction?.()
  if (transactionID === null || transactionID === undefined) {
    throw new Error(
      'NO GLOBAL TRANSACTION AVAILABLE: payload.db.beginTransaction() returned null/undefined. ' +
        'Refusing to proceed with execute-mode writes without the transaction protection this run requires. ' +
        'Aborting — zero writes issued.',
    )
  }
  try {
    const result = await fn(transactionID)
    await payload.db.commitTransaction?.(transactionID)
    return result
  } catch (error) {
    await payload.db.rollbackTransaction?.(transactionID)
    throw error
  }
}

// ---------------------------------------------------------------------------
// 9. Lexical builders (mirrors seed.ts's richTextFromParagraphs exactly, so
//    documents written by this script are byte-for-byte structurally
//    identical to ones written by the main seed).
// ---------------------------------------------------------------------------

const LINK_PATTERN = /\[([^\]]+)\]\((\/[^)]+)\)/g

function textNode(text: string) {
  return { type: 'text', format: 0, style: '', mode: 'normal', detail: 0, text, version: 1 }
}
function linkNode(text: string, url: string) {
  return {
    type: 'link',
    format: '' as const,
    indent: 0,
    version: 1,
    direction: null,
    fields: { url, newTab: false, linkType: 'custom' as const },
    children: [textNode(text)],
  }
}
function paragraphChildrenFromText(paragraph: string) {
  const children: Array<ReturnType<typeof textNode> | ReturnType<typeof linkNode>> = []
  let lastIndex = 0
  for (const match of paragraph.matchAll(LINK_PATTERN)) {
    const [full, label, url] = match
    if (!label || !url) continue
    const index = match.index ?? 0
    if (index > lastIndex) children.push(textNode(paragraph.slice(lastIndex, index)))
    children.push(linkNode(label, url))
    lastIndex = index + full.length
  }
  if (lastIndex < paragraph.length) children.push(textNode(paragraph.slice(lastIndex)))
  return children.length > 0 ? children : [textNode(paragraph)]
}
function richTextFromParagraphs(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      format: '' as const,
      indent: 0,
      version: 1,
      direction: null,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        format: '' as const,
        indent: 0,
        version: 1,
        direction: null,
        children: paragraphChildrenFromText(text),
      })),
    },
  }
}

// ---------------------------------------------------------------------------
// 10. Execute mode — only reached after every preflight check has passed.
// ---------------------------------------------------------------------------

async function executeNewArticle(payload: Payload, slug: NewArticleSlug, reviewerId: number, transactionID: number | string) {
  assertAllowed(ALLOWED_NEW_ARTICLE_SLUGS, slug, 'new-article execute')
  const article = findArticleBySlug(approvedArticles, slug)
  if (!article) throw new Error(`REFUSED: "${slug}" not found in approved data.ts articles — aborting.`)
  const today = new Date().toISOString().slice(0, 10)
  const doc = await payload.create({
    collection: 'articles',
    locale: 'ar',
    req: { transactionID },
    data: {
      title: article.title.ar,
      slug: article.slug,
      category: article.category,
      excerpt: article.excerpt.ar,
      body: richTextFromParagraphs(article.body.ar),
      legalReviewer: reviewerId,
      publishDate: today,
      lastReviewedDate: today,
      status: 'published',
    },
  })
  await payload.update({
    collection: 'articles',
    id: doc.id,
    locale: 'en',
    req: { transactionID },
    data: {
      title: article.title.en,
      excerpt: article.excerpt.en,
      body: richTextFromParagraphs(article.body.en),
    },
  })
  console.log(`  CREATED article "${slug}" (id ${String(doc.id)}).`)
}

async function executeLinkUpdate(payload: Payload, plan: LinkUpdatePlan & { action: 'UPDATE' }, transactionID: number | string) {
  const collection = plan.kind === 'article' ? 'articles' : 'practice-areas'
  if (plan.kind === 'article') assertAllowed(ALLOWED_LINK_UPDATE_ARTICLE_SLUGS, plan.slug, 'link-update article execute')
  else assertAllowed(ALLOWED_LINK_UPDATE_PRACTICE_AREA_SLUGS, plan.slug, 'link-update practice-area execute')

  const proposedEntry =
    plan.kind === 'article' ? findArticleBySlug(approvedArticles, plan.slug) : findPracticeAreaBySlug(approvedPracticeAreas, plan.slug)
  const proposedField = (proposedEntry as Record<string, unknown> | undefined)?.[plan.field] as { ar: string[]; en: string[] } | undefined
  if (!proposedField) throw new Error(`REFUSED: "${plan.slug}".${plan.field} not found in approved data.ts — aborting.`)

  await payload.update({
    collection,
    id: plan.id as never,
    locale: 'ar',
    req: { transactionID },
    data: { [plan.field]: richTextFromParagraphs(proposedField.ar) } as never,
  })
  await payload.update({
    collection,
    id: plan.id as never,
    locale: 'en',
    req: { transactionID },
    data: { [plan.field]: richTextFromParagraphs(proposedField.en) } as never,
  })
  console.log(`  UPDATED ${plan.kind} "${plan.slug}".${plan.field} (id ${String(plan.id)}).`)
}

// ---------------------------------------------------------------------------
// 11. Main
// ---------------------------------------------------------------------------

async function main() {
  const executeRequested = process.argv.includes('--execute')
  const isProduction = process.env['NODE_ENV'] === 'production'

  console.log('='.repeat(78))
  console.log('Civil Law Phase 2 — dedicated publication script')
  console.log(`Mode requested: ${executeRequested ? '--execute (real writes requested)' : 'dry-run (default)'}`)
  console.log(`NODE_ENV: ${process.env['NODE_ENV'] ?? '(unset)'}`)
  console.log('='.repeat(78))

  if (executeRequested && !isProduction) {
    console.log('REFUSED: --execute was passed but NODE_ENV is not "production". Refusing to proceed in any mode — fix the environment and re-run.')
    process.exitCode = 1
    return
  }

  const willExecute = executeRequested && isProduction

  let payload: Payload
  try {
    payload = await getPayload({ config })
  } catch (error) {
    console.log('DRY-RUN BLOCKED — PRODUCTION CONNECTION UNAVAILABLE')
    console.log(`Could not initialize Payload / connect to the configured database: ${error instanceof Error ? error.message : String(error)}`)
    console.log('(No connection string or secret is printed here, by design.)')
    process.exitCode = 1
    return
  }

  try {
    const reviewer = await resolveReviewer(payload)
    const articlePlans = await preflightNewArticles(payload)
    const baseline = await loadBaselineSeedData()
    const linkPlans = await preflightLinkUpdates(payload, baseline)

    const allOk = findings.every((f) => f.ok)

    console.log('-'.repeat(78))
    console.log('PLANNED OPERATIONS')
    for (const plan of articlePlans) {
      console.log(`  articles / ${plan.slug} -> ${plan.action}`)
    }
    for (const plan of linkPlans) {
      console.log(`  ${plan.kind === 'article' ? 'articles' : 'practice-areas'} / ${plan.slug}.${plan.field} -> ${plan.action}`)
    }
    console.log('-'.repeat(78))

    if (!allOk) {
      console.log(`PREFLIGHT FAILED (${findings.filter((f) => !f.ok).length} of ${findings.length} checks failed). ZERO WRITES PERFORMED.`)
      if (!willExecute) console.log('DRY RUN — ZERO WRITES PERFORMED')
      process.exitCode = 1
      return
    }

    if (!willExecute) {
      console.log('All preflight checks passed. This was a dry run, so no write would actually be skipped or blocked beyond this point.')
      console.log('DRY RUN — ZERO WRITES PERFORMED')
      process.exitCode = 0
      return
    }

    // --- Execute mode: reached only if willExecute && allOk ---
    if (!reviewer) throw new Error('Unreachable: execute mode reached without a resolved reviewer.')
    await withTransaction(payload, async (transactionID) => {
      for (const plan of articlePlans) {
        if (plan.action === 'CREATE') {
          await executeNewArticle(payload, plan.slug, reviewer.id, transactionID)
        }
      }
      for (const plan of linkPlans) {
        if (plan.action === 'UPDATE') {
          await executeLinkUpdate(payload, plan, transactionID)
        }
      }
    })
    console.log('EXECUTE COMPLETE — all writes committed in one transaction.')
    process.exitCode = 0
  } finally {
    process.exit(process.exitCode ?? 0)
  }
}

main().catch((error) => {
  console.error('Publication script failed:', error instanceof Error ? error.message : error)
  console.log('ZERO WRITES PERFORMED (or rolled back — see transaction handling above).')
  process.exit(1)
})
