# Internal Linking Plan

Status: Phase 2.

## Principles

- Every published page reachable within 3 clicks from Home.
- No orphan pages: every PracticeArea/Industry/Article/Lawyer page is linked from at least one index/hub page and at least one contextually related page.
- Civil Law and Criminal Law are the `featured` practice areas (surfaced first on the homepage preview and the practice-areas index) — per client direction, no single cluster (including Maritime) gets a disproportionate/dedicated internal-linking treatment; Maritime is linked exactly like any other practice area. See `SITE_STRATEGY.md` §1.

## Core Linking Rules (enforced by component design, not just editorial discipline)

1. **Practice area detail page** → links to: related industries, related lawyers, related FAQs, related insights, the Consultation CTA. Automatically rendered from CMS relationships — never manually hardcoded per page.
2. **Industry detail page** → links to: every related practice area, relevant lawyers.
3. **Lawyer profile** → links to: their practice areas, their industries, their authored articles.
4. **Article** → links to: its practice area(s)/industry, 2-3 related articles, a consultation CTA relevant to its topic.
5. **Home** → links to: top (featured-first) practice areas, Industries, Team preview, latest Insights, Consultation.
6. **Footer** → present on every page, links to top practice areas, industries, Insights, Team, Contact — the global safety net against orphaning.

## Anchor Text Discipline

Descriptive, topic-matched anchor text (e.g. "منازعات الشحن البحري" not "اضغط هنا") — supports both SEO and accessibility (screen-reader link-list navigation).

## Audit Cadence

Before each content push, run the internal link checker (part of `TESTING.md`) to catch new orphaned pages or broken internal links introduced by the change.
