import { GITHUB_USERNAME } from './constants'

export interface Stat {
  label: string
  value: string
}

const STATIC_STATS: Stat[] = [
  { label: 'UCF Grad', value: "'24" },
  { label: 'Public Repos', value: '...' },
  { label: 'Contributions (1y)', value: '...' },
  { label: 'Stack Depth', value: '6 layers' },
  { label: 'Uptime', value: '99.9%' },
]

export async function fetchStats(): Promise<Stat[]> {
  const stats = [...STATIC_STATS]
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
    if (res.ok) {
      const data: { public_repos: number } = await res.json()
      stats[1] = { label: 'Public Repos', value: String(data.public_repos) }
    }
  } catch {
    stats[1] = { label: 'Public Repos', value: '10+' }
  }
  // Contributions can't be fetched from public API without auth - use a reasonable static value
  stats[2] = { label: 'Contributions (1y)', value: '500+' }
  return stats
}

// Fallback for initial render before fetch completes
export const STATS: Stat[] = STATIC_STATS
