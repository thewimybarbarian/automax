import { useState, useEffect, useRef } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const team = [
  { name: 'Bob Brice', title: 'Sales Manager', dept: 'Sales', photo: '/images/BobBrice.webp' },
  { name: 'Shawn Stegall', title: 'Sales Manager', dept: 'Sales', photo: '/images/ShawnSegal.webp' },
  { name: 'Kelsi Gonzales', title: 'BDC Director', dept: 'Sales', photo: '/images/KelsiGonzales.webp' },
  { name: 'Margo Hayes', title: 'Receptionist', dept: 'Sales', photo: '/images/MargoHayes.webp' },
  { name: 'Angel Aguilar', title: 'Sales Professional', dept: 'Sales', photo: '/images/AngelAgular.webp' },
  { name: 'Victor Rivera', title: 'Sales Professional', dept: 'Sales', photo: '/images/VictorRivera.webp' },
  { name: 'Xavier Dennis', title: 'Sales Professional', dept: 'Sales', photo: '/images/XavierDennis.webp' },
  { name: 'Hailey Huff', title: 'Service Manager', dept: 'Service', photo: '/images/HaileyHuff.webp' },
  { name: 'Nancy Bratcher', title: 'Parts Manager', dept: 'Parts', photo: '/images/NancyBratcher.webp' },
]

const stats = [
  { value: '28+', label: 'Years' },
  { value: '10K+', label: 'Customers' },
  { value: '3', label: 'Locations' },
  { value: '4.5★', label: 'Rating' },
]

/* ─────────────────────────────────────────────
   ANIMATED COUNTER HOOK
───────────────────────────────────────────── */
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const num = parseInt(target.replace(/[^0-9]/g, '')) || 0
          const startTime = performance.now()

          const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * num))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  const suffix = target.replace(/[0-9]/g, '')
  return { ref, display: count + suffix }
}

