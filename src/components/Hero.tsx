import type { ReactNode } from 'react'
import type { L } from '../i18n/types'
import { Hero3D } from './Hero3D'
import { ScrollDown, SplitLines, T } from './ui'
import { useLang } from '../i18n/LangContext'

export function Hero({
  eyebrow,
  meta,
  title,
  titleSize = 'big',
  tagline,
  tagline2,
  scrollLabel,
  scrollTarget,
  compact = true,
  extra,
}: {
  eyebrow: L | string
  meta?: (L | string)[]
  title: L | string
  titleSize?: 'big' | 'small'
  tagline?: L | string
  tagline2?: L | string
  scrollLabel: L | string
  scrollTarget?: string
  compact?: boolean
  extra?: ReactNode
}) {
  const { t } = useLang()
  return (
    <section className="chapter chapter-dark hero-chapter">
      <Hero3D compact={compact} />
      <div className="chapter-inner">
        <div className="hero-top">
          <div className="hero-eyebrow">
            <T text={eyebrow} />
          </div>
          {meta && (
            <div className="hero-meta">
              {meta.map((m, i) => (
                <div key={i}>{t(m)}</div>
              ))}
            </div>
          )}
        </div>

        <SplitLines text={title} className={`hero-title ${titleSize === 'small' ? 'small' : ''}`} />

        <div className="hero-sub">
          <div>
            {tagline && (
              <p className="hero-tagline fade-in">
                <T text={tagline} />
              </p>
            )}
            {tagline2 && (
              <p className="hero-tagline fade-in" style={{ ['--d' as string]: '150ms' }}>
                <T text={tagline2} />
              </p>
            )}
            {extra}
          </div>
          <ScrollDown label={scrollLabel} target={scrollTarget} />
        </div>
      </div>
    </section>
  )
}
