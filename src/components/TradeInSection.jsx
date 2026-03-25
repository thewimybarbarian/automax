import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const APR = 0.069;
const MONTHLY_RATE = APR / 12;

const YEARS = Array.from({ length: 11 }, (_, i) => 2025 - i);

const MAKES = [
  "Acura",
  "BMW",
  "Chevrolet",
  "Dodge",
  "Ford",
  "GMC",
  "Honda",
  "Hyundai",
  "Jeep",
  "Kia",
  "Lexus",
  "Mazda",
  "Mercedes-Benz",
  "Nissan",
  "Ram",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
];

const TERM_STEPS = [36, 48, 60, 72];

function formatCurrency(value) {
  return "$" + Math.round(value).toLocaleString("en-US");
}

function calculateBuyingPower(monthly, termMonths) {
  if (monthly <= 0 || termMonths <= 0) return 0;
  return monthly * ((1 - Math.pow(1 + MONTHLY_RATE, -termMonths)) / MONTHLY_RATE);
}

function sliderBackground(value, min, max) {
  const pct = ((value - min) / (max - min)) * 100;
  return `linear-gradient(to right, #e8a849 0%, #e8a849 ${pct}%, #1a1a1a ${pct}%, #1a1a1a 100%)`;
}

const cardClass =
  "bg-white/[0.04] backdrop-blur-lg border border-white/[0.08] p-8 sm:p-10";

const selectClass =
  "w-full bg-card border border-white/[0.1] text-text px-4 py-3 font-body text-sm appearance-none cursor-pointer focus:outline-none focus:border-amber/60 transition-colors";

const inputClass =
  "w-full bg-card border border-white/[0.1] text-text px-4 py-3 font-body text-sm focus:outline-none focus:border-amber/60 transition-colors";

const labelClass = "text-text font-semibold text-sm mb-2 block font-body";

/* Small chart icon for the "powered by" line */
function ChartIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="inline-block mr-1.5 -mt-0.5"
    >
      <rect x="1" y="9" width="3" height="6" fill="#e8a849" opacity="0.6" />
      <rect x="6" y="5" width="3" height="10" fill="#e8a849" opacity="0.8" />
      <rect x="11" y="2" width="3" height="13" fill="#e8a849" />
    </svg>
  );
}

