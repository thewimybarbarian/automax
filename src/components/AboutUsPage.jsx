import { useFadeUp } from '../hooks/useFadeUp'

const salesTeam = [
  { name: 'Bob Brice', title: 'Sales Manager', initials: 'BB', photo: '/images/BobBrice.webp' },
  { name: 'Shawn Stegall', title: 'Sales Manager', initials: 'SS', photo: '/images/ShawnSegal.webp' },
  { name: 'Kelsi Gonzales', title: 'BDC Director', initials: 'KG', photo: '/images/KelsiGonzales.webp' },
  { name: 'Margo Hayes', title: 'Receptionist', initials: 'MH', photo: '/images/MargoHayes.webp' },
  { name: 'Angel Aguilar', title: 'Sales Professional', initials: 'AA', photo: '/images/AngelAgular.webp' },
  { name: 'Victor Rivera', title: 'Sales Professional', initials: 'VR', photo: '/images/VictorRivera.webp' },
  { name: 'Xavier Dennis', title: 'Sales Professional', initials: 'XD', photo: '/images/XavierDennis.webp' },
]

const serviceTeam = [
  { name: 'Hailey Huff', title: 'Service Manager', initials: 'HH', photo: '/images/HaileyHuff.webp' },
]

const partsTeam = [
  { name: 'Nancy Bratcher', title: 'Parts Manager', initials: 'NB', photo: '/images/NancyBratcher.webp' },
]

const stats = [
  { value: '28+', label: 'Years Serving Oklahoma' },
  { value: '10,000+', label: 'Happy Customers' },
  { value: '3', label: 'Metro Locations' },
  { value: '4.5★', label: 'Google Rating' },
]

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    title: 'No-Pressure Experience',
    description: 'Our staff listens to your needs without pushing or pressuring. We believe in helping you find the right vehicle, not making a quick sale. Every interaction is built on respect, transparency, and genuine care for your satisfaction.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Flexible Financing',
    description: 'Whether you have excellent credit, are rebuilding, or just starting out — our network of banks, credit unions, and special finance lenders has options for everyone. We work hard to get you approved and on the road.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 21h18M3 3h18" />
        <path strokeLinecap="square" strokeLinejoin="miter" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
      </svg>
    ),
    title: 'Full Service & Parts',
    description: 'Our certified technicians keep your vehicle running at peak performance. From routine maintenance to major repairs, we\'ve got you covered with genuine parts and expert workmanship you can trust.',
  },
]

function StaffCard({ person, index }) {
  return (
    <div
      className="fade-up bg-card border border-border overflow-hidden group hover:border-amber/50 hover:-translate-y-2 transition-all duration-500"
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Photo area */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-amber/10 via-card to-card">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 bg-gradient-to-br from-amber to-amber-light flex items-center justify-center">
              <span className="text-bg text-2xl font-bold font-heading">{person.initials}</span>
            </div>
          </div>
        )}
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
        {/* Amber glow on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {/* Decorative corner accents */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-amber/20 group-hover:border-amber/50 transition-colors duration-500" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-amber/20 group-hover:border-amber/50 transition-colors duration-500" />
      </div>

      {/* Amber separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent" />

      {/* Info area */}
      <div className="p-5 text-center">
        <h4 className="text-lg font-bold text-text group-hover:text-amber transition-colors duration-300">{person.name}</h4>
        <p className="text-amber text-sm font-medium uppercase tracking-wider mt-1">{person.title}</p>
      </div>
    </div>
  )
}

function DepartmentHeader({ title }) {
  return (
    <div className="flex items-center gap-4 mb-8 mt-16 first:mt-0">
      <div className="w-1 h-10 bg-amber" />
      <div className="bg-card border border-border px-6 py-3">
        <h3 className="text-lg font-bold text-text uppercase tracking-wider font-heading">{title}</h3>
      </div>
      <div className="flex-1 h-px bg-border" />
    </div>
  )
}

