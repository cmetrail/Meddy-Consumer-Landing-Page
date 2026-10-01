"use client";

import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  lenisInstance = lenis;
}

export function getLenis() {
  return lenisInstance;
}

export function scrollTo(
  target: string | number | HTMLElement,
  options?: Parameters<Lenis["scrollTo"]>[1],
) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options);
    return;
  }
  const behavior = options?.immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant" : "smooth";
  const el = typeof target === "string" ? document.querySelector(target) : target;
  const top = typeof el === "number"
    ? el
    : el instanceof HTMLElement ? el.getBoundingClientRect().top + window.scrollY : null;
  if (top !== null) {
    window.scrollTo({ top: top + (options?.offset ?? 0), behavior });
  }
}
