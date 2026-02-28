import { PROJECTS } from '../../data/projects'
import { Reveal } from '../UI/Reveal'
import { SectionHeader } from '../UI/SectionHeader'
import { FeaturedProject } from './FeaturedProject'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  return (
    <section id="projects" className="relative z-3 pt-25 pb-40 px-5 md:px-10">
      <div className="max-w-250 mx-auto">
        <SectionHeader
          number="02"
          title="Projects"
          subtitle="Things I'm building on my own time."
          sectionId="projects"
        />

        {/* Featured project */}
        <Reveal delay={100}>
          <FeaturedProject project={PROJECTS[0]} />
        </Reveal>

        {/* Remaining projects in a grid */}
        <div className="grid grid-cols-2 gap-5">
          {PROJECTS.slice(1).map((p, i) => (
            <Reveal key={i} delay={200 + i * 100}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        {/* "View all" link */}
        <Reveal delay={400}>
          <div className="text-center mt-10">
            <a
              href={import.meta.env.VITE_ALL_PROJECTS_URL || '#'}
              className="no-underline text-[13px] font-medium pb-1 text-accent-light-faint border-b border-transparent hover:border-accent-light-faint transition-all duration-300"
            >
              View all projects →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
