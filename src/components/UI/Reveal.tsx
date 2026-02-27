import type { ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { useParallax } from '../../hooks/useParallax'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
}

export function Reveal({ children, delay = 0, y = 30 }: RevealProps) {
  const [ref, visible] = useInView()
  const [pRef, offset] = useParallax(0.03)

  return (
    <div
      // Callback ref merges both hook refs onto a single DOM element
      ref={(el) => {
        ref.current = el
        pRef.current = el
      }}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? `translateY(${offset}px)` : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(.4,0,.2,1) ${delay}ms, transform 0.9s cubic-bezier(.4,0,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}
