"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-[var(--bg-primary)] border-t border-white/[0.04] pt-16 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto sidebar-safe relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="heading-editorial text-3xl md:text-4xl tracking-[-0.03em] flex items-center mb-6"
            >
              <span className="text-[var(--text-primary)]">SIDDHI</span>
              <span className="text-[var(--titanium)]">X</span>
            </a>
            <p className="text-[15px] text-[var(--text-tertiary)] max-w-sm leading-relaxed font-light mb-8">
              Premium AI automation and full-stack development agency building enterprise-grade intelligent systems.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-6 font-medium">
              Navigation
            </h4>
            <ul className="space-y-4">
              {["Services", "Portfolio", "Process", "About"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors tracking-wide"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-secondary)] mb-6 font-medium">
              Connect
            </h4>
            <ul className="space-y-4">
              {["LinkedIn", "Twitter", "Instagram", "GitHub"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors tracking-wide flex items-center gap-2 group"
                  >
                    {item}
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/[0.04]">
          <p className="text-[11px] text-[var(--text-faint)] tracking-[0.1em] uppercase mb-4 md:mb-0 font-medium">
            © {new Date().getFullYear()} SiddhiX Agency. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[11px] text-[var(--text-faint)] hover:text-[var(--text-secondary)] tracking-[0.1em] uppercase transition-colors font-medium">
              Privacy Policy
            </a>
            <a href="#" className="text-[11px] text-[var(--text-faint)] hover:text-[var(--text-secondary)] tracking-[0.1em] uppercase transition-colors font-medium">
              Terms of Service
            </a>
          </div>
        </div>
      </div>

      {/* Massive subtle background typography */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-full overflow-hidden pointer-events-none flex justify-center opacity-[0.015]">
        <span className="heading-editorial text-[25vw] leading-none whitespace-nowrap tracking-tighter">
          SIDDHIX
        </span>
      </div>
    </footer>
  );
}
