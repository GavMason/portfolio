import { useEffect, useRef, useState } from 'react'

interface DVDScreensaverProps {
  show: boolean
  onClose: () => void
}

const COLORS = ['#c4b5fd', '#818cf8', '#60a5fa', '#ec4899', '#4ade80', '#fbbf24', '#f87171']

export function DVDScreensaver({ show, onClose }: DVDScreensaverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cornerHits, setCornerHits] = useState(0)

  useEffect(() => {
    if (!show) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    // Bouncing text setup - measure text for collision bounds
    const text = 'gav.'
    const fontSize = 64
    ctx.font = `900 ${fontSize}px 'Satoshi', sans-serif`
    const metrics = ctx.measureText(text)
    const textW = metrics.width
    const textH = fontSize

    let x = Math.random() * (w - textW)
    let y = Math.random() * (h - textH) + textH
    let vx = 2.5
    let vy = 2
    let colorIdx = 0
    let color = COLORS[0]
    let hits = 0

    const handleResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    let raf: number
    const loop = () => {
      ctx.clearRect(0, 0, w, h)

      // Draw background
      ctx.fillStyle = 'rgba(7, 7, 13, 0.97)'
      ctx.fillRect(0, 0, w, h)

      // Hit counter
      if (hits > 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.15)'
        ctx.font = '13px "JetBrains Mono", monospace'
        ctx.textAlign = 'center'
        ctx.fillText(`corner hits: ${hits}`, w / 2, h - 30)
      }

      // Draw text
      ctx.font = `900 ${fontSize}px 'Satoshi', sans-serif`
      ctx.textAlign = 'left'
      ctx.fillStyle = color
      ctx.shadowColor = color
      ctx.shadowBlur = 30
      ctx.fillText(text, x, y)
      ctx.shadowBlur = 0

      // Move
      x += vx
      y += vy

      let hitWall = false
      let hitCorner = false

      // Bounce off walls
      if (x <= 0) {
        x = 0
        vx = -vx
        hitWall = true
      } else if (x + textW >= w) {
        x = w - textW
        vx = -vx
        hitWall = true
      }

      if (y - textH <= 0) {
        y = textH
        vy = -vy
        // Check if also hitting a horizontal wall (corner)
        if (hitWall) hitCorner = true
        hitWall = true
      } else if (y >= h) {
        y = h
        vy = -vy
        if (hitWall) hitCorner = true
        hitWall = true
      }

      if (hitWall) {
        colorIdx = (colorIdx + 1) % COLORS.length
        color = COLORS[colorIdx]
      }

      if (hitCorner) {
        hits++
        setCornerHits(hits)
        // Flash effect
        ctx.fillStyle = color
        ctx.globalAlpha = 0.3
        ctx.fillRect(0, 0, w, h)
        ctx.globalAlpha = 1
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
  }, [show])

  if (!show) return null

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-10000 cursor-pointer"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        {/* Corner hit celebration */}
        {cornerHits > 0 && (
          <div className="text-xs font-mono text-accent-light animate-pulse">
            {cornerHits === 1 ? 'THE IMPOSSIBLE HAPPENED' : `${cornerHits}x CORNER HIT COMBO`}
          </div>
        )}
        {/* Dismiss hint */}
        <div className="text-[11px] text-text-dim">
          click anywhere to close
        </div>
      </div>
    </div>
  )
}
