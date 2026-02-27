import { useState } from 'react'
import { STATS } from '../../data/stats'

export function Ticker() {
  const [paused, setPaused] = useState(false)

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative z-3 overflow-hidden py-4 border-y border-border bg-[rgba(255,255,255,0.01)]"
    >
      <div
        className="flex gap-16 whitespace-nowrap w-max"
        style={{
          animation: 'ticker-scroll 20s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {/* Repeat items 3× so the loop animation appears seamless as it scrolls */}
        {[...Array(3)].flatMap((_, rep) =>
          STATS.map((s, i) => (
            <span key={`${rep}-${i}`} className="inline-flex items-center gap-3">
              {/* Value */}
              <span className="text-base font-black text-text-primary font-mono">
                {s.value}
              </span>
              {/* Label */}
              <span className="text-xs tracking-widest uppercase text-text-dim">
                {s.label}
              </span>
              {/* Separator */}
              <span className="mx-2 text-accent-subtle">✦</span>
            </span>
          ))
        )}
      </div>
    </div>
  )
}
