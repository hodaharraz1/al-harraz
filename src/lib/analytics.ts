declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Fires a GA4 custom event if gtag is loaded (it isn't, until NEXT_PUBLIC_GA4_ID
 * is set — see GoogleAnalytics.tsx). Never pass case descriptions, messages,
 * or any other form field content here — event params must stay limited to
 * the interaction itself (e.g. which CTA, which locale).
 */
export function trackEvent(name: string, params?: Record<string, string>): void {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}
