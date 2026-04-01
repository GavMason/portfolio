import { GITHUB_USERNAME } from './constants'
import type { TerminalLine } from './terminal'

interface GitHubEvent {
  type: string
  repo: { name: string }
  payload: {
    commits?: { message: string }[]
    action?: string
    ref?: string
    ref_type?: string
  }
  created_at: string
}

function timeAgo(date: string): string {
  const seconds = Math.floor(
    (Date.now() - new Date(date).getTime()) / 1000,
  )
  if (seconds < 60) return 'just now'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

function shortRepo(fullName: string): string {
  return fullName.replace(`${GITHUB_USERNAME}/`, '')
}

function formatEvent(event: GitHubEvent): string | null {
  const repo = shortRepo(event.repo.name)
  const ago = timeAgo(event.created_at)

  switch (event.type) {
    case 'PushEvent': {
      const msg = event.payload.commits?.[0]?.message.split('\n')[0]
      return msg
        ? `${ago}  pushed to ${repo}: "${msg}"`
        : `${ago}  pushed to ${repo}`
    }
    case 'CreateEvent':
      if (event.payload.ref_type === 'repository')
        return `${ago}  created repo ${repo}`
      if (event.payload.ref_type === 'branch')
        return `${ago}  branched ${event.payload.ref} on ${repo}`
      return null
    case 'WatchEvent':
      return `${ago}  starred ${event.repo.name}`
    case 'ForkEvent':
      return `${ago}  forked ${event.repo.name}`
    default:
      return null
  }
}

interface GroupedPush {
  repo: string
  count: number
  lastMessage: string | null
  lastTime: string
}

async function fetchLatestCommitMessage(repo: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/commits?per_page=1`,
    )
    if (!res.ok) return null
    const commits: { commit: { message: string } }[] = await res.json()
    return commits[0]?.commit.message.split('\n')[0] ?? null
  } catch {
    return null
  }
}

function groupPushEvents(events: GitHubEvent[]): GroupedPush[] {
  const groups = new Map<string, GroupedPush>()

  for (const event of events) {
    if (event.type !== 'PushEvent') continue
    const repo = shortRepo(event.repo.name)
    const existing = groups.get(repo)
    const msg = event.payload.commits?.[0]?.message.split('\n')[0] ?? null

    if (existing) {
      existing.count++
    } else {
      groups.set(repo, {
        repo,
        count: 1,
        lastMessage: msg,
        lastTime: event.created_at,
      })
    }
  }

  return Array.from(groups.values())
}

function formatGroupedPush(group: GroupedPush): string {
  const ago = timeAgo(group.lastTime)
  if (group.count === 1) {
    const base = `${ago}  pushed to ${group.repo}`
    return group.lastMessage ? `${base}: "${group.lastMessage}"` : base
  }
  const base = `${ago}  ${group.count} pushes to ${group.repo}`
  return group.lastMessage ? `${base} — latest: "${group.lastMessage}"` : base
}

export async function fetchGitHubLines(): Promise<TerminalLine[] | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
    )
    if (!res.ok) return null

    const events: GitHubEvent[] = await res.json()
    const lines: TerminalLine[] = [
      { prompt: true, text: `git log --oneline --author=${GITHUB_USERNAME}` },
      { prompt: false, text: '' },
    ]

    // Group pushes by repo, keep other events as-is
    const pushGroups = groupPushEvents(events)
    const otherEvents = events.filter((e) => e.type !== 'PushEvent')

    // Fill in missing commit messages from the repos API
    await Promise.all(
      pushGroups.map(async (group) => {
        if (!group.lastMessage) {
          group.lastMessage = await fetchLatestCommitMessage(group.repo)
        }
      }),
    )

    // Interleave: grouped pushes first, then other events
    let count = 0
    for (const group of pushGroups) {
      if (count >= 5) break
      lines.push({ prompt: false, text: formatGroupedPush(group) })
      count++
    }
    for (const event of otherEvents) {
      if (count >= 5) break
      const line = formatEvent(event)
      if (line) {
        lines.push({ prompt: false, text: line })
        count++
      }
    }

    if (count === 0) return null

    return lines
  } catch {
    return null
  }
}
