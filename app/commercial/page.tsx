import { PHONE, EMAIL, IMGS } from '@/lib/constants'
import FadeUp from '@/components/FadeUp'
import Check from '@/components/Check'

const industries = [
  { img: IMGS.restaurant, title: 'Restaurants & Cafés',  sub: 'Table linens, towels, aprons',   desc: 'Washed to health-code standards and returned on your schedule.',   subject: 'Commercial Laundry Inquiry – Restaurants & Cafés' },
  { img: IMGS.hotel,      title: 'Hotels & Airbnb',      sub: 'Bed linens, duvet covers',       desc: 'Consistent turnaround for short-term rentals and boutique hotels.', subject: 'Commercial Laundry Inquiry – Hotels & Airbnb' },
  { img: IMGS.salon,      title: 'Salons & Spas',        sub: 'Towels, robes, uniforms',        desc: 'Handled with care so you never run short on inventory.',            subject: 'Commercial Laundry Inquiry – Salons & Spas' },
  { img: IMGS.gym,        title: 'Gyms & Fitness',       sub: 'Towels at scale',                desc: 'Reliable pickup and delivery to keep your facility running.',       subject: 'Commercial Laundry Inquiry – Gyms & Fitness' },
]

const whyUs = [
  'Flexible pickup and delivery scheduling',
  'Custom detergent and care preferences',
  'Volume pricing for regular accounts',
  'Fast turnaround — keeps your operation running',
]

export default function CommercialPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <FadeUp className="hero-text">
          <div className="hero-eyebrow">Commercial</div>
          <h1>
            Commercial laundry<br />
            <em>built for business</em>
          </h1>
          <p className="hero-desc">
            Reliable, high-volume laundry for restaurants, salons, gyms, spas, and Airbnb operators.
            Flexible scheduling, consistent quality.
          </p>
          <div className="hero-actions">
            <a href={`tel:${PHONE}`} className="btn-primary">Call for a Quote</a>
            <a href={`mailto:${EMAIL}?subject=Commercial%20Laundry%20Inquiry`} className="btn-secondary">Email Us</a>
          </div>
        </FadeUp>

        <FadeUp className="hero-img-col">
          <div className="hero-img-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMGS.towels} alt="Commercial laundry service" />
          </div>
        </FadeUp>
      </section>

      <div className="divider" />

      {/* ── INDUSTRIES ── */}
      <section className="section section-white">
        <FadeUp>
          <div className="section-header">
            <div className="section-label">Who we serve</div>
            <h2 className="section-title">Services for every industry</h2>
          </div>
        </FadeUp>
        <div className="cards-grid" style={{ gridTemplateColumns: 'repeat(2,1fr)' }}>
          {industries.map((s, i) => (
            <FadeUp key={i}>
              <a
                className="lcard"
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(s.subject)}`}
                style={{ display: 'block', cursor: 'pointer' }}
              >
                <div className="lcard-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt={s.title} />
                </div>
                <div className="lcard-title">{s.title}</div>
                <div className="lcard-sub">{s.sub}</div>
                <div className="lcard-sub" style={{ color: '#3f3f3f', marginTop: '2px' }}>{s.desc}</div>
              </a>
            </FadeUp>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── WHY PARTNER SPLIT ── */}
      <section className="section section-cloud">
        <div className="split">
          <FadeUp className="split-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMGS.fold} alt="Folded commercial linens" />
          </FadeUp>
          <FadeUp className="split-text">
            <div className="section-label">Why partner with us</div>
            <h2 className="section-title">Reliable, consistent, local</h2>
            <p className="section-sub">
              We&apos;ve served local businesses for years. When you partner with us you get a dedicated
              team that understands your operation.
            </p>
            <ul className="checklist mt-24">
              {whyUs.map((item, i) => (
                <li key={i}><Check />{item}</li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <div className="cta-band">
        <h2>Ready to partner with us?</h2>
        <p>Reach out by phone or email — we&apos;ll get you set up quickly.</p>
        <a href={`tel:${PHONE}`} className="btn-white" style={{ display: 'inline-block' }}>
          Call Us →
        </a>
      </div>
    </main>
  )
}
