import { useState } from 'react'
import { PROJECTS_PAGE, PROJECT_FILTERS, type Project, type ProjectCategory } from '../content/projects'
import { Hero } from '../components/Hero'
import { Chapter, Eyebrow, Ph, T, WordsReveal, useDocumentTitle } from '../components/ui'
import { CTAChapter } from '../components/sections'
import { useLang } from '../i18n/LangContext'
import { useProjects } from '../hooks/useData'

export function ProjectCard({ project, wide = false }: { project: Project; wide?: boolean }) {
  const { t } = useLang()
  const body = (
    <>
      <Ph className="card-img" src={project.image} alt={project.title} />
      {project.video && (
        <span className="card-play" aria-hidden="true">
          <svg viewBox="0 0 12 14">
            <path d="M0 0l12 7-12 7z" />
          </svg>
        </span>
      )}
      <div className="card-body">
        <span className="card-tag">{t(project.kind)}</span>
        <h3 className="card-title">{project.title}</h3>
      </div>
    </>
  )
  const cls = `case-card ${wide ? 'wide' : ''}`.trim()
  return project.video ? (
    <a className={cls} href={project.video} target="_blank" rel="noopener" aria-label={project.title}>
      {body}
    </a>
  ) : (
    <article className={cls}>{body}</article>
  )
}

export default function Projects() {
  const { t } = useLang()
  useDocumentTitle({ pl: 'Projekty', en: 'Projects', es: 'Proyectos' }, PROJECTS_PAGE.tagline)
  const projects = useProjects()
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all')
  const visible = projects.filter((p) => filter === 'all' || p.category === filter)

  return (
    <>
      <Hero eyebrow={PROJECTS_PAGE.eyebrow} meta={PROJECTS_PAGE.meta} title={PROJECTS_PAGE.title} tagline={PROJECTS_PAGE.tagline} scrollLabel={PROJECTS_PAGE.scroll} scrollTarget="#works" />

      <Chapter dark={false} id="works">
        <div className="chapter-inner">
          <Eyebrow text={PROJECTS_PAGE.gridEyebrow} dark={false} />
          <WordsReveal text={PROJECTS_PAGE.gridTitle} className="large" style={{ maxWidth: '20ch' }} />

          <div className="filters fade-in" role="tablist" aria-label="Filter">
            {PROJECT_FILTERS.map((f) => (
              <button key={f.key} role="tab" aria-selected={filter === f.key} className={`filter-btn ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
                {t(f.label)}
              </button>
            ))}
          </div>

          {visible.length ? (
            <div className="cases-grid" key={filter}>
              {visible.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          ) : (
            <div className="svc-portfolio-note">
              <T text={PROJECTS_PAGE.empty} />
            </div>
          )}
        </div>
      </Chapter>

      <CTAChapter dark eyebrow={PROJECTS_PAGE.cta.eyebrow} title={PROJECTS_PAGE.cta.title} lead={PROJECTS_PAGE.cta.lead} button={PROJECTS_PAGE.cta.button} />
    </>
  )
}
