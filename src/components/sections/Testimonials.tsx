"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote: "SiddhiX transformed our operations. The custom AI agents they deployed reduced our customer support response times from hours to minutes, while cutting costs by 60%.",
    author: "Sarah Jenkins",
    role: "COO, Nexus Global",
    delay: 0.1,
  },
  {
    quote: "Working with them feels like having an elite Silicon Valley engineering team in-house. The enterprise platform they built is flawless, scalable, and beautifully designed.",
    author: "Marcus Chen",
    role: "Founder, Elevate Tech",
    delay: 0.2,
  },
  {
    quote: "The automation workflows implemented by SiddhiX allowed us to scale our revenue by 3x without hiring additional operational staff. Pure magic.",
    author: "David Ross",
    role: "Director of Operations, Aura",
    delay: 0.3,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-20 section-padding bg-[var(--bg-surface)] overflow-hidden">

      <div ref={ref} className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs tracking-[0.4em] uppercase text-[var(--text-tertiary)] mb-6 font-light"
        >
          Client Success
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="heading-editorial text-5xl md:text-6xl lg:text-7xl text-[var(--text-primary)]"
        >
          Trusted By Industry
          <br />
          <span className="text-[var(--text-secondary)]">Leaders</span>
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto sidebar-safe">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: item.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative p-10 rounded-[32px] bg-white/[0.01] border border-white/[0.03] hover:border-white/[0.15] transition-all duration-700 group hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <div className="mb-8 opacity-20 group-hover:opacity-60 transition-opacity duration-500">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[var(--text-tertiary)]">
                  <path d="M12.923 11.231C12.923 8.355 15.228 6 18.154 6h1.846v4.923h-1.846c-1.325 0-2.462 1.138-2.462 2.462v2.461H20.615v10.462H10.462v-11.077c0-2.876 2.304-5.18 5.23-5.18h.616l-3.385-1.846zM28.923 11.231C28.923 8.355 31.228 6 34.154 6h1.846v4.923h-1.846c-1.325 0-2.462 1.138-2.462 2.462v2.461H36.615v10.462H26.462v-11.077c0-2.876 2.304-5.18 5.23-5.18h.616l-3.385-1.846z" fill="currentColor" transform="translate(-10 -6)"/>
                </svg>
              </div>

              <p className="text-base text-[var(--text-secondary)] leading-relaxed mb-10 font-light group-hover:text-[var(--text-primary)] transition-colors duration-500">
                "{item.quote}"
              </p>

              <div>
                <p className="heading-editorial-sm text-lg text-[var(--text-primary)] mb-1">
                  {item.author}
                </p>
                <p className="text-[11px] tracking-[0.1em] uppercase text-[var(--text-tertiary)] font-medium">
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
