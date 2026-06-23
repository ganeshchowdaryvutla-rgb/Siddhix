"use client";

import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSequence from "@/components/HeroSequence";
import Hero from "@/components/sections/Hero";
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
      <main className="relative bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {/* ——— Navigation ——— */}
        <Navbar />

        {/* ——— Hero: Canvas Animation + Text Overlay ——— */}
        {/* HeroSequence creates the 500vh scroll container + sticky canvas */}
        <HeroSequence />
        
        {/* Hero text is fixed-positioned and fades out on scroll */}
        <Hero />

        {/* ——— Content Sections ——— */}
        <div className="relative z-20 bg-[var(--bg-primary)] flex flex-col gap-32 md:gap-[12rem] lg:gap-[16rem] pt-16 md:pt-32">
          <Services />
          <LogoBreak />
          <Portfolio />
          
          {/* Massive extra gap between Portfolio and Process */}
          <div className="mt-[4rem] md:mt-[8rem] lg:mt-[12rem] mb-[4rem] md:mb-[8rem] lg:mb-[12rem]">
            <Stats />
          </div>
          
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
