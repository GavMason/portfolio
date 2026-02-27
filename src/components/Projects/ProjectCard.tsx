import { useState } from 'react'
import { MockupContent } from './MockupContent'
import type { Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-[20px] overflow-hidden transition-all duration-500 bg-surface"
      style={{
        border: `1px solid ${hovered ? `rgba(${project.accent},0.2)` : 'var(--color-border)'}`,
        transform: hovered ? 'translateY(-6px)' : 'none',
        boxShadow: hovered ? `0 24px 60px rgba(${project.accent},0.08)` : 'none',
      }}
    >
      {/* Preview */}
      <div
        className="relative flex items-center justify-center overflow-hidden transition-all duration-500"
        style={{ height: hovered ? '160px' : '120px', background: project.preview }}
      >
        <div
          className="rounded-lg overflow-hidden transition-all duration-500 w-3/4 h-[70%] bg-bg-dark border border-border-light"
          style={{
            opacity: hovered ? 1 : 0.5,
            transform: hovered ? 'scale(1.02)' : 'scale(0.95)',
          }}
        >
          <div className="h-4.5 flex items-center px-2 gap-1 bg-surface border-b border-border">
            <div className="w-1.25 h-1.25 rounded-full bg-dot-red-soft" />
            <div className="w-1.25 h-1.25 rounded-full bg-dot-yellow-soft" />
            <div className="w-1.25 h-1.25 rounded-full bg-dot-green-soft" />
          </div>
          <MockupContent type={project.mockup} accent={project.accent} />
        </div>
        {project.status === 'coming-soon' && (
          <div
            className="absolute top-3 right-3 text-[10px] font-semibold uppercase tracking-[1.5px] px-3 py-1 rounded-full text-accent-yellow backdrop-blur-lg"
            style={{
              background: 'rgba(0,0,0,0.5)',
              border: '1px solid rgba(251,191,36,0.15)',
            }}
          >
            Soon
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-7">
        <div className="flex justify-between items-center mb-2.5">
          <h3 className="text-xl font-bold text-text-primary">{project.title}</h3>
          {project.link && (
            <span
              className="text-sm inline-block transition-all duration-300"
              style={{
                color: hovered ? `rgba(${project.accent},0.6)` : 'var(--color-text-faint)',
                transform: hovered ? 'translateX(2px)' : 'none',
              }}
            >
              →
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed mb-5 text-text-muted">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((t, j) => (
            <span
              key={j}
              className="text-[11px] font-medium px-3 py-1 rounded-lg"
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
  )
}
