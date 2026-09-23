import type { ReactNode } from 'react'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'

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
  reveal = true,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
  id?: string
  /** Set false for the hero/first section — content above the fold should render visible immediately, not wait on scroll. */
  reveal?: boolean
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 lg:py-32 ${toneClasses[tone]} ${className}`}>
      <Container>{reveal ? <Reveal>{children}</Reveal> : children}</Container>
    </section>
  )
}
