"use client";

import Image from "next/image";
import styles from "./FitnessKnowSection.module.css";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ---- md+: absolute replica of Figma node 11271:12254 (right block is 752 x 788 design px).
// --u = min(100vw/1440, (100dvh - 80px)/788) so the whole section fits one screen. ----
const u = (n: number) => `calc(${n} * var(--u))`;

// Coordinates match the supplied 504 x 561 reference canvas.
const CONNECTORS = [
  { label: "Shoulders", points: [[108, 101], [139, 101], [177, 124]], width: 1.3 },
  { label: "Back", points: [[394, 86], [376, 86], [242, 181]], width: 1.3 },
  { label: "Chest", points: [[106, 179], [132, 179], [197, 146]], width: 1.3 },
  { label: "Triceps", points: [[373, 185], [354, 185], [314, 171]], width: 0.7 },
  { label: "Biceps", points: [[108, 251], [128, 248], [162, 209]], width: 0.7 },
  { label: "Forearms", points: [[379, 261], [360, 261], [322, 232]], width: 0.7 },
  { label: "Core", points: [[123, 334], [163, 334], [241, 214]], width: 1.3 },
  { label: "Legs", points: [[351, 330], [303, 330], [274, 355]], width: 0.7 },
  { label: "Calves", points: [[357, 413], [309, 413], [280, 422]], width: 0.7 },
];

type Chip = { label: string; value: number; x: number; y: number; fillW: number };
const CHIPS: Chip[] = [
  { label: "Shoulders", value: 12, x: 15, y: 69, fillW: 8 },
  { label: "Chest", value: 18, x: 15, y: 147, fillW: 12 },
  { label: "Biceps", value: 11, x: 20, y: 226, fillW: 10 },
  { label: "Core", value: 11, x: 31, y: 313, fillW: 15 },
  { label: "Back", value: 22, x: 400, y: 56, fillW: 25 },
  { label: "Triceps", value: 27, x: 387, y: 150, fillW: 33 },
  { label: "Forearms", value: 14, x: 393, y: 231, fillW: 17 },
  { label: "Legs", value: 25, x: 362, y: 307, fillW: 21 },
  { label: "Calves", value: 23, x: 370, y: 388, fillW: 18 },
];
const d = (n: number) => `calc(${n} * var(--diagram-u))`;

// Small white markers trace the muscle fibers without replacing the source artwork.
const MUSCLE_MARKERS = [
  [227, 65], [239, 74], [245, 89], [232, 100], [247, 108],
  [182, 119], [193, 122], [211, 123], [223, 128], [236, 134], [244, 141], [253, 128], [268, 124], [286, 122], [299, 129],
  [170, 139], [186, 144], [203, 146], [219, 143], [230, 150], [248, 153], [265, 146], [284, 143], [307, 148],
  [169, 156], [178, 166], [192, 170], [211, 168], [223, 174], [245, 171], [262, 171], [279, 166], [302, 163], [314, 169],
  [159, 175], [166, 187], [184, 190], [211, 185], [229, 191], [246, 194], [270, 185], [284, 191], [316, 188], [325, 185],
  [154, 197], [162, 209], [178, 207], [219, 203], [234, 212], [245, 216], [264, 200], [281, 207], [316, 208], [325, 202],
  [148, 218], [155, 232], [168, 225], [212, 220], [223, 232], [245, 236], [264, 219], [277, 229], [322, 232], [334, 224],
  [143, 241], [150, 249], [161, 243], [210, 242], [227, 249], [243, 256], [263, 240], [276, 250], [328, 251], [339, 245],
  [140, 258], [152, 265], [163, 258], [207, 261], [222, 268], [233, 277], [253, 269], [268, 267], [331, 266], [342, 262],
  [197, 279], [209, 283], [219, 288], [231, 297], [254, 285], [266, 281], [277, 291], [285, 300],
  [193, 297], [203, 308], [215, 317], [229, 311], [252, 310], [263, 303], [275, 314], [287, 314],
  [192, 324], [201, 336], [217, 331], [230, 328], [253, 330], [266, 336], [276, 331], [290, 334],
  [194, 347], [204, 354], [216, 352], [228, 346], [255, 350], [266, 357], [279, 353], [287, 347],
  [195, 369], [210, 371], [225, 368], [258, 371], [272, 379], [283, 373],
  [195, 388], [208, 399], [219, 391], [262, 391], [276, 397], [285, 387],
  [196, 407], [207, 418], [220, 410], [262, 414], [274, 418], [286, 407],
  [196, 430], [209, 436], [220, 429], [263, 433], [276, 440], [285, 428],
  [200, 453], [211, 457], [218, 447], [265, 455], [275, 463], [280, 449],
  [202, 476], [212, 486], [216, 469], [266, 477], [275, 490], [279, 469],
];

function DesktopChip({ c }: { c: Chip }) {
  return (
    <div className={styles.chip} data-muscle-label={c.label}
      style={{ left: d(c.x), top: d(c.y) }}>
      <span className={styles.label}>{c.label}</span>
      <span className={styles.metric}>
        <span className={styles.value}>{c.value}</span><span className={styles.percent}>%</span>
      </span>
      <span className={styles.track}>
        <span className={styles.fill} style={{ width: d(c.fillW) }} />
      </span>
    </div>
  );
}

