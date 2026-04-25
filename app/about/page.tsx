import { BOOKING, PHONE, IMGS } from '@/lib/constants'
import FadeUp from '@/components/FadeUp'
import InfoStrip from '@/components/InfoStrip'

const stats = [
  { val: '7am–8pm', lbl: 'Open daily' },
  { val: '24–48 hrs', lbl: 'Avg. turnaround' },
  { val: '$1.25/lb', lbl: 'Wash & Fold' },
]

export default function AboutPage() {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero">
        <FadeUp className="hero-text">
          <div className="hero-eyebrow">About Us</div>
          <h1>
            A neighborhood<br />
            <em>laundromat done right</em>
          </h1>
          <p className="hero-desc">
            We&apos;re a family-run laundromat at 391 Brook Ave in the Bronx. For years we&apos;ve
            been keeping Manhattan and Bronx residents&apos; clothes clean — the right way.
          </p>
          <div className="hero-actions">
            <a href={`tel:${PHONE}`} className="btn-primary">Call Us</a>
            <a
              href="https://share.google/7YwmX9s8jld6DnYaD"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Get Directions
            </a>
          </div>
        </FadeUp>

      </section>

      <div className="divider" />

      {/* ── STORY SPLIT ── */}
      <section className="section section-white">
        <div className="split">
          <FadeUp className="split-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMGS.machines} alt="Our facility" />
          </FadeUp>
          <FadeUp className="split-text">
            <div className="section-label">Our story</div>
            <h2 className="section-title">Local, trusted, and hands-on</h2>
            <p className="section-sub">
              The City Laundry started with a simple idea: give the neighborhood a laundromat that
              actually cares. No shortcuts on the wash. No mystery fees. Just clean clothes and
              good service.
            </p>
            <p style={{ fontSize: '16px', fontWeight: 500, color: 'var(--ash)', lineHeight: 1.65, marginTop: '16px' }}>
              We&apos;ve grown to serve customers across Manhattan and the Bronx — with walk-in service,
              drop-off, wash &amp; fold, and free pickup &amp; delivery for Manhattan residents.
            </p>
            <div className="stats-row">
              {stats.map(({ val, lbl }) => (
                <div className="stat-item" key={lbl}>
                  <div className="stat-num">{val}</div>
                  <div className="stat-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="divider" />

      {/* ── VISIT US ── */}
      <section className="section section-cloud">
        <FadeUp>
          <div className="section-header center">
            <div className="section-label">Visit us</div>
            <h2 className="section-title">Come see us in the Bronx</h2>
          </div>
        </FadeUp>
        <InfoStrip />
      </section>

      {/* ── CTA BAND ── */}
      <div className="cta-band">
        <h2>We&apos;re here when you need us</h2>
        <p>
          Walk in any day of the week, drop off your laundry, or schedule a free pickup from
          your Manhattan home.
        </p>
        <a href={BOOKING} target="_blank" rel="noopener noreferrer" className="btn-white">
          Schedule a Pickup →
        </a>
      </div>
    </main>
  )
}
