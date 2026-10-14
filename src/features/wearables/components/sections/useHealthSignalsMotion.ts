"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useHealthSignalsMotion(ref: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const root = ref.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 768px)",
      tall: "(min-height: 650px)",
      motion: "(prefers-reduced-motion: no-preference)",
    }, (context) => {
      if (!context.conditions?.motion) return;
      const desktop = Boolean(context.conditions.desktop);
      const stage = root.querySelector<HTMLElement>(desktop ? "[data-signal-desktop]" : "[data-signal-mobile]");
      if (!stage) return;
      const cards = Array.from(stage.querySelectorAll<HTMLElement>("[data-signal-card]"));
      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          id: "wearables-health-signals",
          trigger: desktop ? root : stage,
          start: context.conditions.tall
            ? desktop ? "top 80px" : () => `top ${Math.max(88, (window.innerHeight - stage.offsetHeight) / 2)}px`
            : "top 85%",
          end: () => `+=${window.innerHeight * (context.conditions?.tall ? 2 : 1.2)}`,
          pin: Boolean(context.conditions.tall),
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Each card moves straight up into its original position, then holds
      // briefly before the next card slides over it to build the stack.
      cards.forEach((card, index) => {
        timeline.fromTo(card, {
          y: () => stage.offsetHeight,
          autoAlpha: 0,
        }, {
          y: 0,
          autoAlpha: 1,
          duration: 1,
        }, index * 1.35);
      });
      timeline.to({}, { duration: 0.4 });
    });
    return () => media.revert();
  }, { scope: ref });
}
