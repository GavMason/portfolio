import { useState } from 'react'
import { useInView } from '../../hooks/useInView'
import type { ContactLink } from '../../data/contact'

interface ContactCardProps {
  link: ContactLink
  delay?: number
}

export function ContactCard({ link, delay = 0 }: ContactCardProps) {
  const [hovered, setHovered] = useState(false)
  const [ref, visible] = useInView(0.2)

  // Resume card uses green accent, everything else uses purple
  const accentColor = link.isResume ? '74,222,128' : '139,92,246'
  const textColor = link.isResume ? 'var(--color-accent-green)' : 'var(--color-accent-light)'

  return (
    <div ref={ref}>
      <a
        href={link.href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="flex flex-col items-center gap-3 rounded-2xl no-underline"
        style={{
          flex: '1 1 130px',
          maxWidth: '160px',
          padding: '24px 16px',
          background: hovered ? `rgba(${accentColor},0.06)` : 'var(--color-surface)',
          border: `1px solid ${hovered ? `rgba(${accentColor},0.18)` : 'var(--color-border-hover)'}`,
          transform: hovered ? 'translateY(-4px)' : visible ? 'none' : 'translateY(20px)',
          boxShadow: hovered ? `0 16px 40px rgba(${accentColor},0.08)` : 'none',
          opacity: visible ? 1 : 0,
          transition: `background 0.15s ease, border 0.15s ease, transform 0.2s ease, box-shadow 0.15s ease, opacity 0.5s ease`,
          transitionDelay: visible ? '0ms' : `${delay}ms`,
        }}
      >
        {/* Icon */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            background: hovered ? `rgba(${accentColor},0.1)` : 'var(--color-surface)',
            border: `1px solid ${hovered ? `rgba(${accentColor},0.15)` : 'var(--color-border-hover)'}`,
            color: hovered ? textColor : 'var(--color-text-soft)',
            transition: 'background 0.15s ease, border 0.15s ease, color 0.15s ease',
          }}
        >
          {link.icon}
        </div>
        {/* Label */}
        <span
          className="text-[13px] font-semibold tracking-wide transition-colors duration-300"
          style={{ color: hovered ? textColor : 'var(--color-text-muted)' }}
        >
          {link.label}
        </span>
        {/* Resume shows "PDF" badge, others show arrow indicator */}
        {link.isResume && (
          <span
            className="text-[9px] font-mono tracking-widest uppercase transition-colors duration-300"
            style={{ color: hovered ? 'rgba(74,222,128,0.5)' : 'var(--color-text-whisper)' }}
          >
            PDF
          </span>
        )}
        {!link.isResume && (
          <span
            className="text-[11px] inline-block transition-all duration-300"
            style={{
              color: hovered ? 'var(--color-accent-light-faint)' : 'var(--color-text-faint)',
              transform: hovered ? 'translateX(2px)' : 'none',
            }}
          >
            →
          </span>
        )}
      </a>
    </div>
  )
}
