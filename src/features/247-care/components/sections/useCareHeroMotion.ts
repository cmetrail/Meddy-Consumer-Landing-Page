"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useCareHeroMotion() {
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
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro.from(select("[data-care-line]"), {
        y: 10, duration: .5, stagger: .06, clearProps: "transform",
      }, 0)
        .from(select("[data-care-description]"), { y: 8, duration: .45, clearProps: "transform" }, .06)
        .from(select("[data-care-cta]"), { y: 6, duration: .4, clearProps: "transform" }, .1);

      // Keep the LCP image visible while it loads; animate only a small translation.
      intro.from(select("[data-care-portrait]"), {
          x: desktop ? 10 : 0, y: 8, duration: .6, clearProps: "transform",
        }, 0);

      intro.from(select("[data-care-float]"), {
        autoAlpha: 0, duration: 1.2, ease: "power1.out",
        clearProps: "opacity,visibility",
      }, .1);

      // Dedicated layers keep entrance, scroll and pointer transforms independent.
      gsap.timeline({ scrollTrigger: {
        trigger: root, start: "top top", end: "bottom top", scrub: 1.2,
      } })
        .to(select("[data-care-copy]"), { y: desktop ? -40 : -16, ease: "none" }, 0)
        .to(select("[data-care-depth]"), { y: desktop ? -75 : 0, ease: "none" }, 0);

      const shine = gsap.fromTo(select("[data-care-shine]"), { xPercent: 0 }, {
        xPercent: 480, duration: .65, ease: "power2.inOut", paused: true,
      });

      const syncMotion = () => {
        const bounds = root.getBoundingClientRect();
        const visible = !document.hidden && bounds.bottom > 0 && bounds.top < innerHeight;
        intro.paused(!visible);
        if (!visible) shine.pause();
      };
      ScrollTrigger.create({ trigger: root, start: "top bottom", end: "bottom top", onToggle: syncMotion });
      document.addEventListener("visibilitychange", syncMotion);
      syncMotion();

      const button = root.querySelector<HTMLButtonElement>("[data-care-cta]")!;
      const pointerLayer = root.querySelector<HTMLElement>("[data-care-pointer]")!;
      const moveX = gsap.quickTo(pointerLayer, "x", { duration: 1.2, ease: "power3.out" });
      const moveY = gsap.quickTo(pointerLayer, "y", { duration: 1.2, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        if (!desktop || !context.conditions?.pointer || event.pointerType !== "mouse") return;
        const bounds = root.getBoundingClientRect();
        moveX(((event.clientX - bounds.left) / bounds.width - .5) * 14);
        moveY(((event.clientY - bounds.top) / bounds.height - .5) * 10);
      };
      const reset = () => { moveX(0); moveY(0); };
      const highlight = () => { if (intro.progress() === 1) shine.restart(); };
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", reset);
      button.addEventListener("pointerenter", highlight);
      button.addEventListener("focus", highlight);

      return () => {
        document.removeEventListener("visibilitychange", syncMotion);
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", reset);
        button.removeEventListener("pointerenter", highlight);
        button.removeEventListener("focus", highlight);
      };
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return sectionRef;
}
