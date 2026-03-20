import { useState } from 'react'
import { STATS } from '../../data/stats'

const BLOCK = STATS.map((s, i) => (
  <span key={i} className="inline-flex items-center gap-3">
    <span className="text-base font-black text-text-primary font-mono">
      {s.value}
    </span>
    <span className="text-xs tracking-widest uppercase text-text-dim">
      {s.label}
    </span>
    <span className="mx-2 text-accent-subtle">✦</span>
  </span>
))

export function Ticker() {
  const [paused, setPaused] = useState(false)

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative z-3 overflow-hidden py-4 border-y border-border bg-[rgba(255,255,255,0.01)]"
    >
      {/* Repeat enough copies to always fill the viewport. The animation
          scrolls exactly one copy's width, then resets seamlessly. */}
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: 'ticker-scroll 20s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
          width: 'max-content',
        }}
      >
        {Array.from({ length: 4 }, (_, i) => (
          <div
            key={i}
            className="flex gap-16 shrink-0 pr-16"
            aria-hidden={i > 0 || undefined}
          >
            {BLOCK}
          </div>
        ))}
      </div>
    </div>
  )
}
