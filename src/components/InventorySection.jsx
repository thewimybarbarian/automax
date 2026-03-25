import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useFadeUp } from '../hooks/useFadeUp'
import VehicleDetailModal from './VehicleDetailModal'

const vehicles = [
  { id: 1, year: 2022, make: 'Chevrolet', model: 'Equinox LT', price: 24995, miles: 28400, type: 'SUV', mpg: 31, color: 'Silver', engine: 'I4 Turbo', transmission: 'Automatic', drivetrain: 'FWD', badge: 'Just Listed', img: '/images/Chevrolet Equinox.webp' },
  { id: 2, year: 2023, make: 'Chevrolet', model: 'Traverse LT', price: 34995, miles: 18200, type: 'SUV', mpg: 25, color: 'White', engine: 'V6', transmission: 'Automatic', drivetrain: 'AWD', badge: null, img: '/images/Chevrolet Traverse.webp' },
  { id: 3, year: 2022, make: 'Buick', model: 'Encore GX', price: 26495, miles: 21300, type: 'SUV', mpg: 30, color: 'Gray', engine: 'I4 Turbo', transmission: 'Automatic', drivetrain: 'AWD', badge: 'Price Drop', img: '/images/Buick Encore.webp' },
  { id: 4, year: 2023, make: 'Jeep', model: 'Cherokee Latitude', price: 29995, miles: 15800, type: 'SUV', mpg: 27, color: 'Black', engine: 'V6', transmission: 'Automatic', drivetrain: '4WD', badge: 'Hot', img: '/images/Jeep Cherokee.webp' },
  { id: 5, year: 2023, make: 'Hyundai', model: 'Kona SEL', price: 23495, miles: 12400, type: 'SUV', mpg: 33, color: 'Blue', engine: 'I4', transmission: 'Automatic', drivetrain: 'AWD', badge: 'Just Listed', img: '/images/Hyundai Kona.webp' },
  { id: 6, year: 2022, make: 'Jeep', model: 'Renegade Sport', price: 22995, miles: 26100, type: 'SUV', mpg: 29, color: 'Red', engine: 'I4 Turbo', transmission: 'Automatic', drivetrain: '4WD', badge: null, img: '/images/Jeep Renegade.webp' },
]

function BadgeIcon({ badge }) {
  if (badge === 'Price Drop') {
    return (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    )
  }
  if (badge === 'Hot') {
    return (
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 23c-4.97 0-9-3.58-9-8 0-3.07 2.13-5.54 3.5-6.9.4-.39 1.05-.15 1.12.4.16 1.27.63 2.56 1.58 3.5.16.16.44.05.44-.18 0-2.03.7-4.3 2.36-6.32.34-.41.96-.32 1.17.15C14.21 8.3 15 10.2 15 12c0 .69-.16 1.36-.44 1.97a.255.255 0 00.38.29c.67-.51 1.2-1.2 1.56-2.01.18-.41.7-.49 1 -.14C18.43 13.12 21 15.42 21 18c0 2.76-4.03 5-9 5z" />
      </svg>
    )
  }
  return null
}

function getBadgeStyles(badge) {
  switch (badge) {
    case 'Just Listed':
      return 'bg-amber text-bg animate-pulse'
    case 'Price Drop':
      return 'bg-emerald-500 text-white'
    case 'Hot':
      return 'bg-red-500 text-white'
    default:
      return ''
  }
}

const filterCategories = [
  { key: 'year', label: 'YEAR', options: ['2023', '2022', '2021', '2020', '2019'] },
  { key: 'make', label: 'MAKE', options: ['Chevrolet', 'Dodge', 'Ford', 'Hyundai', 'Kia', 'Toyota'] },
  { key: 'type', label: 'BODY STYLE', options: ['Sedan', 'SUV', 'Truck'] },
  { key: 'price', label: 'PRICE', options: ['Under $20K', '$20K–$30K', '$30K–$40K', 'Over $40K'] },
  { key: 'color', label: 'COLOR', options: ['Black', 'Blue', 'Gray', 'Red', 'Silver', 'White'] },
  { key: 'engine', label: 'ENGINE', options: ['I4', 'I4 Turbo', 'V6', 'V6 Turbo', 'V8'] },
  { key: 'transmission', label: 'TRANSMISSION', options: ['Automatic', 'Manual'] },
  { key: 'drivetrain', label: 'DRIVETRAIN', options: ['FWD', 'RWD', 'AWD', '4WD'] },
]

