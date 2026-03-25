import HeroSection from './components/HeroSection'
import InventorySection from './components/InventorySection'
import AboutSection from './components/AboutSection'
import ContactFooter from './components/ContactFooter'
import FloatingToolbar from './components/FloatingToolbar'
import TestimonialMarquee from './components/TestimonialMarquee'

function App() {
  return (
    <div className="min-h-screen bg-bg font-body text-text">
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
