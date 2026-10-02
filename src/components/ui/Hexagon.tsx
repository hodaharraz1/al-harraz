import type { ReactNode } from 'react'

/**
 * Flat-top hexagon, matching the silhouette of the official logo's teal
 * icon container (public/logo-icon.png). Used as a small filled badge
 * behind an icon or monogram — the same "glyph inside a hexagon" pattern
 * as the logo, at UI scale.
 */
export function Hexagon({
  children,
  className = '',
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ clipPath: 'polygon(25% 2%, 75% 2%, 100% 50%, 75% 98%, 25% 98%, 0% 50%)' }}
      aria-hidden="true"
    >
      {children}
    </span>
  )
}
