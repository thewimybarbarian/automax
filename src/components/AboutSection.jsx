import { useState, useEffect, useCallback } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'

const testimonials = [
  {
    name: 'Maria G.',
    text: 'Anthony and James made my car purchase effortless. No pressure, just great options that fit my budget. I drove away same day!',
    stars: 5,
  },
  {
    name: 'Derek T.',
    text: 'We went in with $200 and a prayer and walked out with a 2021 Kia Forte. These guys work miracles with financing.',
    stars: 5,
  },
  {
    name: 'Sandra W.',
    text: "Second vehicle I've purchased from AutoMax. The sales staff are polite, informative, and courteous. Best experience every time.",
    stars: 5,
  },
  {
    name: 'James R.',
    text: 'Tyson was an excellent salesman — super polite, gave me a great deal, and got it done quick. Highly recommend!',
    stars: 5,
  },
]

const stats = [
  { value: '28+', label: 'Years in Business' },
  { value: '10K+', label: 'Happy Customers' },
  { value: '3', label: 'OKC Metro Locations' },
  { value: '4.5★', label: 'Average Rating' },
]

function StarRating({ count }) {
  return (
    <div className="flex items-center justify-center gap-1 mb-4">
      {Array.from({ length: count }, (_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-amber"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function AboutSection() {
  const sectionRef = useFadeUp()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const goTo = useCallback(
    (index) => {
      if (index === activeIndex) return
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveIndex(index)
        setIsTransitioning(false)
      }, 300)
    },
    [activeIndex]
  )

  useEffect(() => {
    const interval = setInterval(() => {
      goTo((activeIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [activeIndex, goTo])

  const current = testimonials[activeIndex]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 md:py-32 bg-bg overflow-hidden"
    >
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
              className="fade-up bg-card/50 backdrop-blur border border-border border-t-2 border-t-amber/30 p-8 text-center hover:border-amber transition-colors duration-300"
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
        <div className="fade-up mb-20" style={{ transitionDelay: '200ms' }}>
          <div className="bg-gradient-to-r from-amber/20 via-amber/5 to-amber/20 border border-amber/30 p-10 text-center">
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
              <button className="skew-x-[-4deg] px-8 py-3 bg-amber text-bg font-semibold hover:bg-amber-light transition-colors duration-300 font-body">
                <span className="skew-x-[4deg] inline-block uppercase tracking-wider">Apply Now</span>
              </button>
              <button className="skew-x-[-4deg] px-8 py-3 border border-amber text-amber font-semibold hover:bg-amber/10 transition-colors duration-300 font-body">
                <span className="skew-x-[4deg] inline-block uppercase tracking-wider">Learn More</span>
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Carousel */}
        <div className="fade-up" style={{ transitionDelay: '300ms' }}>
          <div className="bg-card border border-border p-10 max-w-3xl mx-auto relative overflow-hidden">
            {/* Decorative quotation mark */}
            <span
              className="absolute -top-4 left-6 text-9xl text-amber/10 font-heading leading-none pointer-events-none select-none"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <div
              className="relative z-10 transition-all duration-300 ease-in-out"
              style={{
                opacity: isTransitioning ? 0 : 1,
                transform: isTransitioning
                  ? 'translateY(12px)'
                  : 'translateY(0)',
              }}
            >
              <StarRating count={current.stars} />
              <blockquote className="text-lg md:text-xl text-text leading-relaxed italic text-center font-body">
                &ldquo;{current.text}&rdquo;
              </blockquote>
              <p className="text-amber font-semibold mt-4 text-center font-body">
                {current.name}
              </p>
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1 transition-all duration-300 ${
                  i === activeIndex
                    ? 'w-8 bg-amber'
                    : 'w-2 bg-border hover:bg-amber/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
