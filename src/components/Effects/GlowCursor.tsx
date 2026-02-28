import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SPRING = { damping: 30, stiffness: 150, mass: 0.2 }

export function GlowCursor() {
  const [isTouch, setIsTouch] = useState(
    () => !window.matchMedia('(hover: hover)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)')
    const update = () => setIsTouch(!mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Raw mouse position (instant)
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Trail position (springs behind)
  const trailX = useSpring(mouseX, SPRING)
  const trailY = useSpring(mouseY, SPRING)

  useEffect(() => {
    if (isTouch) return
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [isTouch, mouseX, mouseY])

  if (isTouch) return null

  return (
    <>
      {/* Dot - snaps to cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-9998 will-change-transform bg-accent-light-muted"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: '0 0 12px var(--color-accent-glow)',
        }}
      />
      {/* Trail - springs behind */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-9997 will-change-transform border border-accent-subtle"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          background:
            'radial-gradient(circle, var(--color-accent-ghost) 0%, transparent 70%)',
        }}
      />
    </>
  )
}
