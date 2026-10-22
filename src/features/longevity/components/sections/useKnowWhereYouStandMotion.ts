"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useKnowWhereYouStandMotion(
  setActive: (index: number) => void,
  categoryCount: number,
) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = sectionRef.current!;
    const select = gsap.utils.selector(root);
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 1024px)",
      mobile: "(max-width: 1023px)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reduce) return;
      const desktop = !!context.conditions?.desktop;
      const photo = select("[data-stand-photo]")[0];
      const image = select("[data-stand-image]");

      // Advance the emphasis down the list while it crosses the reading area.
      // No pinning: the section continues to move naturally with the page.
      let scrollCategory = -1;
      const syncCategory = (self: ScrollTrigger) => {
        const index = Math.min(categoryCount - 1, Math.floor(self.progress * categoryCount));
        if (index === scrollCategory) return;
        scrollCategory = index;
        setActive(index);
      };
      ScrollTrigger.create({
        id: "longevity-health-categories",
        trigger: select("[data-stand-categories]")[0],
        start: "top 75%",
        end: "bottom 25%",
        invalidateOnRefresh: true,
        onUpdate: syncCategory,
        onRefresh: syncCategory,
      });
      // Independent triggers follow the mobile reading order as well as desktop.
      gsap.from(photo, {
        clipPath: "inset(10% 7% 10% 7%)", autoAlpha: 0, y: 28,
        duration: 1.45, ease: "power3.out",
        scrollTrigger: { trigger: photo, start: "top 92%", once: true },
      });
      select("[data-stand-reveal]").forEach((element: HTMLElement, index: number) => {
        gsap.from(element, {
          autoAlpha: 0, y: 24, duration: 1.05,
          delay: desktop ? index * 0.1 : 0,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        });
      });
      gsap.from(select("[data-stand-category]"), {
        x: -24, autoAlpha: 0, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: select("[data-stand-categories]")[0], start: "top 92%", once: true },
      });
      gsap.from(select("[data-stand-pills-reveal]"), {
        y: 18, autoAlpha: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: select("[data-stand-pills-reveal]")[0], start: "top 96%", once: true },
      });

      // Overscan avoids exposed edges while the portrait slowly moves with scroll.
      gsap.fromTo(image, { scale: 1.08, yPercent: -2 }, {
        scale: 1.02, yPercent: 1, ease: "none",
        scrollTrigger: { trigger: photo, start: "top bottom", end: "bottom top", scrub: 1.4 },
      });

    });
    return () => media.revert();
  }, { scope: sectionRef, dependencies: [setActive, categoryCount], revertOnUpdate: true });

  return sectionRef;
}
