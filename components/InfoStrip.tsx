import { PHONE, ADDR } from '@/lib/constants'
import content from '@/lib/content.json'
import MapsPicker from '@/components/MapsPicker'

const locationIcon = (
  <>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" strokeWidth="0" />
  </>
)
const phoneIcon = (
  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.09 9.82a19.79 19.79 0 0 1-3-8.59A2 2 0 0 1 3.12 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 18z" />
)
const clockIcon = (
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>
)

export default function InfoStrip() {
  return (
    <div className="info-strip">
      {/* Location — maps picker */}
      <MapsPicker className="info-block" style={{ display: 'block' }}>
        <div className="info-icon"><svg viewBox="0 0 24 24">{locationIcon}</svg></div>
        <div className="info-label">Location</div>
        <div className="info-val">{ADDR}</div>
      </MapsPicker>

      {/* Phone — tel: link */}
      <a className="info-block" href={`tel:${PHONE.replace(/\D/g, '')}`}
        style={{ textDecoration: 'none', cursor: 'pointer' }}>
        <div className="info-icon"><svg viewBox="0 0 24 24">{phoneIcon}</svg></div>
        <div className="info-label">Phone</div>
        <div className="info-val">{PHONE}</div>
      </a>

      {/* Hours — static */}
      <div className="info-block">
        <div className="info-icon"><svg viewBox="0 0 24 24">{clockIcon}</svg></div>
        <div className="info-label">Hours</div>
        <div className="info-val">{content.hours.display}</div>
      </div>
    </div>
  )
}
