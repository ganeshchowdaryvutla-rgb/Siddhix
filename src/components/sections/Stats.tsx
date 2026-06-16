"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "40+", label: "Enterprise Projects" },
  { value: "85%", label: "Process Automation" },
  { value: "12x", label: "ROI Average" },
  { value: "24/7", label: "System Uptime" },
];

function Counter({
  value,
  isInView,
  delay = 0,
}: {
  value: string;
  isInView: boolean;
  delay?: number;
}) {
  const [count, setCount] = useState("0");
  let numValue = parseInt(value.replace(/[^0-9]/g, ""));
  let suffix = value.replace(/[0-9]/g, "");

  if (value === "24/7") {
    numValue = 24;
    suffix = "/7";
  }

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const duration = 2000; // 2 seconds

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        // Ease out expo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.floor(numValue * easeProgress).toString());
        requestAnimationFrame(animate);
      } else {
        setCount(numValue.toString());
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, numValue, delay]);

  return (
    <div className="flex items-baseline">
      <span className="heading-editorial text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] text-[var(--text-primary)]">
        {count}
      </span>
      <span className="heading-editorial text-4xl md:text-5xl lg:text-6xl tracking-[-0.03em] text-[var(--text-secondary)]">
        {suffix}
      </span>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-20 bg-[var(--bg-elevated)] py-[8rem] md:py-[12rem] border-y border-white/[0.02] overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto sidebar-safe relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 divide-x divide-white/[0.04] md:divide-x-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`flex flex-col items-center text-center ${
                index % 2 !== 0 ? "pl-8 md:pl-0" : "pr-8 md:pr-0"
              }`}
            >
              <div className="mb-4">
                <Counter
                  value={stat.value}
                  isInView={isInView}
                  delay={index * 0.1}
                />
              </div>
              <p className="text-[11px] md:text-xs tracking-[0.3em] uppercase text-[var(--text-secondary)] font-light">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
