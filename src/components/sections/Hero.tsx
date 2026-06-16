"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "../MagneticButton";

export default function Hero() {
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const fadeStart = vh * 0.05;
      const fadeEnd = vh * 0.35;
      const newOpacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      setOpacity(Math.max(0, Math.min(1, newOpacity)));

      const zoomProgress = Math.min(scrollY / (vh * 0.5), 1);
      setScale(1 + zoomProgress * 0.04);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6"
      style={{
        opacity,
        visibility: opacity <= 0.01 ? "hidden" : "visible",
        transform: `scale(${scale})`,
        willChange: "opacity, transform",
      }}
    >
      <div className="text-center max-w-4xl sidebar-safe">
        {/* ——— SIDDHIX Small Premium Logo ——— */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] sm:text-xs tracking-[0.5em] uppercase text-[var(--text-tertiary)] mb-16 font-light"
        >
          SiddhiX
        </motion.p>

        {/* ——— Headline ——— */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="heading-editorial text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-[-0.05em] leading-[0.9] pb-16 mb-8 md:pb-24 md:mb-12"
        >
          Designing<br />
          Intelligent<br />
          S<span className="text-[0.85em] inline-block -translate-y-[0.05em]">y</span>stems.
        </motion.h1>

        {/* ——— Tagline ——— */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-[var(--text-secondary)] tracking-[0.02em] mb-16 font-light max-w-md mx-auto leading-relaxed"
        >
          For Businesses That Refuse To Stay Average.
        </motion.p>

        {/* ——— CTA Buttons ——— */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
        >
          <MagneticButton>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-white/[0.15] text-[var(--text-primary)] text-[13px] tracking-wide hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] transition-all duration-500"
            >
              Book Discovery Call
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300"
              >
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-transparent text-[var(--text-tertiary)] text-[13px] tracking-wide hover:text-[var(--text-primary)] transition-all duration-500"
            >
              View Portfolio
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* ——— Scroll Indicator ——— */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[9px] text-[var(--text-faint)] tracking-[0.5em] uppercase font-light">
          Scroll
        </span>
        <div className="w-[14px] h-[26px] rounded-full border border-white/[0.08] flex items-start justify-center p-[4px]">
          <motion.div
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-[2px] h-[2px] rounded-full bg-white opacity-50"
          />
        </div>
      </motion.div>
    </div>
  );
}
