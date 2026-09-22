# URL Map

Status: Phase 2. Clean, locale-prefixed, no query-string identifiers (per brief §44).

| Page | Arabic URL | English URL |
|---|---|---|
| Home | `/ar/` | `/en/` |
| About | `/ar/about/` | `/en/about/` |
| History | `/ar/about/history/` | `/en/about/history/` |
| Team directory | `/ar/team/` | `/en/team/` |
| Lawyer profile | `/ar/team/[slug]/` | `/en/team/[slug]/` |
| Practice areas index | `/ar/practice-areas/` | `/en/practice-areas/` |
| Practice area detail | `/ar/practice-areas/[slug]/` | `/en/practice-areas/[slug]/` |
| Maritime hub | `/ar/practice-areas/maritime-shipping-port-law/` | `/en/practice-areas/maritime-shipping-port-law/` |
| Industries index | `/ar/industries/` | `/en/industries/` |
| Industry detail | `/ar/industries/[slug]/` | `/en/industries/[slug]/` |
| Insights index | `/ar/insights/` | `/en/insights/` |
| Article | `/ar/insights/[slug]/` | `/en/insights/[slug]/` |
| Contact | `/ar/contact/` | `/en/contact/` |
| Consultation | `/ar/consultation/` | `/en/consultation/` |
| Privacy | `/ar/privacy-policy/` | `/en/privacy-policy/` |
| Terms/Disclaimer | `/ar/terms/` | `/en/terms/` |

## Slug Rules

- English-alphanumeric slugs even under `/ar/` (per brief §06 — clean, maintainable slugs beneath either locale prefix), e.g. `/ar/practice-areas/maritime-shipping-port-law/`.
- No trailing `?id=`, no numeric IDs, no auto-generated random slugs.
- Slug uniqueness enforced per collection at the CMS level.
- `/` (bare root) 302s to the visitor's detected/preferred locale on first visit only (via `Accept-Language`, not IP geolocation), then persists via cookie; `x-default` in `hreflang` sets always points to `/ar/` (primary target market per `SITE_STRATEGY.md` §4), so crawlers get a deterministic canonical choice.
