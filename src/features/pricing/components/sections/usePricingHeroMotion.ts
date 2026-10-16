"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function usePricingHeroMotion() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 768px)",
      mobile: "(max-width: 767px)",
      pointer: "(hover: hover) and (pointer: fine)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, context => {
      if (context.conditions?.reduce) return;
      const root = sectionRef.current!;
      const select = gsap.utils.selector(root);
      const desktop = context.conditions?.desktop;
      const portraits = select("[data-pricing-portrait]");

      // Separate reveal, ambient, cursor and scroll layers keep transforms independent.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from(select("[data-pricing-word]"), {
        yPercent: 115, rotationX: -25, autoAlpha: 0,
        transformOrigin: "50% 100%", duration: 1.35, stagger: 0.13,
      }, 0.12)
        .from(portraits, {
          clipPath: "inset(50% 0% 50% 0% round 13px)",
          autoAlpha: 0, rotation: index => index % 2 ? 5 : -5,
          duration: 1.3, stagger: 0.2,
        }, 0.35)
        .from(select("[data-pricing-portrait-image]"), {
          scale: 1.3, duration: 1.8, stagger: 0.2,
        }, 0.35)
        .from(select("[data-pricing-hands-reveal]"), {
          y: desktop ? 85 : 30, scale: 1.045, autoAlpha: 0,
          transformOrigin: "50% 65%", duration: 2.2,
        }, 0.15);

      const floats = select("[data-pricing-float]").map((portrait, index) => gsap.to(portrait, {
        y: index % 2 ? 3 : -3, rotation: index % 2 ? -1.2 : 1.2,
        scale: 1.07, duration: 3.2 + index * 0.5, delay: 1.8 + index * 0.2,
        repeat: -1, yoyo: true, ease: "sine.inOut", paused: true,
      }));

      gsap.timeline({ scrollTrigger: {
        trigger: root, start: "top top", end: "bottom top", scrub: 1.2,
      } })
        .to(select("h1"), { y: desktop ? -65 : -25, ease: "none" }, 0)
        .to(select("[data-pricing-hands-depth]"), {
          y: desktop ? -110 : -40, scale: 1.035, ease: "none",
        }, 0);

      const syncMotion = () => {
        const bounds = root.getBoundingClientRect();
        const visible = !document.hidden && bounds.bottom > 0 && bounds.top < innerHeight;
        intro.paused(!visible);
        floats.forEach(tween => tween.paused(!visible));
      };
      ScrollTrigger.create({ trigger: root, start: "top bottom", end: "bottom top", onToggle: syncMotion });
      document.addEventListener("visibilitychange", syncMotion);
      syncMotion();

      let cleanupPointer: (() => void) | undefined;
      if (desktop && context.conditions?.pointer) {
        const layer = select("[data-pricing-hands-pointer]")[0];
        const moveX = gsap.quickTo(layer, "x", { duration: 1.4, ease: "power3.out" });
        const moveY = gsap.quickTo(layer, "y", { duration: 1.4, ease: "power3.out" });
        const portraitMoves = portraits.map(portrait => ({
          x: gsap.quickTo(portrait, "x", { duration: 1, ease: "power3.out" }),
          y: gsap.quickTo(portrait, "y", { duration: 1, ease: "power3.out" }),
        }));
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const bounds = root.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - 0.5;
          const y = (event.clientY - bounds.top) / bounds.height - 0.5;
          moveX(x * 16);
          moveY(y * 10);
          portraitMoves.forEach((motion, index) => {
            motion.x(x * (8 + index * 3));
            motion.y(y * (6 + index * 2));
          });
        };
        const reset = () => {
          moveX(0); moveY(0);
          portraitMoves.forEach(motion => { motion.x(0); motion.y(0); });
        };
        root.addEventListener("pointermove", move);
        root.addEventListener("pointerleave", reset);
        cleanupPointer = () => {
          root.removeEventListener("pointermove", move);
          root.removeEventListener("pointerleave", reset);
        };
      }

      return () => {
        document.removeEventListener("visibilitychange", syncMotion);
        cleanupPointer?.();
      };
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return sectionRef;
}
