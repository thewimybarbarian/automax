import { motion } from 'framer-motion'

const directionOffset = {
  up: { y: 50 },
  left: { x: -50 },
  right: { x: 50 },
}

const directionReset = {
  up: { y: 0 },
  left: { x: 0 },
  right: { x: 0 },
}

export default function MotionSection({
  children,
  delay = 0,
  className = '',
  direction = 'up',
}) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, ...directionReset[direction] }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
