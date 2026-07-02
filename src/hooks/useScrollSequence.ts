"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BATCH_SIZE = 6;

export function useScrollSequence(frames: string[]) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const currentFrameRef = useRef(0);
  const lerpedProgressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const animFrameRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const totalFrames = frames.length;

  // Preload images in batches
  useEffect(() => {
    if (totalFrames === 0) return;

    imagesRef.current = new Array(totalFrames).fill(null);
    let loadedCount = 0;

    const loadImage = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          imagesRef.current[index] = img;
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
          resolve();
        };
        img.src = frames[index];
      });
    };

    const loadInBatches = async () => {
      for (let i = 0; i < totalFrames; i += BATCH_SIZE) {
        const batch = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, totalFrames); j++) {
          batch.push(loadImage(j));
        }
        await Promise.all(batch);
      }
      setIsLoaded(true);
    };

    loadInBatches();
  }, [frames, totalFrames]);

  // Render loop and ScrollTrigger using gsap.context for React safety
  useEffect(() => {
    if (!isLoaded || totalFrames === 0) return;

    // Use gsap.context to manage DOM mutations like pin-spacers safely in React
    const ctxGSAP = gsap.context(() => {
      const endValue = window.innerWidth < 768 ? "+=150%" : "+=200%";
      
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: endValue, // Compresses the animation timeline dynamically
        pin: true,
        onUpdate: (self) => {
          targetProgressRef.current = self.progress;
        }
      });
    }, containerRef); // Scope to the container

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const render = () => {
      // Lerp for buttery smoothness
      lerpedProgressRef.current += (targetProgressRef.current - lerpedProgressRef.current) * 0.08;

      const frameIndex = Math.round(lerpedProgressRef.current * (totalFrames - 1));
      const clampedFrame = Math.max(0, Math.min(totalFrames - 1, frameIndex));

      if (clampedFrame !== currentFrameRef.current) {
        currentFrameRef.current = clampedFrame;
        const img = imagesRef.current[clampedFrame];
        if (img) {
          const cw = window.innerWidth;
          const ch = window.innerHeight;
          const imgRatio = img.width / img.height;
          const canvasRatio = cw / ch;

          const scaleMultiplier = 1.85; // Massive zoom to fill the height and remove empty gaps
          let drawW: number, drawH: number, drawX: number, drawY: number;
          
          if (imgRatio > canvasRatio) {
            drawH = ch * scaleMultiplier;
            drawW = ch * imgRatio * scaleMultiplier;
          } else {
            drawW = cw * scaleMultiplier;
            drawH = (cw / imgRatio) * scaleMultiplier;
          }
          
          drawX = (cw - drawW) / 2;
          drawY = (ch - drawH) / 2;

          ctx.clearRect(0, 0, cw, ch);
          ctx.drawImage(img, drawX, drawY, drawW, drawH);
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resizeCanvas);
      ctxGSAP.revert(); // Reverts DOM to pre-GSAP state, preventing removeChild errors
    };
  }, [isLoaded, totalFrames]);

  return { canvasRef, containerRef, isLoaded, loadingProgress };
}
