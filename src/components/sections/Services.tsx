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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${x}%`);
    cardRef.current.style.setProperty("--mouse-y", `${y}%`);
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      className="service-card group cursor-default"
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-8 group-hover:border-white/[0.15] group-hover:bg-white/[0.05] transition-all duration-500">
        <Icon className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-500" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="heading-editorial-sm text-xl text-[var(--text-primary)] mb-4">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-[15px] text-[var(--text-tertiary)] leading-relaxed font-light">
        {service.description}
      </p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      className="relative z-20 bg-[var(--bg-primary)] py-24 sm:py-32 md:py-40 overflow-hidden"
    >
      {/* Section Header */}
      <div ref={ref} className="max-w-7xl mx-auto px-6 md:px-8 mb-16 md:mb-24 sidebar-safe">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs tracking-[0.4em] uppercase text-[var(--text-tertiary)] mb-6 font-light"
        >
          Our Capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="heading-editorial text-4xl md:text-5xl lg:text-7xl text-[var(--text-primary)] max-w-3xl"
        >
          Engineering The
          <br />
          <span className="text-[var(--text-secondary)]">Future Of Work</span>
        </motion.h2>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 sidebar-safe">
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
