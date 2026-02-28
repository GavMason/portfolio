import { DotGlobe } from '../Hero/DotGlobe'
import { TopoLines } from '../Effects/TopoLines'

export function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center relative z-3 px-5">
      <TopoLines style={{ opacity: 0.4 }} />

      {/* Globe behind the text */}
      <div className="absolute w-[min(90vw,700px)] h-[min(90vw,700px)] opacity-30">
        <DotGlobe visible instant />
      </div>

      {/* Content */}
      <div className="relative z-1 text-center max-w-100">
        <h1
          className="text-[clamp(100px,20vw,180px)] font-black leading-none mb-4 bg-linear-to-br from-accent-light via-accent-mid to-accent-blue bg-clip-text text-transparent"
          style={{ letterSpacing: '-4px' }}
        >
          404
        </h1>
        <p className="text-xl font-semibold mb-3 text-text-primary">
          Lost in space
        </p>
        <p className="text-sm leading-relaxed mb-10 text-text-muted">
          The page you're looking for doesn't exist or has drifted away.
        </p>
        <a
          href="/"
          className="inline-block px-7.5 py-3.5 rounded-[14px] text-white no-underline font-semibold text-sm transition-all duration-300 bg-linear-to-br from-accent to-accent-indigo hover:-translate-y-0.5"
          style={{
            boxShadow: '0 4px 24px var(--color-accent-border-hover), inset 0 1px 0 rgba(255,255,255,0.1)',
          }}
        >
          Take me home
        </a>
      </div>
    </section>
  )
}
