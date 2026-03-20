import type { ReactNode } from 'react'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import { GITHUB_URL, LINKEDIN_URL, EMAIL, RESUME_PATH } from './constants'

export interface ContactLink {
  label: string
  href: string
  icon: ReactNode
  isResume?: boolean
}

export const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'GitHub',
    href: GITHUB_URL,
    icon: <Github size={18} />,
  },
  {
    label: 'LinkedIn',
    href: LINKEDIN_URL,
    icon: <Linkedin size={18} />,
  },
  {
    label: 'Email',
    href: `mailto:${EMAIL}`,
    icon: <Mail size={18} />,
  },
  {
    label: 'Resume',
    href: RESUME_PATH,
    icon: <FileText size={18} />,
    isResume: true,
  },
]
