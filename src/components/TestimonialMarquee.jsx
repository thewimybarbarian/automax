const reviews = [
  { name: 'Maria G.', text: 'Anthony and James made my car purchase effortless. No pressure, just great options that fit my budget. I drove away same day!', stars: 5, source: 'Google' },
  { name: 'Derek T.', text: 'We went in with $200 and a prayer and walked out with a 2021 Kia Forte. These guys work miracles with financing.', stars: 5, source: 'Google' },
  { name: 'Sandra W.', text: "Second vehicle I've purchased from AutoMax. The sales staff are polite, informative, and courteous. Best experience every time.", stars: 5, source: 'Google' },
  { name: 'James R.', text: 'Tyson was an excellent salesman — super polite, gave me a great deal, and got it done quick. Highly recommend!', stars: 5, source: 'Google' },
  { name: 'Zachary G.', text: 'Super friendly team. Made the process fast and professional. Walked out with exactly what I wanted. Will be back!', stars: 5, source: 'DealerRater' },
  { name: 'Michael B.', text: 'Third car I\'ve bought from AutoMax. The customer service is excellent every single time. They treat you like family.', stars: 5, source: 'Google' },
  { name: 'Ashley K.', text: 'Lillian helped me find the perfect SUV and Brian in finance got me an incredible rate through a credit union. So grateful!', stars: 5, source: 'Cars.com' },
  { name: 'Robert M.', text: 'Struggled for months to find financing elsewhere. AutoMax listened to what I needed without pressure and made it happen.', stars: 5, source: 'Google' },
  { name: 'Patricia L.', text: 'The service department is superb and clean. They never pressure you for unnecessary work. Honest and reliable.', stars: 5, source: 'SureCritic' },
  { name: 'Chris D.', text: 'Best car buying experience in OKC. No games, no gimmicks. Fair prices and they actually care about getting you approved.', stars: 5, source: 'Google' },
  { name: 'Tiffany H.', text: 'Aaron Cotton went above and beyond for us. He found the exact truck we wanted and the payments were even lower than expected!', stars: 5, source: 'DealerRater' },
  { name: 'Marcus J.', text: 'Drove from Tulsa just to buy here. Worth every mile. The staff is amazing and the vehicles are well-priced compared to other dealers.', stars: 5, source: 'Google' },
  { name: 'Jennifer S.', text: 'Ryan Williams took his time showing us every option. No rush, no pressure. Left feeling confident about our purchase.', stars: 5, source: 'Cars.com' },
  { name: 'David W.', text: 'John Lindsey is the real deal. Straight up honest, funny, and got me into a car I love. Already sent two friends his way.', stars: 5, source: 'Google' },
  { name: 'Kayla R.', text: 'Coming from a single mom — these guys gave me hope when nobody else would. Flexible financing that actually works. Thank you AutoMax!', stars: 5, source: 'Google' },
  { name: 'Brandon F.', text: 'Management takes extra time to understand your budget and lifestyle. They don\'t just sell cars, they build relationships.', stars: 5, source: 'DealerRater' },
]

const row1 = reviews.slice(0, 8)
const row2 = reviews.slice(8, 16)

function StarRow({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }, (_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-amber" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="flex-shrink-0 w-[380px] bg-card border border-border border-t-2 border-t-amber/40 p-6 mx-3 group hover:border-amber/60 transition-all duration-300 relative overflow-hidden">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        {/* Stars + Source */}
        <div className="flex items-center justify-between mb-3">
          <StarRow count={review.stars} />
          <span className="text-[10px] uppercase tracking-wider text-text-dim/50 font-semibold">{review.source}</span>
        </div>

        {/* Quote */}
        <p className="text-text text-sm leading-relaxed mb-4 line-clamp-3">
          &ldquo;{review.text}&rdquo;
        </p>

        {/* Name */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber/20 border border-amber/30 flex items-center justify-center text-amber font-bold text-xs">
            {review.name.charAt(0)}
          </div>
          <div>
            <p className="text-amber font-semibold text-sm">{review.name}</p>
            <p className="text-text-dim text-[11px]">Verified Customer</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ reviews: rowReviews, direction = 'left', speed = 40 }) {
  // Duplicate for seamless loop
  const doubled = [...rowReviews, ...rowReviews, ...rowReviews]
  const animName = direction === 'left' ? 'marqueeLeft' : 'marqueeRight'

  return (
    <div className="overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />

      <div
        className="flex"
        style={{
          animation: `${animName} ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((review, i) => (
          <ReviewCard key={`${review.name}-${i}`} review={review} />
        ))}
      </div>
    </div>
  )
}

export default function TestimonialMarquee() {
  return (
    <section className="relative py-20 md:py-28 bg-bg overflow-hidden">
      {/* Big ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-amber/[0.03] blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="relative text-center mb-14 px-6">
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-12 bg-amber/50" />
          <span className="text-amber uppercase tracking-[0.25em] text-xs font-semibold">
            Real Reviews
          </span>
          <span className="h-px w-12 bg-amber/50" />
        </div>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-text mb-4">
          <span className="text-amber font-heading italic">10,000+</span> Happy Customers
        </h2>

        <p className="text-text-dim text-lg max-w-xl mx-auto">
          Don&rsquo;t just take our word for it — hear from the people who drive home happy.
        </p>

        {/* Rating summary */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-amber font-heading">4.5</span>
            <div>
              <div className="flex gap-0.5">
                {[1,2,3,4].map(i => (
                  <svg key={i} className="w-4 h-4 text-amber" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-4 h-4 text-amber/40" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <p className="text-text-dim text-[10px] uppercase tracking-wider mt-0.5">Average Rating</p>
            </div>
          </div>
          <span className="w-px h-8 bg-border" />
          <div className="text-center">
            <span className="text-2xl font-bold text-text">86+</span>
            <p className="text-text-dim text-[10px] uppercase tracking-wider">Verified Reviews</p>
          </div>
          <span className="w-px h-8 bg-border" />
          <div className="text-center">
            <span className="text-2xl font-bold text-text">70%</span>
            <p className="text-text-dim text-[10px] uppercase tracking-wider">5-Star Ratings</p>
          </div>
        </div>
      </div>

      {/* Marquee Row 1 — scrolls left */}
      <div className="mb-6">
        <MarqueeRow reviews={row1} direction="left" speed={45} />
      </div>

      {/* Marquee Row 2 — scrolls right */}
      <div>
        <MarqueeRow reviews={row2} direction="right" speed={50} />
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-33.333%); }
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
