import type { Skill, CatColor } from '../../data/skills'
import { CAT_LABELS } from '../../data/skills'

interface SkillTooltipProps {
  skill: Skill
  x: number
  y: number
  color: CatColor
}

export function SkillTooltip({ skill, x, y, color }: SkillTooltipProps) {
  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -120%)',
        animation: 'tooltip-in 0.25s cubic-bezier(.4,0,.2,1) forwards',
      }}
    >
      <div
        className="rounded-xl p-3 min-w-35 bg-surface-glass backdrop-blur-md"
        style={{
          border: `1px solid rgba(${color.glow},0.2)`,
          boxShadow: `0 12px 32px rgba(0,0,0,0.4), 0 0 20px rgba(${color.glow},0.06)`,
        }}
      >
        {/* Skill name */}
        <div className="text-[13px] font-bold mb-2" style={{ color: color.fill }}>{skill.name}</div>
        {/* Category label */}
        <div className="text-[10px] tracking-widest uppercase font-mono mb-1.5 text-text-soft">
          {CAT_LABELS[skill.cat]}
        </div>
        {/* Proficiency bar */}
        <div className="w-full h-1 rounded-sm overflow-hidden bg-border-light">
          <div
            className="h-full rounded-sm"
            style={{
              background: `linear-gradient(to right, rgba(${color.glow},0.6), rgba(${color.glow},0.9))`,
              width: '0%',
              animation: `profFill 0.6s cubic-bezier(.4,0,.2,1) 0.1s forwards`,
            }}
          />
        </div>
        {/* Percentage readout */}
        <div className="text-[10px] mt-1 text-right font-mono text-text-dim">
          {skill.prof}%
        </div>
      </div>
      {/* Inline keyframe so each tooltip animates to its own proficiency value */}
      <style>{`@keyframes profFill { to { width: ${skill.prof}%; } }`}</style>
    </div>
  )
}
