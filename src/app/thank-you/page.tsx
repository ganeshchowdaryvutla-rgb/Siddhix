"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto w-20 h-20 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-8"
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="heading-editorial text-4xl md:text-5xl text-[var(--text-primary)] mb-4"
        >
          Request Received
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-base text-[var(--text-secondary)] leading-relaxed font-light mb-10 max-w-md mx-auto"
        >
          Thank you for reaching out to SiddhiX. Our team will review your project details and get back to you within 24 hours.
        </motion.p>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/"
            className="inline-block px-8 py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium text-sm tracking-wide hover:bg-[var(--text-secondary)] transition-colors duration-500"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
