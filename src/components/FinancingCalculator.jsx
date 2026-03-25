import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const APR = 0.069;
const MONTHLY_RATE = APR / 12;

const TERM_STEPS = [36, 48, 60, 72];

function formatCurrency(value) {
  return "$" + value.toLocaleString("en-US");
}

function calculatePayment(vehiclePrice, downPayment, termMonths) {
  const principal = vehiclePrice - downPayment;
  if (principal <= 0) return 0;
  const payment =
    (principal * MONTHLY_RATE) /
    (1 - Math.pow(1 + MONTHLY_RATE, -termMonths));
  return Math.round(payment);
}

function sliderBackground(value, min, max) {
  const pct = ((value - min) / (max - min)) * 100;
  return `linear-gradient(to right, #e8a849 0%, #e8a849 ${pct}%, #1a1a1a ${pct}%, #1a1a1a 100%)`;
}

function termToIndex(term) {
  return TERM_STEPS.indexOf(term);
}

export default function FinancingCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(25000);
  const [downPayment, setDownPayment] = useState(2000);
  const [loanTerm, setLoanTerm] = useState(60);

  const payment = useMemo(
    () => calculatePayment(vehiclePrice, downPayment, loanTerm),
    [vehiclePrice, downPayment, loanTerm]
  );

  const termIndex = termToIndex(loanTerm);

  return (
    <motion.section
      className="bg-bg py-24 px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <style>{`
        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          outline: none;
          cursor: pointer;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 20px;
          height: 20px;
          background: #e8a849;
          cursor: pointer;
          border-radius: 0;
        }
        input[type="range"]::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #e8a849;
          border: none;
          border-radius: 0;
          cursor: pointer;
        }
        input[type="range"]::-moz-range-track {
          height: 4px;
          border: none;
        }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-amber text-sm font-bold uppercase tracking-widest">
            Financing
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-text mt-3 font-body">
            What's Your{" "}
            <span className="italic text-amber font-heading">
              Monthly Payment
            </span>
            ?
          </h2>
        </div>

        {/* Calculator Card */}
        <div className="bg-card border border-border p-8 sm:p-10">
          {/* Vehicle Price Slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-text font-semibold">Vehicle Price</label>
              <span className="text-amber font-bold">
                {formatCurrency(vehiclePrice)}
              </span>
            </div>
            <input
              type="range"
              min={10000}
              max={60000}
              step={500}
              value={vehiclePrice}
              onChange={(e) => setVehiclePrice(Number(e.target.value))}
              style={{
                background: sliderBackground(vehiclePrice, 10000, 60000),
              }}
            />
          </div>

          {/* Down Payment Slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <label className="text-text font-semibold">Down Payment</label>
              <span className="text-amber font-bold">
                {formatCurrency(downPayment)}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={15000}
              step={250}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              style={{
                background: sliderBackground(downPayment, 0, 15000),
              }}
            />
          </div>

          {/* Loan Term Slider */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-3">
              <label className="text-text font-semibold">Loan Term</label>
              <span className="text-amber font-bold">{loanTerm} months</span>
            </div>
            <input
              type="range"
              min={0}
              max={3}
              step={1}
              value={termIndex}
              onChange={(e) => setLoanTerm(TERM_STEPS[Number(e.target.value)])}
              style={{
                background: sliderBackground(termIndex, 0, 3),
              }}
            />
          </div>

          {/* Monthly Payment Display */}
          <div className="text-center py-8 border-t border-border">
            <p className="text-text-dim text-sm mb-2">
              Estimated Monthly Payment
            </p>
            <motion.div
              key={payment}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <span className="text-5xl sm:text-6xl font-bold text-amber font-heading">
                {formatCurrency(payment)}
              </span>
            </motion.div>
          </div>

          {/* Disclaimer */}
          <p className="text-text-dim/50 text-xs text-center mt-4">
            * Estimated payment based on 6.9% APR. Actual rate depends on
            credit. Not a financing offer.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button className="skew-x-[-4deg] bg-amber text-black px-8 py-3 font-bold uppercase tracking-wider hover:bg-amber-light transition-colors">
            Get Pre-Approved
          </button>
          <button className="skew-x-[-4deg] border border-amber text-amber px-8 py-3 font-bold uppercase tracking-wider hover:bg-amber/10 transition-colors">
            Call for Quote
          </button>
        </div>
      </div>
    </motion.section>
  );
}
