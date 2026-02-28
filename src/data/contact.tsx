import type { ReactNode } from 'react'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'

export interface ContactLink {
  label: string
  href: string
  icon: ReactNode
  isResume?: boolean
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'GitHub',
    href: import.meta.env.VITE_GITHUB_URL || '#',
    icon: <Github size={18} />,
  },
  {
    label: 'LinkedIn',
    href: import.meta.env.VITE_LINKEDIN_URL || '#',
    icon: <Linkedin size={18} />,
  },
  {
    label: 'Email',
    href: `mailto:${import.meta.env.VITE_EMAIL || 'your@email.com'}`,
    icon: <Mail size={18} />,
  },
  {
    label: 'Resume',
    href: import.meta.env.VITE_RESUME_PATH || '#',
    icon: <FileText size={18} />,
    isResume: true,
  },
]
