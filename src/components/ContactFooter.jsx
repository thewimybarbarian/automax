import { useFadeUp } from '../hooks/useFadeUp'
const logoSvg = '/images/auto-max-logo-3.png'

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
      <section className="px-6 py-24 max-w-7xl mx-auto">
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
              className="fade-up bg-card border border-border border-t-2 border-t-amber/30 hover:border-t-amber p-8 transition-all duration-300 hover:-translate-y-1"
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
        <div className="fade-up bg-gradient-to-r from-amber/10 via-card to-amber/10 border border-amber/20 p-10 text-center mt-12 overflow-hidden">
          <h3 className="text-3xl md:text-4xl font-bold text-text font-body">
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
      </section>

      {/* ── Full Footer ── */}
      <footer className="bg-card border-t border-border mt-20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 fade-up">
            {/* Column 1 — Brand */}
            <div>
              <img src={logoSvg} alt="AutoMax Auto Group" className="w-[240px] mb-5" />
              <p className="text-text-dim text-sm leading-relaxed font-body">
                Oklahoma&rsquo;s trusted dealer for over 28 years. Quality
                pre-owned vehicles with flexible financing options.
              </p>
            </div>

            {/* Column 2 — Quick Links */}
            <div>
              <h4 className="text-text font-semibold mb-4 font-body">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
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

            {/* Column 3 — Services */}
            <div>
              <h4 className="text-text font-semibold mb-4 font-body">
                Services
              </h4>
              <ul className="space-y-2.5">
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

            {/* Column 4 — Hours & Contact */}
            <div>
              <h4 className="text-text font-semibold mb-4 font-body">
                Hours &amp; Contact
              </h4>
              <p className="text-text-dim text-sm font-body">
                Mon&ndash;Sat: 9AM&ndash;8PM
              </p>
              <p className="text-amber/70 text-sm font-medium mb-5 font-body">
                Sunday: Closed
              </p>
              <ul className="space-y-3">
                {locations.map((loc) => (
                  <li key={loc.phone}>
                    <span className="block text-text-dim text-xs font-body">
                      {loc.name}
                    </span>
                    <a
                      href={`tel:${loc.phone.replace(/[^\d+]/g, '')}`}
                      className="text-text hover:text-amber transition-colors text-sm font-semibold font-body"
                    >
                      {loc.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 fade-up">
            <p className="text-text-dim text-sm font-body">
              &copy; 2024 AutoMax Auto Group. All rights reserved.
            </p>
            <p className="text-text-dim text-sm font-body">
              Website by{' '}
              <span className="text-amber font-semibold">r3dpill.AI</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
