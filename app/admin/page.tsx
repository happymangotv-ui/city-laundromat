'use client'

import { useState, useEffect, useCallback } from 'react'

// ── Config ────────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'citylaundry2025'
const GH_OWNER      = 'happymangotv-ui'
const GH_REPO       = 'city-laundromat'
const GH_PATH       = 'lib/content.json'
const GH_BRANCH     = 'main'

// ── Types ─────────────────────────────────────────────────────────────────────
type Content = {
  pricing: { washFold: string; rush: string; washer: string; dryer5min: string }
  hours:   { display: string; open: string; close: string }
  contact: { phone: string; email: string; addr: string }
  booking: string
}

const DEFAULT: Content = {
  pricing: { washFold: '1.25', rush: '1.45', washer: '2.69', dryer5min: '0.25' },
  hours:   { display: 'Mon–Sun: 7am – 8pm', open: '7am', close: '8pm' },
  contact: { phone: '(917) 825-9176', email: 'Classicbrook13@gmail.com', addr: '391 Brook Ave, Bronx NY 10454' },
  booking: 'https://app.trycents.com/new-order/YjUw/home',
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function deepSet(obj: Content, path: string[], val: string): Content {
  const next = JSON.parse(JSON.stringify(obj)) as Content
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cur: any = next
  for (let i = 0; i < path.length - 1; i++) cur = cur[path[i]]
  cur[path[path.length - 1]] = val
  return next
}

function toBase64(str: string) {
  return btoa(unescape(encodeURIComponent(str)))
}

// ── Sub-components ────────────────────────────────────────────────────────────
function InputField({
  label, value, onChange, prefix, suffix, type = 'text', placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void
  prefix?: string; suffix?: string; type?: string; placeholder?: string
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label ? (
        <label style={{
          fontSize: 11, fontWeight: 700, color: 'var(--ash)',
          letterSpacing: '0.5px', textTransform: 'uppercase',
        }}>
          {label}
        </label>
      ) : null}
      <div style={{
        display: 'flex', alignItems: 'center',
        border: `1.5px solid ${focused ? 'var(--teal)' : 'var(--hairline)'}`,
        borderRadius: 10, background: 'var(--white)', transition: 'border-color 0.15s',
      }}>
        {prefix && (
          <span style={{ padding: '10px 4px 10px 14px', fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1, padding: prefix ? '10px 4px' : '10px 14px',
            paddingRight: suffix ? 4 : 14,
            border: 'none', outline: 'none', fontSize: 15,
            fontFamily: 'inherit', color: 'var(--ink)', background: 'transparent',
          }}
        />
        {suffix && (
          <span style={{ padding: '10px 14px 10px 4px', fontSize: 13, color: 'var(--ash)', fontWeight: 500 }}>
            {suffix}
          </span>
        )}
      </div>
    </div>
  )
}

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--white)', border: '1px solid var(--hairline)',
      borderRadius: 16, padding: '28px 24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.2px' }}>
          {title}
        </h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {children}
      </div>
    </div>
  )
}

