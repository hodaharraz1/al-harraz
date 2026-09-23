import { IBM_Plex_Sans_Arabic, Inter } from 'next/font/google'

// Arabic body copy — already referenced by name in globals.css but never
// actually loaded before this, so it was silently falling back to the
// browser's default sans-serif the whole time.
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-arabic',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

// Markazi Text and Source Serif 4 were previously loaded here too (6 font
// files across their weights) but neither is referenced anywhere in
// globals.css's font-family declarations or any component — dead weight on
// every page load, downloaded and preloaded for text that was never
// actually set in either face. Removed; only the two faces the CSS
// actually uses remain.
export const fontVariables = `${ibmPlexSansArabic.variable} ${inter.variable}`
