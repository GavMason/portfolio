import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  onTriggerDvd?: () => void
  onTriggerGravity?: () => void
}

interface CommandItem {
  label: string
  action: string
  icon: string
  keys?: string
  callback?: () => void
}

const BASE_ITEMS: CommandItem[] = [
  { label: 'Go to About', action: '#about', icon: '→', keys: '01' },
  { label: 'Go to Projects', action: '#projects', icon: '→', keys: '02' },
  { label: 'Go to Skills', action: '#skills', icon: '→', keys: '03' },
  { label: 'Go to Now', action: '#now', icon: '→', keys: '04' },
  { label: 'Go to Contact', action: '#contact', icon: '→', keys: '05' },
  { label: 'GitHub', action: import.meta.env.VITE_GITHUB_URL || '#', icon: '⌨' },
  { label: 'LinkedIn', action: import.meta.env.VITE_LINKEDIN_URL || '#', icon: '💼' },
  { label: 'Email', action: `mailto:${import.meta.env.VITE_EMAIL || 'your@email.com'}`, icon: '✉' },
  { label: 'Download Resume', action: import.meta.env.VITE_RESUME_PATH || '#', icon: '📄' },
]

/** Wrapper - mounts/unmounts the inner panel so state resets naturally */
export function CommandPalette(props: CommandPaletteProps) {
  if (!props.open) return null
  return <CommandPaletteInner {...props} />
}

/** Inner panel */
function CommandPaletteInner({ onClose, onTriggerDvd, onTriggerGravity }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocus = useRef<Element | null>(null)
  const mouseMoved = useRef(false)

  const ITEMS = useMemo<CommandItem[]>(() => [
    ...BASE_ITEMS,
    { label: 'DVD Screensaver', action: '', icon: '📀', callback: onTriggerDvd },
    { label: 'Break Everything', action: '', icon: '💥', callback: onTriggerGravity },
  ], [onTriggerDvd, onTriggerGravity])

  // Save previous focus, autofocus input, restore on unmount
  useEffect(() => {
    previousFocus.current = document.activeElement
    inputRef.current?.focus()
    return () => {
      if (previousFocus.current instanceof HTMLElement) {
        previousFocus.current.focus()
      }
    }
  }, [])

  const filtered = ITEMS.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))

  const executeItem = useCallback((item: CommandItem) => {
    if (item.callback) {
      item.callback()
    } else {
      window.location.hash = item.action
      onClose()
    }
  }, [onClose])

  // Keyboard navigation + focus trap + escape
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((p) => (p + 1) % filtered.length)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((p) => (p - 1 + filtered.length) % filtered.length)
    }
    if (e.key === 'Enter' && filtered[activeIdx]) {
      executeItem(filtered[activeIdx])
    }
    if (e.key === 'Escape') {
      onClose()
    }
    // Focus trap
    if (e.key === 'Tab') {
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'input, a[href], button, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  const activeId = filtered[activeIdx] ? `cmd-option-${activeIdx}` : undefined

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-999 flex items-start justify-center pt-[20vh] bg-bg-overlay backdrop-blur-lg"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={handleKeyDown}
        onMouseMove={() => { mouseMoved.current = true }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-120 rounded-2xl overflow-hidden bg-surface-raised border border-border-hover"
        style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.5)' }}
      >
        {/* Search input */}
        <div className="p-4 border-b border-border-hover">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActiveIdx(0)
            }}
            placeholder="Where do you want to go?"
            aria-label="Search commands"
            aria-activedescendant={activeId}
            aria-controls="cmd-results"
            role="combobox"
            aria-expanded="true"
            className="w-full bg-transparent border-none outline-none text-[15px] font-sans text-text-secondary"
          />
        </div>

        {/* Results */}
        <div id="cmd-results" role="listbox" aria-label="Commands" className="p-2 max-h-75 overflow-y-auto">
          {filtered.map((item, i) => (
            <a
              key={i}
              id={`cmd-option-${i}`}
              role="option"
              aria-selected={i === activeIdx}
              href={item.callback ? undefined : item.action}
              onClick={(e) => {
                e.preventDefault()
                executeItem(item)
              }}
              onMouseEnter={() => mouseMoved.current && setActiveIdx(i)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-[10px] no-underline text-sm transition-all duration-150"
              style={{
                color: i === activeIdx ? 'var(--color-accent-light)' : 'var(--color-text-subtle)',
                background: i === activeIdx ? 'var(--color-accent-faint)' : 'transparent',
                cursor: 'pointer',
              }}
            >
              <span className="text-sm opacity-50">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.keys && (
                <span className="text-[10px] font-mono text-text-faint">
                  {item.keys}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 flex gap-4 text-[11px] border-t border-border text-text-dim">
          <span>
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-border-light">↑↓</kbd> navigate
          </span>
          <span>
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-border-light">↵</kbd> select
          </span>
          <span>
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-border-light">esc</kbd> close
          </span>
        </div>
      </div>
    </div>
  )
}
