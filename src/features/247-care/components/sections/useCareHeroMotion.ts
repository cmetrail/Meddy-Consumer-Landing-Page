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
        yPercent: 105, rotationX: -20, autoAlpha: 0, duration: 1.3,
        stagger: .16, transformOrigin: "50% 100%",
      }, .12)
        .from(select("[data-care-description]"), { y: 18, autoAlpha: 0, duration: 1 }, .58)
        .from(select("[data-care-cta]"), { y: 14, autoAlpha: 0, duration: .85 }, .78);

      intro.from(select("[data-care-portrait]"), {
          x: desktop ? 38 : 0, y: 28, scale: 1.045, autoAlpha: 0, duration: 1.9,
          transformOrigin: "70% 80%",
        }, desktop ? 0 : .65);

      if (desktop) {
        intro.from(select("[data-care-chat]"), {
            y: 32, rotationX: 7, autoAlpha: 0, duration: 1.2,
            transformPerspective: 1000, transformOrigin: "50% 100%",
          }, .65)
          .from(select("[data-care-phone]"), { y: 22, duration: 1.1 }, .9)
          .from(select("[data-care-message]"), {
            y: 12, scale: .94, autoAlpha: 0, duration: .65,
            stagger: .24, transformOrigin: "50% 100%",
          }, 1.12);
      }

      // Dedicated layers keep entrance, scroll and pointer transforms independent.
      gsap.timeline({ scrollTrigger: {
        trigger: root, start: "top top", end: "bottom top", scrub: 1.2,
      } })
        .to(select("[data-care-copy]"), { y: desktop ? -40 : -16, ease: "none" }, 0)
        .to(select("[data-care-depth]"), { y: desktop ? -75 : 0, ease: "none" }, 0);

      const ambient = gsap.timeline({ repeat: -1, yoyo: true, paused: true,
        defaults: { duration: 5, ease: "sine.inOut" },
      }).to(select("[data-care-glow]"), { xPercent: 3, scale: 1.05 }, 0);
      if (desktop) ambient.to(select("[data-care-float]"), { y: -4 }, 0);

      const shine = gsap.fromTo(select("[data-care-shine]"), { xPercent: 0 }, {
        xPercent: 480, duration: 1.1, ease: "power2.inOut", paused: true,
      });
      intro.call(() => { shine.restart(); }, [], 1.45);

      const syncMotion = () => {
        const bounds = root.getBoundingClientRect();
        const visible = !document.hidden && bounds.bottom > 0 && bounds.top < innerHeight;
        intro.paused(!visible);
        ambient.paused(!visible);
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
