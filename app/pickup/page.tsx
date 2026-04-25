import { BOOKING, PHONE, IMGS } from '@/lib/constants'
import content from '@/lib/content.json'
import FadeUp from '@/components/FadeUp'
import Check from '@/components/Check'

const areas = [
  { img: IMGS.ues,     title: 'Upper East Side', desc: 'Full pickup and delivery coverage across the Upper East Side.',    href: BOOKING },
  { img: IMGS.uws,     title: 'Upper West Side', desc: 'Full pickup and delivery coverage across the Upper West Side.',    href: BOOKING },
  { img: IMGS.midtown, title: 'Midtown',         desc: 'Full pickup and delivery coverage throughout Midtown Manhattan.',  href: BOOKING },
]

const steps = [
  { n: '1', t: 'Schedule online',                d: 'Pick a time — available 8am to 8pm, 7 days a week.' },
  { n: '2', t: 'We pick up from your door',      d: 'Our driver arrives at your building. Hand off your laundry and go about your day.' },
  { n: '3', t: 'Cleaned & delivered in 48 hrs',  d: 'We wash, dry, fold, and return everything fresh to your door.' },
]

const promises = [
  'Hypoallergenic & fragrance-free options',
  'Comforters and oversized items welcome',
  'Consistent handling, same team every time',
]

export default function PickupPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <FadeUp className="hero-text">
          <div className="hero-eyebrow">Pickup &amp; Delivery</div>
          <h1>
            Free pickup &amp; delivery —<br />
            <em>Upper Manhattan</em>
          </h1>
          <p className="hero-desc">
            Schedule online. We pick up, wash, fold, and deliver back to your door within 48 hours.
          </p>
          <div className="hero-actions">
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Schedule a Pickup →
            </a>
            <a href={`tel:${PHONE}`} className="btn-secondary">Call Us</a>
          </div>
        </FadeUp>

        <FadeUp className="hero-img-col">
          <div className="hero-img-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://i.ibb.co/Kc2mBxMX/basket-with-clothes-2026-01-09-08-14-53-utc.jpg" alt="Laundry pickup service" />
          </div>
        </FadeUp>
      </section>

      <div className="divider" />

      {/* ── HOW IT WORKS ── */}
      <section className="section section-white">
        <FadeUp>
          <div className="section-header center">
            <div className="section-label">Simple Process</div>
            <h2 className="section-title">How it works</h2>
            <p className="section-sub">Door-to-door laundry service in three easy steps.</p>
          </div>
        </FadeUp>
        <div className="steps">
          {steps.map((s, i) => (
            <FadeUp key={i} className="step">
              <div className="step-num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── SERVICE AREA ── */}
      <section className="section section-white">
        <FadeUp>
          <div className="section-header center">
            <h2 className="section-title">Service area</h2>
            <p className="section-sub">
              We pick up and deliver across Upper East Side, Upper West Side, and Midtown.
            </p>
          </div>
        </FadeUp>
        <div className="cards-grid cards-grid-3" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {areas.map((a, i) => (
            <FadeUp key={i}>
              {a.href ? (
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="lcard" style={{ display: 'block' }}>
                  <div className="lcard-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.img} alt={a.title} />
                  </div>
                  <div className="lcard-title">{a.title}</div>
                  <div className="lcard-sub">{a.desc}</div>
                </a>
              ) : (
                <div className="lcard">
                  <div className="lcard-img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={a.img} alt={a.title} />
                  </div>
                  <div className="lcard-title">{a.title}</div>
                  <div className="lcard-sub">{a.desc}</div>
                </div>
              )}
            </FadeUp>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── PRICING ── */}
      <section className="section section-cloud">
        <FadeUp>
          <div className="section-header center">
            <div className="section-label">Pricing</div>
            <h2 className="section-title">Simple, fair pricing</h2>
            <p className="section-sub">No hidden fees. Free pickup &amp; delivery included on every order.</p>
          </div>
        </FadeUp>
        <FadeUp>
          <div className="pricing-wrap">
            <div className="pricing-row">
              <div className="pcard">
                <h3>Wash &amp; Fold</h3>
                <div className="pcard-price">${content.pricing.washFold}</div>
                <div className="pcard-unit">/lb</div>
                <p>Washed, dried, and neatly folded. Free pickup &amp; delivery included.</p>
              </div>
              <div className="pcard">
                <h3>Rush Service</h3>
                <div className="pcard-price">${content.pricing.rush}</div>
                <div className="pcard-unit">/lb</div>
                <p>Need it faster? Rush service available — call to schedule.</p>
              </div>
            </div>
            <div className="pcard wide">
              <h3>Comforters &amp; Bedding</h3>
              <p>We wash comforters, duvets, sheets, and all large items. Just include them in your order.</p>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── WHY US SPLIT ── */}
      <section className="section section-white">
        <div className="split">
          <FadeUp className="split-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMGS.washingMachines} alt="Professional laundry equipment" />
          </FadeUp>
          <FadeUp className="split-text">
            <div className="section-label">The difference</div>
            <h2 className="section-title">Our Promise</h2>
            <p className="section-sub">Your clothes go straight to our facility and come back perfect.</p>
            <ul className="checklist mt-24">
              {promises.map((item, i) => (
                <li key={i}><Check />{item}</li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <div className="cta-band">
        <h2>Schedule your first pickup</h2>
        <p>Book online or give us a call — we&apos;ll handle the rest.</p>
        <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-white">
          Schedule a Pickup →
        </a>
      </div>
    </main>
  )
}
