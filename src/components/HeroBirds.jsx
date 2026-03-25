import { useEffect, useState, useRef } from 'react'

/* Each bird is a tiny flapping silhouette rendered with CSS.
   They drift from right-to-left (or left-to-right) at various
   altitudes, speeds, and sizes to feel organic and alive. */

function createBird(id) {
  const fromLeft = Math.random() > 0.35 // most fly left-to-right like the photo faces
  const y = 8 + Math.random() * 35 // top 8-43% of hero (sky area)
  const size = 3 + Math.random() * 5 // 3-8px
  const duration = 18 + Math.random() * 25 // 18-43s to cross
  const delay = Math.random() * 20
  const flapSpeed = 0.3 + Math.random() * 0.4 // 0.3-0.7s per flap
  const drift = -8 + Math.random() * 16 // slight vertical drift

  return { id, fromLeft, y, size, duration, delay, flapSpeed, drift }
}

function Bird({ bird }) {
  const { fromLeft, y, size, duration, delay, flapSpeed, drift } = bird

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top: `${y}%`,
        left: fromLeft ? '-3%' : '103%',
        animation: `birdFly${fromLeft ? 'R' : 'L'} ${duration}s linear ${delay}s infinite`,
      }}
    >
      <div
        className="relative"
        style={{
          animation: `birdDrift ${duration * 0.4}s ease-in-out infinite alternate`,
          '--drift': `${drift}px`,
        }}
      >
        {/* Bird body - two tiny wing lines that flap */}
        <svg
          width={size * 3}
          height={size * 2}
          viewBox="0 0 18 12"
          fill="none"
          className="opacity-[0.35]"
        >
          <path
            d="M9 6 C7 2, 3 0, 0 1"
            stroke="#1a1a1a"
            strokeWidth="1.2"
            strokeLinecap="round"
            style={{
              animation: `birdFlapL ${flapSpeed}s ease-in-out infinite alternate`,
              transformOrigin: '9px 6px',
            }}
          />
          <path
            d="M9 6 C11 2, 15 0, 18 1"
            stroke="#1a1a1a"
            strokeWidth="1.2"
            strokeLinecap="round"
            style={{
              animation: `birdFlapR ${flapSpeed}s ease-in-out infinite alternate`,
              transformOrigin: '9px 6px',
            }}
          />
        </svg>
      </div>
    </div>
  )
}

export default function HeroBirds() {
  const [birds] = useState(() =>
    Array.from({ length: 7 }, (_, i) => createBird(i))
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      <style>{`
        @keyframes birdFlyR {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 6vw)); }
        }
        @keyframes birdFlyL {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100vw - 6vw)); }
        }
        @keyframes birdDrift {
          0% { transform: translateY(0); }
          100% { transform: translateY(var(--drift, 8px)); }
        }
        @keyframes birdFlapL {
          0% { d: path("M9 6 C7 2, 3 0, 0 1"); }
          100% { d: path("M9 6 C7 7, 3 8, 0 7"); }
        }
        @keyframes birdFlapR {
          0% { d: path("M9 6 C11 2, 15 0, 18 1"); }
          100% { d: path("M9 6 C11 7, 15 8, 18 7"); }
        }
      `}</style>

      {birds.map((bird) => (
        <Bird key={bird.id} bird={bird} />
      ))}
    </div>
  )
}
