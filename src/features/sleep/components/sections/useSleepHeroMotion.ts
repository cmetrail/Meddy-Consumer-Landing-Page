"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useSleepHeroMotion() {
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
      const select = <T extends HTMLElement>(name: string) =>
        gsap.utils.toArray<T>(`[data-sleep-${desktop ? "desktop" : "mobile"}] [data-${name}]`, root);
      const clouds = select("sleep-cloud");
      const metrics = select("sleep-metric");
      const intro = gsap.timeline({ defaults: { duration: 1.3, ease: "power3.out" } });

      intro.from(select("sleep-title"), { y: 24, autoAlpha: 0, stagger: 0.12 }, 0.12)
        .from(select("sleep-headline"), {
          y: desktop ? 30 : 16, clipPath: "inset(100% -10% -20% -10%)",
          autoAlpha: 0, duration: 1.65, ease: "power4.inOut",
        }, 0.2)
        .from(select("sleep-person-reveal"), {
          y: desktop ? 48 : 20, scale: 1.035, autoAlpha: 0,
          transformOrigin: "50% 80%", duration: 2,
        }, 0.25)
        .from(clouds, { y: desktop ? 30 : 12, autoAlpha: 0, duration: 1.8 }, 0.15)
        .from(select("sleep-description"), { y: 16, autoAlpha: 0 }, 0.7)
        .from(metrics, {
          y: 18, scale: 0.92, autoAlpha: 0, stagger: 0.18,
          duration: 1.1, ease: "back.out(1.1)",
        }, 1)
        .from(select("sleep-lines"), {
          scaleY: 0.4, autoAlpha: 0, transformOrigin: "50% 50%", duration: 1.2,
        }, 1.2);

      // Clouds remain direct siblings: wrapping the scene changes its screen blending.
      // Ambient x and entrance y are independent; metric float starts after entrance.
      const ambient = gsap.timeline({ paused: true });
      clouds.forEach((cloud, index) => {
        ambient.to(cloud, {
          x: (index % 2 ? -1 : 1) * (desktop ? 16 : 6),
          duration: 7 + (index % 4), ease: "sine.inOut", repeat: -1, yoyo: true,
        }, 0);
      });
      metrics.forEach((metric, index) => {
        ambient.fromTo(metric, { y: 0 }, {
          y: index % 2 ? 6 : -6, duration: 3.5 + index * 0.6,
          ease: "sine.inOut", repeat: -1, yoyo: true, immediateRender: false,
        }, 0);
      });

      let introDone = false;
      const syncMotion = () => {
        const bounds = root.getBoundingClientRect();
        const visible = !document.hidden && bounds.bottom > 0 && bounds.top < innerHeight;
        intro.paused(!visible);
        ambient.paused(!introDone || !visible);
      };
      intro.eventCallback("onComplete", () => { introDone = true; syncMotion(); });
      ScrollTrigger.create({ trigger: root, start: "top bottom", end: "bottom top", onToggle: syncMotion });
      document.addEventListener("visibilitychange", syncMotion);
      syncMotion();

      // Scroll moves the portrait's outer crop; entrance owns the inner image layer.
      gsap.to(select("sleep-person"), {
        y: desktop ? -65 : -20, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.4 },
      });

      const pointerTweens = desktop && context.conditions?.pointer
        ? metrics.map((metric, index) => ({
          move: gsap.quickTo(metric, "x", { duration: 1.4, ease: "power3.out" }),
          depth: 10 + index * 5,
        })) : [];
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const bounds = root.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        pointerTweens.forEach(({ move, depth }) => move(x * depth));
      };
      const reset = () => pointerTweens.forEach(({ move }) => move(0));
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
