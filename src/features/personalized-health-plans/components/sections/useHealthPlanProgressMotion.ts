"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useHealthPlanProgressMotion(ready: boolean, mobile: boolean, loopWidth: number) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ready) return;
    const media = gsap.matchMedia();
    media.add({
      all: "all",
      pointer: "(hover: hover) and (pointer: fine)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reduce) return;
      const root = sectionRef.current!;
      const select = gsap.utils.selector(root);
      const stage = root.querySelector<HTMLElement>("[data-progress-stage]")!;
      const track = root.querySelector<HTMLElement>("[data-progress-track]")!;

      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: select("[data-progress-heading]")[0], start: "top 88%", once: true },
      }).from(select("[data-progress-heading]"), {
        autoAlpha: 0, y: 28, rotationX: -12, transformPerspective: 900,
        transformOrigin: "0% 100%", duration: 1.2,
      }, 0);
      gsap.from(select("[data-progress-copy] > p"), {
        autoAlpha: 0, y: 22, duration: 1.05, stagger: 0.16, ease: "power3.out",
        scrollTrigger: { trigger: select("[data-progress-copy]")[0], start: "top 90%", once: true },
      });

      const entrance = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: stage, start: "top 95%", once: true },
      });
      entrance.from(select("[data-progress-card]"), {
        autoAlpha: 0, y: mobile ? 28 : 55, rotation: (i) => i % 2 ? 2 : -2,
        scale: 0.96, duration: 1.25,
        stagger: (i) => (i % 6) * 0.085,
      }, 0).from(select("[data-progress-phone-reveal]"), {
        autoAlpha: 0, y: mobile ? 48 : 90, rotation: 4, scale: 0.96,
        transformOrigin: "50% 100%", duration: 1.8,
      }, 0.16).from(select("[data-progress-curve]"), {
        clipPath: "inset(0 100% 0 0)", duration: 1.5, ease: "power2.inOut",
      }, 0.4).from(select("[data-progress-area]"), {
        scaleY: 0, autoAlpha: 0, transformOrigin: "50% 100%", duration: 1.3,
      }, 0.5).from(select("[data-progress-bar]"), {
        scaleY: 0, transformOrigin: "50% 100%", duration: 1.1, stagger: 0.025,
      }, 0.5).from(select("[data-progress-nutrient]"), {
        scaleY: 0, transformOrigin: "50% 100%", duration: 0.85,
        stagger: (i) => (i % 50) * 0.008,
      }, 0.6).from(select("[data-progress-dot], [data-progress-tooltip]"), {
        autoAlpha: 0, y: 5, duration: 0.7, stagger: 0.04,
      }, 1.2);

      // Move exactly one complete set, including its gap, for a seamless loop.
      const marquee = gsap.to(track, {
        x: -loopWidth, duration: 55, ease: "none", repeat: -1, paused: true,
      });
      const glow = gsap.to(select("[data-progress-glow]"), {
        scale: 1.1, opacity: 0.65, duration: 5, repeat: -1,
        yoyo: true, ease: "sine.inOut", paused: true,
      });
      gsap.fromTo(select("[data-progress-phone-depth]"), {
        y: mobile ? 8 : 20,
      }, {
        y: mobile ? -6 : -16, ease: "none",
        scrollTrigger: { trigger: stage, start: "top bottom", end: "bottom top", scrub: 1.2 },
      });

      const syncPlayback = () => {
        const bounds = stage.getBoundingClientRect();
        const visible = !document.hidden && bounds.bottom > 0 && bounds.top < innerHeight;
        marquee.paused(!visible);
        glow.paused(!visible);
      };
      const observer = new IntersectionObserver(syncPlayback);
      observer.observe(stage);
      document.addEventListener("visibilitychange", syncPlayback);
      syncPlayback();

      // Slow the dashboard when inspected; pointer depth lives inside the responsive phone scale.
      const speed = gsap.quickTo(marquee, "timeScale", { duration: 0.8, ease: "power2.out" });
      const slow = () => speed(0.25);
      const resume = () => speed(1);
      stage.addEventListener("pointerenter", slow);
      stage.addEventListener("pointerleave", resume);

      const pointer = root.querySelector<HTMLElement>("[data-progress-phone-pointer]")!;
      const moveX = gsap.quickTo(pointer, "x", { duration: 1.3, ease: "power3.out" });
      const moveY = gsap.quickTo(pointer, "y", { duration: 1.3, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        if (mobile || !context.conditions?.pointer || event.pointerType !== "mouse") return;
        const bounds = root.getBoundingClientRect();
        moveX(((event.clientX - bounds.left) / bounds.width - 0.5) * 14);
        moveY(((event.clientY - bounds.top) / bounds.height - 0.5) * 10);
      };
      const reset = () => { moveX(0); moveY(0); };
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", reset);

      // React updates the fixed artwork's scale at the desktop/mobile breakpoint.
      // Measure triggers after that layout has been painted, including restored motion.
      const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        cancelAnimationFrame(refreshFrame);
        observer.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
        stage.removeEventListener("pointerenter", slow);
        stage.removeEventListener("pointerleave", resume);
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", reset);
      };
    });
    return () => media.revert();
  }, { scope: sectionRef, dependencies: [ready, mobile, loopWidth], revertOnUpdate: true });

  return sectionRef;
}
