'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BOOKING } from '@/lib/constants'

const links = [
  { href: '/',           label: 'Home' },
  { href: '/pickup',     label: 'Pickup & Delivery' },
  { href: '/selfserve',  label: 'Self-Serve' },
  { href: '/commercial', label: 'Commercial' },
  { href: '/about',      label: 'About' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav className="nav">
        <Link href="/" className="nav-logo">
          The City <em>Laundry</em>
        </Link>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={pathname === l.href ? 'active' : ''}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <button className="nav-cta" onClick={() => window.open(BOOKING, '_blank')}>
            Schedule a Pickup
          </button>
        </div>

        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mobile-menu-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
          ✕
        </button>
        <Link href="/" className="mobile-menu-logo" onClick={() => setMenuOpen(false)}>
          The City <em>Laundry</em>
        </Link>
        {links.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </Link>
        ))}
        <button
          className="mobile-menu-cta"
          onClick={() => { window.open(BOOKING, '_blank'); setMenuOpen(false) }}
        >
          Schedule a Pickup
        </button>
      </div>
    </>
  )
}
