import { Reveal } from '../UI/Reveal'
import { SectionHeader } from '../UI/SectionHeader'
import { OrbitingStack } from './OrbitingStack'

export function Stack() {
  return (
    <section id="skills" className="relative z-3 pt-25 pb-40 px-5 md:px-10">
      <div className="max-w-250 mx-auto">
        <SectionHeader
          number="03"
          title="Tech Stack"
          subtitle="The tools I reach for most."
          sectionId="skills"
        />
        <Reveal delay={100} from="scale">
          <OrbitingStack />
        </Reveal>
      </div>
    </section>
  )
}
