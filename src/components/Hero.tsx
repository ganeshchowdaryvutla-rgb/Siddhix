"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden bg-transparent pointer-events-none"
    >
      {/* Background ambient gradients */}
      <motion.div 
        style={{ y, opacity }} 
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        {/* Deep, subtle ambient glow - drastically reduced from previous 'smoke' effect */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[var(--accent)]/10 rounded-full blur-[120px]" />
        
        {/* Secondary cool accent */}
        <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] max-w-[400px] max-h-[400px] bg-[var(--accent)]/5 rounded-full blur-[100px]" />
        
        {/* Subtle grid texture */}
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
        />
      </motion.div>

      {/* Hero Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center px-5 sm:px-6 w-full max-w-[300px] xs:max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto text-center pt-24 pb-16 sm:pt-32 sm:pb-24"
      >
        {/* Subtle dark text protector gradient behind the content */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--bg-primary)_0%,transparent_60%)] opacity-90 pointer-events-none -z-10" />
        {/* Pre-headline Badge */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/60 backdrop-blur-md shadow-[var(--shadow-sm)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="text-caption text-[var(--text-secondary)]">
              SiddhiX Studio
            </span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 
          variants={itemVariants}
          className="text-display w-full text-[var(--text-primary)] font-semibold tracking-tight"
        >
          Designing<br />
          Intelligent<br />
          <span className="text-[var(--text-tertiary)] font-medium">Systems.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          variants={itemVariants}
          className="text-body-lg mt-6 sm:mt-8 mb-8 sm:mb-10 max-w-xs sm:max-w-sm md:max-w-md mx-auto"
        >
          AI automation and enterprise software for businesses that refuse to stay average.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-row items-center justify-center gap-3 sm:gap-4 w-full pointer-events-auto"
        >
          <MagneticButton>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="button-primary text-[12px] sm:text-[14px]"
            >
              Book Discovery Call
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
              className="button-secondary text-[12px] sm:text-[14px]"
            >
              View Portfolio
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-caption text-[var(--text-tertiary)] tracking-[0.3em] font-medium">
          Scroll
        </span>
        <div className="w-[14px] h-[24px] rounded-full border border-[var(--text-tertiary)] flex items-start justify-center p-[4px]">
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-[2px] h-[2px] rounded-full bg-[var(--text-secondary)]" 
          />
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-transparent to-transparent pointer-events-none" />
    </section>
  );
}
