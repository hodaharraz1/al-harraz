import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[var(--radius-card)] bg-white p-7 shadow-[0_1px_2px_rgba(10,13,16,0.06)] transition-shadow hover:shadow-[0_8px_24px_rgba(10,13,16,0.08)] ${className}`}
    >
      {children}
    </div>
  )
}
