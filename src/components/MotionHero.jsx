import { motion } from 'framer-motion'
import HeroParticles from './HeroParticles'
import HeroBirds from './HeroBirds'
import HeadlightFlicker from './HeadlightFlicker'
import CustomSelect from './CustomSelect'

const makeOptions = ['Any Make', 'Chevrolet', 'Dodge', 'Ford', 'GMC', 'Honda', 'Hyundai', 'Jeep', 'Kia', 'Nissan', 'Ram', 'Toyota']
const modelOptions = ['Any Model']
const priceOptions = ['Any Price', 'Under $15K', '$15K-$20K', '$20K-$25K', '$25K-$30K', 'Over $30K']
const yearOptions = ['Any Year', '2024', '2023', '2022', '2021', '2020', '2019']

export default function MotionHero() {
  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-bg">
        {/* Background image */}
        <img
          src="/images/hero.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover hero-bg-img"
        />
        {/* Dark overlay — lighter on mobile so car image is more visible */}
        <div className="absolute inset-0 bg-bg/30 sm:bg-bg/50" />

        {/* Particle effect */}
        <HeroParticles />

        {/* Subtle flying birds */}
        <HeroBirds />

        {/* Headlight unlock flash */}
        <HeadlightFlicker />

        {/* Animated shimmer */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-amber/5 to-transparent pointer-events-none"
          style={{ animation: 'shimmer 8s ease-in-out infinite' }}
        />
        {/* Bottom gradient fade to solid bg */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-bg to-transparent" />
        {/* Amber accent line across top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber to-transparent" />
        {/* Angular amber glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(232,168,73,0.12) 0%, transparent 70%)',
          }}
        />
        {/* Diagonal accent lines */}
        <div className="absolute top-20 right-0 w-48 h-px bg-gradient-to-l from-amber/20 to-transparent skew-y-[-20deg]" />
        <div className="absolute bottom-40 left-0 w-64 h-px bg-gradient-to-r from-amber/15 to-transparent skew-y-[15deg]" />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center px-4 sm:px-6 pt-24 sm:pt-28 pb-10 sm:pb-16">
          <div>
            {/* Badge */}
            <motion.span
              className="mb-8 inline-block border-l-2 border-amber pl-4 font-body text-xs tracking-[0.3em] uppercase text-amber"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Serving Oklahoma for 28+ Years
            </motion.span>

            {/* Heading */}
            <motion.h1
              className="font-body text-5xl font-extrabold leading-[1.05] text-text sm:text-6xl md:text-7xl lg:text-8xl tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              The Deals Are{' '}
              <span className="font-heading italic text-amber">Automatic</span>
              <br className="hidden sm:block" />
              <span className="text-text"> at AutoMax.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mt-8 max-w-2xl font-body text-lg leading-relaxed text-text-dim md:text-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Flexible financing for every credit situation. From excellent credit
              to rebuilding&nbsp;&mdash; we help Oklahoma drivers get behind the wheel.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="mt-12 flex flex-wrap items-center justify-center gap-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.5, type: 'spring', stiffness: 100, damping: 15 }}
            >
              <a
                href="#inventory"
                className="group relative bg-amber px-12 py-4 font-body text-base font-bold uppercase tracking-wider text-bg transition-all hover:bg-amber-light skew-x-[-4deg]"
              >
                <span className="skew-x-[4deg] inline-flex items-center gap-3">
                  Browse Inventory
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
              <a
                href="#financing"
                className="group border-2 border-amber px-12 py-4 font-body text-base font-bold uppercase tracking-wider text-amber transition-all hover:bg-amber hover:text-bg skew-x-[-4deg]"
              >
                <span className="skew-x-[4deg] inline-block">Get Pre-Approved</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom spacer for search bar overlap */}
        <div className="h-28" />
      </section>

      {/* ── Vehicle search bar — outside section to avoid overflow:hidden clipping dropdowns ── */}
      <div className="relative z-20 -mt-20 px-4 sm:px-6">
      <motion.div
        className="mx-auto w-full max-w-5xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] md:p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <CustomSelect options={makeOptions} />
          <CustomSelect options={modelOptions} />
          <CustomSelect options={priceOptions} />
          <CustomSelect options={yearOptions} />
          <button className="inline-flex items-center justify-center gap-2 bg-amber px-6 py-3.5 font-body text-sm font-bold uppercase tracking-wider text-bg transition-all hover:bg-amber-light cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
            </svg>
            Search
          </button>
        </div>
      </motion.div>
      </div>
    </div>
  )
}
