import type { ReactNode } from 'react'

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-cyan-600/10 px-3 py-1 text-xs font-medium text-cyan-600">
      {children}
    </span>
  )
}
