import { useState, useEffect } from 'react'
import { NAV } from '../../data/navigation'

interface NavbarProps {
  active: string
}

export function Navbar({ active }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)

  useEffect(() => {
    // Handle scroll effect.
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-100 flex justify-between items-center px-5 md:px-10"
      style={{
        padding: scrolled ? '14px 40px' : '20px 40px',
        background: scrolled ? 'rgba(7,7,13,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        transition: 'padding 0.2s ease, background 0.2s ease, border-bottom 0.2s ease',
      }}
    >
      {/* Logo */}
      <a
        href="#hero"
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
        className="text-xl font-black no-underline inline-block transition-all duration-300"
        style={{
          color: logoHovered ? 'var(--color-accent-mid)' : 'var(--color-accent-light)',
          transform: logoHovered ? 'scale(1.08)' : 'scale(1)',
        }}
      >
        gav.
      </a>
      {/* Nav links */}
      <div className="flex gap-4 md:gap-8">
        {NAV.map((n) => (
          <a
            key={n.href}
            href={n.href}
            className={`no-underline text-[10px] md:text-xs font-medium tracking-widest uppercase transition-colors duration-300 relative ${
              active === n.href.slice(1) ? 'text-accent-light-strong' : 'text-text-soft hover:text-accent-light'
            }`}
          >
            {n.label}
            {/* Active indicator dot */}
            {active === n.href.slice(1) && (
              <span
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0.75 h-0.75 rounded-full bg-accent-light-muted"
                style={{ boxShadow: '0 0 6px rgba(196,181,253,0.3)' }}
              />
            )}
          </a>
        ))}
      </div>
    </nav>
  )
}
