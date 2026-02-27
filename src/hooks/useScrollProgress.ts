import { useState, useEffect } from 'react'

export function useScrollProgress(): number {
  const [progress, setProgress] = useState(0)

  // Returns 0–1 representing how far down the page the user has scrolled
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? scrollY / docHeight : 0)
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return progress
}
