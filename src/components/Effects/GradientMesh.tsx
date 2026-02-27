import { useState, useEffect, useRef } from 'react'

export function GradientMesh() {
  const [time, setTime] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Scroll tracking for parallax shift
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Animation loop - drives time-based oscillation of gradient positions
    const start = performance.now()
    const animate = (now: number) => {
      setTime((now - start) * 0.0004) // Scale ms -> slow float for oscillation
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const s = scrollY * 0.008 // Scroll coupling strength - higher = more parallax shift
  const t = time

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Four overlapping radial gradients that drift with time + scroll */}
      <div
        className="absolute opacity-80"
        style={{
          width: '160%',
          height: '160%',
          top: '-30%',
          left: '-30%',
          background: `
            radial-gradient(ellipse 50% 60% at ${30 + Math.sin(t * 0.7 + s * 0.02) * 12}% ${25 + Math.cos(t * 0.5 + s * 0.015) * 15}%, rgba(139,92,246,0.14) 0%, transparent 65%),
            radial-gradient(ellipse 45% 55% at ${70 + Math.cos(t * 0.6 + s * 0.018) * 10}% ${50 + Math.sin(t * 0.8 + s * 0.012) * 18}%, rgba(99,102,241,0.10) 0%, transparent 65%),
            radial-gradient(ellipse 55% 45% at ${45 + Math.sin(t * 0.9 + s * 0.025) * 14}% ${75 + Math.cos(t * 0.4 + s * 0.02) * 12}%, rgba(59,130,246,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 40% 50% at ${82 + Math.cos(t * 0.5 + s * 0.01) * 8}% ${18 + Math.sin(t * 0.7 + s * 0.022) * 10}%, rgba(236,72,153,0.06) 0%, transparent 65%)
          `,
        }}
      />
    </div>
  )
}
