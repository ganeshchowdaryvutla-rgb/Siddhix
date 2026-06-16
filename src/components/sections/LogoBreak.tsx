"use client";

import { motion } from "framer-motion";

export default function LogoBreak() {
  return (
    <section className="relative z-20 bg-[var(--bg-primary)] py-16 md:py-24 flex justify-center items-center overflow-hidden">
      <div className="relative perspective-[1000px]">
        {/* Subtle glow behind the logo */}
        <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[100px] rounded-full pointer-events-none" />
        
        <motion.img
          src="/Siddhixlogo.jpeg"
          alt="SiddhiX Logo"
          className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-contain mix-blend-screen relative z-10"
          animate={{ 
            y: [-15, 15, -15],
            rotateX: [12, -12, 12],
            rotateY: [-12, 12, -12]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </section>
  );
}
