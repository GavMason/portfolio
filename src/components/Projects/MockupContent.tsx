interface MockupContentProps {
  type: string
  accent: string
}

// Renders a decorative placeholder UI inside project card.
// All elements are abstract shapes - just visual texture.
export function MockupContent({ type, accent }: MockupContentProps) {
  // Dashboard: header bars + bar chart + line items
  if (type === 'dashboard') {
    return (
      <div className="p-2">
        <div className="flex gap-1 mb-1.5">
          {[40, 25, 35].map((w, i) => (
            <div
              key={i}
              className="h-5 rounded-sm"
              style={{
                width: `${w}%`,
                background: `rgba(${accent},${0.12 - i * 0.02})`,
              }}
            />
          ))}
        </div>
        <div className="flex gap-1 items-end h-8.75 px-0.5">
          {[60, 35, 80, 50, 70, 45, 90, 55, 75, 40, 85, 65].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                height: `${h}%`,
                background: `rgba(${accent},${0.2 - (i % 3) * 0.04})`,
              }}
            />
          ))}
        </div>
        <div className="mt-1.5">
          {[70, 55, 40].map((w, i) => (
            <div
              key={i}
              className="h-0.75 rounded-sm mb-1"
              style={{
                width: `${w}%`,
                background: `rgba(${accent},${0.08 - i * 0.02})`,
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  // Terminal: fake CLI output with styled prompt lines
  if (type === 'terminal') {
    return (
      <div className="p-2 font-mono text-[5px]">
        {[
          '$ mcp-server init',
          '  Loading config...',
          '  Registering tools: 4',
          '  Server ready on :8080',
          '',
          '$ mcp-server status',
          '  ● running (3 connections)',
        ].map((l, i) => (
          <div
            key={i}
            style={{
              color: l.startsWith('$')
                ? `rgba(${accent},0.6)`
                : 'var(--color-text-dim)',
              lineHeight: 1.8,
            }}
          >
            {l}
          </div>
        ))}
      </div>
    )
  }

  // Default: generic platform UI with placeholder blocks
  return (
    <div className="p-2">
      <div
        className="h-1.5 rounded-sm mb-2"
        style={{ width: '50%', background: `rgba(${accent},0.15)` }}
      />
      <div className="flex gap-1 mb-2">
        <div
          className="h-7.5 rounded"
          style={{
            width: '45%',
            background: `rgba(${accent},0.06)`,
            border: `1px solid rgba(${accent},0.08)`,
          }}
        />
        <div
          className="h-7.5 rounded"
          style={{ width: '55%', background: `rgba(${accent},0.04)` }}
        />
      </div>
      {[65, 50, 35].map((w, i) => (
        <div
          key={i}
          className="h-0.75 rounded-sm mb-1.5"
          style={{
            width: `${w}%`,
            background: `rgba(${accent},${0.1 - i * 0.02})`,
          }}
        />
      ))}
    </div>
  )
}
