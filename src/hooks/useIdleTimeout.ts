import { useEffect } from 'react'

const IDLE_EVENTS = ['mousemove', 'keydown', 'scroll', 'touchstart'] as const

export function useIdleTimeout(callback: () => void, ms: number) {
  useEffect(() => {
    let timer = setTimeout(callback, ms)

    const reset = () => {
      clearTimeout(timer)
      timer = setTimeout(callback, ms)
    }

    IDLE_EVENTS.forEach((e) => window.addEventListener(e, reset))
    return () => {
      clearTimeout(timer)
      IDLE_EVENTS.forEach((e) => window.removeEventListener(e, reset))
    }
  }, [callback, ms])
}
