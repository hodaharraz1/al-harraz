import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-cyan-600 text-white hover:bg-cyan-500 focus-visible:outline-cyan-600',
  secondary:
    'bg-navy-900 text-white hover:bg-navy-800 focus-visible:outline-navy-900',
  ghost:
    'bg-transparent text-navy-900 border border-navy-900/20 hover:bg-navy-900/5 focus-visible:outline-navy-900',
}

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50'

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
