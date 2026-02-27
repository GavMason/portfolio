export interface Skill {
  name: string
  x: number
  y: number
  cat: number
  tier: number
  r: number
  prof: number
}

export interface CatColor {
  fill: string
  bg: string
  glow: string
}

// Tier 1 = most proficient / largest node. Tier 5 = least / smallest.
const TIER_R: Record<number, number> = { 1: 6, 2: 5, 3: 4.2, 4: 3.4, 5: 2.8 }       // SVG circle radius
const TIER_PROF: Record<number, number> = { 1: 95, 2: 85, 3: 75, 4: 65, 5: 55 }  // Tooltip proficiency %

const RAW_SKILLS = [
  // Languages (cat 0)
  { name: 'Python', x: 8, y: 12, cat: 0, tier: 1 },
  { name: 'JavaScript', x: 5, y: 24, cat: 0, tier: 2 },
  { name: 'TypeScript', x: 16, y: 22, cat: 0, tier: 2 },
  { name: 'Java', x: 12, y: 34, cat: 0, tier: 5 },
  { name: 'C', x: 22, y: 10, cat: 0, tier: 5 },
  { name: 'SQL', x: 3, y: 36, cat: 0, tier: 4 },
  { name: 'HTML/CSS', x: 20, y: 32, cat: 0, tier: 4 },
  { name: 'Ruby', x: 10, y: 44, cat: 0, tier: 5 },
  { name: 'Bash', x: 25, y: 22, cat: 0, tier: 4 },
  { name: 'YAML', x: 28, y: 34, cat: 0, tier: 5 },
  { name: 'Markdown', x: 15, y: 46, cat: 0, tier: 5 },
  // Frameworks (cat 1)
  { name: 'React', x: 36, y: 10, cat: 1, tier: 3 },
  { name: 'Vue 3', x: 44, y: 8, cat: 1, tier: 3 },
  { name: 'Next.js', x: 32, y: 22, cat: 1, tier: 3 },
  { name: 'Nuxt 3', x: 48, y: 20, cat: 1, tier: 3 },
  { name: 'FastAPI', x: 38, y: 32, cat: 1, tier: 3 },
  { name: 'Flask', x: 46, y: 30, cat: 1, tier: 4 },
  { name: 'Django', x: 34, y: 42, cat: 1, tier: 4 },
  { name: 'Express', x: 42, y: 40, cat: 1, tier: 4 },
  { name: 'Node.js', x: 50, y: 12, cat: 1, tier: 3 },
  { name: 'Spring Boot', x: 40, y: 48, cat: 1, tier: 5 },
  { name: 'Tailwind', x: 52, y: 38, cat: 1, tier: 4 },
  { name: 'Vite', x: 54, y: 26, cat: 1, tier: 5 },
  // Cloud & Infra (cat 2)
  { name: 'AWS', x: 72, y: 8, cat: 2, tier: 3 },
  { name: 'Lambda', x: 80, y: 6, cat: 2, tier: 4 },
  { name: 'Bedrock', x: 66, y: 16, cat: 2, tier: 4 },
  { name: 'ECS/EKS', x: 76, y: 18, cat: 2, tier: 4 },
  { name: 'Docker', x: 68, y: 28, cat: 2, tier: 2 },
  { name: 'Kubernetes', x: 82, y: 26, cat: 2, tier: 3 },
  { name: 'Linux', x: 88, y: 14, cat: 2, tier: 3 },
  { name: 'Terraform', x: 90, y: 28, cat: 2, tier: 4 },
  { name: 'Nginx', x: 62, y: 36, cat: 2, tier: 5 },
  { name: 'S3', x: 86, y: 38, cat: 2, tier: 5 },
  { name: 'Cloudflare', x: 74, y: 36, cat: 2, tier: 4 },
  { name: 'Vercel', x: 92, y: 20, cat: 2, tier: 5 },
  // ML / AI (cat 3)
  { name: 'PyTorch', x: 30, y: 58, cat: 3, tier: 3 },
  { name: 'scikit-learn', x: 20, y: 62, cat: 3, tier: 4 },
  { name: 'LangChain', x: 40, y: 60, cat: 3, tier: 3 },
  { name: 'ChromaDB', x: 28, y: 70, cat: 3, tier: 5 },
  { name: 'Hugging Face', x: 38, y: 70, cat: 3, tier: 4 },
  { name: 'OpenAI API', x: 48, y: 56, cat: 3, tier: 3 },
  { name: 'RAG Pipelines', x: 46, y: 68, cat: 3, tier: 4 },
  { name: 'MLflow', x: 22, y: 76, cat: 3, tier: 5 },
  { name: 'Pandas/NumPy', x: 12, y: 68, cat: 3, tier: 4 },
  { name: 'Jupyter', x: 16, y: 56, cat: 3, tier: 5 },
  { name: 'Matplotlib', x: 8, y: 76, cat: 3, tier: 5 },
  // Security (cat 4)
  { name: 'MITRE ATLAS', x: 60, y: 50, cat: 4, tier: 4 },
  { name: 'Threat Detection', x: 56, y: 60, cat: 4, tier: 4 },
  { name: 'Log Analysis', x: 68, y: 56, cat: 4, tier: 4 },
  { name: 'Wireshark', x: 64, y: 68, cat: 4, tier: 5 },
  { name: 'Nmap', x: 54, y: 72, cat: 4, tier: 5 },
  { name: 'Vuln Scanning', x: 72, y: 66, cat: 4, tier: 4 },
  { name: 'SIEM/ELK', x: 60, y: 78, cat: 4, tier: 4 },
  { name: 'InSpec/SAF', x: 76, y: 74, cat: 4, tier: 5 },
  // DevOps (cat 5)
  { name: 'Git', x: 82, y: 50, cat: 5, tier: 2 },
  { name: 'CI/CD', x: 90, y: 48, cat: 5, tier: 3 },
  { name: 'GitHub Actions', x: 86, y: 58, cat: 5, tier: 3 },
  { name: 'Grafana', x: 78, y: 62, cat: 5, tier: 3 },
  { name: 'Prometheus', x: 92, y: 60, cat: 5, tier: 4 },
  { name: 'Ansible', x: 84, y: 72, cat: 5, tier: 4 },
  { name: 'ArgoCD', x: 92, y: 72, cat: 5, tier: 5 },
  { name: 'Kong', x: 76, y: 82, cat: 5, tier: 5 },
  { name: 'GraphQL', x: 88, y: 82, cat: 5, tier: 4 },
  { name: 'REST APIs', x: 80, y: 86, cat: 5, tier: 3 },
  { name: 'WebSockets', x: 70, y: 86, cat: 5, tier: 5 },
]

