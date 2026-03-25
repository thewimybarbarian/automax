import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function MobileCTABar() {
  const [visible, setVisible] = useState(false);
  const [hasEntrance, setHasEntrance] = useState(false);
  const lastScrollY = useRef(0);
  const scrollAccumulator = useRef(0);

  useEffect(() => {
    const entranceTimer = setTimeout(() => {
      setHasEntrance(true);
    }, 2000);

    return () => clearTimeout(entranceTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasEntrance) return;

      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      // Near top of page — hide so we don't cover the hero
      if (currentY < 200) {
        setVisible(false);
        lastScrollY.current = currentY;
        scrollAccumulator.current = 0;
        return;
      }

      // Near the footer — hide so we don't overlap it
      const footerThreshold =
        document.documentElement.scrollHeight - window.innerHeight - 150;
      if (currentY >= footerThreshold) {
        setVisible(false);
        lastScrollY.current = currentY;
        scrollAccumulator.current = 0;
        return;
      }

      // Debounce: accumulate scroll in one direction, flip only after 5px
      if (Math.sign(delta) === Math.sign(scrollAccumulator.current)) {
        scrollAccumulator.current += delta;
      } else {
        scrollAccumulator.current = delta;
      }

      if (scrollAccumulator.current > 5) {
        // Scrolling down — hide
        setVisible(false);
        scrollAccumulator.current = 0;
      } else if (scrollAccumulator.current < -5) {
        // Scrolling up — show
        setVisible(true);
        scrollAccumulator.current = 0;
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasEntrance]);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-bg/95 backdrop-blur-lg border-t border-border pb-[env(safe-area-inset-bottom)]"
      initial={{ y: 100 }}
      animate={{ y: hasEntrance && visible ? 0 : 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="px-4 py-3 flex gap-3">
        {/* Call Now Button */}
        <a
          href="tel:4056064000"
          className="flex-1 bg-amber text-bg font-bold text-sm uppercase tracking-wider py-3 text-center skew-x-[-4deg] block"
        >
          <span className="skew-x-[4deg] inline-flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                clipRule="evenodd"
              />
            </svg>
            Call Now
          </span>
        </a>

        {/* Get Pre-Approved Button */}
        <a
          href="#financing"
          className="flex-1 border-2 border-amber text-amber font-bold text-sm uppercase tracking-wider py-3 text-center skew-x-[-4deg] block"
        >
          <span className="skew-x-[4deg] inline-flex items-center justify-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z"
                clipRule="evenodd"
              />
              <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
            </svg>
            Pre-Approved
          </span>
        </a>
      </div>
    </motion.div>
  );
}
