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

  const inputClasses = "w-full bg-transparent border-b border-[var(--border-strong)] pb-3 text-[var(--text-primary)] placeholder-[var(--text-faint)] focus:outline-none focus:border-[var(--accent)] transition-colors rounded-none text-body";
  const labelClasses = "text-caption text-[var(--text-secondary)]";
  const selectClasses = "w-full bg-transparent border-b border-[var(--border-strong)] pb-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors rounded-none cursor-pointer text-body";

  return (
    <section id="contact" className="relative z-20 bg-[var(--bg-primary)] py-16 sm:py-24 md:py-32 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
        {/* Left: Copy */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-caption text-[var(--accent)] mb-3 sm:mb-4"
          >
            Start A Project
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-h2 text-[var(--text-primary)] mb-4 sm:mb-6"
          >
            Ready to{" "}
            <span className="text-[var(--text-tertiary)]">automate?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-body-lg max-w-md mb-8 sm:mb-10"
          >
            Partner with SiddhiX to build enterprise-grade AI systems and custom software that drive scalable growth.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <div className="flex flex-col">
              <span className={labelClasses + " mb-1.5"}>Email</span>
              <a href="mailto:siddhixagency@gmail.com" className="text-h3 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors break-all sm:break-normal">
                siddhixagency@gmail.com
              </a>
            </div>
            <div className="flex flex-col">
              <span className={labelClasses + " mb-1.5"}>Location</span>
              <span className="text-h3 text-[var(--text-primary)]">
                Global Remote
              </span>
            </div>
          </motion.div>
        </div>

          {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <form
            className="relative p-6 sm:p-8 md:p-10 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-[var(--shadow-lg)] flex flex-col gap-5 sm:gap-6"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-5 sm:gap-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className={labelClasses}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className={inputClasses}
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className={labelClasses}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className={inputClasses}
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:gap-6">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="applicationType" className={labelClasses}>
                  Application Type
                </label>
                <select
                  id="applicationType"
                  value={formState.applicationType}
                  onChange={(e) => setFormState({ ...formState, applicationType: e.target.value })}
                  className={selectClasses}
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                >
                  <option value="" disabled>Select type...</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="Web Platform">Web Platform</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Enterprise Software">Enterprise Software</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="budget" className={labelClasses}>
                  Budget
                </label>
                <select
                  id="budget"
                  value={formState.budget}
                  onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                  className={selectClasses}
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none' }}
                >
                  <option value="" disabled>Select budget...</option>
                  <option value="< $10k">&lt; $10k</option>
                  <option value="$10k - $25k">$10k - $25k</option>
                  <option value="$25k - $50k">$25k - $50k</option>
                  <option value="$50k+">$50k+</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className={labelClasses}>
                Project Details
              </label>
              <textarea
                id="message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className={inputClasses + " resize-none min-h-[80px] sm:min-h-[100px]"}
                placeholder="Tell us about your goals..."
              />
            </div>

            <MagneticButton>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full button-primary text-sm ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? "Sending..." : "Send Request"}
              </button>
            </MagneticButton>

            {mounted && (
              <>
                <div className="flex items-center justify-center py-1">
                  <div className="w-full h-px bg-[var(--border-subtle)]" />
                  <span className="px-4 text-caption text-[var(--text-tertiary)] whitespace-nowrap">OR</span>
                  <div className="w-full h-px bg-[var(--border-subtle)]" />
                </div>
                
                <PopupButton
                  url="https://calendly.com/ganeshchowdaryvutla/30min"
                  rootElement={document.body}
                  text="Book a Discovery Call"
                  className="w-full button-secondary text-sm"
                />
              </>
            )}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
