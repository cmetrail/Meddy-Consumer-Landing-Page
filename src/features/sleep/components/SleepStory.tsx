"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CHAPTERS = [
  "sleep-quality",
  "sleep-architecture",
  "sleep-consistency",
  "sleep-recovery-score",
  "sleep-recovery",
];

export default function SleepStory({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 1024px) and (pointer: fine)",
      pin: "(min-width: 1024px) and (min-height: 700px) and (pointer: fine)",
      mobile: "(max-width: 1023px), (pointer: coarse)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      const root = rootRef.current!;
      const reduced = context.conditions?.reduce;
      const desktop = context.conditions?.desktop;
      // Only animate the rendered layout, including the recovery section's md breakpoint.
      const visible = (section: HTMLElement, selector: string) =>
        gsap.utils.toArray<HTMLElement>(selector, section).filter(el => el.getClientRects().length > 0);
      const chapters = CHAPTERS.map(id => root.querySelector<HTMLElement>(`#${id}`)!);

      if (!reduced) {
        const rhythm = chapters[2];
        const pinShell = rhythm.closest<HTMLElement>("[data-story-pin-shell]")!;
        const panels = visible(rhythm, "[data-story-panel]");
        if (context.conditions?.pin) {
          // A short editorial hold lets the three cards assemble while wheel/touchpad
          // scrolling remains native to the existing Lenis/ScrollTrigger integration.
          gsap.timeline({
            scrollTrigger: {
              id: "sleep-story-rhythm", trigger: pinShell, start: "top top",
              end: () => `+=${innerHeight * 0.65}`, pin: true,
              scrub: 0.8, anticipatePin: 1, invalidateOnRefresh: true,
            },
          }).from(panels, {
            y: index => index === 1 ? 75 : 130,
            rotation: index => (index - 1) * 4,
            scale: 0.94, stagger: 0.16, duration: 1, ease: "power2.out",
          }).from(visible(rhythm, "[data-story-bar]"), {
            scaleY: 0.08, transformOrigin: "50% 50%", stagger: 0.012, duration: 0.7,
          }, 0.35).to({}, { duration: 0.25 });
        } else {
          panels.forEach(panel => {
            gsap.from(panel, {
              y: 28, opacity: 0, duration: 0.9, ease: "power3.out",
              scrollTrigger: { trigger: panel, start: "top 94%", once: true },
            });
          });
        }

        [...chapters, root.querySelector<HTMLElement>("#sleep-same-picture")!].forEach((section, index) => {
          visible(section, "[data-story-copy], [data-story-word]").forEach((el, order) => {
            gsap.from(el, {
              y: desktop ? 28 : 18, opacity: 0, duration: 1.1,
              delay: desktop ? Math.min(order * 0.055, 0.22) : 0, ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            });
          });
          visible(section, "[data-story-number]").forEach(el => {
            gsap.from(el, {
              y: 32, opacity: 0, duration: 1.4, ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 95%", once: true },
            });
          });
          visible(section, "[data-story-photo]").forEach(photo => {
            gsap.from(photo, {
              clipPath: "inset(0 0 100% 0)", duration: 1.5, ease: "power3.inOut",
              scrollTrigger: { trigger: photo.parentElement, start: "top 88%", once: true },
            });
            if (desktop) {
              gsap.fromTo(photo, { scale: 1.08 }, {
                scale: 1, ease: "none",
                scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 1.2 },
              });
            }
          });
          visible(section, "[data-story-card]").forEach((card, order) => {
            gsap.from(card, {
              y: 40, rotationX: desktop ? 8 : 0, transformPerspective: 1000,
              opacity: 0, duration: 1.2, delay: order * 0.12, ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 90%", once: true },
            });
          });
          const bars = visible(section, "[data-story-bar]");
          visible(section, "[data-story-chart]").forEach(chart => {
            gsap.from(chart, {
              clipPath: "inset(0 100% 0 0)", duration: 1.6, ease: "power2.inOut",
              scrollTrigger: { trigger: chart, start: "top 90%", once: true },
            });
          });
          if (bars.length && index !== 2) {
            gsap.from(bars, {
              scaleY: index === 1 ? 0 : 0.06, scaleX: index === 1 ? 0 : 1,
              transformOrigin: "left bottom", stagger: 0.025, duration: 0.8, ease: "power2.out",
              scrollTrigger: { trigger: bars[0].parentElement, start: "top 88%", once: true },
            });
          }
          visible(section, "[data-story-count]").forEach(el => {
            const finalText = el.textContent;
            const counter = { value: 0 };
            gsap.to(counter, {
              value: Number(el.dataset.storyCount), duration: 1.6, ease: "power2.out",
              snap: { value: 1 },
              onUpdate: () => { el.textContent = `${counter.value}${el.dataset.storySuffix ?? ""}`; },
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });
            // GSAP restores inline styles; restore authored text separately on teardown.
            context.add(() => () => { el.textContent = finalText; });
          });

          const connectors = visible(section, "[data-story-connector]");
          const pills = visible(section, "[data-story-pill]");
          if (connectors.length || pills.length) {
            const sequence = gsap.timeline({
              scrollTrigger: {
                trigger: connectors[0] ?? pills[0], start: "top 88%",
                end: "top 30%", scrub: desktop ? 0.8 : false,
                once: !desktop,
              },
            });
            if (connectors.length) sequence.from(connectors, {
              clipPath: "inset(0 0 100% 0)", opacity: 0, stagger: 0.14,
              duration: 0.9, ease: "power2.inOut",
            });
            if (pills.length) sequence.from(pills, {
              y: 16, scale: 0.9, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power3.out",
            }, connectors.length ? 0.4 : 0);
          }
        });
      }

    });
    return () => media.revert();
  }, { scope: rootRef });

  return <main ref={rootRef}>{children}</main>;
}
