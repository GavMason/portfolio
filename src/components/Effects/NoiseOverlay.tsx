import { useRef, useEffect } from 'react'

export function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Generate a single static tile - CSS repeats it across the viewport
    canvas.width = 512
    canvas.height = 512

    // Fill tile with static grayscale noise
    const imageData = ctx.createImageData(512, 512)
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.random() * 255
      imageData.data[i] = v       // R
      imageData.data[i + 1] = v   // G
      imageData.data[i + 2] = v   // B
      imageData.data[i + 3] = 8   // Alpha - very low for subtle grain texture
    }
    ctx.putImageData(imageData, 0, 0)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"
    />
  )
}
