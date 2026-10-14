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
      const stage = root.querySelector<HTMLElement>(desktop ? "[data-signal-desktop]" : "[data-signal-mobile-story]");
      if (!stage) return;
      const cards = Array.from(stage.querySelectorAll<HTMLElement>("[data-signal-card]"));
      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          id: "wearables-health-signals",
          trigger: desktop ? root : stage,
          start: context.conditions.tall
            ? desktop ? "top 80px" : "top 24px"
            : "top 85%",
          end: () => context.conditions?.tall
            ? `+=${window.innerHeight * (desktop ? 2 : 1.4)}`
            : "bottom 30%",
          pin: Boolean(context.conditions.tall),
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (trigger) => {
            // Preserve GSAP's reserved space against the global spacing reset.
            if (desktop || !context.conditions?.tall) return;
            const spacer = stage.parentElement;
            if (!spacer?.classList.contains("pin-spacer")) return;
            const distance = trigger.end - trigger.start;
            spacer.style.setProperty("padding-bottom", `${distance}px`, "important");
            spacer.style.setProperty("height", `${stage.offsetHeight + distance}px`, "important");
          },
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
