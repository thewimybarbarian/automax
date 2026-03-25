import { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const APR = 0.069;
const MONTHLY_RATE = APR / 12;
const TERM_STEPS = [36, 48, 60, 72];
const YEARS = Array.from({ length: 11 }, (_, i) => 2025 - i);
const MAKES = [
  "Acura","BMW","Chevrolet","Dodge","Ford","GMC","Honda","Hyundai",
  "Jeep","Kia","Lexus","Mazda","Mercedes-Benz","Nissan","Ram",
  "Subaru","Tesla","Toyota","Volkswagen",
];

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

function calculateBuyingPower(monthly, termMonths) {
  if (monthly <= 0 || termMonths <= 0) return 0;
  return monthly * ((1 - Math.pow(1 + MONTHLY_RATE, -termMonths)) / MONTHLY_RATE);
}

function sliderBackground(value, min, max) {
  const pct = ((value - min) / (max - min)) * 100;
  return `linear-gradient(to right, #e8a849 0%, #d4943d ${pct}%, rgba(255,255,255,0.06) ${pct}%, rgba(255,255,255,0.06) 100%)`;
}

/* Animated number */
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
  return <span className="tabular-nums">{prefix}{display.toLocaleString("en-US")}</span>;
}

/* Reusable premium card wrapper */
function PremiumCard({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-amber/20 via-white/[0.08] to-transparent p-px pointer-events-none">
        <div className="w-full h-full rounded-2xl bg-[#13131a]" />
      </div>
      <div className="relative bg-gradient-to-b from-white/[0.04] to-transparent rounded-2xl p-6 sm:p-8 lg:p-10 h-full">
        {children}
      </div>
    </motion.div>
  );
}

