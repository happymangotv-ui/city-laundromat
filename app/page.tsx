import Link from 'next/link'
import { BOOKING, PHONE, IMGS } from '@/lib/constants'
import FadeUp from '@/components/FadeUp'
import InfoStrip from '@/components/InfoStrip'

const services = [
  {
    img: 'https://i.ibb.co/Kc2mBxMX/basket-with-clothes-2026-01-09-08-14-53-utc.jpg',
    title: 'Pickup & Delivery',
    sub: 'Free pickup · Manhattan',
    desc: 'Schedule online, we pick up and deliver within 48 hours.',
    href: '/pickup',
  },
  {
    img: IMGS.selfServe,
    title: 'Self-Serve',
    sub: 'Open 7am – 8pm',
    desc: 'Modern high-efficiency machines at 391 Brook Ave, Bronx.',
    href: '/selfserve',
  },
  {
    img: IMGS.towels,
    title: 'Commercial',
    sub: 'Custom volume pricing',
    desc: 'Flexible laundry for restaurants, salons, hotels, and gyms.',
    href: '/commercial',
  },
]

const howItWorks = [
  { n: '1', t: 'Schedule or drop off',     d: "Book online in minutes or walk in anytime. We're open 7 days a week." },
  { n: '2', t: 'We handle everything',     d: 'Your clothes are sorted, washed with care, and dried to perfection by our team.' },
  { n: '3', t: 'Pick up or receive delivery', d: 'Collect at your convenience or have it delivered back to your door, fresh and folded.' },
]

export default function HomePage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <FadeUp className="hero-text">
          <div className="hero-eyebrow">✦ MANHATTAN PICKUP &amp; DELIVERY</div>
          <h1>
            Professional Laundry Care,<br />
            <em>Done Right</em>
          </h1>
          <p className="hero-desc" style={{ fontSize: 'clamp(16px, 3.5vw, 24px)' }}>
            Drop off or schedule a pickup. We wash, dry, and fold your clothes so you don&apos;t have to.
          </p>
          <div className="hero-actions">
            <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Schedule a Pickup →
            </a>
            <a href={`tel:${PHONE}`} className="btn-secondary">Call Us</a>
          </div>
          <p className="hero-meta">
            Starting at <strong>$1.25/lb</strong> — Wash &amp; Fold
          </p>
        </FadeUp>

        <FadeUp className="hero-img-col">
          <div className="hero-img-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMGS.hero} alt="Fresh folded laundry" />
          </div>
        </FadeUp>
      </section>

      {/* ── INFO STRIP ── */}
      <section className="section-sm section-white">
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <InfoStrip />
        </div>
      </section>

      <div className="divider" />

      {/* ── SERVICES GRID ── */}
      <section className="section section-white">
        <FadeUp>
          <div className="section-header center">
            <div className="section-label">What We Offer</div>
            <h2 className="section-title">Every laundry service you need</h2>
            <p className="section-sub">
              Drop-off, wash &amp; fold, self-serve, and free pickup &amp; delivery — all in one place!
            </p>
          </div>
        </FadeUp>
        <div className="cards-grid cards-grid-3" style={{ maxWidth: '1520px', margin: '0 auto' }}>
          {services.map((s, i) => (
            <FadeUp key={i}>
              <Link href={s.href} className="lcard">
                <div className="lcard-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt={s.title} />
                </div>
                <div className="lcard-title">{s.title}</div>
                <div className="lcard-sub">{s.sub}</div>
                <div className="lcard-sub" style={{ color: '#222222', marginTop: '2px' }}>{s.desc}</div>
                <div className="lcard-link mt-8">Learn more →</div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── HOW IT WORKS ── */}
      <section className="section section-cloud">
        <FadeUp>
          <div className="section-header center">
            <div className="section-label">Simple Process</div>
            <h2 className="section-title">How it works</h2>
            <p className="section-sub">Three steps to fresh, clean laundry.</p>
          </div>
        </FadeUp>
        <div className="steps">
          {howItWorks.map((s, i) => (
            <FadeUp key={i} className="step">
              <div className="step-num">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── PHOTO BAND ── */}
      <div className="photo-section">
        <div className="photo-section-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMGS.washFold} alt="Wash and Fold" />
        </div>
        <div className="photo-section-text">
          <div className="section-label">Free Pickup &amp; Delivery</div>
          <h2 className="section-title">Skip the trip to the laundromat</h2>
          <p>
            We serve Upper East Side, Upper West Side, and Midtown Manhattan. Schedule a pickup
            and have everything back at your door in 48 hours.
          </p>
          <a
            href={BOOKING}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white"
            style={{ alignSelf: 'flex-start', backgroundColor: 'rgb(31,92,82)', color: 'rgb(255,255,255)' }}
          >
            Schedule a Pickup →
          </a>
        </div>
      </div>
    </main>
  )
}
