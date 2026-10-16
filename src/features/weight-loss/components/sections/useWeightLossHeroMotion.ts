"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useWeightLossHeroMotion() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = heroRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    }, (context) => {
      if (!context.conditions?.motion) return;
      const desktop = Boolean(context.conditions.desktop);
      const select = gsap.utils.selector(root);
      const visible = (selector: string) => select<HTMLElement>(selector)
        .filter((element) => element.getClientRects().length > 0);
      const rings = visible("[data-wl-ring]");
      const photos = visible("[data-wl-photo]");
      const cta = select<HTMLAnchorElement>("[data-wl-cta]")[0];

      // All text remains in the document, with masks only on its visual wrappers.
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro.from(photos, {
        scale: desktop ? 1.065 : 1.025, duration: 2.2, ease: "power2.out",
        transformOrigin: "70% 50%",
      }, 0)
        .from(select("[data-wl-line]"), {
          yPercent: 105, rotation: desktop ? 1.5 : 0,
          transformOrigin: "0% 100%", duration: 1.25, stagger: 0.16,
        }, 0.15)
        .from(select("[data-wl-reveal]"), {
          opacity: 0, y: desktop ? 22 : 14, duration: 1, stagger: 0.17,
        }, 0.65)
        .from(rings, {
          opacity: 0, scale: 0.65, duration: 1.4, stagger: 0.16,
        }, 0.5);

      // Entrance, floating, and pointer transforms each have their own ring layer.
      const ambient = gsap.to(visible("[data-wl-float]"), {
        y: (index) => (index % 2 ? 1 : -1) * (desktop ? 10 : 5),
        rotation: (index) => index % 2 ? 8 : -6,
        duration: 3.8, stagger: 0.3, ease: "sine.inOut", repeat: -1, yoyo: true,
        paused: true,
      });
      const shine = gsap.fromTo(select("[data-wl-shine]"), { xPercent: -150, opacity: 1 }, {
        xPercent: 450, duration: 1.1, ease: "power2.inOut", paused: true,
      });
      const highlight = () => { if (!document.hidden) shine.restart(); };
      intro.call(highlight, [], 1.5);

      if (desktop) {
        gsap.timeline({ scrollTrigger: {
          trigger: root, start: "top top", end: "bottom top", scrub: 1.2,
        } })
          .to(photos, { yPercent: 7, ease: "none" }, 0)
          .to(select("[data-wl-copy]"), { y: -28, ease: "none" }, 0);
      }

      const syncPlayback = () => {
        const bounds = root.getBoundingClientRect();
        const active = !document.hidden && bounds.bottom > 0 && bounds.top < innerHeight;
        intro.paused(!active);
        ambient.paused(!active);
        if (!active) shine.pause();
      };
      const observer = new IntersectionObserver(syncPlayback);
      observer.observe(root);
      document.addEventListener("visibilitychange", syncPlayback);
      syncPlayback();

      const listeners: (() => void)[] = [];
      const listen = (element: HTMLElement, name: string, handler: EventListener) => {
        element.addEventListener(name, handler);
        listeners.push(() => element.removeEventListener(name, handler));
      };
      // Focus never has to wait for the reveal before the consultation link is visible.
      listen(cta, "focus", () => { intro.progress(1); highlight(); });
      listen(cta, "pointerenter", highlight);
      if (desktop) {
        const layers = visible("[data-wl-pointer]").map((layer, index) => ({
          x: gsap.quickTo(layer, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(layer, "y", { duration: 1.2, ease: "power3.out" }),
          depth: [14, -20, 10][index % 3],
        }));
        listen(root, "pointermove", (event) => {
          const pointer = event as PointerEvent;
          if (pointer.pointerType !== "mouse") return;
          const bounds = root.getBoundingClientRect();
          const x = (pointer.clientX - bounds.left) / bounds.width - 0.5;
          const y = (pointer.clientY - bounds.top) / bounds.height - 0.5;
          layers.forEach((layer) => { layer.x(x * layer.depth); layer.y(y * layer.depth); });
        });
        listen(root, "pointerleave", () => layers.forEach((layer) => { layer.x(0); layer.y(0); }));
        const hover = gsap.to(cta, {
          scale: 1.025, boxShadow: "0 8px 28px rgba(0,0,0,0.16)",
          duration: 0.4, ease: "power2.out", paused: true,
        });
        listen(cta, "pointerenter", () => hover.play());
        listen(cta, "pointerleave", () => hover.reverse());
        listen(cta, "focus", () => hover.play());
        listen(cta, "blur", () => hover.reverse());
      }

      let disposed = false;
      const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
      const frame = requestAnimationFrame(refresh);
      void document.fonts.ready.then(refresh);
      root.addEventListener("load", refresh, true);
      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        observer.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
        root.removeEventListener("load", refresh, true);
        listeners.forEach((remove) => remove());
      };
    });
    return () => media.revert();
  }, { scope: heroRef });

  return heroRef;
}
