import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Vertical parallax for .ph blocks: the background (::before or <img>) is
 * overscanned ±20% and shifted via --ph-parallax (max ±15% of element height).
 */
export function usePlaceholderParallax() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let elements: HTMLElement[] = []
    const collect = () => {
      elements = Array.from(document.querySelectorAll<HTMLElement>('.ph'))
    }
    collect()
    const collectTimer = window.setTimeout(collect, 800)

    const STRENGTH = 0.15
    let ticking = false
    const update = () => {
      const vh = window.innerHeight
      for (const el of elements) {
        const rect = el.getBoundingClientRect()
        if (rect.bottom < -50 || rect.top > vh + 50) continue
        const center = rect.top + rect.height / 2
        const progress = Math.max(-1, Math.min(1, (center - vh / 2) / vh))
        el.style.setProperty('--ph-parallax', `${(-progress * rect.height * STRENGTH).toFixed(1)}px`)
      }
      ticking = false
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.clearTimeout(collectTimer)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])
}
