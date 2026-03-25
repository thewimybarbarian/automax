import { useState, useEffect } from 'react'

const featureIcons = {
  'Heated Seats': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v4M6 11v4M6 19v2M18 3v4M18 11v4M18 19v2M12 3v2M12 9v2M12 15v2M12 21v0" />
      <path d="M4 7h4M4 15h4M10 5h4M10 11h4M10 17h4M16 7h4M16 15h4" />
    </svg>
  ),
  'Bluetooth': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" />
    </svg>
  ),
  'Backup Camera': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  'Power Windows': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 12h18M12 3v18" />
      <path d="M8 8l-2 2M16 8l2 2" />
    </svg>
  ),
  'Cruise Control': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v2M12 16v2M6 12h2M16 12h2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9l0-1" />
    </svg>
  ),
  'Keyless Entry': (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.78 7.78 5.5 5.5 0 017.78-7.78zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
}

const vehicleFeatures = {
  Sedan: ['Heated Seats', 'Bluetooth', 'Backup Camera', 'Cruise Control', 'Power Windows', 'Keyless Entry'],
  SUV: ['Heated Seats', 'Bluetooth', 'Backup Camera', 'Power Windows', 'Cruise Control', 'Keyless Entry'],
  Truck: ['Bluetooth', 'Backup Camera', 'Cruise Control', 'Power Windows', 'Keyless Entry', 'Heated Seats'],
}

