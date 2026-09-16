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
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (el instanceof HTMLElement) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
