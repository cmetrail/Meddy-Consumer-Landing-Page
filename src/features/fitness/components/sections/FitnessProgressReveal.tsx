"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { DESKTOP_MOTION } from "@/lib/motion";
import FitnessMeasurableSection from "./FitnessMeasurableSection";
import FitnessRecoverySection from "./FitnessRecoverySection";
import styles from "./FitnessProgressReveal.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FitnessProgressReveal() {
  const rootRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const previousRef = useRef<HTMLDivElement>(null);
  const shadeRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({
      desktop: `${DESKTOP_MOTION} and (min-height: 740px)`,
      mobile: "(max-width: 1023px), (pointer: coarse)",
      motion: "(prefers-reduced-motion: no-preference)",
    }, (context) => {
      const { desktop, mobile, motion } = context.conditions!;
      if (!motion || (!desktop && !mobile)) return;
      const root = rootRef.current;
      const reveal = revealRef.current;
      const previous = previousRef.current;
      const stage = stageRef.current;
      if (!root || !reveal || !previous || !stage) return;

      root.dataset.revealActive = "true";
      if (mobile) root.dataset.mobileReveal = "true";
      reveal.inert = true;

      let stickyTop = 0;
      let scrollDistance = window.innerHeight * 1.2;
      const measure = () => {
        // Read all of Measurable before pinning on a short screen. Shift the incoming
        // section back to the viewport top so its heading is never cut off.
        const previousHeight = previous.firstElementChild?.getBoundingClientRect().height ?? 0;
        stickyTop = mobile ? Math.min(0, window.innerHeight - previousHeight) : 0;
        scrollDistance = window.innerHeight * 1.2;
        root.style.setProperty("--sticky-top", `${stickyTop}px`);
        root.style.setProperty("--reveal-offset", `${-stickyTop}px`);
        root.style.setProperty("--reveal-track-height", `${stage.offsetHeight + scrollDistance}px`);
      };
      measure();

      const mobileClip = (halfWidth: number, halfHeight: number, radius: number) => {
        const center = -stickyTop + window.innerHeight / 2;
        return `inset(${center - halfHeight}px ${halfWidth}% ${Math.max(0, stage.offsetHeight - center - halfHeight)}px round ${radius}px)`;
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: () => `top ${stickyTop}px`,
          end: () => `+=${scrollDistance}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onRefreshInit: measure,
        },
        onUpdate: () => {
          // Clipped controls must not receive focus before the reveal finishes.
          reveal.inert = timeline.progress() < 0.9;
          previous.inert = timeline.progress() >= 0.9;
        },
      });

      timeline
        .fromTo(reveal, {
          clipPath: () => mobile ? mobileClip(50, 0, 24) : "inset(50% 50% round 24px)",
        }, {
          clipPath: () => mobile ? mobileClip(40, window.innerHeight * 0.12, 24) : "inset(38% 40% round 24px)",
          duration: 0.18,
          ease: "power2.out",
        })
        .to(reveal, {
          clipPath: "inset(0% 0% round 0px)",
          duration: 0.72,
          ease: "power2.inOut",
        })
        .fromTo(shadeRef.current, { opacity: 0 }, {
          opacity: 0.16,
          duration: 0.9,
          ease: "none",
        }, 0)
        .to({}, { duration: 0.1 });

      // Card tabs and font loading can change the full section height.
      const observer = new ResizeObserver(() => {
        const previousHeight = root.style.getPropertyValue("--reveal-track-height");
        measure();
        if (previousHeight !== root.style.getPropertyValue("--reveal-track-height")) {
          ScrollTrigger.refresh();
        }
      });
      observer.observe(stage);
      observer.observe(previous.firstElementChild!);

      return () => {
        observer.disconnect();
        delete root.dataset.revealActive;
        delete root.dataset.mobileReveal;
        root.style.removeProperty("--sticky-top");
        root.style.removeProperty("--reveal-offset");
        root.style.removeProperty("--reveal-track-height");
        reveal.inert = false;
        previous.inert = false;
      };
    });
    return () => media.revert();
  }, { scope: rootRef });

  return (
    <div ref={rootRef} className={styles.root}>
      <div ref={stageRef} className={styles.stage}>
        <div ref={previousRef} className={styles.previous}>
          <FitnessMeasurableSection />
          <div ref={shadeRef} className={styles.shade} aria-hidden="true" />
        </div>
        <div ref={revealRef} className={styles.reveal}>
          <FitnessRecoverySection />
        </div>
      </div>
    </div>
  );
}