/* Dropdown chevron icon */
function ChevronDown() {
  return (
    <svg
      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-dim"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="#8a8680"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function TradeInSection() {
  /* Tool 1 state */
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [mileage, setMileage] = useState("");

  /* Tool 2 state */
  const [monthlyBudget, setMonthlyBudget] = useState(400);
  const [loanTerm, setLoanTerm] = useState(60);

  const buyingPower = useMemo(
    () => calculateBuyingPower(monthlyBudget, loanTerm),
    [monthlyBudget, loanTerm]
  );

  const termIndex = TERM_STEPS.indexOf(loanTerm);

  return (
    <motion.section
      id="trade-value"
      className="bg-bg py-24 px-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Slider thumb styles */}
      <style>{`
        .trade-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          outline: none;
          cursor: pointer;
        }
        .trade-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background: #e8a849;
          cursor: pointer;
          border-radius: 0;
        }
        .trade-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #e8a849;
          border: none;
          border-radius: 0;
          cursor: pointer;
        }
        .trade-slider::-moz-range-track {
          height: 4px;
          border: none;
        }
      `}</style>

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-amber/[0.02] blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 fade-up"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-amber text-sm uppercase tracking-widest font-body font-bold">
            Trade-In &amp; Budget Tools
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-text mt-4 mb-6 font-body">
            Know Your{" "}
            <span className="font-heading italic text-amber">Numbers</span>{" "}
            Before You Shop
          </h2>
          <p className="text-dim text-lg max-w-2xl mx-auto leading-relaxed font-body">
            Two powerful tools to put you in the driver's seat. Get an instant
            trade estimate or discover what you can afford.
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ─── Tool 1: Value Your Trade ─── */}
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Heading */}
            <div className="mb-8">
              <span className="text-amber text-xs uppercase tracking-widest font-bold font-body">
                Tool 1
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-text mt-2 font-body">
                Value Your{" "}
                <span className="font-heading italic text-amber">Trade</span>
              </h3>
            </div>

            {/* Year Dropdown */}
            <div className="mb-5">
              <label className={labelClass}>Year</label>
              <div className="relative">
                <select
                  className={selectClass}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  <option value="" disabled>
                    Select Year
                  </option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </div>

            {/* Make Dropdown */}
            <div className="mb-5">
              <label className={labelClass}>Make</label>
              <div className="relative">
                <select
                  className={selectClass}
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                >
                  <option value="" disabled>
                    Select Make
                  </option>
                  {MAKES.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown />
              </div>
            </div>

            {/* Model Dropdown (disabled) */}
            <div className="mb-5">
              <label className={labelClass}>Model</label>
              <div className="relative">
                <select className={`${selectClass} opacity-50`} disabled>
                  <option>
                    {make ? `Select ${make} Model` : "Select Make First"}
                  </option>
                </select>
                <ChevronDown />
              </div>
            </div>

            {/* Mileage Input */}
            <div className="mb-8">
              <label className={labelClass}>Mileage</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="e.g. 45,000"
                className={inputClass}
                value={mileage}
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^0-9]/g, "");
                  setMileage(raw ? Number(raw).toLocaleString("en-US") : "");
                }}
              />
            </div>

            {/* CTA Button */}
            <button className="w-full skew-x-[-4deg] bg-amber hover:bg-amber-light text-black px-8 py-4 font-bold uppercase tracking-wider transition-colors">
              <span className="skew-x-[4deg] block">Get My Trade Value</span>
            </button>

            {/* Powered by line */}
            <p className="text-dim/60 text-xs text-center mt-5 font-body">
              <ChartIcon />
              Powered by real market data
            </p>
          </motion.div>

          {/* ─── Tool 2: What's My Buying Power? ─── */}
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Heading */}
            <div className="mb-8">
              <span className="text-amber text-xs uppercase tracking-widest font-bold font-body">
                Tool 2
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-text mt-2 font-body">
                What's My{" "}
                <span className="font-heading italic text-amber">
                  Buying Power
                </span>
                ?
              </h3>
            </div>

            {/* Monthly Budget Input */}
            <div className="mb-8">
              <label className={labelClass}>Monthly Budget</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber font-bold text-lg">
                  $
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  className={`${inputClass} pl-10 text-2xl font-bold !py-4`}
                  value={monthlyBudget || ""}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setMonthlyBudget(raw ? Number(raw) : 0);
                  }}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-dim text-sm">
                  /month
                </span>
              </div>
            </div>

            {/* Loan Term Slider */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <label className={labelClass}>Loan Term</label>
                <span className="text-amber font-bold text-sm">
                  {loanTerm} months
                </span>
              </div>
              <input
                type="range"
                className="trade-slider"
                min={0}
                max={3}
                step={1}
                value={termIndex}
                onChange={(e) =>
                  setLoanTerm(TERM_STEPS[Number(e.target.value)])
                }
                style={{
                  background: sliderBackground(termIndex, 0, 3),
                }}
              />
              {/* Term labels */}
              <div className="flex justify-between mt-2">
                {TERM_STEPS.map((t) => (
                  <span
                    key={t}
                    className={`text-xs font-body ${
                      t === loanTerm ? "text-amber font-bold" : "text-dim"
                    }`}
                  >
                    {t}mo
                  </span>
                ))}
              </div>
            </div>

            {/* Buying Power Result */}
            <div className="text-center py-8 border-t border-white/[0.08] border-b border-b-white/[0.08] mb-8">
              <p className="text-dim text-sm mb-3 font-body">
                Your Estimated Buying Power
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={Math.round(buyingPower)}
                  initial={{ scale: 0.8, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  <span className="text-5xl sm:text-6xl font-bold text-amber font-heading">
                    {formatCurrency(buyingPower)}
                  </span>
                </motion.div>
              </AnimatePresence>
              <p className="text-dim/50 text-xs mt-3 font-body">
                Based on {APR * 100}% APR &middot; {loanTerm}-month term
              </p>
            </div>

            {/* CTA Button */}
            <button className="w-full skew-x-[-4deg] bg-amber hover:bg-amber-light text-black px-8 py-4 font-bold uppercase tracking-wider transition-colors">
              <span className="skew-x-[4deg] block">
                Shop Vehicles in My Budget
              </span>
            </button>
          </motion.div>
        </div>

        {/* Bottom disclaimer */}
        <p className="text-dim/40 text-xs text-center mt-8 max-w-xl mx-auto font-body">
          * These tools provide estimates only and do not constitute a financing
          offer. Actual trade-in values and loan terms may vary. Subject to
          credit approval.
        </p>
      </div>
    </motion.section>
  );
}
