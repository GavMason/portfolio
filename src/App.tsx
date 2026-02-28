import { useState, useEffect, useCallback } from 'react'
import { Navbar } from './components/Layout/Navbar'
import { Footer } from './components/Layout/Footer'
import { Hero } from './components/Hero/Hero'
import { About } from './components/About/About'
import { Projects } from './components/Projects/Projects'
import { Skills } from './components/Skills/Skills'
import { Now } from './components/Terminal/Now'
import { Contact } from './components/Contact/Contact'
import { CommandPalette } from './components/CommandPalette/CommandPalette'
import { GlowCursor } from './components/Effects/GlowCursor'
import { GradientMesh } from './components/Effects/GradientMesh'
import { NoiseOverlay } from './components/Effects/NoiseOverlay'
import { ScrollProgress } from './components/UI/ScrollProgress'
import { BackToTop } from './components/UI/BackToTop'
import { PageLoader } from './components/UI/PageLoader'
import { Ticker } from './components/UI/Ticker'
import { DVDScreensaver } from './components/EasterEggs/DVDScreensaver'
import { GravityMode } from './components/EasterEggs/GravityMode'
import { SectionDivider } from './components/UI/SectionDivider'
import { CmdKHint } from './components/UI/CmdKHint'
import { NotFound } from './components/NotFound/NotFound'
import { NAV } from './data/navigation'

function App() {
  const is404 = window.location.pathname !== '/'

  // State
  const [active, setActive] = useState('hero')
  const [cmdOpen, setCmdOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [dvdMode, setDvdMode] = useState(false)
  const [gravityMode, setGravityMode] = useState(false)
  const [cmdUsed, setCmdUsed] = useState(false)

  // Callbacks
  const handleLoaded = useCallback(() => setLoaded(true), [])

  // Track active section
  useEffect(() => {
    const ids = ['hero', ...NAV.map((n) => n.href.slice(1))]
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id)
      }),
      { threshold: 0.2 }
    )

    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Command palette keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdOpen((p) => !p)
        setCmdUsed(true)
      }
      if (e.key === 'Escape') setCmdOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <div className="min-h-screen bg-bg text-text-secondary font-sans relative overflow-x-hidden cursor-none">
      <GlowCursor />
      <DVDScreensaver show={dvdMode} onClose={() => setDvdMode(false)} />
      <GravityMode show={gravityMode} onClose={() => setGravityMode(false)} />
      {!is404 && <PageLoader onDone={handleLoaded} />}
      {!is404 && <ScrollProgress />}
      <GradientMesh />
      <NoiseOverlay />
      {!is404 && (
        <>
          <Navbar active={active} />
          <CommandPalette
            open={cmdOpen}
            onClose={() => setCmdOpen(false)}
            onTriggerDvd={() => { setCmdOpen(false); setDvdMode(true) }}
            onTriggerGravity={() => { setCmdOpen(false); setGravityMode(true) }}
          />
          <BackToTop />
          <CmdKHint
            dismissed={cmdUsed}
            onClick={() => { setCmdOpen(true); setCmdUsed(true) }}
          />
        </>
      )}

      {is404 ? (
        <NotFound />
      ) : (
        <>
          <Hero loaded={loaded} />
          <Ticker />

          <About />
          <SectionDivider />

          <Projects />
          <SectionDivider />

          <Skills />
          <SectionDivider />

          <Now />
          <SectionDivider />

          <Contact />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
