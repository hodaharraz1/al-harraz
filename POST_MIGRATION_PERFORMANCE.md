# Post-Migration Performance

## Status: PARTIAL — server-side timing measured; no live Lighthouse/Core Web Vitals run (no headless-browser internet access in this sandbox)

## What was measured: server response timing (TTFB, total transfer)
```
/ar                                                    TTFB 0.448s | Total 0.474s | 118 KB
/en                                                     TTFB 0.432s | Total 0.450s | 105 KB
/ar/practice-areas/civil-law                            TTFB 0.262s | Total 0.274s | 42 KB
/ar/insights/rights-of-the-accused-in-criminal-cases     TTFB 0.201s | Total 0.210s | 44 KB
/ar/consultation                                         TTFB 0.166s | Total 0.178s | 51 KB
```
Measured via direct `curl` timing against the live `alharrazlaw.com` production site from this session's network location.

## What this does and doesn't tell us
This confirms the domain migration itself introduced no server-side latency regression — response times are consistent with what was measured against the old domain earlier in this project (`FINAL_TECHNICAL_AUDIT.md` §46–47 recorded homepage transfer sizes in the same 10–20KB-plus range with fast local timing). It does **not** measure real-user metrics — **LCP, INP, and CLS require an actual browser rendering the page**, which this sandbox cannot do (no headless-browser internet access, a standing, previously-documented limitation — see `TESTING.md`).

## Recommendation
Run a live PageSpeed Insights / Lighthouse check against `https://alharrazlaw.com` from a real browser (the firm's own machine, or a future session with that capability) for actual LCP/INP/CLS numbers against the stated targets (LCP ≤2.5s, INP ≤200ms, CLS ≤0.1). No claim is made here about meeting those thresholds, since they weren't actually measured — this is intentionally left as PARTIAL, not PASS, per the standing rule against claiming verification that wasn't done.

## Explicitly not touched
No performance "optimization" changes were made in this migration — nothing here should have moved performance in either direction, and this report is a domain-migration sanity check, not a performance-tuning pass.
