import { TALENTS_PAGE } from '../content/talents'
import { Hero } from '../components/Hero'
import { Chapter, Eyebrow, T, WordsReveal, useDocumentTitle } from '../components/ui'
import { Carousel } from '../components/Carousel'
import { CTAChapter } from '../components/sections'
import { useTalents } from '../hooks/useData'

export default function Talents() {
  useDocumentTitle({ pl: 'Talenty', en: 'Talents', es: 'Talentos' }, TALENTS_PAGE.tagline)
  const talents = useTalents()

  return (
    <>
      <Hero eyebrow={TALENTS_PAGE.eyebrow} meta={TALENTS_PAGE.meta} title={TALENTS_PAGE.title} tagline={TALENTS_PAGE.tagline} scrollLabel={TALENTS_PAGE.scroll} scrollTarget="#roster" />

      <Chapter dark className="carousel-chapter" id="roster">
        <div className="carousel-head">
          <Eyebrow text={TALENTS_PAGE.roster.eyebrow} />
          <WordsReveal text={TALENTS_PAGE.roster.title} />
          <p className="lead fade-in">
            <T text={TALENTS_PAGE.roster.lead} />
          </p>
        </div>
        <Carousel
          items={talents.map((tl) => ({
            key: tl.slug,
            name: tl.name,
            category: tl.role,
            handle: tl.handle,
            image: tl.image,
            href: tl.instagram,
          }))}
        />
      </Chapter>

      {/* Full roster grid removed for now per client ("To wywalamy na chwilę obecną") */}

      <CTAChapter dark={false} eyebrow={TALENTS_PAGE.cta.eyebrow} title={TALENTS_PAGE.cta.title} lead={TALENTS_PAGE.cta.lead} button={TALENTS_PAGE.cta.button} to="/kontakt#formularz" />
    </>
  )
}
