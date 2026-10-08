"use client";

import { useEffect, useRef } from "react";
import { DESKTOP_MOTION } from "@/lib/motion";

/** The SVG mask is the source of truth, including GSAP's scrub smoothing. */
export default function TrendOrbs() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const chart = host?.parentElement;
    const svg = chart?.querySelector("svg");
    const mask = svg?.querySelector<SVGRectElement>("[data-path-reveal], [data-graph-reveal]");
    const paths = svg ? Array.from(svg.querySelectorAll<SVGPathElement>("path[clip-path], path[data-trend-path]")) : [];
    if (!host || !chart || !svg || !mask || paths.length !== 2) return;

    const media = window.matchMedia(DESKTOP_MOTION);
    let disposed = false;
    let release: (() => void) | undefined;
    let loading = false;
    let visible = false;

    const load = async () => {
      if (release || loading || !visible || !media.matches || disposed) return;
      loading = true;
      try {
        const { createTrendOrbs } = await import("./createTrendOrbs");
        if (disposed || !media.matches) { loading = false; return; }
        release = await createTrendOrbs(host, svg, mask, paths);
        if (disposed || !media.matches) { release(); release = undefined; }
      } catch {
        // The underlying SVG reveal works even without WebGL.
      }
      loading = false;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      void load();
    }, { rootMargin: "300px" });
    observer.observe(chart);
    const change = () => {
      if (!media.matches) { release?.(); release = undefined; }
      else if (!release) void load();
    };
    media.addEventListener("change", change);
    return () => {
      disposed = true;
      observer.disconnect();
      media.removeEventListener("change", change);
      release?.();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
