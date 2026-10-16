"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Page choreography owns photos and copy; metric components own their charts. */
export function useHowItWorksStory(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const root = scope.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 1024px) and (pointer: fine)", roomy: "(min-height: 800px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      if (!context.conditions?.motion) return;
      const desktop = !!context.conditions.desktop;
      const select = gsap.utils.selector(root);
      const chapter = (name: string) => root.querySelector<HTMLElement>(`[data-story-chapter="${name}"]`)!;

      const hero = chapter("hero");
      const title = select("[data-story-hero-title] > span");
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(title, { yPercent: 35, autoAlpha: 0, rotationX: desktop ? -12 : 0, transformPerspective: 1000, stagger: 0.14, duration: 1.15 })
        .from(select("[data-story-hero-photo]"), { scale: 1.06, duration: 1.7 }, 0)
        .from(hero.querySelector("[data-story-reveal]"), { autoAlpha: 0, y: 24, duration: 0.85 }, 0.55);

      gsap.to(select("[data-story-hero-photo]"), { y: desktop ? 85 : 25, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(select("[data-story-pattern]"), { y: desktop ? -65 : -20, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1.3 } });

      // Reversible depth on each photographic scene keeps the story connected.
      select("[data-story-photo]").forEach((photo: HTMLElement) => {
        gsap.fromTo(photo, { y: desktop ? -28 : -10, scale: 1.07 }, {
          y: desktop ? 28 : 10, scale: 1.01, ease: "none",
          scrollTrigger: { trigger: photo.closest("section"), start: "top bottom", end: "bottom top", scrub: 1.2 },
        });
      });

      const track = chapter("track");
      gsap.from(select("[data-story-track-title] > span"), {
        autoAlpha: 0, y: 36, stagger: 0.14, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: track, start: "top 78%", once: true },
      });
      gsap.from(select("[data-story-tabs] > button"), {
        autoAlpha: 0, x: -24, stagger: 0.1, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: select("[data-story-daily-card]")[0], start: "top 90%", once: true },
      });
      gsap.from(select("[data-story-panel]"), {
        autoAlpha: 0, y: 32, rotationY: desktop ? -8 : 0, transformPerspective: 1000, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: select("[data-story-daily-card]")[0], start: "top 90%", once: true },
      });

      select("[data-story-reveal]").filter((el: HTMLElement) => !hero.contains(el)).forEach((el: HTMLElement) => {
        gsap.from(el, { autoAlpha: 0, y: 28, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 94%", once: true } });
      });

      const plan = chapter("plan");
      gsap.from(select("[data-story-portrait]"), { scale: 1.08, ease: "none",
        scrollTrigger: { trigger: plan, start: "top bottom", end: "bottom top", scrub: 1.2 } });
      // Hold only when the complete plan and CTA fit on screen.
      if (desktop && context.conditions.roomy && plan.offsetHeight <= window.innerHeight + 1) {
        ScrollTrigger.create({ trigger: plan, start: "top top", end: "+=35%", pin: true, anticipatePin: 1, refreshPriority: 1 });
      }
      gsap.fromTo(select("[data-story-landscape]"), { scale: 1.06, y: -15 }, {
        scale: 1, y: 15, ease: "none", scrollTrigger: { trigger: chapter("progress"), start: "top bottom", end: "bottom top", scrub: 1.3 },
      });
      gsap.from(select("[data-story-footer-photo]"), { scale: 1.08, y: -25, ease: "none",
        scrollTrigger: { trigger: chapter("footer"), start: "top bottom", end: "bottom bottom", scrub: 1.4 } });

      // Images/fonts can change section geometry after hydration, including on touch.
      let disposed = false;
      const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
      const images = Array.from(root.querySelectorAll("img")).filter(img => !img.complete);
      images.forEach(img => img.addEventListener("load", refresh, { once: true }));
      document.fonts.ready.then(refresh);
      const frame = requestAnimationFrame(refresh);
      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        images.forEach(img => img.removeEventListener("load", refresh));
      };
    });
    return () => media.revert();
  }, { scope });
}
