import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SPRING = { damping: 30, stiffness: 150, mass: 0.2 }

export function GlowCursor() {
  const [isTouch, setIsTouch] = useState(
    () => !window.matchMedia('(hover: hover)').matches,
  )
  const [hovering, setHovering] = useState(false)

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

  // Track hover over interactive elements
  useEffect(() => {
    if (isTouch) return
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        'a, button, [role="button"], input, textarea, select, [tabindex]',
      )
      setHovering(!!el)
    }
    window.addEventListener('mouseover', onOver)
    return () => window.removeEventListener('mouseover', onOver)
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      {/* Dot - snaps to cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-9998 will-change-transform bg-accent-light-muted"
        style={{
          width: hovering ? 6 : 8,
          height: hovering ? 6 : 8,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          transition: 'width 0.2s, height 0.2s',
        }}
      />
      {/* Ring - only visible on interactive elements */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-9997 will-change-transform"
        style={{
          width: hovering ? 40 : 0,
          height: hovering ? 40 : 0,
          opacity: hovering ? 1 : 0,
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid var(--color-accent-subtle)',
          transition: 'width 0.25s, height 0.25s, opacity 0.25s',
        }}
      />
    </>
  )
}
