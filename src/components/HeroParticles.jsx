import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 35
const PARTICLE_COLOR = [232, 168, 73] // #e8a849

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 1 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.1,
    speedY: -(0.15 + Math.random() * 0.35),
    speedX: (Math.random() - 0.5) * 0.2,
  }
}

export default function HeroParticles() {
  const canvasRef = useRef(null)
  const animFrameRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const visibleRef = useRef(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    }

    resize()

    // Initialize particles
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(width, height)
    )

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    }

    function draw() {
      if (!visibleRef.current) {
        animFrameRef.current = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, width, height)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const parallaxStrength = 15

      for (const p of particlesRef.current) {
        p.x += p.speedX
        p.y += p.speedY

        // Wrap around when particle drifts off screen
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        // Draw with mouse parallax offset (opposite direction)
        const drawX = p.x - mx * parallaxStrength * (p.radius / 3)
        const drawY = p.y - my * parallaxStrength * (p.radius / 3)

        ctx.beginPath()
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${PARTICLE_COLOR[0]}, ${PARTICLE_COLOR[1]}, ${PARTICLE_COLOR[2]}, ${p.opacity})`
        ctx.fill()
      }

      animFrameRef.current = requestAnimationFrame(draw)
    }

    // IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(canvas)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('resize', resize, { passive: true })

    animFrameRef.current = requestAnimationFrame(draw)

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', resize)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}
