import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-navy-900/15 bg-white p-6 transition-colors hover:border-navy-900/30 ${className}`}
    >
      {children}
    </div>
  )
}
