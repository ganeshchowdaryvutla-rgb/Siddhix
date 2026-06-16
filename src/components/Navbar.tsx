"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollRef = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 60);

      // Auto-hide on scroll down, show on scroll up
      if (currentScroll > lastScrollRef.current && currentScroll > 300) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollRef.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Scrollspy Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    const sectionIds = navLinks.map((link) => link.href).concat(["#contact"]);
    sectionIds.forEach((id) => {
      const el = document.querySelector(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden && !mobileOpen ? -100 : 0,
          opacity: hidden && !mobileOpen ? 0 : 1,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="w-full max-w-7xl mx-auto px-6 pt-6 flex justify-center pointer-events-auto">
          <div
            className={`flex items-center justify-between transition-all duration-700 ease-[0.16,1,0.3,1] ${
              scrolled
                ? "w-full md:w-auto px-6 py-3 rounded-full bg-[#050505]/60 backdrop-blur-md border border-white/[0.05]"
                : "w-full py-4 bg-transparent border border-transparent"
            }`}
          >
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="heading-editorial-sm text-lg tracking-[-0.03em] flex items-center mr-8"
            >
              <span className="text-[var(--text-primary)]">SIDDHI</span>
              <span className="text-[var(--titanium)]">X</span>
            </a>

            {/* Desktop Links removed from here */}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-10 w-10 h-10 flex flex-col items-center justify-center gap-[6px] rounded-full hover:bg-white/[0.05] transition-colors"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 7.5, width: 20 }
                    : { rotate: 0, y: 0, width: 20 }
                }
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block h-[1px] bg-white origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: 14 }}
                transition={{ duration: 0.3 }}
                className="block h-[1px] bg-white/70 self-end"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -7.5, width: 20 }
                    : { rotate: 0, y: 0, width: 20 }
                }
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block h-[1px] bg-white origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Vertical Left Side Navigation (Desktop) */}
      <div className="hidden md:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col items-start gap-6 pointer-events-auto z-50">
        {navLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-400 ${
              activeSection === link.href
                ? "text-[var(--text-primary)] translate-x-2"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:translate-x-2"
            }`}
          >
            {link.label}
          </motion.a>
        ))}
        <motion.div 
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 24 }}
          transition={{ duration: 0.8, delay: 0.5 + navLinks.length * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-white/[0.15] my-2" 
        />
        <motion.a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 + navLinks.length * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-400 ${
            activeSection === "#contact"
              ? "text-[var(--titanium)] translate-x-2"
              : "text-[var(--text-primary)] hover:text-[var(--titanium)] hover:translate-x-2"
          }`}
        >
          Get in Touch
        </motion.a>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[var(--bg-primary)]/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="heading-editorial text-3xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 px-10 py-4 rounded-full bg-white/[0.03] border border-white/[0.15] text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--bg-primary)] text-sm tracking-wide transition-all duration-500"
              >
                Get in Touch
              </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
