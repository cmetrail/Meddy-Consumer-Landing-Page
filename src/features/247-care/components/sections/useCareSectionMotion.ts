"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Section = "health" | "knows" | "access";

export function useCareSectionMotion(section: Section) {
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
      const select = gsap.utils.selector(root);
      const desktop = context.conditions?.desktop;
      const distance = desktop ? 28 : 12;
      // Keep triggers registered until context cleanup. With restored scroll,
      // once:true can remove a timeline's trigger while GSAP is refreshing the
      // next trigger, invalidating its internal iteration. "play" still leaves
      // each entrance at its completed state when scrolling back through it.
      const enter = (trigger: Element) => ({
        trigger, start: "top 92%", toggleActions: "play none none none",
      });

      // Separate triggers respect the access section's reordered mobile grid.
      select("[data-cs-reveal]").forEach((element: HTMLElement, index: number) => {
        gsap.from(element, {
          y: distance, opacity: 0, duration: 1.1, ease: "power3.out",
          delay: desktop ? index * .1 : 0, scrollTrigger: enter(element),
        });
      });

      if (section === "health") {
        gsap.from(select("[data-cs-health-line]"), {
          y: distance, opacity: 0, clipPath: "inset(0% 0% 100% 0%)",
          stagger: .16, duration: 1.2, ease: "power3.out",
          scrollTrigger: enter(root.querySelector("h2")!),
        });
        const portraits = select("[data-cs-portrait]");
        gsap.timeline({ scrollTrigger: enter(portraits[0]), defaults: { ease: "power3.out" } })
          .from(portraits, {
            y: distance, scale: 1.035, opacity: 0, stagger: .22,
            duration: 1.35, transformOrigin: "50% 100%",
          }, 0)
          .fromTo(select("[data-cs-timeline]"),
            { clipPath: "inset(0% 100% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.8, ease: "power2.inOut" }, .25)
          .from(select("[data-cs-icon]"), {
            opacity: 0, scale: .6, rotation: -20, duration: .7,
          }, 1.65);
      }

      if (section === "knows") {
        // Overscan keeps the edges covered while the photograph moves.
        gsap.fromTo(select("[data-cs-landscape]"),
          { scale: 1.07, yPercent: 1.5 },
          { scale: 1.025, yPercent: -1, ease: "none", scrollTrigger: {
            trigger: root, start: "top bottom", end: "bottom top", scrub: 1.4,
          } });
      }

      const cleanups: (() => void)[] = [];
      if (section === "access") {
        select("[data-cs-access-line]").forEach((line: HTMLElement, index: number) => {
          const timeline = gsap.timeline({ scrollTrigger: enter(line), defaults: { ease: "power3.out" } });
          timeline.from(line, {
            opacity: 0, y: distance, rotationX: desktop ? -12 : 0,
            transformPerspective: 1000, transformOrigin: "50% 100%",
            duration: 1.1, delay: desktop ? index * .1 : 0,
          }, 0);
          const photo = line.querySelector("img");
          if (photo) timeline.from(photo, { scale: 1.22, duration: 1.5 }, .1);
        });
        select("[data-cs-item]").forEach((item: HTMLElement, index: number) => {
          gsap.from(item, {
            opacity: 0, y: distance * .6, duration: .95, ease: "power3.out",
            delay: desktop ? index * .1 : 0, scrollTrigger: enter(item),
          });
        });
        select("[data-cs-rule]").forEach((rule: HTMLElement) => {
          gsap.from(rule, {
            scaleX: 0, transformOrigin: "0% 50%", duration: 1.3,
            ease: "power3.inOut", scrollTrigger: enter(rule),
          });
        });

        const button = root.querySelector<HTMLButtonElement>("[data-cs-cta]")!;
        const entrance = gsap.fromTo(button, { opacity: 0, y: distance }, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: enter(button),
        });
        const lift = gsap.fromTo(button, { y: 0 }, {
          y: -3, duration: .35, ease: "power2.out", paused: true, immediateRender: false,
        });
        const focus = () => {
          entrance.progress(1).pause();
          entrance.scrollTrigger?.kill(false, true);
          lift.play();
        };
        const hover = () => { if (context.conditions?.pointer && entrance.progress() === 1) lift.play(); };
        const reset = () => { if (document.activeElement !== button) lift.reverse(); };
        button.addEventListener("focus", focus);
        button.addEventListener("blur", reset);
        button.addEventListener("pointerenter", hover);
        button.addEventListener("pointerleave", reset);
        cleanups.push(() => {
          button.removeEventListener("focus", focus);
          button.removeEventListener("blur", reset);
          button.removeEventListener("pointerenter", hover);
          button.removeEventListener("pointerleave", reset);
        });
      }
      return () => cleanups.forEach(cleanup => cleanup());
    });
    return () => media.revert();
  }, { scope: sectionRef, dependencies: [section] });

  return sectionRef;
}
