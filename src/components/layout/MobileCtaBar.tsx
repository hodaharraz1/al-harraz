import type { Locale } from '@/lib/i18n'
import type { Dictionary } from '@/lib/dictionary'
import { buildTelLink, buildWhatsAppLink } from '@/lib/whatsapp'

export function MobileCtaBar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-navy-900/10 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.06)] lg:hidden"
      role="navigation"
      aria-label={locale === 'ar' ? 'إجراءات سريعة' : 'Quick actions'}
    >
      <a
        href={buildTelLink()}
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 text-xs font-medium text-navy-900"
      >
        <span aria-hidden="true">📞</span>
        {dict.cta.call}
      </a>
      <a
        href={buildWhatsAppLink(locale, 'general')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 border-x border-navy-900/10 text-xs font-medium text-navy-900"
      >
        <span aria-hidden="true">💬</span>
        {dict.cta.whatsapp}
      </a>
      <a
        href={`/${locale}/consultation`}
        className="flex min-h-14 flex-col items-center justify-center gap-0.5 bg-cyan-600 text-xs font-semibold text-white"
      >
        <span aria-hidden="true">📅</span>
        {dict.cta.consultation}
      </a>
    </div>
  )
}
