import { useState, useEffect } from 'react'

const logoSvg = '/images/auto-max-logo-city.png'

const navLinks = [
  { label: 'Inventory', href: '#inventory' },
  { label: 'Financing', href: '#financing' },
  { label: 'About', href: '#about-us' },
  { label: 'Service', href: '#service' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg/95 border-b border-border backdrop-blur-md'
            : 'bg-black/30 backdrop-blur-sm border-b border-white/5'
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          <a href="#" className="shrink-0">
            <img src={logoSvg} alt="AutoMax Auto Group" className="h-14 sm:h-20 lg:h-24 w-auto" />
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

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-bg/98 backdrop-blur-lg flex flex-col">
          <div className="flex items-center justify-between px-6 py-4">
            <img src={logoSvg} alt="AutoMax Auto Group" className="h-14 sm:h-20 lg:h-24 w-auto" />
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
    </>
  )
}
