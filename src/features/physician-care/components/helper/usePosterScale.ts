"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Measures a full-viewport poster section and returns a uniform `cover` scale
 * factor (max of width & height ratios) so the design canvas always fills the
 * section with no side gaps — overflowing equally on the larger axis. The
 * section must be `height: var(--dvh)`, `overflow-hidden`, and the poster
 * wrapper must be absolutely centered.
 */
export function usePosterScale(designWidth: number, designHeight: number) {
  const ref = useRef<HTMLElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      setScale(Math.max(width / designWidth, height / designHeight));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [designWidth, designHeight]);

  return { ref, scale };
}
