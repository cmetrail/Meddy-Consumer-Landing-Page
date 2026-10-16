"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Each visual owns a separate layer from its entrance and hover motion. */
export function useBiomarkersMotion(rootRef: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia();

    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 1024px) and (pointer: fine)",
    }, (context) => {
      if (!context.conditions?.motion) return;
      const desktop = Boolean(context.conditions.desktop);
      const select = gsap.utils.selector(root);
      const visible = (selector: string) => select<HTMLElement>(selector)
        .filter((element) => element.getClientRects().length > 0);
      const entrances = new Map<HTMLElement, gsap.core.Animation>();
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      const hero = root.querySelector<HTMLElement>("[data-bio-hero]");

      // The navigation stays available while the editorial content arrives.
      visible("[data-bio-intro]").forEach((element, index) => {
        intro.from(element, {
          opacity: 0, y: desktop ? 38 : 20, duration: 1.15,
        }, 0.15 + index * 0.13);
        entrances.set(element, intro);
      });
      intro.from(select("[data-bio-hero-image]"), {
        scale: 1.08, duration: 1.9, ease: "power2.out",
      }, 0);

      visible("[data-bio-reveal]").forEach((element) => {
        // Restored scroll positions and anchor jumps must keep earlier copy visible.
        if (element.getBoundingClientRect().bottom <= 0) return;
        const animation = gsap.from(element, {
          opacity: 0, y: desktop ? 36 : 20, duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        });
        entrances.set(element, animation);
      });

      visible("[data-bio-cards]").forEach((track) => {
        const cards = track.querySelectorAll<HTMLElement>("[data-bio-card]");
        const animation = gsap.from(cards, {
          opacity: 0, y: desktop ? 38 : 18, duration: 0.85,
          stagger: { each: 0.08, amount: Math.min(cards.length * 0.08, 0.55) },
          ease: "power3.out",
          scrollTrigger: { trigger: track, start: "top 96%", once: true },
        });
        cards.forEach((card) => entrances.set(card, animation));
      });

      if (desktop) {
        if (hero) gsap.to(select("[data-bio-hero-image]"), {
          yPercent: 8, ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1.2 },
        });
        visible("[data-bio-parallax]").forEach((image) => {
          gsap.fromTo(image, { yPercent: -3, scale: 1.06 }, {
            yPercent: 3, scale: 1.02, ease: "none",
            scrollTrigger: {
              trigger: image.closest("section"), start: "top bottom", end: "bottom top",
              scrub: 1.4, invalidateOnRefresh: true,
            },
          });
        });
      }

      // Animate an inner layer so carousel snapping and existing artwork crops stay intact.
      const removeListeners: (() => void)[] = [];
      if (desktop) visible("[data-bio-hover]").forEach((element) => {
        const layer = element.querySelector<HTMLElement>("[data-bio-hover-layer]");
        if (!layer) return;
        const hover = gsap.to(layer, {
          scale: 1.035, duration: 0.65, ease: "power2.out", paused: true,
        });
        const enter = () => hover.play();
        const leave = () => hover.reverse();
        element.addEventListener("pointerenter", enter);
        element.addEventListener("pointerleave", leave);
        removeListeners.push(() => {
          element.removeEventListener("pointerenter", enter);
          element.removeEventListener("pointerleave", leave);
        });
      });

      const onFocus = (event: FocusEvent) => {
        if (!(event.target instanceof Node)) return;
        entrances.forEach((animation, element) => {
          if (element.contains(event.target as Node)) animation.progress(1);
        });
      };
      root.addEventListener("focusin", onFocus);
      let disposed = false;
      const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
      const frame = requestAnimationFrame(refresh);
      void document.fonts.ready.then(refresh);
      root.addEventListener("load", refresh, true);
      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        root.removeEventListener("load", refresh, true);
        root.removeEventListener("focusin", onFocus);
        removeListeners.forEach((remove) => remove());
      };
    });
    return () => media.revert();
  }, { scope: rootRef });
}
