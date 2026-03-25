import { useEffect, useRef } from 'react'

export function useFadeUp() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = Array.from(el.querySelectorAll('.fade-up'))
    if (!targets.length) return

    // Test if IntersectionObserver actually works (some headless envs break it)
    let observerWorks = false
    const testEl = document.createElement('div')
    testEl.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;'
    document.body.appendChild(testEl)

    const testObserver = new IntersectionObserver((entries) => {
      observerWorks = true
      testObserver.disconnect()
      testEl.remove()
    }, { threshold: 0 })
    testObserver.observe(testEl)

    // After a short delay, check if the test observer fired
    const timer = setTimeout(() => {
      testObserver.disconnect()
      testEl.remove()

      if (observerWorks) {
        // Observer works — use it for scroll-triggered reveals
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible')
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 0, rootMargin: '100px 0px' }
        )
        targets.forEach((t) => observer.observe(t))
        el._observer = observer
      } else {
        // Observer broken — use scroll-based fallback
        const checkVisibility = () => {
          const viewBottom = window.scrollY + window.innerHeight + 80
          targets.forEach((t) => {
            if (!t.classList.contains('visible')) {
              const top = t.getBoundingClientRect().top + window.scrollY
              if (top < viewBottom) {
                t.classList.add('visible')
              }
            }
          })
        }
        checkVisibility()
        window.addEventListener('scroll', checkVisibility, { passive: true })
        el._scrollHandler = checkVisibility
      }
    }, 150)

    return () => {
      clearTimeout(timer)
      el._observer?.disconnect()
      if (el._scrollHandler) {
        window.removeEventListener('scroll', el._scrollHandler)
      }
    }
  }, [])

  return ref
}
