export function JsonLd({ data }: { data: Record<string, unknown> }) {
  // JSON-LD must be inlined; `data` is server-constructed, not user input.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
