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
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    )
  }
  if (badge === 'Hot') {
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 23c-4.97 0-9-3.58-9-8 0-3.07 2.13-5.54 3.5-6.9.4-.39 1.05-.15 1.12.4.16 1.27.63 2.56 1.58 3.5.16.16.44.05.44-.18 0-2.03.7-4.3 2.36-6.32.34-.41.96-.32 1.17.15C14.21 8.3 15 10.2 15 12c0 .69-.16 1.36-.44 1.97a.255.255 0 00.38.29c.67-.51 1.2-1.2 1.56-2.01.18-.41.7-.49 1 -.14C18.43 13.12 21 15.42 21 18c0 2.76-4.03 5-9 5z" />
      </svg>
    )
  }
  if (badge === 'Just Listed') {
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    )
  }
  return null
}

function getBadgeStyles(badge) {
  switch (badge) {
    case 'Just Listed':
      return 'bg-gradient-to-r from-amber to-amber-light text-bg shadow-lg shadow-amber/30'
    case 'Price Drop':
      return 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-500/30'
    case 'Hot':
      return 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/30'
    default:
      return ''
  }
}

/* Spec chip icons */
function MilesIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  )
}
function MpgIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V6l5-4 5 4v16" /><path d="M13 10h4l2 2v10" /><path d="M7 10h2" /><path d="M7 14h2" /><path d="M7 18h2" />
    </svg>
  )
}
function EngineIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10h10M7 14h10M12 2v4M6 6h12l2 4v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8l2-4z" />
    </svg>
  )
}
function DrivetrainIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><circle cx="4" cy="4" r="2" /><circle cx="20" cy="4" r="2" /><circle cx="4" cy="20" r="2" /><circle cx="20" cy="20" r="2" /><path d="M6 6l4.5 4.5M13.5 13.5L18 18M13.5 10.5L18 6M6 18l4.5-4.5" />
    </svg>
  )
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

      {/* Card hover/shimmer animations */}
      <style>{`
        @keyframes cardShine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        @keyframes btnShimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        .vehicle-card:hover .card-shine {
          animation: cardShine 0.8s ease-out;
        }
        .vehicle-card:hover .card-glow {
          opacity: 1;
        }
        .vehicle-card:hover .card-border {
          opacity: 1;
        }
        .view-btn:hover .btn-shimmer {
          animation: btnShimmer 0.6s ease-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header — premium with ambient glow */}
        <div className="text-center mb-14 fade-up relative">
          {/* Ambient glow behind heading */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse, rgba(232,168,73,0.08) 0%, transparent 70%)' }}
          />
          <div className="relative">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber/60" />
              <span className="text-amber uppercase tracking-[0.3em] text-xs font-semibold border border-amber/20 px-4 py-1.5 bg-amber/[0.05]">
                Featured Vehicles
              </span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber/60" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text">
              Find Your{' '}
              <span className="font-heading italic text-amber relative">
                Next Ride
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent" />
              </span>
            </h2>
            <p className="mt-5 text-text-dim text-base max-w-lg mx-auto">
              Hand-picked quality vehicles with full inspections and CARFAX reports
            </p>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-center mb-8 fade-up">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-lg px-6 py-3 text-sm font-semibold uppercase tracking-wider text-text hover:border-amber/30 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="16" y2="12" />
              <line x1="4" y1="18" x2="12" y2="18" />
            </svg>
            Filters
            {activeCount > 0 && (
              <span className="bg-amber text-bg text-xs font-bold px-1.5 py-0.5 rounded ml-1">
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
                  <motion.div
                    key={vehicle.id}
                    className="vehicle-card fade-up relative rounded-2xl overflow-hidden group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 80, damping: 20 }}
                    whileHover={{ y: -6 }}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Gradient border glow — visible on hover */}
                    <div className="card-border absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-amber/40 via-amber/10 to-transparent opacity-0 transition-opacity duration-500 pointer-events-none" />

                    {/* Ambient hover glow */}
                    <div
                      className="card-glow absolute -inset-4 rounded-3xl opacity-0 transition-opacity duration-500 pointer-events-none"
                      style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(232,168,73,0.12) 0%, transparent 70%)' }}
                    />

                    {/* Card inner */}
                    <div className="relative rounded-2xl overflow-hidden bg-[#13131a] border border-white/[0.06]">
                      {/* Image section */}
                      <div className="relative overflow-hidden bg-[#111] h-56">
                        <VehicleImage vehicle={vehicle} />
                        {/* Bottom gradient */}
                        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#13131a] via-[#13131a]/70 to-transparent pointer-events-none" />

                        {/* Hover light sweep */}
                        <div className="card-shine absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />

                        {/* Price tag — premium floating */}
                        <div className="absolute top-4 right-4 z-10">
                          <div className="relative">
                            <div className="bg-gradient-to-r from-amber to-amber-light px-4 py-2 rounded-lg shadow-xl shadow-amber/20">
                              <span className="text-bg font-bold text-base tracking-tight">
                                ${vehicle.price.toLocaleString()}
                              </span>
                            </div>
                            {/* Little notch */}
                            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-amber-light rotate-45" />
                          </div>
                        </div>

                        {/* Urgency badge — top-left */}
                        {vehicle.badge && (
                          <motion.span
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20, delay: 0.2 + index * 0.1 }}
                            className={`absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg flex items-center gap-1.5 ${getBadgeStyles(vehicle.badge)}`}
                          >
                            <BadgeIcon badge={vehicle.badge} />
                            {vehicle.badge}
                          </motion.span>
                        )}

                        {/* Year overlay on image bottom */}
                        <span className="absolute bottom-3 left-5 text-text/50 text-xs font-semibold tracking-wider z-10">
                          {vehicle.year}
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 pt-3">
                        {/* Vehicle name */}
                        <h3 className="text-lg font-bold text-text mb-3">
                          {vehicle.make}{' '}
                          <span className="text-amber">{vehicle.model}</span>
                        </h3>

                        {/* Spec chips row */}
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2">
                            <MilesIcon />
                            <span className="text-text-dim text-xs">{vehicle.miles.toLocaleString()} mi</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2">
                            <MpgIcon />
                            <span className="text-text-dim text-xs">{vehicle.mpg} MPG</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2">
                            <EngineIcon />
                            <span className="text-text-dim text-xs">{vehicle.engine}</span>
                          </div>
                          <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2">
                            <DrivetrainIcon />
                            <span className="text-text-dim text-xs">{vehicle.drivetrain}</span>
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-4" />

                        {/* View Details button — premium with shimmer */}
                        <button
                          onClick={() => setSelectedVehicle(vehicle)}
                          className="view-btn relative w-full overflow-hidden bg-gradient-to-r from-amber to-amber-light text-bg py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,168,73,0.3)] cursor-pointer"
                        >
                          <span className="relative z-10 inline-flex items-center gap-2">
                            View Details
                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                          {/* Shimmer sweep on hover */}
                          <span className="btn-shimmer absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" style={{ left: '-100%' }} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* View All CTA — premium upgrade */}
            <div className="text-center mt-16 fade-up">
              <div className="inline-block relative">
                {/* Ambient glow */}
                <div
                  className="absolute -inset-8 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse, rgba(232,168,73,0.1) 0%, transparent 70%)' }}
                />
                <button className="relative inline-flex items-center gap-3 bg-gradient-to-r from-amber to-amber-light text-bg font-bold skew-x-[-4deg] px-12 py-4 text-base uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_40px_rgba(232,168,73,0.35)] hover:scale-105 cursor-pointer">
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
