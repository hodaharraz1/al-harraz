import { localeDirection, type Locale } from '@/lib/i18n'
import { BrandScales } from '@/components/ui/BrandScales'

/**
 * The hero's visual focal point — the logo's scales glyph, oversized and
 * bled off-canvas inside a large soft hexagon frame, anchored to the
 * reading-end side so it reads as part of the environment rather than an
 * icon placed next to the text. Positioning uses logical (start/end)
 * utilities, which flip automatically with `dir`; only the internal fade
 * gradient's angle needs an explicit RTL check since CSS gradient angles
 * are physical, not logical.
 */
export function HeroBackdrop({ locale, className = '' }: { locale: Locale; className?: string }) {
  const isRtl = localeDirection[locale] === 'rtl'

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 end-0 w-full overflow-hidden sm:w-[72%] lg:w-[46%] xl:w-[50%] ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(ellipse 85% 70% at 65% 38%, rgba(16,168,196,0.16), transparent 65%)',
        }}
      />

      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full overflow-visible text-cyan-300">
        <polygon
          points="85,-10 335,-10 460,220 335,450 85,450 -40,220"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.16"
          strokeWidth="2.5"
        />
      </svg>

      <BrandScales tone="solid" className="absolute inset-0 m-auto h-[82%] w-[82%] text-cyan-400 opacity-30 blur-2xl" />
      <BrandScales tone="solid" className="absolute inset-0 m-auto h-[74%] w-[74%] text-cyan-500" />

      <div
        className="absolute inset-y-0 start-0 w-3/4"
        style={{
          backgroundImage: `linear-gradient(${isRtl ? '270deg' : '90deg'}, var(--color-navy-950), transparent)`,
        }}
      />
    </div>
  )
}
