import { Reveal } from '../UI/Reveal'
import { ContactCard } from './ContactCard'
import { TopoLines } from '../Effects/TopoLines'
import { CONTACT_LINKS } from '../../data/contact'

export function Contact() {
  return (
    <section id="contact" className="relative z-3 overflow-hidden pt-35 pb-25 px-5 md:px-10">
      <TopoLines style={{ opacity: 0.4 }} />

      <div className="max-w-150 mx-auto relative z-1">
        <Reveal>
          <span className="text-sm font-medium tracking-[2px] font-mono text-accent-muted">
            05
          </span>
          <h2 className="text-[40px] font-black tracking-tight mt-2 mb-5">Let's talk.</h2>
          <p className="text-[17px] leading-relaxed mb-4 text-text-muted">
            I'm always happy to chat - whether it's about a role, a collaboration, or something interesting being built.
          </p>
          <p className="text-sm mb-10 text-text-dim">
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
