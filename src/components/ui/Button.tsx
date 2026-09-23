import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'link' | 'invert' | 'invert-outline'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-navy-950 text-white hover:bg-navy-800 focus-visible:outline-navy-950',
  secondary:
    'bg-transparent text-navy-950 border border-navy-950/30 hover:border-navy-950 focus-visible:outline-navy-950',
  ghost:
    'bg-transparent text-navy-900 border border-navy-900/20 hover:bg-navy-900/5 focus-visible:outline-navy-900',
  accent:
    'bg-bronze-500 text-white hover:bg-bronze-600 focus-visible:outline-bronze-600',
  // Chrome-less "Learn more →" style link, Apple's secondary CTA pattern.
  link:
    'min-h-0 rounded-none px-0 py-0 text-cyan-600 underline-offset-4 hover:underline focus-visible:outline-cyan-600',
  // For dark/saturated backgrounds (the hero, the cyan CTA band) — kept as
  // dedicated variants rather than className overrides on `primary`/
  // `secondary`, because Tailwind v4's generated stylesheet order does not
  // reliably follow JSX class order, so two classes touching the same
  // property (e.g. an override's `bg-white` vs `primary`'s `bg-navy-950`)
  // can silently resolve to the wrong one instead of "last wins".
  invert:
    'bg-white text-navy-950 hover:bg-neutral-100 focus-visible:outline-white',
  'invert-outline':
    'bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/10 focus-visible:outline-white',
}

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50'

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: { children: ReactNode; variant?: Variant; className?: string } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function LinkButton({
  children,
  variant = 'primary',
  className = '',
  href,
  ...props
}: {
  children: ReactNode
  variant?: Variant
  className?: string
  href: string
} & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} className={`${base} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </a>
  )
}