export default function FitnessKnowSection() {
  const diagramRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const diagram = diagramRef.current;
    if (!diagram) return;

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const body = diagram.querySelectorAll("[data-muscle-body]");
      gsap.set(body, { opacity: 0 });
      gsap.set(diagram.querySelectorAll("[data-muscle-label]"), {
        opacity: 0,
        scale: 0.9,
        transformOrigin: "center center",
      });
      gsap.set(diagram.querySelectorAll("[data-connector-path]"), { strokeDashoffset: 1 });
      gsap.set(diagram.querySelectorAll("[data-connector-start], [data-connector-end]"), { opacity: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: diagram,
          start: "top 90%",
          once: true,
        },
      });
      timeline.to(body, { opacity: 1, duration: 0.18, ease: "power1.out" }, 0);

      CONNECTORS.forEach(({ label }, index) => {
        const start = 0.22 + index * 0.15;
        const connector = diagram.querySelector(`[data-muscle-connector="${label}"]`)!;
        timeline
          .to(diagram.querySelector(`[data-muscle-label="${label}"]`), {
            opacity: 1,
            scale: 1,
            duration: 0.26,
            ease: "power2.out",
          }, start)
          .to(connector.querySelector("[data-connector-start]"), {
            opacity: 1, duration: 0.1,
          }, start)
          .to(connector.querySelector("path"), {
            strokeDashoffset: 0, duration: 0.32, ease: "power1.inOut",
          }, start)
          .to(connector.querySelector("[data-connector-end]"), {
            opacity: 1, duration: 0.08,
          }, start + 0.28);
      });
    });
    return () => media.revert();
  }, { scope: diagramRef });

  return (
    <section
      className="w-full bg-white px-5 py-16 md:px-[var(--p100)] md:py-10"
      style={
        {
          // md+: fit one viewport — 788px block + 40px top/bottom padding, never wider than the 1440 design
          "--us":
            "min(calc(min(100vw, 1440px) * 0.000694444), calc((100dvh - 80px) * 0.001194698))",
          "--u": "var(--us)",
          "--p100": u(100),
        } as React.CSSProperties
      }
    >
      {/* <md follows the 402px mobile frame (node 11911:36606): copy, the same diagram scaled to the column, caption */}
      <div
        className="mx-auto flex w-full max-w-360 flex-col gap-8 md:flex-row md:gap-[var(--gap48)]"
        style={{ ["--gap48" as string]: u(48) }}
      >
        {/* Left text column */}
        <div className="flex flex-col gap-8 md:min-w-0 md:flex-1 md:justify-between md:gap-0">
          <div className="flex flex-col">
            <h2
              className="comprehensive-serif italic leading-none text-[#17925A] text-[32px] md:text-[length:var(--know)]"
              style={{ ["--know" as string]: u(140) }}
            >
              Know
            </h2>
            <p
              className="leading-[normal] text-[#111110] text-[32px] md:text-[length:var(--sub)]"
              style={{ ["--sub" as string]: u(41) }}
            >
              Exactly what you are training for.
            </p>
          </div>
          <p
            className="hidden leading-[1.5] text-[#111110] md:block md:text-[length:max(13px,var(--body))]"
            style={{ ["--body" as string]: u(20) }}
          >
            Instead of simply counting workouts, Meddy measures how much
            training load you&apos;re putting on different areas of your body.
          </p>
        </div>

        {/* One proportional canvas preserves the reference at every screen width. */}
        <div ref={diagramRef} className={styles.diagram} aria-label="Training load by muscle group">
          <div data-muscle-body className={styles.body}>
            <Image src="/fitness/fitness-know-body-e5f944.png" alt="Human muscle anatomy, back view"
              fill sizes="(max-width: 767px) 45vw, 360px" className={styles.bodyImage} />
          </div>
          <svg data-muscle-body className={styles.markers} viewBox="0 0 504 561" aria-hidden="true">
            {MUSCLE_MARKERS.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="1.05" fill="white" />)}
          </svg>

          {/* Inline paths allow each connector to draw from card to muscle. */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 504 561"
            fill="none"
            aria-hidden="true"
          >
            {CONNECTORS.map(({ label, points, width }) => (
              <g key={label} data-muscle-connector={label}>
                <path
                  data-connector-path
                  d={points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ")}
                  stroke="#46524B"
                  strokeWidth={width}
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeDashoffset={0}
                />
                <circle data-connector-start cx={points[0][0]} cy={points[0][1]} r={1.6} fill="#46524B" />
                <circle data-connector-end cx={points[2][0]} cy={points[2][1]} r={1.6} fill="#46524B" />
              </g>
            ))}
          </svg>

          {/* metric chips */}
          {CHIPS.map((c) => (
            <DesktopChip key={c.label} c={c} />
          ))}
        </div>

        <p className="text-right leading-[1.5] text-[#111110] text-[16px] md:hidden">
          Instead of simply counting workouts, Meddy measures how much training
          load you&apos;re putting on different areas of your body.
        </p>
      </div>
    </section>
  );
}
