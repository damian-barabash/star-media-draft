import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Ph, T } from './ui'
import { UI } from '../content/common'
import type { L } from '../i18n/types'

export type CarouselItem = {
  key: string
  category: L | string
  name: string
  handle?: string | null
  image?: string | null
  to?: string
  href?: string
}

export function Carousel({ items }: { items: CarouselItem[] }) {
  const [active, setActive] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const timer = useRef<number>(0)
  const total = items.length

  const go = useCallback(
    (dir: number) => {
      setActive((a) => (a + dir + total) % total)
    },
    [total],
  )

  const restart = useCallback(() => {
    window.clearInterval(timer.current)
    timer.current = window.setInterval(() => go(1), 5000)
  }, [go])

  useEffect(() => {
    restart()
    return () => window.clearInterval(timer.current)
  }, [restart])

  // Pointer drag / swipe
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let startX: number | null = null
    let moved = false
    const down = (e: PointerEvent) => {
      startX = e.clientX
      moved = false
    }
    const move = (e: PointerEvent) => {
      if (startX !== null && Math.abs(e.clientX - startX) > 8) moved = true
    }
    const up = (e: PointerEvent) => {
      if (startX === null) return
      const dx = e.clientX - startX
      if (Math.abs(dx) > 40) {
        go(dx < 0 ? 1 : -1)
        restart()
      }
      startX = null
    }
    const click = (e: MouseEvent) => {
      if (moved) e.preventDefault()
    }
    stage.addEventListener('pointerdown', down)
    stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerup', up)
    stage.addEventListener('pointercancel', () => (startX = null))
    stage.addEventListener('click', click, true)
    return () => {
      stage.removeEventListener('pointerdown', down)
      stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerup', up)
      stage.removeEventListener('click', click, true)
    }
  }, [go, restart])

  const narrow = typeof window !== 'undefined' && window.innerWidth < 600
  const spread = narrow ? 170 : window.innerWidth < 969 ? 210 : 260

  return (
    <>
      <div className="carousel-stage" ref={stageRef} onMouseEnter={() => window.clearInterval(timer.current)} onMouseLeave={restart}>
        {items.map((item, i) => {
          let offset = i - active
          if (offset > total / 2) offset -= total
          if (offset < -total / 2) offset += total
          const abs = Math.abs(offset)
          const isActive = offset === 0
          const style = {
            transform: `translateX(${offset * spread}px) translateZ(${isActive ? 180 : -abs * 140}px) rotateY(${offset * -18}deg) scale(${isActive ? 1.12 : Math.max(0.75, 1 - abs * 0.12)})`,
            opacity: abs > 3 ? 0 : Math.max(0.12, 1 - abs * 0.25),
            zIndex: isActive ? 20 : 10 - abs,
          }
          const body = (
            <>
              <Ph className="card-img" src={item.image} alt={item.name} />
              <div className="card-body">
                <div className="card-cat">
                  <T text={item.category} />
                </div>
                <div className="card-name">{item.name}</div>
                {item.handle && <div className="card-handle">{item.handle}</div>}
              </div>
            </>
          )
          const cls = `carousel-card ${isActive ? 'active' : ''}`
          const onClick = (e: React.MouseEvent) => {
            if (!isActive) {
              e.preventDefault()
              setActive(i)
              restart()
            }
          }
          if (isActive && item.to) {
            return (
              <Link key={item.key} to={item.to} className={cls} style={style} onClick={onClick}>
                {body}
              </Link>
            )
          }
          if (isActive && item.href) {
            return (
              <a key={item.key} href={item.href} target="_blank" rel="noopener" className={cls} style={style} onClick={onClick}>
                {body}
              </a>
            )
          }
          return (
            <div key={item.key} className={cls} style={style} onClick={onClick} role="button" tabIndex={-1}>
              {body}
            </div>
          )
        })}
      </div>

      <div className="carousel-ctrl">
        <button className="carousel-arrow" onClick={() => { go(-1); restart() }} aria-label="Previous">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 6H1m0 0l5-5m-5 5l5 5" /></svg>
        </button>
        <span className="carousel-count">
          <em>{String(active + 1).padStart(2, '0')}</em> / {String(total).padStart(2, '0')}
        </span>
        <div className="carousel-bar" style={{ ['--progress' as string]: `${((active + 1) / total) * 100}%` }} />
        <button className="carousel-arrow" onClick={() => { go(1); restart() }} aria-label="Next">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 6h16m0 0l-5-5m5 5l-5 5" /></svg>
        </button>
      </div>
      <p className="sr-only">
        <T text={UI.dragHint} />
      </p>
    </>
  )
}
