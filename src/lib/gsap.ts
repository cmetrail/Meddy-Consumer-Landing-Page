"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { CustomEase } from "gsap/CustomEase";

const DURATION = 0.618;
// CustomEase supports headless registration and must be ready before create().
gsap.registerPlugin(CustomEase);
const EASE = CustomEase.create("meddy-ease", "0.175, 0.885, 0.32, 1");

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase);
  gsap.config({ autoSleep: 60, nullTargetWarn: false });
  gsap.defaults({ ease: EASE });
}

export { gsap, ScrollTrigger, TextPlugin, CustomEase, EASE, DURATION };

const pendingRefreshes = new Set<() => void>();
let refreshFrame: number | null = null;

/** Share one layout refresh for font/image notifications in the same frame. */
export function createScrollRefresh(beforeRefresh: () => void = () => {}) {
  let active = true;
  // Every owner needs a distinct identity, including owners without preparation.
  const prepare = () => beforeRefresh();
  return {
    refresh() {
      if (!active) return;
      pendingRefreshes.add(prepare);
      if (refreshFrame !== null) return;
      refreshFrame = requestAnimationFrame(() => {
        refreshFrame = null;
        const preparations = Array.from(pendingRefreshes);
        pendingRefreshes.clear();
        preparations.forEach(prepare => prepare());
        if (preparations.length) ScrollTrigger.refresh();
      });
    },
    dispose() {
      active = false;
      pendingRefreshes.delete(prepare);
      if (!pendingRefreshes.size && refreshFrame !== null) {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = null;
      }
    },
  };
}
