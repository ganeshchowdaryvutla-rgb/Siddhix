"use client";

import { motion } from "framer-motion";

export default function LogoBreak() {
  return (
    <section className="relative z-20 bg-[var(--bg-surface)] py-12 sm:py-16 md:py-20 flex justify-center items-center overflow-hidden">
      <div className="relative">
        {/* Subtle warm glow behind the logo */}
        <div className="absolute inset-0 bg-amber-200/20 blur-[60px] sm:blur-[80px] rounded-full pointer-events-none scale-150" />
        
        <motion.img
          src="/Siddhixlogo.jpeg"
          alt="SiddhiX Logo"
          className="w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 object-contain rounded-2xl shadow-[var(--shadow-lg)] relative z-10"
          animate={{ 
            y: [-8, 8, -8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
}
