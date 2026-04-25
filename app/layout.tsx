import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SiteLayout from '@/components/SiteLayout'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The City Laundry – Manhattan Laundry Pickup & Delivery',
  description:
    'Professional laundry pickup and delivery for Manhattan and the Bronx. Wash & Fold starting at $1.25/lb. Free pickup included.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  )
}
