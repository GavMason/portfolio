import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  PythonLogo, TypeScriptLogo, JavaScriptLogo, BashLogo, SQLLogo, HTMLLogo,
  ReactLogo, VueLogo, NextLogo, NodeLogo, TailwindLogo, FastAPILogo, ViteLogo,
  DockerLogo, AWSLogo, KubernetesLogo, TerraformLogo, LinuxLogo, CloudflareLogo,
  PyTorchLogo, LangChainLogo, OpenAILogo, HuggingFaceLogo, ScikitLearnLogo, PandasLogo,
  GrafanaLogo, GitLogo, PrometheusLogo, GitHubActionsLogo,
} from './logos'

/* ── Types ──────────────────────────────────────────────── */

interface StackItem {
  name: string
  icon: ReactNode
  color: string
}

interface OrbitConfig {
  radiusPct: number
  duration: number
  reverse?: boolean
}

type CategoryKey = 'all' | 'languages' | 'frameworks' | 'infra' | 'ml'

interface Category {
  key: CategoryKey
  label: string
  color: string
  items: StackItem[]
}

/* ── Category Data ─────────────────────────────────────── */

const CATEGORIES: Category[] = [
  {
    key: 'all',
    label: 'All',
    color: '139,92,246',
    items: [
      { name: 'Python', icon: <PythonLogo />, color: '55,105,148' },
      { name: 'React', icon: <ReactLogo />, color: '97,218,251' },
      { name: 'TypeScript', icon: <TypeScriptLogo />, color: '49,120,198' },
      { name: 'Docker', icon: <DockerLogo />, color: '36,150,237' },
      { name: 'AWS', icon: <AWSLogo />, color: '255,153,0' },
      { name: 'Node.js', icon: <NodeLogo />, color: '83,158,67' },
      { name: 'Tailwind', icon: <TailwindLogo />, color: '6,182,212' },
      { name: 'FastAPI', icon: <FastAPILogo />, color: '0,150,136' },
      { name: 'Kubernetes', icon: <KubernetesLogo />, color: '50,108,229' },
    ],
  },
  {
    key: 'languages',
    label: 'Languages',
    color: '196,181,253',
    items: [
      { name: 'Python', icon: <PythonLogo />, color: '55,105,148' },
      { name: 'TypeScript', icon: <TypeScriptLogo />, color: '49,120,198' },
      { name: 'JavaScript', icon: <JavaScriptLogo />, color: '247,223,30' },
      { name: 'Bash', icon: <BashLogo />, color: '78,170,37' },
      { name: 'SQL', icon: <SQLLogo />, color: '0,117,143' },
      { name: 'HTML/CSS', icon: <HTMLLogo />, color: '228,77,38' },
    ],
  },
  {
    key: 'frameworks',
    label: 'Frameworks',
    color: '129,140,248',
    items: [
      { name: 'React', icon: <ReactLogo />, color: '97,218,251' },
      { name: 'Vue', icon: <VueLogo />, color: '65,184,131' },
      { name: 'Next.js', icon: <NextLogo />, color: '200,200,200' },
      { name: 'Node.js', icon: <NodeLogo />, color: '83,158,67' },
      { name: 'FastAPI', icon: <FastAPILogo />, color: '0,150,136' },
      { name: 'Tailwind', icon: <TailwindLogo />, color: '6,182,212' },
      { name: 'Vite', icon: <ViteLogo />, color: '189,52,254' },
    ],
  },
  {
    key: 'infra',
    label: 'Infra',
    color: '96,165,250',
    items: [
      { name: 'Docker', icon: <DockerLogo />, color: '36,150,237' },
      { name: 'AWS', icon: <AWSLogo />, color: '255,153,0' },
      { name: 'Kubernetes', icon: <KubernetesLogo />, color: '50,108,229' },
      { name: 'Terraform', icon: <TerraformLogo />, color: '92,78,229' },
      { name: 'Linux', icon: <LinuxLogo />, color: '200,200,200' },
      { name: 'Cloudflare', icon: <CloudflareLogo />, color: '244,104,0' },
      { name: 'Git', icon: <GitLogo />, color: '240,80,50' },
      { name: 'Grafana', icon: <GrafanaLogo />, color: '244,104,0' },
      { name: 'Prometheus', icon: <PrometheusLogo />, color: '224,73,43' },
      { name: 'GitHub Actions', icon: <GitHubActionsLogo />, color: '33,136,255' },
    ],
  },
  {
    key: 'ml',
    label: 'ML / AI',
    color: '244,114,182',
    items: [
      { name: 'PyTorch', icon: <PyTorchLogo />, color: '238,76,44' },
      { name: 'LangChain', icon: <LangChainLogo />, color: '28,60,60' },
      { name: 'OpenAI', icon: <OpenAILogo />, color: '200,200,200' },
      { name: 'Hugging Face', icon: <HuggingFaceLogo />, color: '255,210,30' },
      { name: 'scikit-learn', icon: <ScikitLearnLogo />, color: '249,130,38' },
      { name: 'Pandas', icon: <PandasLogo />, color: '150,117,206' },
    ],
  },
]

