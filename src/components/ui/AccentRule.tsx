/**
 * The short red rule beneath the wordmark in the official logo, reused as a
 * small signature accent — under eyebrow labels and before section headings.
 */
export function AccentRule({ className = '' }: { className?: string }) {
  return <span aria-hidden="true" className={`inline-block h-[3px] w-9 rounded-full bg-accent-red ${className}`} />
}
