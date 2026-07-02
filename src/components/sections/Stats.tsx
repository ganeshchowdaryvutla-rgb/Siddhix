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
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
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
    <div className="flex items-baseline justify-center">
      <span className="text-h1 text-[var(--text-primary)]">
        {count}
      </span>
      <span className="text-h1 text-[var(--accent)]">
        {suffix}
      </span>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-20 bg-[var(--bg-elevated)] py-16 sm:py-20 md:py-24 border-y border-[var(--border-subtle)] overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-5 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-3 sm:mb-4">
                <Counter
                  value={stat.value}
                  isInView={isInView}
                  delay={index * 0.1}
                />
              </div>
              <p className="text-caption text-[var(--text-secondary)]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
