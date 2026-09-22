import { ABOUT } from '../content/about'
import { UI } from '../content/common'
import { Hero } from '../components/Hero'
import { Chapter, Eyebrow, FadeIn, Ph, T, WordsReveal, useDocumentTitle } from '../components/ui'
import { CTAChapter } from '../components/sections'
import { useLang } from '../i18n/LangContext'

export default function About() {
  const { t } = useLang()
  useDocumentTitle({ pl: 'O nas', en: 'About', es: 'Nosotros' }, ABOUT.tagline)

  return (
    <>
      <Hero eyebrow={ABOUT.eyebrow} meta={ABOUT.meta} title={ABOUT.title} tagline={ABOUT.tagline} scrollLabel={UI.next} scrollTarget="#historia" />

      {/* STORY */}
      <Chapter dark={false} id="historia">
        <div className="chapter-inner split">
          <div className="col text-block">
            <Eyebrow text={ABOUT.story.eyebrow} dark={false} />
            <WordsReveal text={ABOUT.story.title} className="large" />
            <p className="lead-p fade-in">
              <T text={ABOUT.story.p1} />
            </p>
            <p className="fade-in" style={{ maxWidth: '48ch' }}>
              <T text={ABOUT.story.p2} />
            </p>
          </div>
          <FadeIn delay={150}>
            <Ph style={{ aspectRatio: '4/5' }} />
          </FadeIn>
        </div>
      </Chapter>

      {/* VALUES */}
      <Chapter dark>
        <div className="chapter-inner">
          <Eyebrow text={ABOUT.values.eyebrow} />
          <WordsReveal text={ABOUT.values.title} className="large" />
          <div className="values-grid">
            {ABOUT.values.items.map((v, i) => (
              <FadeIn className="value-item" key={v.num} delay={i * 90}>
                <div className="value-num">{v.num}</div>
                <h3>{t(v.title)}</h3>
                <p>{t(v.desc)}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </Chapter>

      {/* TIMELINE */}
      <Chapter dark={false}>
        <div className="chapter-inner">
          <Eyebrow text={ABOUT.timeline.eyebrow} dark={false} />
          <WordsReveal text={ABOUT.timeline.title} className="large" />
          <div className="timeline">
            {ABOUT.timeline.items.map((row, i) => (
              <FadeIn className="timeline-row" key={i} delay={Math.min(i * 40, 300)}>
                <span className="timeline-year">{t(row.year)}</span>
                <span className="timeline-title">{t(row.title)}</span>
                <span className="timeline-desc">{t(row.desc)}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </Chapter>

      <CTAChapter dark eyebrow={ABOUT.cta.eyebrow} title={ABOUT.cta.title} lead={ABOUT.cta.lead} button={ABOUT.cta.button} />
    </>
  )
}
