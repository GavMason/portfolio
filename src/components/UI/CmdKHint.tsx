import { useState, useEffect } from 'react'

interface CmdKHintProps {
  onClick: () => void
  dismissed: boolean
}

export function CmdKHint({ onClick, dismissed }: CmdKHintProps) {
  const [visible, setVisible] = useState(false)
  const isMac = /mac|iphone|ipad/i.test(navigator.userAgent)

  useEffect(() => {
    if (dismissed) return
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [dismissed])

  if (dismissed || !visible) return null

  return (
    <button
      aria-label="Open command palette"
      onClick={onClick}
      className="fixed bottom-8 right-8 z-100 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono text-text-soft border border-border-hover bg-surface-glass backdrop-blur-md transition-all duration-300 hover:text-accent-light hover:border-accent-border-hover"
      style={{
        opacity: visible ? 1 : 0,
        animation: 'fade-in 0.4s ease',
      }}
    >
      <kbd className="text-[10px] px-1 py-0.5 rounded bg-border-light">
        {isMac ? '⌘' : 'Ctrl'}
      </kbd>
      <kbd className="text-[10px] px-1 py-0.5 rounded bg-border-light">K</kbd>
    </button>
  )
}
