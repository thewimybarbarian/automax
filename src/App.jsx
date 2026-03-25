import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import InventorySection from './components/InventorySection'
import AboutSection from './components/AboutSection'
import ContactFooter from './components/ContactFooter'
import FloatingToolbar from './components/FloatingToolbar'
import TestimonialMarquee from './components/TestimonialMarquee'
import AboutUsPage from './components/AboutUsPage'

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

  if (page === 'about') {
    return (
      <div className="min-h-screen bg-bg font-body text-text">
        <Navbar />
        <AboutUsPage />
        <hr className="section-divider" />
        <TestimonialMarquee />
        <hr className="section-divider" />
        <ContactFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg font-body text-text">
      <Navbar />
      <FloatingToolbar />
      <HeroSection />
      <hr className="section-divider" />
      <InventorySection />
      <hr className="section-divider" />
      <AboutSection />
      <hr className="section-divider" />
      <TestimonialMarquee />
      <hr className="section-divider" />
      <ContactFooter />
    </div>
  )
}

export default App
