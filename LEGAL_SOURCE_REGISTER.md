# Legal Source Register

Tracks the sources checked for every piece of legal-education content drafted for this site, per the two-source verification rule. This register does **not** replace a real lawyer's review — it only documents what was checked before drafting. A topic is only eligible for CMS publication once a real, named Al Harraz lawyer has reviewed it and is recorded as `legalReviewer` on the Article/Practice Area document (enforced in code, not just process).

Verification-status legend (matches internal drafting notes):
- **SOURCE VERIFIED** — corroborated across two or more independent, credible sources; no fabricated statute/case numbers or deadlines.
- **NEEDS_HUMAN_LEGAL_REVIEW** — source-verified but not yet reviewed by a firm lawyer (the default state for every draft below until the firm confirms otherwise).
- **LAWYER APPROVED** — a named Al Harraz lawyer has actually reviewed and approved the content. Nothing in this file currently holds this status.

## Drafts pending firm-lawyer review

| Topic (AR) | Target page | Status | Sources checked | Notes |
|---|---|---|---|---|
| حقوق المتهم في القضايا الجنائية (Rights of the Accused in Criminal Cases) | Insights / Criminal | NEEDS_HUMAN_LEGAL_REVIEW | Delivered as a draft file earlier this session (see prior conversation) — general-education framing, no invented case/statute numbers. | Delivered directly to the firm owner as a file, not yet re-logged here with exact source URLs from that session. |
| ما الفرق بين الجنحة والجناية؟ (Misdemeanor vs. Felony) | Insights / Criminal | NEEDS_HUMAN_LEGAL_REVIEW | Same as above. | Same as above. |
| إجراءات رفع دعوى مدنية في مصر (Filing a Civil Lawsuit in Egypt) | Insights / Civil | NEEDS_HUMAN_LEGAL_REVIEW | 1. Andersen Egypt — https://eg.andersen.com/lawyers-to-file-a-lawsuit/ <br>2. Consortio Law Firm (Law 13/1968 English translation) — https://consortiolawfirm.com/egyptian-code-civil-commercial-procedure-law-13-1968-english-translation/ <br>3. Mohamy Masr (AR) — https://mohamymasr.com/%D8%A5%D8%AC%D8%B1%D8%A7%D8%A1%D8%A7%D8%AA-%D8%B1%D9%81%D8%B9-%D8%A7%D9%84%D8%AF%D8%B9%D9%88%D9%89-%D9%88%D9%82%D9%8A%D8%AF%D9%87%D8%A7-%D8%A5%D9%84%D9%89-%D8%A7%D9%84%D9%85%D8%AD%D9%83%D9%85%D8%A9/ <br>4. Qanoony Academy (AR) — https://qanoony.academy/ar/latest-news/%D9%83%D9%8A%D9%81%D9%8A%D8%A9-%D8%B1%D9%81%D8%B9-%D8%AF%D8%B9%D9%88%D9%89-%D9%85%D8%AF%D9%86%D9%8A%D8%A9-%D9%81%D9%8A-%D9%85%D8%B5%D8%B1 | All four sources agree: Law 13/1968, Articles 63–66 govern the statement of claim's content requirements; same jurisdiction→file→register→serve sequence; same general two-tier-plus-cassation appeal structure. No specific deadlines/fee figures included in the draft (not confidently corroborated across sources). Draft delivered as a file — see `article-civil-lawsuit-procedure.md`. |

## Method

For every new legal-education topic:
1. Check `KEYWORD_MAP.md`'s Informational table for the assigned target page and priority — extend that page/topic rather than creating a near-duplicate.
2. Research via at least two independent, credible sources (prioritize primary legislative text and established law-firm/professional publications over general blogs).
3. Never state a specific statute/article number, case citation, or procedural deadline unless it is corroborated identically across sources.
4. Avoid absolute language ("always", "guaranteed", "in all cases") for anything that varies by case.
5. Log the topic, sources, and any explicitly-omitted claims (and why) in this file.
6. Deliver as a draft file, not a CMS record — the `legalReviewer` field cannot be honestly satisfied without a real lawyer's review.