export const SKILLS_DATA: Skill[] = RAW_SKILLS.map((s) => ({
  ...s,
  r: TIER_R[s.tier] ?? 3.4,
  prof: TIER_PROF[s.tier] ?? 65,
}))

export const CAT_COLORS: CatColor[] = [
  { fill: 'rgba(196,181,253,0.9)', bg: 'rgba(196,181,253,0.08)', glow: '196,181,253' },
  { fill: 'rgba(129,140,248,0.9)', bg: 'rgba(129,140,248,0.08)', glow: '129,140,248' },
  { fill: 'rgba(96,165,250,0.9)', bg: 'rgba(96,165,250,0.08)', glow: '96,165,250' },
  { fill: 'rgba(244,114,182,0.9)', bg: 'rgba(244,114,182,0.08)', glow: '244,114,182' },
  { fill: 'rgba(251,191,36,0.85)', bg: 'rgba(251,191,36,0.08)', glow: '251,191,36' },
  { fill: 'rgba(74,222,128,0.85)', bg: 'rgba(74,222,128,0.08)', glow: '74,222,128' },
]

export const CAT_LABELS = ['Languages', 'Frameworks', 'Cloud & Infra', 'ML / AI', 'Security', 'DevOps']

// Pre-compute constellation connections based on Euclidean distance between node positions.
// Same-category nodes connect up to 22 units apart; cross-category only within 14 units.
export interface Connection {
  i: number
  j: number
}

export const CONNECTIONS: Connection[] = []
SKILLS_DATA.forEach((a, i) => {
  SKILLS_DATA.forEach((b, j) => {
    if (j <= i) return
    const dx = a.x - b.x
    const dy = a.y - b.y
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (a.cat === b.cat && dist < 22) CONNECTIONS.push({ i, j })
    else if (dist < 14) CONNECTIONS.push({ i, j })
  })
})
