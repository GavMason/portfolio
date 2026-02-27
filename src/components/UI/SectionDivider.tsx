import { useInView } from '../../hooks/useInView'

export function SectionDivider() {
  const [ref, visible] = useInView(0.5)

  return (
    <div ref={ref} className="max-w-250 mx-auto px-10">
      <div
        className="h-px overflow-hidden"
        style={{
          background: 'linear-gradient(to right, transparent, var(--color-accent-border), rgba(99,102,241,0.06), transparent)',
          transform: visible ? 'scaleX(1)' : 'scaleX(0)',
          opacity: visible ? 1 : 0,
          transition: 'transform 1s cubic-bezier(.4,0,.2,1), opacity 0.6s ease',
        }}
      />
    </div>
  )
}
