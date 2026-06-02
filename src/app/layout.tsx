import type { Metadata } from 'next'
import { Playfair_Display, Cormorant_Garamond, Inter, Tajawal } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
})

export const metadata: Metadata = {
  title: 'عقدي الفريد | Aqdi Alfareed — Luxury Jewelry',
  description: 'مجوهرات فاخرة من الفضة والذهب | Luxury silver and gold jewelry — Aqdi Alfareed',
  keywords: ['jewelry', 'مجوهرات', 'gold', 'silver', 'ذهب', 'فضة', 'luxury', 'فاخر', 'Saudi Arabia'],
  openGraph: {
    title: 'عقدي الفريد | Aqdi Alfareed',
    description: 'Luxury jewelry crafted for every elegant moment',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${tajawal.variable}`}
    >
      <body className="bg-cream text-ink antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
