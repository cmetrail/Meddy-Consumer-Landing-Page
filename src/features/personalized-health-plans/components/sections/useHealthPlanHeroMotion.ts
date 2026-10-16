"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./PersonalizedHealthPlansHeroSection.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useHealthPlanHeroMotion() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 768px)",
      mobile: "(max-width: 767px)",
      pointer: "(hover: hover) and (pointer: fine)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      // The server-rendered composition is the accessible, static fallback.
      if (context.conditions?.reduce) return;
      const root = heroRef.current!;
      const select = gsap.utils.selector(root);
      const desktop = context.conditions?.desktop;
      const cta = root.querySelector<HTMLAnchorElement>("[data-plan-cta]")!;
      const pointerLayer = root.querySelector<HTMLElement>("[data-plan-pointer]")!;

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(select(`.${styles.grid}`), { autoAlpha: 0, scale: 1.04, duration: 1.8 }, 0)
        .from(select(`.${styles.portraitFrame}`), {
          autoAlpha: 0, clipPath: "inset(12% 0 0 0)", duration: 1.8,
        }, 0.08)
        .from(select(`.${styles.portrait}`), {
          scale: 1.045, transformOrigin: "50% 65%", duration: 2.2,
        }, 0.08)
        .from(select("[data-plan-line]"), {
          autoAlpha: 0, y: 30, rotationX: -12, transformPerspective: 900,
          transformOrigin: "0% 100%", clipPath: "inset(0 0 100% 0)",
          duration: 1.25, stagger: 0.18,
        }, 0.18)
        .from(select("[data-plan-reveal]"), {
          autoAlpha: 0, y: 18, duration: 1, stagger: 0.14,
        }, 0.65)
        .from(select(`.${styles.ellipseA}, .${styles.ellipseB}`), {
          autoAlpha: 0, scaleX: 0.8, duration: 1.5, ease: "power2.out",
        }, 0.45)
        .from(select(`.${styles.dots}`), { autoAlpha: 0, duration: 1.4 }, 0.7)
        .from(select("[data-plan-badge]"), {
          autoAlpha: 0, y: 24, scale: 0.92, duration: 1.1, stagger: 0.13,
        }, 1.05);

      // Float inside each badge so its entrance and idle transforms never compete.
      const ambient = gsap.timeline({ repeat: -1, yoyo: true });
      ambient.to(select("[data-plan-float]"), {
        y: (i) => i % 2 ? 7 : -9,
        rotation: (i) => i % 2 ? -1 : 1,
        duration: 3.6, stagger: { each: 0.35, from: "center" }, ease: "sine.inOut",
      }, 0).to(select("[data-plan-glow]"), {
        scale: 1.12, xPercent: 3, duration: 5, ease: "sine.inOut",
      }, 0);

      // Keep responsive scale, entrance, scroll, and pointer motion on separate layers.
      gsap.timeline({ scrollTrigger: {
        trigger: root, start: "top top", end: "bottom top", scrub: 1.1,
      } })
        .to(select("[data-plan-depth]"), { y: desktop ? -85 : -24, ease: "none" }, 0)
        .to(select("[data-plan-copy]"), { y: desktop ? -36 : -12, ease: "none" }, 0);

      const shine = gsap.to(select("[data-plan-shine]"), {
        xPercent: 460, duration: 1.05, ease: "power2.inOut", paused: true,
      });
      intro.call(() => shine.restart(), [], 1.6);

      const syncPlayback = () => {
        const bounds = root.getBoundingClientRect();
        const visible = !document.hidden && bounds.bottom > 0 && bounds.top < innerHeight;
        intro.paused(!visible);
        ambient.paused(!visible);
        if (!visible) shine.pause();
      };
      const observer = new IntersectionObserver(syncPlayback);
      observer.observe(root);
      document.addEventListener("visibilitychange", syncPlayback);
      syncPlayback();

      const moveX = gsap.quickTo(pointerLayer, "x", { duration: 1.4, ease: "power3.out" });
      const moveY = gsap.quickTo(pointerLayer, "y", { duration: 1.4, ease: "power3.out" });
      const buttonX = gsap.quickTo(cta, "x", { duration: 0.5, ease: "power3.out" });
      const buttonY = gsap.quickTo(cta, "y", { duration: 0.5, ease: "power3.out" });
      const pointerEnabled = desktop && context.conditions?.pointer;
      const move = (event: PointerEvent) => {
        if (!pointerEnabled || event.pointerType !== "mouse") return;
        const bounds = root.getBoundingClientRect();
        moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 20);
        moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
      };
      const reset = () => { moveX(0); moveY(0); };
      const moveButton = (event: PointerEvent) => {
        if (!pointerEnabled || event.pointerType !== "mouse") return;
        const bounds = cta.getBoundingClientRect();
        buttonX((event.clientX - bounds.left - bounds.width / 2) * 0.1);
        buttonY((event.clientY - bounds.top - bounds.height / 2) * 0.15 - 2);
      };
      const resetButton = () => { buttonX(0); buttonY(0); };
      const highlight = () => { if (!document.hidden) shine.restart(); };
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", reset);
      cta.addEventListener("pointermove", moveButton);
      cta.addEventListener("pointerleave", resetButton);
      cta.addEventListener("pointerenter", highlight);
      cta.addEventListener("focus", highlight);

      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", reset);
        cta.removeEventListener("pointermove", moveButton);
        cta.removeEventListener("pointerleave", resetButton);
        cta.removeEventListener("pointerenter", highlight);
        cta.removeEventListener("focus", highlight);
      };
    });
    return () => media.revert();
  }, { scope: heroRef });

  return heroRef;
}
