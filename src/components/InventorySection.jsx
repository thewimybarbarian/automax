import { useState } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'

const vehicles = [
  { id: 1, year: 2023, make: 'Dodge', model: 'Charger R/T', price: 32995, miles: 18400, type: 'Sedan', mpg: 25, img: 'https://images.pexels.com/photos/3874337/pexels-photo-3874337.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 2, year: 2022, make: 'Toyota', model: 'Camry TRD', price: 27495, miles: 24100, type: 'Sedan', mpg: 32, img: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 3, year: 2023, make: 'Chevrolet', model: 'Tahoe LT', price: 48995, miles: 21300, type: 'SUV', mpg: 21, img: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 4, year: 2022, make: 'Ford', model: 'F-150 XLT', price: 38995, miles: 32800, type: 'Truck', mpg: 24, img: 'https://images.pexels.com/photos/2920064/pexels-photo-2920064.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 5, year: 2023, make: 'Hyundai', model: 'Tucson SEL', price: 28495, miles: 15200, type: 'SUV', mpg: 29, img: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 6, year: 2021, make: 'Kia', model: 'K5 GT-Line', price: 24995, miles: 29600, type: 'Sedan', mpg: 31, img: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=600' },
]

const filters = ['All', 'Sedan', 'SUV', 'Truck']

function CarIcon() {
  return (
    <svg className="w-16 h-16 text-amber/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17h14M5 17a2 2 0 01-2-2V9a2 2 0 012-2h1l2-3h8l2 3h1a2 2 0 012 2v6a2 2 0 01-2 2M5 17a2 2 0 002 2h1a2 2 0 002-2M14 17a2 2 0 002 2h1a2 2 0 002-2" />
      <circle cx="7.5" cy="14.5" r="1.5" />
      <circle cx="16.5" cy="14.5" r="1.5" />
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

export default function InventorySection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const sectionRef = useFadeUp()

  const filtered = activeFilter === 'All'
    ? vehicles
    : vehicles.filter((v) => v.type === activeFilter)

  return (
    <section ref={sectionRef} id="inventory" className="bg-bg py-24 px-6 font-body">
      <div className="max-w-7xl mx-auto">
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

        {/* Filter Buttons */}
        <div className="fade-up flex items-center justify-center gap-3 mb-14 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`skew-x-[-4deg] px-7 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeFilter === filter
                  ? 'bg-amber text-bg shadow-[0_0_20px_rgba(232,168,73,0.25)]'
                  : 'bg-card border border-border text-text-dim hover:text-text hover:border-amber/30'
              }`}
            >
              <span className="skew-x-[4deg] inline-block">{filter}</span>
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className="fade-up bg-card border border-border border-t-2 border-t-amber/30 overflow-hidden group hover:border-amber/30 hover:border-t-amber hover:-translate-y-1 transition-all duration-300"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-[#111]">
                <VehicleImage vehicle={vehicle} />
                {/* Gradient overlay on bottom of image */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                {/* Price badge */}
                <span className="absolute top-4 right-4 bg-amber text-bg font-bold text-sm px-3.5 py-1.5 shadow-lg">
                  ${vehicle.price.toLocaleString()}
                </span>
                {/* Type badge */}
                <span className="absolute top-4 left-4 bg-bg/80 backdrop-blur-sm text-text-dim text-xs font-medium px-3 py-1.5 border border-border">
                  {vehicle.type}
                </span>
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

                {/* Stats Row */}
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

                {/* View Details Button */}
                <button className="w-full border-2 border-amber/70 text-amber skew-x-[-4deg] py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 hover:bg-amber hover:text-bg hover:shadow-[0_0_20px_rgba(232,168,73,0.2)] cursor-pointer">
                  <span className="skew-x-[4deg] inline-block">View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>

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
    </section>
  )
}