export default function VehicleDetailModal({ vehicle, onClose }) {
  const [activeTab, setActiveTab] = useState('pricing')
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!vehicle) return null

  const features = vehicleFeatures[vehicle.type] || vehicleFeatures.Sedan
  const images = [vehicle.img, vehicle.img, vehicle.img]
  const totalImages = images.length

  const prevImg = () => setImgIndex((i) => (i - 1 + totalImages) % totalImages)
  const nextImg = () => setImgIndex((i) => (i + 1) % totalImages)

  const tabs = [
    { key: 'pricing', label: 'Pricing' },
    { key: 'description', label: 'Description' },
    { key: 'details', label: 'Details' },
  ]

  return (
    <div className="fixed inset-0 z-[9998] flex items-start justify-center pt-6 pb-6 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl animate-[slideUp_0.35s_cubic-bezier(0.16,1,0.3,1)]
        bg-gradient-to-b from-[#1a1a1f] to-[#111114]
        border border-white/[0.08] rounded-xl overflow-hidden
        shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8),0_0_40px_-10px_rgba(217,170,75,0.12)]"
      >
        {/* ── Header with vehicle title ── */}
        <div className="relative bg-gradient-to-r from-amber/10 via-amber/5 to-transparent px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-amber/70 text-[11px] font-semibold uppercase tracking-[0.2em] mb-1">AutoMax PreOwned · Del City</p>
              <h2 className="font-heading text-2xl text-text leading-tight">
                {vehicle.year} {vehicle.make} <span className="text-amber">{vehicle.model}</span>
              </h2>
              <p className="text-text-dim text-xs mt-1.5 flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <svg className="w-3 h-3 text-amber/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                  {vehicle.miles.toLocaleString()} mi
                </span>
                <span className="w-px h-3 bg-white/10" />
                <span>{vehicle.engine} · {vehicle.transmission}</span>
                <span className="w-px h-3 bg-white/10" />
                <span>{vehicle.drivetrain}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-text-dim hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Image Carousel ── */}
        <div className="relative bg-black group">
          <img
            src={images[imgIndex]}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-72 md:h-[420px] object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Nav arrows */}
          <button
            onClick={prevImg}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/70 hover:border-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={nextImg}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/70 hover:border-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>

          {/* Image counter pill */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 flex items-center gap-3">
            <button onClick={prevImg} className="text-white/50 hover:text-white transition-colors cursor-pointer">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <span className="text-white/80 text-xs font-medium tabular-nums">{imgIndex + 1} / {totalImages}</span>
            <button onClick={nextImg} className="text-white/50 hover:text-white transition-colors cursor-pointer">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>

          {/* Price badge */}
          <div className="absolute top-4 right-4 bg-amber/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
            <span className="text-bg font-black text-xl tracking-tight">${vehicle.price.toLocaleString()}</span>
          </div>

          {/* Phone pill */}
          <a href="tel:4056064000" className="absolute top-4 left-4 bg-black/60 backdrop-blur-md rounded-full px-3.5 py-2 border border-white/10 flex items-center gap-2 hover:bg-black/80 transition-all">
            <svg className="w-3.5 h-3.5 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span className="text-white text-xs font-semibold">(405) 606-4000</span>
          </a>
        </div>

        {/* ── Features row ── */}
        <div className="flex flex-wrap gap-1.5 px-5 py-4 bg-white/[0.02] border-b border-white/[0.06]">
          {features.map((feat) => (
            <span
              key={feat}
              className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.08] rounded-full px-3 py-1.5 text-[11px] text-text-dim tracking-wide"
            >
              <span className="text-amber/70">{featureIcons[feat]}</span>
              {feat}
            </span>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex border-b border-white/[0.06] bg-white/[0.01]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative flex-1 py-4 text-xs font-semibold uppercase tracking-[0.15em] transition-all cursor-pointer ${
                activeTab === tab.key
                  ? 'text-amber'
                  : 'text-text-dim hover:text-text'
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-amber to-transparent" />
              )}
            </button>
          ))}
        </div>

        {/* ── Tab Content ── */}
        <div className="px-6 py-6">
          {activeTab === 'pricing' && (
            <div>
              <div className="flex items-end justify-between mb-5">
                <div>
                  <p className="text-text-dim text-[11px] uppercase tracking-[0.15em] mb-1">Listed Price</p>
                  <p className="text-4xl font-black text-amber font-heading tracking-tight">
                    ${vehicle.price.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-text-dim text-[11px] uppercase tracking-[0.15em] mb-1">Est. Monthly</p>
                  <p className="text-xl font-bold text-text">
                    ${Math.round(vehicle.price / 60)}<span className="text-text-dim text-sm font-normal">/mo</span>
                  </p>
                </div>
              </div>
              <div className="bg-amber/[0.06] border border-amber/20 rounded-lg px-4 py-3 flex items-center gap-3">
                <svg className="w-4 h-4 text-amber shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
                <button className="text-amber text-xs font-semibold uppercase tracking-wider hover:text-amber-light transition-colors cursor-pointer text-left">
                  Sign Up for Price Drop Alerts
                </button>
              </div>
            </div>
          )}

          {activeTab === 'description' && (
            <div className="text-text-dim text-sm leading-relaxed space-y-4">
              <p>
                This {vehicle.year} {vehicle.make} {vehicle.model} is a well-maintained {vehicle.type.toLowerCase()} with only {vehicle.miles.toLocaleString()} miles.
                Finished in {vehicle.color} with a clean interior, this vehicle has been thoroughly inspected and is ready to drive home today.
              </p>
              <p>
                Equipped with a {vehicle.engine} engine and {vehicle.transmission.toLowerCase()} transmission,
                this {vehicle.drivetrain} vehicle delivers {vehicle.mpg} MPG combined fuel economy.
                Features include {features.slice(0, 4).join(', ').toLowerCase()}, and more.
              </p>
              <p className="text-white/20 text-[11px] mt-4 pt-3 border-t border-white/[0.06]">
                * Price excludes tax, title, license, and dealer fees. See dealer for complete details.
              </p>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="grid grid-cols-2 gap-x-6 gap-y-0.5">
              {[
                ['Year', vehicle.year],
                ['Make', vehicle.make],
                ['Model', vehicle.model],
                ['Body Style', vehicle.type],
                ['Color', vehicle.color],
                ['Engine', vehicle.engine],
                ['Transmission', vehicle.transmission],
                ['Drivetrain', vehicle.drivetrain],
                ['Mileage', `${vehicle.miles.toLocaleString()} mi`],
                ['Fuel Economy', `${vehicle.mpg} MPG`],
              ].map(([label, value], idx) => (
                <div key={label} className={`flex justify-between py-3 ${idx < 8 ? 'border-b border-white/[0.05]' : ''}`}>
                  <span className="text-text-dim text-sm">{label}</span>
                  <span className="text-text text-sm font-semibold">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── CTA Buttons ── */}
        <div className="px-6 pb-6 space-y-2.5">
          <div className="grid grid-cols-2 gap-2.5">
            <button className="bg-amber text-bg font-bold py-3.5 text-xs uppercase tracking-wider hover:bg-amber-light transition-all cursor-pointer flex items-center justify-center gap-2 rounded-lg">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
              Trade Value
            </button>

            <button className="bg-amber text-bg font-bold py-3.5 text-xs uppercase tracking-wider hover:bg-amber-light transition-all cursor-pointer flex items-center justify-center gap-2 rounded-lg">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
              Payments
            </button>
          </div>

          <button className="w-full bg-gradient-to-r from-amber to-amber-light text-bg font-bold py-4 text-sm uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2 rounded-lg shadow-[0_4px_20px_rgba(217,170,75,0.25)]">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
            </svg>
            Schedule a Test Drive
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button className="border border-white/10 bg-white/[0.03] text-text font-semibold py-3.5 text-xs uppercase tracking-wider hover:bg-white/[0.06] hover:border-amber/30 transition-all cursor-pointer flex items-center justify-center gap-2 rounded-lg">
              <svg className="w-4 h-4 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              Availability
            </button>

            <button className="border border-white/10 bg-white/[0.03] text-text font-semibold py-3.5 text-xs uppercase tracking-wider hover:bg-white/[0.06] hover:border-amber/30 transition-all cursor-pointer flex items-center justify-center gap-2 rounded-lg">
              <svg className="w-4 h-4 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Pre-Approved
            </button>
          </div>
        </div>

        {/* ── CARFAX ── */}
        <div className="border-t border-white/[0.06] px-6 py-4 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <span className="text-text-dim text-[11px] uppercase tracking-[0.15em]">Vehicle History</span>
            <span className="w-px h-4 bg-white/10" />
            <div className="flex items-center gap-1.5">
              <span className="text-text text-xs font-bold uppercase tracking-wider">Show Me The</span>
              <span className="text-amber font-black text-base tracking-tight">CARFAX</span>
            </div>
          </div>
          <svg className="w-4 h-4 text-text-dim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}
