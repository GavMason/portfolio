import { useRef, useEffect, useState } from 'react'

export function GlowCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: -100, y: -100 })    // Start offscreen so cursor isn't visible before first move
  const trailPos = useRef({ x: -100, y: -100 }) // Trail starts at same offscreen position
  const raf = useRef<number>(0)
  const [isTouch] = useState(() => 'ontouchstart' in window)

  useEffect(() => {
    if (isTouch) return

    // Track raw mouse position
    const move = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', move)

    // Animation loop - dot snaps to cursor, trail lerps behind
    const animate = () => {
      // Lerp trail toward mouse each frame - control lag (lower = slower/smoother)
      trailPos.current.x += (mouse.current.x - trailPos.current.x) * 0.12
      trailPos.current.y += (mouse.current.y - trailPos.current.y) * 0.12
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trailPos.current.x - 16}px, ${trailPos.current.y - 16}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      {/* Dot - small circle that follows the cursor exactly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-9998 will-change-transform bg-accent-light-muted"
        style={{ boxShadow: '0 0 12px var(--color-accent-glow)' }}
      />
      {/* Trail - larger ring that lerps behind the dot */}
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-9997 will-change-transform border border-accent-subtle"
        style={{
          background: 'radial-gradient(circle, var(--color-accent-ghost) 0%, transparent 70%)',
        }}
      />
    </>
  )
}
