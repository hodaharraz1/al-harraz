'use client'

import { useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

/**
 * Delegated click tracking for lead-generation CTAs (call, WhatsApp,
 * directions) that live in server components across the site — one
 * listener here avoids converting every CTA into a client component just
 * to fire an event. Only the interaction type is sent, never form content.
 */
export function CtaClickTracking() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target
      if (!(target instanceof Element)) return
      const link = target.closest('a[href]')
      if (!link) return
      const href = link.getAttribute('href') ?? ''

      if (href.startsWith('tel:')) {
        trackEvent('call_click')
      } else if (href.includes('wa.me') || href.includes('api.whatsapp.com')) {
        trackEvent('whatsapp_click')
      } else if (href.startsWith('mailto:')) {
        trackEvent('email_click')
      } else if (href.includes('google.com/maps')) {
        trackEvent('directions_click')
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
