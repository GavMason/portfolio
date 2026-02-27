import { useState, useEffect } from 'react'

interface PageLoaderProps {
  onDone: () => void
}

export function PageLoader({ onDone }: PageLoaderProps) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    // Phase 1: Fade in logo
    // Phase 2: Fade out the overlay
    // Phase 3: Unmount loader + notify parent
    const t1 = setTimeout(() => setPhase(1), 400)
    const t2 = setTimeout(() => setPhase(2), 900)
    const t3 = setTimeout(() => {
      setPhase(3)
      onDone()
    }, 1300)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [onDone])

  if (phase >= 3) return null

  return (
    <div
      className="fixed inset-0 z-9999 bg-bg flex items-center justify-center"
      style={{
        opacity: phase >= 2 ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      <span
        className="text-[28px] font-black text-accent-light"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? 'none' : 'translateY(10px)',
          transition: 'all 0.4s ease',
        }}
      >
        gav.
      </span>
    </div>
  )
}
