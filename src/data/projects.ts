export interface Project {
  title: string
  description: string
  tags: string[]
  status: 'active' | 'coming-soon'
  accent: string
  preview: string
  mockup: 'platform' | 'dashboard' | 'terminal'
  link?: string
}

export const PROJECTS: Project[] = [
  {
    title: 'Maikona',
    description: 'A platform currently taking shape. Details coming as it develops - stay tuned.',
    tags: ['In Progress'],
    status: 'active',
    accent: '139,92,246',
    preview: 'linear-gradient(135deg, #1a1040, #2d1b69, #1a1040)',
    mockup: 'platform',
    link: import.meta.env.VITE_MAIKONA_URL || '#',
  },
  {
    title: 'Homelab Observation Stack',
    description: 'A simple, deployable observability stack for homelabs. Built it because I needed it, now sharing it.',
    tags: ['Docker', 'Monitoring', 'Infrastructure'],
    status: 'active',
    accent: '59,130,246',
    preview: 'linear-gradient(135deg, #0a1628, #1a2d5a, #0a1628)',
    mockup: 'dashboard',
    link: import.meta.env.VITE_HOMELAB_URL || '#',
  },
  {
    title: 'MCP Server',
    description: 'Building a Model Context Protocol server to extend what AI assistants can do.',
    tags: ['MCP', 'AI', 'Server'],
    status: 'coming-soon',
    accent: '236,72,153',
    preview: 'linear-gradient(135deg, #1a0a1e, #3d1545, #1a0a1e)',
    mockup: 'terminal',
  },
]
