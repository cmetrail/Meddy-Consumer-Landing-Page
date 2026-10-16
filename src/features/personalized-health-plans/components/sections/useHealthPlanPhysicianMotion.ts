"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useHealthPlanPhysicianMotion() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      const desktop = context.conditions?.desktop;
      // Only animate the layout that is visible; each breakpoint owns its triggers.
      const surface = root.querySelector<HTMLElement>(desktop ? "[data-physician-desktop]" : "[data-physician-mobile]")!;
      const select = gsap.utils.selector(surface);
      const stage = surface.querySelector<HTMLElement>("[data-physician-stage]")!;
      const cta = surface.querySelector<HTMLAnchorElement>("[data-physician-cta]")!;

      if (desktop) {
        gsap.from(select("[data-physician-heading]"), {
          autoAlpha: 0, y: 22, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: select("[data-physician-heading]")[0], start: "top 90%", once: true },
        });
      }
      gsap.from(select("[data-physician-copy] > p"), {
        autoAlpha: 0, y: 24, duration: 1.1, stagger: 0.16, ease: "power3.out",
        scrollTrigger: { trigger: select("[data-physician-copy]")[0], start: "top 88%", once: true },
      });
      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: select("[data-physician-bullets]")[0], start: "top 90%", once: true },
      }).from(select("[data-physician-bullet]"), {
        autoAlpha: 0, x: -14, duration: 0.85, stagger: 0.14,
      }, 0).from(select("[data-physician-bullet] > span"), {
        scaleX: 0, transformOrigin: "0% 50%", duration: 0.7, stagger: 0.14,
      }, 0.12);

      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: stage, start: "top 90%", once: true },
      }).from(select("[data-physician-portrait]"), {
        autoAlpha: 0, y: desktop ? 36 : 20,
        clipPath: "inset(8% 0 0 0)", duration: 1.65,
      }, 0).from(select("[data-physician-pill]"), {
        autoAlpha: 0, y: 18, scale: 0.9, duration: 1, stagger: 0.11,
      }, 0.45);

      // The portrait, pill entrances, and idle drift have separate transform owners.
      gsap.fromTo(select("[data-physician-depth]"), { y: desktop ? 14 : 5 }, {
        y: desktop ? -24 : -8, ease: "none",
        scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });
      const ambient = gsap.to(select("[data-physician-float]"), {
        y: (i) => i % 2 ? (desktop ? 6 : 3) : (desktop ? -7 : -4),
        duration: 3.6, stagger: { each: 0.18, from: "center" },
        repeat: -1, yoyo: true, ease: "sine.inOut", paused: true,
      });
      const syncPlayback = () => {
        const bounds = stage.getBoundingClientRect();
        ambient.paused(document.hidden || bounds.bottom <= 0 || bounds.top >= innerHeight);
      };
      const observer = new IntersectionObserver(syncPlayback);
      observer.observe(stage);
      document.addEventListener("visibilitychange", syncPlayback);
      syncPlayback();

      const shine = gsap.to(select("[data-physician-shine]"), {
        xPercent: 500, duration: 1.1, ease: "power2.inOut", paused: true,
      });
      gsap.timeline({
        scrollTrigger: { trigger: select("[data-physician-cta-group]")[0], start: "top 92%", once: true },
      }).from(select("[data-physician-cta-group]"), {
        autoAlpha: 0, y: 18, duration: 1, ease: "power3.out",
      }, 0).call(() => shine.restart(), [], 0.8);

      const pointer = surface.querySelector<HTMLElement>("[data-physician-pointer]")!;
      const moveX = gsap.quickTo(pointer, "x", { duration: 1.3, ease: "power3.out" });
      const moveY = gsap.quickTo(pointer, "y", { duration: 1.3, ease: "power3.out" });
      const lift = gsap.quickTo(cta, "y", { duration: 0.45, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        if (!desktop || !context.conditions?.pointer || event.pointerType !== "mouse") return;
        const bounds = root.getBoundingClientRect();
        moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 14);
        moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 8);
      };
      const reset = () => { moveX(0); moveY(0); };
      const highlight = () => { lift(-3); shine.restart(); };
      const resetCta = () => lift(0);
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", reset);
      cta.addEventListener("pointerenter", highlight);
      cta.addEventListener("pointerleave", resetCta);
      cta.addEventListener("focus", highlight);
      cta.addEventListener("blur", resetCta);
      const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        cancelAnimationFrame(refreshFrame);
        observer.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", reset);
        cta.removeEventListener("pointerenter", highlight);
        cta.removeEventListener("pointerleave", resetCta);
        cta.removeEventListener("focus", highlight);
        cta.removeEventListener("blur", resetCta);
      };
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return sectionRef;
}
