import { Reveal } from '../UI/Reveal'
import { SectionHeader } from '../UI/SectionHeader'
import { ConstellationGraph } from './ConstellationGraph'

export function Skills() {
  return (
    <section id="skills" className="relative z-3 pt-25 pb-40 px-5 md:px-10">
      <div className="max-w-250 mx-auto">
        <SectionHeader
          number="03"
          title="Tech Stack"
          subtitle="Hover to explore, click categories to filter. Bigger nodes = tools I reach for most."
          sectionId="skills"
        />
        <Reveal delay={100}>
          <div className="rounded-3xl px-8 pt-10 pb-6 bg-[rgba(255,255,255,0.015)] border border-border">
            <ConstellationGraph />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
