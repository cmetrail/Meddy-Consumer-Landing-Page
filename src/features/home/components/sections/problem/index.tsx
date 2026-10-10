"use client";

import { useRef } from "react";
import type { CSSProperties } from "react";

import Image from "next/image";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./ProblemSection.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/* Positions follow the supplied 1440×960 reference. */
const HEADING = { left: "40px", top: "1.25%", width: "54.08%" };

const IMAGES = [
  {
    src: "/home/scattered-1.png",
    label: "Nutrition",
    labelLeft: "2cqw",
    labelTop: "-4.45cqw",
    left: "31.53%",
    top: "49.27%",
    width: "20%",
    mobileLeft: "14.4%",
    mobileTop: "53.55%",
    mobileWidth: "33.75%",
    ar: 1.865,
  },
  {
    src: "/home/scattered-2.png",
    label: "Workouts",
    labelLeft: "0.35cqw",
    labelTop: "-1.8cqw",
    left: "8.68%",
    top: "29.58%",
    width: "18.75%",
    mobileLeft: "10.67%",
    mobileTop: "32.15%",
    mobileWidth: "31.76%",
    ar: 1.912,
  },
  {
    src: "/home/scattered-4.png",
    label: "Heart health",
    labelLeft: "11.05cqw",
    labelTop: "-3.96cqw",
    left: "61.81%",
    top: "46.88%",
    width: "21.67%",
    mobileLeft: "56.82%",
    mobileTop: "60.52%",
    mobileWidth: "36.23%",
    ar: 2.166,
  },
  {
    src: "/home/scattered-5.png",
    label: "Labs",
    labelLeft: "14.72cqw",
    labelTop: "-0.9cqw",
    left: "49.58%",
    top: "29.17%",
    width: "18.06%",
    mobileLeft: "55.83%",
    mobileTop: "38.3%",
    mobileWidth: "38.46%",
    ar: 1.81,
  },
  {
    src: "/home/watch.png",
    label: "Wearables",
    labelLeft: "2.01cqw",
    labelTop: "-1.95cqw",
    left: "51.39%",
    top: "67.6%",
    width: "21.53%",
    mobileLeft: "48.14%",
    mobileTop: "75.65%",
    mobileWidth: "43.67%",
    ar: 1.5,
  },
  {
    src: "/home/scattered-3.png",
    label: "Sleep",
    labelLeft: "1.95cqw",
    labelTop: "-3.75cqw",
    left: "17.22%",
    top: "73.85%",
    width: "18.96%",
    mobileLeft: "5.96%",
    mobileTop: "72.58%",
    mobileWidth: "35.24%",
    ar: 1.949,
  },
];

const HEADLINE = "#18181B";
const EYEBROW = "#1E1E22";

/* Doc "Section 1→2": the 6 photos come from different directions, then float. */
const DIRECTIONS = [
  { x: -60, y: -60, r: -8 },
  { x: -90, y: 30, r: -6 },
  { x: 0, y: -90, r: 6 },
  { x: -70, y: 90, r: -4 },
  { x: 30, y: 100, r: 8 },
  { x: 100, y: -20, r: 6 },
];

/* Straight green underline — sits under "health" only (Figma LINE #10580:2146,
   strokeWeight 4.215px, width 251.52). */
function StraightUnderline() {
  return (
    <span
      aria-hidden
      className={styles.underline}
    />
  );
}

function Heading() {
  return (
    <div data-problem-heading>
      <p
        className={styles.eyebrow}
        style={{ color: EYEBROW }}
      >
        The problem
      </p>
      <h2
        className={styles.headline}
        style={{ color: HEADLINE }}
      >
        <span className={styles.firstLine}>
          Your{" "}
          <span className="relative inline-block">
            health
            <StraightUnderline />
          </span>
        </span>
        <span
          className={styles.secondLine}
          style={{ transform: "rotate(-4.22deg)" }}
        >
          is{" "}
          <span className="relative inline-block">
            scattered.
            <StraightUnderline />
          </span>
        </span>
      </h2>
    </div>
  );
}

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      desktopMotion(() => {
        const root = sectionRef.current;
        if (!root) return;

        const photos = gsap.utils.toArray<HTMLElement>("[data-scatter]", root);

        /* Idle float — started when the entrance finishes, killed when the section
         is scrolled back out so the entrance can replay cleanly. */
        let floats: gsap.core.Tween[] = [];
        const startFloat = () => {
          killFloat();
          photos.forEach((el, i) => {
            floats.push(
              gsap.to(el, {
                y: "+=12",
                duration: 2.2 + (i % 3) * 0.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                delay: (i % 4) * 0.35,
              }),
            );
          });
        };
        const killFloat = () => {
          floats.forEach((t) => t.kill());
          floats = [];
        };

        /* Plays forward on enter, reverses when scrolled back out — so it replays
         every time you come back to the section. */
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            toggleActions: "play none none reverse",
            onLeaveBack: killFloat,
            onLeave: killFloat,
            onEnterBack: () => {
              if (tl.progress() === 1) startFloat();
            },
          },
        });

        photos.forEach((el, i) => {
          const d = DIRECTIONS[i % DIRECTIONS.length];
          tl.fromTo(
            el,
            { x: d.x, y: d.y, rotate: d.r, opacity: 0 },
            {
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
            },
            0.1 + i * 0.09,
          );
        });

        tl.fromTo(
          "[data-problem-heading]",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          0,
        );

        tl.eventCallback("onComplete", () => {
          if (tl.scrollTrigger?.isActive) startFloat();
        });
        return killFloat;
      }),
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="problem"
      className={styles.section}
      aria-label="The problem: your health is scattered"
    >
      <div className={styles.canvas}>
        <div
          className={styles.heading}
          style={{ "--heading-left": HEADING.left, "--heading-top": HEADING.top, "--heading-width": HEADING.width } as CSSProperties}
        >
          <Heading />
        </div>

        {IMAGES.map((p) => (
          <div
            key={p.src}
            data-scatter
            data-category={p.label}
            className={styles.item}
            style={
              {
                "--img-left": p.left,
                "--img-top": p.top,
                aspectRatio: p.ar,
                "--img-w": p.width,
                "--img-w-md": p.mobileWidth,
                "--img-left-md": p.mobileLeft,
                "--img-top-md": p.mobileTop,
                "--label-left": p.labelLeft,
                "--label-top": p.labelTop,
              } as CSSProperties
            }
          >
            <span className={styles.label}>{p.label}</span>
            <Image
              src={p.src}
              alt=""
              fill
              sizes="(max-width: 767px) 42vw, (max-width: 1440px) 22vw, 320px"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
