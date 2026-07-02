"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    title: "Sri Annapurna Health Foods",
    category: "E-Commerce Web Application",
    description: "Our very first website: a premium, responsive e-commerce web application engineered for a modern health food brand.",
    image: "/projects/annapurna.png",
    tags: ["E-Commerce", "React", "Tailwind CSS"],
    link: "https://sri-annapurna-health-foods.web.app",
  },
  {
    title: "Spam Email Protection",
    category: "Cybersecurity Automation",
    description: "An advanced, machine learning-driven email security platform that detects and neutralizes sophisticated phishing and spam campaigns in real-time.",
    image: "/projects/cybersecurity.png",
    tags: ["Machine Learning", "Threat Detection", "API Integration"],
  },
  {
    title: "Croptrace",
    category: "AgriTech Software",
    description: "A comprehensive supply chain traceability platform for the agriculture industry, ensuring transparency from farm to consumer.",
    image: "/projects/agritech.png",
    tags: ["Supply Chain", "Data Analytics", "Next.js"],
  },
  {
    title: "Lead Generation Tool Dealclose",
    category: "Sales Automation",
    description: "A high-performance lead generation and closing pipeline tool that automates outreach, tracks engagement, and optimizes conversion rates.",
    image: "/projects/sales.png",
    tags: ["CRM System", "Workflow Automation", "React"],
  },
  {
    title: "Personal Portfolio",
    category: "Web Development",
    description: "A modern, highly optimized personal portfolio website featuring smooth scroll animations, 3D elements, and a premium editorial aesthetic.",
    image: "/projects/portfolio.png",
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

  const CardContent = (
    <div
      className="group relative cursor-pointer h-full flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 border border-[var(--border-subtle)] shadow-[var(--shadow-sm)] group-hover:shadow-[var(--shadow-lg)] transition-shadow duration-500">
          <div className={`absolute inset-0 transition-transform duration-700 ease-[0.16,1,0.3,1] ${isHovered ? "scale-105" : "scale-100"}`}>
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {/* Hover overlay */}
          <div
            className={`absolute inset-0 bg-[var(--bg-primary)]/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-400 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-[var(--bg-elevated)] text-[var(--text-primary)] text-[10px] sm:text-sm font-medium tracking-wide translate-y-3 group-hover:translate-y-0 transition-transform duration-400 ease-[0.16,1,0.3,1] shadow-[var(--shadow-md)]">
              {project.link ? "Visit Website" : "View Case Study"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-caption text-[var(--accent)] mb-1.5 sm:mb-2">
            {project.category}
          </p>
          <h3 className="text-h3 text-[var(--text-primary)] mb-2 sm:mb-3">
            {project.title}
          </h3>
          <p className="text-body mb-3 sm:mb-5 line-clamp-3 md:line-clamp-none">
            {project.description}
          </p>
        </div>
      </div>
      
      <div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[9px] sm:text-[11px] text-[var(--text-secondary)] font-medium tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const transitionProps = {
    initial: { opacity: 0, y: 60, scale: 0.96 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: {
      duration: 1.2,
      delay: index * 0.08,
      ease: [0.16, 1, 0.3, 1] as const,
    }
  };

  return (
    <motion.a
      href={project.link || "#"}
      target={project.link ? "_blank" : "_self"}
      rel={project.link ? "noopener noreferrer" : ""}
      className="block h-full"
      onClick={(e) => {
        if (!project.link) {
          e.preventDefault();
          // Placeholder for future case study modal or page
          console.log("Case study coming soon!");
        }
      }}
      {...transitionProps}
    >
      {CardContent}
    </motion.a>
  );
}

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="portfolio"
      className="relative z-20 bg-[var(--bg-primary)] pt-16 sm:pt-24 md:pt-32 pb-16 sm:pb-24 md:pb-32 overflow-hidden"
    >
      <div ref={ref} className="max-w-5xl mx-auto mb-10 sm:mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 px-5 sm:px-6 xl:px-0">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-caption text-[var(--accent)] mb-3 sm:mb-4"
          >
            Selected Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-h2 text-[var(--text-primary)]"
          >
            Engineered for{" "}
            <span className="text-[var(--text-tertiary)]">excellence</span>
          </motion.h2>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group inline-flex items-center gap-3 text-[13px] sm:text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors font-medium"
          >
            View All Projects
            <span className="w-6 sm:w-8 h-[1.5px] bg-[var(--text-faint)] group-hover:w-10 sm:group-hover:w-12 group-hover:bg-[var(--accent)] transition-all duration-400" />
          </a>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-10 sm:gap-y-14 px-5 sm:px-6 xl:px-0">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={index === 1 ? "sm:mt-16 md:mt-24" : ""}
          >
            <ProjectCard project={project} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
