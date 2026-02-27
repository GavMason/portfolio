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
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-8 right-8 z-90 w-10 h-10 rounded-xl flex items-center justify-center outline-none backdrop-blur-md transition-all duration-400"
      style={{
        background: hovered ? 'var(--color-accent-subtle)' : 'var(--color-border)',
        border: `1px solid ${hovered ? 'var(--color-accent-border-hover)' : 'var(--color-border-light)'}`,
        color: hovered ? 'var(--color-accent-light)' : 'var(--color-text-soft)',
        opacity: show ? 1 : 0,
        pointerEvents: show ? 'auto' : 'none',
        transform: show ? 'translateY(0)' : 'translateY(10px)',
        boxShadow: hovered ? '0 8px 24px rgba(139,92,246,0.12)' : 'none',
      }}
    >
      <ChevronUp size={16} strokeWidth={2.5} />
    </button>
  )
}
