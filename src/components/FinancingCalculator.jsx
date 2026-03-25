import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const APR = 0.069;
const MONTHLY_RATE = APR / 12;
const TERM_STEPS = [36, 48, 60, 72];

function formatCurrency(value) {
  return "$" + value.toLocaleString("en-US");
}

function calculatePayment(vehiclePrice, downPayment, termMonths) {
  const principal = vehiclePrice - downPayment;
  if (principal <= 0) return 0;
  return Math.round(
    (principal * MONTHLY_RATE) / (1 - Math.pow(1 + MONTHLY_RATE, -termMonths))
  );
}

function sliderBackground(value, min, max) {
  const pct = ((value - min) / (max - min)) * 100;
  return `linear-gradient(to right, #e8a849 0%, #d4943d ${pct}%, rgba(255,255,255,0.06) ${pct}%, rgba(255,255,255,0.06) 100%)`;
}

/* Animated number that counts up/down */
function AnimatedNumber({ value, prefix = "$" }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    const start = display;
    const end = value;
    if (start === end) return;
    const duration = 400;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) ref.current = requestAnimationFrame(tick);
    }
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [value]);

  return (
    <span className="tabular-nums">
      {prefix}{display.toLocaleString("en-US")}
    </span>
  );
}

/* Donut chart SVG */
function DonutChart({ principal, interest, size = 180 }) {
  const total = principal + interest;
  if (total <= 0) return null;
  const principalPct = principal / total;
  const r = 65;
  const circumference = 2 * Math.PI * r;
  const principalArc = circumference * principalPct;
  const interestArc = circumference * (1 - principalPct);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
        {/* Interest arc */}
        <circle
          cx="90" cy="90" r={r}
          fill="none"
          stroke="rgba(232,168,73,0.15)"
          strokeWidth="18"
          strokeDasharray={`${interestArc} ${circumference - interestArc}`}
          strokeDashoffset={-principalArc}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
        {/* Principal arc */}
        <circle
          cx="90" cy="90" r={r}
          fill="none"
          stroke="url(#amberGradient)"
          strokeWidth="18"
          strokeDasharray={`${principalArc} ${circumference - principalArc}`}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
          style={{ filter: 'drop-shadow(0 0 8px rgba(232,168,73,0.4))' }}
        />
        <defs>
          <linearGradient id="amberGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8a849" />
            <stop offset="100%" stopColor="#d4943d" />
          </linearGradient>
        </defs>
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-dim text-[10px] uppercase tracking-wider mb-0.5">Monthly</span>
        <span className="text-amber text-2xl sm:text-3xl font-black font-heading tabular-nums">
          <AnimatedNumber value={Math.round((principal + interest) > 0 ? calculatePayment(principal + interest - interest + interest, 0, 60) : 0)} prefix="$" />
        </span>
      </div>
    </div>
  );
}

