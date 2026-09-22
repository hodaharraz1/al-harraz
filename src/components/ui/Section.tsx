import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'

type Tone = 'light' | 'dark' | 'neutral'

const toneClasses: Record<Tone, string> = {
  light: 'bg-neutral-50 text-navy-950',
  dark: 'bg-navy-950 text-neutral-50',
  neutral: 'bg-neutral-100 text-navy-950',
}

export function Section({
  children,
  tone = 'light',
  className = '',
  id,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`py-14 sm:py-20 ${toneClasses[tone]} ${className}`}>
      <Container>{children}</Container>
    </section>
  )
}
