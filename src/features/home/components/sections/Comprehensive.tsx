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
          const desktop = Boolean(context.conditions?.desktop);
          const map = select(`.${styles.map}`)[0];
          const image = select(`.${styles.mapImage}`);
          const markers = select(`.${styles.marker}`);
          const card = select(`.${styles.card}`);
          const logo = select(`.${styles.logo}`);
          const halo = select(`.${styles.logoHalo}`);
          const path = section.querySelector<SVGPathElement>("[data-care-connection]");
          const dot = section.querySelector<SVGCircleElement>("[data-care-dot]");
          if (!map || !path || !dot) return;
          const pathLength = path.getTotalLength();

          gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: select(`.${styles.intro}`)[0],
              start: "top 88%",
              once: true,
            },
          })
            .from(select(`.${styles.heading} > span`), {
              autoAlpha: 0,
              y: desktop ? 32 : 18,
              clipPath: "inset(0 0 100% 0)",
              duration: 1,
              stagger: 0.13,
              clearProps: "transform,opacity,visibility,clipPath",
            })
            .from(select(`.${styles.description}`), {
              autoAlpha: 0,
              y: 16,
              duration: 0.85,
              clearProps: "transform,opacity,visibility",
            }, 0.3);

          // Animate the artwork independently so every overlay stays anchored.
          const reveal = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: map,
              start: "top 82%",
              once: true,
            },
          });

          reveal
            .from(image, {
              autoAlpha: 0,
              y: desktop ? 64 : 24,
              scale: desktop ? 0.94 : 0.97,
              rotationX: desktop ? 9 : 0,
              rotationZ: desktop ? -1.2 : 0,
              transformPerspective: 1100,
              transformOrigin: "50% 75%",
              duration: desktop ? 1.65 : 1.1,
              clearProps: "transform,transformOrigin,opacity,visibility",
            }, 0)
            .from(markers, {
              autoAlpha: 0,
              y: desktop ? 20 : 10,
              scale: 0.82,
              duration: 0.65,
              stagger: 0.12,
              ease: "back.out(1.25)",
              clearProps: "transform,opacity,visibility",
            }, desktop ? 0.65 : 0.35)
            .from(dot, {
              autoAlpha: 0,
              scale: 0,
              transformOrigin: "50% 50%",
              duration: 0.45,
              ease: "back.out(1.5)",
            }, 0.9)
            .fromTo(path, {
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength,
            }, {
              strokeDashoffset: 0,
              duration: 1,
              ease: "power2.inOut",
            }, 1)
            .from(logo, {
              autoAlpha: 0,
              scale: 0.7,
              rotation: -8,
              duration: 0.8,
              ease: "back.out(1.3)",
              clearProps: "transform,opacity,visibility",
            }, 1.65)
            .fromTo(halo, { scale: 0.8, autoAlpha: 0.5 }, {
              scale: 1.45,
              autoAlpha: 0,
              duration: 1.15,
              ease: "power2.out",
            }, 1.9);

          if (getComputedStyle(card[0]).display !== "none") {
            reveal
              .from(card, {
                autoAlpha: 0,
                x: -24,
                y: 12,
                scale: 0.96,
                duration: 0.9,
                clearProps: "transform,opacity,visibility",
              }, 0.9)
              .from(select(`.${styles.city}, .${styles.availability}`), {
                autoAlpha: 0,
                y: 8,
                stagger: 0.1,
                duration: 0.55,
                clearProps: "transform,opacity,visibility",
              }, 1.2)
              .from(select(`.${styles.benefits} li`), {
                autoAlpha: 0,
                x: -12,
                y: 6,
                duration: 0.55,
                stagger: 0.13,
                clearProps: "transform,opacity,visibility",
              }, 1.45);
          }

          if (desktop) {
            // Move the entire composition together to keep pins and artwork aligned.
            gsap.fromTo(map, { yPercent: 1.5 }, {
              yPercent: -1.5,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });
          }

          gsap.from(select(`.${styles.closing} p`), {
            autoAlpha: 0,
            y: 22,
            stagger: 0.16,
            duration: 1,
            ease: "power3.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: {
              trigger: select(`.${styles.closing}`)[0],
              start: "top 90%",
              once: true,
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
            <span className={styles.headingLead}>
              Comprehensive primary care services
            </span>
            <br className={styles.desktopBreak} />{" "}
            <span className={styles.headingLocation}>
              across <em>New York</em>
            </span>
          </h2>
          <p className={styles.description}>
            Whether you&apos;re in{" "}
            <strong>Buffalo, Rochester, Syracuse, Albany, New York City</strong>
            , or elsewhere in New
            <br className={styles.mobileBreak} /> York,
            <br />
            your primary care physician is always available.
          </p>
        </div>
        <div className={styles.map}>
          <Image
            src="/home/map.png"
            alt="Illustrated New York State map showing Buffalo, Rochester, Syracuse, Albany, and New York City."
            width={1536}
            height={1024}
            sizes="(max-width: 767px) 100vw, (max-width: 1440px) 89vw, 1280px"
            className={styles.mapImage}
          />
          <ul className={styles.markers} aria-label="Cities served">
            {[
              { name: "Buffalo", x: 22.7, y: 37.6 },
              { name: "Rochester", x: 37.4, y: 35.8 },
              { name: "Syracuse", x: 63.2, y: 30.9 },
              { name: "Albany", x: 58.9, y: 42.8 },
              { name: "New York", x: 73.4, y: 66.4 },
            ].map((city) => (
              <li
                key={city.name}
                className={styles.marker}
                style={{ left: `${city.x}%`, top: `${city.y}%` }}
              >
                <svg viewBox="0 0 16 20" fill="none" aria-hidden="true">
                  <path
                    d="M8 0a8 8 0 0 0-8 8c0 5 8 12 8 12s8-7 8-12a8 8 0 0 0-8-8Z"
                    fill="#ff5964"
                  />
                  <circle cx="8" cy="8" r="3" fill="white" />
                </svg>
                {city.name}
              </li>
            ))}
          </ul>
          <svg
            className={styles.connection}
            viewBox="0 0 882 559"
            fill="none"
            aria-hidden="true"
          >
            <path
              data-care-connection
              d="M203 245 C223 158 304 105 391 157"
              stroke="#079D59"
              strokeWidth="2.5"
            />
            <circle data-care-dot cx="203" cy="245" r="7" fill="#079D59" />
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
            <span className={styles.logoHalo} aria-hidden="true" />
            <svg viewBox="0 0 44 28" fill="currentColor" aria-hidden="true">
              <rect y="6.47461" width="8.82074" height="20.7238" />
              <path d="M17.5375 0H26.5657L9.1318 27.2H0.103516L17.5375 0Z" />
              <path d="M34.971 0H43.9993L26.5654 27.2H17.5371L34.971 0Z" />
              <rect x="17.5371" width="9.02829" height="27.2" />
              <rect x="34.9727" width="9.02829" height="27.2" />
            </svg>
          </div>
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
