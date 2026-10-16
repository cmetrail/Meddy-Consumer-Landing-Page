"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./PhysicianCareStory.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PhysicianCareStory({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 1024px) and (pointer: fine)",
      pin: "(min-width: 1024px) and (min-height: 700px) and (pointer: fine)",
      mobile: "(max-width: 1023px), (pointer: coarse)",
      reduce: "(prefers-reduced-motion: reduce)",
    }, context => {
      if (context.conditions?.reduce) return;
      const root = rootRef.current!;
      const desktop = context.conditions?.desktop;
      const select = gsap.utils.selector(root);
      const chapters = gsap.utils.toArray<HTMLElement>("[data-pc-chapter]", root);

      select("[data-pc-reveal]").forEach((element: HTMLElement) => {
        gsap.from(element, {
          y: desktop ? 46 : 22, autoAlpha: 0, duration: 1.15, ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
        });
      });

      // Chapter 1: the image settles as the two possible health paths draw.
      gsap.from(select("[data-pc-prevention-photo]"), {
        y: desktop ? 70 : 24, scale: desktop ? 0.94 : 1, duration: 1.5, ease: "power3.out",
        scrollTrigger: { trigger: chapters[0], start: "top 75%", once: true },
      });
      gsap.utils.toArray<SVGPathElement>("[data-pc-curve]", root).forEach((path, index) => {
        const length = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
          strokeDashoffset: 0, duration: 1.8, delay: index * 0.2, ease: "power2.inOut",
          scrollTrigger: { trigger: path.closest("svg"), start: "top 90%", once: true },
        });
      });

      // Chapter 2: a slow camera pullback lets the personal-care statement breathe.
      if (desktop) {
        gsap.fromTo(select("[data-pc-scene-photo]"), { scale: 1.14, yPercent: -3 }, {
          scale: 1, yPercent: 0, ease: "none",
          scrollTrigger: { trigger: chapters[1], start: "top bottom", end: "bottom top", scrub: 1.3 },
        });
      }

      // Reveal on approach, independently of the desktop hold, so pausing the
      // scroll before the section reaches the top never leaves a blank screen.
      if (context.conditions?.pin) {
        ScrollTrigger.create({
          id: "physician-story-profile", trigger: chapters[2], start: "top top",
          end: () => `+=${innerHeight * 0.35}`, pin: true,
          anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1,
        });
      }
      const profile = gsap.timeline({
        defaults: { duration: 0.9, ease: "power3.out" },
        scrollTrigger: { trigger: chapters[2], start: "top 95%", once: true },
      });
      profile.from(select("[data-pc-profile-copy]"), { y: 28, autoAlpha: 0 }, 0)
        .from(select("[data-pc-profile-portrait]"), {
          clipPath: desktop ? "inset(12% 8% 12% 8% round 120px)" : "inset(0 0 15% 0)",
          autoAlpha: 0, duration: 1.1,
        }, 0)
        .from(select("[data-pc-profile-name]"), { y: 24, autoAlpha: 0 }, 0.25)
        .from(select("[data-pc-profile-continuity]"), { y: 20, autoAlpha: 0 }, 0.35);

      // Chapter 4: reveal the care path and milestones in chronological order.
      const journey = gsap.timeline({ scrollTrigger: {
        trigger: chapters[3], start: "top 65%", end: "bottom 85%",
        scrub: desktop ? 0.9 : false, once: !desktop,
      } });
      journey.from(select("[data-pc-journey-path], [data-pc-journey-lettering]"), {
        clipPath: "inset(0 100% 0 0)", duration: 2.5, ease: "none", stagger: 0.15,
      }, 0).from(select("[data-pc-milestone]"), {
        y: desktop ? 65 : 28, autoAlpha: 0, rotation: desktop ? -4 : 0,
        scale: 0.92, stagger: 0.45, duration: 0.8, ease: "power2.out",
      }, 0.25);

      // Individual row triggers keep long mobile lists and accordion changes readable.
      select("[data-pc-service], [data-pc-faq]").forEach((row: HTMLElement) => {
        gsap.from(row, {
          y: 22, autoAlpha: 0, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 94%", once: true },
        });
      });
      if (desktop) {
        gsap.from(select("[data-pc-footer-photo]"), {
          scale: 1.1, ease: "none",
          scrollTrigger: { trigger: chapters[6], start: "top bottom", end: "bottom bottom", scrub: 1.2 },
        });
      }

      // Refresh after font/image layout settles; never touch triggers owned by other routes.
      let disposed = false;
      const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
      document.fonts.ready.then(refresh);
      root.addEventListener("load", refresh, true);
      return () => {
        disposed = true;
        root.removeEventListener("load", refresh, true);
      };
    });
    return () => media.revert();
  }, { scope: rootRef });

  return (
    <main ref={rootRef} className={styles.story}>
      {children}
    </main>
  );
}
