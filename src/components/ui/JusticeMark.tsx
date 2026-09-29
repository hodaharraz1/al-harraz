/**
 * A minimal line-art scales-of-justice mark, derived from the proportions of
 * the existing logo icon (public/logo-icon.png) — same balance-beam/pan
 * silhouette, redrawn as thin outline strokes so it can be used as a large,
 * low-opacity watermark rather than a filled icon. Purely decorative: always
 * render with aria-hidden and a low-opacity text color from the current
 * palette (e.g. `text-cyan-300/5`), never as a focusable or informative
 * element.
 */
export function JusticeMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="200" cy="28" r="6" />
      <line x1="200" y1="40" x2="200" y2="300" />
      <line x1="70" y1="90" x2="330" y2="90" />
      <line x1="70" y1="90" x2="45" y2="150" />
      <line x1="70" y1="90" x2="95" y2="150" />
      <path d="M45 150a25 12 0 0 0 50 0" />
      <line x1="330" y1="90" x2="305" y2="150" />
      <line x1="330" y1="90" x2="355" y2="150" />
      <path d="M305 150a25 12 0 0 0 50 0" />
      <line x1="150" y1="300" x2="130" y2="330" />
      <line x1="250" y1="300" x2="270" y2="330" />
      <line x1="130" y1="330" x2="270" y2="330" />
    </svg>
  )
}
