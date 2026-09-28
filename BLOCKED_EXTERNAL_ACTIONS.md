# Blocked External Actions

Everything in this file requires something Claude cannot do from this sandbox: the firm's own credentials/access, a physical action, a payment decision, or a real lawyer's professional judgment. Nothing here is "hard to automate" — it's genuinely outside what code or content work can resolve. Every other actionable item from the site-strategy and search-visibility work has been completed or is tracked as regular (non-blocked) work elsewhere.

| Item | Blocked on | Why it can't be done from here | Where it's tracked |
|---|---|---|---|
| Google Business Profile video verification | The firm, in person at the office | Requires a physical verification video recorded at the real office location — no code or content substitute exists. | `LOCAL_SEO_PLAN.md` |
| Custom domain purchase (e.g., a `.com`/`.law` domain) | Owner purchase authorization | Zero-budget rule is standing and non-negotiable; a domain purchase costs real money. The free/non-purchase parts of the migration plan are already prepared and ready to execute once authorized. | `DOMAIN_MIGRATION_PLAN.md` |
| Professional email on a firm domain | Same as above (depends on the domain) | Can't be provisioned before a domain exists. | `EMAIL_SETUP.md` |
| 12 remaining lawyer profiles (bios, qualifications, education, court admission level, photos) | The firm supplying real, verified data | Inventing placeholder bios would be exactly the kind of fabrication these rules forbid. Only the 3 named lawyers from the original brief are seeded. | `CONTENT_REQUIRED.md` |
| Office/team photography | The firm arranging a shoot | No real people photos exist anywhere on the site by firm policy — this needs an actual photography session, not a code change. | `CONTENT_REQUIRED.md` |
| Real lawyer review of all draft legal-education articles (12 total: 2 criminal-law drafts from earlier in this project, plus 10 new drafts — civil litigation, contracts, real estate, debt recovery, family law, commercial disputes, corporate, employment, administrative, maritime) | A named Al Harraz lawyer's actual review | The `legalReviewer` field is `required: true` at the code level — Claude cannot honestly satisfy it. Every draft is source-verified (see `LEGAL_SOURCE_REGISTER.md`) but **not** lawyer-approved, and none has been entered into the CMS. | `LEGAL_SOURCE_REGISTER.md` |
| Alharraz Contact (QR/vCard) sub-project — confirm InfinityFree hosting finished propagating | The firm checking `https://alharraz.infinityfreeapp.com/` and reporting back | This is separate free hosting outside this repo/session's direct reach; last known status before this session's SEO work was an unconfirmed propagation delay. | (tracked only in conversation — no dedicated file, since it's a separate small project) |
| Live Lighthouse/PageSpeed Insights run against production | Real internet access from a headless browser, which this sandbox does not have | Only local-network lab timing data could be measured here; a live PageSpeed Insights run needs to be done outside this sandbox (e.g., by the firm, or a future session with that access). | `FINAL_TECHNICAL_AUDIT.md` §46–47 |

## Explicitly not blocked (for clarity — already done or in progress, not stuck)

- IndexNow, sitemap, robots.txt, canonical, hreflang, structured data, llms.txt — all live and verified PASS.
- 10 new source-verified draft articles across every P1 content cluster (civil litigation through maritime) — done, delivered as files, logged in `LEGAL_SOURCE_REGISTER.md`. Only the lawyer-review step above is blocked, not the drafting/research work itself.
- Existing published content re-audited for fabricated citations or absolute claims — clean, no corrections needed.
- Data retention policy for consultation submissions specifically remains an open firm decision (not a technical blocker) — see `FINAL_TECHNICAL_AUDIT.md` §63–64.
