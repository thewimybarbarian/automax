const testimonials = [
  { name: 'Michelle', location: 'Del City', text: 'James was friendly, funny and incredibly knowledgeable. Anthony took extra time to understand my needs. Car buying was smooth and painless!', stars: 5 },
  { name: 'Ana H.', location: 'OKC', text: 'We went in with $200, a trade-in, and a prayer — walked out with a 2021 Kia Forte. These guys work miracles with financing!', stars: 5 },
  { name: 'Joline T.', location: 'Norman', text: 'No one was pushing or pressuring us. They listened to my needs and the Palisade was better priced than every other dealer we visited.', stars: 5 },
  { name: 'Julia K.', location: 'OKC', text: 'They helped me find a car that fit all my needs without pressuring me. More considerate than any other place I\'ve been.', stars: 5 },
  { name: 'Jessica S.', location: 'OKC', text: 'Michael was absolutely amazing! Customer service I\'ve never experienced anywhere else. He went above and beyond to make sure I was happy.', stars: 5 },
  { name: 'Holly', location: 'Shawnee', text: 'Angel went above and beyond helping my son buy a vehicle while I was out of state. Nothing but professional and extremely helpful.', stars: 5 },
  { name: 'John M.', location: 'OKC', text: 'John and Ryan helped me get out of a negative equity situation. John even put gas in my car out of his own pocket! These guys are amazing.', stars: 5 },
  { name: 'Kendra', location: 'OKC', text: 'Michael greeted me warmly and was very knowledgeable and patient. I look forward to coming back — will definitely ask for Michael again.', stars: 5 },
  { name: 'Amari', location: 'Del City', text: 'Justin was very professional, helpful, and easy to work with. Found exactly what I was looking for on their website. Great customer service!', stars: 5 },
  { name: 'Dillon', location: 'OKC', text: 'Tyson was super polite, gave me a great deal, and got it done quick. Showed me great options until I found exactly what I needed.', stars: 5 },
  { name: 'Sara G.', location: 'OKC', text: 'John Lindsey is my family\'s car guy! I was so pleased I went back a year later for a second purchase. Helpful with a great attitude.', stars: 5 },
  { name: 'Fran', location: 'Del City', text: 'They know you by name even after purchasing 3 cars! The entire team is trustworthy with no haggling. Always clean and welcoming.', stars: 5 },
  { name: 'Gaylan', location: 'Del City', text: 'Justin acted in such a professional manner from the time I stepped on the lot until I drove off. Great experience overall.', stars: 5 },
  { name: 'Mary', location: 'OKC', text: 'Michael was honest and genuinely listened to my needs. Found the exact Sonata with the price, rate, and payments I needed.', stars: 5 },
  { name: 'Sam B.', location: 'OKC', text: 'Aaron Cotton helped make everything very affordable. Got exactly what I wanted — can\'t find a better car dealer in all of Oklahoma.', stars: 5 },
  { name: 'James', location: 'OKC', text: 'Don\'t have the best credit and these guys worked hard to make a deal I was happy with. Great experience buying an awesome car.', stars: 5 },
  { name: 'Theresa', location: 'OKC', text: 'Second vehicle from AutoMax. Sales staff were polite, informative, and courteous. One of the best car buying experiences ever.', stars: 5 },
  { name: 'Michael S.', location: 'Midwest City', text: 'They asked me multiple times if I wanted to proceed instead of pressuring me. Great down-to-earth buying experience. Ask for Evan!', stars: 5 },
]

const row1 = testimonials.slice(0, 9)
const row2 = testimonials.slice(9, 18)

function StarRating({ count }) {
  return (
    <span className="text-amber text-sm tracking-wide">
      {Array.from({ length: count }, (_, i) => (
        <span key={i}>&#9733;</span>
      ))}
    </span>
  )
}

function GoogleIcon() {
  return (
    <span className="inline-flex items-center justify-center w-5 h-5 bg-white/10 border border-white/20 text-[10px] font-bold text-white leading-none">
      G
    </span>
  )
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="flex-shrink-0 min-w-[350px] max-w-[400px] bg-card border border-border border-t-2 border-t-amber/30 p-6 mx-3 group hover:-translate-y-1 hover:border-t-amber transition-all duration-300 relative overflow-hidden">
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        {/* Stars + Google icon */}
        <div className="flex items-center justify-between mb-3">
          <StarRating count={testimonial.stars} />
          <GoogleIcon />
        </div>

        {/* Quote */}
        <p className="text-text text-sm leading-relaxed mb-4 line-clamp-3">
          &ldquo;{testimonial.text}&rdquo;
        </p>

        {/* Customer info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber/15 border border-amber/25 flex items-center justify-center text-amber font-bold text-xs font-heading">
            {testimonial.name.charAt(0)}
          </div>
          <div>
            <p className="text-amber font-semibold text-sm">{testimonial.name}</p>
            <p className="text-text-dim text-xs">{testimonial.location}, OK</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ testimonials: rowData, direction = 'left', speed = 40 }) {
  const doubled = [...rowData, ...rowData]
  const animName = direction === 'left' ? 'marqueeScrollLeft' : 'marqueeScrollRight'

  return (
    <div
      className="overflow-hidden relative group/row"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
    >
      <div
        className="flex group-hover/row:[animation-play-state:paused]"
        style={{
          animation: `${animName} ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  )
}

export default function TestimonialMarquee() {
  return (
    <section className="relative py-20 md:py-28 bg-[#0c0c0c] overflow-hidden">
      {/* Amber glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-amber/60 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[120px] bg-amber/[0.04] blur-[80px] pointer-events-none" />

      {/* Decorative giant quotation mark */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[280px] md:text-[400px] font-heading text-amber/[0.07] leading-none pointer-events-none select-none" aria-hidden="true">
        &ldquo;
      </div>

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-amber/[0.02] blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="relative text-center mb-16 px-6 z-10">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-12 bg-amber/50" />
          <span className="text-amber uppercase tracking-[0.3em] text-xs font-semibold font-body">
            What Our Customers Say
          </span>
          <span className="h-px w-12 bg-amber/50" />
        </div>

        {/* Heading */}
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-text mb-6">
          Real Reviews from <em className="text-amber italic">Real People</em>
        </h2>

        {/* Giant rating display */}
        <div className="flex flex-col items-center gap-3 mt-8">
          <span className="text-7xl md:text-8xl font-heading font-black text-amber leading-none">
            4.5
          </span>
          <div className="flex gap-1 text-2xl">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-amber">&#9733;</span>
            ))}
            <span className="text-amber/40">&#9733;</span>
          </div>
          <p className="text-text-dim text-sm tracking-wide mt-1">
            Based on <span className="text-text font-semibold">500+</span> Google Reviews
          </p>
        </div>
      </div>

      {/* Marquee Row 1 — scrolls left */}
      <div className="mb-6">
        <MarqueeRow testimonials={row1} direction="left" speed={40} />
      </div>

      {/* Marquee Row 2 — scrolls right */}
      <div>
        <MarqueeRow testimonials={row2} direction="right" speed={40} />
      </div>

      {/* Amber glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-amber/30 to-transparent" />

      <style>{`
        @keyframes marqueeScrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeScrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  )
}
