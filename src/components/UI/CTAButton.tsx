import { useState, type ReactNode } from 'react'

interface CTAButtonProps {
  href: string
  primary?: boolean
  children: ReactNode
}

export function CTAButton({ href, primary, children }: CTAButtonProps) {
  const [hovered, setHovered] = useState(false)

  // Primary variant - gradient background with glow shadow
  if (primary) {
    return (
      <a
        href={href}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="px-7.5 py-3.5 rounded-[14px] text-white no-underline font-semibold text-sm transition-all duration-300 bg-linear-to-br from-accent to-accent-indigo"
        style={{
          boxShadow: hovered
            ? '0 8px 32px var(--color-accent-glow), inset 0 1px 0 rgba(255,255,255,0.15)'
            : '0 4px 24px var(--color-accent-border-hover), inset 0 1px 0 rgba(255,255,255,0.1)',
          transform: hovered ? 'translateY(-2px)' : 'none',
        }}
      >
        {children}
      </a>
    )
  }

  // Secondary variant - outlined with subtle surface background
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="px-7.5 py-3.5 rounded-[14px] no-underline font-medium text-sm transition-all duration-300"
      style={{
        background: hovered
          ? 'var(--color-surface-hover)'
          : 'var(--color-surface)',
        border: `1px solid ${hovered ? 'var(--color-border-strong)' : 'var(--color-border-hover)'}`,
        color: hovered ? 'rgba(255,255,255,0.8)' : 'var(--color-text-subtle)',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {children}
    </a>
  )
}
