import { useCallback, useEffect, useRef, useState } from 'react'

interface GravityModeProps {
  show: boolean
  onClose: () => void
}

interface FallingElement {
  el: HTMLElement
  x: number
  y: number
  vy: number
  vx: number
  rotation: number
  vr: number
  width: number
  height: number
  originalRect: DOMRect
}

export function GravityMode({ show, onClose }: GravityModeProps) {
  const [rebuilding, setRebuilding] = useState(false)
  const elementsRef = useRef<FallingElement[]>([])
  const rafRef = useRef<number>(0)
  const cloneContainerRef = useRef<HTMLDivElement | null>(null)

  // Tear down DOM side effects — stable ref since it only touches refs
  const teardown = useCallback(() => {
    cancelAnimationFrame(rafRef.current)

    // Restore visibility of original elements
    const selectors = 'h1, h2, h3, h4, p, a, span, img, button, svg, li'
    document.querySelectorAll(selectors).forEach((el) => {
      const htmlEl = el as HTMLElement
      htmlEl.style.visibility = ''
    })

    // Remove clone container
    if (cloneContainerRef.current) {
      cloneContainerRef.current.remove()
      cloneContainerRef.current = null
    }

    elementsRef.current = []
  }, [])

  useEffect(() => {
    if (!show) {
      // Clean up DOM only — state resets naturally on unmount
      teardown()
      return
    }

    // Create a container for cloned elements
    const container = document.createElement('div')
    container.style.cssText = 'position:fixed;inset:0;z-index:99999;pointer-events:none;overflow:hidden;'
    document.body.appendChild(container)
    cloneContainerRef.current = container

    // Grab visible elements from the page
    const selectors = 'h1, h2, h3, h4, p, a, span, img, button, svg, li'
    const allElements = document.querySelectorAll(selectors)
    const viewH = window.innerHeight
    const viewW = window.innerWidth
    const falling: FallingElement[] = []

    allElements.forEach((el) => {
      const htmlEl = el as HTMLElement
      const rect = htmlEl.getBoundingClientRect()

      // Only grab elements visible in the viewport and reasonably sized
      if (
        rect.top > viewH ||
        rect.bottom < 0 ||
        rect.left > viewW ||
        rect.right < 0 ||
        rect.width < 10 ||
        rect.height < 5 ||
        rect.width > viewW * 0.8
      ) return

      // Skip elements that are inside our overlay or other fixed elements
      const parent = htmlEl.closest('[class*="z-10000"], [class*="z-999"]')
      if (parent) return

      // Clone the element
      const clone = htmlEl.cloneNode(true) as HTMLElement
      clone.style.cssText = `
        position: absolute;
        left: ${rect.left}px;
        top: ${rect.top}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        margin: 0;
        pointer-events: none;
        transition: none;
        will-change: transform;
        color: ${getComputedStyle(htmlEl).color};
        font-size: ${getComputedStyle(htmlEl).fontSize};
        font-weight: ${getComputedStyle(htmlEl).fontWeight};
        font-family: ${getComputedStyle(htmlEl).fontFamily};
        background: ${getComputedStyle(htmlEl).background};
        overflow: hidden;
      `
      container.appendChild(clone)

      falling.push({
        el: clone,
        x: rect.left,
        y: rect.top,
        vy: 0,
        vx: (Math.random() - 0.5) * 3,
        rotation: 0,
        vr: (Math.random() - 0.5) * 8,
        width: rect.width,
        height: rect.height,
        originalRect: rect,
      })

      // Hide original
      htmlEl.style.visibility = 'hidden'
    })

    elementsRef.current = falling

    // Hide the main content behind the falling clones
    const mainContent = document.querySelector('.min-h-screen') as HTMLElement
    if (mainContent) {
      mainContent.dataset.gravityPrevBg = mainContent.style.background || ''
    }

    // Physics loop — gravity, bounce, and wall collision
    const gravity = 0.4
    const bounce = 0.4
    const friction = 0.99
    const floorY = viewH

    const loop = () => {
      for (const item of falling) {
        item.vy += gravity
        item.vy *= friction
        item.vx *= friction

        item.y += item.vy
        item.x += item.vx
        item.rotation += item.vr

        // Floor bounce
        if (item.y + item.height > floorY) {
          item.y = floorY - item.height
          item.vy = -item.vy * bounce
          item.vr *= 0.8

          // Stop jittering when nearly still
          if (Math.abs(item.vy) < 0.5) {
            item.vy = 0
            item.vr *= 0.5
          }
        }

        // Wall bounces
        if (item.x < 0) {
          item.x = 0
          item.vx = -item.vx * bounce
        } else if (item.x + item.width > viewW) {
          item.x = viewW - item.width
          item.vx = -item.vx * bounce
        }

        item.el.style.transform = `translate(${item.x - item.originalRect.left}px, ${item.y - item.originalRect.top}px) rotate(${item.rotation}deg)`
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)

    return () => teardown()
  }, [show, teardown])

  const handleRebuild = () => {
    setRebuilding(true)
    cancelAnimationFrame(rafRef.current)

    // Animate everything back to original position
    const items = elementsRef.current
    items.forEach((item) => {
      item.el.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
      item.el.style.transform = 'translate(0px, 0px) rotate(0deg)'
    })

    // After animation, clean up and close
    setTimeout(() => {
      teardown()
      setRebuilding(false)
      onClose()
    }, 900)
  }

  if (!show && !rebuilding) return null

  return (
    <div className="fixed inset-0 z-10000" style={{ pointerEvents: 'auto' }}>
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-bg"
        style={{ opacity: 0.5 }}
        onClick={handleRebuild}
      />

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        {/* Rebuild button */}
        {!rebuilding && (
          <button
            onClick={handleRebuild}
            className="px-5 py-2.5 rounded-xl text-sm font-medium border cursor-pointer"
            style={{
              background: 'rgba(139, 92, 246, 0.15)',
              borderColor: 'rgba(139, 92, 246, 0.3)',
              color: '#c4b5fd',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.25)'
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)'
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)'
            }}
          >
            Rebuild
          </button>
        )}
        {/* Rebuilding indicator */}
        {rebuilding && (
          <div className="text-sm font-mono text-accent-light animate-pulse">
            rebuilding...
          </div>
        )}
        {/* Dismiss hint */}
        <div className="text-[11px] text-text-dim">
          click anywhere or press rebuild to restore
        </div>
      </div>
    </div>
  )
}
