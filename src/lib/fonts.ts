import { IBM_Plex_Sans_Arabic, Inter, Markazi_Text, Source_Serif_4 } from 'next/font/google'

// Arabic body copy — already referenced by name in globals.css but never
// actually loaded before this, so it was silently falling back to the
// browser's default sans-serif the whole time.
export const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-arabic',
  display: 'swap',
})

// Arabic display/heading face — a serif built for large sizes, used to give
// headings editorial weight without tipping into a Kufic/geometric look.
export const markaziText = Markazi_Text({
  subsets: ['arabic'],
  weight: ['500', '600', '700'],
  variable: '--font-markazi',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-source-serif',
  display: 'swap',
})

export const fontVariables = `${ibmPlexSansArabic.variable} ${markaziText.variable} ${inter.variable} ${sourceSerif4.variable}`
