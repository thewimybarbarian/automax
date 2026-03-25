import { useState, useEffect } from 'react'

const featureIcons = {
  'Heated Seats': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v4M6 11v4M6 19v2M18 3v4M18 11v4M18 19v2M12 3v2M12 9v2M12 15v2M12 21v0" />
      <path d="M4 7h4M4 15h4M10 5h4M10 11h4M10 17h4M16 7h4M16 15h4" />
    </svg>
  ),
  'Bluetooth': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5l11 11L12 23V1l5.5 5.5-11 11" />
    </svg>
  ),
  'Backup Camera': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  ),
  'Power Windows': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 12h18M12 3v18" />
      <path d="M8 8l-2 2M16 8l2 2" />
    </svg>
  ),
  'Cruise Control': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v2M12 16v2M6 12h2M16 12h2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 9l0-1" />
    </svg>
  ),
  'Keyless Entry': (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  if (!vehicle) return null

  const features = vehicleFeatures[vehicle.type] || vehicleFeatures.Sedan

  // Simulate multiple images (same image with different crops for demo)
  const images = [
    vehicle.img,
    vehicle.img.replace('w=600', 'w=800'),
    vehicle.img.replace('w=600', 'w=700'),
  ]
  const totalImages = images.length

  const prevImg = () => setImgIndex((i) => (i - 1 + totalImages) % totalImages)
  const nextImg = () => setImgIndex((i) => (i + 1) % totalImages)

  const tabs = [
    { key: 'pricing', label: 'Pricing' },
    { key: 'description', label: 'Description' },
    { key: 'details', label: 'Details' },
  ]

  return (
    <div className="fixed inset-0 z-[9998] flex items-start justify-center pt-8 pb-8 px-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border border-t-2 border-t-amber w-full max-w-2xl animate-[slideUp_0.3s_ease-out]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-bg/80 backdrop-blur-sm border border-border text-text-dim hover:text-text hover:border-amber/50 transition-all cursor-pointer"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Location bar */}
        <div className="bg-amber text-bg text-center py-2.5 px-4">
          <p className="font-bold text-sm">AutoMax PreOwned (Del City)</p>
          <p className="text-xs opacity-80">4401 Tinker Diagonal St., Del City, OK 73115</p>
        </div>

        {/* Image Carousel */}
        <div className="relative bg-[#111]">
          <img
            src={images[imgIndex]}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            className="w-full h-72 md:h-96 object-cover"
          />
          {/* Prev/Next arrows */}
          <button
            onClick={prevImg}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-bg/70 backdrop-blur-sm border border-border text-text hover:border-amber/50 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextImg}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-bg/70 backdrop-blur-sm border border-border text-text hover:border-amber/50 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          {/* Phone overlay */}
          <div className="absolute top-3 left-3 bg-bg/80 backdrop-blur-sm border border-border px-3 py-1.5 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-amber" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            <span className="text-text text-xs font-bold">(405) 606-4000</span>
          </div>
        </div>

        {/* Feature badges */}
        <div className="flex flex-wrap gap-2 px-5 py-4 border-b border-border bg-bg/50">
          {features.map((feat) => (
            <span
              key={feat}
              className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 text-xs text-text-dim"
            >
              <span className="text-amber">{featureIcons[feat]}</span>
              {feat}
            </span>
          ))}
        </div>

        {/* Image counter */}
        <div className="flex items-center justify-center gap-4 py-3 border-b border-border">
          <button onClick={prevImg} className="text-text-dim hover:text-text transition-colors cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="text-text text-sm font-medium">{imgIndex + 1} / {totalImages}</span>
          <button onClick={nextImg} className="text-text-dim hover:text-text transition-colors cursor-pointer">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3.5 text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.key
                  ? 'text-amber border-b-2 border-amber'
                  : 'text-text-dim hover:text-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-5 py-5">
          {activeTab === 'pricing' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-text-dim text-sm">Price</span>
                <span className="text-3xl font-bold text-amber font-heading">
                  ${vehicle.price.toLocaleString()}
                </span>
              </div>
              <button className="text-amber text-xs font-semibold uppercase tracking-wider hover:text-amber-light transition-colors cursor-pointer">
                Sign Up for Price Drop Alerts
              </button>
            </div>
          )}

          {activeTab === 'description' && (
            <div className="text-text-dim text-sm leading-relaxed space-y-3">
              <p>
                This {vehicle.year} {vehicle.make} {vehicle.model} is a well-maintained {vehicle.type.toLowerCase()} with only {vehicle.miles.toLocaleString()} miles.
                Finished in {vehicle.color} with a clean interior, this vehicle has been thoroughly inspected and is ready to drive home today.
              </p>
              <p>
                Equipped with a {vehicle.engine} engine and {vehicle.transmission.toLowerCase()} transmission,
                this {vehicle.drivetrain} vehicle delivers {vehicle.mpg} MPG combined fuel economy.
                Features include {features.slice(0, 4).join(', ').toLowerCase()}, and more.
              </p>
              <p className="text-amber/70 text-xs mt-4">
                * Price excludes tax, title, license, and dealer fees. See dealer for complete details.
              </p>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-sm">
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
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2 border-b border-border">
                  <span className="text-text-dim">{label}</span>
                  <span className="text-text font-semibold">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="px-5 pb-6 space-y-3">
          <button className="w-full bg-amber text-bg font-bold py-3.5 text-sm uppercase tracking-wider hover:bg-amber-light transition-all cursor-pointer flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
            10 Second Trade Value
          </button>

          <button className="w-full bg-amber text-bg font-bold py-3.5 text-sm uppercase tracking-wider hover:bg-amber-light transition-all cursor-pointer flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
            </svg>
            Calculate Your Payment
          </button>

          <button className="w-full bg-amber text-bg font-bold py-3.5 text-sm uppercase tracking-wider hover:bg-amber-light transition-all cursor-pointer flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
            </svg>
            Schedule a Test Drive
          </button>

          <button className="w-full border-2 border-amber text-amber font-bold py-3.5 text-sm uppercase tracking-wider hover:bg-amber hover:text-bg transition-all cursor-pointer flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
            Check Price & Availability
          </button>

          <button className="w-full border-2 border-amber text-amber font-bold py-3.5 text-sm uppercase tracking-wider hover:bg-amber hover:text-bg transition-all cursor-pointer flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            Get Pre-Approved
          </button>
        </div>

        {/* CARFAX badge */}
        <div className="border-t border-border px-5 py-4 flex items-center justify-center">
          <div className="border-2 border-text-dim px-4 py-2 flex items-center gap-2">
            <span className="text-text text-xs font-bold uppercase tracking-wider">Show Me The</span>
            <span className="text-amber font-black text-lg tracking-tight">CARFAX</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
