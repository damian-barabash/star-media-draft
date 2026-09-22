import { INFLUENCER } from '../content/influencer'
import { Hero } from '../components/Hero'
import { Chapter, Eyebrow, FadeIn, T, WordsReveal, useDocumentTitle } from '../components/ui'
import { CTAChapter, PPLockup, PPStats, ProcessChapter } from '../components/sections'
import { useLang } from '../i18n/LangContext'

export default function Influencer() {
  const { t } = useLang()
  useDocumentTitle('Influencer Marketing × Polska Press', INFLUENCER.tagline)

  return (
    <>
      <Hero eyebrow={INFLUENCER.eyebrow} meta={INFLUENCER.meta} title={INFLUENCER.title} tagline={INFLUENCER.tagline} tagline2={INFLUENCER.tagline2} scrollLabel={{ pl: 'Dalej', en: 'Next', es: 'Siguiente' }} scrollTarget="#partnerstwo" />

      {/* 02 — PARTNERSHIP */}
      <Chapter dark={false} id="partnerstwo">
        <div className="chapter-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Eyebrow text={INFLUENCER.partnership.eyebrow} dark={false} />
          <PPLockup big />
          <WordsReveal text={INFLUENCER.partnership.title} className="im-big" style={{ maxWidth: '16ch' }} />
          <p className="lead fade-in" style={{ marginTop: '2.5rem', maxWidth: '44ch' }}>
            <T text={INFLUENCER.partnership.text1} />
          </p>
          <p className="fade-in" style={{ marginTop: '1rem', maxWidth: '48ch' }}>
            <strong style={{ fontWeight: 500 }}>
              <T text={INFLUENCER.partnership.text2} />
            </strong>
          </p>
          <p className="pp-source fade-in" style={{ marginTop: '2.5rem' }}>
            {t(INFLUENCER.partnership.source)}
          </p>
        </div>
      </Chapter>

      {/* WHAT YOU GET */}
      <Chapter dark>
        <div className="chapter-inner">
          <Eyebrow text={INFLUENCER.what.eyebrow} />
          <WordsReveal text={INFLUENCER.what.title} className="large" style={{ maxWidth: '20ch' }} />
          <div className="three-cols">
            {INFLUENCER.what.cols.map((c, i) => (
              <FadeIn key={c.num} delay={i * 100}>
                <div className="value-num">{c.num}</div>
                <h3>{t(c.title)}</h3>
                <p>{t(c.desc)}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </Chapter>

      {/* ANATOMY */}
      <ProcessChapter dark={false} eyebrow={INFLUENCER.anatomy.eyebrow} title={INFLUENCER.anatomy.title} lead={INFLUENCER.anatomy.lead} steps={INFLUENCER.anatomy.steps} />

      {/* NUMBERS */}
      <Chapter dark>
        <div className="chapter-inner">
          <Eyebrow text={INFLUENCER.numbers.eyebrow} />
          <WordsReveal text={INFLUENCER.numbers.title} className="large" style={{ maxWidth: '20ch' }} />
          <div style={{ marginTop: '4rem' }}>
            <PPStats dark compact />
          </div>
        </div>
      </Chapter>

      <CTAChapter dark={false} eyebrow={INFLUENCER.cta.eyebrow} title={INFLUENCER.cta.title} lead={INFLUENCER.cta.lead} button={INFLUENCER.cta.button} />
    </>
  )
}
