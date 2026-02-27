import { useState } from 'react'
import { STATS } from '../../data/stats'

const BLOCK = STATS.map((s, i) => (
  <span key={i} className="inline-flex items-center gap-3">
    <span className="text-base font-black text-text-primary font-mono">{s.value}</span>
    <span className="text-xs tracking-widest uppercase text-text-dim">{s.label}</span>
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
      {/* Two identical halves — animation scrolls first half offscreen, then
          resets to 0 which looks identical, creating a seamless loop. */}
      <div
        className="flex gap-16 whitespace-nowrap"
        style={{
          animation: 'ticker-scroll 20s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
          width: 'max-content',
        }}
      >
        <div className="flex gap-16 shrink-0">{BLOCK}</div>
        <div className="flex gap-16 shrink-0" aria-hidden>{BLOCK}</div>
      </div>
    </div>
  )
}