function CarIcon() {
  return (
    <svg className="w-16 h-16 text-amber/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 002 2h1a2 2 0 002-2M14 17a2 2 0 002 2h1a2 2 0 002-2" />
      <circle cx="7.5" cy="14.5" r="1.5" />
      <circle cx="16.5" cy="14.5" r="1.5" />
    </svg>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-4 h-4 text-text-dim transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function VehicleImage({ vehicle }) {
  const [imgError, setImgError] = useState(false)

  if (imgError) {
    return (
      <div className="w-full h-56 bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0d0d0d] flex items-center justify-center">
        <div className="text-center">
          <CarIcon />
          <p className="text-text-dim/40 text-xs mt-2 font-body">{vehicle.year} {vehicle.make}</p>
        </div>
      </div>
    )
  }

  return (
    <img
      src={vehicle.img}
      alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
      onError={() => setImgError(true)}
      loading="lazy"
    />
  )
}

function FilterSidebar({ filters, setFilters, searchQuery, setSearchQuery, activeCount }) {
  const [openSections, setOpenSections] = useState({})

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleFilter = (key, value) => {
    setFilters((prev) => {
      const current = prev[key] || []
      if (current.includes(value)) {
        return { ...prev, [key]: current.filter((v) => v !== value) }
      }
      return { ...prev, [key]: [...current, value] }
    })
  }

  const clearAll = () => {
    setFilters({})
    setSearchQuery('')
  }

  return (
    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] border-t-2 border-t-amber/30 p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-text">Filters</h3>
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="text-amber text-xs font-semibold uppercase tracking-wider hover:text-amber-light transition-colors cursor-pointer"
          >
            Clear All ({activeCount})
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/[0.06] border border-white/[0.08] text-text text-sm pl-10 pr-4 py-2.5 focus:outline-none focus:border-amber/50 transition-colors placeholder:text-text-dim/50"
        />
      </div>

      {/* Filter Categories */}
      <div className="space-y-0">
        {filterCategories.map((cat) => {
          const isOpen = openSections[cat.key]
          const activeInCategory = (filters[cat.key] || []).length

          return (
            <div key={cat.key} className="border-t border-white/[0.06]">
              <button
                onClick={() => toggleSection(cat.key)}
                className="w-full flex items-center justify-between py-3.5 cursor-pointer group"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-text group-hover:text-amber transition-colors flex items-center gap-2">
                  {cat.label}
                  {activeInCategory > 0 && (
                    <span className="bg-amber text-bg text-[10px] font-bold w-4 h-4 flex items-center justify-center">
                      {activeInCategory}
                    </span>
                  )}
                </span>
                <ChevronIcon open={isOpen} />
              </button>

              {/* Expandable options */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? 'max-h-60 pb-3' : 'max-h-0'
                }`}
              >
                <div className="space-y-1.5">
                  {cat.options.map((option) => {
                    const isActive = (filters[cat.key] || []).includes(option)
                    return (
                      <label
                        key={option}
                        className="flex items-center gap-2.5 cursor-pointer group/opt py-0.5"
                      >
                        <span
                          className={`w-4 h-4 border flex items-center justify-center transition-all ${
                            isActive
                              ? 'bg-amber border-amber'
                              : 'border-white/[0.08] group-hover/opt:border-amber/50'
                          }`}
                        >
                          {isActive && (
                            <svg className="w-3 h-3 text-bg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                          )}
                        </span>
                        <span className={`text-sm transition-colors ${isActive ? 'text-text' : 'text-text-dim group-hover/opt:text-text'}`}>
                          {option}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function matchesPrice(price, range) {
  switch (range) {
    case 'Under $20K': return price < 20000
    case '$20K–$30K': return price >= 20000 && price < 30000
    case '$30K–$40K': return price >= 30000 && price < 40000
    case 'Over $40K': return price >= 40000
    default: return true
  }
}

export default function InventorySection() {
  const [filters, setFilters] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [showSidebar, setShowSidebar] = useState(false)
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const sectionRef = useFadeUp()
  const inventoryRef = useRef(null)

  // Show sidebar when inventory section is in view
  useEffect(() => {
    const el = inventoryRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowSidebar(entry.isIntersecting)
      },
      { threshold: 0, rootMargin: '-80px 0px -20% 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const activeCount = Object.values(filters).reduce((sum, arr) => sum + arr.length, 0)

  const filtered = vehicles.filter((v) => {
    // Search query
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const match = `${v.year} ${v.make} ${v.model} ${v.type} ${v.color}`.toLowerCase()
      if (!match.includes(q)) return false
    }
    // Category filters
    for (const [key, selected] of Object.entries(filters)) {
      if (selected.length === 0) continue
      if (key === 'price') {
        if (!selected.some((range) => matchesPrice(v.price, range))) return false
      } else if (key === 'year') {
        if (!selected.includes(String(v[key]))) return false
      } else {
        if (!selected.includes(v[key])) return false
      }
    }
    return true
  })

  return (
    <section ref={sectionRef} id="inventory" className="relative overflow-hidden bg-bg py-24 px-6 font-body">
      {/* Car showroom background */}
      <div className="absolute inset-0 bg-cover bg-center bg-fixed" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1920)' }} />
      <div className="absolute inset-0 bg-bg/90" />
      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-14 fade-up">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-8 bg-amber/50" />
            <span className="text-amber uppercase tracking-[0.2em] text-xs font-semibold">
              Featured Vehicles
            </span>
            <span className="h-px w-8 bg-amber/50" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text">
            Find Your{' '}
            <span className="font-heading italic text-amber">Next Ride</span>
          </h2>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-center mb-8 fade-up">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-text hover:border-amber/30 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="16" y2="12" />
              <line x1="4" y1="18" x2="12" y2="18" />
            </svg>
            Filters
            {activeCount > 0 && (
              <span className="bg-amber text-bg text-xs font-bold px-1.5 py-0.5 ml-1">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Filter Drawer */}
        {mobileFilterOpen && (
          <div className="lg:hidden mb-8 fade-up visible">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeCount={activeCount}
            />
          </div>
        )}

        {/* Main Content: Sidebar + Grid */}
        <div ref={inventoryRef} className="flex gap-8 items-start">
          {/* Floating Sidebar — desktop only */}
          <div
            className={`hidden lg:block w-64 shrink-0 sticky top-24 transition-all duration-500 ${
              showSidebar
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-8 pointer-events-none'
            }`}
          >
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeCount={activeCount}
            />
          </div>

          {/* Vehicle Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <CarIcon />
                <p className="text-text-dim mt-4 text-lg">No vehicles match your filters.</p>
                <button
                  onClick={() => { setFilters({}); setSearchQuery('') }}
                  className="mt-4 text-amber text-sm font-semibold uppercase tracking-wider hover:text-amber-light transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {filtered.map((vehicle, index) => (
                  <div
                    key={vehicle.id}
                    className="fade-up bg-white/[0.04] backdrop-blur-lg border border-white/[0.08] border-t-2 border-t-amber/30 overflow-hidden group hover:bg-white/[0.07] hover:border-amber/30 hover:border-t-amber hover:-translate-y-1 transition-all duration-300"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden bg-[#111]">
                      <VehicleImage vehicle={vehicle} />
                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
                      <span className="absolute top-4 right-4 bg-amber text-bg font-bold text-sm px-3.5 py-1.5 shadow-lg">
                        ${vehicle.price.toLocaleString()}
                      </span>
                      {/* Type badge — bottom-left of image */}
                      <span className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-text-dim text-xs font-medium px-3 py-1.5 border border-white/[0.08]">
                        {vehicle.type}
                      </span>
                      {/* Urgency badge — top-left */}
                      {vehicle.badge && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.2 }}
                          className={`absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 flex items-center gap-1 ${getBadgeStyles(vehicle.badge)}`}
                        >
                          <BadgeIcon badge={vehicle.badge} />
                          {vehicle.badge}
                        </motion.span>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-6">
                      <p className="text-text-dim text-sm mb-1.5">
                        {vehicle.year}
                      </p>
                      <h3 className="text-xl font-bold text-text mb-4">
                        {vehicle.make}{' '}
                        <span className="text-amber-light">{vehicle.model}</span>
                      </h3>

                      <div className="flex items-center gap-5 text-text-dim text-sm mb-5 pb-5 border-b border-border">
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-amber/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                          {vehicle.miles.toLocaleString()} mi
                        </span>
                        <span className="w-1 h-1 bg-amber/30" />
                        <span className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-amber/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v6m0 0L9 5m3 3l3-3M5 12h14M5 12l3-3m-3 3l3 3m8-3l3-3m-3 3l3 3M12 16v6m0 0l-3-3m3 3l3-3" />
                          </svg>
                          {vehicle.mpg} MPG
                        </span>
                      </div>

                      <button
                        onClick={() => setSelectedVehicle(vehicle)}
                        className="w-full border-2 border-amber/70 text-amber skew-x-[-4deg] py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-amber hover:text-bg hover:shadow-[0_0_20px_rgba(232,168,73,0.2)] cursor-pointer"
                      >
                        <span className="skew-x-[4deg] inline-block">View Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View All CTA */}
            <div className="text-center mt-16 fade-up">
              <button className="inline-flex items-center gap-3 bg-amber text-bg font-bold skew-x-[-4deg] px-10 py-4 text-base uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,168,73,0.3)] hover:scale-105 cursor-pointer">
                <span className="skew-x-[4deg] inline-flex items-center gap-3">
                  View All Inventory
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <VehicleDetailModal
          vehicle={selectedVehicle}
          onClose={() => setSelectedVehicle(null)}
        />
      )}
    </section>
  )
}
