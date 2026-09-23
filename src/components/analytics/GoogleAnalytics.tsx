import Script from 'next/script'

const GA4_ID = process.env['NEXT_PUBLIC_GA4_ID']

/**
 * Loads gtag.js only when NEXT_PUBLIC_GA4_ID is actually set — no tracking
 * script ships to visitors until a real GA4 property exists (see
 * CONTENT_REQUIRED.md / privacy-policy). Requires the matching
 * script-src/connect-src additions in next.config.ts's CSP.
 */
export function GoogleAnalytics() {
  if (!GA4_ID) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  )
}
