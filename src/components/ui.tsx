import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import type { L } from '../i18n/types'
import { parseRich, Rich } from '../lib/rich'
import { revealNow } from '../hooks/useReveal'

/* ---------- Text helpers ---------- */

/** Localized text with *gold* markup support. */
export function T({ text }: { text: L | string }) {
  const { t } = useLang()
  return <Rich text={t(text)} />
}

/** Word-by-word reveal. Words get a small stagger via --d. */
export function WordsReveal({
  text,
  as: Tag = 'h2',
  className = '',
  style,
  immediate = false,
}: {
  text: L | string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span'
  className?: string
  style?: CSSProperties
  immediate?: boolean
}) {
  const { t, lang } = useLang()
  const ref = useRef<HTMLElement>(null)
  const str = t(text)
  const nodes = useMemo(() => {
    let idx = 0
    return parseRich(str).flatMap((seg, si) => {
      const lines = seg.text.split('\n')
      return lines.flatMap((line, li) => {
        const parts = line.split(/(\s+)/)
        const words: ReactNode[] = parts.map((p, pi) => {
          if (!p) return null
          if (/^\s+$/.test(p)) return ' '
          const d = Math.min(idx++ * 35, 700)
          return (
            <span className="word" key={`${si}-${li}-${pi}`}>
              <span className="word-inner" style={{ ['--d' as string]: `${d}ms` }}>
                {p}
              </span>
            </span>
          )
        })
        const content = seg.em ? (
          <em className="g" key={`${si}-${li}`}>
            {words}
          </em>
        ) : (
          <span key={`${si}-${li}`}>{words}</span>
        )
        return li === 0 ? [content] : [<br key={`br-${si}-${li}`} />, content]
      })
    })
  }, [str])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.remove('in-view')
    if (immediate) revealNow(el)
  }, [lang, immediate])

  const C = Tag as 'div'
  return (
    <C ref={ref as never} className={`words-reveal ${className}`.trim()} style={style} key={lang}>
      {nodes}
    </C>
  )
}

/** Line-by-line reveal for hero titles (split on "\n"). */
export function SplitLines({ text, className = '', as: Tag = 'h1' }: { text: L | string; className?: string; as?: 'h1' | 'h2' }) {
  const { t, lang } = useLang()
  const ref = useRef<HTMLElement>(null)
  const lines = t(text).split('\n')
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.remove('in-view')
    revealNow(el)
  }, [lang])
  const C = Tag as 'h1'
  return (
    <C ref={ref as never} className={className} key={lang}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <span className="line-inner" style={{ transitionDelay: `${i * 120}ms` }}>
            <Rich text={line} />
          </span>
        </span>
      ))}
    </C>
  )
}

export function FadeIn({ children, className = '', delay = 0, as: Tag = 'div', style }: { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'p' | 'span' | 'section'; style?: CSSProperties }) {
  const C = Tag as 'div'
  return (
    <C className={`fade-in ${className}`.trim()} style={{ ...style, ['--d' as string]: `${delay}ms` }}>
      {children}
    </C>
  )
}

/* ---------- Layout helpers ---------- */

export function Chapter({ dark = true, className = '', children, id, auto = false, style }: { dark?: boolean; className?: string; children: ReactNode; id?: string; auto?: boolean; style?: CSSProperties }) {
  return (
    <section id={id} className={`chapter ${dark ? 'chapter-dark' : 'chapter-light'} ${auto ? 'auto' : ''} ${className}`.trim()} style={style}>
      {children}
    </section>
  )
}

export function Eyebrow({ text, dark = true, className = '' }: { text: L | string; dark?: boolean; className?: string }) {
  return (
    <div className={`mono eyebrow ${className}`.trim()} style={{ color: dark ? 'var(--white-muted)' : 'var(--black-muted)' }}>
      — <T text={text} />
    </div>
  )
}

export const Arrow = () => (
  <svg className="btn-arrow" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <path d="M1 5h12m0 0l-4-4m4 4l-4 4" />
  </svg>
)

export function Btn({ to, href, gold = false, children, onClick, type, className = '', arrow = true, disabled }: { to?: string; href?: string; gold?: boolean; children: ReactNode; onClick?: () => void; type?: 'submit' | 'button'; className?: string; arrow?: boolean; disabled?: boolean }) {
  const cls = `btn ${gold ? 'btn-gold' : ''} ${className}`.trim()
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {inner}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener">
        {inner}
      </a>
    )
  }
  return (
    <button type={type ?? 'button'} className={cls} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  )
}

/** Scroll hint inside heroes: "DALEJ ↓" */
export function ScrollDown({ label, target }: { label: L | string; target?: string }) {
  const onClick = () => {
    const el = target ? document.querySelector(target) : null
    const y = el ? el.getBoundingClientRect().top + window.scrollY : window.innerHeight
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
  return (
    <button type="button" className="hero-scroll fade-in" onClick={onClick} style={{ ['--d' as string]: '300ms' }}>
      <span>
        <T text={label} />
      </span>
      <span aria-hidden="true">↓</span>
    </button>
  )
}

/* ---------- Placeholder / image ---------- */

export function Ph({ src, alt = '', className = '', style, children }: { src?: string | null; alt?: string; className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className={`ph ${src ? 'has-img' : ''} ${className}`.trim()} style={style}>
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            // YouTube: not every video has maxresdefault — fall back to hqdefault once
            const img = e.currentTarget
            if (img.src.includes('/maxresdefault.jpg')) img.src = img.src.replace('/maxresdefault.jpg', '/hqdefault.jpg')
            else img.parentElement?.classList.remove('has-img')
          }}
        />
      )}
      {children}
    </div>
  )
}

/* ---------- Counter ---------- */

export function Counter({ value, suffix = '', decimals = 0, prefix = '' }: { value: number; suffix?: string; decimals?: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(() => format(value, decimals))
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        obs.disconnect()
        const start = performance.now()
        const duration = 1800
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setDisplay(format(value * eased, decimals))
          if (p < 1) raf = requestAnimationFrame(tick)
          else setDisplay(format(value, decimals))
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value, decimals])
  return (
    <span ref={ref} className="tnum">
      {prefix}
      {display}
      {suffix && <small>{suffix}</small>}
    </span>
  )
}

function format(v: number, decimals: number) {
  return v.toLocaleString('pl-PL', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}

/* ---------- Process ---------- */

export function ProcessStrip({ steps }: { steps: string[] }) {
  return (
    <div className="process-strip fade-in">
      {steps.map((s, i) => (
        <span key={i}>
          {s}
          {i < steps.length - 1 && <i> → </i>}
        </span>
      ))}
    </div>
  )
}

/* ---------- Page head ---------- */

export function useDocumentTitle(title: L | string, description?: L | string) {
  const { t } = useLang()
  useEffect(() => {
    const full = `${t(title)} — Star Media`
    document.title = full
    const desc = description ? t(description) : ''
    const meta = document.querySelector('meta[name="description"]')
    if (meta && desc) meta.setAttribute('content', desc)
    const og = document.querySelector('meta[property="og:title"]')
    if (og) og.setAttribute('content', full)
  }, [t, title, description])
}
