import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import { LANGS } from '../i18n/types'
import { NAV, SITE, UI } from '../content/common'
import { SERVICES } from '../content/services'
import { T } from './ui'
import { useRevealOnScroll } from '../hooks/useReveal'
import { usePlaceholderParallax } from '../hooks/usePlaceholderParallax'

const LOGO = '/logo/logo.png'

function Mark({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" className="nav-mark" onClick={onClick} aria-label="Star Media — home">
      <span className="nav-mark-logo">
        <img src={LOGO} alt="" width="32" height="32" />
      </span>
      <span>Star Media</span>
    </Link>
  )
}

function Nav({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="nav-bar">
      <Mark />
      <button className="nav-menu-btn" onClick={onOpen} aria-label="Open menu" aria-haspopup="dialog">
        <span>
          <T text={UI.menu} />
        </span>
        <span className="nav-menu-btn-lines">
          <span />
          <span />
        </span>
      </button>
    </div>
  )
}

function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useLang()
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <div className={`menu-overlay ${open ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!open}>
      <div className="menu-overlay-inner">
        <div className="menu-header">
          <Mark onClick={onClose} />
          <button className="menu-close" onClick={onClose} aria-label="Close menu">
            <span>
              <T text={UI.close} />
            </span>
            <span className="menu-close-x" />
          </button>
        </div>

        <div className="menu-body">
          <nav className="menu-links">
            {NAV.map((item, i) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `menu-link ${isActive ? 'active' : ''}`} style={{ ['--i' as string]: i }} onClick={onClose} end={item.to === '/'}>
                <span className="menu-link-num">{item.num}</span>
                <span className="ml-text">
                  <span className="ml-normal">{t(item.label)}</span>
                  <span className="ml-italic" aria-hidden="true">
                    {t(item.label)}
                  </span>
                </span>
              </NavLink>
            ))}
          </nav>

          <aside className="menu-aside">
            <div className="menu-aside-block">
              <span className="mono">
                <T text={UI.contact} />
              </span>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
            <div className="menu-aside-block">
              <span className="mono">
                <T text={UI.location} />
              </span>
              <p>{t(SITE.city)}</p>
            </div>
            <div className="menu-aside-block">
              <span className="mono">
                <T text={UI.social} />
              </span>
              <a href={SITE.instagramUrl} target="_blank" rel="noopener">
                {SITE.instagram}
              </a>
            </div>
            <div className="menu-aside-block">
              <span className="mono">
                <T text={UI.partner} />
              </span>
              <p>{t(SITE.partner)}</p>
            </div>
          </aside>
        </div>

        <div className="menu-footer mono">
          <span>{UI.copyright}</span>
          <span>{t(SITE.tagline)}</span>
        </div>
      </div>
    </div>
  )
}

function Ticker() {
  const { lang, setLang, t } = useLang()
  const [time, setTime] = useState('')
  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString('pl-PL', { timeZone: 'Europe/Warsaw', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    setTime(fmt())
    const id = window.setInterval(() => setTime(fmt()), 1000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div className="ticker">
      <span className="ticker-time">{time || '00:00:00'}</span>
      <span className="ticker-city">{t(SITE.cityShort)} · CET</span>
      <span className="ticker-lang" role="group" aria-label="Language">
        {LANGS.map((code, i) => (
          <span key={code} style={{ display: 'contents' }}>
            {i > 0 && <span aria-hidden="true">/</span>}
            <button className={lang === code ? 'active' : ''} onClick={() => setLang(code)} aria-pressed={lang === code}>
              {code.toUpperCase()}
            </button>
          </span>
        ))}
      </span>
    </div>
  )
}

function ScrollHint() {
  const [hidden, setHidden] = useState(false)
  useEffect(() => {
    const onScroll = () => setHidden(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className={`scroll-hint ${hidden ? 'hidden' : ''}`} aria-hidden="true">
      <span>
        <T text={UI.scroll} />
      </span>
    </div>
  )
}

function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={LOGO} alt="Star Media" width="60" height="60" loading="lazy" />
            <div className="mono" style={{ letterSpacing: '0.18em', fontWeight: 600, color: 'var(--white)', fontSize: '0.85rem' }}>
              Star Media
            </div>
            <p>{t(UI.footerBlurb)}</p>
          </div>
          <div className="footer-col">
            <h4>
              <T text={UI.navigation} />
            </h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to}>{t(n.label)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>
              <T text={UI.services} />
            </h4>
            <ul>
              {SERVICES.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link to={`/uslugi/${s.slug}`}>{t(s.title)}</Link>
                </li>
              ))}
              <li>
                <Link to="/uslugi">
                  <T text={UI.allServices} /> →
                </Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>
              <T text={UI.contact} />
            </h4>
            <ul>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a href={SITE.instagramUrl} target="_blank" rel="noopener">
                  Instagram
                </a>
              </li>
              <li>{t(SITE.city)}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bot">
          <span>{UI.copyright}</span>
          <span>{t(SITE.partner)}</span>
        </div>
      </div>
    </footer>
  )
}

function StarCursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches || window.innerWidth < 900) return
    const cursor = ref.current
    if (!cursor) return
    let mx = -100, my = -100, cx = -100, cy = -100, raf = 0
    const HOVER = 'a, button, .menu-link, .service-row, .carousel-card, .case-card, [data-cursor-hover]'
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      cursor.classList.add('visible')
    }
    const onLeave = () => cursor.classList.remove('visible')
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest?.(HOVER)) cursor.classList.add('hover')
    }
    const onOut = (e: MouseEvent) => {
      const t = e.target as Element
      const r = e.relatedTarget as Element | null
      if (t.closest?.(HOVER) && !r?.closest?.(HOVER)) cursor.classList.remove('hover')
    }
    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    const tick = () => {
      cx += (mx - cx) * 0.18
      cy += (my - cy) * 0.18
      cursor.style.transform = `translate3d(${cx - 16}px, ${cy - 16}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])
  return (
    <div ref={ref} className="star-cursor" aria-hidden="true">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    </div>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()
  const { lang } = useLang()

  useRevealOnScroll([lang])
  usePlaceholderParallax()

  // Scroll to top on route change (or to the hash target if present)
  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        window.setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60)
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return (
    <>
      <Nav onOpen={() => setMenuOpen(true)} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <Ticker />
      <ScrollHint />
      <main className="page" key={pathname}>
        {children}
      </main>
      <Footer />
      <StarCursor />
    </>
  )
}
