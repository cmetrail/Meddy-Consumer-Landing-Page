"use client";

import Image from "next/image";
import styles from "./FitnessKnowSection.module.css";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// ---- md+: absolute replica of Figma node 11271:12254 (right block is 752 x 788 design px).
// --u = min(100vw/1440, (100dvh - 80px)/788) so the whole section fits one screen. ----
const u = (n: number) => `calc(${n} * var(--u))`;

// Coordinates match the supplied 504 x 561 reference canvas.
const CONNECTORS = [
  {
    label: "Shoulders",
    points: [
      [108, 101],
      [139, 101],
      [177, 124],
    ],
    width: 1.3,
  },
  {
    label: "Back",
    points: [
      [394, 86],
      [376, 86],
      [254, 190],
    ],
    width: 1.3,
  },
  {
    label: "Chest",
    points: [
      [106, 179],
      [132, 179],
      [197, 146],
    ],
    width: 1.3,
  },
  {
    label: "Triceps",
    points: [
      [373, 185],
      [354, 185],
      [307, 173],
    ],
    width: 0.7,
  },
  {
    label: "Biceps",
    points: [
      [108, 251],
      [128, 248],
      [162, 209],
    ],
    width: 0.7,
  },
  {
    label: "Forearms",
    points: [
      [379, 261],
      [360, 261],
      [331, 239],
    ],
    width: 0.7,
  },
  {
    label: "Core",
    points: [
      [123, 334],
      [163, 334],
      [270, 280],
    ],
    width: 1.3,
  },
  {
    label: "Legs",
    points: [
      [351, 330],
      [303, 330],
      [274, 355],
    ],
    width: 0.7,
  },
  {
    label: "Calves",
    points: [
      [357, 413],
      [309, 413],
      [287, 428],
    ],
    width: 0.7,
  },
];

type Chip = {
  label: string;
  value: number;
  x: number;
  y: number;
};
const CHIPS: Chip[] = [
  { label: "Shoulders", value: 8, x: 15, y: 69 },
  { label: "Chest", value: 13, x: 15, y: 147 },
  { label: "Biceps", value: 7, x: 20, y: 226 },
  { label: "Core", value: 7, x: 31, y: 313 },
  { label: "Back", value: 15, x: 400, y: 56 },
  { label: "Triceps", value: 18, x: 387, y: 150 },
  { label: "Forearms", value: 5, x: 393, y: 231 },
  { label: "Legs", value: 11, x: 362, y: 307 },
  { label: "Calves", value: 16, x: 370, y: 388 },
];
const d = (n: number) => `calc(${n} * var(--diagram-u))`;

