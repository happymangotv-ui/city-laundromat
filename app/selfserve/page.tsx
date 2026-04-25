import { BOOKING, PHONE, IMGS } from '@/lib/constants'
import content from '@/lib/content.json'
import MapsPicker from '@/components/MapsPicker'
import FadeUp from '@/components/FadeUp'
import Check from '@/components/Check'

const features = [
  'High-capacity washers for bulky items and large loads',
  'Fast-dry dryers to get you in and out quickly',
  'Open 7 days a week, no appointment needed',
  'Attendant on-site to assist',
  'Change machine and laundry supplies available',
]

export default function SelfServePage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <FadeUp className="hero-text">
          <div className="hero-eyebrow">Self-Serve</div>
          <h1>
            Modern machines,<br />
            <em>clean &amp; fast</em>
          </h1>
          <p className="hero-desc">
            High-efficiency washers and dryers available 7 days a week. Big loads, fast cycles,
            affordable prices — at 391 Brook Ave, Bronx. Open 7am – 8pm.
          </p>
          <div className="hero-actions">
            <a href={`tel:${PHONE}`} className="btn-primary">Call Ahead</a>
            <MapsPicker className="btn-secondary">Get Directions</MapsPicker>
          </div>
        </FadeUp>

        <FadeUp className="hero-img-col">
          <div className="hero-img-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.ibb.co/Dg1WCXWT/young-couple-loading-clothes-into-washing-machine-2026-01-09-10-00-32-utc.jpg" alt="Self-serve laundromat machines" />
          </div>
        </FadeUp>
      </section>

      <div className="divider" />

      {/* ── FACILITY SPLIT ── */}
      <section className="section section-white">
        <div className="split rev">
          <FadeUp className="split-text">
            <div className="section-label">The facility</div>
            <h2 className="section-title">Everything you need, nothing you don&apos;t</h2>
            <p className="section-sub">
              Clean, well-lit, and stocked with everything you need for a fast, easy laundry day.
            </p>
            <ul className="checklist mt-24">
              {features.map((item, i) => (
                <li key={i}><Check />{item}</li>
              ))}
            </ul>
          </FadeUp>
          <FadeUp className="split-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMGS.machines} alt="Laundromat interior" />
          </FadeUp>
        </div>
      </section>

      <div className="divider" />

      {/* ── PRICING ── */}
      <section className="section section-cloud">
        <FadeUp>
          <div className="section-header center">
            <div className="section-label">Pricing</div>
            <h2 className="section-title">Transparent, affordable rates</h2>
          </div>
        </FadeUp>
        <FadeUp>
          <div className="pricing-wrap" style={{ maxWidth: '600px' }}>
            <div className="pricing-row">
              <div className="pcard">
                <h3>Washers</h3>
                <div className="pcard-price">${content.pricing.washer}</div>
                <div className="pcard-unit">/load</div>
                <p>Standard load. High-capacity machines available for bigger loads.</p>
              </div>
              <div className="pcard">
                <h3>Dryers</h3>
                <div className="pcard-price">${content.pricing.dryer5min}</div>
                <div className="pcard-unit">/5 min</div>
                <p>High-efficiency dryers. Most loads take 30–40 minutes.</p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── PHOTO BAND ── */}
      <div className="photo-section">
        <div className="photo-section-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMGS.dropoff} alt="Laundry drop-off" />
        </div>
        <div className="photo-section-text">
          <div className="section-label">Open 7 days</div>
          <h2 className="section-title">Come in anytime, {content.hours.open} – {content.hours.close}</h2>
          <p>
            No appointment needed. Walk in, load up, and be done in under an hour.
            391 Brook Ave, Bronx NY 10454.
          </p>
          <MapsPicker className="btn-white" style={{ display: 'inline-block' }}>
            Get Directions →
          </MapsPicker>
        </div>
      </div>

      {/* ── CTA BAND ── */}
      <div className="cta-band">
        <h2>Prefer full-service? Let us do the work.</h2>
        <p>Drop off your laundry or schedule a free pickup — we&apos;ll wash, dry, and fold everything for you.</p>
        <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-white">
          Schedule a Pickup →
        </a>
      </div>
    </main>
  )
}
