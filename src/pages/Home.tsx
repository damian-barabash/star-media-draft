import { HOME } from '../content/home'
import { HOME_SERVICES } from '../content/services'
import { UI } from '../content/common'
import { Hero } from '../components/Hero'
import { Btn, Chapter, Eyebrow, FadeIn, Ph, T, WordsReveal, useDocumentTitle } from '../components/ui'
import { Carousel } from '../components/Carousel'
import { CTAChapter, PPChapter, ServicesList } from '../components/sections'
import { useProjects } from '../hooks/useData'
import { useLang } from '../i18n/LangContext'

export default function Home() {
  const { t } = useLang()
  useDocumentTitle(HOME.title.pl.replace(/\*/g, '').replace('\n', ' '), HOME.tagline)
  const projects = useProjects()
  const featured = projects.filter((p) => p.featured).slice(0, 7)

  return (
    <>
      <Hero eyebrow={HOME.eyebrow} meta={HOME.meta} title={HOME.title} tagline={HOME.tagline} scrollLabel={HOME.scroll} scrollTarget="#showreel" compact={false} />

      {/* SHOWREEL (placeholder until the client delivers the video) */}
      <section id="showreel" className="chapter chapter-light showreel">
        <div className="showreel-frame">
          <Ph />
          <div className="showreel-ui">
            <div className="row mono">
              <span>{HOME.showreel.label}</span>
              <span>{t(HOME.showreel.note)}</span>
            </div>
            <div className="big-statement">
              <span className="line">
                <T text={HOME.showreel.big} />
              </span>
            </div>
            <div className="row mono">
              <span>00:00 / 02:30</span>
              <span>{HOME.showreel.placeholder}</span>
            </div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <Chapter dark className="statement-chapter">
        <div className="chapter-inner">
          <Eyebrow text={HOME.statement.eyebrow} />
          <WordsReveal text={HOME.statement.title} className="statement-title" />
          <p className="lead fade-in" style={{ marginTop: '3rem', maxWidth: '52ch' }}>
            <T text={HOME.statement.lead} />
          </p>
        </div>
      </Chapter>

      {/* MARQUEE */}
      <div className="chapter-dark">
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...HOME.marquee, ...HOME.marquee].map((m, i) => (
              <span className="marquee-item" key={i}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* SELECTED PROJECTS — 3D carousel */}
      <Chapter dark className="carousel-chapter">
        <div className="carousel-head">
          <Eyebrow text={HOME.projects.eyebrow} />
          <WordsReveal text={HOME.projects.title} />
          <p className="lead fade-in">
            <T text={HOME.projects.lead} />
          </p>
        </div>
        <Carousel
          items={featured.map((p) => ({
            key: p.slug,
            name: p.title,
            category: p.kind,
            image: p.image,
            href: p.video ?? undefined,
          }))}
        />
        <div style={{ textAlign: 'center', marginTop: '3rem', padding: '0 var(--gutter)' }}>
          <Btn to="/projekty">
            <T text={HOME.projects.button} />
          </Btn>
        </div>
      </Chapter>

      {/* POLSKA PRESS */}
      <PPChapter dark={false} />

      {/* SERVICES (9 areas) */}
      <Chapter dark>
        <div className="chapter-inner">
          <div className="chapter-head">
            <div>
              <Eyebrow text={HOME.services.eyebrow} />
              <WordsReveal text={HOME.services.title} className="large" />
            </div>
            <FadeIn>
              <Btn to="/uslugi">
                <T text={HOME.services.button} />
              </Btn>
            </FadeIn>
          </div>
          <ServicesList items={HOME_SERVICES} />
        </div>
      </Chapter>

      {/* MANIFESTO */}
      <Chapter dark={false} style={{ textAlign: 'center' }}>
        <div className="chapter-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
          <Eyebrow text={HOME.manifesto.eyebrow} dark={false} className="" />
          <div className="big-statement manifesto">
            {HOME.manifesto.lines.map((line, i) => (
              <WordsReveal key={i} as="span" text={line} className="line" />
            ))}
          </div>
          <p className="big-statement-sub fade-in">
            <T text={HOME.manifesto.sub} />
          </p>
        </div>
      </Chapter>

      {/* CTA */}
      <CTAChapter dark eyebrow={HOME.cta.eyebrow} title={HOME.cta.title} lead={HOME.cta.lead} button={HOME.cta.button} to="/kontakt#formularz" secondary={{ label: UI.seeProjects, to: '/projekty' }} />
    </>
  )
}
