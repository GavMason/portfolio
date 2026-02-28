import { useRef, type CSSProperties } from 'react'
import { useInView } from 'framer-motion'
import type { ContactLink } from '../../data/contact'

interface ContactCardProps {
  link: ContactLink
  delay?: number
}

export function ContactCard({ link, delay = 0 }: ContactCardProps) {
  const ref = useRef(null)
  const visible = useInView(ref, { once: true, amount: 0.2 })

  const accent = link.isResume ? '74,222,128' : '139,92,246'

  return (
    <div ref={ref}>
      <a
        href={link.href}
        className="group inline-flex items-center justify-center gap-3 rounded-full no-underline px-6 py-3 min-w-36
          bg-surface border border-border transition-all duration-300
          hover:bg-[rgba(var(--_accent),0.08)] hover:border-[rgba(var(--_accent),0.2)]
          hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(var(--_accent),0.1)]"
        style={
          {
            '--_accent': accent,
            opacity: visible ? 1 : 0,
            transform: visible ? undefined : 'translateY(20px)',
            transitionDelay: visible ? '0ms' : `${delay}ms`,
          } as CSSProperties
        }
      >
        <span className="text-text-muted transition-colors duration-200 group-hover:text-[rgba(var(--_accent),0.9)]">
          {link.icon}
        </span>
        <span className="text-sm font-medium text-text-body transition-colors duration-200 group-hover:text-[rgba(var(--_accent),0.9)]">
          {link.label}
        </span>
        {link.isResume ? (
          <span className="text-[9px] font-mono tracking-widest uppercase ml-1 text-text-faint transition-colors duration-200 group-hover:text-[rgba(var(--_accent),0.6)]">
            PDF
          </span>
        ) : (
          <span className="text-xs text-text-faint transition-all duration-200 group-hover:text-[rgba(var(--_accent),0.5)] group-hover:translate-x-0.5">
            →
          </span>
        )}
      </a>
    </div>
  )
}
