export interface Skill {
  name: string
  x: number
  y: number
  cat: number
  tier: number
  r: number
}

export interface CatColor {
  fill: string
  bg: string
  glow: string
}

// Tier 1 = most used / largest node. Tier 5 = least / smallest.
const TIER_R: Record<number, number> = { 1: 6, 2: 5, 3: 4, 4: 3.2, 5: 2.6 }

// Cluster centers for 2×3 grid layout
const CLUSTER_CENTERS: [number, number][] = [
  [25, 28], // cat 0: Languages (top-left)
  [75, 28], // cat 1: Frameworks (top-center)
  [125, 26], // cat 2: Cloud & Infra (top-right)
  [30, 68], // cat 3: ML / AI (bottom-left)
  [88, 68], // cat 4: Security (bottom-center)
  [130, 68], // cat 5: DevOps (bottom-right)
]

const RAW_SKILLS = [
  // Languages (cat 0)
  { name: 'Python', cat: 0, tier: 1 },
  { name: 'TypeScript', cat: 0, tier: 2 },
  { name: 'JavaScript', cat: 0, tier: 2 },
  { name: 'Bash', cat: 0, tier: 4 },
  { name: 'SQL', cat: 0, tier: 4 },
  { name: 'HTML/CSS', cat: 0, tier: 4 },
  { name: 'Java', cat: 0, tier: 5 },
  { name: 'C', cat: 0, tier: 5 },
  { name: 'Ruby', cat: 0, tier: 5 },
  { name: 'YAML', cat: 0, tier: 5 },
  { name: 'Markdown', cat: 0, tier: 5 },
  // Frameworks (cat 1)
  { name: 'React', cat: 1, tier: 3 },
  { name: 'Vue 3', cat: 1, tier: 3 },
  { name: 'Next.js', cat: 1, tier: 3 },
  { name: 'Nuxt 3', cat: 1, tier: 3 },
  { name: 'Node.js', cat: 1, tier: 3 },
  { name: 'FastAPI', cat: 1, tier: 3 },
  { name: 'Flask', cat: 1, tier: 4 },
  { name: 'Django', cat: 1, tier: 4 },
  { name: 'Express', cat: 1, tier: 4 },
  { name: 'Tailwind', cat: 1, tier: 4 },
  { name: 'Vite', cat: 1, tier: 5 },
  { name: 'Spring Boot', cat: 1, tier: 5 },
  // Cloud & Infra (cat 2)
  { name: 'Docker', cat: 2, tier: 2 },
  { name: 'AWS', cat: 2, tier: 3 },
  { name: 'Kubernetes', cat: 2, tier: 3 },
  { name: 'Linux', cat: 2, tier: 3 },
  { name: 'Lambda', cat: 2, tier: 4 },
  { name: 'Bedrock', cat: 2, tier: 4 },
  { name: 'ECS/EKS', cat: 2, tier: 4 },
  { name: 'Terraform', cat: 2, tier: 4 },
  { name: 'Cloudflare', cat: 2, tier: 4 },
  { name: 'Nginx', cat: 2, tier: 5 },
  { name: 'S3', cat: 2, tier: 5 },
  { name: 'Vercel', cat: 2, tier: 5 },
  // ML / AI (cat 3)
  { name: 'PyTorch', cat: 3, tier: 3 },
  { name: 'LangChain', cat: 3, tier: 3 },
  { name: 'OpenAI API', cat: 3, tier: 3 },
  { name: 'scikit-learn', cat: 3, tier: 4 },
  { name: 'Hugging Face', cat: 3, tier: 4 },
  { name: 'RAG Pipelines', cat: 3, tier: 4 },
  { name: 'Pandas/NumPy', cat: 3, tier: 4 },
  { name: 'ChromaDB', cat: 3, tier: 5 },
  { name: 'MLflow', cat: 3, tier: 5 },
  { name: 'Jupyter', cat: 3, tier: 5 },
  { name: 'Matplotlib', cat: 3, tier: 5 },
  // Security (cat 4)
  { name: 'MITRE ATLAS', cat: 4, tier: 4 },
  { name: 'Threat Detection', cat: 4, tier: 4 },
  { name: 'Log Analysis', cat: 4, tier: 4 },
  { name: 'Vuln Scanning', cat: 4, tier: 4 },
  { name: 'SIEM/ELK', cat: 4, tier: 4 },
  { name: 'Wireshark', cat: 4, tier: 5 },
  { name: 'Nmap', cat: 4, tier: 5 },
  { name: 'InSpec/SAF', cat: 4, tier: 5 },
  // DevOps (cat 5)
  { name: 'Git', cat: 5, tier: 2 },
  { name: 'CI/CD', cat: 5, tier: 3 },
  { name: 'GitHub Actions', cat: 5, tier: 3 },
  { name: 'Grafana', cat: 5, tier: 3 },
  { name: 'REST APIs', cat: 5, tier: 3 },
  { name: 'Prometheus', cat: 5, tier: 4 },
  { name: 'Ansible', cat: 5, tier: 4 },
  { name: 'GraphQL', cat: 5, tier: 4 },
  { name: 'ArgoCD', cat: 5, tier: 5 },
  { name: 'Kong', cat: 5, tier: 5 },
  { name: 'WebSockets', cat: 5, tier: 5 },
]

