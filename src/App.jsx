import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import MotionHero from './components/MotionHero'
import TrustStrip from './components/TrustStrip'
import InventorySection from './components/InventorySection'
import FinancingCalculator from './components/FinancingCalculator'
import AboutSection from './components/AboutSection'
import ContactFooter from './components/ContactFooter'
import FloatingToolbar from './components/FloatingToolbar'
import MobileCTABar from './components/MobileCTABar'
import TestimonialMarquee from './components/TestimonialMarquee'
import AboutUsPage from './components/AboutUsPage'
import PageTransition from './components/PageTransition'

function App() {
  const [page, setPage] = useState(() => {
    return window.location.hash === '#about-us' ? 'about' : 'home'
  })

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash
      if (hash === '#about-us') {
        setPage('about')
        window.scrollTo(0, 0)
      } else if (hash === '' || hash === '#' || hash === '#home') {
        setPage('home')
        window.scrollTo(0, 0)
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className="min-h-screen bg-bg font-body text-text">
      <Navbar />
      <MobileCTABar />

      <PageTransition pageKey={page}>
        {page === 'about' ? (
          <>
            <AboutUsPage />
            <hr className="section-divider" />
            <TestimonialMarquee />
            <hr className="section-divider" />
            <ContactFooter />
          </>
        ) : (
          <>
            <FloatingToolbar />
            <MotionHero />
            <TrustStrip />
            <hr className="section-divider" />
            <InventorySection />
            <hr className="section-divider" />
            <FinancingCalculator />
            <hr className="section-divider" />
            <AboutSection />
            <hr className="section-divider" />
            <TestimonialMarquee />
            <hr className="section-divider" />
            <ContactFooter />
          </>
        )}
      </PageTransition>
    </div>
  )
}

export default App