export default function FinancingCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(25000);
  const [downPayment, setDownPayment] = useState(2000);
  const [loanTerm, setLoanTerm] = useState(60);

  const payment = useMemo(
    () => calculatePayment(vehiclePrice, downPayment, loanTerm),
    [vehiclePrice, downPayment, loanTerm]
  );

  const principal = vehiclePrice - downPayment;
  const totalCost = payment * loanTerm;
  const totalInterest = Math.max(0, totalCost - principal);

  /* Donut chart values */
  const circumference = 2 * Math.PI * 65;
  const principalPct = totalCost > 0 ? principal / totalCost : 0;
  const principalArc = circumference * principalPct;
  const interestArc = circumference * (1 - principalPct);

  return (
    <motion.section
      className="relative bg-bg py-24 px-4 sm:px-6 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <style>{`
        .fin-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          outline: none;
          cursor: pointer;
          border-radius: 3px;
        }
        .fin-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          background: linear-gradient(135deg, #e8a849, #d4943d);
          cursor: pointer;
          border-radius: 50%;
          border: 3px solid #1a1a1f;
          box-shadow: 0 0 12px rgba(232,168,73,0.5), 0 0 4px rgba(232,168,73,0.3);
          transition: box-shadow 0.2s;
        }
        .fin-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 20px rgba(232,168,73,0.7), 0 0 8px rgba(232,168,73,0.5);
        }
        .fin-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #e8a849, #d4943d);
          border: 3px solid #1a1a1f;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 12px rgba(232,168,73,0.5);
        }
        .fin-slider::-moz-range-track {
          height: 6px;
          border: none;
          border-radius: 3px;
        }
      `}</style>

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber/[0.03] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-amber/80 text-[11px] font-semibold uppercase tracking-[0.25em] mb-4 px-4 py-1.5 border border-amber/20 rounded-full bg-amber/5">
            Financing
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mt-4 font-body">
            What's Your{" "}
            <span className="italic text-amber font-heading">
              Monthly Payment
            </span>
            ?
          </h2>
          <p className="text-dim text-base mt-3 max-w-lg mx-auto">
            Adjust the sliders to estimate your monthly auto payment
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Gradient border effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber/20 via-white/[0.08] to-transparent p-px pointer-events-none">
            <div className="w-full h-full rounded-2xl bg-[#13131a]" />
          </div>

          <div className="relative bg-gradient-to-b from-white/[0.04] to-transparent rounded-2xl p-8 sm:p-10 lg:p-12">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-14 items-center">
              {/* Left: Sliders */}
              <div className="space-y-8">
                {/* Vehicle Price */}
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <label className="text-text font-semibold text-sm uppercase tracking-wider">Vehicle Price</label>
                    <span className="text-amber font-bold text-xl font-heading tabular-nums">
                      <AnimatedNumber value={vehiclePrice} />
                    </span>
                  </div>
                  <input
                    type="range"
                    className="fin-slider"
                    min={10000}
                    max={60000}
                    step={500}
                    value={vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    style={{ background: sliderBackground(vehiclePrice, 10000, 60000) }}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-dim text-[10px] tracking-wider">$10,000</span>
                    <span className="text-dim text-[10px] tracking-wider">$60,000</span>
                  </div>
                </div>

                {/* Down Payment */}
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <label className="text-text font-semibold text-sm uppercase tracking-wider">Down Payment</label>
                    <span className="text-amber font-bold text-xl font-heading tabular-nums">
                      <AnimatedNumber value={downPayment} />
                    </span>
                  </div>
                  <input
                    type="range"
                    className="fin-slider"
                    min={0}
                    max={15000}
                    step={250}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    style={{ background: sliderBackground(downPayment, 0, 15000) }}
                  />
                  <div className="flex justify-between mt-2">
                    <span className="text-dim text-[10px] tracking-wider">$0</span>
                    <span className="text-dim text-[10px] tracking-wider">$15,000</span>
                  </div>
                </div>

                {/* Loan Term - Button Group */}
                <div>
                  <label className="text-text font-semibold text-sm uppercase tracking-wider block mb-4">Loan Term</label>
                  <div className="grid grid-cols-4 gap-2">
                    {TERM_STEPS.map((term) => (
                      <motion.button
                        key={term}
                        onClick={() => setLoanTerm(term)}
                        className={`relative py-3 text-center text-sm font-bold rounded-lg cursor-pointer transition-all duration-300 border ${
                          loanTerm === term
                            ? 'bg-amber/15 border-amber/50 text-amber shadow-[0_0_20px_rgba(232,168,73,0.15)]'
                            : 'bg-white/[0.03] border-white/[0.08] text-dim hover:border-amber/30 hover:text-text'
                        }`}
                        whileTap={{ scale: 0.96 }}
                      >
                        {term}<span className="text-xs font-normal ml-0.5">mo</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Donut chart + payment */}
              <div className="flex flex-col items-center lg:pr-4">
                {/* Donut Chart */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-6">
                  <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
                    {/* Background ring */}
                    <circle
                      cx="90" cy="90" r="65"
                      fill="none"
                      stroke="rgba(255,255,255,0.04)"
                      strokeWidth="20"
                    />
                    {/* Interest arc */}
                    <circle
                      cx="90" cy="90" r="65"
                      fill="none"
                      stroke="rgba(232,168,73,0.15)"
                      strokeWidth="20"
                      strokeDasharray={`${interestArc} ${circumference - interestArc}`}
                      strokeDashoffset={-principalArc}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                    />
                    {/* Principal arc */}
                    <circle
                      cx="90" cy="90" r="65"
                      fill="none"
                      stroke="url(#finGradient)"
                      strokeWidth="20"
                      strokeDasharray={`${principalArc} ${circumference - principalArc}`}
                      strokeLinecap="round"
                      className="transition-all duration-700 ease-out"
                      style={{ filter: 'drop-shadow(0 0 8px rgba(232,168,73,0.4))' }}
                    />
                    <defs>
                      <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f0be5e" />
                        <stop offset="100%" stopColor="#d4943d" />
                      </linearGradient>
                    </defs>
                  </svg>
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-dim text-[10px] uppercase tracking-[0.15em] mb-1">Per Month</span>
                    <motion.div
                      key={payment}
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <span className="text-amber text-3xl sm:text-4xl font-black font-heading tabular-nums">
                        <AnimatedNumber value={payment} />
                      </span>
                    </motion.div>
                    <span className="text-dim text-[10px] mt-0.5">{loanTerm} months</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-6 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gradient-to-br from-[#f0be5e] to-[#d4943d]" />
                    <span className="text-dim">Principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber/15 border border-amber/30" />
                    <span className="text-dim">Interest</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-white/[0.06]">
              <div className="text-center">
                <p className="text-dim text-[10px] uppercase tracking-[0.15em] mb-1.5">Amount Financed</p>
                <p className="text-text text-lg sm:text-xl font-bold font-heading tabular-nums">
                  <AnimatedNumber value={Math.max(0, principal)} />
                </p>
              </div>
              <div className="text-center border-x border-white/[0.06]">
                <p className="text-dim text-[10px] uppercase tracking-[0.15em] mb-1.5">Total Interest</p>
                <p className="text-amber/70 text-lg sm:text-xl font-bold font-heading tabular-nums">
                  <AnimatedNumber value={totalInterest} />
                </p>
              </div>
              <div className="text-center">
                <p className="text-dim text-[10px] uppercase tracking-[0.15em] mb-1.5">Total Cost</p>
                <p className="text-text text-lg sm:text-xl font-bold font-heading tabular-nums">
                  <AnimatedNumber value={totalCost} />
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-dim/40 text-[10px] text-center mt-6">
              * Estimated payment based on {(APR * 100).toFixed(1)}% APR. Actual rate depends on
              credit. Not a financing offer.
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button className="-skew-x-12 bg-gradient-to-r from-amber to-amber-light text-bg px-10 py-4 font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-[0_4px_25px_rgba(232,168,73,0.3)]">
            <span className="skew-x-12 inline-flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Get Pre-Approved
            </span>
          </button>
          <button className="-skew-x-12 border border-amber/40 text-amber px-10 py-4 font-bold uppercase tracking-wider hover:bg-amber/10 hover:border-amber/60 transition-all cursor-pointer bg-transparent">
            <span className="skew-x-12 inline-flex items-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              Call for Quote
            </span>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
