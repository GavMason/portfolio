import { useScrollProgress } from '../../hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  if (progress < 0.005) return null

  return (
    <div
      className="fixed top-0 left-0 h-0.5 z-200 pointer-events-none overflow-hidden"
      style={{ width: `${progress * 100}%` }}
    >
      <div
        className="w-full h-full bg-linear-to-r from-accent via-accent-indigo to-accent-blue"
        style={{ boxShadow: '0 0 10px var(--color-accent-glow)' }}
      />
    </div>
  )
}
