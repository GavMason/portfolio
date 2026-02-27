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
      <div className="relative w-full" style={{ paddingTop: '50%' }}>
        <svg
          viewBox="0 0 100 90"
          className="absolute top-0 left-0 w-full h-full transition-opacity duration-1000"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {/* SVG glow filters - one per category color */}
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

          {/* Connections */}
          {CONNECTIONS.map(({ i, j }, k) => {
            const a = SKILLS_DATA[i]
            const b = SKILLS_DATA[j]
            const active = hovered !== null && (hovered === i || hovered === j)
            const bothCat = effectiveCat !== null && a.cat === effectiveCat && b.cat === effectiveCat

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
                    ? `rgba(${CAT_COLORS[a.cat].glow},0.25)`
                    : 'rgba(255,255,255,0.025)'
                }
                strokeWidth={active ? 0.5 : bothCat ? 0.25 : 0.12}
                style={{ transition: 'all 0.5s cubic-bezier(.4,0,.2,1)' }}
              />
            )
          })}

          {/* Nodes - each skill renders as a circle with 3 visual states: hovered, same-category, or dimmed */}
          {SKILLS_DATA.map((s, i) => {
            const isH = hovered === i
            const isCat = effectiveCat === s.cat && !isH
            const dim = effectiveCat !== null && effectiveCat !== s.cat && !isH
            const col = CAT_COLORS[s.cat]
            // Scale node radius based on state
            const nodeR = isH ? s.r * 0.7 : isCat ? s.r * 0.55 : s.r * 0.45

            return (
              <g
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="cursor-pointer"
              >
                {/* Animated pulsing halo around hovered node */}
                {isH && (
                  <>
                    <circle cx={s.x} cy={s.y} r={s.r + 3} fill="none" stroke={`rgba(${col.glow},0.08)`} strokeWidth="0.4">
                      <animate attributeName="r" values={`${s.r + 2.5};${s.r + 3.5};${s.r + 2.5}`} dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={s.x} cy={s.y} r={s.r + 1.8} fill={`rgba(${col.glow},0.04)`} />
                  </>
                )}
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={nodeR}
                  fill={
                    isH
                      ? col.fill
                      : isCat
                      ? col.fill.replace('0.9', '0.4').replace('0.85', '0.35')
                      : dim
                      ? 'rgba(255,255,255,0.04)'
                      : 'rgba(255,255,255,0.08)'
                  }
                  filter={isH ? `url(#glow${s.cat})` : 'none'}
                  style={{ transition: 'all 0.4s cubic-bezier(.4,0,.2,1)' }}
                />
                {/* Bright center dot on hovered node */}
                {isH && (
                  <circle cx={s.x} cy={s.y} r={nodeR * 0.35} fill={col.fill.replace('0.9', '1').replace('0.85', '1')} />
                )}
                {/* Ring outline on hovered/active-category nodes */}
                {(isH || isCat) && (
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={nodeR + 0.6}
                    fill="none"
                    stroke={isH ? col.fill : `rgba(${col.glow},0.15)`}
                    strokeWidth={isH ? '0.25' : '0.15'}
                    opacity={isH ? 0.5 : 0.3}
                  />
                )}
                {/* Label */}
                <text
                  x={s.x}
                  y={s.y + s.r + 3}
                  textAnchor="middle"
                  fontSize={isH ? '2.6' : '1.9'}
                  fill={
                    isH
                      ? col.fill
                      : dim
                      ? 'rgba(255,255,255,0.08)'
                      : isCat
                      ? `rgba(${col.glow},0.7)`
                      : 'rgba(255,255,255,0.28)'
                  }
                  fontFamily="'Satoshi', sans-serif"
                  fontWeight={isH ? '700' : isCat ? '500' : '400'}
                  style={{ transition: 'all 0.4s' }}
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
          return <SkillTooltip skill={s} x={s.x} y={(s.y / 90) * 100} color={CAT_COLORS[s.cat]} />
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
