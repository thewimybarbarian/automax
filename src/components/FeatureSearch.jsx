import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const features = [
  {
    name: 'Keyless Entry',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="2" width="12" height="20" />
        <circle cx="12" cy="16" r="2" fill="currentColor" />
        <line x1="10" y1="7" x2="14" y2="7" />
      </svg>
    ),
  },
  {
    name: 'Cruise Control',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
        <path d="M5 12h2M17 12h2" />
      </svg>
    ),
  },
  {
    name: 'Reverse Camera',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="13" />
        <circle cx="12" cy="12.5" r="3.5" />
        <circle cx="12" cy="12.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Bluetooth',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 7l12 10-6 5V2l6 5L6 17" />
      </svg>
    ),
  },
  {
    name: 'Android Auto',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 18V9a6 6 0 0112 0v9" />
        <circle cx="9" cy="12" r="1" fill="currentColor" />
        <circle cx="15" cy="12" r="1" fill="currentColor" />
        <line x1="3" y1="6" x2="7" y2="9" />
        <line x1="21" y1="6" x2="17" y2="9" />
      </svg>
    ),
  },
  {
    name: 'Apple CarPlay',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="5" width="16" height="11" />
        <path d="M8 20h8" />
        <path d="M12 16v4" />
      </svg>
    ),
  },
  {
    name: 'Heated Seats',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 21v-6a4 4 0 014-4h0a4 4 0 014 4v6" />
        <path d="M7 11V8a2 2 0 012-2h6a2 2 0 012 2v3" />
        <path d="M9 4s1-2 3-2 3 2 3 2" />
      </svg>
    ),
  },
  {
    name: 'Navigation',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12,2 22,22 12,17 2,22" />
      </svg>
    ),
  },
  {
    name: 'Keyless Start',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Power Lift Gate',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 19h16" />
        <path d="M4 19V10l8-6 8 6v9" />
        <path d="M9 13h6v6H9z" />
        <path d="M12 4l-3 3M12 4l3 3" />
      </svg>
    ),
  },
  {
    name: '3rd Row Seating',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="5" height="6" />
        <rect x="10" y="5" width="5" height="6" />
        <rect x="17" y="5" width="5" height="6" />
        <rect x="3" y="13" width="5" height="6" />
        <rect x="10" y="13" width="5" height="6" />
        <rect x="17" y="13" width="5" height="6" />
      </svg>
    ),
  },
  {
    name: 'Sunroof/Moonroof',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="7" width="18" height="12" />
        <rect x="6" y="9" width="12" height="8" strokeDasharray="2 2" />
        <path d="M12 3v3M7 4l1 2.5M17 4l-1 2.5" />
      </svg>
    ),
  },
  {
    name: 'Towing Package',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="10" width="14" height="7" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="11" cy="19" r="2" />
        <path d="M15 14h4l3 3v3h-7" />
        <circle cx="19" cy="19" r="2" />
      </svg>
    ),
  },
  {
    name: 'Heated Steering Wheel',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <line x1="3" y1="12" x2="9" y2="12" />
        <line x1="15" y1="12" x2="21" y2="12" />
        <line x1="12" y1="15" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    name: 'Lane Departure Warning',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 20l3-16" />
        <path d="M18 20l-3-16" />
        <path d="M10.5 12h3" />
        <path d="M10.5 16h3" />
        <path d="M10.5 8h3" />
      </svg>
    ),
  },
  {
    name: 'Leather Interior',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 21v-5a5 5 0 0110 0v5" />
        <path d="M6 11V7a2 2 0 012-2h8a2 2 0 012 2v4" />
        <path d="M10 11c0-1 1-2 2-2s2 1 2 2" />
      </svg>
    ),
  },
  {
    name: 'Parking Assist',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="3" width="14" height="18" />
        <text x="12" y="16" textAnchor="middle" fontSize="11" fill="currentColor" stroke="none" fontWeight="bold">P</text>
      </svg>
    ),
  },
  {
    name: 'Heated Mirrors',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 10l6-6v16l-6-6z" />
        <path d="M10 4h5a4 4 0 010 16h-5" />
        <path d="M14 9s1-1 2-1 2 1 2 1" />
        <path d="M14 15s1 1 2 1 2-1 2-1" />
      </svg>
    ),
  },
]

