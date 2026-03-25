import { useFadeUp } from '../hooks/useFadeUp'

const stats = [
  { value: '28+', label: 'Years in Business' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '3', label: 'OKC Metro Locations' },
  { value: '4.5★', label: 'Average Rating' },
]

export default function AboutSection() {
  const sectionRef = useFadeUp()

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Full-bleed car background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: 'url(https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1920)' }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-bg/85" />

      {/* Subtle ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber/[0.02] blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 fade-up">
          <span className="text-amber text-sm uppercase tracking-widest font-body">
            Why AutoMax
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-text mt-4 mb-6 font-body">
            Oklahoma&apos;s{' '}
            <span className="font-heading italic text-amber">Trusted</span>{' '}
            Dealer
          </h2>
          <p className="text-text-dim text-lg max-w-2xl mx-auto leading-relaxed font-body">
            Family-owned and community-driven for over 28 years. We believe
            everyone deserves reliable transportation — no matter your credit
            history.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="fade-up bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] border-t-2 border-t-amber/30 p-8 text-center hover:bg-white/[0.08] hover:border-amber/30 transition-colors duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl font-bold text-amber font-heading">
                {stat.value}
              </div>
              <div className="text-text-dim text-sm mt-2 font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Financing CTA Banner */}
        <div className="fade-up" style={{ transitionDelay: '200ms' }}>
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] bg-gradient-to-r from-amber/20 via-transparent to-amber/20 p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-text mb-4 font-body">
              Flexible Financing for{' '}
              <span className="font-heading italic text-amber">Everyone</span>
            </h3>
            <p className="text-text-dim text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-8 font-body">
              Whether you have excellent credit, are rebuilding, or just starting
              out — our network of banks, credit unions, and special finance
              lenders means we can find the right option for you.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="skew-x-[-4deg] px-8 py-3 bg-amber text-bg font-semibold hover:bg-amber-light transition-colors duration-300 font-body cursor-pointer">
                <span className="skew-x-[4deg] inline-block uppercase tracking-wider">Apply Now</span>
              </button>
              <button className="skew-x-[-4deg] px-8 py-3 border border-amber text-amber font-semibold hover:bg-amber/10 transition-colors duration-300 font-body cursor-pointer">
                <span className="skew-x-[4deg] inline-block uppercase tracking-wider">Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
