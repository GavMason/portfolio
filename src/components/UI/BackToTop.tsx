import { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { ChevronUp } from 'lucide-react'

export function BackToTop() {
  const [show, setShow] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > 600))

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-6 right-4 sm:bottom-20 sm:right-8 z-90 w-11 h-11 rounded-xl flex items-center justify-center outline-none backdrop-blur-md transition-all duration-400"
      style={{
        background: hovered
          ? 'var(--color-accent-subtle)'
          : 'var(--color-border)',
        border: `1px solid ${hovered ? 'var(--color-accent-border-hover)' : 'var(--color-border-light)'}`,
        color: hovered ? 'var(--color-accent-light)' : 'var(--color-text-soft)',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transform: show ? 'translateY(0)' : 'translateY(10px)',
        boxShadow: hovered ? '0 8px 24px var(--color-accent-border)' : 'none',
      }}
    >
      <ChevronUp size={16} strokeWidth={2.5} />
    </button>
  )
}
