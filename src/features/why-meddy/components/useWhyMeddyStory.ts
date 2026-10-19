"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, createScrollRefresh } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** One owner for page motion: native scroll, reversible scenes, scoped cleanup. */
export function useWhyMeddyStory(scope: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const root = scope.current;
    if (!root) return;
    const media = gsap.matchMedia();

    media.add({
      desktop: "(min-width: 1024px) and (pointer: fine)",
      mobile: "(max-width: 767px)",
      tall: "(min-height: 1100px)",
      motion: "(prefers-reduced-motion: no-preference)",
    }, context => {
      if (!context.conditions?.motion) return;
      const desktop = !!context.conditions.desktop;
      const mobile = !!context.conditions.mobile;
      const select = gsap.utils.selector(root);
      const chapter = (name: string) => root.querySelector<HTMLElement>(`[data-why-chapter="${name}"]`)!;
      const reveal = (targets: gsap.TweenTarget, trigger: Element, stagger = 0.12) => gsap.from(targets, {
        autoAlpha: 0, y: desktop ? 38 : 22, duration: 1, stagger,
        ease: "power3.out", scrollTrigger: { trigger, start: "top 90%", once: true },
      });

      gsap.to(select("[data-why-progress]"), {
        scaleX: 1, ease: "none",
        scrollTrigger: { trigger: root, start: "top top", end: "bottom bottom", scrub: 0.25 },
      });

      // 01 — Open on everyday life, then let the photograph carry us forward.
      const hero = chapter("hero");
      const heroPhoto = select("[data-why-hero-photo]");
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(heroPhoto, { scale: 1.09, duration: 1.8 }, 0)
        .from(select("[data-why-title] > *"), {
          yPercent: 65, autoAlpha: 0, clipPath: "inset(0 0 100% 0)",
          rotationX: desktop ? -14 : 0, transformPerspective: 1000,
          stagger: 0.13, duration: 1.15,
        }, 0.12)
        .from(select("[data-why-hero-copy]"), { y: 22, autoAlpha: 0, duration: 1 }, 0.8);
      gsap.to(heroPhoto, {
        yPercent: desktop ? 12 : 4, ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1.2 },
      });
      gsap.to(select("[data-why-title]"), {
        y: desktop ? -65 : -20, ease: "none",
        scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
      });

      select("[data-why-heading], [data-why-copy]").forEach((el: HTMLElement) => reveal(el, el));

      // 02 — Separate daily signals gather into a shared clinical context.
      const habits = chapter("habits");
      if (mobile) {
        const photos = select("[data-why-habits-mobile] img");
        gsap.from(photos, {
          x: (i: number) => (i - 2) * 23, y: (i: number) => i % 2 ? 55 : -35,
          autoAlpha: 0, scale: 0.87, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: select("[data-why-habits-mobile]")[0], start: "top 92%", end: "center 57%", scrub: 0.7 },
        });
      } else {
        gsap.from(select("[data-why-habits-desktop]"), {
          scale: 0.84, y: 70, rotation: -3, autoAlpha: 0,
          clipPath: "inset(8% 12% 8% 12% round 24px)", ease: "power2.out",
          scrollTrigger: { trigger: habits, start: "top 80%", end: "center 52%", scrub: 1 },
        });
      }

      // 03 — The scattered fragments resolve into the complete Meddy picture.
      const picture = chapter("picture");
      const collage = select(mobile ? "[data-why-picture-mobile]" : "[data-why-picture-desktop]")[0] as HTMLElement;
      const tiles = mobile
        ? Array.from(collage.children)
        : select("[data-why-tile]");
      const assembly = gsap.timeline({
        scrollTrigger: {
          trigger: collage, start: "top 88%", end: "center 52%", scrub: 1.1,
          invalidateOnRefresh: true,
        },
      });
      tiles.forEach((tile: Element, i: number) => {
        // Move outwards from the mark's center; bounded distances keep touch calm.
        const element = tile as HTMLElement;
        const x = element.offsetLeft + element.offsetWidth / 2 < collage.offsetWidth / 2 ? -1 : 1;
        assembly.from(tile, {
          x: x * (desktop ? 160 : 30), y: (i % 2 ? 1 : -1) * (desktop ? 95 : 26),
          rotation: (i % 2 ? 1 : -1) * (desktop ? 9 : 3),
          scale: 0.78, autoAlpha: 0, duration: 1.3, ease: "power3.out",
        }, i * 0.055);
      });
      // A brief editorial hold is available only when the whole composition fits.
      if (desktop && context.conditions.tall && picture.offsetHeight < window.innerHeight * 0.94) {
        ScrollTrigger.create({
          trigger: picture, start: "center center", end: "+=28%", pin: true,
          anticipatePin: 1, invalidateOnRefresh: true,
        });
      }

      // 04 — Context becomes a sequence of care principles, like framed posters.
      const posters = select("[data-why-posters] > div");
      posters.forEach((poster: HTMLElement, i: number) => {
        gsap.from(poster, {
          autoAlpha: 0, y: desktop ? 95 : 35, rotationY: desktop ? -18 : 0,
          rotation: desktop ? (i % 2 ? 3 : -3) : 0,
          transformPerspective: 1100, transformOrigin: "50% 100%", ease: "power2.out",
          scrollTrigger: { trigger: poster, start: "top 94%", end: "top 56%", scrub: 0.8 },
        });
      });
      // Explicit end values avoid inheriting the poster's initial hidden state.
      gsap.fromTo(select("[data-why-context]"), { autoAlpha: 0.18, x: -9 }, {
        autoAlpha: 1, x: 0, stagger: 0.08, ease: "none",
        scrollTrigger: { trigger: posters[1], start: "top 76%", end: "center 48%", scrub: 0.6 },
      });

      // 05 — Resolve on a human conversation, with the action arriving last.
      const closingScene = select("[data-why-closing-scene]")[0];
      const closingCopy = select("[data-why-closing-copy]")[0] as HTMLElement;
      reveal(Array.from(closingCopy.children), closingScene, 0.16);
      gsap.fromTo(select("[data-why-closing-scene] > img"), { scale: 1.07 }, {
        scale: 1, ease: "none",
        scrollTrigger: { trigger: closingScene, start: "top bottom", end: "bottom 35%", scrub: 1.2 },
      });
      // Animate descendants because the shared footer fixes its outer transforms.
      select("[data-footer-brand] > *, [data-footer-col] > a, [data-footer-mobile-nav] > a").forEach((el: HTMLElement) => {
        reveal(el, el, 0);
      });
      gsap.from(select("[data-footer-divider]"), {
        scaleX: 0, transformOrigin: "left", duration: 1.2, ease: "power2.inOut",
        scrollTrigger: { trigger: select("[data-footer-divider]")[0], start: "top 97%", once: true },
      });

      // Lazy images and web fonts affect trigger geometry. Keep cleanup route-local.
      const { refresh, dispose } = createScrollRefresh();
      const images = Array.from(root.querySelectorAll("img")).filter(img => !img.complete);
      images.forEach(img => img.addEventListener("load", refresh, { once: true }));
      document.fonts.ready.then(refresh);
      const frame = requestAnimationFrame(refresh);
      return () => {
        dispose();
        cancelAnimationFrame(frame);
        images.forEach(img => img.removeEventListener("load", refresh));
      };
    });

    return () => media.revert();
  }, { scope });
}