export default function AboutUsPage() {
  const sectionRef = useFadeUp()

  return (
    <div ref={sectionRef} className="bg-bg min-h-screen">

      {/* ══════════════════════════════════════════════════════════════
          1. HERO BANNER
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative w-full" style={{ minHeight: '40vh' }}>
        {/* Amber accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber z-10" />

        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(232,168,73,0.12) 0%, transparent 60%)',
          }}
        />

        {/* Dark overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-transparent to-bg" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6" style={{ minHeight: '40vh' }}>
          <span className="fade-up text-amber text-xs font-bold uppercase tracking-[0.3em] mb-6 font-body">
            About Us
          </span>
          <h1 className="fade-up text-4xl sm:text-5xl md:text-6xl font-bold text-text font-body leading-tight mb-4">
            Oklahoma&rsquo;s{' '}
            <span className="font-heading italic text-amber">Trusted</span>{' '}
            Dealer
          </h1>
          <p className="fade-up text-text-dim text-lg md:text-xl max-w-2xl font-body mb-8">
            Family-owned and community-driven for over 28 years.
          </p>

          {/* Breadcrumb */}
          <nav className="fade-up flex items-center gap-2 text-sm font-body">
            <a href="/" className="text-amber hover:text-amber-light transition-colors">Home</a>
            <span className="text-text-dim">&gt;</span>
            <span className="text-text-dim">About Us</span>
          </nav>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. COMPANY STORY SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left column — Story text */}
          <div>
            <span className="fade-up text-amber text-xs font-bold uppercase tracking-[0.3em] font-body mb-4 block">
              Our Story
            </span>
            <h2 className="fade-up text-3xl sm:text-4xl font-bold text-text font-body leading-tight mb-8">
              Welcome to{' '}
              <span className="font-heading italic text-amber">AutoMax Auto Group</span>
            </h2>
            <p className="fade-up text-text-dim leading-relaxed font-body mb-6">
              Welcome to AutoMax Auto Group — a fast and convenient way to find the perfect used vehicle.
              Whether you&rsquo;re looking for a car, truck, or SUV, we&rsquo;ve helped thousands of customers
              across Del City, Oklahoma City, Midwest City, Edmond, Norman, Moore, Choctaw, and Yukon
              find their next ride. For nearly three decades, our family has been proud to serve the
              Oklahoma community with integrity and passion.
            </p>
            <p className="fade-up text-text-dim leading-relaxed font-body mb-10">
              As a premier Oklahoma dealer, we carry a huge selection of used and certified vehicles.
              We offer full service &amp; parts departments, online inventory browsing, and outstanding
              financing options — making AutoMax the preferred choice for OKC metro buyers. From your
              first visit to years down the road, we&rsquo;re here to keep you moving with confidence.
            </p>

            {/* CTA Buttons */}
            <div className="fade-up flex flex-wrap gap-4">
              <a
                href="#inventory"
                className="inline-block transform skew-x-[-4deg] bg-amber hover:bg-amber-light transition-colors duration-300"
              >
                <span className="inline-block transform skew-x-[4deg] px-8 py-3 text-bg font-bold text-sm uppercase tracking-wider font-body">
                  Browse Inventory
                </span>
              </a>
              <a
                href="#contact"
                className="inline-block transform skew-x-[-4deg] border-2 border-amber hover:bg-amber/10 transition-colors duration-300"
              >
                <span className="inline-block transform skew-x-[4deg] px-8 py-3 text-amber font-bold text-sm uppercase tracking-wider font-body">
                  Contact Us
                </span>
              </a>
            </div>
          </div>

          {/* Right column — Stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="fade-up bg-card border border-border border-t-2 border-t-amber/30 p-6 text-center hover:border-t-amber transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="text-4xl font-bold text-amber font-heading">{stat.value}</div>
                <div className="text-text-dim text-sm mt-2 font-body">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. MEET OUR STAFF SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        {/* Subtle background accent */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 0%, rgba(232,168,73,0.06) 0%, transparent 50%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="fade-up text-amber text-xs font-bold uppercase tracking-[0.3em] font-body mb-4 block">
              Meet Our Team
            </span>
            <h2 className="fade-up text-3xl sm:text-4xl md:text-5xl font-bold text-text font-body leading-tight">
              The Faces Behind{' '}
              <span className="font-heading italic text-amber">AutoMax</span>
            </h2>
            <div className="fade-up w-24 h-0.5 bg-amber mx-auto mt-6" />
          </div>

          {/* Sales Department */}
          <DepartmentHeader title="Sales Department" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {salesTeam.map((person, i) => (
              <StaffCard key={person.name} person={person} index={i} />
            ))}
          </div>

          {/* Service Department */}
          <DepartmentHeader title="Service Department" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {serviceTeam.map((person, i) => (
              <StaffCard key={person.name} person={person} index={i} />
            ))}
          </div>

          {/* Parts Department */}
          <DepartmentHeader title="Parts Department" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {partsTeam.map((person, i) => (
              <StaffCard key={person.name} person={person} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. VALUES / WHY CHOOSE US SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="fade-up text-amber text-xs font-bold uppercase tracking-[0.3em] font-body mb-4 block">
              Why Choose Us
            </span>
            <h2 className="fade-up text-3xl sm:text-4xl font-bold text-text font-body leading-tight">
              The{' '}
              <span className="font-heading italic text-amber">AutoMax</span>{' '}
              Difference
            </h2>
          </div>

          {/* Value cards */}
          <div className="space-y-6">
            {values.map((item, i) => (
              <div
                key={item.title}
                className="fade-up bg-card border border-border p-8 flex items-start gap-6 group hover:border-amber/30 transition-all duration-300"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Icon container */}
                <div className="shrink-0 w-16 h-16 bg-amber/10 border border-amber/20 flex items-center justify-center text-amber group-hover:bg-amber/20 transition-all duration-300">
                  {item.icon}
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-xl font-bold text-text font-body mb-2 group-hover:text-amber transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-text-dim font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Accent bar — alternating position */}
                {i % 2 === 0 ? (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber/30 group-hover:bg-amber transition-colors duration-300" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. CONTACT CTA SECTION
      ══════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="fade-up relative bg-card border border-border overflow-hidden">
            {/* Amber gradient border effect on top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber/40 via-amber to-amber/40" />

            {/* Background radial glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at 50% 0%, rgba(232,168,73,0.08) 0%, transparent 60%)',
              }}
            />

            <div className="relative text-center py-16 px-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-text font-body mb-4">
                Ready to{' '}
                <span className="font-heading italic text-amber">Visit?</span>
              </h2>
              <p className="text-text-dim font-body text-lg mb-10 max-w-xl mx-auto">
                Stop by any of our three Oklahoma metro locations and let our team help you find
                the perfect vehicle. No appointment needed — walk-ins are always welcome.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#contact"
                  className="inline-block transform skew-x-[-4deg] bg-amber hover:bg-amber-light transition-colors duration-300"
                >
                  <span className="inline-block transform skew-x-[4deg] px-10 py-4 text-bg font-bold text-sm uppercase tracking-wider font-body">
                    Schedule a Test Drive
                  </span>
                </a>
                <a
                  href="#directions"
                  className="inline-block transform skew-x-[-4deg] border-2 border-amber hover:bg-amber/10 transition-colors duration-300"
                >
                  <span className="inline-block transform skew-x-[4deg] px-10 py-4 text-amber font-bold text-sm uppercase tracking-wider font-body">
                    Get Directions
                  </span>
                </a>
              </div>
            </div>

            {/* Bottom amber line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent" />
          </div>
        </div>
      </section>
    </div>
  )
}
