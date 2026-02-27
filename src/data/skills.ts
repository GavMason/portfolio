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

const RAW_SKILLS = [
  // Languages (cat 0) - top-left cluster
  { name: 'Python', x: 15, y: 14, cat: 0, tier: 1 },
  { name: 'TypeScript', x: 30, y: 10, cat: 0, tier: 2 },
  { name: 'JavaScript', x: 9, y: 26, cat: 0, tier: 2 },
  { name: 'Bash', x: 33, y: 24, cat: 0, tier: 4 },
  { name: 'SQL', x: 21, y: 34, cat: 0, tier: 4 },
  { name: 'HTML/CSS', x: 39, y: 36, cat: 0, tier: 4 },
  { name: 'Java', x: 6, y: 40, cat: 0, tier: 5 },
  { name: 'C', x: 42, y: 16, cat: 0, tier: 5 },
  { name: 'Ruby', x: 24, y: 46, cat: 0, tier: 5 },
  { name: 'YAML', x: 45, y: 28, cat: 0, tier: 5 },
  { name: 'Markdown', x: 12, y: 48, cat: 0, tier: 5 },
  // Frameworks (cat 1) - top-center cluster
  { name: 'React', x: 60, y: 10, cat: 1, tier: 3 },
  { name: 'Vue 3', x: 75, y: 8, cat: 1, tier: 3 },
  { name: 'Next.js', x: 57, y: 22, cat: 1, tier: 3 },
  { name: 'Nuxt 3', x: 78, y: 20, cat: 1, tier: 3 },
  { name: 'Node.js', x: 84, y: 12, cat: 1, tier: 3 },
  { name: 'FastAPI', x: 63, y: 34, cat: 1, tier: 3 },
  { name: 'Flask', x: 81, y: 32, cat: 1, tier: 4 },
  { name: 'Django', x: 57, y: 44, cat: 1, tier: 4 },
  { name: 'Express', x: 72, y: 42, cat: 1, tier: 4 },
  { name: 'Tailwind', x: 87, y: 40, cat: 1, tier: 4 },
  { name: 'Vite', x: 90, y: 26, cat: 1, tier: 5 },
  { name: 'Spring Boot', x: 69, y: 50, cat: 1, tier: 5 },
  // Cloud & Infra (cat 2) - top-right cluster
  { name: 'Docker', x: 108, y: 16, cat: 2, tier: 2 },
  { name: 'AWS', x: 120, y: 10, cat: 2, tier: 3 },
  { name: 'Kubernetes', x: 129, y: 22, cat: 2, tier: 3 },
  { name: 'Linux', x: 138, y: 12, cat: 2, tier: 3 },
  { name: 'Lambda', x: 105, y: 28, cat: 2, tier: 4 },
  { name: 'Bedrock', x: 117, y: 24, cat: 2, tier: 4 },
  { name: 'ECS/EKS', x: 135, y: 32, cat: 2, tier: 4 },
  { name: 'Terraform', x: 123, y: 36, cat: 2, tier: 4 },
  { name: 'Cloudflare', x: 111, y: 38, cat: 2, tier: 4 },
  { name: 'Nginx', x: 99, y: 36, cat: 2, tier: 5 },
  { name: 'S3', x: 141, y: 24, cat: 2, tier: 5 },
  { name: 'Vercel', x: 132, y: 42, cat: 2, tier: 5 },
  // ML / AI (cat 3) - bottom-left cluster
  { name: 'PyTorch', x: 21, y: 60, cat: 3, tier: 3 },
  { name: 'LangChain', x: 39, y: 58, cat: 3, tier: 3 },
  { name: 'OpenAI API', x: 54, y: 56, cat: 3, tier: 3 },
  { name: 'scikit-learn', x: 9, y: 68, cat: 3, tier: 4 },
  { name: 'Hugging Face', x: 33, y: 70, cat: 3, tier: 4 },
  { name: 'RAG Pipelines', x: 51, y: 68, cat: 3, tier: 4 },
  { name: 'Pandas/NumPy', x: 15, y: 78, cat: 3, tier: 4 },
  { name: 'ChromaDB', x: 42, y: 78, cat: 3, tier: 5 },
  { name: 'MLflow', x: 27, y: 82, cat: 3, tier: 5 },
  { name: 'Jupyter', x: 6, y: 58, cat: 3, tier: 5 },
  { name: 'Matplotlib', x: 57, y: 80, cat: 3, tier: 5 },
  // Security (cat 4) - bottom-center cluster
  { name: 'MITRE ATLAS', x: 78, y: 58, cat: 4, tier: 4 },
  { name: 'Threat Detection', x: 93, y: 56, cat: 4, tier: 4 },
  { name: 'Log Analysis', x: 84, y: 68, cat: 4, tier: 4 },
  { name: 'Vuln Scanning', x: 99, y: 66, cat: 4, tier: 4 },
  { name: 'SIEM/ELK', x: 75, y: 76, cat: 4, tier: 4 },
  { name: 'Wireshark', x: 90, y: 78, cat: 4, tier: 5 },
  { name: 'Nmap', x: 72, y: 66, cat: 4, tier: 5 },
  { name: 'InSpec/SAF', x: 105, y: 76, cat: 4, tier: 5 },
  // DevOps (cat 5) - bottom-right cluster
  { name: 'Git', x: 123, y: 54, cat: 5, tier: 2 },
  { name: 'CI/CD', x: 138, y: 52, cat: 5, tier: 3 },
  { name: 'GitHub Actions', x: 132, y: 62, cat: 5, tier: 3 },
  { name: 'Grafana', x: 117, y: 64, cat: 5, tier: 3 },
  { name: 'REST APIs', x: 129, y: 72, cat: 5, tier: 3 },
  { name: 'Prometheus', x: 141, y: 64, cat: 5, tier: 4 },
  { name: 'Ansible', x: 120, y: 76, cat: 5, tier: 4 },
  { name: 'GraphQL', x: 138, y: 76, cat: 5, tier: 4 },
  { name: 'ArgoCD', x: 144, y: 70, cat: 5, tier: 5 },
  { name: 'Kong', x: 114, y: 84, cat: 5, tier: 5 },
  { name: 'WebSockets', x: 132, y: 84, cat: 5, tier: 5 },
]

export const SKILLS_DATA: Skill[] = RAW_SKILLS.map((s) => ({
  ...s,
  r: TIER_R[s.tier] ?? 2.8,
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
