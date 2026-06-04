import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

type RevealFrom = 'bottom' | 'left' | 'right' | 'scale'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  from?: RevealFrom
  className?: string
}

function getInitial(from: RevealFrom, y: number) {
  switch (from) {
    case 'left':
      return { opacity: 0, x: -60 }
    case 'right':
      return { opacity: 0, x: 60 }
    case 'scale':
      return { opacity: 0, scale: 0.85 }
    case 'bottom':
    default:
      return { opacity: 0, y }
  }
}

function getAnimate(from: RevealFrom) {
  switch (from) {
    case 'left':
    case 'right':
      return { opacity: 1, x: 0 }
    case 'scale':
      return { opacity: 1, scale: 1 }
    case 'bottom':
    default:
      return { opacity: 1, y: 0 }
  }
}

function getTransition(from: RevealFrom, delay: number) {
  const d = delay / 1000
  const ease: [number, number, number, number] = [0.4, 0, 0.2, 1]
  const base = { duration: 0.7, ease, delay: d }
  switch (from) {
    case 'left':
    case 'right':
      return { opacity: base, x: { ...base, duration: 0.9 } }
    case 'scale':
      return { opacity: base, scale: { ...base, duration: 0.8 } }
    case 'bottom':
    default:
      return {
        opacity: base,
        y: { ...base, duration: 0.9 },
      }
  }
}

export function Reveal({
  children,
  delay = 0,
  y = 30,
  from = 'bottom',
  className,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={getInitial(from, y)}
      whileInView={getAnimate(from)}
      viewport={{ once: true, amount: 0.1 }}
      transition={getTransition(from, delay)}
    >
      {children}
    </motion.div>
  )
}
