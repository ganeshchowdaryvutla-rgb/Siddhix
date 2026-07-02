"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote: "SiddhiX transformed our operations. The custom AI agents they deployed reduced our customer support response times from hours to minutes, while cutting costs by 60%.",
    author: "Sarah Jenkins",
    role: "COO, Nexus Global",
  },
  {
    quote: "Working with them feels like having an elite Silicon Valley engineering team in-house. The enterprise platform they built is flawless, scalable, and beautifully designed.",
    author: "Marcus Chen",
    role: "Founder, Elevate Tech",
  },
  {
    quote: "The automation workflows implemented by SiddhiX allowed us to scale our revenue by 3x without hiring additional operational staff. Pure magic.",
    author: "David Ross",
    role: "Director of Operations, Aura",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="relative z-20 bg-[var(--bg-surface)] py-16 sm:py-24 md:py-32 overflow-hidden">

      <div ref={ref} className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8 mb-10 sm:mb-14 md:mb-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-caption text-[var(--accent)] mb-3 sm:mb-4"
        >
          Client Success
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-h2 text-[var(--text-primary)]"
        >
          Trusted by industry{" "}
          <span className="text-[var(--text-tertiary)]">leaders</span>
        </motion.h2>
      </div>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                duration: 1.0,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative p-6 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-1 transition-all duration-400 flex flex-col justify-between h-full"
            >
              <div>
                {/* Quote Icon */}
                <div className="mb-4 sm:mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[var(--accent)] opacity-40">
                    <path d="M10 11H6C6 7.686 8.686 5 12 5V3C7.582 3 4 6.582 4 11V19H10V11ZM20 11H16C16 7.686 18.686 5 22 5V3C17.582 3 14 6.582 14 11V19H20V11Z" fill="currentColor"/>
                  </svg>
                </div>

                <p className="text-body mb-6 sm:mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)]">
                <p className="text-h3 text-[var(--text-primary)] mb-0.5">
                  {item.author}
                </p>
                <p className="text-caption text-[var(--text-tertiary)]">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
