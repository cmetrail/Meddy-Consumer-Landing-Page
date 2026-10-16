"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useNutritionHeroMotion() {
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
      const desktop = context.conditions?.desktop;
      const stage = root.querySelector<HTMLElement>(desktop ? "[data-nutrition-desktop]" : "[data-nutrition-mobile]")!;
      const select = gsap.utils.selector(stage);
      const food = select("[data-food]");
      const chips = select("[data-nutrient]");
      const float = select("[data-float]");
      const pointer = select("[data-pointer]");
      const letters = gsap.utils.toArray<SVGPathElement>(stage.querySelectorAll("[data-headline] [data-letter]"));

      // Keep the original outlined lettering; each SVG path is one xylophone key.
      gsap.set(letters, { transformOrigin: "50% 90%" });

      // Separate entrance, float, pointer and scroll layers never compete for transforms.
      gsap.set(food, { transformPerspective: 1100, transformOrigin: "50% 85%" });
      const intro = gsap.timeline({ defaults: { duration: 1.25, ease: "power3.out" } });
      intro.from(select("[data-title-copy]"), { y: 20, autoAlpha: 0, stagger: 0.1 }, 0.1)
        .from(letters, {
          yPercent: 55, scaleY: 0.7,
          rotation: (index: number) => index % 2 ? 6 : -6,
          autoAlpha: 0, stagger: 0.085, duration: 1.35,
          ease: "elastic.out(1, 0.45)",
        }, 0.15)
        .from(select("[data-shadow]"), { scale: 0.72, autoAlpha: 0, transformOrigin: "50% 50%" }, 0.55)
        .from(food, {
          y: desktop ? 85 : 40, rotation: -5, rotationY: -12,
          scale: 0.91, autoAlpha: 0, duration: 1.85,
        }, 0.4)
        .from(chips, {
          y: 18, scale: 0.88, autoAlpha: 0, stagger: 0.13,
          duration: 0.85, ease: "back.out(1.15)",
        }, 1.1)
        .from(select("[data-hero-copy]"), { y: 20, autoAlpha: 0, duration: 1 }, 0.85)
        .from(select("[data-step]"), { x: 22, autoAlpha: 0, stagger: 0.16, duration: 1 }, 1);

      const ambient = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
      ambient.to(float, { y: desktop ? -9 : -5, rotation: 0.6, duration: 4.2, ease: "sine.inOut" }, 0);
      chips.forEach((chip: HTMLElement, index: number) => {
        ambient.to(chip, { y: index % 2 ? 4 : -5, duration: 3.2 + index * 0.35, ease: "sine.inOut" }, index * 0.12);
      });
      ambient.to(select("[data-shadow]"), { scaleX: 0.96, opacity: 0.8, duration: 4.2, ease: "sine.inOut" }, 0);

      const xylophone = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 3.8 });
      letters.forEach((letter: SVGPathElement, index: number) => {
        const strike = index * 0.085;
        const lift = 22 - index * 0.8;
        xylophone
          .to(letter, { yPercent: 5, scaleY: 0.92, scaleX: 1.025, duration: 0.09, ease: "power2.in" }, strike)
          .to(letter, {
            yPercent: -lift, scaleY: 1.035, scaleX: 0.99,
            rotation: index % 2 ? 2 : -2, duration: 0.2, ease: "power2.out",
          }, strike + 0.09)
          .to(letter, {
            yPercent: 0, scaleY: 1, scaleX: 1, rotation: 0,
            duration: 1.05, ease: "elastic.out(1, 0.32)",
          }, strike + 0.29);
      });

      let introDone = false;
      const syncMotion = () => {
        const bounds = root.getBoundingClientRect();
        const visible = !document.hidden && bounds.bottom > 0 && bounds.top < innerHeight;
        ambient.paused(!introDone || !visible);
        xylophone.paused(!introDone || !visible);
        intro.paused(!visible);
      };
      intro.eventCallback("onComplete", () => { introDone = true; syncMotion(); });
      ScrollTrigger.create({ trigger: root, start: "top bottom", end: "bottom top", onToggle: syncMotion });
      document.addEventListener("visibilitychange", syncMotion);
      syncMotion();

      gsap.to(select("[data-depth]"), {
        y: desktop ? -95 : -30, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.2 },
      });

      const moveX = gsap.quickTo(pointer, "x", { duration: 1.25, ease: "power3.out" });
      const moveY = gsap.quickTo(pointer, "y", { duration: 1.25, ease: "power3.out" });
      const tilt = gsap.quickTo(pointer, "rotation", { duration: 1.5, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        if (!desktop || !context.conditions?.pointer || event.pointerType !== "mouse") return;
        const bounds = root.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        moveX(x * 20);
        moveY(y * 14);
        tilt(x * 1.2);
      };
      const reset = () => { moveX(0); moveY(0); tilt(0); };
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", reset);

      return () => {
        document.removeEventListener("visibilitychange", syncMotion);
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", reset);
      };
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return sectionRef;
}