function StatCounter({ value, label }) {
  const { ref, display } = useCountUp(value)
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-amber font-heading tracking-tight">
        {display}
      </div>
      <div className="text-text-dim text-xs uppercase tracking-[0.25em] mt-2 font-body">{label}</div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   TEAM FILMSTRIP CARD
───────────────────────────────────────────── */
function TeamCard({ person }) {
  const deptColors = {
    Sales: 'bg-amber/90',
    Service: 'bg-emerald-500/90',
    Parts: 'bg-sky-500/90',
  }

  return (
    <div className="group relative w-[280px] sm:w-[300px] shrink-0 snap-start scroll-ml-6">
      <div className="relative h-[400px] overflow-hidden bg-card border border-border hover:border-amber/40 transition-all duration-500">
        {/* Photo */}
        <img
          src={person.photo}
          alt={person.name}
          className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 group-hover:brightness-50"
        />

        {/* Department badge */}
        <div className={`absolute top-4 left-4 ${deptColors[person.dept] || 'bg-amber/90'} px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-bg backdrop-blur-sm`}>
          {person.dept}
        </div>

        {/* Bottom gradient — always visible */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

        {/* Info — slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <h3 className="text-xl font-bold text-text font-body leading-tight">{person.name}</h3>
          <p className="text-amber text-sm font-medium uppercase tracking-wider mt-1 font-body">{person.title}</p>
          {/* Hover-reveal accent line */}
          <div className="w-0 group-hover:w-12 h-0.5 bg-amber mt-3 transition-all duration-500" />
        </div>

        {/* Corner accents on hover */}
        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-transparent group-hover:border-amber/60 transition-all duration-500" />
        <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-transparent group-hover:border-amber/60 transition-all duration-500" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   BENTO VALUE CARD
───────────────────────────────────────────── */
function BentoCard({ icon, title, description, className = '', index }) {
  return (
    <div
      className={`fade-up group relative bg-card border border-border overflow-hidden hover:border-amber/40 transition-all duration-500 ${className}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Ambient glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative p-8 sm:p-10 h-full flex flex-col">
        {/* Icon */}
        <div className="w-14 h-14 border border-amber/20 flex items-center justify-center text-amber mb-6 group-hover:border-amber/50 group-hover:bg-amber/10 transition-all duration-500">
          {icon}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-text font-body mb-3 group-hover:text-amber transition-colors duration-300">
          {title}
        </h3>
        <p className="text-text-dim font-body leading-relaxed text-sm sm:text-base flex-1">
          {description}
        </p>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/0 group-hover:via-amber/50 to-transparent transition-all duration-700" />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function AboutUsPage() {
  const sectionRef = useFadeUp()
  const filmstripRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track filmstrip scroll for the progress indicator
  useEffect(() => {
    const el = filmstripRef.current
    if (!el) return
    const onScroll = () => {
      const max = el.scrollWidth - el.clientWidth
      setScrollProgress(max > 0 ? el.scrollLeft / max : 0)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={sectionRef} className="bg-bg min-h-screen overflow-hidden">

      {/* ════════════════════════════════════════
          1. IMMERSIVE HERO — Full viewport
      ════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-end">
        {/* Background image with parallax feel */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero.webp)' }}
        />
        {/* Heavy overlay — cinematic */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/40 to-bg" />
        {/* Amber accent at very top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-amber/50" />

        {/* Content — positioned at bottom */}
        <div className="relative z-10 px-6 pb-16 pt-40 max-w-7xl mx-auto w-full">
          {/* Breadcrumb */}
          <nav className="fade-up flex items-center gap-2 text-xs font-body uppercase tracking-widest mb-12 text-text-dim">
            <a href="#home" className="text-amber hover:text-amber-light transition-colors">Home</a>
            <span className="text-border">/</span>
            <span>About Us</span>
          </nav>

          {/* Giant headline */}
          <h1 className="fade-up text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-text font-body leading-[0.95] mb-6 max-w-4xl">
            Driven by
            <br />
            <span className="font-heading italic text-amber">Family.</span>
            <br />
            Built on
            <br />
            <span className="font-heading italic text-amber">Trust.</span>
          </h1>

          <p className="fade-up text-text-dim text-lg sm:text-xl max-w-xl font-body leading-relaxed mb-12">
            For 28 years, AutoMax has been putting Oklahoma families behind the wheel — with integrity, flexibility, and zero pressure.
          </p>

          {/* Stat ticker — horizontal */}
          <div className="fade-up flex items-center gap-8 sm:gap-14 md:gap-20 overflow-x-auto pb-4 scrollbar-hide">
            {stats.map((s) => (
              <StatCounter key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-text-dim text-[10px] uppercase tracking-widest font-body">Scroll</span>
          <svg className="w-4 h-4 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ════════════════════════════════════════
          2. STORY — Split-screen reveal
      ════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        {/* Subtle radial background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(232,168,73,0.04) 0%, transparent 50%)' }}
        />

        <div className="relative mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left column — pull quote */}
          <div className="lg:col-span-5">
            <div className="fade-up sticky top-32">
              <div className="text-amber/10 text-[120px] sm:text-[160px] font-heading leading-none select-none -mb-16 -ml-4">"</div>
              <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold text-text font-body leading-snug">
                Everyone deserves
                <span className="text-amber font-heading italic"> reliable transportation</span>
                — no matter your credit history.
              </blockquote>
              <div className="w-16 h-0.5 bg-amber mt-8" />
              <p className="text-text-dim text-sm uppercase tracking-widest mt-4 font-body">AutoMax Founding Principle</p>
            </div>
          </div>

          {/* Right column — flowing paragraphs */}
          <div className="lg:col-span-7 space-y-8">
            <p className="fade-up text-text-dim text-lg leading-relaxed font-body">
              Welcome to AutoMax Auto Group — a fast and convenient way to find the perfect used vehicle.
              Whether you're looking for a car, truck, or SUV, we've helped thousands of customers
              across Del City, Oklahoma City, Midwest City, Edmond, Norman, Moore, Choctaw, and Yukon
              find their next ride.
            </p>
            <p className="fade-up text-text-dim text-lg leading-relaxed font-body">
              For nearly three decades, our family has been proud to serve the Oklahoma community with
              integrity and passion. What started as a single lot has grown into three locations across
              the metro — but our values haven't changed. We still treat every customer like family.
            </p>
            <p className="fade-up text-text-dim text-lg leading-relaxed font-body">
              As a premier Oklahoma dealer, we carry a huge selection of used and certified vehicles.
              We offer full service & parts departments, online inventory browsing, and outstanding
              financing options — from banks and credit unions to special finance lenders who work with
              every credit situation.
            </p>

            {/* Inline CTA */}
            <div className="fade-up flex flex-wrap gap-4 pt-4">
              <a
                href="#inventory"
                className="inline-block skew-x-[-4deg] bg-amber hover:bg-amber-light transition-colors duration-300"
              >
                <span className="inline-block skew-x-[4deg] px-8 py-3.5 text-bg font-bold text-sm uppercase tracking-wider font-body">
                  Browse Inventory
                </span>
              </a>
              <a
                href="#contact"
                className="inline-block skew-x-[-4deg] border-2 border-amber/70 hover:border-amber hover:bg-amber/10 transition-all duration-300"
              >
                <span className="inline-block skew-x-[4deg] px-8 py-3.5 text-amber font-bold text-sm uppercase tracking-wider font-body">
                  Contact Us
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          3. TEAM — Horizontal filmstrip
      ════════════════════════════════════════ */}
      <section className="relative py-32">
        {/* Background accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(232,168,73,0.06) 0%, transparent 40%)' }}
        />

        <div className="relative">
          {/* Section header */}
          <div className="px-6 max-w-7xl mx-auto mb-14">
            <span className="fade-up text-amber text-xs font-bold uppercase tracking-[0.3em] font-body mb-4 block">
              Our People
            </span>
            <div className="fade-up flex items-end justify-between gap-8 flex-wrap">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text font-body leading-[0.95]">
                Meet the{' '}
                <span className="font-heading italic text-amber">Team</span>
              </h2>
              <p className="text-text-dim font-body max-w-md text-base hidden md:block">
                Every person at AutoMax is committed to making your car-buying experience the best it can be.
              </p>
            </div>
          </div>

          {/* Filmstrip — full-bleed horizontal scroll */}
          <div
            ref={filmstripRef}
            className="fade-up flex gap-5 overflow-x-auto px-6 pb-6 snap-x snap-mandatory scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {/* Spacer for centering first card */}
            <div className="shrink-0 w-0 lg:w-[calc((100vw-1280px)/2)]" />

            {team.map((person) => (
              <TeamCard key={person.name} person={person} />
            ))}

            {/* End spacer */}
            <div className="shrink-0 w-6" />
          </div>

          {/* Scroll progress bar */}
          <div className="px-6 max-w-7xl mx-auto mt-8">
            <div className="h-px bg-border relative overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-amber transition-all duration-150 ease-out"
                style={{ width: `${Math.max(scrollProgress * 100, 5)}%` }}
              />
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-text-dim text-[10px] uppercase tracking-widest font-body">
                ← Drag to explore
              </span>
              <span className="text-text-dim text-[10px] uppercase tracking-widest font-body">
                {team.length} team members
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          4. VALUES — Bento grid
      ════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-16">
            <span className="fade-up text-amber text-xs font-bold uppercase tracking-[0.3em] font-body mb-4 block">
              Why AutoMax
            </span>
            <h2 className="fade-up text-4xl sm:text-5xl font-bold text-text font-body leading-tight">
              The{' '}
              <span className="font-heading italic text-amber">Difference</span>
            </h2>
          </div>

          {/* Bento layout — asymmetric */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Large card — spans full height on left */}
            <BentoCard
              index={0}
              className="md:row-span-2"
              icon={
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="square" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
              }
              title="No-Pressure Experience"
              description="Our staff listens to your needs without pushing or pressuring. We believe in helping you find the right vehicle, not making a quick sale. Every interaction is built on respect, transparency, and genuine care for your satisfaction. From your first visit to years down the road, we treat you like family — because that's what this business was built on."
            />

            {/* Two smaller cards stacked on right */}
            <BentoCard
              index={1}
              icon={
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="square" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Flexible Financing"
              description="Whether you have excellent credit, are rebuilding, or just starting out — our network of banks, credit unions, and special finance lenders has options for everyone."
            />

            <BentoCard
              index={2}
              icon={
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="square" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
                </svg>
              }
              title="Full Service & Parts"
              description="Our certified technicians keep your vehicle running at peak performance. From routine maintenance to major repairs, genuine parts and expert workmanship."
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          5. CTA — Dissolves into footer
      ════════════════════════════════════════ */}
      <section className="relative py-32 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="fade-up text-4xl sm:text-5xl md:text-6xl font-bold text-text font-body leading-tight mb-6">
            Ready to find your
            <br />
            <span className="font-heading italic text-amber">perfect ride?</span>
          </h2>
          <p className="fade-up text-text-dim text-lg sm:text-xl font-body max-w-2xl mx-auto mb-12">
            Stop by any of our three Oklahoma metro locations. No appointment needed — walk-ins are always welcome.
          </p>
          <div className="fade-up flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="inline-block skew-x-[-4deg] bg-amber hover:bg-amber-light transition-colors duration-300"
            >
              <span className="inline-block skew-x-[4deg] px-10 py-4 text-bg font-bold text-sm uppercase tracking-wider font-body">
                Schedule a Test Drive
              </span>
            </a>
            <a
              href="tel:4056064000"
              className="inline-block skew-x-[-4deg] border-2 border-amber/70 hover:border-amber hover:bg-amber/10 transition-all duration-300"
            >
              <span className="inline-block skew-x-[4deg] px-10 py-4 text-amber font-bold text-sm uppercase tracking-wider font-body">
                Call (405) 606-4000
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
