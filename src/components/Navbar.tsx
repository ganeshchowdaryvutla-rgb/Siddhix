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

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 60);

      if (currentScroll > lastScrollRef.current && currentScroll > 300) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollRef.current = currentScroll;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: hidden && !mobileOpen ? -100 : 0,
          opacity: hidden && !mobileOpen ? 0 : 1,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-5 flex justify-center pointer-events-auto">
          <div
            className={`flex items-center justify-between transition-all duration-500 ease-[0.16,1,0.3,1] ${
              scrolled
                ? "w-full md:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[var(--bg-primary)]/70 backdrop-blur-xl border border-[var(--border-subtle)] shadow-[var(--shadow-md)]"
                : "w-full py-3 sm:py-4 bg-transparent border border-transparent"
            }`}
          >
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-body-lg font-semibold tracking-[-0.02em] flex items-center mr-4 sm:mr-8"
            >
              <span className="text-[var(--text-primary)]">SIDDHI</span>
              <span className="text-[var(--accent)]">X</span>
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                    activeSection === link.href
                      ? "text-[var(--accent)] bg-[var(--accent-light)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="ml-2 px-4 py-1.5 rounded-full bg-[var(--text-primary)] text-white text-[13px] font-medium hover:bg-[var(--text-secondary)] transition-colors duration-300"
              >
                Get in Touch
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative z-[60] w-10 h-10 flex flex-col items-center justify-center gap-[5px] rounded-full hover:bg-[var(--bg-elevated)] transition-colors"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 6.5, width: 18 }
                    : { rotate: 0, y: 0, width: 18 }
                }
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="block h-[1.5px] bg-[var(--text-primary)] origin-center"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: 12 }}
                transition={{ duration: 0.25 }}
                className="block h-[1.5px] bg-[var(--text-secondary)] self-end"
              />
              <motion.span
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -6.5, width: 18 }
                    : { rotate: 0, y: 0, width: 18 }
                }
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="block h-[1.5px] bg-[var(--text-primary)] origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu — Full Screen Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] bg-[var(--bg-primary)]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-5 sm:gap-7 px-6"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{
                  delay: i * 0.07,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`text-h2 transition-colors ${
                  activeSection === link.href
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 button-primary text-sm"
            >
              Get in Touch
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
