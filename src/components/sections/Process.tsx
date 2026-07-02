"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery & Architecture",
    description: "Deep dive into your business operations. We identify automation opportunities and design the technical architecture for your scalable systems.",
  },
  {
    number: "02",
    title: "Development & AI Training",
    description: "Our engineers build the custom software while training AI agents on your specific business data and operational logic.",
  },
  {
    number: "03",
    title: "Integration & Testing",
    description: "Seamless deployment into your existing ecosystem. We conduct rigorous testing to ensure enterprise-grade security and reliability.",
  },
  {
    number: "04",
    title: "Scaling & Optimization",
    description: "Post-launch monitoring and continuous optimization. As your business grows, your AI systems evolve and scale with you.",
  },
];

function ProcessStep({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1.0, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-5 sm:p-8 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-400"
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--accent-light)] flex items-center justify-center">
          <span className="text-[13px] sm:text-[15px] font-bold text-[var(--accent)]">
            {step.number}
          </span>
        </div>
        <div>
          <h3 className="text-h3 text-[var(--text-primary)] mb-1.5 sm:mb-2">
            {step.title}
          </h3>
          <p className="text-body leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="process"
      className="relative z-20 bg-[var(--bg-primary)] py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 mb-10 sm:mb-14 md:mb-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-caption text-[var(--accent)] mb-3 sm:mb-4"
        >
          Our Methodology
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-h2 text-[var(--text-primary)]"
        >
          The blueprint for{" "}
          <span className="text-[var(--text-tertiary)]">digital growth</span>
        </motion.h2>
      </div>

      {/* Steps Grid */}
      <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {steps.map((step, index) => (
          <ProcessStep key={step.number} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}
