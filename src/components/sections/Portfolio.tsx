"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    title: "Spam Email Protection",
    category: "Cybersecurity Automation",
    description: "An advanced, machine learning-driven email security platform that detects and neutralizes sophisticated phishing and spam campaigns in real-time.",
    imageColor: "from-[#0A0A0A] to-[#141414]",
    tags: ["Machine Learning", "Threat Detection", "API Integration"],
  },
  {
    title: "Croptrace",
    category: "AgriTech Software",
    description: "A comprehensive supply chain traceability platform for the agriculture industry, ensuring transparency from farm to consumer.",
    imageColor: "from-[#111111] to-[#0A0A0A]",
    tags: ["Supply Chain", "Data Analytics", "Next.js"],
  },
  {
    title: "Lead Generation Tool Dealclose",
    category: "Sales Automation",
    description: "A high-performance lead generation and closing pipeline tool that automates outreach, tracks engagement, and optimizes conversion rates.",
    imageColor: "from-[#0D0D0D] to-[#1A1A1A]",
    tags: ["CRM System", "Workflow Automation", "React"],
  },
  {
    title: "Personal Portfolio",
    category: "Web Development",
    description: "A modern, highly optimized personal portfolio website featuring smooth scroll animations, 3D elements, and a premium editorial aesthetic.",
    imageColor: "from-[#111111] to-[#0A0A0A]",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8 border border-white/[0.04]">
        {/* Placeholder gradient mimicking a premium asset */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.imageColor} transition-transform duration-1000 ease-[0.16,1,0.3,1] ${
            isHovered ? "scale-105" : "scale-100"
          }`}
        />
        
        {/* Hover overlay with 'View Case Study' text */}
        <div
          className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="px-6 py-3 rounded-full border border-white/10 text-white text-sm font-medium tracking-wide translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-[0.16,1,0.3,1]">
            View Case Study
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex justify-between items-start">
        <div className="max-w-[75%]">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--text-tertiary)] mb-3 font-medium">
            {project.category}
          </p>
          <h3 className="heading-editorial-sm text-2xl lg:text-3xl text-[var(--text-primary)] mb-4 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--text-tertiary)] font-light leading-relaxed mb-6">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.04] text-[11px] text-[var(--text-secondary)] tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Arrow Icon */}
        <div
          className={`w-12 h-12 rounded-full border border-white/[0.05] flex items-center justify-center transition-all duration-500 ${
            isHovered
              ? "bg-[var(--text-primary)] border-[var(--text-primary)]"
              : "bg-transparent"
          }`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className={`transition-transform duration-500 ${
              isHovered ? "translate-x-1 -translate-y-1 text-[var(--bg-primary)]" : "text-[var(--text-tertiary)]"
            }`}
          >
            <path
              d="M1 13L13 1M13 1H4M13 1V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="portfolio"
      className="relative z-20 bg-[var(--bg-primary)] pt-24 md:pt-[10rem] pb-[8rem] md:pb-[14rem] overflow-hidden"
    >
      <div ref={ref} className="max-w-7xl mx-auto mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 sidebar-safe">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs tracking-[0.4em] uppercase text-[var(--text-tertiary)] mb-6 font-light"
          >
            Selected Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="heading-editorial text-5xl md:text-6xl lg:text-7xl text-[var(--text-primary)]"
          >
            Engineered For
            <br />
            <span className="text-[var(--text-secondary)]">Excellence</span>
          </motion.h2>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#"
            className="group inline-flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors tracking-wide"
          >
            View All Projects
            <span className="w-8 h-[1px] bg-[var(--text-tertiary)] group-hover:w-12 group-hover:bg-[var(--text-primary)] transition-all duration-500" />
          </a>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 sidebar-safe">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={index === 1 ? "md:mt-32" : ""}
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
