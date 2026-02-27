import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
}

export function Reveal({ children, delay = 0, y = 30 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        opacity: { duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: delay / 1000 },
        y: { duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: delay / 1000 },
      }}
    >
      {children}
    </motion.div>
  )
}
