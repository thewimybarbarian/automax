import { motion } from 'framer-motion'

const trustSignals = [
  {
    icon: (
      <svg className="w-5 h-5 text-amber" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
        <text x="12" y="17" textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="bold" fontFamily="sans-serif">G</text>
      </svg>
    ),
    text: '4.5\u2605 Google Reviews',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    text: '10,000+ Happy Customers',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    text: 'BBB Accredited',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    text: 'Family Owned Since 1998',
  },
  {
    icon: (
      <svg className="w-5 h-5 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <path d="M22 4L12 14.01l-3-3" />
      </svg>
    ),
    text: 'CARFAX Partner',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

function Dot() {
  return <span className="w-1.5 h-1.5 rounded-full bg-amber/60 shrink-0" />
}

export default function TrustStrip() {
  return (
    <div className="w-full bg-card/80 border-y border-border py-4 px-6 overflow-hidden">
      {/* Desktop: static flex row */}
      <motion.div
        className="hidden md:flex items-center justify-center gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        {trustSignals.map((signal, i) => (
          <motion.div key={i} variants={itemVariants} className="flex items-center gap-2">
            {i > 0 && <Dot />}
            <div className="flex items-center gap-2 text-text-dim text-sm font-body">
              {signal.icon}
              <span>{signal.text}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Mobile: auto-scrolling marquee */}
      <div className="md:hidden relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="trust-marquee">
            <div className="trust-marquee-track">
              {/* First set */}
              {trustSignals.map((signal, i) => (
                <div key={`a-${i}`} className="flex items-center gap-2 text-text-dim text-sm font-body shrink-0 px-4">
                  {signal.icon}
                  <span className="whitespace-nowrap">{signal.text}</span>
                  <Dot />
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {trustSignals.map((signal, i) => (
                <div key={`b-${i}`} className="flex items-center gap-2 text-text-dim text-sm font-body shrink-0 px-4">
                  {signal.icon}
                  <span className="whitespace-nowrap">{signal.text}</span>
                  <Dot />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <style>{`
          .trust-marquee {
            overflow: hidden;
            width: 100%;
          }
          .trust-marquee-track {
            display: flex;
            width: max-content;
            animation: trust-scroll 25s linear infinite;
          }
          @keyframes trust-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </div>
  )
}
