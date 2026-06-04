import { useState, useEffect } from 'react'
import { GITHUB_USERNAME } from '../../data/constants'

interface Stats {
  repos: number
  activeRepo: string
  latestPush: string
}

export function GitHubStats() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=pushed`),
        ])

        if (!userRes.ok || !reposRes.ok) return

        const user: { public_repos: number } = await userRes.json()
        const repos: { name: string; pushed_at: string }[] = await reposRes.json()

        // Most recently pushed repo
        const activeRepo = repos[0]?.name ?? '-'
        const latest = repos[0]?.pushed_at
        const latestPush = latest ? formatRelative(latest) : 'recently'

        if (!cancelled) {
          setStats({
            repos: user.public_repos,
            activeRepo,
            latestPush,
          })
        }
      } catch {
        // silent fail
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return (
    <a
      href={`https://github.com/${GITHUB_USERNAME}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group block no-underline rounded-2xl bg-surface border border-border hover:border-border-hover transition-all duration-300 overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-text-muted shrink-0">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          <span className="text-[10px] font-mono tracking-[1.5px] uppercase text-text-dim">
            GitHub
          </span>
        </div>

        {stats ? (
          <div className="space-y-3">
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-text-muted">Public repos</span>
              <span className="text-sm font-bold text-text-primary font-mono">{stats.repos}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-text-muted">Most active</span>
              <span className="text-sm font-bold text-text-primary font-mono truncate ml-2">{stats.activeRepo}</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-text-muted">Last push</span>
              <span className="text-sm font-bold text-text-primary font-mono">{stats.latestPush}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {['Public repos', 'Most active', 'Last push'].map((l) => (
              <div key={l} className="flex justify-between items-baseline">
                <span className="text-xs text-text-muted">{l}</span>
                <span className="text-sm font-bold text-text-primary font-mono">-</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </a>
  )
}

function formatRelative(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(ms / 60000)
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
