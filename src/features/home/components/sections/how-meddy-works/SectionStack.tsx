"use client";

import { Children, useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { desktopMotion } from "@/lib/motion";
import styles from "./SectionStack.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Sticky reveals scoped to How Meddy Works, including its nested charts. */
export default function SectionStack({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => desktopMotion(() => {
      const root = rootRef.current;
      if (!root) return;
      const panels = Array.from(root.children) as HTMLElement[];

      // Measure in normal flow, including when refreshing halfway down the page.
      // This also gives the existing child ScrollTriggers their real positions.
      const beforeRefresh = () => {
        root.dataset.measuring = "true";
        panels.forEach((panel) => {
          panel.style.setProperty(
            "--stack-top",
            `${Math.min(0, window.innerHeight - panel.offsetHeight)}px`,
          );
        });
      };
      const afterRefresh = () => {
        delete root.dataset.measuring;
      };

      root.dataset.stackActive = "true";
      beforeRefresh();
      panels.slice(0, -1).forEach((panel, index) => {
        const shade = panel.querySelector<HTMLElement>(`[data-stack-shade]`);
        gsap.fromTo(shade, { opacity: 0 }, {
          opacity: 0.24,
          ease: "none",
          scrollTrigger: {
            trigger: panels[index + 1],
            start: "top bottom",
            end: "top top",
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });
      });
      ScrollTrigger.addEventListener("refreshInit", beforeRefresh);
      ScrollTrigger.addEventListener("refresh", afterRefresh);
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", beforeRefresh);
        ScrollTrigger.removeEventListener("refresh", afterRefresh);
        delete root.dataset.stackActive;
        delete root.dataset.measuring;
        panels.forEach((panel) => panel.style.removeProperty("--stack-top"));
      };
    }),
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={styles.stack}>
      {Children.map(children, (child, index) => (
        <div className={styles.panel} style={{ zIndex: index + 1 }}>
          {child}
          <div className={styles.shade} data-stack-shade aria-hidden="true" />
        </div>
      ))}
    </div>
  );
}
