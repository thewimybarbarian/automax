import { useState, useEffect, useRef } from 'react'

/* Simulates a key-fob unlock flash on the truck's headlights.
   Two quick flashes every 8-20 seconds, like someone clicking unlock.

   Headlight positions are calculated from the original hero image (2560x1490).
   The truck's left DRL is at ~(1140,620) and right DRL at ~(1340,620).
   With object-cover + center center, these map to ~44%/53% horizontally
   and ~42% vertically on desktop. On mobile the x-offset shifts due to
   the 65% object-position. */

export default function HeadlightFlicker() {
  const [flash, setFlash] = useState(false)
  const timers = useRef([])

  useEffect(() => {
    function doFlash() {
      // Double flash pattern (like a real key fob unlock)
      timers.current.push(setTimeout(() => setFlash(true), 0))
      timers.current.push(setTimeout(() => setFlash(false), 130))
      timers.current.push(setTimeout(() => setFlash(true), 300))
      timers.current.push(setTimeout(() => setFlash(false), 430))

      // Schedule next flash
      const next = 8000 + Math.random() * 12000
      timers.current.push(setTimeout(doFlash, next))
    }

    // First flash after 4-6s
    timers.current.push(setTimeout(doFlash, 4000 + Math.random() * 2000))
    return () => timers.current.forEach(clearTimeout)
  }, [])

  const headlightStyle = (left) => ({
    left,
    top: '42%',
    width: '2.2%',
    height: '4%',
    opacity: flash ? 1 : 0,
    transition: flash ? 'opacity 0.03s' : 'opacity 0.2s',
  })

  return (
    <div className="absolute inset-0 pointer-events-none z-[2]">
      {/* Left headlight */}
      <div className="absolute" style={headlightStyle('44%')}>
        {/* Core bright spot */}
        <div className="absolute inset-0 bg-white rounded-full blur-[2px]" />
        {/* Warm glow */}
        <div className="absolute -inset-2 bg-amber-200/70 rounded-full blur-[6px]" />
        {/* Wide soft glow */}
        <div className="absolute -inset-6 bg-amber-100/30 rounded-full blur-[16px]" />
      </div>

      {/* Right headlight */}
      <div className="absolute" style={headlightStyle('52.5%')}>
        <div className="absolute inset-0 bg-white rounded-full blur-[2px]" />
        <div className="absolute -inset-2 bg-amber-200/70 rounded-full blur-[6px]" />
        <div className="absolute -inset-6 bg-amber-100/30 rounded-full blur-[16px]" />
      </div>

      {/* Ground reflection / ambient spill */}
      <div
        className="absolute"
        style={{
          left: '42%',
          top: '46%',
          width: '16%',
          height: '10%',
          opacity: flash ? 0.5 : 0,
          transition: flash ? 'opacity 0.03s' : 'opacity 0.3s',
        }}
      >
        <div className="w-full h-full bg-amber-200/20 rounded-full blur-[30px]" />
      </div>
    </div>
  )
}
