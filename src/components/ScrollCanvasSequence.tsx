'use client';

import { useEffect, useState } from 'react';
import { useScrollSequence } from '@/hooks/useScrollSequence';

export default function ScrollCanvasSequence() {
  const [frames, setFrames] = useState<string[]>([]);
  const [hasError, setHasError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Fetch frame paths from API
  useEffect(() => {
    // Check reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    fetch('/api/frames')
      .then((res) => res.json())
      .then((data) => {
        if (data.frames && data.frames.length > 0) {
          setFrames(data.frames);
        } else {
          setHasError(true);
        }
      })
      .catch(() => {
        setHasError(true);
      });
  }, []);

  const { canvasRef, containerRef, isLoaded, loadingProgress } = useScrollSequence(frames);




  // If no frames or error, return null
  if (hasError || frames.length === 0) {
    return null;
  }

  // If reduced motion, show static image
  if (prefersReducedMotion && frames.length > 0) {
    return (
      <div className="relative w-full h-[100dvh] overflow-hidden">
        <img 
          src={frames[0]} 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>
    );
  }

  return (
    <>


      {/* Main Sequence Container */}
      {/* React Wrapper: isolates GSAP pin-spacer DOM mutations from React to prevent removeChild errors */}
      <div className="relative w-full">
        {/* Main Sequence Container pinned by GSAP */}
        <div ref={containerRef} className="relative w-full h-[100dvh] z-0 overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="block w-full h-full object-cover" 
            style={{ willChange: 'contents' }}
          />
          
          {/* Dark-themed cinematic overlays */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-x-0 top-0 h-24 sm:h-32 bg-gradient-to-b from-[var(--bg-primary)] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 sm:h-48 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-8 sm:w-16 bg-gradient-to-r from-[var(--bg-primary)]/40 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-8 sm:w-16 bg-gradient-to-l from-[var(--bg-primary)]/40 to-transparent" />
          </div>
        </div>
      </div>
    </>
  );
}
