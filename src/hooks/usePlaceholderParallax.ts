import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { isLite } from '../lib/perf'

/**
 * Vertical parallax for .ph blocks: the background (::before or <img>) is
 * overscanned ±20% and shifted via --ph-parallax (max ±15% of element height).
 * Only blocks near the viewport are tracked and promoted to their own layer
 * (`.ph-live`), so a long grid of covers doesn't cost a layer per card.
 * Off in lite mode.
 */
export function usePlaceholderParallax() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (isLite()) return
    const live = new Set<HTMLElement>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement
          if (e.isIntersecting) live.add(el)
          else live.delete(el)
          el.classList.toggle('ph-live', e.isIntersecting)
        }
        onScroll()
      },
      { rootMargin: '100px 0px' },
    )
    const collect = () => document.querySelectorAll<HTMLElement>('.ph').forEach((el) => io.observe(el))
    collect()
    const collectTimer = window.setTimeout(collect, 800)

    const STRENGTH = 0.15
    let ticking = false
    const update = () => {
      ticking = false
      if (isLite()) return
      const vh = window.innerHeight
      // read all, then write all — one layout per frame
      const moves: [HTMLElement, string][] = []
      for (const el of live) {
        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const progress = Math.max(-1, Math.min(1, (center - vh / 2) / vh))
        moves.push([el, `${(-progress * rect.height * STRENGTH).toFixed(1)}px`])
      }
      for (const [el, v] of moves) el.style.setProperty('--ph-parallax', v)
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.clearTimeout(collectTimer)
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])
}
