import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

let observer: IntersectionObserver | null = null

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view')
          observer?.unobserve(e.target)
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
  )
  return observer
}

/**
 * Observes every .fade-in / .words-reveal / .reveal element on the page and
 * adds .in-view when it scrolls into the viewport. Re-runs on route change
 * and language change (content re-renders).
 */
export function useRevealOnScroll(deps: unknown[] = []) {
  const { pathname } = useLocation()
  useEffect(() => {
    const obs = getObserver()
    const els = document.querySelectorAll<HTMLElement>('.fade-in:not(.in-view), .words-reveal:not(.in-view), .reveal:not(.in-view)')
    els.forEach((el) => obs.observe(el))
    // late-mounted content (async data) — poll once shortly after
    const t = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>('.fade-in:not(.in-view), .words-reveal:not(.in-view), .reveal:not(.in-view)')
        .forEach((el) => obs.observe(el))
    }, 600)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, ...deps])
}

/** Marks the element as revealed immediately when it is already on screen at mount (hero). */
export function revealNow(el: HTMLElement | null) {
  if (!el) return
  requestAnimationFrame(() => el.classList.add('in-view'))
}
