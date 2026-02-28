import { useState, useEffect } from 'react'

interface TypingTextProps {
  text: string
  trigger: boolean
  speed?: number
  delay?: number
}

const prefersStatic = window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function TypingText({ text, trigger, speed = 22, delay = 0 }: TypingTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Delay before typing begins
  useEffect(() => {
    if (!trigger) return
    if (prefersStatic) {
      setStarted(true)
      setDisplayed(text)
      setShowCursor(false)
      return
    }
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [trigger, delay, text])

  // Character-by-character typing animation
  useEffect(() => {
    if (!started || prefersStatic) return
    let i = 0
    const interval = setInterval(() => {
      i++
      if (i <= text.length) {
        setDisplayed(text.slice(0, i))
      } else {
        clearInterval(interval)
        // Hide cursor 1.5s after typing completes
        setTimeout(() => setShowCursor(false), 1500)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <span>
      {displayed}
      {showCursor && started && (
        <span
          className="inline-block w-0.5 h-[1em] ml-0.5 align-text-bottom bg-accent-light-muted"
          style={{ animation: 'type-cursor 0.8s step-end infinite' }}
        />
      )}
      {/* Invisible remaining text reserves layout space to prevent reflow */}
      <span className="invisible">{text.slice(displayed.length)}</span>
    </span>
  )
}
