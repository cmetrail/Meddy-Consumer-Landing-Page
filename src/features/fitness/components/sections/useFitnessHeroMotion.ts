"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useFitnessHeroMotion() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 768px)",
      mobile: "(max-width: 767px)",
      pointer: "(hover: hover) and (pointer: fine)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reduce) return;
      const root = sectionRef.current!;
      const select = gsap.utils.selector(root);
      const desktop = context.conditions?.desktop;
      const button = root.querySelector<HTMLButtonElement>("[data-fitness-button]")!;

      // Each transform has its own layer so scroll and pointer motion can overlap the entrance.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from(select("[data-fitness-reveal]"), {
        scale: 1.04, x: desktop ? 20 : 8, y: 12,
        transformOrigin: "70% 55%", duration: 0.7,
      }, 0)
        .from(select("[data-fitness-line]"), {
          yPercent: 35, rotationX: -10, autoAlpha: 0.6,
          transformOrigin: "50% 100%", stagger: 0.06,
          duration: 0.55, ease: "power4.out",
        }, 0)
        .from(select("[data-fitness-description]"), { y: 8, autoAlpha: 0.6, duration: 0.4 }, 0.1)
        .from(select("[data-fitness-cta]"), { y: 6, autoAlpha: 0.6, duration: 0.4 }, 0.2);

      const shine = gsap.fromTo(select("[data-fitness-shine]"), { xPercent: 0 }, {
        xPercent: 460, duration: 1.15, ease: "power2.inOut", paused: true,
      });
      intro.call(() => shine.restart(), [], 0.65);

      gsap.timeline({ scrollTrigger: {
        trigger: root, start: "top top", end: "bottom top", scrub: 1.2,
      } })
        .to(select("[data-fitness-depth]"), { y: desktop ? -90 : -35, ease: "none" }, 0)
        .to(select("[data-fitness-copy]"), { y: desktop ? -45 : -18, ease: "none" }, 0)
        .to(select("[data-fitness-glow]"), { opacity: 0.12, ease: "none" }, 0);

      const ambient = gsap.to(select("[data-fitness-glow]"), {
        scale: 1.06, xPercent: 2, duration: 6, repeat: -1, yoyo: true,
        ease: "sine.inOut", paused: true,
      });
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

      const pointerLayer = root.querySelector<HTMLElement>("[data-fitness-pointer]")!;
      const pointerEnabled = desktop && context.conditions?.pointer;
      const moveX = gsap.quickTo(pointerLayer, "x", { duration: 1.3, ease: "power3.out" });
      const moveY = gsap.quickTo(pointerLayer, "y", { duration: 1.3, ease: "power3.out" });
      const buttonY = gsap.quickTo(button, "y", { duration: 0.4, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        if (!pointerEnabled || event.pointerType !== "mouse") return;
        const bounds = root.getBoundingClientRect();
        moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 22);
        moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 14);
      };
      const reset = () => { moveX(0); moveY(0); };
      const enterButton = () => { buttonY(-3); shine.restart(); };
      const leaveButton = () => buttonY(0);
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", reset);
      button.addEventListener("pointerenter", enterButton);
      button.addEventListener("pointerleave", leaveButton);
      button.addEventListener("focus", enterButton);
      button.addEventListener("blur", leaveButton);

      return () => {
        document.removeEventListener("visibilitychange", syncMotion);
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", reset);
        button.removeEventListener("pointerenter", enterButton);
        button.removeEventListener("pointerleave", leaveButton);
        button.removeEventListener("focus", enterButton);
        button.removeEventListener("blur", leaveButton);
      };
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return sectionRef;
}
