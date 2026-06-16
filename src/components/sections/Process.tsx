"use client";

import { useRef, useEffect } from "react";
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
  progress,
}: {
  step: (typeof steps)[0];
  index: number;
  progress: any;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Calculate when this specific step should light up based on scroll
  const threshold = index / (steps.length - 1);
  const opacity = useTransform(
    progress,
    [Math.max(0, threshold - 0.2), threshold, Math.min(1, threshold + 0.2)],
    [0.3, 1, 0.3]
  );
  
  const scale = useTransform(
    progress,
    [Math.max(0, threshold - 0.2), threshold, Math.min(1, threshold + 0.2)],
    [0.95, 1, 0.95]
  );

  return (
    <div ref={ref} className="relative pl-12 md:pl-0 md:w-1/2 md:pr-16 md:even:ml-auto md:even:pl-16 md:even:pr-0 pb-24 md:pb-32 last:pb-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Number marker for mobile */}
        <div className="absolute -left-12 top-0 w-8 flex justify-center md:hidden">
          <div className="text-[10px] tracking-[0.2em] font-medium text-[var(--text-tertiary)] mt-2">
            {step.number}
          </div>
        </div>

        <h3 className="heading-editorial-sm text-2xl lg:text-3xl text-[var(--text-primary)] mb-4">
          <span className="hidden md:inline-block text-[var(--text-tertiary)] mr-4 text-xl opacity-70">
            {step.number}.
          </span>
          {step.title}
        </h3>
        <p className="text-[15px] text-[var(--text-tertiary)] font-light leading-relaxed">
          {step.description}
        </p>
      </motion.div>

      {/* Center timeline dot for desktop */}
      <motion.div
        suppressHydrationWarning
        style={{ 
          opacity: opacity as any, 
          scale: scale as any,
          right: index % 2 === 0 ? "-6px" : undefined,
          left: index % 2 !== 0 ? "-6px" : undefined
        }}
        className="hidden md:block absolute top-2 w-3 h-3 rounded-full bg-[var(--text-secondary)] z-10"
      />
    </div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="relative z-20 bg-[var(--bg-primary)] pt-[8rem] md:pt-[14rem] pb-24 md:pb-[10rem] overflow-hidden"
    >
      {/* Section Header */}
      <div ref={headerRef} className="max-w-7xl mx-auto mb-32 text-center sidebar-safe">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs tracking-[0.4em] uppercase text-[var(--text-tertiary)] mb-6 font-light"
        >
          Our Methodology
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="heading-editorial text-5xl md:text-6xl lg:text-7xl text-[var(--text-primary)]"
        >
          The Blueprint For
          <br />
          <span className="text-[var(--text-secondary)]">Digital Growth</span>
        </motion.h2>
      </div>

      {/* Timeline */}
      <div ref={containerRef} className="max-w-4xl mx-auto relative sidebar-safe">
        {/* Center Line Desktop */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/[0.04]">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[var(--text-secondary)]"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Left Line Mobile */}
        <div className="absolute top-0 bottom-0 left-4 w-[1px] bg-white/[0.04] md:hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[var(--text-secondary)]"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Steps */}
        <div className="relative z-10 px-6 md:px-0">
          {steps.map((step, index) => (
            <ProcessStep
              key={step.number}
              step={step}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
