"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_MOTION } from "@/lib/motion";
import styles from "./LongevityPhysicianPreventionSection.module.css";

const steps = [
  { image: "prev-photo.jpg", mobileImage: "prev-photo-m.jpg", caption: "Understand your risks", alt: "A physician talking with a patient" },
  { image: "img2.jpeg", caption: "Build your plan", alt: "An athlete sitting in a locker room after a workout" },
  { image: "img3.jpg", caption: "Follow your progress", alt: "A woman enjoying a cup of tea in a sunlit kitchen" },
  { image: "img4.jpg", caption: "Adjust as your health changes", alt: "A smiling woman holding a water bottle after exercise" },
];

export default function LongevityPhysicianPreventionSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const media = gsap.matchMedia();
    media.add(SCROLL_MOTION, () => {
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.step}`, section);
      const rule = section.querySelector(`.${styles.rule}`);
      gsap.set(cards.slice(1), { autoAlpha: 0, y: 24 });
      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          // Direct scrubbing: stopping the scroll also stops the reveal.
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const stage = self.progress >= 0.75 ? 3 : self.progress >= 0.5 ? 2 : self.progress >= 0.25 ? 1 : 0;
            section.dataset.stage = String(stage);
            cards.forEach((card, index) => card.setAttribute("aria-hidden", String(index !== stage)));
          },
        },
      });
      const heights = ["35%", "55%", "100%"];
      cards.slice(1).forEach((card, index) => {
        const start = 0.22 + index * 0.25;
        timeline
          .to(cards[index], { autoAlpha: 0, y: -24, duration: 0.06 }, start)
          .to(card, { autoAlpha: 1, y: 0, duration: 0.06 }, start)
          .to(rule, { height: heights[index], duration: 0.06 }, start);
      });
      // Leave time to read the final step before the section releases.
      timeline.to({}, { duration: 0.22 });
      // Native mobile scrolling has no Lenis provider to refresh measurements.
      // Recalculate after viewport changes and when fonts finish laying out.
      let refreshFrame = 0;
      let disposed = false;
      const refresh = () => {
        if (disposed) return;
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      };
      const observer = new ResizeObserver(refresh);
      observer.observe(section);
      document.fonts.ready.then(refresh);
      window.addEventListener("load", refresh);
      return () => {
        disposed = true;
        observer.disconnect();
        window.removeEventListener("load", refresh);
        cancelAnimationFrame(refreshFrame);
        delete section.dataset.stage;
        cards.forEach((card) => card.removeAttribute("aria-hidden"));
      };
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="longevity-prevention-title">
      <div className={styles.sticky}>
        <div className={styles.layout}>
          <div className={styles.heading}>
            <div className={styles.label}>
              <span aria-hidden="true" />
              <p>Longitudinal doctor care</p>
            </div>
            <h2 id="longevity-prevention-title" className="comprehensive-serif">Physician prevention</h2>
          </div>
          <div className={styles.copy}>
            <div className={styles.message}>
              <p>Prevention isn&apos;t one visit.</p>
              <p className="comprehensive-serif">It&apos;s an ongoing process.</p>
            </div>
            <button type="button" className={styles.button}>Start Preventive Care</button>
          </div>
          <div className={styles.visual}>
            <div className={styles.ruleTrack} aria-hidden="true"><div className={styles.rule} /></div>
            <div className={styles.steps}>
              {steps.map((step) => (
                <figure key={step.image} className={styles.step}>
                  <div className={styles.photo}>
                    {step.mobileImage && <Image src={`/longevity/${step.mobileImage}`} alt={step.alt} fill sizes="(max-width: 1023px) 90vw, 640px" className={styles.mobilePhoto} />}
                    <Image src={`/longevity/${step.image}`} alt={step.alt} fill sizes="(min-width: 1440px) 592px, (min-width: 1024px) 44vw, 90vw" className={step.mobileImage ? styles.desktopPhoto : undefined} />
                  </div>
                  <figcaption className="comprehensive-serif">{step.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
