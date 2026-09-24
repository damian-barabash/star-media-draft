import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LangContext'
import type { L } from '../i18n/types'
import { Btn, Chapter, Counter, Eyebrow, FadeIn, T, WordsReveal } from './ui'
import { PP } from '../content/polskaPress'
import { UI } from '../content/common'

/* ---------- Services list rows ---------- */

export type ServiceRowItem = { num: string; title: L | string; desc: L | string; to?: string }

export function ServicesList({ items }: { items: ServiceRowItem[] }) {
  const { t } = useLang()
  return (
    <div className="services-list">
      {items.map((s) => {
        const inner = (
          <>
            <span className="service-num">{s.num}</span>
            <span className="service-title">{t(s.title)}</span>
            <span className="service-desc">{t(s.desc)}</span>
            <svg className="service-arrow" viewBox="0 0 14 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M1 5h12m0 0l-4-4m4 4l-4 4" />
            </svg>
          </>
        )
        return s.to ? (
          <Link key={s.num} to={s.to} className="service-row">
            {inner}
          </Link>
        ) : (
          <div key={s.num} className="service-row">
            {inner}
          </div>
        )
      })}
    </div>
  )
}

/* ---------- Process steps (4 steps) ---------- */

export type Step = { num: string; title: L | string; sub?: string; desc: L | string }

export function ProcessChapter({ dark, eyebrow, title, lead, steps }: { dark: boolean; eyebrow: L | string; title: L | string; lead?: L | string; steps: Step[] }) {
  return (
    <Chapter dark={dark} className="process-chapter">
      <div className="process-inner">
        <div className="process-left">
          <Eyebrow text={eyebrow} dark={dark} />
          <WordsReveal text={title} />
          {lead && (
            <p className="lead fade-in" style={{ marginTop: '2rem' }}>
              <T text={lead} />
            </p>
          )}
        </div>
        <div className="process-steps">
          {steps.map((s, i) => (
            <FadeIn key={s.num} className="process-step" delay={i * 90}>
              <div className="process-step-num">{s.num}</div>
              <div>
                <div className="process-step-title">
                  <T text={s.title} />
                </div>
                {s.sub && <div className="process-step-sub">{s.sub}</div>}
                <div className="process-step-desc">
                  <T text={s.desc} />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Chapter>
  )
}

/* ---------- Polska Press numbers ---------- */

export function PPStats({ dark = false, withSource = true, compact = false }: { dark?: boolean; withSource?: boolean; compact?: boolean }) {
  const { t } = useLang()
  return (
    <div>
      <div className="pp-stats" style={compact ? undefined : { gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {PP.stats.map((s) => (
          <div className="pp-stat" key={s.label.pl}>
            <div className="pp-stat-num">
              <Counter value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix ? t(s.suffix) : ''} />
            </div>
            <div className="pp-stat-label">{t(s.label)}</div>
          </div>
        ))}
      </div>
      {withSource && <p className={`pp-source ${dark ? '' : ''}`}>{t(PP.source)}</p>}
    </div>
  )
}

export function PPLockup({ big = false }: { big?: boolean }) {
  return (
    <div className="pp-lock" style={big ? { justifyContent: 'center', marginBottom: '3rem' } : undefined}>
      <span className="pp-brand">
        <img src="/logo/logo-black.png" alt="" className="logo-light-bg" style={big ? { width: 64, height: 64 } : undefined} loading="lazy" />
        <img src="/logo/logo.png" alt="" className="logo-dark-bg" style={big ? { width: 64, height: 64 } : undefined} loading="lazy" />
        star media
      </span>
      <span className="x" style={big ? { fontSize: '3.5rem' } : undefined}>
        ×
      </span>
      <div className="pp-mark" style={big ? { padding: '1.2rem 2rem' } : undefined}>
        <span className="pp-mark-top" style={big ? { fontSize: '1.5rem' } : undefined}>
          POLSKA
        </span>
        <span className="pp-mark-bot">PRESS GRUPA</span>
      </div>
    </div>
  )
}

export function PPChapter({ dark = false }: { dark?: boolean }) {
  return (
    <Chapter dark={dark} id="polska-press">
      <div className="chapter-inner pp-chapter-inner">
        <div>
          <Eyebrow text={PP.eyebrow} dark={dark} />
          <PPLockup />
          <WordsReveal text={PP.title} className="pp-title" />
          <p style={{ marginBottom: '1.25rem', maxWidth: '48ch' }}>
            <T text={PP.text1} />
          </p>
          <p style={{ marginBottom: '2rem', maxWidth: '48ch' }}>
            <T text={PP.text2} />
          </p>
          <Btn to="/influencer-marketing">
            <T text={UI.learnMore} />
          </Btn>
        </div>
        <PPStats dark={dark} />
      </div>
    </Chapter>
  )
}

/* ---------- CTA chapter ---------- */

export function CTAChapter({ dark = true, eyebrow, title, lead, button, to = '/kontakt#formularz', secondary }: { dark?: boolean; eyebrow: L | string; title: L | string; lead?: L | string; button: L | string; to?: string; secondary?: { label: L | string; to: string } }) {
  return (
    <Chapter dark={dark} className="cta-chapter">
      <div className="cta-inner">
        <Eyebrow text={eyebrow} dark={dark} className="" />
        <WordsReveal text={title} className="cta-title" />
        {lead && (
          <p className="cta-lead lead fade-in">
            <T text={lead} />
          </p>
        )}
        <div className="cta-actions fade-in">
          <Btn to={to} gold>
            <T text={button} />
          </Btn>
          {secondary && (
            <Btn to={secondary.to}>
              <T text={secondary.label} />
            </Btn>
          )}
        </div>
      </div>
    </Chapter>
  )
}
