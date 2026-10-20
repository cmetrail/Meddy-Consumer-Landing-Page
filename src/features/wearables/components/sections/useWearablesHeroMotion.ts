"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useWearablesHeroMotion() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 744px)",
      mobile: "(max-width: 743px)",
      pointer: "(hover: hover) and (pointer: fine)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reduce) return;
      const root = sectionRef.current!;
      const desktop = context.conditions?.desktop;
      const cluster = root.querySelector<HTMLElement>(desktop ? "[data-cluster-desktop]" : "[data-cluster-mobile]")!;
      const select = gsap.utils.selector(cluster);
      const copy = root.querySelectorAll("[data-hero-copy]");
      const intro = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

      intro.from(copy, {
        y: desktop ? 32 : 18, autoAlpha: 0,
        clipPath: "inset(0 0 100% 0)", stagger: 0.14,
      }, 0.12)
        .from(select("[data-phone]"), { y: 45, scale: 0.94, rotation: -5, autoAlpha: 0, duration: 1.6 }, 0.32)
        .from(select("[data-frame]"), { scaleY: 0, transformOrigin: "50% 0%", autoAlpha: 0, duration: 0.9 }, 0.65)
        .from(select("[data-handle]"), { scale: 0, autoAlpha: 0, stagger: 0.045, duration: 0.45 }, 1)
        .from(select("[data-device]"), { y: 22, scale: 0.82, autoAlpha: 0, stagger: 0.16, duration: 1.1 }, 0.9)
        .from(select("[data-ring]"), { scale: 0.8, autoAlpha: 0, stagger: 0.16 }, 1.05)
        .from(select("[data-connector]"), { strokeDashoffset: 1, stagger: 0.18, duration: 1, ease: "power2.inOut" }, 1.1)
        .from(root.querySelectorAll("[data-hero-brands]"), { y: 12, autoAlpha: 0, duration: 0.8 }, 1.65);

      // Independent layers keep the authored phone clipping and device angles intact.
      const ambient = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
      select("[data-device]").forEach((device: HTMLElement, index: number) => {
        ambient.to(device, { y: index % 2 ? 6 : -7, duration: 3.5 + index * 0.6, ease: "sine.inOut" }, 0);
      });
      const rings = select("[data-ring]").map((ring: HTMLElement, index: number) => gsap.to(ring, {
        rotation: index % 2 ? -360 : 360, duration: 65 + index * 12,
        ease: "none", repeat: -1, paused: true,
      }));
      let introDone = false;
      const syncAmbient = () => {
        const bounds = root.getBoundingClientRect();
        const play = introDone && !document.hidden && bounds.bottom > 0 && bounds.top < innerHeight;
        ambient.paused(!play);
        rings.forEach(ring => ring.paused(!play));
      };
      intro.eventCallback("onComplete", () => { introDone = true; syncAmbient(); });
      ScrollTrigger.create({ trigger: root, start: "top bottom", end: "bottom top", onToggle: syncAmbient });
      document.addEventListener("visibilitychange", syncAmbient);

      if (desktop) {
        gsap.to(cluster, {
          y: -65, ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.2 },
        });
      }

      // quickTo reuses tweens; no new animation is allocated per pointer event.
      const pointerLayer = cluster.querySelector<HTMLElement>("[data-pointer-layer]")!;
      const moveX = gsap.quickTo(pointerLayer, "x", { duration: 1.1, ease: "power3.out" });
      const moveY = gsap.quickTo(pointerLayer, "y", { duration: 1.1, ease: "power3.out" });
      const move = (event: PointerEvent) => {
        if (!desktop || !context.conditions?.pointer || event.pointerType !== "mouse") return;
        const rect = root.getBoundingClientRect();
        moveX(((event.clientX - rect.left) / rect.width - 0.5) * 16);
        moveY(((event.clientY - rect.top) / rect.height - 0.5) * 12);
      };
      const reset = () => { moveX(0); moveY(0); };
      root.addEventListener("pointermove", move);
      root.addEventListener("pointerleave", reset);
      return () => {
        document.removeEventListener("visibilitychange", syncAmbient);
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", reset);
      };
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return sectionRef;
}
