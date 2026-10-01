"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { DESKTOP_MOTION } from "@/lib/motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/lenis";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(DESKTOP_MOTION, () => {
      let disposed = false;
      const lenis = new Lenis({
        duration: 0.9,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
      });

      setLenis(lenis);

      lenis.on("scroll", ScrollTrigger.update);

      const ticker = gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      // Avoid a large catch-up burst after a tab switch or a slow frame.
      gsap.ticker.lagSmoothing(500, 33);

      let refreshTimer: ReturnType<typeof setTimeout>;
      const refresh = () => {
        if (disposed) return;
        clearTimeout(refreshTimer);
        refreshTimer = setTimeout(() => {
          lenis.resize();
          ScrollTrigger.refresh();
        }, 150);
      };

      window.addEventListener("load", refresh);
      document.fonts?.ready?.then(refresh);

      const observer = new ResizeObserver(refresh);
      observer.observe(document.body);

      return () => {
        disposed = true;
        window.removeEventListener("load", refresh);
        observer.disconnect();
        clearTimeout(refreshTimer);
        gsap.ticker.remove(ticker);
        lenis.destroy();
        setLenis(null);
      };
    });
    return () => media.revert();
  }, []);

  return <>{children}</>;
}
