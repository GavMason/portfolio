import { Parallax } from '../UI/Parallax'
import { Reveal } from '../UI/Reveal'
import { ContactCard } from './ContactCard'
import { TopoLines } from '../Effects/TopoLines'
import { SectionHeader } from '../UI/SectionHeader'
import { CONTACT_LINKS } from '../../data/contact'

export function Contact() {
  return (
    <section
      id="contact"
      className="relative z-3 overflow-hidden pt-35 pb-25 px-5 md:px-10"
    >
      <Parallax offset={20}>
        <TopoLines style={{ opacity: 0.4 }} />
      </Parallax>

      <div className="max-w-150 mx-auto relative z-1">
        <SectionHeader
          number="05"
          title="Let's talk."
          subtitle="Open to work, side project collabs, or just nerding out about something you're building."
          sectionId="contact"
        />
        <Reveal delay={100}>
          <p className="text-sm mb-10 -mt-8 ml-9.5 text-text-dim">
            Best way to reach me is email. I try to respond to everything.
          </p>
        </Reveal>

        <div className="flex gap-4 flex-wrap justify-center">
          {CONTACT_LINKS.map((l, i) => (
            <ContactCard key={i} link={l} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}
