import Link from 'next/link'
import { PHONE, ADDR, EMAIL } from '@/lib/constants'
import content from '@/lib/content.json'
import MapsPicker from '@/components/MapsPicker'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="footer-logo">The City <em>Laundry</em></div>
          <p className="footer-desc">
            Professional laundry services for Manhattan and the Bronx. Clean clothes, happy
            customers — every time.
          </p>
        </div>

        <div className="footer-col">
          <h4>SERVICES</h4>
          <ul>
            <li><Link href="/pickup">Pickup &amp; Delivery</Link></li>
            <li><Link href="/selfserve">Self-Serve</Link></li>
            <li><Link href="/commercial">Commercial</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>CONTACT</h4>
          <ul>
            <li><MapsPicker style={{ color: 'var(--ash)', fontSize: '14px', fontWeight: 500 }}>{ADDR}</MapsPicker></li>
            <li><a href={`tel:${PHONE.replace(/\D/g, '')}`}>{PHONE}</a></li>
            <li><a href={`mailto:${EMAIL}?subject=The%20City%20Laundry%20Inquiry`}>{EMAIL}</a></li>
            <li><span>{content.hours.display}</span></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 The City Laundry. All rights reserved.</span>
        <MapsPicker style={{ color: 'var(--mute)', fontSize: '12px', fontWeight: 500 }}>{ADDR}</MapsPicker>
      </div>
    </footer>
  )
}
