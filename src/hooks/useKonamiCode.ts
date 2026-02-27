import { useRef, useEffect } from 'react'
import { KONAMI } from '../data/constants'

export function useKonami(callback: () => void): void {
  const pos = useRef(0)

  // Track sequential key matches - resets on wrong key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[pos.current]) {
        pos.current++
        if (pos.current === KONAMI.length) {
          callback()
          pos.current = 0
        }
      } else {
        pos.current = 0
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [callback])
}
