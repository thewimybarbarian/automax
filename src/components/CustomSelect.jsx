import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CustomSelect({ options, defaultValue }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(defaultValue || options[0])
  const ref = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 border bg-white/10 backdrop-blur px-4 py-3.5 font-body text-sm text-text outline-none transition-all cursor-pointer ${
          isOpen
            ? 'border-amber/50 bg-white/15'
            : 'border-white/10 hover:border-white/20'
        }`}
      >
        <span className={selected === options[0] ? 'text-text-dim' : 'text-text'}>
          {selected}
        </span>
        <svg
          className={`w-4 h-4 text-text-dim transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 z-50 mt-1 max-h-64 overflow-y-auto border border-white/10 bg-card/95 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.7)]"
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  setSelected(opt)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2.5 font-body text-sm transition-colors cursor-pointer ${
                  selected === opt
                    ? 'bg-amber/15 text-amber'
                    : 'text-text-dim hover:bg-white/5 hover:text-text'
                }`}
              >
                {opt}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
