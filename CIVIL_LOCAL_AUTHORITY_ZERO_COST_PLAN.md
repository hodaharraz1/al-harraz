# Civil Law — Zero-Cost Local & Off-Site Authority Plan

Date: 2026-10-07. Budget: 0 EGP. No paid ads, no paid directories, no paid
backlinks, no paid PR, no paid SEO tools required. Every item below is
either free, or a manual action the firm owner takes — nothing here
requires a code change, and nothing here is fabricated (no fake reviews,
no fake offices, no invented credentials).

## Google Business Profile (GBP)

Builds on the existing `LOCAL_SEO_PLAN.md`, which already tracks GBP
claim/verification status as the firm's responsibility, not a code task.
Civil-law-specific additions:

- Once verified, add "Civil Litigation Lawyer" / "محامي قضايا مدنية" as a
  secondary GBP category (alongside the primary "Law Firm" category) —
  free, and directly reinforces the civil positioning locally.
- Add 2–3 GBP "Services" entries matching the civil cluster exactly:
  "Civil Litigation" / "التقاضي المدني", "Contract Disputes" / "منازعات
  العقود", "Debt Recovery" / "تحصيل الديون" — mirrors the real practice
  areas already live on the site, no invented services.
- GBP Posts (free): short posts linking to the civil-law pillar page and
  to 1–2 of the strongest civil articles (e.g., "ما هي الدعوى المدنية؟").
  Costs nothing, drives both local visibility and referral traffic/links
  back to the pillar.

## Genuine client review acquisition

- A simple, ethical ask only — e.g. a follow-up WhatsApp message after a
  resolved civil matter, asking for a Google review. Never incentivized,
  never written by staff on the client's behalf (same hard rule already
  in `LOCAL_SEO_PLAN.md` and `CONTENT_REQUIRED.md`).
- No review content is ever fabricated on the site itself.

## NAP (Name / Address / Phone) consistency

Already PASS per `LOCAL_SEO_PLAN.md` — `siteConfig` is the single source
of truth the whole app reads from (structured data, contact page, office
section, footer), so there is no second, independently-typed copy that
could drift. No action needed here; just re-confirmed as part of this
phase, not re-audited line by line (would duplicate prior work).

## Free Egyptian/local business directories

List the firm (once GBP is live) on legitimate, free, relevant directories
using the exact `siteConfig` name/address/phone formatting — e.g. general
Egyptian business directories, any bar-association-adjacent listing the
firm is eligible for. This is a manual, ongoing task for the firm owner;
nothing here is automated or fabricated. No specific directory names are
recommended without first confirming they are reputable, free, and
accept real firms (to avoid low-quality or spam directories that would do
more harm than good).

## Free professional/legal profile opportunities

Where legitimate and free (e.g. a bar association member directory, if one
exists and the firm is already a member) — list the firm factually. Do
not create profiles on platforms that require payment or that cannot be
kept NAP-consistent.

## Organic digital PR opportunities (zero cost)

- The civil-law content already live (filing a lawsuit, evidence,
  enforcement, appeals, compensation) is genuinely useful, citation-backed
  content — the kind that Egyptian legal/business blogs or local Damietta
  news/community sites might link to organically if shared. This is an
  outreach opportunity, not a code task: the firm could share a relevant
  article (e.g. "تحصيل الديون في مصر") in response to a genuine community
  question, never as spam.
- No link should ever be bought, swapped for payment, or solicited through
  spammy mass outreach.

## Bing Webmaster Tools / IndexNow

Already implemented and in active use (`scripts/submit-all-to-indexnow.ts`,
resubmitted after every content change this engagement, most recently
after this phase's civil-cluster changes). **Clarification per the
brief's explicit instruction**: IndexNow notifies IndexNow-supported
engines (confirmed: Bing) that a URL changed — it does not force or
guarantee Google indexing or ranking. Google discovers and indexes
through its own crawl process (sitemap + internal links + external
signals), which this phase's internal-linking work is intended to support,
not replace.

## Google Search Console monitoring

- The firm owner continues submitting the manual indexing queue from
  `GSC_DISCOVERED_NOT_INDEXED_35_AUDIT.md` §K (unrelated pages) separately.
- For civil-specific monitoring going forward, watch (in GSC Performance,
  filtered by query containing "مدني"/"civil" or by the `/practice-areas/civil-law`
  and civil-cluster article URLs): impressions, clicks, CTR, and average
  position trending against the baseline in
  `CIVIL_SEO_BASELINE_AND_TRACKING.md`.
- No ranking timeline is promised anywhere in this plan — see the staged,
  evidence-based tracking model in the baseline document instead of a
  fixed date.

## What this plan explicitly does NOT include

- No paid Google Ads or Meta Ads campaigns.
- No paid directory listings or paid backlink purchases.
- No fabricated reviews, testimonials, case results, or office locations.
- No "Civil Lawyer Damietta" doorway page — Damietta relevance is carried
  by GBP + one factual sentence on the real pillar page, never a
  second/duplicate page.