/* Dropdown chevron */
function ChevronDown() {
  return (
    <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-dim" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M4 6L8 10L12 6" stroke="#8a8680" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

const selectClass = "w-full bg-white/[0.03] border border-white/[0.1] rounded-lg text-text px-4 py-3 font-body text-sm appearance-none cursor-pointer focus:outline-none focus:border-amber/60 transition-colors";
const inputClass = "w-full bg-white/[0.03] border border-white/[0.1] rounded-lg text-text px-4 py-3 font-body text-sm focus:outline-none focus:border-amber/60 transition-colors";
const labelClass = "text-text font-semibold text-sm uppercase tracking-wider mb-2 block";

export default function FinancingCalculator() {
  /* Calculator state */
  const [vehiclePrice, setVehiclePrice] = useState(25000);
  const [downPayment, setDownPayment] = useState(2000);
  const [loanTerm, setLoanTerm] = useState(60);

  /* Trade-in state */
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [mileage, setMileage] = useState("");

  /* Buying power state */
  const [monthlyBudget, setMonthlyBudget] = useState(400);
  const [bpTerm, setBpTerm] = useState(60);

  const payment = useMemo(
    () => calculatePayment(vehiclePrice, downPayment, loanTerm),
    [vehiclePrice, downPayment, loanTerm]
  );
  const buyingPower = useMemo(
    () => calculateBuyingPower(monthlyBudget, bpTerm),
    [monthlyBudget, bpTerm]
  );

  const principal = vehiclePrice - downPayment;
  const totalCost = payment * loanTerm;
  const totalInterest = Math.max(0, totalCost - principal);

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

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-amber/80 text-[11px] font-semibold uppercase tracking-[0.25em] mb-4 px-4 py-1.5 border border-amber/20 rounded-full bg-amber/5">
            Financial Tools
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-text mt-4 font-body">
            Know Your{" "}
            <span className="italic text-amber font-heading">Numbers</span>
          </h2>
          <p className="text-dim text-base mt-3 max-w-xl mx-auto">
            Calculate payments, value your trade, and discover your buying power
          </p>
        </motion.div>

        {/* ═══ 3-Column Grid ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ─── Card 1: Payment Calculator ─── */}
          <PremiumCard delay={0.1}>
            <div className="mb-6">
              <span className="text-amber/70 text-[10px] uppercase tracking-[0.2em] font-semibold">Tool 1</span>
              <h3 className="text-xl sm:text-2xl font-bold text-text mt-1 font-body">
                Monthly <span className="font-heading italic text-amber">Payment</span>
              </h3>
            </div>

            <div className="space-y-6">
              {/* Vehicle Price */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-text font-semibold text-xs uppercase tracking-wider">Vehicle Price</label>
                  <span className="text-amber font-bold text-base font-heading tabular-nums">
                    <AnimatedNumber value={vehiclePrice} />
                  </span>
                </div>
                <input type="range" className="fin-slider" min={10000} max={60000} step={500}
                  value={vehiclePrice} onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  style={{ background: sliderBackground(vehiclePrice, 10000, 60000) }}
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-dim text-[9px] tracking-wider">$10K</span>
                  <span className="text-dim text-[9px] tracking-wider">$60K</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-text font-semibold text-xs uppercase tracking-wider">Down Payment</label>
                  <span className="text-amber font-bold text-base font-heading tabular-nums">
                    <AnimatedNumber value={downPayment} />
                  </span>
                </div>
                <input type="range" className="fin-slider" min={0} max={15000} step={250}
                  value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))}
                  style={{ background: sliderBackground(downPayment, 0, 15000) }}
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-dim text-[9px] tracking-wider">$0</span>
                  <span className="text-dim text-[9px] tracking-wider">$15K</span>
                </div>
              </div>

              {/* Loan Term Buttons */}
              <div>
                <label className="text-text font-semibold text-xs uppercase tracking-wider block mb-3">Loan Term</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {TERM_STEPS.map((term) => (
                    <motion.button key={term} onClick={() => setLoanTerm(term)}
                      className={`py-2 text-center text-xs font-bold rounded-lg cursor-pointer transition-all duration-300 border ${
                        loanTerm === term
                          ? 'bg-amber/15 border-amber/50 text-amber'
                          : 'bg-white/[0.03] border-white/[0.08] text-dim hover:border-amber/30'
                      }`}
                      whileTap={{ scale: 0.96 }}
                    >
                      {term}<span className="text-[10px] font-normal">mo</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Donut Chart */}
            <div className="flex flex-col items-center mt-8 pt-6 border-t border-white/[0.06]">
              <div className="relative w-40 h-40 mb-4">
                <svg viewBox="0 0 180 180" className="w-full h-full -rotate-90">
                  <circle cx="90" cy="90" r="65" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="18" />
                  <circle cx="90" cy="90" r="65" fill="none" stroke="rgba(232,168,73,0.15)" strokeWidth="18"
                    strokeDasharray={`${interestArc} ${circumference - interestArc}`} strokeDashoffset={-principalArc}
                    strokeLinecap="round" className="transition-all duration-700 ease-out" />
                  <circle cx="90" cy="90" r="65" fill="none" stroke="url(#finGradient)" strokeWidth="18"
                    strokeDasharray={`${principalArc} ${circumference - principalArc}`} strokeLinecap="round"
                    className="transition-all duration-700 ease-out" style={{ filter: 'drop-shadow(0 0 8px rgba(232,168,73,0.4))' }} />
                  <defs>
                    <linearGradient id="finGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f0be5e" /><stop offset="100%" stopColor="#d4943d" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-dim text-[9px] uppercase tracking-[0.15em] mb-0.5">Per Month</span>
                  <span className="text-amber text-2xl font-black font-heading tabular-nums">
                    <AnimatedNumber value={payment} />
                  </span>
                  <span className="text-dim text-[9px] mt-0.5">{loanTerm} months</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] mb-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#f0be5e] to-[#d4943d]" />
                  <span className="text-dim">Principal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber/15 border border-amber/30" />
                  <span className="text-dim">Interest</span>
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-3 w-full text-center">
                <div>
                  <p className="text-dim text-[9px] uppercase tracking-wider">Financed</p>
                  <p className="text-text text-sm font-bold font-heading tabular-nums"><AnimatedNumber value={Math.max(0, principal)} /></p>
                </div>
                <div className="border-x border-white/[0.06]">
                  <p className="text-dim text-[9px] uppercase tracking-wider">Interest</p>
                  <p className="text-amber/70 text-sm font-bold font-heading tabular-nums"><AnimatedNumber value={totalInterest} /></p>
                </div>
                <div>
                  <p className="text-dim text-[9px] uppercase tracking-wider">Total</p>
                  <p className="text-text text-sm font-bold font-heading tabular-nums"><AnimatedNumber value={totalCost} /></p>
                </div>
              </div>
            </div>
          </PremiumCard>

          {/* ─── Card 2: Value Your Trade ─── */}
          <PremiumCard delay={0.2}>
            <div className="mb-6">
              <span className="text-amber/70 text-[10px] uppercase tracking-[0.2em] font-semibold">Tool 2</span>
              <h3 className="text-xl sm:text-2xl font-bold text-text mt-1 font-body">
                Value Your <span className="font-heading italic text-amber">Trade</span>
              </h3>
            </div>

            <div className="space-y-5">
              <div>
                <label className={labelClass}>Year</label>
                <div className="relative">
                  <select className={selectClass} value={year} onChange={(e) => setYear(e.target.value)}>
                    <option value="" disabled>Select Year</option>
                    {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                  <ChevronDown />
                </div>
              </div>

              <div>
                <label className={labelClass}>Make</label>
                <div className="relative">
                  <select className={selectClass} value={make} onChange={(e) => setMake(e.target.value)}>
                    <option value="" disabled>Select Make</option>
                    {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <ChevronDown />
                </div>
              </div>

              <div>
                <label className={labelClass}>Model</label>
                <div className="relative">
                  <select className={`${selectClass} opacity-50`} disabled>
                    <option>{make ? `Select ${make} Model` : "Select Make First"}</option>
                  </select>
                  <ChevronDown />
                </div>
              </div>

              <div>
                <label className={labelClass}>Mileage</label>
                <input type="text" inputMode="numeric" placeholder="e.g. 45,000" className={inputClass}
                  value={mileage} onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setMileage(raw ? Number(raw).toLocaleString("en-US") : "");
                  }}
                />
              </div>
            </div>

            <button className="w-full mt-8 -skew-x-6 bg-gradient-to-r from-amber to-amber-light text-bg py-4 font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer rounded-lg shadow-[0_4px_20px_rgba(232,168,73,0.25)]">
              <span className="skew-x-6 inline-flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Get My Trade Value
              </span>
            </button>

            <p className="text-dim/50 text-[10px] text-center mt-4">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="inline-block mr-1 -mt-0.5">
                <rect x="1" y="9" width="3" height="6" fill="#e8a849" opacity="0.6" />
                <rect x="6" y="5" width="3" height="10" fill="#e8a849" opacity="0.8" />
                <rect x="11" y="2" width="3" height="13" fill="#e8a849" />
              </svg>
              Powered by real market data
            </p>
          </PremiumCard>

          {/* ─── Card 3: Buying Power ─── */}
          <PremiumCard delay={0.3}>
            <div className="mb-6">
              <span className="text-amber/70 text-[10px] uppercase tracking-[0.2em] font-semibold">Tool 3</span>
              <h3 className="text-xl sm:text-2xl font-bold text-text mt-1 font-body">
                Buying <span className="font-heading italic text-amber">Power</span>
              </h3>
            </div>

            {/* Monthly Budget */}
            <div className="mb-6">
              <label className={labelClass}>Monthly Budget</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber font-bold text-lg">$</span>
                <input type="text" inputMode="numeric"
                  className={`${inputClass} pl-10 text-2xl font-bold !py-4`}
                  value={monthlyBudget || ""}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setMonthlyBudget(raw ? Number(raw) : 0);
                  }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dim text-sm">/month</span>
              </div>
            </div>

            {/* Loan Term Buttons */}
            <div className="mb-8">
              <label className={labelClass}>Loan Term</label>
              <div className="grid grid-cols-4 gap-1.5">
                {TERM_STEPS.map((term) => (
                  <motion.button key={term} onClick={() => setBpTerm(term)}
                    className={`py-2 text-center text-xs font-bold rounded-lg cursor-pointer transition-all duration-300 border ${
                      bpTerm === term
                        ? 'bg-amber/15 border-amber/50 text-amber'
                        : 'bg-white/[0.03] border-white/[0.08] text-dim hover:border-amber/30'
                    }`}
                    whileTap={{ scale: 0.96 }}
                  >
                    {term}<span className="text-[10px] font-normal">mo</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Buying Power Result */}
            <div className="text-center py-8 border-t border-b border-white/[0.06] mb-6">
              <p className="text-dim text-xs mb-2">Your Estimated Buying Power</p>
              <AnimatePresence mode="wait">
                <motion.div key={Math.round(buyingPower)}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <span className="text-4xl sm:text-5xl font-black text-amber font-heading tabular-nums">
                    <AnimatedNumber value={Math.round(buyingPower)} />
                  </span>
                </motion.div>
              </AnimatePresence>
              <p className="text-dim/50 text-[10px] mt-2">
                Based on {(APR * 100).toFixed(1)}% APR · {bpTerm}-month term
              </p>
            </div>

            <button className="w-full -skew-x-6 bg-gradient-to-r from-amber to-amber-light text-bg py-4 font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer rounded-lg shadow-[0_4px_20px_rgba(232,168,73,0.25)]">
              <span className="skew-x-6 inline-flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                Shop In My Budget
              </span>
            </button>
          </PremiumCard>
        </div>

        {/* Bottom CTA + Disclaimer */}
        <motion.div className="text-center mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <button className="-skew-x-12 bg-gradient-to-r from-amber to-amber-light text-bg px-10 py-4 font-bold uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-[0_4px_25px_rgba(232,168,73,0.3)]">
              <span className="skew-x-12 inline-flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" /></svg>
                Get Pre-Approved
              </span>
            </button>
            <button className="-skew-x-12 border border-amber/40 text-amber px-10 py-4 font-bold uppercase tracking-wider hover:bg-amber/10 hover:border-amber/60 transition-all cursor-pointer bg-transparent">
              <span className="skew-x-12 inline-flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                Call for Quote
              </span>
            </button>
          </div>
          <p className="text-dim/40 text-[10px] max-w-xl mx-auto">
            * These tools provide estimates only and do not constitute a financing offer. Actual values and terms may vary. Subject to credit approval.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
