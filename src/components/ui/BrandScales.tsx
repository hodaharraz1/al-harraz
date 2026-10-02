/**
 * The scales-of-justice glyph from the official logo (public/logo-icon.png):
 * a curved double-arch yoke (not a straight beam), solid triangular pans,
 * and a stepped plinth base — redrawn at vector scale so it can run small
 * (team/practice icons), as a thin low-opacity watermark (`tone="line"`),
 * or as a bold semi-solid hero focal mark (`tone="solid"`).
 */
export function BrandScales({
  className = '',
  tone = 'line',
}: {
  className?: string
  tone?: 'line' | 'solid'
}) {
  const strokeWidth = tone === 'solid' ? 7 : 3
  const panFillOpacity = tone === 'solid' ? 0.9 : 0.12
  const panStrokeOpacity = tone === 'solid' ? 1 : 0.8

  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g strokeLinecap="round" strokeLinejoin="round">
        {/* finial */}
        <circle cx="120" cy="46" r={tone === 'solid' ? 8 : 5} fill="currentColor" fillOpacity={tone === 'solid' ? 1 : 0.85} />
        {/* curved yoke — the logo's signature double-arch, not a straight bar */}
        <path
          d="M40 78 C66 46 96 46 120 60 C144 46 174 46 200 78"
          stroke="currentColor"
          strokeOpacity={tone === 'solid' ? 1 : 0.8}
          strokeWidth={strokeWidth}
        />
        {/* post */}
        <line x1="120" y1="62" x2="120" y2="186" stroke="currentColor" strokeOpacity={tone === 'solid' ? 1 : 0.8} strokeWidth={strokeWidth} />
        {/* pan strings */}
        <line x1="40" y1="78" x2="40" y2="128" stroke="currentColor" strokeOpacity={panStrokeOpacity} strokeWidth={strokeWidth * 0.6} />
        <line x1="200" y1="78" x2="200" y2="128" stroke="currentColor" strokeOpacity={panStrokeOpacity} strokeWidth={strokeWidth * 0.6} />
        {/* triangular pans — solid, matching the logo (not a chain+bowl) */}
        <path d="M40 128 L8 182 L72 182 Z" fill="currentColor" fillOpacity={panFillOpacity} stroke="currentColor" strokeOpacity={panStrokeOpacity} strokeWidth={strokeWidth * 0.5} />
        <path d="M200 128 L168 182 L232 182 Z" fill="currentColor" fillOpacity={panFillOpacity} stroke="currentColor" strokeOpacity={panStrokeOpacity} strokeWidth={strokeWidth * 0.5} />
        {/* stepped plinth base */}
        <line x1="95" y1="186" x2="145" y2="186" stroke="currentColor" strokeOpacity={tone === 'solid' ? 1 : 0.8} strokeWidth={strokeWidth} />
        <line x1="78" y1="200" x2="162" y2="200" stroke="currentColor" strokeOpacity={tone === 'solid' ? 0.85 : 0.6} strokeWidth={strokeWidth * 0.85} />
        <line x1="62" y1="214" x2="178" y2="214" stroke="currentColor" strokeOpacity={tone === 'solid' ? 0.7 : 0.45} strokeWidth={strokeWidth * 0.7} />
      </g>
    </svg>
  )
}
