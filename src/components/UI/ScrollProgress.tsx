import { motion, useScroll } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-200 pointer-events-none origin-left"
      style={{ scaleX: scrollYProgress }}
    >
      <div
        className="w-full h-full bg-linear-to-r from-accent via-accent-indigo to-accent-blue"
        style={{ boxShadow: '0 0 10px var(--color-accent-glow)' }}
      />
    </motion.div>
  )
}
