"use client";

// @refresh reset

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./Comprehensive.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Comprehensive() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const select = gsap.utils.selector(section);
      const media = gsap.matchMedia();

      media.add(
        {
          desktop: "(min-width: 1024px) and (pointer: fine)",
          mobile: "(max-width: 1023px), (pointer: coarse)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          if (context.conditions?.reduced) return;
          const desktop = context.conditions?.desktop;
          const heading = select(`.${styles.heading}`);
          const description = select(`.${styles.description}`);
          const map = select(`.${styles.map}`);
          const card = select(`.${styles.card}`);
          const logo = select(`.${styles.logo}`);
          const closing = select(`.${styles.closing}`);

          if (!desktop) {
            // Lightweight reveals preserve native touch scrolling.
            [heading, description, map, card, logo, closing].forEach(
              (targets) => {
                if (targets[0].getBoundingClientRect().top < 0) return;
                gsap.from(targets, {
                  opacity: 0,
                  y: 24,
                  duration: 0.7,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: targets[0],
                    start: "top 92%",
                    once: true,
                  },
                });
              },
            );
            return;
          }

          gsap
            .timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: {
                trigger: select(`.${styles.intro}`)[0],
                start: "top 92%",
                end: "bottom 65%",
                scrub: 0.6,
              },
            })
            .from(heading, { opacity: 0, y: 32, duration: 1 })
            .from(description, { opacity: 0, y: 20, duration: 0.8 }, 0.25);

          const path = section.querySelector<SVGPathElement>(
            "[data-care-connection]",
          );
          const dot =
            section.querySelector<SVGCircleElement>("[data-care-dot]");
          if (!path || !dot) return;
          const pathLength = path.getTotalLength();

          gsap
            .timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: {
                trigger: map[0],
                start: "top 90%",
                end: "top 30%",
                scrub: 0.8,
              },
            })
            .from(map, { opacity: 0, y: 48, duration: 1.2 }, 0)
            .from(card, { opacity: 0, x: -24, y: 12, duration: 0.6 }, 0.5)
            .from(dot, { opacity: 0, duration: 0.2 }, 0.9)
            .fromTo(
              path,
              { strokeDasharray: pathLength, strokeDashoffset: pathLength },
              { strokeDashoffset: 0, duration: 0.8, ease: "none" },
              0.95,
            )
            .from(logo, { opacity: 0, scale: 0.75, duration: 0.5 }, 1.5);

          gsap.from(select(`.${styles.closing} p`), {
            opacity: 0,
            y: 24,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: closing[0],
              start: "top 95%",
              end: "bottom 80%",
              scrub: 0.6,
            },
          });

        },
      );

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
        <section
          ref={sectionRef}
          id="comprehensive-care"
          className={styles.section}
          aria-labelledby="comprehensive-heading"
        >
          <div className={styles.canvas}>
            <div className={styles.intro}>
              <h2 id="comprehensive-heading" className={styles.heading}>
                Comprehensive primary care services
                <br />
                across <em>New York</em>
              </h2>
              <p className={styles.description}>
                Whether you&apos;re in{" "}
                <strong>
                  Buffalo, Rochester, Syracuse, Albany, New York City
                </strong>
                , or elsewhere in New York,
                <br />
                your primary care physician is always available.
              </p>
            </div>
            <div className={styles.map}>
              <Image
                src="/home/image 17.png"
                alt="Illustrated New York State map showing Buffalo, Rochester, Syracuse, Albany, and New York City."
                width={1260}
                height={816}
                sizes="(max-width: 1440px) 96vw, 1253px"
                className={styles.mapImage}
              />
            </div>
            <svg
              className={styles.connection}
              viewBox="0 0 939 881"
              fill="none"
              aria-hidden="true"
            >
              <path
                data-care-connection
                d="M249 440 C280 354 357 307 438 350"
                stroke="#079D59"
                strokeWidth="2.5"
              />
              <circle data-care-dot cx="249" cy="440" r="7" fill="#079D59" />
            </svg>
            <aside className={styles.card} aria-label="Primary care in Buffalo">
              <p className={styles.city}>Buffalo</p>
              <p className={styles.availability}>
                Virtual primary care available
              </p>
              <ul className={styles.benefits}>
                <li>Same physician</li>
                <li>Video visits</li>
                <li>Labs &amp; prescriptions coordinated locally</li>
              </ul>
            </aside>
              <div className={styles.logo} role="img" aria-label="Meddy">
                <svg viewBox="0 0 44 28" fill="currentColor" aria-hidden="true">
                  <rect y="6.47461" width="8.82074" height="20.7238" />
                  <path d="M17.5375 0H26.5657L9.1318 27.2H0.103516L17.5375 0Z" />
                  <path d="M34.971 0H43.9993L26.5654 27.2H17.5371L34.971 0Z" />
                  <rect x="17.5371" width="9.02829" height="27.2" />
                  <rect x="34.9727" width="9.02829" height="27.2" />
                </svg>
              </div>
            <div className={styles.closing}>
              <p className={styles.tagline}>
                Wherever you live, <em>your care stays connected.</em>
              </p>
              <p className={styles.caption}>
                One physician who knows your history, follows your progress, and
                stays involved over time.
              </p>
            </div>
          </div>
        </section>
  );
}
