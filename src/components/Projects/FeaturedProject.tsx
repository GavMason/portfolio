import { MockupContent } from './MockupContent'
import { TopoLines } from '../Effects/TopoLines'
import { useHover } from '../../hooks/useHover'
import type { Project } from '../../data/projects'

interface FeaturedProjectProps {
  project: Project
}

export function FeaturedProject({ project }: FeaturedProjectProps) {
  const [hovered, hoverHandlers] = useHover()

  const Wrapper = project.link ? 'a' : 'div'

  return (
    <Wrapper
      {...(project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...hoverHandlers}
      className="relative rounded-3xl mb-5 p-px cursor-pointer block no-underline"
    >
      {/* Rotating gradient border */}
      <div
        className="absolute rounded-[25px] transition-opacity duration-400"
        style={{
          inset: '-1px',
          background: `linear-gradient(var(--angle, 0deg), rgba(${project.accent},0.2), transparent, rgba(${project.accent},0.1), transparent)`,
          animation: 'border-rotate 8s linear infinite',
          opacity: hovered ? 0.9 : 0.6,
        }}
      />

      <div
        className="rounded-3xl overflow-hidden grid grid-cols-2 relative transition-all duration-500"
        style={{
          background: hovered ? 'var(--color-surface-card)' : 'rgba(7,7,13,0.95)',
          border: `1px solid ${hovered ? `rgba(${project.accent},0.15)` : 'var(--color-border)'}`,
          transform: hovered ? 'translateY(-4px)' : 'none',
          boxShadow: hovered ? `0 24px 60px rgba(${project.accent},0.1)` : 'none',
        }}
      >
        {/* Preview */}
        <div
          className="relative flex items-center justify-center min-h-65 overflow-hidden"
          style={{ background: project.preview }}
        >
          <TopoLines style={{ opacity: 0.4 }} />
          <div
            className="rounded-[10px] overflow-hidden relative z-1 transition-all duration-500 w-[70%] h-[65%] bg-bg-dark border border-border-light"
            style={{
              opacity: hovered ? 1 : 0.6,
              transform: hovered ? 'scale(1.02)' : 'scale(0.97)',
            }}
          >
            <div className="h-5.5 flex items-center px-2.5 gap-1.25 bg-surface border-b border-border">
              <div className="w-1.5 h-1.5 rounded-full bg-dot-red-soft" />
              <div className="w-1.5 h-1.5 rounded-full bg-dot-yellow-soft" />
              <div className="w-1.5 h-1.5 rounded-full bg-dot-green-soft" />
            </div>
            <MockupContent type={project.mockup} accent={project.accent} />
          </div>
        </div>

        {/* Content */}
        <div className="p-10 flex flex-col justify-center">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-2xl font-bold text-text-primary">{project.title}</h3>
            <span
              className="text-base inline-block transition-all duration-300"
              style={{
                color: hovered ? `rgba(${project.accent},0.6)` : 'var(--color-text-ghost)',
                transform: hovered ? 'translateX(3px)' : 'none',
              }}
            >
              →
            </span>
          </div>
          <p className="text-[15px] leading-relaxed mb-6 text-text-mid">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t, j) => (
              <span
                key={j}
                className="text-[11px] font-medium px-3.5 py-1.5 rounded-lg"
                style={{
                  color: `rgba(${project.accent},0.75)`,
                  background: `rgba(${project.accent},0.06)`,
                  border: `1px solid rgba(${project.accent},0.1)`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
