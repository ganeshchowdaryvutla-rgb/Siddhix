"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "framer-motion";
import { PopupButton } from "react-calendly";
import MagneticButton from "../MagneticButton";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    applicationType: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/siddhixagency@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `New Project Inquiry from ${formState.name}`,
          name: formState.name,
          email: formState.email,
          applicationType: formState.applicationType || "General",
          budget: formState.budget,
          message: formState.message
        })
      });

      if (response.ok) {
        router.push("/thank-you");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative z-20 section-padding bg-[var(--bg-primary)] overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-8 sidebar-safe grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs tracking-[0.4em] uppercase text-[var(--text-tertiary)] mb-6 font-light"
          >
            Start A Project
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="heading-editorial text-4xl md:text-5xl lg:text-7xl text-[var(--text-primary)] mb-6 md:mb-8"
          >
            Ready To
            <br />
            <span className="text-[var(--text-secondary)]">Automate?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-base text-[var(--text-secondary)] leading-relaxed max-w-md font-light mb-12"
          >
            Partner with SiddhiX to build enterprise-grade AI systems and custom software that drive scalable growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            <div className="flex flex-col">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-2 font-medium">Email</span>
              <a href="mailto:siddhixagency@gmail.com" className="text-xl text-[var(--text-primary)] hover:text-[var(--text-secondary)] transition-colors">
                siddhixagency@gmail.com
              </a>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-2 font-medium">Location</span>
              <span className="text-xl text-[var(--text-primary)]">
                Global Remote
              </span>
            </div>
          </motion.div>
        </div>

          {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <form
            className="relative p-6 md:p-12 rounded-[24px] md:rounded-[32px] bg-white/[0.01] border border-white/[0.03] flex flex-col gap-6 md:gap-8 backdrop-blur-sm"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full bg-transparent border-b border-white/[0.08] pb-3 text-[var(--text-primary)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[var(--text-primary)] transition-colors rounded-none"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full bg-transparent border-b border-white/[0.08] pb-3 text-[var(--text-primary)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[var(--text-primary)] transition-colors rounded-none"
                placeholder="john@company.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="applicationType" className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium">
                  Application Type
                </label>
                <select
                  id="applicationType"
                  value={formState.applicationType}
                  onChange={(e) => setFormState({ ...formState, applicationType: e.target.value })}
                  className="w-full bg-transparent border-b border-white/[0.08] pb-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors rounded-none cursor-pointer"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                >
                  <option value="" disabled className="text-black">Select type...</option>
                  <option value="AI Automation" className="text-black">AI Automation</option>
                  <option value="Web Platform" className="text-black">Web Platform</option>
                  <option value="Mobile App" className="text-black">Mobile App</option>
                  <option value="Enterprise Software" className="text-black">Enterprise Software</option>
                  <option value="Other" className="text-black">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="budget" className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium">
                  Budget
                </label>
                <select
                  id="budget"
                  value={formState.budget}
                  onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                  className="w-full bg-transparent border-b border-white/[0.08] pb-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--text-primary)] transition-colors rounded-none cursor-pointer"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                >
                  <option value="" disabled className="text-black">Select budget...</option>
                  <option value="< $10k" className="text-black">&lt; $10k</option>
                  <option value="$10k - $25k" className="text-black">$10k - $25k</option>
                  <option value="$25k - $50k" className="text-black">$25k - $50k</option>
                  <option value="$50k+" className="text-black">$50k+</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <label htmlFor="message" className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium">
                Project Details
              </label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-transparent border-b border-white/[0.08] pb-3 text-[var(--text-primary)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[var(--text-primary)] transition-colors resize-none min-h-[100px] rounded-none"
                placeholder="Tell us about your goals..."
              />
            </div>

            <MagneticButton>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] font-medium text-sm tracking-wide transition-colors duration-500 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-[var(--text-secondary)]"}`}
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </button>
            </MagneticButton>

            {mounted && (
              <>
                <div className="flex items-center justify-center pt-2 pb-2">
                  <div className="w-full h-px bg-white/[0.08]" />
                  <span className="px-4 text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] font-medium">OR</span>
                  <div className="w-full h-px bg-white/[0.08]" />
                </div>
                
                <PopupButton
                  url="https://calendly.com/ganeshchowdaryvutla/30min"
                  rootElement={document.body}
                  text="Book a Discovery Call"
                  className="w-full py-4 rounded-full border border-white/[0.1] text-[var(--text-primary)] font-medium text-sm tracking-wide hover:bg-white/[0.05] transition-colors duration-500"
                />
              </>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
