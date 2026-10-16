import { TALENTS_PAGE } from '../content/talents'
import { Hero } from '../components/Hero'
import { Btn, Chapter, Eyebrow, T, WordsReveal, useDocumentTitle } from '../components/ui'
import { CTAChapter } from '../components/sections'

export default function Talents() {
  useDocumentTitle({ pl: 'Talenty', en: 'Talents', es: 'Talentos' }, TALENTS_PAGE.tagline)
  const B = TALENTS_PAGE.building

  return (
    <>
      <Hero eyebrow={TALENTS_PAGE.eyebrow} meta={TALENTS_PAGE.meta} title={TALENTS_PAGE.title} tagline={TALENTS_PAGE.tagline} scrollLabel={TALENTS_PAGE.scroll} scrollTarget="#roster" />

      {/* "Poznaj naszych" carousel removed per client (2026-10-16: roster not up to date) — "w budowie" until the new roster */}
      <Chapter dark className="roster-building" id="roster">
        <div className="chapter-inner">
          <Eyebrow text={B.eyebrow} />
          <div className="rb-status fade-in">
            <span className="rb-dot" aria-hidden="true" />
            <T text={B.status} />
          </div>
          <WordsReveal text={B.title} className="large" />
          <p className="lead-p fade-in">
            <T text={B.lead} />
          </p>
          <p className="rb-note fade-in">
            <T text={B.note} />
          </p>
          <div className="fade-in">
            <Btn to="/kontakt#formularz">
              <T text={B.button} />
            </Btn>
          </div>
        </div>
      </Chapter>

      <CTAChapter dark={false} eyebrow={TALENTS_PAGE.cta.eyebrow} title={TALENTS_PAGE.cta.title} lead={TALENTS_PAGE.cta.lead} button={TALENTS_PAGE.cta.button} to="/kontakt#formularz" />
    </>
  )
}
