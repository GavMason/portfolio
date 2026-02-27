import { Reveal } from '../UI/Reveal'
import { AboutInfoCard } from './AboutInfoCard'
import { TopoLines } from '../Effects/TopoLines'
import { SectionHeader } from '../UI/SectionHeader'

export function About() {
  return (
    <section id="about" className="relative z-3 pt-40 pb-35 px-5 md:px-10">
      <div className="max-w-250 mx-auto">
        <SectionHeader number="01" title="About" sectionId="about" />

        <div className="grid gap-5" style={{ gridTemplateColumns: 'auto 1fr' }}>
          {/* Avatar placeholder */}
          <Reveal delay={50}>
            <div
              className="w-50 h-50 rounded-3xl flex items-center justify-center overflow-hidden relative border border-border-light"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.1), rgba(99,102,241,0.06), rgba(59,130,246,0.04))',
              }}
            >
              <TopoLines style={{ opacity: 0.3 }} />
              <div className="absolute inset-0 flex items-center justify-center">
                {[70, 50, 30].map((s, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-accent-faint"
                    style={{ width: `${s}%`, height: `${s}%` }}
                  />
                ))}
              </div>
              <div className="relative z-1 text-center">
                <div className="w-14 h-14 rounded-2xl mx-auto mb-2.5 flex items-center justify-center text-2xl bg-accent-faint border border-accent-border">
                  👨‍💻
                </div>
                <span className="text-[9px] font-mono tracking-[1.5px] uppercase text-accent-muted">
                  Photo TBD
                </span>
              </div>
            </div>
          </Reveal>

          {/* Bio + info cards */}
          <div className="grid grid-rows-[1fr_auto] gap-5">
            <Reveal delay={100}>
              <div className="rounded-[20px] p-9 relative overflow-hidden bg-surface border border-border">
                <div
                  className="absolute top-0 left-9 right-9 h-px"
                  style={{ background: 'linear-gradient(to right, transparent, var(--color-accent-subtle), transparent)' }}
                />
                <p className="text-base leading-relaxed text-text-subtle">
                  I studied Computer Science at UCF and graduated in 2024. Since then I've been working as a software engineer doing applied cybersecurity and ML - building production systems, deploying secure solutions, and figuring out how to explain what I built to people who don't write code.
                </p>
                <p className="text-base leading-relaxed mt-5 text-text-subtle">
                  What I enjoy most is taking something from an idea to a working thing. Could be a web app, an ML pipeline, a monitoring stack - the fun part is making it real and watching it work.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 gap-5">
              <AboutInfoCard hoverAccent="59,130,246" delay={200}>
                <p
                  className="text-[11px] font-semibold tracking-[2px] uppercase mb-2 font-mono"
                  style={{ color: 'rgba(59,130,246,0.6)' }}
                >
                  Education
                </p>
                <p className="text-[17px] font-bold text-text-primary">UCF</p>
                <p className="text-[13px] mt-1 text-text-muted">
                  B.S. Computer Science
                </p>
              </AboutInfoCard>

              <AboutInfoCard hoverAccent="245,158,66" delay={300}>
                <p
                  className="text-[11px] font-semibold tracking-[2px] uppercase mb-2 font-mono"
                  style={{ color: 'rgba(245,158,66,0.6)' }}
                >
                  After Hours
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {['🎮 Retro Gaming', '🖥️ Homelab', '🛠️ Side Projects', '🧪 Experimenting'].map((hobby, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-lg text-text-body bg-border border border-border"
                    >
                      {hobby}
                    </span>
                  ))}
                </div>
              </AboutInfoCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
