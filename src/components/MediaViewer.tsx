import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ALBUMS, albumPhoto } from '../content/albums'
import type { Project } from '../content/projects'
import { UI } from '../content/common'
import { T } from './ui'

/**
 * Full-screen viewer for our own media (2026-10-16):
 *  - photo albums from the client (public/foto/<album>), arrows / keys / swipe, thumbnail strip
 *  - self-hosted WebM for low-view videos (public/video/projects), with a link to the original post
 */
type Open = { project: Project; index?: number }
const Ctx = createContext<(o: Open) => void>(() => {})

/** true when the project opens in our viewer instead of an external link */
export const opensInViewer = (p: Project) => Boolean(p.album || p.local)

export function useMediaViewer() {
  return useContext(Ctx)
}

export function MediaViewerProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<Open | null>(null)
  const show = useCallback((o: Open) => setOpen(o), [])
  return (
    <Ctx.Provider value={show}>
      {children}
      {open && createPortal(<Viewer {...open} onClose={() => setOpen(null)} />, document.body)}
    </Ctx.Provider>
  )
}

function Viewer({ project, index = 0, onClose }: Open & { onClose: () => void }) {
  const photos = project.album ? ALBUMS[project.album] ?? [] : []
  const [i, setI] = useState(index)
  const total = photos.length
  const go = useCallback((d: number) => setI((x) => (x + d + total) % total), [total])
  const stripRef = useRef<HTMLDivElement>(null)
  const touch = useRef(0)

  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (total && e.key === 'ArrowRight') go(1)
      if (total && e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose, go, total])

  // keep the active thumbnail in view; preload the neighbours
  useEffect(() => {
    stripRef.current?.querySelector('.mv-thumb.active')?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
    if (!total) return
    for (const d of [1, -1]) new Image().src = albumPhoto(project.album!, photos[(i + d + total) % total][0])
  }, [i, total, photos, project.album])

  return (
    <div className="mv" role="dialog" aria-modal="true" aria-label={project.title} onClick={onClose}>
      <div className="mv-top" onClick={(e) => e.stopPropagation()}>
        <div className="mv-title">
          <span>{project.title}</span>
          {total > 0 && (
            <span className="mv-count">
              {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          )}
        </div>
        <div className="mv-actions">
          {project.local && project.video && (
            <a href={project.video} target="_blank" rel="noopener" className="mv-link">
              <T text={UI.viewOriginal} />
            </a>
          )}
          <button className="mv-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
      </div>

      {project.local ? (
        <div className="mv-stage mv-video" onClick={(e) => e.stopPropagation()}>
          <video
            src={project.local}
            poster={project.image ?? undefined}
            controls
            autoPlay
            playsInline
            preload="metadata"
            onError={() => {
              // e.g. an old Safari without WebM: fall back to the original post
              if (project.video) window.open(project.video, '_blank', 'noopener')
              onClose()
            }}
          />
        </div>
      ) : (
        <>
          <div
            className="mv-stage"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const dx = e.changedTouches[0].clientX - touch.current
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
            }}
          >
            {total > 0 && (
              <img
                key={i}
                src={albumPhoto(project.album!, photos[i][0])}
                width={photos[i][1]}
                height={photos[i][2]}
                alt={`${project.title} — ${i + 1}`}
                decoding="async"
              />
            )}
            <button className="mv-arrow prev" onClick={() => go(-1)} aria-label="Previous">
              ←
            </button>
            <button className="mv-arrow next" onClick={() => go(1)} aria-label="Next">
              →
            </button>
          </div>
          <div className="mv-strip" ref={stripRef} onClick={(e) => e.stopPropagation()}>
            {photos.map((p, k) => (
              <button key={p[0]} className={`mv-thumb ${k === i ? 'active' : ''}`} onClick={() => setI(k)} aria-label={`${k + 1}`}>
                <img src={albumPhoto(project.album!, p[0], true)} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
