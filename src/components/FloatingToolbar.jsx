import { useState, useEffect } from 'react'

const sortOptions = [
  { value: 'low-high', label: 'Low to High' },
  { value: 'high-low', label: 'High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'mileage', label: 'Lowest Miles' },
]

export default function FloatingToolbar() {
  const [visible, setVisible] = useState(false)
  const [sortOpen, setSortOpen] = useState(false)
  const [sortValue, setSortValue] = useState('low-high')
  const [pulse, setPulse] = useState(false)

  // Show after scrolling past hero
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Pulse animation on first appear
  useEffect(() => {
    if (visible) {
      setPulse(true)
      const t = setTimeout(() => setPulse(false), 1500)
      return () => clearTimeout(t)
    }
  }, [visible])

  // Close dropdown on outside click
  useEffect(() => {
    if (!sortOpen) return
    const close = () => setSortOpen(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [sortOpen])

  return (
    <div
      className={`fixed top-20 right-6 z-[999] flex items-center gap-1.5 transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 translate-x-16 pointer-events-none'
      }`}
    >
      {/* Action buttons */}
      <div className={`flex items-center gap-1.5 ${pulse ? 'animate-[toolbarEntry_0.6s_ease-out]' : ''}`}>
        {/* Phone */}
        <a
          href="tel:+14056064000"
          className="group relative w-11 h-11 flex items-center justify-center bg-card/90 backdrop-blur-md border border-border hover:border-amber hover:bg-amber/10 transition-all duration-300 cursor-pointer"
          title="Call Us"
        >
          <svg className="w-[18px] h-[18px] text-text-dim group-hover:text-amber transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          {/* Tooltip */}
          <span className="absolute right-full mr-2 px-2.5 py-1 bg-bg border border-border text-text text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            (405) 606-4000
          </span>
        </a>

        {/* Dot separator */}
        <span className="w-1 h-1 bg-amber/40 shrink-0" />

        {/* Locations */}
        <a
          href="#contact"
          className="group relative w-11 h-11 flex items-center justify-center bg-card/90 backdrop-blur-md border border-border hover:border-amber hover:bg-amber/10 transition-all duration-300 cursor-pointer"
          title="Find a Location"
        >
          <svg className="w-[18px] h-[18px] text-text-dim group-hover:text-amber transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="absolute right-full mr-2 px-2.5 py-1 bg-bg border border-border text-text text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            3 Locations
          </span>
        </a>

        {/* Search */}
        <a
          href="#inventory"
          className="group relative w-11 h-11 flex items-center justify-center bg-card/90 backdrop-blur-md border border-border hover:border-amber hover:bg-amber/10 transition-all duration-300 cursor-pointer"
          title="Search Inventory"
        >
          <svg className="w-[18px] h-[18px] text-text-dim group-hover:text-amber transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span className="absolute right-full mr-2 px-2.5 py-1 bg-bg border border-border text-text text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Search
          </span>
        </a>
      </div>

      {/* Sort dropdown */}
      <div className="relative ml-1">
        <button
          onClick={(e) => { e.stopPropagation(); setSortOpen(!sortOpen) }}
          className={`flex items-center gap-2 bg-card/90 backdrop-blur-md border px-3.5 h-11 text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
            sortOpen ? 'border-amber text-amber' : 'border-border text-text-dim hover:border-amber/50 hover:text-text'
          }`}
        >
          {sortOptions.find((o) => o.value === sortValue)?.label}
          <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {sortOpen && (
          <div className="absolute top-full right-0 mt-1.5 bg-card border border-border min-w-[160px] shadow-2xl animate-[dropIn_0.2s_ease-out]">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={(e) => {
                  e.stopPropagation()
                  setSortValue(opt.value)
                  setSortOpen(false)
                }}
                className={`w-full text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                  sortValue === opt.value
                    ? 'text-amber bg-amber/10'
                    : 'text-text-dim hover:text-text hover:bg-bg/50'
                }`}
              >
                {opt.value === sortValue && (
                  <span className="inline-block w-1.5 h-1.5 bg-amber mr-2" />
                )}
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes toolbarEntry {
          0% { transform: translateX(20px) scale(0.9); opacity: 0; }
          50% { transform: translateX(-4px) scale(1.02); }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
