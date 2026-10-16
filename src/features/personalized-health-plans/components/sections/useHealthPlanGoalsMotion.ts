"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useHealthPlanGoalsMotion() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 1024px)",
      mobile: "(max-width: 1023px)",
      pointer: "(hover: hover) and (pointer: fine)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      // Leave all server-rendered content visible when motion is reduced.
      if (context.conditions?.reduce) return;
      const root = sectionRef.current!;
      const select = gsap.utils.selector(root);
      const desktop = context.conditions?.desktop;
      const cleanups: (() => void)[] = [];

      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: select("h2")[0], start: "top 88%", once: true },
      }).from(select("[data-goals-heading]"), {
        yPercent: 110, rotation: 2, transformOrigin: "0% 100%",
        duration: 1.15, stagger: 0.15,
      }, 0);

      gsap.from(select("[data-goals-intro] > p"), {
        autoAlpha: 0, y: 22, duration: 1, stagger: 0.14, ease: "power3.out",
        scrollTrigger: { trigger: select("[data-goals-intro]")[0], start: "top 90%", once: true },
      });

      root.querySelectorAll<HTMLElement>("[data-goals-card]").forEach((card, index) => {
        const photo = card.querySelector<HTMLElement>("[data-goals-photo]")!;
        const image = card.querySelector<HTMLImageElement>("[data-goals-image]")!;
        const parallax = card.querySelector<HTMLElement>("[data-goals-parallax]")!;
        const pointer = card.querySelector<HTMLElement>("[data-goals-pointer]")!;
        const caption = card.querySelector<HTMLElement>("[data-goals-caption]")!;
        const chips = card.querySelectorAll("[data-goals-chip]");

        // Separate surfaces keep the reveal, scroll, and pointer transforms independent.
        gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: photo, start: "top 90%", once: true },
          delay: desktop && index === 1 ? 0.12 : 0,
        }).from(photo, {
          clipPath: "inset(12% 0 88% 0 round 15px)", autoAlpha: 0, duration: 1.4,
        }, 0).from(image, {
          scale: 1.08, duration: 1.8, transformOrigin: "50% 50%",
        }, 0);

        gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: caption, start: "top 94%", once: true },
        }).from(caption, { autoAlpha: 0, y: 18, duration: 0.85 }, 0)
          .from(chips, {
            autoAlpha: 0, y: 14, scale: 0.96, duration: 0.7, stagger: 0.065,
          }, 0.15);

        // Overscan covers the edges while retaining each photo's authored crop.
        gsap.fromTo(parallax, { y: desktop ? 10 : 5, scale: desktop ? 1.08 : 1.06 }, {
          y: desktop ? -10 : -5, scale: desktop ? 1.08 : 1.06, ease: "none",
          scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: 1.2 },
        });

        if (desktop && context.conditions?.pointer) {
          const moveX = gsap.quickTo(pointer, "x", { duration: 1, ease: "power3.out" });
          const moveY = gsap.quickTo(pointer, "y", { duration: 1, ease: "power3.out" });
          const move = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            const bounds = photo.getBoundingClientRect();
            moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 7);
            moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 6);
          };
          const reset = () => { moveX(0); moveY(0); };
          photo.addEventListener("pointermove", move);
          photo.addEventListener("pointerleave", reset);
          cleanups.push(() => {
            photo.removeEventListener("pointermove", move);
            photo.removeEventListener("pointerleave", reset);
          });
        }
      });

      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: select("[data-goals-statement]")[0], start: "top 88%", once: true },
      }).from(select("[data-goals-word]"), {
        autoAlpha: 0, y: 22, rotationX: -18, transformPerspective: 700,
        transformOrigin: "0% 100%", duration: 1.05, stagger: 0.085,
      }, 0).from(select("[data-goals-statement-detail]"), {
        autoAlpha: 0, y: 12, duration: 0.85,
      }, 0.5);

      return () => cleanups.forEach(cleanup => cleanup());
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return sectionRef;
}