// Small white markers trace the muscle fibers without replacing the source artwork.
const MUSCLE_MARKERS = [
  [227, 65],
  [239, 74],
  [245, 89],
  [232, 100],
  [247, 108],
  [182, 119],
  [193, 122],
  [211, 123],
  [223, 128],
  [236, 134],
  [244, 141],
  [253, 128],
  [268, 124],
  [286, 122],
  [299, 129],
  [170, 139],
  [186, 144],
  [203, 146],
  [219, 143],
  [230, 150],
  [248, 153],
  [265, 146],
  [284, 143],
  [307, 148],
  [169, 156],
  [178, 166],
  [192, 170],
  [211, 168],
  [223, 174],
  [245, 171],
  [262, 171],
  [279, 166],
  [302, 163],
  [314, 169],
  [159, 175],
  [166, 187],
  [184, 190],
  [211, 185],
  [229, 191],
  [246, 194],
  [270, 185],
  [284, 191],
  [316, 188],
  [325, 185],
  [154, 197],
  [162, 209],
  [178, 207],
  [219, 203],
  [234, 212],
  [245, 216],
  [264, 200],
  [281, 207],
  [316, 208],
  [325, 202],
  [148, 218],
  [155, 232],
  [168, 225],
  [212, 220],
  [223, 232],
  [245, 236],
  [264, 219],
  [277, 229],
  [322, 232],
  [334, 224],
  [143, 241],
  [150, 249],
  [161, 243],
  [210, 242],
  [227, 249],
  [243, 256],
  [263, 240],
  [276, 250],
  [328, 251],
  [339, 245],
  [140, 258],
  [152, 265],
  [163, 258],
  [207, 261],
  [222, 268],
  [233, 277],
  [253, 269],
  [268, 267],
  [331, 266],
  [342, 262],
  [197, 279],
  [209, 283],
  [219, 288],
  [231, 297],
  [254, 285],
  [266, 281],
  [277, 291],
  [285, 300],
  [193, 297],
  [203, 308],
  [215, 317],
  [229, 311],
  [252, 310],
  [263, 303],
  [275, 314],
  [287, 314],
  [192, 324],
  [201, 336],
  [217, 331],
  [230, 328],
  [253, 330],
  [266, 336],
  [276, 331],
  [290, 334],
  [194, 347],
  [204, 354],
  [216, 352],
  [228, 346],
  [255, 350],
  [266, 357],
  [279, 353],
  [287, 347],
  [195, 369],
  [210, 371],
  [225, 368],
  [258, 371],
  [272, 379],
  [283, 373],
  [195, 388],
  [208, 399],
  [219, 391],
  [262, 391],
  [276, 397],
  [285, 387],
  [196, 407],
  [207, 418],
  [220, 410],
  [262, 414],
  [274, 418],
  [286, 407],
  [196, 430],
  [209, 436],
  [220, 429],
  [263, 433],
  [276, 440],
  [285, 428],
  [200, 453],
  [211, 457],
  [218, 447],
  [265, 455],
  [275, 463],
  [280, 449],
  [202, 476],
  [212, 486],
  [216, 469],
  [266, 477],
  [275, 490],
  [279, 469],
];

// Trace in the source image's 467 x 1024 coordinates. The SVG shares the
// image's exact box and aspect ratio, so resizing cannot shift the overlays.
// Anterior muscles have cards but no invented region on this posterior view.
const MUSCLE_REGIONS: Partial<Record<string, string>> = {
  Shoulders: "M72 247 C68 222 78 198 98 184 C112 175 130 173 146 178 C153 187 159 197 166 206 C130 209 101 227 72 247 Z M306 206 C312 197 320 186 330 178 C347 175 364 181 378 192 C393 205 398 225 398 246 C371 226 341 210 306 206 Z",
  Back: "M151 172 C184 160 207 137 217 112 C225 153 230 200 231 242 L230 369 C208 353 186 323 179 286 C173 254 170 217 151 172 Z M250 112 C261 140 281 159 321 173 C302 212 296 255 289 285 C279 326 257 357 238 370 L237 242 C238 197 243 151 250 112 Z M123 282 C144 292 161 285 177 275 C183 327 204 356 228 375 L225 425 C202 415 181 411 163 425 C151 389 134 333 123 282 Z M291 275 C307 288 327 289 345 281 C336 326 319 383 305 425 C286 412 263 416 241 428 L240 375 C269 351 284 317 291 275 Z",
  Triceps: "M94 245 C108 236 115 227 119 218 C120 249 127 273 114 306 C106 327 94 344 83 353 C88 325 91 288 94 245 Z M89 248 C69 256 58 279 53 306 C48 327 49 342 45 354 C67 341 81 312 87 283 Z M350 219 C358 232 368 239 376 245 C379 283 385 326 394 353 C377 342 364 323 356 300 C346 273 350 245 350 219 Z M382 250 C402 264 409 286 412 309 L422 357 C401 344 389 317 384 289 Z",
  Forearms: "M46 359 C59 354 70 346 80 333 C77 371 60 402 45 436 C38 452 33 474 28 490 L15 484 C20 443 24 403 46 359 Z M387 334 C398 347 410 355 422 359 C442 403 448 449 451 485 L436 490 C429 465 424 445 413 422 C400 397 390 365 387 334 Z",
  Core: "M164 435 C183 433 211 451 224 476 C233 494 236 523 226 548 C210 562 180 569 154 560 C138 552 136 535 140 513 C145 485 145 453 164 435 Z M304 435 C285 433 257 451 244 476 C235 494 232 523 242 548 C258 562 288 569 314 560 C330 552 332 535 328 513 C323 485 323 453 304 435 Z",
  Legs: "M132 554 C149 565 176 564 197 550 C209 584 211 616 204 650 C199 682 187 718 175 746 C165 725 155 705 147 682 C136 644 127 598 132 554 Z M129 566 C119 602 121 645 131 679 C137 704 146 726 157 745 C151 710 145 674 143 639 C139 607 136 584 129 566 Z M272 551 C291 564 318 565 335 553 C341 589 331 640 320 679 C312 703 302 728 290 747 C279 719 267 682 262 651 C255 614 260 580 272 551 Z M339 566 C350 605 346 644 337 679 C329 706 321 727 309 746 C316 715 322 674 325 639 C329 607 334 583 339 566 Z",
  Calves: "M145 754 C133 774 123 800 127 825 C129 845 138 858 151 859 C163 856 170 837 171 815 C171 792 164 770 158 755 C160 782 161 807 152 830 C147 807 149 777 145 754 Z M179 752 C190 773 205 797 208 820 C211 841 201 861 187 865 C173 854 171 837 173 817 C176 796 180 775 179 752 Z M287 754 C276 773 262 797 259 820 C256 843 266 862 280 865 C294 853 297 837 294 816 C291 794 287 775 287 754 Z M309 754 C303 773 296 793 296 815 C297 837 305 856 317 859 C331 858 340 845 341 825 C344 799 334 774 322 754 C317 780 320 807 315 831 C305 809 306 781 309 754 Z",
};
const isPosteriorMuscle = (label: string) => Boolean(MUSCLE_REGIONS[label]);

