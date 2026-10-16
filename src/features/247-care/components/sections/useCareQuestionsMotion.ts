"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useCareQuestionsMotion() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 1024px)",
      mobile: "(max-width: 1023px)",
      pointer: "(hover: hover) and (pointer: fine)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reduce) return;
      const root = sectionRef.current!;
      const select = gsap.utils.selector(root);
      const desktop = context.conditions?.desktop;
      // Retain triggers during refresh, including reloads at a restored scroll
      // position. Completed entrances stay complete without once's eager kill.
      const enter = (trigger: Element) => ({
        trigger, start: "top 92%", toggleActions: "play none none none",
      });

      // Independent triggers keep the stacked mobile content close to the reader.
      select("[data-cq-copy]").forEach((element: HTMLElement, index: number) => {
        gsap.from(element, {
          opacity: 0, y: desktop ? "+=26" : "+=14", duration: 1.05,
          delay: desktop ? Math.min(index * .07, .21) : 0,
          ease: "power3.out", scrollTrigger: enter(element),
        });
      });

      const cards = root.querySelector<HTMLElement>("[data-cq-cards]")!;
      const cardEntrance = gsap.timeline({ scrollTrigger: enter(cards), defaults: { ease: "power3.out" } })
        .from(select("[data-cq-card]"), {
          y: desktop ? 36 : 18, rotationX: desktop ? 9 : 0,
          opacity: 0, duration: 1.15, stagger: .13,
          transformPerspective: 900, transformOrigin: "50% 100%",
        }, 0)
        .from(select("[data-cq-card] img"), {
          scale: 1.12, duration: 1.55, stagger: .13,
        }, 0);

      const illustration = root.querySelector<HTMLElement>("[data-cq-illustration]")!;
      gsap.timeline({ scrollTrigger: enter(illustration), defaults: { ease: "power3.out" } })
        .from(illustration, {
          opacity: 0, clipPath: "inset(12% 0% 0% 0% round 12px)", duration: 1.5,
        }, 0)
        .from(select("[data-cq-scene]"), {
          y: desktop ? 42 : 22, scale: 1.045, rotation: desktop ? 1.5 : 0,
          transformOrigin: "50% 100%", duration: 1.8,
        }, .08);

      // Keep hand, phone and screen registered on one layer. A positive offset
      // preserves the crop at the bottom throughout the scroll movement.
      gsap.fromTo(select("[data-cq-depth]"), { y: desktop ? 18 : 8 }, {
        y: 0, ease: "none", scrollTrigger: {
          trigger: illustration, start: "top bottom", end: "bottom top", scrub: 1.3,
        },
      });
      const icon = root.querySelector<HTMLElement>("[data-cq-icon]")!;
      gsap.from(icon, {
        rotation: -14, scale: .88, duration: 1.25, ease: "power3.out",
        scrollTrigger: enter(icon),
      });

      // Hover affects the photos rather than making the noninteractive cards
      // look clickable. Tweens are created here so matchMedia owns their cleanup.
      const cleanups: (() => void)[] = [];
      if (context.conditions?.pointer) {
        select("[data-cq-card]").forEach((card: HTMLElement) => {
          const zoom = gsap.fromTo(card.querySelector("img"), { scale: 1 }, {
            scale: 1.055, duration: .7, ease: "power2.out", paused: true, immediateRender: false,
          });
          const hover = () => { if (cardEntrance.progress() === 1) zoom.play(); };
          const leave = () => { zoom.reverse(); };
          card.addEventListener("pointerenter", hover);
          card.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            card.removeEventListener("pointerenter", hover);
            card.removeEventListener("pointerleave", leave);
          });
        });
      }
      return () => cleanups.forEach(cleanup => cleanup());
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return sectionRef;
}