/* ── Ring layout per item count ────────────────────────── */

const RING_CONFIGS: Record<number, OrbitConfig[]> = {
  6: [
    { radiusPct: 24, duration: 40 },
    { radiusPct: 42, duration: 55, reverse: true },
  ],
  7: [
    { radiusPct: 24, duration: 40 },
    { radiusPct: 42, duration: 55, reverse: true },
  ],
  8: [
    { radiusPct: 20, duration: 40 },
    { radiusPct: 34, duration: 55, reverse: true },
    { radiusPct: 46, duration: 75 },
  ],
  9: [
    { radiusPct: 20, duration: 40 },
    { radiusPct: 34, duration: 55, reverse: true },
    { radiusPct: 46, duration: 75 },
  ],
  10: [
    { radiusPct: 20, duration: 40 },
    { radiusPct: 34, duration: 55, reverse: true },
    { radiusPct: 46, duration: 75 },
  ],
}

function distributeItems(items: StackItem[]): { ring: OrbitConfig; items: StackItem[] }[] {
  const count = items.length
  const configs = RING_CONFIGS[count] ?? RING_CONFIGS[Math.min(count, 9)]!
  const rings = configs.map((c) => ({ ring: c, items: [] as StackItem[] }))

  if (configs.length === 2) {
    rings[0].items = items.slice(0, 3)
    rings[1].items = items.slice(3)
  } else {
    rings[0].items = items.slice(0, 3)
    rings[1].items = items.slice(3, 7)
    rings[2].items = items.slice(7)
  }

  return rings.filter((r) => r.items.length > 0)
}

/* ── Main Component ────────────────────────────────────── */

