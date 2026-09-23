// Several callers (articleSchema, personSchema, faqPageSchema) embed real
// CMS-editable text — article titles/excerpts, author/lawyer names, FAQ
// question/answer copy. JSON.stringify does not escape "<", so CMS content
// that happens to contain the literal substring "</script>" would close
// this tag early and inject whatever followed as live HTML/script. Escape
// the characters that matter for breaking out of a <script> context (and
// U+2028/U+2029, which are valid JSON but can trip up some JS parsers of
// inlined script content) before this ever reaches dangerouslySetInnerHTML.
export function safeJsonLdString(data: Record<string, unknown>): string {
  return JSON.stringify(data)
    .replaceAll('<', '\\u003c')
    .replaceAll('>', '\\u003e')
    .replaceAll('&', '\\u0026')
    .replaceAll(' ', '\\u2028')
    .replaceAll(' ', '\\u2029')
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLdString(data) }} />
}
