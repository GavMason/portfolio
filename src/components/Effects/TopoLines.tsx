interface TopoLinesProps {
  className?: string
  style?: React.CSSProperties
}

export function TopoLines({ className = '', style = {} }: TopoLinesProps) {
  const paths: { d: string; opacity: number }[] = []

  // Generate wavy horizontal lines across the SVG viewBox.
  // Each line combines two sine waves (primary + harmonic) to produce organic curves.
  for (let i = 0; i < 18; i++) {
    const y = 3 + i * 5.5              // Evenly spaced vertical positions
    const amp = 4 + Math.sin(i * 0.7) * 5  // Amplitude varies per line for visual variety
    const freq = 0.008 + (i % 3) * 0.004   // 3 alternating frequencies across groups of lines
    const phase = i * 35               // Horizontal offset so lines don't align
    let d = `M 0 ${y}`
    for (let x = 0; x <= 100; x += 1.5) {
      // Primary wave + 60% harmonic at half frequency for organic shape
      d += ` L ${x} ${y + Math.sin((x + phase) * freq * Math.PI * 2) * amp + Math.cos((x * 0.5 + phase * 0.7) * freq * Math.PI * 2) * (amp * 0.6)}`
    }
    paths.push({ d, opacity: 0.12 + Math.sin(i * 0.5) * 0.06 }) // Opacity oscillates between lines
  }

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={style}
    >
      {/* Render each wave as an SVG path */}
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke="currentColor"
          className="text-accent"
          strokeWidth="0.15"
          opacity={p.opacity}
        />
      ))}
    </svg>
  )
}