// Seeded random to get consistent per-feature decrements
function getDecrement(featureName) {
  let hash = 0
  for (let i = 0; i < featureName.length; i++) {
    hash = ((hash << 5) - hash + featureName.charCodeAt(i)) | 0
  }
  return 2 + Math.abs(hash % 4) // 2-5
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
}

export default function FeatureSearch() {
  const [active, setActive] = useState(new Set())
  const baseCount = 43

  const toggle = useCallback((name) => {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(name)) {
        next.delete(name)
      } else {
        next.add(name)
      }
      return next
    })
  }, [])

  const matchCount = Math.max(
    3,
    baseCount -
      [...active].reduce((sum, name) => sum + getDecrement(name), 0)
  )

  return (
    <section id="feature-search" className="relative bg-bg py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl text-text tracking-tight">
              Find Your Perfect Match
            </h2>
            <p className="mt-2 text-dim font-body text-base">
              Select the features that matter most to you
            </p>
          </motion.div>

          {/* Results bar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex items-center gap-5"
          >
            <div className="font-heading text-text text-lg flex items-center gap-2">
              <motion.span
                key={matchCount}
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="inline-block text-amber text-2xl font-bold tabular-nums"
              >
                {matchCount}
              </motion.span>
              <span className="text-dim text-sm">Vehicles Match</span>
            </div>

            {/* CTA button */}
            <button
              className="relative inline-block -skew-x-12 bg-amber px-6 py-3 border-none cursor-pointer
                         hover:bg-amber/90 transition-colors duration-200 group"
            >
              <span className="skew-x-12 inline-block font-heading text-bg text-sm font-semibold tracking-wide whitespace-nowrap">
                View{' '}
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={matchCount}
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    className="inline-block tabular-nums"
                  >
                    {matchCount}
                  </motion.span>
                </AnimatePresence>{' '}
                Matching Vehicles
              </span>
            </button>
          </motion.div>
        </div>

        {/* Feature grid */}
        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {features.map((feature) => {
            const isActive = active.has(feature.name)
            return (
              <motion.button
                key={feature.name}
                variants={itemVariants}
                onClick={() => toggle(feature.name)}
                className={`
                  relative flex flex-col items-center justify-center gap-2 py-4 px-2
                  bg-card border cursor-pointer transition-all duration-200
                  font-body text-xs sm:text-sm text-center
                  ${
                    isActive
                      ? 'border-amber text-amber shadow-[0_0_15px_rgba(232,168,73,0.15)]'
                      : 'border-border text-dim hover:border-amber/50'
                  }
                `}
                whileTap={{ scale: 0.96 }}
                style={{ borderRadius: 0 }}
              >
                <span className={`transition-colors duration-200 ${isActive ? 'text-amber' : 'text-dim'}`}>
                  {feature.icon}
                </span>
                <span className="leading-tight">{feature.name}</span>
              </motion.button>
            )
          })}
        </motion.div>

        {/* Active features summary */}
        <AnimatePresence>
          {active.size > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-6 overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-dim text-xs font-body mr-1">Active filters:</span>
                {[...active].map((name) => (
                  <motion.span
                    key={name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="inline-flex items-center gap-1 bg-amber/10 border border-amber/30 text-amber text-xs px-2 py-1 font-body cursor-pointer hover:bg-amber/20 transition-colors"
                    onClick={() => toggle(name)}
                    style={{ borderRadius: 0 }}
                  >
                    {name}
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </motion.span>
                ))}
                <button
                  onClick={() => setActive(new Set())}
                  className="text-dim text-xs font-body underline underline-offset-2 hover:text-text transition-colors bg-transparent border-none cursor-pointer ml-2"
                >
                  Clear all
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
