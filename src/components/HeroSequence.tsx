"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 222;
const FRAME_PATH = "/frames/ezgif-frame-";
const FRAME_EXT = ".webp";

function padNumber(num: number): string {
  return String(num).padStart(3, "0");
}

const STORY_SEGMENTS = [
  { start: 40, end: 85, text: "Automation That Works While You Sleep" },
  { start: 86, end: 131, text: "Custom Software Built For Growth" },
  { start: 132, end: 177, text: "AI Systems That Scale Businesses" },
  { start: 178, end: 222, text: "The Future Starts With SiddhiX" },
];

export default function HeroSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const frameIndexRef = useRef({ value: 0 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastRenderedFrameRef = useRef(-1);
  const [loadProgress, setLoadProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activeStoryIndex, setActiveStoryIndex] = useState(-1);

  const getDevicePixelRatio = useCallback(() => {
    return typeof window !== "undefined"
      ? Math.max(window.devicePixelRatio || 1, 1)
      : 1;
  }, []);

  const renderFrame = useCallback(
    (index: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      const images = imagesRef.current;
      const clampedIndex = Math.max(0, Math.min(index, FRAME_COUNT - 1));
      if (clampedIndex === lastRenderedFrameRef.current) return;
      lastRenderedFrameRef.current = clampedIndex;

      const img = images[clampedIndex];
      if (!img || !img.complete) return;

      const dpr = getDevicePixelRatio();
      const cw = canvas.width / dpr;
      const ch = canvas.height / dpr;

      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = cw / ch;

      let dw: number, dh: number, dx: number, dy: number;
      const isPortrait = ch > cw;

      if (isPortrait) {
        // Mobile Vertical: The original frames are very wide landscape (16:9).
        // If we use 'contain' (1.0x width), it looks like a tiny letterbox.
        // If we use 'cover' (~3.9x width), it completely crops the logo.
        // We use a sweet spot (e.g., 2.2x width) so the logo fills the screen horizontally
        // but has a commanding vertical presence (~50% screen height).
        dw = cw * 2.2;
        dh = dw / imgRatio;
        dx = (cw - dw) / 2;
        dy = (ch - dh) / 2;
      } else {
        // Desktop / Landscape: Use standard "cover" behavior
        if (canvasRatio > imgRatio) {
          dw = cw;
          dh = cw / imgRatio;
          dx = 0;
          dy = (ch - dh) / 2;
        } else {
          dh = ch;
          dw = ch * imgRatio;
          dx = (cw - dw) / 2;
          dy = 0;
        }
      }

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);

      const segmentIndex = STORY_SEGMENTS.findIndex(
        (s) => clampedIndex + 1 >= s.start && clampedIndex + 1 <= s.end
      );
      setActiveStoryIndex(segmentIndex);
    },
    [getDevicePixelRatio]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const updateCanvasSize = () => {
      const dpr = getDevicePixelRatio();
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastRenderedFrameRef.current = -1;
      renderFrame(Math.round(frameIndexRef.current.value));
    };
    updateCanvasSize();

    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let cancelled = false;
    let hasStarted = false;

    // Load fewer frames on mobile to get them into the site instantly
    const BATCH_SIZE = window.innerWidth < 768 ? 15 : 30;

    const loadRestOfFrames = () => {
      for (let i = BATCH_SIZE; i < FRAME_COUNT; i++) {
        if (cancelled) return;
        const img = new Image();
        img.decoding = "async";
        img.src = `${FRAME_PATH}${padNumber(i + 1)}${FRAME_EXT}`;
        img.onload = () => { if (!cancelled) loadedCount++; };
        img.onerror = () => { if (!cancelled) loadedCount++; };
        images[i] = img;
      }
    };

    // Load initial batch
    for (let i = 0; i < BATCH_SIZE; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = `${FRAME_PATH}${padNumber(i + 1)}${FRAME_EXT}`;
      
      const onFrameReady = () => {
        if (cancelled) return;
        loadedCount++;
        
        if (!hasStarted) {
          // Progress bar based on initial batch only
          setLoadProgress(Math.round((loadedCount / BATCH_SIZE) * 100));
        }

        if (!hasStarted && loadedCount === BATCH_SIZE) {
          hasStarted = true;
          setLoaded(true);
          renderFrame(0);
          initScrollAnimation();
          
          // Once the experience starts, silently load the remaining frames
          requestAnimationFrame(() => {
            loadRestOfFrames();
          });
        }
      };

      img.onload = onFrameReady;
      img.onerror = onFrameReady;
      images[i] = img;
    }
    imagesRef.current = images;

    const initScrollAnimation = () => {
      const obj = frameIndexRef.current;

      gsap.to(obj, {
        value: FRAME_COUNT - 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
          onUpdate: () => {
            requestAnimationFrame(() => {
              renderFrame(Math.round(obj.value));
            });
          },
        },
      });

      if (canvasWrapperRef.current) {
        gsap.fromTo(
          canvasWrapperRef.current,
          { opacity: 1 },
          {
            opacity: 0,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: container,
              start: "95% top",
              end: "100% top",
              scrub: true,
            },
          }
        );
      }
    };

    const handleResize = () => updateCanvasSize();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [renderFrame, getDevicePixelRatio]);

  return (
    <>
      {/* ——— Luxury Loading Screen ——— */}
      {!loaded && (
        <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center">

          <div className="relative flex flex-col items-center">
            <div className="flex justify-center relative perspective-[1000px] mb-8">
              <motion.img
                src="/Siddhixlogo.jpeg"
                alt="SiddhiX Logo"
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain mix-blend-screen"
                animate={{ 
                  y: [-10, 10, -10],
                  rotateX: [10, -10, 10],
                  rotateY: [-10, 10, -10]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Subtitle */}
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#3F3F46] mb-12 font-light">
              Loading Experience
            </p>

            {/* Progress bar */}
            <div className="w-48 h-[1px] bg-white/[0.03] rounded-full overflow-hidden mb-4">
              <div
                className="h-full rounded-full transition-all duration-200 ease-out loader-bar"
                style={{ width: `${loadProgress}%` }}
              />
            </div>

            {/* Percentage */}
            <div className="text-xs text-[#3F3F46] tabular-nums font-light tracking-[0.2em]">
              {loadProgress}%
            </div>
          </div>
        </div>
      )}

      {/* ——— Scroll Container ——— */}
      <div ref={containerRef} className="relative" style={{ height: "600vh" }}>
        <div
          ref={canvasWrapperRef}
          className="sticky top-0 left-0 w-full h-[100dvh] z-0 overflow-hidden"
        >
          <canvas ref={canvasRef} className="block" style={{ willChange: "contents" }} />

          {/* Cinematic overlays */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#050505]/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#050505]/40 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#050505]/40 to-transparent" />
          </div>

          {/* ——— Story Captions ——— */}
          <div className="absolute bottom-16 sm:bottom-36 left-0 right-0 flex items-center justify-center pointer-events-none px-6">
            {STORY_SEGMENTS.map((segment, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
                style={{
                  opacity: activeStoryIndex === i ? 0.6 : 0,
                  transform: activeStoryIndex === i ? "translateY(0px)" : "translateY(16px)",
                }}
              >
                <p className="heading-editorial text-base sm:text-lg md:text-xl lg:text-2xl text-[#A1A1AA] text-center tracking-[-0.01em]">
                  {segment.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
