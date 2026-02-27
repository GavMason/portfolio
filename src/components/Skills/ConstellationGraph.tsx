import { useState } from 'react'
import { SKILLS_DATA, CAT_COLORS, CAT_LABELS, CONNECTIONS } from '../../data/skills'
import { SkillTooltip } from './SkillTooltip'
import { useInView } from '../../hooks/useInView'

export function ConstellationGraph() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [ref, visible] = useInView(0.1)
  const [activeCat, setActiveCat] = useState<number | null>(null)

  // Resolve which category to highlight - hover takes priority
  const hoveredCat = hovered !== null ? SKILLS_DATA[hovered]?.cat : null
  const effectiveCat = hoveredCat !== null ? hoveredCat : activeCat

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative w-full" style={{ paddingTop: '55%' }}>
        <svg
          viewBox="-8 -4 166 100"
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {/* SVG glow filters */}
          <defs>
            {CAT_COLORS.map((_, i) => (
              <filter key={i} id={`glow${i}`}>
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {/* Connections - only within categories */}
          {CONNECTIONS.map(({ i, j }, k) => {
            const a = SKILLS_DATA[i]
            const b = SKILLS_DATA[j]
            const active = hovered !== null && (hovered === i || hovered === j)
            const bothCat = effectiveCat !== null && a.cat === effectiveCat
            const dim = effectiveCat !== null && a.cat !== effectiveCat

            return (
              <line
                key={k}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={
                  active
                    ? CAT_COLORS[a.cat].fill
                    : bothCat
                    ? `rgba(${CAT_COLORS[a.cat].glow},0.2)`
                    : dim
                    ? 'rgba(255,255,255,0.01)'
                    : 'rgba(255,255,255,0.04)'
                }
                strokeWidth={active ? 0.4 : 0.18}
                style={{ transition: 'all 0.5s cubic-bezier(.4,0,.2,1)' }}
              />
            )
          })}

          {/* Nodes */}
          {SKILLS_DATA.map((s, i) => {
            const isH = hovered === i
            const isCat = effectiveCat === s.cat && !isH
            const dim = effectiveCat !== null && effectiveCat !== s.cat && !isH
            const col = CAT_COLORS[s.cat]
            const nodeR = isH ? s.r * 0.8 : isCat ? s.r * 0.65 : s.r * 0.5

            return (
              <g
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                {/* Hover halo */}
                {isH && (
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={s.r + 2.5}
                    fill={`rgba(${col.glow},0.04)`}
                    stroke={`rgba(${col.glow},0.12)`}
                    strokeWidth="0.3"
                  />
                )}
                {/* Main dot */}
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={nodeR}
                  fill={
                    isH
                      ? col.fill
                      : isCat
                      ? `rgba(${col.glow},0.4)`
                      : dim
                      ? 'rgba(255,255,255,0.03)'
                      : 'rgba(255,255,255,0.07)'
                  }
                  filter={isH ? `url(#glow${s.cat})` : 'none'}
                  style={{ transition: 'all 0.4s cubic-bezier(.4,0,.2,1)' }}
                />
                {/* Center highlight on hover */}
                {isH && (
                  <circle cx={s.x} cy={s.y} r={nodeR * 0.3} fill="rgba(255,255,255,0.6)" />
                )}
                {/* Label */}
                <text
                  x={s.x}
                  y={s.y + s.r + 3}
                  textAnchor="middle"
                  fontSize={isH ? '2.8' : '2.1'}
                  fill={
                    isH
                      ? col.fill
                      : isCat
                      ? `rgba(${col.glow},0.7)`
                      : dim
                      ? 'rgba(255,255,255,0)'
                      : 'rgba(255,255,255,0.15)'
                  }
                  fontFamily="'Satoshi', sans-serif"
                  fontWeight={isH ? '700' : isCat ? '500' : '400'}
                  style={{ transition: 'all 0.4s', pointerEvents: 'none' }}
                >
                  {s.name}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Tooltip */}
        {hovered !== null && (() => {
          const s = SKILLS_DATA[hovered]
          return <SkillTooltip skill={s} x={(s.x / 150) * 100} y={(s.y / 96) * 100} color={CAT_COLORS[s.cat]} />
        })()}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-3 justify-center mt-4 relative z-10">
        {CAT_LABELS.map((label, i) => {
          const isActive = effectiveCat === i
          const isDim = effectiveCat !== null && effectiveCat !== i

          return (
            <button
              key={i}
              onClick={() => setActiveCat((prev) => (prev === i ? null : i))}
              className="flex items-center gap-2 rounded-full px-3.5 py-1.5 outline-none cursor-pointer transition-all duration-400"
              style={{
                background: isActive ? `rgba(${CAT_COLORS[i].glow},0.08)` : 'transparent',
                border: isActive ? `1px solid rgba(${CAT_COLORS[i].glow},0.15)` : '1px solid transparent',
                opacity: isDim ? 0.25 : isActive ? 1 : 0.6,
              }}
            >
              <div
                className="w-1.75 h-1.75 rounded-full"
                style={{
                  background: CAT_COLORS[i].fill,
                  boxShadow: isActive ? `0 0 6px rgba(${CAT_COLORS[i].glow},0.4)` : 'none',
                }}
              />
              <span
                className="text-[11px]"
                style={{
                  color: isActive ? CAT_COLORS[i].fill : 'var(--color-text-body)',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
