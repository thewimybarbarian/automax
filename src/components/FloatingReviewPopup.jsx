import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const reviews = [
  { name: 'Michelle', location: 'Del City', text: 'James was friendly, funny and incredibly knowledgeable. Car buying was smooth and painless!', stars: 5 },
  { name: 'Ana H.', location: 'OKC', text: 'Walked out with a 2021 Kia Forte. These guys work miracles with financing!', stars: 5 },
  { name: 'Jessica S.', location: 'OKC', text: 'Michael was absolutely amazing! Customer service I\'ve never experienced anywhere else.', stars: 5 },
  { name: 'John M.', location: 'OKC', text: 'John even put gas in my car out of his own pocket! These guys are amazing.', stars: 5 },
  { name: 'Fran', location: 'Del City', text: 'They know you by name even after purchasing 3 cars! The entire team is trustworthy.', stars: 5 },
  { name: 'Theresa', location: 'OKC', text: 'Second vehicle from AutoMax. One of the best car buying experiences ever.', stars: 5 },
  { name: 'Holly', location: 'Shawnee', text: 'Angel went above and beyond helping my son buy a vehicle. Nothing but professional!', stars: 5 },
  { name: 'Sam B.', location: 'OKC', text: 'Can\'t find a better car dealer in all of Oklahoma. Got exactly what I wanted!', stars: 5 },
]

export default function FloatingReviewPopup() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [inHeroZone, setInHeroZone] = useState(true)

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setIsVisible(true)
    }, 2500)
    return () => clearTimeout(initialTimer)
  }, [])

  // Hide popup when scrolled past hero section
  useEffect(() => {
    const onScroll = () => {
      setInHeroZone(window.scrollY < window.innerHeight * 0.7)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length)
        setIsVisible(true)
      }, 500)
    }, 4500)

    return () => clearInterval(interval)
  }, [isVisible])

  const review = reviews[currentIndex]

  return (
    <div
      className="hidden lg:block fixed left-6 xl:left-10 z-40 pointer-events-none transition-opacity duration-500"
      style={{ maxWidth: '280px', top: '40%', transform: 'translateY(-50%)', opacity: inHeroZone ? 1 : 0 }}
    >
      <AnimatePresence mode="wait">
        {isVisible && inHeroZone && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="pointer-events-auto"
          >
            <div className="relative bg-bg/80 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Top amber accent line */}
              <div className="h-[2px] bg-gradient-to-r from-amber via-amber-light to-amber" />

              <div className="p-5">
                {/* Google badge + stars row */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-7 h-7 bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg key={i} className="w-3.5 h-3.5 text-amber" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Review text */}
                <p className="text-text/90 text-sm leading-relaxed mb-4 font-body">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber/15 border border-amber/30 flex items-center justify-center text-amber font-bold text-xs font-heading shrink-0">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-amber font-semibold text-sm leading-tight">{review.name}</p>
                    <p className="text-text-dim text-xs">{review.location}, OK</p>
                  </div>
                </div>

                {/* Verified badge */}
                <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.06]">
                  <svg className="w-3 h-3 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.403 12.652a3 3 0 010-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[11px] text-text-dim tracking-wide">Verified Google Review</span>
                </div>
              </div>

              {/* Subtle shimmer */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none"
                style={{ animation: 'shimmer 4s ease-in-out infinite' }}
              />
            </div>

            {/* Progress bar */}
            <div className="h-[2px] bg-white/5 overflow-hidden">
              <motion.div
                className="h-full bg-amber/40"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 4.5, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
