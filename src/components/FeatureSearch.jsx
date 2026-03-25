import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const features = [
  {
    name: 'Keyless Entry',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <circle cx="12" cy="16" r="2" fill="currentColor" />
        <line x1="10" y1="7" x2="14" y2="7" />
      </svg>
    ),
  },
  {
    name: 'Cruise Control',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
        <path d="M5 12h2M17 12h2" />
      </svg>
    ),
  },
  {
    name: 'Reverse Camera',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="13" rx="2" />
        <circle cx="12" cy="12.5" r="3.5" />
        <circle cx="12" cy="12.5" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Bluetooth',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 7l12 10-6 5V2l6 5L6 17" />
      </svg>
    ),
  },
  {
    name: 'Android Auto',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="5" width="16" height="11" rx="1" />
        <path d="M8 20h8" />
        <path d="M12 16v4" />
      </svg>
    ),
  },
  {
    name: 'Heated Seats',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 21v-6a4 4 0 014-4h0a4 4 0 014 4v6" />
        <path d="M7 11V8a2 2 0 012-2h6a2 2 0 012 2v3" />
        <path d="M9 4s1-2 3-2 3 2 3 2" />
      </svg>
    ),
  },
  {
    name: 'Navigation',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12,2 22,22 12,17 2,22" />
      </svg>
    ),
  },
  {
    name: 'Keyless Start',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Power Lift Gate',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="5" width="5" height="6" rx="0.5" />
        <rect x="10" y="5" width="5" height="6" rx="0.5" />
        <rect x="17" y="5" width="5" height="6" rx="0.5" />
        <rect x="3" y="13" width="5" height="6" rx="0.5" />
        <rect x="10" y="13" width="5" height="6" rx="0.5" />
        <rect x="17" y="13" width="5" height="6" rx="0.5" />
      </svg>
    ),
  },
  {
    name: 'Sunroof/Moonroof',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="7" width="18" height="12" rx="1" />
        <rect x="6" y="9" width="12" height="8" strokeDasharray="2 2" />
        <path d="M12 3v3M7 4l1 2.5M17 4l-1 2.5" />
      </svg>
    ),
  },
  {
    name: 'Towing Package',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="10" width="14" height="7" rx="1" />
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
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 21v-5a5 5 0 0110 0v5" />
        <path d="M6 11V7a2 2 0 012-2h8a2 2 0 012 2v4" />
        <path d="M10 11c0-1 1-2 2-2s2 1 2 2" />
      </svg>
    ),
  },
  {
    name: 'Parking Assist',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <text x="12" y="16" textAnchor="middle" fontSize="11" fill="currentColor" stroke="none" fontWeight="bold">P</text>
      </svg>
    ),
  },
  {
    name: 'Heated Mirrors',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 10l6-6v16l-6-6z" />
        <path d="M10 4h5a4 4 0 010 16h-5" />
        <path d="M14 9s1-1 2-1 2 1 2 1" />
        <path d="M14 15s1 1 2 1 2-1 2-1" />
      </svg>
    ),
  },
]

function getDecrement(featureName) {
  let hash = 0
  for (let i = 0; i < featureName.length; i++) {
    hash = ((hash << 5) - hash + featureName.charCodeAt(i)) | 0
  }
  return 2 + Math.abs(hash % 4)
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export default function FeatureSearch() {
  const [active, setActive] = useState(new Set())
  const baseCount = 43

  const toggle = useCallback((name) => {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name)
      else next.add(name)
      return next
    })
  }, [])

  const matchCount = Math.max(
    3,
    baseCount - [...active].reduce((sum, name) => sum + getDecrement(name), 0)
  )

  return (
    <section id="feature-search" className="relative bg-bg py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-amber/70 text-[11px] font-semibold uppercase tracking-[0.25em] mb-3">Personalize Your Search</p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text tracking-tight">
              Find Your Perfect <span className="text-amber">Match</span>
            </h2>
            <p className="mt-3 text-dim font-body text-base max-w-md">
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
            <div className="flex items-center gap-3">
              <div className="relative">
                <motion.span
                  key={matchCount}
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="inline-block text-amber text-4xl font-black tabular-nums font-heading"
                >
                  {matchCount}
                </motion.span>
              </div>
              <span className="text-dim text-sm leading-tight">Vehicles<br />Match</span>
            </div>

            <button
              className="relative inline-block -skew-x-12 bg-gradient-to-r from-amber to-amber-light px-7 py-3.5 border-none cursor-pointer
                         hover:brightness-110 transition-all duration-300 group shadow-[0_4px_20px_rgba(217,170,75,0.3)]"
            >
              <span className="skew-x-12 inline-block font-heading text-bg text-sm font-bold tracking-wide whitespace-nowrap">
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
          className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4"
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
                className="relative group flex flex-col items-center justify-center gap-3 py-5 sm:py-6 px-2
                  bg-transparent border-none cursor-pointer font-body text-xs sm:text-sm text-center outline-none"
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {/* Card background with gradient border */}
                <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-b from-amber/20 to-amber/5 shadow-[0_0_30px_rgba(232,168,73,0.2),inset_0_1px_0_rgba(232,168,73,0.3)]'
                    : 'bg-white/[0.03] group-hover:bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                }`} />
                <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'ring-1 ring-amber/60'
                    : 'ring-1 ring-white/[0.08] group-hover:ring-amber/30'
                }`} />

                {/* Animated icon container */}
                <div className="relative z-10">
                  {/* Glow ring behind icon */}
                  <div className={`absolute inset-0 -m-2 rounded-full transition-all duration-500 ${
                    isActive
                      ? 'bg-amber/20 blur-md scale-150 opacity-100'
                      : 'bg-amber/0 blur-md scale-100 opacity-0 group-hover:bg-amber/10 group-hover:opacity-100 group-hover:scale-125'
                  }`} />

                  {/* Icon circle */}
                  <motion.div
                    className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? 'bg-amber/20 text-amber'
                        : 'bg-white/[0.05] text-dim group-hover:text-amber/80 group-hover:bg-white/[0.08]'
                    }`}
                    animate={isActive ? {
                      boxShadow: [
                        '0 0 0 0 rgba(232,168,73,0.4)',
                        '0 0 0 8px rgba(232,168,73,0)',
                      ],
                    } : {}}
                    transition={isActive ? {
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeOut',
                    } : {}}
                  >
                    {feature.icon}
                  </motion.div>
                </div>

                {/* Label */}
                <span className={`relative z-10 leading-tight transition-colors duration-300 ${
                  isActive ? 'text-amber font-semibold' : 'text-dim group-hover:text-text'
                }`}>
                  {feature.name}
                </span>

                {/* Active check indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      className="absolute top-2 right-2 z-10 w-5 h-5 rounded-full bg-amber flex items-center justify-center"
                    >
                      <svg className="w-3 h-3 text-bg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
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
              className="mt-8 overflow-hidden"
            >
              <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl px-5 py-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-dim text-xs font-body mr-1 uppercase tracking-wider">Selected:</span>
                  {[...active].map((name) => (
                    <motion.span
                      key={name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-1.5 bg-amber/10 border border-amber/25 text-amber text-xs px-3 py-1.5 font-body cursor-pointer hover:bg-amber/20 transition-colors rounded-full"
                      onClick={() => toggle(name)}
                    >
                      {name}
                      <svg className="w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
