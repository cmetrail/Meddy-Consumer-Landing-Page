"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function usePhysicianHeroMotion() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 600px)",
      mobile: "(max-width: 599px)",
      pointer: "(hover: hover) and (pointer: fine)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reduce) return;
      const root = sectionRef.current!;
      const select = gsap.utils.selector(root);
      const desktop = context.conditions?.desktop;
      // Independent layers let entrance, pointer, and scroll transforms compose.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from(select("[data-care-word]"), {
        yPercent: 115, rotation: 3, autoAlpha: 0, duration: 1.25,
        stagger: 0.13, transformOrigin: "0% 100%",
      }, 0.15)
        .from(select("[data-care-subtitle]"), { y: 24, autoAlpha: 0, duration: 1.1 }, 0.45)
        .from(select("[data-care-description]"), { y: 20, autoAlpha: 0, duration: 1 }, 0.65)
        .from(select("[data-care-cta]"), { y: 18, autoAlpha: 0, duration: 0.9 }, 0.85)
        .from(select("[data-care-avatar]"), {
          y: 14, scale: 0.85, autoAlpha: 0, stagger: 0.09, duration: 0.7,
        }, 1.05)
        .from(select("[data-care-proof]"), { y: 12, autoAlpha: 0, duration: 0.8 }, 1.2);

        intro.from(select("[data-care-portrait]"), {
          autoAlpha: 0, y: 32, scale: 1.045, duration: 1.9,
          transformOrigin: "50% 100%",
        }, 0)
          .fromTo(select("[data-care-frame]"), { strokeDashoffset: 1 }, {
            strokeDashoffset: 0, duration: 1.65, ease: "power2.inOut",
          }, 0.35)
          .from(select("[data-care-pulse]"), { autoAlpha: 0, scale: 0.9, duration: 1 }, 1.1);

      const shine = gsap.fromTo(select("[data-care-shine]"), { xPercent: 0 }, {
        xPercent: 500, duration: 1.1, ease: "power2.inOut", paused: true,
      });
      intro.call(() => shine.restart(), [], 1.65);

      gsap.timeline({ scrollTrigger: {
        trigger: root, start: "top top", end: "bottom top", scrub: 1.1,
      } })
        .to(select("[data-care-copy]"), { y: desktop ? -42 : -18, ease: "none" }, 0)
        .to(select("[data-care-depth]"), { y: -75, ease: "none" }, 0);

      const heartbeat = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 3.8 })
        .to(select("[data-care-pulse]"), { scale: 1.055, duration: 0.22, ease: "sine.out" })
        .to(select("[data-care-pulse]"), { scale: 1, duration: 0.3, ease: "sine.inOut" })
        .to(select("[data-care-pulse]"), { scale: 1.035, duration: 0.2, ease: "sine.out" })
        .to(select("[data-care-pulse]"), { scale: 1, duration: 0.45, ease: "sine.inOut" });

      const syncMotion = () => {
        const bounds = root.getBoundingClientRect();
        const visible = !document.hidden && bounds.bottom > 0 && bounds.top < innerHeight;
        intro.paused(!visible);
        heartbeat.paused(!visible || !desktop || intro.progress() < 1);
        if (!visible) shine.pause();
      };
      intro.eventCallback("onComplete", syncMotion);
      ScrollTrigger.create({ trigger: root, start: "top bottom", end: "bottom top", onToggle: syncMotion });
      document.addEventListener("visibilitychange", syncMotion);
      syncMotion();

      const pointer = root.querySelector<HTMLElement>("[data-care-pointer]")!;
      const button = root.querySelector<HTMLButtonElement>("[data-care-button]")!;
      const moveX = gsap.quickTo(pointer, "x", { duration: 1.2, ease: "power3.out" });
      const moveY = gsap.quickTo(pointer, "y", { duration: 1.2, ease: "power3.out" });
      const buttonY = gsap.quickTo(button, "y", { duration: 0.4, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        if (!desktop || !context.conditions?.pointer || event.pointerType !== "mouse") return;
        const bounds = root.getBoundingClientRect();
        moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 18);
        moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
      };
      const reset = () => { moveX(0); moveY(0); };
      const enter = () => { buttonY(-3); shine.restart(); };
      const leave = () => buttonY(0);
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", reset);
      button.addEventListener("pointerenter", enter);
      button.addEventListener("pointerleave", leave);
      button.addEventListener("focus", enter);
      button.addEventListener("blur", leave);

      return () => {
        document.removeEventListener("visibilitychange", syncMotion);
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", reset);
        button.removeEventListener("pointerenter", enter);
        button.removeEventListener("pointerleave", leave);
        button.removeEventListener("focus", enter);
        button.removeEventListener("blur", leave);
      };
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return sectionRef;
}
