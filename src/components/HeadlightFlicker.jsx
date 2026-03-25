import { useState, useEffect, useRef } from 'react'

/* Simulates a key-fob unlock flash on the truck's headlights.
   Two quick flashes every 8-20 seconds, like someone clicking unlock.

   On desktop (object-position: center center), the truck's headlights
   sit at roughly 86% from top, 55% (left DRL) and 61% (right DRL)
   of the hero section. */

export default function HeadlightFlicker() {
  const [flash, setFlash] = useState(false)
  const timers = useRef([])

  useEffect(() => {
    function doFlash() {
      timers.current.push(setTimeout(() => setFlash(true), 0))
      timers.current.push(setTimeout(() => setFlash(false), 130))
      timers.current.push(setTimeout(() => setFlash(true), 300))
      timers.current.push(setTimeout(() => setFlash(false), 430))

      const next = 8000 + Math.random() * 12000
      timers.current.push(setTimeout(doFlash, next))
    }

    timers.current.push(setTimeout(doFlash, 4000 + Math.random() * 2000))
    return () => timers.current.forEach(clearTimeout)
  }, [])

  const headlightStyle = (left) => ({
    left,
    top: '58%',
    width: '2%',
    height: '3%',
    opacity: flash ? 1 : 0,
    transition: flash ? 'opacity 0.03s' : 'opacity 0.2s',
  })

  return (
    <div className="absolute inset-0 pointer-events-none z-[2]">
      {/* Left headlight (driver side DRL) */}
      <div className="absolute" style={headlightStyle('56%')}>
        <div className="absolute inset-0 bg-white rounded-full blur-[2px]" />
        <div className="absolute -inset-2 bg-amber-200/70 rounded-full blur-[6px]" />
        <div className="absolute -inset-6 bg-amber-100/30 rounded-full blur-[16px]" />
      </div>

      {/* Right headlight (passenger side DRL) */}
      <div className="absolute" style={headlightStyle('63%')}>
        <div className="absolute inset-0 bg-white rounded-full blur-[2px]" />
        <div className="absolute -inset-2 bg-amber-200/70 rounded-full blur-[6px]" />
        <div className="absolute -inset-6 bg-amber-100/30 rounded-full blur-[16px]" />
      </div>

      {/* Ground reflection / ambient spill */}
      <div
        className="absolute"
        style={{
          left: '54%',
          top: '62%',
          width: '14%',
          height: '8%',
          opacity: flash ? 0.5 : 0,
          transition: flash ? 'opacity 0.03s' : 'opacity 0.3s',
        }}
      >
        <div className="w-full h-full bg-amber-200/20 rounded-full blur-[30px]" />
      </div>
    </div>
  )
}
