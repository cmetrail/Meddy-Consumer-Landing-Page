"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useWearablesPlatformsMotion(ref: RefObject<HTMLElement | null>) {
  useGSAP(() => {
    const root = ref.current;
    if (!root) return;
    const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-platform-card]"));
    const media = gsap.matchMedia();

    media.add({
      showcase: "(min-width: 768px) and (min-height: 700px)",
      motion: "(prefers-reduced-motion: no-preference)",
    }, (context) => {
      if (!context.conditions?.motion) return;

      // Short viewports and touch phones keep the readable, native card flow.
      if (!context.conditions.showcase) {
        cards.forEach((card) => {
          const image = card.querySelector("[data-platform-image]");
          const copy = card.querySelector("[data-platform-copy]");
          gsap.timeline({
            scrollTrigger: { trigger: card, start: "top 90%", end: "top 22%", scrub: 0.7 },
          })
            .fromTo(card, { y: 36, scale: 0.96 }, { y: 0, scale: 1, ease: "power2.out", duration: 1 }, 0)
            .fromTo(image, { yPercent: 9, scale: 1.08, rotation: -3 }, { yPercent: 0, scale: 1, rotation: 0, duration: 1.2, ease: "power2.out" }, 0)
            .fromTo(copy, { y: 20, opacity: 0.45 }, { y: 0, opacity: 1, duration: 0.8 }, 0.15);
        });
        return;
      }

      root.setAttribute("data-platform-motion", "showcase");
      const stage = root.querySelector<HTMLElement>("[data-platform-stage]")!;
      const content = root.querySelector<HTMLElement>("[data-platform-pin]")!;
      const fills = root.querySelectorAll("[data-platform-fill]");
      const labels = root.querySelectorAll("[data-platform-label]");
      const images = cards.map(card => card.querySelector("[data-platform-image]"));
      const copies = cards.map(card => card.querySelector("[data-platform-copy]"));
      const gridWidth = () => (stage.clientWidth - 16) / 2;
      const gridHeight = () => (stage.clientHeight - 16) / 2;
      const gridLeft = (index: number) => index % 2 ? gridWidth() + 16 : 0;
      const gridTop = (index: number) => index > 1 ? gridHeight() + 16 : 0;

      gsap.set(labels, { opacity: 0.4 });
      const timeline = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          id: "wearables-platform-showcase",
          trigger: content,
          start: () => `top ${Math.max(24, (window.innerHeight - content.offsetHeight) / 2)}px`,
          end: () => `+=${window.innerHeight * 3.6}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      timeline.to({}, { duration: 0.3 });
      cards.forEach((card, index) => {
        const at = 0.3 + index * 1.8;
        timeline.set(card, { zIndex: index + 2 }, at)
          .to(cards.filter(other => other !== card), { opacity: 0, scale: 0.94, duration: 0.55 }, at)
          .to(card, { left: 0, top: 0, width: () => stage.clientWidth, height: () => stage.clientHeight, opacity: 1, scale: 1, duration: 0.85 }, at)
          .fromTo(images[index], { yPercent: 6, scale: 1.08, rotation: index % 2 ? 3 : -3 }, { yPercent: -2, scale: 1, rotation: 0, duration: 1.6, ease: "none" }, at)
          .fromTo(copies[index], { y: 16, opacity: 0.55 }, { y: 0, opacity: 1, duration: 0.75 }, at + 0.2)
          .to(labels, { opacity: 0.4, duration: 0.25 }, at)
          .to(labels[index], { opacity: 1, duration: 0.35 }, at + 0.1)
          .to(fills[index], { scaleX: 1, duration: 1.8, ease: "none" }, at);
      });
      // Close on the complete ecosystem, with no hidden cards left behind.
      cards.forEach((card, index) => {
        timeline.to(card, {
          left: () => gridLeft(index), top: () => gridTop(index),
          width: gridWidth, height: gridHeight,
          opacity: 1, scale: 1, duration: 0.9,
        }, 7.5);
      });
      timeline.to(images, { yPercent: 0, scale: 1, rotation: 0, duration: 0.9 }, 7.5)
        .to(labels, { opacity: 1, duration: 0.6 }, 7.5)
        .to({}, { duration: 0.35 });

      return () => root.removeAttribute("data-platform-motion");
    });
    return () => media.revert();
  }, { scope: ref });
}
