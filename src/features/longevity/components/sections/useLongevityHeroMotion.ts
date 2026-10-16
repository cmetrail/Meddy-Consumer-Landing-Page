"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useLongevityHeroMotion(ready: boolean) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ready || !sectionRef.current) return;
    const root = sectionRef.current;
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 1024px)",
      mobile: "(max-width: 1023px)",
      pointer: "(hover: hover) and (pointer: fine)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reduce) return;
      const desktop = !!context.conditions?.desktop;
      const stage = root.querySelector<HTMLElement>(desktop ? "[data-lg-desktop]" : "[data-lg-mobile]")!;
      const select = gsap.utils.selector(stage);
      const photos = select("[data-lg-photo]");
      const depth = select("[data-lg-depth]");
      const floats = select("[data-lg-float]");
      const button = stage.querySelector<HTMLElement>("[data-lg-cta]")!;

      // Each effect owns its own wrapper, preserving the original photo geometry.
      gsap.set(photos, { transformPerspective: 1000, transformOrigin: "50% 50%" });
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from(photos, {
        autoAlpha: 0, scale: 0.82, y: desktop ? 65 : 24,
        rotationY: (i: number) => i % 2 ? -16 : 16,
        rotation: (i: number) => i % 2 ? 4 : -4,
        duration: 1.65, stagger: { each: 0.11, from: "center" },
      }, 0.05)
        .from(select("[data-lg-eyebrow]"), { y: 18, autoAlpha: 0, duration: 1 }, 0.28)
        .from(select("[data-lg-word]"), {
          yPercent: 65, rotationX: -35, autoAlpha: 0,
          transformPerspective: 900, transformOrigin: "50% 100%",
          duration: 1.25, stagger: 0.13,
        }, 0.45)
        .from(select("[data-lg-description]"), { y: 16, autoAlpha: 0, duration: 1.1 }, 0.88)
        .from(select("[data-lg-cta-reveal]"), { y: 14, scale: 0.94, autoAlpha: 0, duration: 0.9 }, 1.08);

      const ambient = gsap.timeline({ repeat: -1, yoyo: true, paused: true });
      floats.forEach((photo: HTMLElement, i: number) => {
        ambient.to(photo, {
          y: (i % 2 ? 1 : -1) * (desktop ? 8 : 4),
          rotation: (i % 2 ? -1 : 1) * 0.7,
          duration: 3.8 + i * 0.22, ease: "sine.inOut",
        }, i * 0.18);
      });

      let introDone = false;
      let inView = false;
      const syncPlayback = () => {
        const playing = inView && !document.hidden;
        intro.paused(!playing);
        ambient.paused(!playing || !introDone);
      };
      intro.eventCallback("onComplete", () => { introDone = true; syncPlayback(); });
      const observer = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        syncPlayback();
      });
      observer.observe(root);
      document.addEventListener("visibilitychange", syncPlayback);
      syncPlayback();

      depth.forEach((photo: HTMLElement, i: number) => {
        gsap.to(photo, {
          y: (i % 2 ? -1 : 1) * (desktop ? 65 + i * 9 : 16 + i * 3),
          ease: "none",
          scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.3 },
        });
      });

      const cleanups: (() => void)[] = [];
      if (desktop && context.conditions?.pointer) {
        const movers = select("[data-lg-pointer]").map((photo: HTMLElement, i: number) => ({
          x: gsap.quickTo(photo, "x", { duration: 1.4, ease: "power3.out" }),
          y: gsap.quickTo(photo, "y", { duration: 1.4, ease: "power3.out" }),
          tilt: gsap.quickTo(photo, "rotationY", { duration: 1.5, ease: "power3.out" }),
          amount: 12 + i * 3,
        }));
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const rect = stage.getBoundingClientRect();
          const x = gsap.utils.clamp(-0.5, 0.5, (event.clientX - rect.left) / rect.width - 0.5);
          const y = gsap.utils.clamp(-0.5, 0.5, (event.clientY - rect.top) / rect.height - 0.5);
          movers.forEach((mover) => { mover.x(x * mover.amount); mover.y(y * mover.amount); mover.tilt(x * 3); });
        };
        const reset = () => movers.forEach((mover) => { mover.x(0); mover.y(0); mover.tilt(0); });
        root.addEventListener("pointermove", move);
        root.addEventListener("pointerleave", reset);
        cleanups.push(() => {
          root.removeEventListener("pointermove", move);
          root.removeEventListener("pointerleave", reset);
        });
      }

      // Pre-created tweens also make repeated hover/focus interactions easy to revert.
      const hover = gsap.to(button, {
        scale: 1.035, boxShadow: "0 10px 28px rgba(23, 146, 90, 0.20)",
        duration: 0.35, ease: "power2.out", paused: true,
      });
      const enter = () => { hover.play(); };
      const leave = () => {
        if (!button.matches(":hover, :focus-visible")) hover.reverse();
      };
      button.addEventListener("pointerenter", enter);
      button.addEventListener("pointerleave", leave);
      button.addEventListener("focus", enter);
      button.addEventListener("blur", leave);

      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
        cleanups.forEach((cleanup) => cleanup());
        button.removeEventListener("pointerenter", enter);
        button.removeEventListener("pointerleave", leave);
        button.removeEventListener("focus", enter);
        button.removeEventListener("blur", leave);
      };
    });
    return () => media.revert();
  }, { scope: sectionRef, dependencies: [ready], revertOnUpdate: true });

  return sectionRef;
}
