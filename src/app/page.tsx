"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollCanvasSequence from "@/components/ScrollCanvasSequence";
import Services from "@/components/sections/Services";
import LogoBreak from "@/components/sections/LogoBreak";
import Portfolio from "@/components/sections/Portfolio";
import Stats from "@/components/sections/Stats";
import Process from "@/components/sections/Process";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[var(--bg-primary)] overflow-clip text-[var(--text-primary)]">
        {/* ——— Navigation ——— */}
        <Navbar />

        {/* ——— Hero & Scroll Canvas Sequence ——— */}
        <div className="relative w-full">
          {/* Canvas sequence dictates the scroll height (350vh) */}
          <ScrollCanvasSequence />
          
          {/* Hero sits absolutely on top, fading out as we scroll */}
          <div className="absolute top-0 left-0 w-full z-10">
            <Hero />
          </div>
        </div>

        {/* ——— Content Sections ——— */}
        <div className="relative z-20 bg-[var(--bg-primary)] flex flex-col gap-24 sm:gap-32 md:gap-48">
          <Services />
          <LogoBreak />
          <Portfolio />

          <Stats />

          <Process />
          <LogoBreak />
          <Testimonials />
          <Contact />
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
