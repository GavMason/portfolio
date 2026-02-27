import { useState, useEffect, useRef } from 'react'

export function useParallax(speed = 0.1): [React.RefObject<HTMLDivElement | null>, number] {
  const [offset, setOffset] = useState(0)
  const ref = useRef<HTMLDivElement | null>(null)

  // Compute vertical offset based on element's distance from viewport center
  useEffect(() => {
    const handler = () => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const center = rect.top + rect.height / 2
      const vh = window.innerHeight
      setOffset(((center - vh / 2) / vh) * speed * 100)
    }

    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [speed])

  return [ref, offset]
}
