import { useEffect, useRef } from 'react'
import type { StarSceneHandle } from '../three/starScene'

export function Hero3D({ compact = false }: { compact?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    let handle: StarSceneHandle | null = null
    let cancelled = false
    // Start after first paint so text renders instantly; three.js is a separate chunk.
    const idle = (cb: () => void) => {
      const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
      if (typeof w.requestIdleCallback === 'function') w.requestIdleCallback(cb, { timeout: 800 })
      else window.setTimeout(cb, 120)
    }
    idle(() => {
      if (cancelled) return
      import('../three/starScene')
        .then((m) => m.mountStarScene(host, { compact }))
        .then((h) => {
          if (cancelled) h.dispose()
          else handle = h
        })
        .catch((err) => console.warn('[star3d] init failed', err))
    })
    return () => {
      cancelled = true
      handle?.dispose()
    }
  }, [compact])

  return (
    <div ref={hostRef} className={`hero-3d${compact ? ' hero-3d--compact' : ''}`} aria-hidden="true">
      <div className="hero-3d-fallback">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      </div>
    </div>
  )
}
