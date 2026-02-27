import { Reveal } from '../UI/Reveal'
import { SectionHeader } from '../UI/SectionHeader'
import { Terminal } from './Terminal'

export function Now() {
  return (
    <section id="now" className="relative z-3 pt-25 pb-40 px-5 md:px-10">
      <div className="max-w-175 mx-auto">
        <SectionHeader number="04" title="Right Now" subtitle="What's on my desk this week." sectionId="now" />
        <Reveal delay={100}>
          <Terminal />
        </Reveal>
      </div>
    </section>
  )
}
