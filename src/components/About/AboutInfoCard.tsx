import { useState, type ReactNode } from 'react'
import { Reveal } from '../UI/Reveal'

interface AboutInfoCardProps {
  children: ReactNode
  hoverAccent?: string
  delay?: number
}

export function AboutInfoCard({ children, hoverAccent = '139,92,246', delay = 0 }: AboutInfoCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="rounded-[20px] p-6 transition-all duration-400"
        style={{
          background: hovered ? `rgba(${hoverAccent},0.03)` : 'var(--color-surface)',
          border: `1px solid ${hovered ? `rgba(${hoverAccent},0.1)` : 'var(--color-border)'}`,
          transform: hovered ? 'translateY(-2px)' : 'none',
        }}
      >
        {children}
      </div>
    </Reveal>
  )
}
