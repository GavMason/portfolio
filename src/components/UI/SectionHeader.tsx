import { useState } from 'react'
import { Reveal } from './Reveal'

interface SectionHeaderProps {
  number: string
  title: string
  subtitle?: string
  sectionId: string
}

export function SectionHeader({
  number,
  title,
  subtitle,
  sectionId,
}: SectionHeaderProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Reveal>
      <div className={subtitle ? 'mb-2' : 'mb-12'}>
        {/* Section number + title */}
        <div className="flex items-baseline gap-3.5">
          <a
            href={`#${sectionId}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="text-sm font-medium tracking-[2px] font-mono no-underline transition-all duration-300 cursor-pointer border-b"
            style={{
              color: hovered
                ? 'var(--color-accent-vivid)'
                : 'var(--color-accent-muted)',
              borderColor: hovered ? 'var(--color-accent-glow)' : 'transparent',
            }}
          >
            {number}
          </a>
          <h2 className="text-2xl sm:text-[32px] font-bold tracking-tight">
            {title}
          </h2>
        </div>
        {/* Subtitle */}
        {subtitle && (
          <p className="text-text-muted text-[15px] ml-9.5 mb-12 mt-2">
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  )
}
