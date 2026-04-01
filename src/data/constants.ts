// ──────────────────────────────────────
// Personal / Social
// ──────────────────────────────────────
export const GITHUB_URL = 'https://github.com/gavxm'
export const LINKEDIN_URL = 'https://linkedin.com/in/gavin-mason'
export const EMAIL = 'gavxm@pm.me'
export const RESUME_PATH = '/resume.pdf'

// ──────────────────────────────────────
// Project Links
// ──────────────────────────────────────
export const MAIKONA_URL = 'https://maikona.com'
export const HOMELAB_URL = 'https://github.com/gavxm/observability-homelab'
export const MCP_URL = 'https://github.com/gavxm/ani-mcp'
export const ALL_PROJECTS_URL = 'https://github.com/gavxm?tab=repositories'
export const GITHUB_USERNAME = 'gavxm'

// ──────────────────────────────────────
// Content
// ──────────────────────────────────────
export const HERO_BIO =
  "I'm a software engineer who got into this because I like making things. These days that means I'm building web apps and ML systems at work, and going down rabbit holes and homelab tinkering after hours."

export function getGreeting(): string {
  const h = new Date().getHours()
  if (h < 5) return "Late night? I'm"
  if (h < 12) return "Good morning, I'm"
  if (h < 17) return "Good afternoon, I'm"
  if (h < 21) return "Good evening, I'm"
  return "Burning the midnight oil? I'm"
}
