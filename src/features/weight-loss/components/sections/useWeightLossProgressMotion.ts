"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { createScrollRefresh, gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useWeightLossProgressMotion() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = sectionRef.current;
    if (!root) return;
    const media = gsap.matchMedia();

    media.add({
      motion: "(prefers-reduced-motion: no-preference)",
      pointer: "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    }, (context) => {
      if (!context.conditions?.motion) return;
      const desktop = Boolean(context.conditions.pointer);
      const select = gsap.utils.selector(root);
      const plot = select<HTMLElement>("[data-progress-plot]")[0];
      const cards = select<HTMLElement>("[data-progress-card]");
      const captions = select<HTMLElement>("[data-progress-caption]");
      const footer = select<HTMLElement>("[data-progress-footer]")[0];
      const numbers = select<HTMLElement>("[data-progress-number]");

      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 82%", once: true },
      })
        .from(select("[data-progress-line]"), {
          yPercent: 110, rotation: desktop ? 3 : 0, transformOrigin: "0% 100%",
          duration: 1.15, stagger: 0.14,
        }, 0)
        .from(select("[data-progress-intro]"), {
          opacity: 0, y: 28, duration: 1,
        }, 0.3);

      // The existing SVG remains intact: a mask uncovers its curve, points,
      // guides and area together, with each photo landing as the line arrives.
      const journey = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: plot, start: "top 88%", end: desktop ? "bottom 65%" : "bottom 75%",
          scrub: desktop ? 0.65 : 0.3, invalidateOnRefresh: true,
        },
      });
      journey.from(select("[data-progress-curve]"), {
        clipPath: "inset(-3% 103% -3% -3%)", duration: 2.8, ease: "none",
      }, 0);
      const arrivals = [0, 0.65, 1.5, 2.35];
      cards.forEach((card, index) => {
        journey.from(card, {
          opacity: 0, y: desktop ? 65 : 35, scale: 0.78,
          rotation: index % 2 ? 7 : -7, rotationX: desktop ? 24 : 0,
          transformOrigin: "50% 100%", duration: 0.65,
        }, arrivals[index])
          .from(captions[index], { opacity: 0, y: 16, duration: 0.45 }, arrivals[index] + 0.3);
      });

      const summary = gsap.timeline({
        scrollTrigger: { trigger: footer, start: "top 92%", once: true },
        defaults: { ease: "power3.out" },
      });
      summary.from(footer.children, { opacity: 0, y: 30, duration: 0.9, stagger: 0.15 }, 0)
        .from(select("[data-progress-arrow]"), { x: -18, scaleX: 0.4, opacity: 0, duration: 0.7 }, 0.4)
        .from(select("li"), { opacity: 0, y: 10, duration: 0.5, stagger: 0.07 }, 0.3);
      numbers.forEach((element, index) => {
        const counter = { value: index === 0 ? 1800 : 2300 };
        const target = Number(element.dataset.progressNumber);
        summary.to(counter, {
          value: target, duration: 1.7, ease: "power2.out",
          onUpdate: () => { element.textContent = Math.round(counter.value).toLocaleString("en-US"); },
        }, 0.3 + index * 0.15);
      });

      const listeners: (() => void)[] = [];
      if (desktop) {
        cards.forEach((card) => {
          const surface = card.querySelector<HTMLElement>("[data-progress-surface]")!;
          const shine = card.querySelector<HTMLElement>("[data-progress-shine]")!;
          const rotateX = gsap.quickTo(surface, "rotationX", { duration: 0.65, ease: "power3.out" });
          const rotateY = gsap.quickTo(surface, "rotationY", { duration: 0.65, ease: "power3.out" });
          const lift = gsap.to(surface, {
            y: -8, scale: 1.055, boxShadow: "0 18px 35px rgba(8,30,20,0.3)",
            duration: 0.45, ease: "power2.out", paused: true,
          });
          const glint = gsap.timeline({ paused: true })
            .fromTo(shine, { xPercent: -65, opacity: 0 }, { xPercent: 65, opacity: 1, duration: 0.7, ease: "power2.inOut" })
            .to(shine, { opacity: 0, duration: 0.2 });
          const enter = () => { lift.play(); glint.restart(); };
          const move = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            const bounds = card.getBoundingClientRect();
            rotateX((0.5 - (event.clientY - bounds.top) / bounds.height) * 14);
            rotateY(((event.clientX - bounds.left) / bounds.width - 0.5) * 18);
          };
          const leave = () => { lift.reverse(); rotateX(0); rotateY(0); };
          card.addEventListener("pointerenter", enter);
          card.addEventListener("pointermove", move);
          card.addEventListener("pointerleave", leave);
          listeners.push(() => {
            card.removeEventListener("pointerenter", enter);
            card.removeEventListener("pointermove", move);
            card.removeEventListener("pointerleave", leave);
          });
        });
      }

      const refresh = createScrollRefresh();
      let active = true;
      void document.fonts.ready.then(() => { if (active) refresh.refresh(); });
      root.addEventListener("load", refresh.refresh, true);
      refresh.refresh();
      return () => {
        active = false;
        refresh.dispose();
        root.removeEventListener("load", refresh.refresh, true);
        listeners.forEach(remove => remove());
        numbers.forEach(element => {
          element.textContent = Number(element.dataset.progressNumber).toLocaleString("en-US");
        });
      };
    });

    return () => media.revert();
  }, { scope: sectionRef });

  return sectionRef;
}