function DesktopChip({ c, active, onPreview, onSelect }: {
  c: Chip;
  active: boolean;
  onPreview: (label: string | null) => void;
  onSelect: (label: string) => void;
}) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${active ? styles.activeChip : ""}`}
      data-muscle-label={c.label}
      aria-label={`${c.label}: ${c.value}% of example training load`}
      aria-pressed={active}
      onPointerEnter={(event) => { if (event.pointerType === "mouse") onPreview(c.label); }}
      onPointerLeave={() => onPreview(null)}
      onFocus={() => onPreview(c.label)}
      onBlur={() => onPreview(null)}
      onClick={() => onSelect(c.label)}
      style={{ left: d(c.x), top: d(c.y) }}
    >
      <span className={styles.label}>{c.label}</span>
      <span className={styles.metric}>
        <span className={styles.value} data-load-value={c.value}>{c.value}</span>
        <span className={styles.percent}>%</span>
      </span>
      <span className={styles.track}>
        <span className={styles.fill} style={{ width: `${c.value}%` }} />
      </span>
    </button>
  );
}

export default function FitnessKnowSection() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState("Back");
  const [preview, setPreview] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(false);
  const active = preview ?? selected;
  const selectMuscle = (label: string) => { setSelected(label); setPlaying(false); };

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setPlaying(!media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    if (diagramRef.current) observer.observe(diagramRef.current);
    return () => { observer.disconnect(); media.removeEventListener("change", updateMotion); };
  }, []);

  useEffect(() => {
    if (!playing || !visible || preview) return;
    const timer = window.setInterval(() => {
      setSelected((current) => CHIPS[(CHIPS.findIndex((chip) => chip.label === current) + 1) % CHIPS.length].label);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [playing, visible, preview]);

  useGSAP(
    () => {
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
        gsap.set(diagram.querySelectorAll("[data-connector-path]"), {
          strokeDashoffset: 1,
        });
        gsap.set(
          diagram.querySelectorAll(
            "[data-connector-start], [data-connector-end]",
          ),
          { opacity: 0 },
        );

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: diagram,
            start: "top 90%",
            once: true,
          },
        });
        timeline.to(
          body,
          { opacity: 1, duration: 0.18, ease: "power1.out" },
          0,
        );

        diagram.querySelectorAll<HTMLElement>("[data-load-value]").forEach((node) => {
          timeline.fromTo(node, { textContent: 0 }, { textContent: Number(node.dataset.loadValue), snap: { textContent: 1 }, duration: 1.1, ease: "power2.out" }, 0.3);
        });
        timeline.fromTo(diagram.querySelectorAll(`.${styles.fill}`), { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.out" }, 0.3);

        CONNECTORS.forEach(({ label }, index) => {
          const start = 0.22 + index * 0.15;
          const connector = diagram.querySelector(
            `[data-muscle-connector="${label}"]`,
          )!;
          timeline
            .to(
              diagram.querySelector(`[data-muscle-label="${label}"]`),
              {
                opacity: 1,
                scale: 1,
                duration: 0.26,
                ease: "power2.out",
              },
              start,
            )
            .to(
              connector.querySelector("[data-connector-start]"),
              {
                opacity: 1,
                duration: 0.1,
              },
              start,
            )
            .to(
              connector.querySelector("path"),
              {
                strokeDashoffset: 0,
                duration: 0.32,
                ease: "power1.inOut",
              },
              start,
            )
            .to(
              connector.querySelector("[data-connector-end]"),
              {
                opacity: 1,
                duration: 0.08,
              },
              start + 0.28,
            );
        });
      });
      return () => media.revert();
    },
    { scope: diagramRef },
  );

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
        <div
          ref={diagramRef}
          className={styles.diagram}
          data-touring={playing && visible && !preview}
          aria-label="Training load by muscle group"
        >
          <div data-muscle-body className={styles.body}>
            <Image
              src="/fitness/fitness-know-body-e5f944.png"
              alt="Human muscle anatomy, back view"
              fill
              sizes="(max-width: 767px) 45vw, 360px"
              className={styles.bodyImage}
            />
          </div>
          <svg
            data-muscle-body
            className={styles.markers}
            viewBox="0 0 504 561"
            aria-hidden="true"
          >
            {MUSCLE_MARKERS.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.05" fill="white" />
            ))}
          </svg>

          <svg className={`${styles.body} ${styles.regions}`} viewBox="0 0 467 1024" role="group" aria-label="Explore muscle targets">
            {CHIPS.filter((chip) => isPosteriorMuscle(chip.label)).map((chip) => (
              <path
                key={chip.label}
                d={MUSCLE_REGIONS[chip.label]}
                className={`${styles.region} ${active === chip.label ? styles.activeRegion : ""}`}
                data-muscle-region={chip.label}
                role="button"
                tabIndex={0}
                aria-label={`Highlight ${chip.label}, ${chip.value}% example load`}
                aria-pressed={active === chip.label}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") setPreview(chip.label); }}
                onPointerLeave={() => setPreview(null)}
                onFocus={() => setPreview(chip.label)}
                onBlur={() => setPreview(null)}
                onClick={() => selectMuscle(chip.label)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); selectMuscle(chip.label); }
                }}
              />
            ))}
          </svg>

          {/* Inline paths allow each connector to draw from card to muscle. */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 504 561"
            fill="none"
            aria-hidden="true"
          >
            {CONNECTORS.map(({ label, points, width }) => (
              <g key={label} data-muscle-connector={label} className={active === label ? styles.activeConnector : undefined}>
                <path
                  data-connector-path
                  d={points
                    .map(
                      ([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`,
                    )
                    .join(" ")}
                  stroke="#46524B"
                  strokeWidth={width}
                  pathLength={1}
                  strokeDasharray="1 1"
                  strokeDashoffset={0}
                />
                <circle
                  data-connector-start
                  cx={points[0][0]}
                  cy={points[0][1]}
                  r={1.6}
                  fill="#46524B"
                />
                <circle
                  data-connector-end
                  cx={points[2][0]}
                  cy={points[2][1]}
                  r={1.6}
                  fill="#46524B"
                />
              </g>
            ))}
          </svg>

          {/* metric chips */}
          {CHIPS.map((c) => (
            <DesktopChip key={c.label} c={c} active={active === c.label} onPreview={setPreview} onSelect={selectMuscle} />
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
