import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export function RichText({ data }: { data: SerializedEditorState | null | undefined }) {
  if (!data) return null
  return (
    <div className="legal-richtext max-w-none">
      <PayloadRichText data={data} />
    </div>
  )
}
