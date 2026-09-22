import { Link, Navigate, useParams } from 'react-router-dom'
import { CTA_CONTACT_PATH, SERVICES, SERVICES_PAGE, type Service } from '../content/services'
import { FEATURED_TALENT_SLUGS } from '../content/talents'
import { Hero } from '../components/Hero'
import { Btn, Chapter, Eyebrow, FadeIn, Ph, ProcessStrip, T, WordsReveal, useDocumentTitle } from '../components/ui'
import { CTAChapter, PPLockup } from '../components/sections'
import { useLang } from '../i18n/LangContext'
import { useProjects, useTalents } from '../hooks/useData'
import { ProjectCard } from './Projects'

const PORTFOLIO_CATEGORIES: Record<string, string[]> = {
  video: ['video', 'youtube', 'podcasty', 'social'],
  events: ['eventy'],
  live: ['eventy', 'video'],
  products: ['foto', 'creative'],
  tech: [],
  ai: [],
  design: ['creative'],
}

function Paragraphs({ text, className = '' }: { text: string; className?: string }) {
  return (
    <>
      {text.split('\n\n').map((p, i) => (
        <p key={i} className={`fade-in ${className}`.trim()} style={{ ['--d' as string]: `${i * 80}ms` }}>
          <T text={p} />
        </p>
      ))}
    </>
  )
}

