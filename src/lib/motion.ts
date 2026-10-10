"use client";

import { gsap } from "@/lib/gsap";

// Keep this in sync with the static presentation in globals.css.
export const DESKTOP_MOTION =
  "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

// Opt in only for sequences designed for both native touch and desktop scroll.
export const SCROLL_MOTION = "(prefers-reduced-motion: no-preference)";

/** Own and revert animations when the viewport or motion preference changes. */
export function desktopMotion(setup: () => void | (() => void)) {
  const media = gsap.matchMedia();
  media.add(DESKTOP_MOTION, setup);
  return () => media.revert();
}
