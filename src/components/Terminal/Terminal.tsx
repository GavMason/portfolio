import { useState, useEffect, useRef } from 'react'
import { useInView } from '../../hooks/useInView'
import { TERMINAL_LINES } from '../../data/terminal'
import type { TerminalLine } from '../../data/terminal'

export function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [ref, visible] = useInView(0.3)
  const started = useRef(false)
  const empty = lines.length === 0

  useEffect(() => {
    // Guard so scrolling back into view doesn't restart mid-animation
    if (!visible || started.current) return
    started.current = true

    let idx = 0
    let replayTimer: ReturnType<typeof setTimeout>

    const interval = setInterval(() => {
      if (idx >= TERMINAL_LINES.length) {
        clearInterval(interval)
        // Replay after 60s - clear lines and re-trigger
        replayTimer = setTimeout(() => {
          setLines([])
          started.current = false
        }, 60_000)
        return
      }
      const line = TERMINAL_LINES[idx]
      idx++
      setLines((prev) => [...prev, line])
    }, 400)

    return () => {
      clearInterval(interval)
      clearTimeout(replayTimer)
    }
  }, [visible, empty])

  return (
    <div
      ref={ref}
      className="rounded-2xl overflow-hidden font-mono relative bg-bg-dark border border-border-light"
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-2 opacity-60"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
        }}
      />

      {/* Title bar */}
      <div className="px-4 py-3 flex items-center gap-2 relative z-3 border-b border-border-hover bg-surface">
        <div className="w-2.5 h-2.5 rounded-full bg-dot-red" />
        <div className="w-2.5 h-2.5 rounded-full bg-dot-yellow" />
        <div className="w-2.5 h-2.5 rounded-full bg-dot-green" />
        <span className="ml-2 text-[11px] text-text-dim">~/gav</span>
      </div>

      {/* Body */}
      <div className="p-5 min-h-55 relative z-3">
        {lines.map((l, i) => (
          <div
            key={i}
            className="text-[13px]"
            style={{
              lineHeight: 1.8,
              color: l.prompt ? 'var(--color-accent-light-strong)' : 'var(--color-text-mid)',
              opacity: 0,
              animation: 'term-fade 0.3s ease forwards',
              animationDelay: `${i * 50}ms`, // Stagger each line's fade-in slightly
            }}
          >
            {l.prompt && <span className="mr-2" style={{ color: 'rgba(74,222,128,0.7)' }}>❯</span>}
            {l.text}
          </div>
        ))}
        <span
          className="inline-block w-2 h-4 mt-1 bg-accent-light-muted"
          style={{ animation: 'blink 1.2s step-end infinite' }}
        />
      </div>
    </div>
  )
}