// Compute positions using a spiral distribution around each cluster center
function computePositions(skills: typeof RAW_SKILLS): Skill[] {
  // Group by category, sort by tier within each group
  const groups = new Map<number, typeof RAW_SKILLS>()
  for (const s of skills) {
    if (!groups.has(s.cat)) groups.set(s.cat, [])
    groups.get(s.cat)!.push(s)
  }
  for (const group of groups.values()) {
    group.sort((a, b) => a.tier - b.tier)
  }

  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  const result: Skill[] = []

  for (const s of skills) {
    const group = groups.get(s.cat)!
    const idx = group.indexOf(s)
    const [cx, cy] = CLUSTER_CENTERS[s.cat]

    // First node sits at center, rest spiral out
    let x = cx
    let y = cy
    if (idx > 0) {
      const angle = idx * goldenAngle
      const dist = 7 + Math.sqrt(idx) * 8
      x = cx + Math.cos(angle) * dist
      y = cy + Math.sin(angle) * dist
    }

    result.push({
      name: s.name,
      x,
      y,
      cat: s.cat,
      tier: s.tier,
      r: TIER_R[s.tier] ?? 2.8,
    })
  }

  // Collision resolution - push overlapping nodes apart
  const minGap = 6
  for (let pass = 0; pass < 50; pass++) {
    let moved = false
    for (let i = 0; i < result.length; i++) {
      for (let j = i + 1; j < result.length; j++) {
        const dx = result[j].x - result[i].x
        const dy = result[j].y - result[i].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const minDist = result[i].r + result[j].r + minGap
        if (dist < minDist && dist > 0) {
          const overlap = (minDist - dist) / 2
          const nx = dx / dist
          const ny = dy / dist
          result[i].x -= nx * overlap
          result[i].y -= ny * overlap
          result[j].x += nx * overlap
          result[j].y += ny * overlap
          moved = true
        }
      }
    }
    if (!moved) break
  }

  return result
}

export const SKILLS_DATA: Skill[] = computePositions(RAW_SKILLS)

export const CAT_COLORS: CatColor[] = [
  {
    fill: 'rgba(196,181,253,0.9)',
    bg: 'rgba(196,181,253,0.08)',
    glow: '196,181,253',
  },
  {
    fill: 'rgba(129,140,248,0.9)',
    bg: 'rgba(129,140,248,0.08)',
    glow: '129,140,248',
  },
  {
    fill: 'rgba(96,165,250,0.9)',
    bg: 'rgba(96,165,250,0.08)',
    glow: '96,165,250',
  },
  {
    fill: 'rgba(244,114,182,0.9)',
    bg: 'rgba(244,114,182,0.08)',
    glow: '244,114,182',
  },
  {
    fill: 'rgba(251,191,36,0.85)',
    bg: 'rgba(251,191,36,0.08)',
    glow: '251,191,36',
  },
  {
    fill: 'rgba(74,222,128,0.85)',
    bg: 'rgba(74,222,128,0.08)',
    glow: '74,222,128',
  },
]

export const CAT_LABELS = [
  'Languages',
  'Frameworks',
  'Cloud & Infra',
  'ML / AI',
  'Security',
  'DevOps',
]

// Pre-compute constellation connections - same-category nodes only, within 28 units.
export interface Connection {
  i: number
  j: number
}

export const CONNECTIONS: Connection[] = []
SKILLS_DATA.forEach((a, i) => {
  SKILLS_DATA.forEach((b, j) => {
    if (j <= i) return
    if (a.cat !== b.cat) return
    const dx = a.x - b.x
    const dy = a.y - b.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < 28) CONNECTIONS.push({ i, j })
  })
})
