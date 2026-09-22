# Internal Linking Plan

Status: Phase 2.

## Principles

- Every published page reachable within 3 clicks from Home.
- No orphan pages: every PracticeArea/Industry/Article/Lawyer page is linked from at least one index/hub page and at least one contextually related page.
- Maritime cluster gets the densest internal linking of any cluster, reflecting its strategic priority (brief §10).

## Core Linking Rules (enforced by component design, not just editorial discipline)

1. **Practice area detail page** → links to: related industries, related lawyers, related FAQs, related insights, the Consultation CTA. Automatically rendered from CMS relationships — never manually hardcoded per page.
2. **Industry detail page** → links to: every related practice area, relevant lawyers, Maritime hub if the industry is shipping/logistics/import-export-adjacent.
3. **Maritime hub** → links out to: Customs, Import/Export, Commercial Law, Contracts, Arbitration practice pages, and the Shipping/Ports/Logistics/Import-Export industry pages, plus any Maritime-tagged Insights articles. Receives inbound links from those same pages (bidirectional).
4. **Lawyer profile** → links to: their practice areas, their industries, their authored articles.
5. **Article** → links to: its practice area(s)/industry, 2-3 related articles, a consultation CTA relevant to its topic.
6. **Home** → links to: top practice areas, Maritime hub (dedicated feature block), Industries, Team preview, latest Insights, Consultation.
7. **Footer** → present on every page, links to top practice areas, industries, Maritime, Insights, Team, Contact — the global safety net against orphaning.

## Anchor Text Discipline

Descriptive, topic-matched anchor text (e.g. "منازعات الشحن البحري" not "اضغط هنا") — supports both SEO and accessibility (screen-reader link-list navigation).

## Audit Cadence

Before each content push, run the internal link checker (part of `TESTING.md`) to catch new orphaned pages or broken internal links introduced by the change.
