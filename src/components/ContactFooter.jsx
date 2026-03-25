import { useState } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'
const logoSvg = '/images/auto-max-logo-city.png'

const locations = [
  {
    name: 'AutoMax Del City',
    address: '4401 Tinker Diagonal St.',
    city: 'Del City, OK 73115',
    phone: '(405) 606-4000',
  },
  {
    name: 'AutoMax Hyundai Norman',
    address: '551 N. Interstate Dr.',
    city: 'Norman, OK 73069',
    phone: '(405) 364-2000',
  },
  {
    name: 'AutoMax OKC',
    address: '801 W I-240 Service Rd',
    city: 'Oklahoma City, OK 73139',
    phone: '(855) 976-1583',
  },
]

const quickLinks = ['Inventory', 'Financing', 'Service', 'About Us', 'Contact']
const serviceLinks = [
  'Used Cars',
  'Sell Your Vehicle',
  'Parts Dept',
  'Service Dept',
  'Special Finance',
]

const departmentHours = {
  Sales: [
    { day: 'Monday - Saturday', time: '9:00 AM - 8:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ],
  Service: [
    { day: 'Monday - Friday', time: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '8:00 AM - 2:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ],
  Parts: [
    { day: 'Monday - Friday', time: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', time: '8:00 AM - 2:00 PM' },
    { day: 'Sunday', time: 'Closed' },
  ],
}

function DepartmentHours() {
  const [activeTab, setActiveTab] = useState('Sales')
  const tabs = Object.keys(departmentHours)

  return (
    <div>
      {/* Tab Switcher */}
      <div className="flex border-b border-white/[0.08]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 py-2 text-xs uppercase tracking-wider font-body font-semibold transition-colors duration-200 ${
              activeTab === tab
                ? 'text-amber'
                : 'text-text-dim hover:text-text'
            }`}
          >
            {tab}
            <span
              className={`absolute bottom-0 left-0 w-full h-[2px] bg-amber transition-opacity duration-200 ${
                activeTab === tab ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-3 space-y-1.5">
        {departmentHours[activeTab].map((row) => (
          <div key={row.day} className="flex justify-between items-center text-sm font-body">
            <span className="text-text-dim">{row.day}</span>
            <span className={row.time === 'Closed' ? 'text-amber/70 font-medium' : 'text-text'}>
              {row.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MapPinIcon() {
  return (
    <svg
      className="w-8 h-8 text-amber"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

export default function ContactFooter() {
  const sectionRef = useFadeUp()

  return (
    <div ref={sectionRef}>
      {/* ── Visit Us Section ── */}
      <section className="relative overflow-hidden">
        {/* Car background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.pexels.com/photos/1231643/pexels-photo-1231643.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
        />
        <div className="absolute inset-0 bg-bg/88" />
      <div className="relative px-6 py-24 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 fade-up">
          <span className="text-amber uppercase tracking-widest text-sm font-body">
            Visit Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-text mt-3 font-body">
            Our{' '}
            <span className="font-heading italic text-amber">Locations</span>
          </h2>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc, i) => (
            <div
              key={loc.name}
              className="fade-up bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] border-t-2 border-t-amber/30 hover:border-amber/30 hover:bg-white/[0.07] hover:border-t-amber p-8 transition-all duration-300 hover:-translate-y-1"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <MapPinIcon />
              <h3 className="text-xl font-semibold text-amber mt-4 font-body">
                {loc.name}
              </h3>
              <p className="text-text-dim mt-2 text-sm leading-relaxed font-body">
                {loc.address}
                <br />
                {loc.city}
              </p>
              <a
                href={`tel:${loc.phone.replace(/[^\d+]/g, '')}`}
                className="block text-text font-bold text-lg mt-3 font-body hover:text-amber transition-colors"
              >
                {loc.phone}
              </a>
              <p className="text-text-dim text-sm mt-2 font-body">
                Mon&ndash;Sat 9AM&ndash;8PM
              </p>
              <p className="text-amber/70 text-sm font-medium font-body">
                Closed Sunday
              </p>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="fade-up bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] bg-gradient-to-r from-amber/10 via-transparent to-amber/10 p-6 sm:p-10 text-center mt-8 sm:mt-12 overflow-hidden">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text font-body">
            Ready to Find Your{' '}
            <span className="font-heading italic text-amber">
              Perfect Vehicle
            </span>
            ?
          </h3>
          <p className="text-text-dim mt-4 max-w-2xl mx-auto text-lg font-body">
            Schedule a test drive today or visit any of our three Oklahoma
            locations. Our team is ready to help you find the right vehicle at
            the right price.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a
              href="#schedule"
              className="inline-block bg-amber hover:bg-amber-light text-bg font-bold px-8 py-3.5 uppercase tracking-wider skew-x-[-4deg] transition-colors duration-200 font-body"
            >
              <span className="inline-block skew-x-[4deg]">Schedule a Test Drive</span>
            </a>
            <a
              href="#directions"
              className="inline-block border border-amber text-amber hover:bg-amber/10 font-bold px-8 py-3.5 uppercase tracking-wider skew-x-[-4deg] transition-colors duration-200 font-body"
            >
              <span className="inline-block skew-x-[4deg]">Get Directions</span>
            </a>
          </div>
        </div>
      </div>
      </section>

      {/* ── Full Footer ── */}
      <footer className="bg-white/[0.03] backdrop-blur-sm border-t border-white/[0.06] mt-12 sm:mt-20 pt-10 sm:pt-16 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Footer Grid */}
          <div className="fade-up">
            {/* Brand — full width on mobile */}
            <div className="mb-8 sm:mb-0 pb-6 sm:pb-0 border-b border-border sm:border-none text-center sm:text-left sm:float-left sm:w-1/4 lg:w-auto lg:float-none">
              <img src={logoSvg} alt="AutoMax Auto Group" className="w-[160px] sm:w-[200px] lg:w-[240px] mb-4 mx-auto sm:mx-0" />
              <p className="text-text-dim text-sm leading-relaxed font-body max-w-xs mx-auto sm:mx-0">
                Oklahoma&rsquo;s trusted dealer for over 28 years. Quality
                pre-owned vehicles with flexible financing options.
              </p>
            </div>

            {/* Links grid — 2 columns on mobile, 4 total on desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 clear-both">
              {/* Quick Links */}
              <div>
                <h4 className="text-text font-semibold mb-3 sm:mb-4 text-sm uppercase tracking-wider font-body">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-text-dim hover:text-amber transition-colors text-sm font-body"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-text font-semibold mb-3 sm:mb-4 text-sm uppercase tracking-wider font-body">
                  Services
                </h4>
                <ul className="space-y-2">
                  {serviceLinks.map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-text-dim hover:text-amber transition-colors text-sm font-body"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Department Hours */}
              <div className="col-span-2 sm:col-span-1 mt-2 sm:mt-0 pt-4 sm:pt-0 border-t border-border sm:border-none">
                <h4 className="text-text font-semibold mb-3 sm:mb-4 text-sm uppercase tracking-wider font-body">
                  Department Hours
                </h4>
                <DepartmentHours />
                <a
                  href="#schedule-service"
                  className="inline-block mt-4 bg-amber hover:bg-amber-light text-bg font-bold px-5 py-2.5 text-xs uppercase tracking-wider skew-x-[-4deg] transition-colors duration-200 font-body"
                >
                  <span className="inline-block skew-x-[4deg]">Schedule Service</span>
                </a>
              </div>

              {/* Contact */}
              <div className="col-span-2 sm:col-span-1 mt-2 sm:mt-0 pt-4 sm:pt-0 border-t border-border sm:border-none">
                <h4 className="text-text font-semibold mb-3 sm:mb-4 text-sm uppercase tracking-wider font-body">
                  Contact
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {locations.map((loc) => (
                    <div key={loc.phone}>
                      <span className="block text-text-dim text-xs font-body">
                        {loc.name}
                      </span>
                      <a
                        href={`tel:${loc.phone.replace(/[^\d+]/g, '')}`}
                        className="text-text hover:text-amber transition-colors text-sm font-semibold font-body"
                      >
                        {loc.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/[0.06] mt-8 sm:mt-12 pt-5 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4 fade-up">
            <p className="text-text-dim text-xs sm:text-sm font-body">
              &copy; 2024 AutoMax Auto Group. All rights reserved.
            </p>
            <p className="text-text-dim text-xs sm:text-sm font-body">
              Website by{' '}
              <span className="text-amber font-semibold">r3dpill.AI</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
