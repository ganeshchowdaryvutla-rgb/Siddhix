"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Bot,
  Workflow,
  Brain,
  Code2,
  Layers,
  BarChart3,
} from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "AI Automation",
    description:
      "Intelligent systems that automate complex business processes, reducing manual effort by up to 80% while improving accuracy.",
  },
  {
    icon: Workflow,
    title: "Workflow Orchestration",
    description:
      "End-to-end workflow architecture that connects your tools, eliminates bottlenecks, and creates seamless operational pipelines.",
  },
  {
    icon: Brain,
    title: "Autonomous Agents",
    description:
      "Custom AI agents that learn, adapt, and execute tasks autonomously — from customer support to data analysis.",
  },
  {
    icon: Code2,
    title: "Enterprise Development",
    description:
      "Pixel-perfect frontends and robust backends built with modern frameworks. Scalable, secure, and performant.",
  },
  {
    icon: Layers,
    title: "Custom Software",
    description:
      "Bespoke software solutions engineered to your exact specifications. From minimal MVPs to enterprise-grade platforms.",
  },
  {
    icon: BarChart3,
    title: "Business Systems",
    description:
      "Integrated systems that unify your operations — CRM, ERP, analytics, and automation in one cohesive ecosystem.",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 1.0,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="service-card group cursor-default flex flex-col justify-between h-full"
    >
      <div>
        {/* Icon */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-[var(--accent-light)] group-hover:border-[var(--accent)]/20 transition-all duration-400">
          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors duration-400" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="text-h3 text-[var(--text-primary)] mb-2 sm:mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-body leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="relative z-20 bg-[var(--bg-primary)] py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Section Header */}
      <div ref={ref} className="max-w-6xl mx-auto px-5 sm:px-6 md:px-8 mb-10 sm:mb-14 md:mb-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-caption text-[var(--accent)] mb-3 sm:mb-4"
        >
          Our Capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-h2 text-[var(--text-primary)] max-w-2xl"
        >
          Engineering the{" "}
          <span className="text-[var(--text-tertiary)]">future of work</span>
        </motion.h2>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
