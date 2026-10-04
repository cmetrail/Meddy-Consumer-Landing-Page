"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./FitnessPlanSection.module.css";

export default function FitnessPhysician({ src, active, sizes }: { src: string; active: number | null; sizes: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const portrait = new window.Image();
    let frame = 0;
    let visible = false;
    let disposed = false;
    let particles: { x: number; y: number; phase: number; radius: number }[] = [];
    canvas.width = canvas.height = 601;

    const draw = (time: number) => {
      context.clearRect(0, 0, 601, 601);
      particles.forEach(({ x, y, phase, radius }) => {
        const drift = time * 0.00045 + phase;
        context.globalAlpha = 0.12 + (Math.sin(drift) + 1) * 0.13;
        context.fillStyle = "#bcf8d9";
        context.beginPath();
        context.arc(x + Math.sin(drift) * 1.2, y + Math.cos(drift * 0.8) * 1.1, radius, 0, Math.PI * 2);
        context.fill();
      });
      frame = requestAnimationFrame(draw);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      context.clearRect(0, 0, 601, 601);
      if (visible && !document.hidden && !motion.matches && particles.length) frame = requestAnimationFrame(draw);
    };
    // Sample only lit portrait pixels so the moving dots stay on the physician.
    portrait.onload = () => {
      if (disposed) return;
      context.drawImage(portrait, 0, 0, 601, 601);
      const pixels = context.getImageData(0, 0, 601, 601).data;
      particles = [];
      for (let y = 24; y < 580; y += 7) {
        for (let x = 70; x < 540; x += 7) {
          const offset = (y * 601 + x) * 4;
          if (pixels[offset + 1] > 95 && pixels[offset + 3] > 100) {
            particles.push({ x, y, phase: (x * 13 + y * 7) % 31, radius: 0.55 + ((x + y) % 3) * 0.16 });
          }
        }
      }
      sync();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(canvas);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    portrait.src = src;
    return () => {
      disposed = true;
      portrait.onload = null;
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      cancelAnimationFrame(frame);
    };
  }, [src]);

  return (
    <div className={styles.physician}>
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
      <canvas ref={canvasRef} className={styles.particles} aria-hidden="true" />
      {[0, 1, 2, 3].map((area) => (
        <div key={area} className={styles.glow} data-area={area} data-lit={active === area} aria-hidden="true">
          <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
        </div>
      ))}
    </div>
  );
}