function PriceTile({ label, value, onChange, unit }: {
  label: string; value: string; onChange: (v: string) => void; unit: string
}) {
  return (
    <div style={{ background: 'var(--cloud)', border: '1px solid var(--hairline)', borderRadius: 12, padding: 16 }}>
      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--charcoal)', marginBottom: 10 }}>{label}</div>
      <InputField label="" value={value} onChange={onChange} prefix="$" suffix={unit} />
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed]                   = useState(false)
  const [password, setPassword]               = useState('')
  const [pwError, setPwError]                 = useState(false)
  const [token, setToken]                     = useState('')
  const [tokenInput, setTokenInput]           = useState('')
  const [showTokenModal, setShowTokenModal]   = useState(false)
  const [content, setContent]                 = useState<Content>(DEFAULT)
  const [sha, setSha]                         = useState('')
  const [status, setStatus]                   = useState<'idle' | 'loading' | 'saving' | 'saved' | 'error'>('idle')
  const [errMsg, setErrMsg]                   = useState('')

  useEffect(() => {
    const tok  = localStorage.getItem('cl_admin_token') || ''
    const auth = sessionStorage.getItem('cl_admin_auth') === '1'
    if (tok)  setToken(tok)
    if (auth) setAuthed(true)
  }, [])

  const loadContent = useCallback(async (tok: string) => {
    setStatus('loading')
    try {
      const res = await fetch(
        `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_PATH}`,
        { headers: { Authorization: `token ${tok}`, Accept: 'application/vnd.github+json' } }
      )
      if (!res.ok) throw new Error()
      const data = await res.json()
      setSha(data.sha)
      setContent(JSON.parse(atob(data.content.replace(/\n/g, ''))))
      setStatus('idle')
    } catch {
      setStatus('error')
      setErrMsg('Could not load content. Check your GitHub token.')
    }
  }, [])

  useEffect(() => {
    if (authed && token) loadContent(token)
  }, [authed, token, loadContent])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('cl_admin_auth', '1')
      setAuthed(true)
      if (!token) setShowTokenModal(true)
    } else {
      setPwError(true)
      setTimeout(() => setPwError(false), 600)
    }
  }

  const handleSaveToken = () => {
    const t = tokenInput.trim()
    if (!t) return
    localStorage.setItem('cl_admin_token', t)
    setToken(t)
    setShowTokenModal(false)
    loadContent(t)
  }

  const handleSave = async () => {
    if (!token) { setShowTokenModal(true); return }
    setStatus('saving')
    try {
      const encoded = toBase64(JSON.stringify(content, null, 2))
      const res = await fetch(
        `https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${GH_PATH}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `token ${token}`,
            Accept: 'application/vnd.github+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: 'Update site content via admin',
            content: encoded,
            sha,
            branch: GH_BRANCH,
          }),
        }
      )
      if (!res.ok) throw new Error()
      const data = await res.json()
      setSha(data.content.sha)
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 7000)
    } catch {
      setStatus('error')
      setErrMsg('Save failed. Make sure your GitHub token has Contents write permission.')
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  const update = (...path: string[]) => (val: string) =>
    setContent(prev => deepSet(prev, path, val))

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(140deg, var(--blue-hero-start) 0%, var(--blue-hero-end) 100%)',
        padding: 24, fontFamily: 'var(--font-inter)',
      }}>
        <style>{`
          @keyframes shake {
            0%, 100% { transform: translateX(0) }
            20%, 60%  { transform: translateX(-8px) }
            40%, 80%  { transform: translateX(8px) }
          }
        `}</style>
        <form
          onSubmit={handleLogin}
          style={{
            background: 'var(--white)', borderRadius: 20,
            padding: '40px 36px', width: '100%', maxWidth: 400,
            boxShadow: 'var(--shadow-panel)',
            animation: pwError ? 'shake 0.45s ease' : 'none',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--ink)' }}>
              The City <em style={{ fontStyle: 'normal', color: 'var(--teal)' }}>Laundry</em>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ash)', letterSpacing: '0.6px', marginTop: 6 }}>
              ADMIN DASHBOARD
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InputField
              label="Password"
              value={password}
              onChange={setPassword}
              type="password"
              placeholder="Enter admin password"
            />
            {pwError && (
              <p style={{ margin: 0, fontSize: 13, color: '#c0392b', textAlign: 'center' }}>
                Incorrect password. Try again.
              </p>
            )}
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
            >
              Sign In →
            </button>
          </div>
        </form>
      </div>
    )
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--cloud)', fontFamily: 'var(--font-inter)' }}>

      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 200,
        background: 'var(--white)', borderBottom: '1px solid var(--hairline)',
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 5%',
      }}>
        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--ink)' }}>
          The City <em style={{ fontStyle: 'normal', color: 'var(--teal)' }}>Laundry</em>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ash)', letterSpacing: '0.6px', marginLeft: 10 }}>
            ADMIN
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={() => setShowTokenModal(true)}
            style={{
              background: 'none', border: '1px solid var(--hairline)', borderRadius: 20,
              padding: '7px 16px', fontSize: 13, fontWeight: 600, color: 'var(--ash)', cursor: 'pointer',
            }}
          >
            GitHub Token
          </button>
          <button
            onClick={() => { sessionStorage.removeItem('cl_admin_auth'); setAuthed(false) }}
            style={{ background: 'none', border: 'none', fontSize: 13, fontWeight: 600, color: 'var(--ash)', cursor: 'pointer' }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Page heading */}
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 5% 0' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.3px' }}>
          Site Content
        </h1>
        <p style={{ margin: '0 0 32px', fontSize: 14, color: 'var(--ash)' }}>
          Edit your prices, hours, and contact info below. Click <strong>Save &amp; Deploy</strong> when done.
        </p>

        {status === 'loading' ? (
          <p style={{ textAlign: 'center', color: 'var(--ash)', padding: '64px 0' }}>Loading content…</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 80 }}>

            {/* Pricing */}
            <SectionCard title="Pricing" icon="💰">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <PriceTile
                  label="Wash & Fold"
                  value={content.pricing.washFold}
                  onChange={update('pricing', 'washFold')}
                  unit="/lb"
                />
                <PriceTile
                  label="Rush Service"
                  value={content.pricing.rush}
                  onChange={update('pricing', 'rush')}
                  unit="/lb"
                />
                <PriceTile
                  label="Self-Serve Washer"
                  value={content.pricing.washer}
                  onChange={update('pricing', 'washer')}
                  unit="/load"
                />
                <PriceTile
                  label="Self-Serve Dryer"
                  value={content.pricing.dryer5min}
                  onChange={update('pricing', 'dryer5min')}
                  unit="/5 min"
                />
              </div>
            </SectionCard>

            {/* Hours */}
            <SectionCard title="Hours" icon="🕐">
              <InputField
                label="Display Text"
                value={content.hours.display}
                onChange={update('hours', 'display')}
                placeholder="Mon–Sun: 7am – 8pm"
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <InputField
                  label="Opens"
                  value={content.hours.open}
                  onChange={update('hours', 'open')}
                  placeholder="7am"
                />
                <InputField
                  label="Closes"
                  value={content.hours.close}
                  onChange={update('hours', 'close')}
                  placeholder="8pm"
                />
              </div>
            </SectionCard>

            {/* Contact */}
            <SectionCard title="Contact Info" icon="📞">
              <InputField
                label="Phone Number"
                value={content.contact.phone}
                onChange={update('contact', 'phone')}
                type="tel"
                placeholder="(917) 000-0000"
              />
              <InputField
                label="Email Address"
                value={content.contact.email}
                onChange={update('contact', 'email')}
                type="email"
                placeholder="email@example.com"
              />
              <InputField
                label="Physical Address"
                value={content.contact.addr}
                onChange={update('contact', 'addr')}
                placeholder="123 Main St, City NY 10000"
              />
            </SectionCard>

            {/* Booking link */}
            <SectionCard title="Booking Link" icon="🔗">
              <InputField
                label="URL"
                value={content.booking}
                onChange={update('booking')}
                type="url"
                placeholder="https://..."
              />
            </SectionCard>

            {/* Save */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, paddingTop: 8 }}>
              <button
                onClick={handleSave}
                disabled={status === 'saving'}
                className="btn-primary"
                style={{
                  padding: '14px 48px', fontSize: 16,
                  opacity: status === 'saving' ? 0.7 : 1,
                  cursor: status === 'saving' ? 'not-allowed' : 'pointer',
                }}
              >
                {status === 'saving' ? 'Saving…' : '✓  Save & Deploy'}
              </button>
              {status === 'saved' && (
                <p style={{ margin: 0, fontSize: 14, color: 'var(--teal)', fontWeight: 600, textAlign: 'center' }}>
                  Changes saved! Your site will update in about 2 minutes.
                </p>
              )}
              {status === 'error' && (
                <p style={{ margin: 0, fontSize: 14, color: '#c0392b', fontWeight: 500, textAlign: 'center' }}>
                  {errMsg}
                </p>
              )}
              <p style={{ margin: 0, fontSize: 13, color: 'var(--ash)', textAlign: 'center' }}>
                Saves to GitHub and triggers an automatic Cloudflare deployment.
              </p>
            </div>

          </div>
        )}
      </div>

      {/* GitHub Token Modal */}
      {showTokenModal && (
        <div
          onClick={() => setShowTokenModal(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
            zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--white)', borderRadius: 20,
              padding: '32px 28px', maxWidth: 440, width: '100%',
              boxShadow: 'var(--shadow-panel)',
            }}
          >
            <h3 style={{ margin: '0 0 8px', fontSize: 17, fontWeight: 700, color: 'var(--ink)' }}>
              GitHub Access Token
            </h3>
            <p style={{ margin: '0 0 8px', fontSize: 14, color: 'var(--ash)', lineHeight: 1.6 }}>
              Enter a GitHub Personal Access Token with <strong>Contents: Read &amp; Write</strong> permission.
            </p>
            <p style={{ margin: '0 0 24px', fontSize: 13, color: 'var(--mute)', lineHeight: 1.5 }}>
              This is stored only in your browser and never sent anywhere except GitHub.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <InputField
                label="Personal Access Token"
                value={tokenInput}
                onChange={setTokenInput}
                type="password"
                placeholder="ghp_..."
              />
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={handleSaveToken}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Save Token
                </button>
                <button
                  onClick={() => setShowTokenModal(false)}
                  className="btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
