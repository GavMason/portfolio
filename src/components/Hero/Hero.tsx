import { useState, useEffect, lazy, Suspense } from 'react'
import { TypingText } from './TypingText'
import { CTAButton } from '../UI/CTAButton'
import { ErrorBoundary } from '../UI/ErrorBoundary'

const DotGlobe = lazy(() =>
  import('./DotGlobe').then((m) => ({ default: m.DotGlobe })),
)
import { TopoLines } from '../Effects/TopoLines'
import { HERO_BIO, getGreeting } from '../../data/constants'

const prefersStatic = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches

interface HeroProps {
  loaded: boolean
}

export function Hero({ loaded }: HeroProps) {
  const [phase, setPhase] = useState(prefersStatic ? 3 : 0)
  const [greeting] = useState(getGreeting)

  useEffect(() => {
    if (!loaded || prefersStatic) return
    // Staggered entrance: badge -> heading + globe -> CTAs + scroll indicator
    const timers = [
      setTimeout(() => setPhase(1), 200),
      setTimeout(() => setPhase(2), 600),
      setTimeout(() => setPhase(3), 1000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [loaded])

  // Fade in animation
  const fadeIn = (p: number) => ({
    opacity: phase >= p ? 1 : 0,
    transform: phase >= p ? 'none' : 'translateY(20px)',
    transition: 'all 0.8s cubic-bezier(.4,0,.2,1)',
  })

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative z-3 overflow-x-clip px-5 md:px-10"
    >
      <TopoLines style={{ opacity: 0.7, zIndex: 0 }} />

      <div className="relative z-1 w-full max-w-140 ml-5 md:ml-[clamp(20px,8vw,120px)]">
        {/* Status badge */}
        <div style={fadeIn(1)}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 bg-accent-ghost border border-accent-border">
            <span
              className="w-1.5 h-1.5 rounded-full bg-status-online"
              style={{
                boxShadow: '0 0 8px rgba(34,197,94,0.5)',
                animation: 'pulse 2s ease infinite',
              }}
            />
            <span className="text-xs font-medium text-text-muted">
              Open to opportunities
            </span>
          </div>
        </div>

        {/* Heading + bio */}
        <div style={fadeIn(2)}>
          <h1
            className="font-black leading-[1.05] mb-7 text-[clamp(40px,7vw,68px)]"
            style={{ letterSpacing: '-2px' }}
          >
            <span className="text-text-primary">{greeting} </span>
            <span className="bg-linear-to-br from-accent-light via-accent-mid to-accent-blue bg-clip-text text-transparent pr-px">
              Gav
            </span>
            <span className="text-accent-muted">.</span>
          </h1>
          <p className="leading-relaxed max-w-115 mb-10 text-[clamp(14px,3.5vw,16px)] text-text-mid">
            <TypingText
              text={HERO_BIO}
              trigger={phase >= 2}
              speed={18}
              delay={400}
            />
          </p>
        </div>

        {/* CTAs */}
        <div style={fadeIn(3)}>
          <div className="flex gap-3.5 items-center flex-wrap">
            <CTAButton href="#projects" primary>
              See my work
            </CTAButton>
            <CTAButton href="#contact">Say hello</CTAButton>
            <span className="text-[11px] ml-2 font-mono text-text-faint hidden md:inline">
              press{' '}
              <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-surface-hover border border-border-light">
                ⌘K
              </kbd>
            </span>
          </div>
        </div>
      </div>

      {/* Three.js Globe */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-[2%] hidden md:block w-[42vw] h-[42vw] max-w-125 max-h-125"
        style={{
          opacity: phase >= 2 ? 1 : 0,
          transition: 'opacity 1.5s cubic-bezier(.4,0,.2,1) 0.5s',
        }}
      >
        <ErrorBoundary>
          <Suspense fallback={null}>
            <DotGlobe visible={phase >= 2} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{
          opacity: phase >= 3 ? 0.3 : 0,
          transition: 'opacity 1s ease 0.5s',
        }}
      >
        <div
          className="w-px h-10"
          style={{
            background:
              'linear-gradient(to bottom, var(--color-accent-muted), transparent)',
          }}
        />
      </div>
    </section>
  )
}
