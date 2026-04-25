'use client'
import { usePathname } from 'next/navigation'
import Nav from './Nav'
import Footer from './Footer'
import DiscountModal from './DiscountModal'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return <>{children}</>

  return (
    <>
      <Nav />
      <div style={{ marginTop: '72px' }}>
        {children}
        <Footer />
      </div>
      <DiscountModal />
    </>
  )
}
