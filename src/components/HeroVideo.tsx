import { useEffect, useRef, useState } from 'react'
import { isLite } from '../lib/perf'

export type HeroVideoSource = { webm: string; mp4: string; poster: string }

/**
 * Full-bleed muted background loop for the home hero.
 * Landscape cut on wide screens, portrait cut on portrait screens. The poster
 * paints first; in lite mode (weak device, Save-Data, reduced motion) only the
 * poster is shown and the video is never requested. Playback pauses off-screen
 * and in hidden tabs.
 */
export function HeroVideo({ wide, tall }: { wide: HeroVideoSource; tall: HeroVideoSource }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [portrait, setPortrait] = useState(() => window.matchMedia('(orientation: portrait)').matches)
  const [motion] = useState(() => !isLite())
  const [playing, setPlaying] = useState(false)
  const src = portrait ? tall : wide

  useEffect(() => {
    const mq = window.matchMedia('(orientation: portrait)')
    const on = () => setPortrait(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    const v = ref.current
    if (!v || !motion) return
    let visible = true
    const sync = () => {
      if (visible && !document.hidden && !isLite()) v.play().catch(() => {})
      else v.pause()
    }
    const io = new IntersectionObserver((e) => {
      visible = e[0]?.isIntersecting ?? true
      sync()
    })
    io.observe(v)
    document.addEventListener('visibilitychange', sync)
    return () => {
      io.disconnect()
      document.removeEventListener('visibilitychange', sync)
    }
  }, [motion, portrait])

  return (
    <div className={`hero-video${playing ? ' playing' : ''}`} aria-hidden="true">
      <img className="hero-video-poster" src={src.poster} alt="" fetchPriority="high" decoding="async" />
      {motion && (
        <video key={portrait ? 'tall' : 'wide'} ref={ref} muted loop playsInline autoPlay preload="auto" poster={src.poster} onPlaying={() => setPlaying(true)}>
          <source src={src.webm} type="video/webm" />
          <source src={src.mp4} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
