/**
 * The primary visual anchor for the homepage hero — a deliberate, legible
 * scales-of-justice emblem (not a faint background watermark like
 * JusticeMark). Semi-solid pans and a brighter stroke give it real visual
 * weight, set inside two concentric rings with a short colonnade accent
 * above to read as "institutional" rather than purely decorative. Purely
 * decorative in the accessibility sense — the heading/subheading next to it
 * already carry the meaning — so it stays aria-hidden and non-focusable.
 */
export function HeroJusticeEmblem({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 480"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* soft depth glow */}
      <circle cx="240" cy="240" r="190" fill="url(#heroEmblemGlow)" />

      {/* concentric rings */}
      <circle cx="240" cy="240" r="200" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.5" />
      <circle cx="240" cy="240" r="172" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />

      {/* short colonnade accent above the scales, evoking institutional architecture */}
      <g stroke="currentColor" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round">
        <line x1="150" y1="118" x2="150" y2="150" />
        <line x1="190" y1="104" x2="190" y2="150" />
        <line x1="240" y1="96" x2="240" y2="150" />
        <line x1="290" y1="104" x2="290" y2="150" />
        <line x1="330" y1="118" x2="330" y2="150" />
      </g>
      <line x1="140" y1="150" x2="340" y2="150" stroke="currentColor" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round" />

      {/* scales of justice — bolder stroke, semi-solid pans */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <circle cx="240" cy="178" r="7" fill="currentColor" fillOpacity="0.9" />
        <line x1="240" y1="192" x2="240" y2="360" stroke="currentColor" strokeOpacity="0.9" strokeWidth="4" />

        <line x1="130" y1="232" x2="350" y2="232" stroke="currentColor" strokeOpacity="0.9" strokeWidth="4" />

        <line x1="130" y1="232" x2="90" y2="302" stroke="currentColor" strokeOpacity="0.75" strokeWidth="2.5" />
        <line x1="130" y1="232" x2="170" y2="302" stroke="currentColor" strokeOpacity="0.75" strokeWidth="2.5" />
        <path d="M90 302a40 20 0 0 0 80 0" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.75" strokeWidth="2.5" />

        <line x1="350" y1="232" x2="310" y2="302" stroke="currentColor" strokeOpacity="0.75" strokeWidth="2.5" />
        <line x1="350" y1="232" x2="390" y2="302" stroke="currentColor" strokeOpacity="0.75" strokeWidth="2.5" />
        <path d="M310 302a40 20 0 0 0 80 0" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.75" strokeWidth="2.5" />

        <line x1="185" y1="360" x2="295" y2="360" stroke="currentColor" strokeOpacity="0.9" strokeWidth="4" />
        <line x1="205" y1="360" x2="178" y2="396" stroke="currentColor" strokeOpacity="0.9" strokeWidth="4" />
        <line x1="275" y1="360" x2="302" y2="396" stroke="currentColor" strokeOpacity="0.9" strokeWidth="4" />
        <line x1="150" y1="396" x2="330" y2="396" stroke="currentColor" strokeOpacity="0.9" strokeWidth="4" />
      </g>

      <defs>
        <radialGradient id="heroEmblemGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}
