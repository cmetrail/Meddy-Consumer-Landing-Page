"use client";

import { useLayoutEffect, useRef } from "react";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Pricing } from "./helper/Pricing";
import { FooterItems } from "./helper/FooterItems";
import styles from "./helper/Pricing.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scene = sceneRef.current;
    const section = sectionRef.current;
    if (!scene || !section) return;
    const updateBackground = () => {
      section.style.setProperty("--pricing-scene-height", `${scene.offsetHeight}px`);
    };
    updateBackground();
    const observer = new ResizeObserver(updateBackground);
    observer.observe(scene);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => desktopMotion(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]", sectionRef.current).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 92%", end: "top 55%", scrub: true },
          },
        );
      });

      // Pricing cards drop in one-by-one as the section scrolls in.
      const cards = gsap.utils.toArray<HTMLElement>("[data-plan-card]", sectionRef.current);
      if (cards.length) {
        const ctl = gsap.timeline({
          scrollTrigger: { trigger: cards[0], start: "top 90%", end: "top 40%", scrub: true },
        });
        cards.forEach((el, i) => {
          ctl.fromTo(el, { opacity: 0, y: -80 }, { opacity: 1, y: 0, ease: "none" }, i * 0.25);
        });
      }

      // Pricing header lines animate singly.
      const head = sectionRef.current?.querySelector("[data-pricing-head]");
      if (head) {
        const lines = head.querySelectorAll<HTMLElement>("[data-line]");
        const htl = gsap.timeline({
          scrollTrigger: { trigger: head, start: "top 90%", end: "top 45%", scrub: true },
        });
        lines.forEach((el, i) => {
          htl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none" }, i * 0.15);
        });
      }

      // Footer nav columns reveal one-by-one.
      const nav = sectionRef.current?.querySelector("[data-footer-nav]");
      if (nav) {
        const cols = nav.querySelectorAll<HTMLElement>("[data-footer-col]");
        const ftl = gsap.timeline({
          scrollTrigger: { trigger: nav, start: "top 92%", end: "top 55%", scrub: true },
        });
        cols.forEach((el, i) => {
          ftl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none" }, i * 0.2);
        });
      }
    }),
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="pricing" className={`${styles.section} relative w-full overflow-hidden text-white`}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={`${styles.overlay} absolute inset-0 bg-black/50`} />

      <div ref={sceneRef} className={styles.scene}>
        <div className={`${styles.content} relative max-w-360 mx-auto px-5 lg:px-10 py-16`}>
          <Pricing />
        </div>
      </div>
      <FooterItems mobileReference />
    </section>
  );
}