export function OrbitingStack() {
  const reduced = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all')
  const [hoveredRing, setHoveredRing] = useState<number | null>(null)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [containerSize, setContainerSize] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const category = CATEGORIES.find((c) => c.key === activeCategory)!
  const rings = distributeItems(category.items)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      setContainerSize(entry.contentRect.width)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Reset hover state on category change
  const handleCategory = useCallback((key: CategoryKey) => {
    setActiveCategory(key)
    setHoveredRing(null)
    setHoveredItem(null)
  }, [])

  return (
    <div>
      {/* Category pills */}
      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.key
          return (
            <button
              key={cat.key}
              onClick={() => handleCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border outline-none focus:outline-none ${
                isActive ? '' : 'active:opacity-70'
              }`}
              onPointerUp={(e) => (e.currentTarget as HTMLButtonElement).blur()}
              style={{
                background: isActive
                  ? `rgba(${cat.color}, 0.15)`
                  : 'var(--color-surface)',
                borderColor: isActive
                  ? `rgba(${cat.color}, 0.4)`
                  : 'var(--color-border)',
                color: isActive
                  ? `rgba(${cat.color}, 1)`
                  : 'var(--color-text-muted)',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Orbit container */}
      <div
        ref={containerRef}
        className="relative w-full aspect-square max-w-110 mx-auto overflow-hidden"
      >
        {/* Center element - favicon */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <img
            src="/favicon.svg"
            alt=""
            className="w-14 h-14 md:w-16 md:h-16 rounded-xl"
          />
        </div>

        {/* Orbit tracks */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-0"
          >
            {rings.map((r, i) => {
              const d = r.ring.radiusPct * 2
              return (
                <div
                  key={`track-${i}`}
                  className="absolute rounded-full border border-border-strong"
                  style={{
                    width: `${d}%`,
                    height: `${d}%`,
                    top: `${50 - r.ring.radiusPct}%`,
                    left: `${50 - r.ring.radiusPct}%`,
                  }}
                />
              )
            })}

            {containerSize > 0 &&
              rings.map((r, ringIdx) => (
                <OrbitRingGroup
                  key={`${activeCategory}-${ringIdx}`}
                  ring={r.ring}
                  items={r.items}
                  containerSize={containerSize}
                  paused={hoveredRing === ringIdx || !!reduced}
                  hoveredItem={hoveredItem}
                  onHoverRing={() => setHoveredRing(ringIdx)}
                  onLeaveRing={() => {
                    setHoveredRing(null)
                    setHoveredItem(null)
                  }}
                  onHoverItem={setHoveredItem}
                  onLeaveItem={() => setHoveredItem(null)}
                />
              ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ── Orbit Ring (rAF-based rotation) ───────────────────── */

interface OrbitRingGroupProps {
  ring: OrbitConfig
  items: StackItem[]
  containerSize: number
  paused: boolean
  hoveredItem: string | null
  onHoverRing: () => void
  onLeaveRing: () => void
  onHoverItem: (name: string) => void
  onLeaveItem: () => void
}

function OrbitRingGroup({
  ring,
  items,
  containerSize,
  paused,
  hoveredItem,
  onHoverRing,
  onLeaveRing,
  onHoverItem,
  onLeaveItem,
}: OrbitRingGroupProps) {
  const angleRef = useRef(0)
  const rafRef = useRef(0)
  const lastTimeRef = useRef(0)
  const groupRef = useRef<HTMLDivElement>(null)

  const radiusPx = (ring.radiusPct / 100) * containerSize
  const center = containerSize / 2
  const degsPerMs = (ring.reverse ? -360 : 360) / (ring.duration * 1000)

  useEffect(() => {
    // Reset angle on item change.
    angleRef.current = 0
    lastTimeRef.current = 0
  }, [items.length])

  useEffect(() => {
    let running = true
    const step = (time: number) => {
      if (!running) return
      if (lastTimeRef.current && !paused) {
        const dt = time - lastTimeRef.current
        angleRef.current += degsPerMs * dt
      }
      lastTimeRef.current = time

      const el = groupRef.current
      if (el) {
        const children = el.children
        for (let i = 0; i < children.length; i++) {
          const child = children[i] as HTMLElement
          const itemAngle = angleRef.current + (360 / items.length) * i
          const rad = (itemAngle * Math.PI) / 180
          const x = center + Math.cos(rad) * radiusPx
          const y = center + Math.sin(rad) * radiusPx
          child.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
        }
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => {
      running = false
      cancelAnimationFrame(rafRef.current)
    }
  }, [paused, degsPerMs, radiusPx, center, items.length])

  return (
    <div
      ref={groupRef}
      className="absolute top-0 left-0 w-full h-full"
      onMouseEnter={onHoverRing}
      onMouseLeave={onLeaveRing}
      style={{ pointerEvents: 'none' }}
    >
      {items.map((item) => {
        const isHovered = hoveredItem === item.name
        return (
          <div
            key={item.name}
            className="absolute top-0 left-0"
            style={{ pointerEvents: 'auto' }}
            onMouseEnter={() => onHoverItem(item.name)}
            onMouseLeave={onLeaveItem}
          >
            <div
              className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-surface-glass border border-border-light p-2 transition-all duration-300"
              style={{
                boxShadow: isHovered
                  ? `0 0 20px rgba(${item.color}, 0.4), 0 0 40px rgba(${item.color}, 0.15)`
                  : '0 2px 8px rgba(0,0,0,0.3)',
                borderColor: isHovered ? `rgba(${item.color}, 0.5)` : undefined,
                transform: isHovered ? 'scale(1.2)' : 'scale(1)',
              }}
            >
              {item.icon}
            </div>

            {/* Tooltip */}
            <div
              className="absolute left-1/2 -top-2 pointer-events-none whitespace-nowrap text-xs font-medium text-text-primary bg-surface-glass border border-border-light rounded-md px-2 py-1 transition-all duration-200"
              style={{
                opacity: isHovered ? 1 : 0,
                transform: `translateX(-50%) translateY(${isHovered ? '-100%' : '-80%'})`,
              }}
            >
              {item.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}