function Portfolio({ service }: { service: Service }) {
  const { t } = useLang()
  const projects = useProjects()
  const talents = useTalents()
  const pf = service.portfolio!

  if (pf.kind === 'talents') {
    const featured = FEATURED_TALENT_SLUGS.map((s) => talents.find((x) => x.slug === s)).filter(Boolean)
    return (
      <Chapter dark>
        <div className="chapter-inner">
          <Eyebrow text={SERVICES_PAGE.portfolioEyebrow} />
          <WordsReveal text={pf.title} className="svc-section-title" />
          <div className="talent-feature">
            {featured.map((tl, i) => (
              <FadeIn className="talent-card" key={tl!.slug} delay={i * 100}>
                <Ph className="card-img" src={tl!.image} alt={tl!.name} />
                <div className="card-body">
                  <div className="card-cat">{t(tl!.role)}</div>
                  <div className="card-name">{tl!.name}</div>
                </div>
              </FadeIn>
            ))}
          </div>
          <p className="fade-in svc-quiet" style={{ marginTop: '2.5rem', maxWidth: '52ch' }}>
            <T text={pf.note} />
          </p>
          <div className="fade-in" style={{ marginTop: '2rem' }}>
            <Btn to="/talenty">
              <T text={pf.caption} />
            </Btn>
          </div>
        </div>
      </Chapter>
    )
  }

  const cats = PORTFOLIO_CATEGORIES[pf.kind] ?? []
  const items = projects.filter((p) => cats.includes(p.category) && p.image).slice(0, 6)
  return (
    <Chapter dark>
      <div className="chapter-inner">
        <Eyebrow text={SERVICES_PAGE.portfolioEyebrow} />
        <WordsReveal text={pf.title} className="svc-section-title" />
        <p className="fade-in svc-quiet" style={{ marginTop: '2rem', maxWidth: '60ch' }}>
          <T text={pf.note} />
        </p>
        {items.length > 0 ? (
          <div className="gallery">
            {items.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        ) : (
          <div className="svc-portfolio-note fade-in">
            <T text={SERVICES_PAGE.portfolioSoon} />
            <div className="mono" style={{ marginTop: '1rem', fontStyle: 'normal', opacity: 0.7 }}>
              <T text={pf.caption} />
            </div>
          </div>
        )}
      </div>
    </Chapter>
  )
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const { t } = useLang()
  const idx = SERVICES.findIndex((s) => s.slug === slug)
  const service = SERVICES[idx]
  useDocumentTitle(service ? service.title : 'Usługi', service?.short)
  if (!service) return <Navigate to="/uslugi" replace />

  const prev = SERVICES[(idx - 1 + SERVICES.length) % SERVICES.length]
  const next = SERVICES[(idx + 1) % SERVICES.length]
  const heroText = t(service.hero.text).split('\n\n')
  const isInfluencer = service.slug === 'influencer-marketing'

  return (
    <>
      <Hero
        eyebrow={`${service.num} / ${t(service.title)}`}
        meta={[SERVICES_PAGE.backToServices]}
        title={service.hero.title}
        titleSize="small"
        tagline={heroText[0]}
        tagline2={heroText[1]}
        scrollLabel={{ pl: 'Dalej', en: 'Next', es: 'Siguiente' }}
        scrollTarget="#zakres"
        extra={heroText[2] ? <p className="hero-tagline fade-in" style={{ ['--d' as string]: '300ms', color: 'var(--gold)' }}><T text={heroText[2]} /></p> : undefined}
      />

      {/* 02 — SCOPE */}
      <Chapter dark={false} id="zakres">
        <div className="chapter-inner">
          <Eyebrow text={`02 — ${t(SERVICES_PAGE.scopeEyebrow)}`} dark={false} />
          <WordsReveal text={service.scope.title} className="svc-section-title" />
          <div className="scope-grid">
            {service.scope.items.map((item, i) => (
              <FadeIn className="scope-item" key={i} delay={Math.min(i * 30, 400)}>
                <i>{String(i + 1).padStart(2, '0')}</i>
                <span>{t(item)}</span>
              </FadeIn>
            ))}
          </div>
        </div>
      </Chapter>

      {/* 03… — NARRATIVE SECTIONS (alternate dark/light) */}
      {service.sections.map((sec, i) => {
        const dark = i % 2 === 0
        const num = String(i + 3).padStart(2, '0')
        const isPP = isInfluencer && i === 1
        return (
          <Chapter dark={dark} key={i}>
            <div className="chapter-inner split top">
              <div>
                <Eyebrow text={num} dark={dark} />
                {isPP && <PPLockup />}
                <WordsReveal text={sec.title} className="svc-section-title" />
              </div>
              <div className="svc-text" style={{ alignSelf: 'end' }}>
                <Paragraphs text={t(sec.text).replace(/^Star Media × Polska Press\n\n/, '')} />
              </div>
            </div>
          </Chapter>
        )
      })}

      {/* PORTFOLIO */}
      {service.portfolio && <Portfolio service={service} />}

      {/* PROCESS */}
      <Chapter dark={service.sections.length % 2 === 0 && !service.portfolio}>
        <div className="chapter-inner">
          <Eyebrow text={SERVICES_PAGE.processEyebrowSub} dark={service.sections.length % 2 === 0 && !service.portfolio} />
          <WordsReveal text={service.process.title} className="svc-section-title" />
          <ProcessStrip steps={service.process.steps.map((s) => t(s))} />
          <p className="fade-in" style={{ marginTop: '2.5rem', maxWidth: '56ch' }}>
            <T text={service.process.text} />
          </p>
        </div>
      </Chapter>

      {/* FINAL */}
      <CTAChapter dark eyebrow={service.num} title={service.final.title} lead={service.final.text} button={service.final.button} to={service.final.to ?? CTA_CONTACT_PATH} />

      {/* PREV / NEXT */}
      <div className="chapter-dark" style={{ padding: '0 var(--gutter) 4rem' }}>
        <div className="chapter-inner svc-nav">
          <Link to={`/uslugi/${prev.slug}`}>
            ← {prev.num} {t(prev.title)}
          </Link>
          <Link to="/uslugi">{t(SERVICES_PAGE.backToServices)}</Link>
          <Link to={`/uslugi/${next.slug}`}>
            {next.num} {t(next.title)} →
          </Link>
        </div>
      </div>
    </>
  )
}
