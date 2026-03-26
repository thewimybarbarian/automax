import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useFadeUp } from '../hooks/useFadeUp'

const stats = [
  {
    value: 28,
    suffix: '+',
    label: 'Years in Business',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    value: 10000,
    suffix: '+',
    label: 'Happy Customers',
    format: 'compact',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
  },
  {
    value: 3,
    suffix: '',
    label: 'OKC Metro Locations',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    value: 4.5,
    suffix: '★',
    label: 'Average Rating',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
]

const creditTiers = [
  { label: 'Excellent', range: '750+', color: 'from-emerald-400 to-emerald-500', width: '95%' },
  { label: 'Good', range: '700–749', color: 'from-emerald-400 to-amber', width: '80%' },
  { label: 'Fair', range: '600–699', color: 'from-amber to-amber-light', width: '65%' },
  { label: 'Rebuilding', range: 'Under 600', color: 'from-amber-light to-orange-400', width: '50%' },
]

/* Animated counter that counts up when visible */
function AnimatedStat({ value, suffix, format }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const start = performance.now()
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            setCount(eased * value)
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [value])

  const displayValue = format === 'compact'
    ? Math.round(count).toLocaleString('en-US')
    : Number.isInteger(value) ? Math.round(count) : count.toFixed(1)

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  )
}

export default function AboutSection() {
  const sectionRef = useFadeUp()

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 bg-bg overflow-hidden"
    >
      {/* Ambient background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(232,168,73,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 fade-up">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber/60" />
            <span className="text-amber uppercase tracking-[0.3em] text-xs font-semibold border border-amber/20 px-4 py-1.5 bg-amber/[0.05] font-body">
              Why AutoMax
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber/60" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-text mt-4 mb-6 font-body">
            Oklahoma&apos;s{' '}
            <span className="font-heading italic text-amber relative">
              Trusted
              <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent" />
            </span>{' '}
            Dealer
          </h2>
          <p className="text-text-dim text-lg max-w-2xl mx-auto leading-relaxed font-body">
            Family-owned and community-driven for over 28 years. We believe
            everyone deserves reliable transportation — no matter your credit
            history.
          </p>
        </div>

        {/* Stats Grid — premium cards with icons and animated counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="relative group rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Gradient border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber/25 via-white/[0.06] to-transparent p-px pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-full rounded-2xl bg-[#13131a]" />
              </div>

              {/* Hover glow */}
              <div
                className="absolute -inset-4 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(232,168,73,0.1) 0%, transparent 70%)' }}
              />

              {/* Card content */}
              <div className="relative rounded-2xl p-6 sm:p-8 text-center bg-gradient-to-b from-white/[0.03] to-transparent">
                {/* Icon circle */}
                <div className="mx-auto w-12 h-12 rounded-xl bg-amber/[0.08] border border-amber/20 flex items-center justify-center text-amber mb-4 group-hover:bg-amber/[0.15] group-hover:border-amber/40 transition-all duration-300">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-amber font-heading mb-1">
                  <AnimatedStat value={stat.value} suffix={stat.suffix} format={stat.format} />
                </div>
                <div className="text-text-dim text-xs sm:text-sm font-body tracking-wide">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Financing CTA — premium redesign with credit tiers */}
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Gradient border */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber/30 via-amber/10 to-amber/30 p-px pointer-events-none">
            <div className="w-full h-full rounded-2xl bg-[#13131a]" />
          </div>

          {/* Background texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(232,168,73,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, rgba(232,168,73,0.1) 0%, transparent 50%)' }}
          />

          <div className="relative rounded-2xl p-8 sm:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left — text content */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <span className="text-amber text-xs font-bold uppercase tracking-widest font-body">All Credit Welcome</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text mb-4 font-body leading-tight">
                  Flexible Financing for{' '}
                  <span className="font-heading italic text-amber">Everyone</span>
                </h3>
                <p className="text-text-dim text-base md:text-lg leading-relaxed mb-8 font-body">
                  Whether you have excellent credit, are rebuilding, or just starting
                  out — our network of banks, credit unions, and special finance
                  lenders means we can find the right option for you.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <a
                    href="#financing"
                    className="group relative overflow-hidden bg-gradient-to-r from-amber to-amber-light px-8 py-3.5 rounded-lg font-body text-sm font-bold uppercase tracking-wider text-bg transition-all hover:shadow-[0_0_30px_rgba(232,168,73,0.3)] cursor-pointer"
                  >
                    <span className="relative z-10 inline-flex items-center gap-2">
                      Apply Now
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </a>
                  <a
                    href="#about"
                    className="group border border-amber/40 hover:border-amber px-8 py-3.5 rounded-lg font-body text-sm font-bold uppercase tracking-wider text-amber transition-all hover:bg-amber/[0.08] cursor-pointer"
                  >
                    <span className="inline-flex items-center gap-2">
                      Learn More
                    </span>
                  </a>
                </div>
              </div>

              {/* Right — credit tier visual */}
              <div className="space-y-4">
                <p className="text-text-dim text-xs uppercase tracking-widest font-body mb-5">We work with every credit level</p>
                {creditTiers.map((tier, i) => (
                  <motion.div
                    key={tier.label}
                    className="group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-text text-sm font-semibold font-body">{tier.label}</span>
                      <span className="text-text-dim text-xs font-body">{tier.range}</span>
                    </div>
                    <div className="h-2.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${tier.color}`}
                        initial={{ width: '0%' }}
                        whileInView={{ width: tier.width }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
                      />
                    </div>
                    {/* Checkmark */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-emerald-400/80 text-[11px] font-body">Approved</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
