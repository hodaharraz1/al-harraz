# Professional Email Setup

Not configured yet — blocked on a domain purchase (`DOMAIN_MIGRATION_PLAN.md`). `siteConfig.email` stays `undefined` until this is done; no placeholder or guessed address exists anywhere in the codebase.

## When a domain exists

1. **Pick a mailbox provider.** For a firm this size, either works — the choice is cost/preference, not a technical requirement:
   - Google Workspace (~$6–7/user/mo) — familiar UI, generous storage, easy delegation for shared inboxes like `info@`.
   - Microsoft 365 (~$6/user/mo) — same tier, if the firm already uses Office apps.
   - A cheaper email-forwarding-only service (e.g. the domain registrar's own forwarding, or ImprovMX) if the mailbox just needs to forward to an existing personal Gmail — no real inbox, lowest cost, but no proper "send as" without extra SMTP config.

2. **DNS records** (exact values come from whichever provider is chosen — see `README.md`'s Domain & Email section for the record types):
   - MX → provider's mail servers
   - SPF (`TXT`) → `v=spf1 include:<provider> ~all`
   - DKIM (`TXT`) → provider-generated selector
   - DMARC (`TXT`) → start `p=none` (monitor only), move to `p=quarantine` once a couple of weeks of mail flow look clean, using the DMARC reports before tightening further.

3. **Suggested mailboxes**: `info@` (general), `consultations@` (routes to the same place the consultation form notifies, if that's ever added — see `POST_LAUNCH_PLAN.md`), `maritime@` (optional, only if maritime enquiries are handled by a different person/team).

4. **Code change once a real mailbox is live** (one line, `src/lib/site-config.ts`):
   ```ts
   email: 'info@<domain>',
   ```
   This alone makes it appear on the Contact page, in the `LegalService` structured data (`organizationSchema` already conditionally includes `email` when set), and anywhere else the site reads `siteConfig.email` — no other code change needed.

## Do not

Do not add an email address anywhere in the codebase before it can actually receive mail — a dead mailto: link is worse than none (a bounced/undeliverable address damages the firm's credibility more than its absence).
