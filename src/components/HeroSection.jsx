import { useState, useEffect } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'
const logoSvg = '/images/auto-max-logo-3.png'

const navLinks = [
  { label: 'Inventory', href: '#inventory' },
  { label: 'Financing', href: '#financing' },
  { label: 'About', href: '#about-us' },
  { label: 'Service', href: '#service' },
  { label: 'Contact', href: '#contact' },
]

const makeOptions = ['Any Make', 'Chevrolet', 'Dodge', 'Ford', 'GMC', 'Honda', 'Hyundai', 'Jeep', 'Kia', 'Nissan', 'Ram', 'Toyota']
const modelOptions = ['Any Model']
const priceOptions = ['Any Price', 'Under $15K', '$15K-$20K', '$20K-$25K', '$25K-$30K', 'Over $30K']
const yearOptions = ['Any Year', '2024', '2023', '2022', '2021', '2020', '2019']

export default function HeroSection() {
  const sectionRef = useFadeUp()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <div ref={sectionRef}>
      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/95 border-b border-border backdrop-blur-md'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <a href="#" className="shrink-0">
            <img src={logoSvg} alt="AutoMax Auto Group" className="w-[280px]" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-sm uppercase tracking-widest text-text-dim hover:text-amber transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="tel:4056064000"
            className="hidden md:inline-flex items-center gap-2 bg-amber px-6 py-2.5 font-body text-sm font-bold uppercase tracking-wider text-bg transition-all hover:bg-amber-light skew-x-[-4deg]"
          >
            <span className="skew-x-[4deg] inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
              </svg>
              (405) 606-4000
            </span>
          </a>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-text p-2"
            aria-label="Open menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-bg/98 backdrop-blur-lg flex flex-col">
          <div className="flex items-center justify-between px-6 py-4">
            <img src={logoSvg} alt="AutoMax Auto Group" className="w-[280px]" />
            <button onClick={() => setMobileOpen(false)} className="text-text p-2" aria-label="Close menu">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="font-heading text-3xl text-text hover:text-amber transition-colors">
                {link.label}
              </a>
            ))}
            <a href="tel:4056064000" className="mt-4 inline-flex items-center gap-2 bg-amber px-8 py-3 font-body text-base font-semibold text-bg">
              Call (405) 606-4000
            </a>
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-bg">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero.png)' }}
        />
        {/* Dark overlay with gradient */}
        <div className="absolute inset-0 bg-bg/50" />
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

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center px-6 pt-28 pb-16">
          {/* Glass content panel */}
          <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] p-8 sm:p-12">
            {/* Badge */}
            <span className="fade-up mb-8 inline-block border-l-2 border-amber pl-4 font-body text-xs tracking-[0.3em] uppercase text-amber">
              Serving Oklahoma for 28+ Years
            </span>

            {/* Heading */}
            <h1 className="fade-up font-body text-5xl font-extrabold leading-[1.05] text-text sm:text-6xl md:text-7xl lg:text-8xl tracking-tight">
              The Deals Are{' '}
              <span className="font-heading italic text-amber">Automatic</span>
              <br className="hidden sm:block" />
              <span className="text-text"> at AutoMax.</span>
            </h1>

            {/* Subtitle */}
            <p className="fade-up mt-8 max-w-2xl font-body text-lg leading-relaxed text-text-dim md:text-xl mx-auto">
              Flexible financing for every credit situation. From excellent credit
              to rebuilding&nbsp;&mdash; we help Oklahoma drivers get behind the wheel.
            </p>

            {/* CTA buttons */}
            <div className="fade-up mt-12 flex flex-wrap items-center justify-center gap-5">
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
            </div>
          </div>
        </div>

        {/* ── Vehicle search bar ── */}
        <div className="fade-up relative z-10 mx-auto w-full max-w-5xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.5)] md:p-6 mx-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <select className="w-full appearance-none border border-white/10 bg-white/10 backdrop-blur px-4 py-3.5 font-body text-sm text-text outline-none transition-colors focus:border-amber/50 cursor-pointer">
              {makeOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select className="w-full appearance-none border border-white/10 bg-white/10 backdrop-blur px-4 py-3.5 font-body text-sm text-text outline-none transition-colors focus:border-amber/50 cursor-pointer">
              {modelOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select className="w-full appearance-none border border-white/10 bg-white/10 backdrop-blur px-4 py-3.5 font-body text-sm text-text outline-none transition-colors focus:border-amber/50 cursor-pointer">
              {priceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <select className="w-full appearance-none border border-white/10 bg-white/10 backdrop-blur px-4 py-3.5 font-body text-sm text-text outline-none transition-colors focus:border-amber/50 cursor-pointer">
              {yearOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <button className="inline-flex items-center justify-center gap-2 bg-amber px-6 py-3.5 font-body text-sm font-bold uppercase tracking-wider text-bg transition-all hover:bg-amber-light cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607z" />
              </svg>
              Search
            </button>
          </div>
        </div>
        {/* Bottom spacer */}
        <div className="h-16" />
      </section>
    </div>
  )
}
