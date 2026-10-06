"use client";

import Image from "next/image";
import { useRef, useState, type PointerEvent, type FocusEvent } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import FitnessPhysician from "./FitnessPhysician";
import styles from "./FitnessPlanSection.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// lg+: Figma node 11601:4001 (1440 wide, 1029 tall) scaled by --u so the section fits one viewport:
//   --u = min(100vw, 1440px) / 1440  vs  100dvh / 1029, whichever is smaller
const u = (n: number) => `calc(${n} * var(--u))`;

type Card = { title: string; icon: string; iconW: number; x: number; y: number; w: number };
type Chip = { text: string; x: number; y: number };

// x / y are design px inside the 1222.5 x 601 diagram box
const CARDS: Card[] = [
  { title: "Your Body", icon: "/fitness/plan-icon-body.svg", iconW: 18.063, x: 57.54, y: 90, w: 259.164 },
  { title: "Your Training", icon: "/fitness/plan-icon-dumbbell.svg", iconW: 24, x: 894.83, y: 109, w: 292 },
  { title: "Your Goals", icon: "/fitness/plan-icon-goal.svg", iconW: 24, x: 0, y: 503, w: 259.164 },
  { title: "Your Preferences", icon: "/fitness/plan-icon-pref.svg", iconW: 24, x: 944.5, y: 449, w: 259.164 },
];

const CHIPS: Chip[] = [
  { text: "Joint stress", x: 51.83, y: 30 },
  { text: "Spinal load", x: 306.83, y: 49 },
  { text: "Balance", x: 132.83, y: 160 },
  { text: "Impact", x: 261.83, y: 180 },
  { text: "Injuries", x: 19.83, y: 190 },
  { text: "Mobility", x: 89.83, y: 390 },
  { text: "Weight loss", x: 189.83, y: 440 },
  { text: "Strength", x: 8.42, y: 455 },
  { text: "Cardiovascular fitness", x: 188.83, y: 550 },
  { text: "Session mix", x: 873.83, y: 42 },
  { text: "Progress", x: 1063.83, y: 54 },
  { text: "Muscle Targets", x: 1073.83, y: 192 },
  { text: "Muscle load", x: 843.83, y: 202 },
  { text: "Intensity", x: 973.83, y: 232 },
  { text: "Exercises", x: 913.83, y: 375 },
  { text: "Equipment", x: 1086.83, y: 390 },
  { text: "Circuits", x: 956.83, y: 526 },
  { text: "Cardio", x: 1086.83, y: 556 },
];

// connector curves: box (x, y, w, h) + inner vector size / transform / svg overflow inset (%)
const LINES = [
  { src: "7502", x: 753.33, y: 136, w: 169, h: 100.5, iw: 169, ih: 100.5, t: "scaleX(-1)", inset: [5.31, 3.16] },
  { src: "7501", x: 246.64, y: 394.15, w: 175.129, h: 196.559, iw: 169, ih: 100.5, t: "rotate(-57.78deg)", inset: [5.31, 3.16] },
  { src: "7500", x: 277.83, y: 120.5, w: 169, h: 100.5, iw: 169, ih: 100.5, t: "", inset: [5.31, 3.16] },
  { src: "7503", x: 772.08, y: 370.64, w: 186.753, h: 187.442, iw: 148.967, ih: 115.657, t: "rotate(-134.16deg) scaleY(-1)", inset: [4.61, 3.58] },
];

// Mobile positions are measured within the reference's 298px diagram.
const m = (n: number) => `calc(${n} * var(--plan-mobile-u))`;
const MOBILE_CARDS = [
  { x: 4, y: 41 }, { x: 218, y: 47 },
  { x: 0, y: 301 }, { x: 196, y: 332 },
];
const MOBILE_CHIPS: Record<string, [number, number]> = {
  "Joint stress": [0, 16], "Spinal load": [62, 22],
  "Balance": [30, 67], "Impact": [51, 92], "Injuries": [-6, 85],
  "Mobility": [15, 245], "Weight loss": [40, 282], "Strength": [-6, 270],
  "Cardiovascular fitness": [6, 329], "Session mix": [171, 26],
  "Progress": [251, 15], "Muscle Targets": [224, 95],
  "Muscle load": [189, 0], "Intensity": [199, 72],
  "Exercises": [189, 307], "Equipment": [240, 300],
  "Circuits": [199, 365], "Cardio": [246, 356],
};
const MOBILE_LINES = [
  "M72 51 C88 51 92 61 101 76",
  "M218 53 C202 51 195 58 177 66",
  "M66 311 C82 311 91 308 108 301",
  "M196 342 C186 337 180 335 172 328",
];

export default function FitnessPlanSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [focusedCard, setFocusedCard] = useState<number | null>(null);
  const activeCard = hoveredCard ?? focusedCard;
  const movePhysician = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--physician-x", `${x * 8}px`);
    event.currentTarget.style.setProperty("--physician-y", `${y * 6}px`);
    event.currentTarget.style.setProperty("--physician-rx", `${-y * 2}deg`);
    event.currentTarget.style.setProperty("--physician-ry", `${x * 2}deg`);
  };
  const resetPhysician = (event: PointerEvent<HTMLDivElement>) => {
    ["--physician-x", "--physician-y", "--physician-rx", "--physician-ry"].forEach((property) => event.currentTarget.style.removeProperty(property));
    setHoveredCard(null);
  };
  const cardInteraction = (index: number) => ({
    onPointerEnter: () => setHoveredCard(index),
    onPointerLeave: () => setHoveredCard(null),
    onFocus: (event: FocusEvent<HTMLButtonElement>) => {
      if (event.currentTarget.matches(":focus-visible")) setFocusedCard(index);
    },
    onBlur: () => setFocusedCard(null),
  });

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add({
      desktop: "(min-width: 1024px)",
      mobile: "(max-width: 1023px)",
      reducedMotion: "(prefers-reduced-motion: reduce)",
    }, (context) => {
      if (context.conditions?.reducedMotion) return;
      const section = sectionRef.current;
      if (!section) return;

      // This context owns the prepared styles, timelines, and per-item triggers.
      const ctx = gsap.context(() => {
        const copy = Array.from(section.querySelectorAll<HTMLElement>("[data-plan-copy]"));
        gsap.from(copy, {
          opacity: 0, y: 30, duration: 0.95, stagger: 0.16, ease: "power3.out",
          scrollTrigger: { trigger: copy[0], start: "top 85%", once: true },
        });

        if (context.conditions?.desktop) {
          const diagram = section.querySelector<HTMLElement>("[data-plan-desktop]");
          if (!diagram) return;
          const image = diagram.querySelector<HTMLElement>("[data-plan-image]");
          if (!image) return;
          // Read the designed opacity (80%) instead of changing the final styling.
          const imageOpacity = Number(gsap.getProperty(image, "opacity"));
          const branches = CARDS.map((card, index) => ({
            left: card.x < 600,
            line: diagram.querySelector<HTMLElement>(`[data-plan-line="${index}"]`),
            card: diagram.querySelector<HTMLElement>(`[data-plan-card="${index}"]`),
            chips: Array.from(diagram.querySelectorAll<HTMLElement>(`[data-plan-chip="${index}"]`)),
          }));
          const timeline = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: diagram, start: "top 80%", once: true },
          });

          // Animate the outer portrait wrapper only; pointer tilt stays on its child.
          timeline.fromTo(image, { opacity: 0, y: 30, scale: 0.94 }, {
            opacity: imageOpacity, y: 0, scale: 1, duration: 1.4,
          }, 0);

          branches.forEach((branch, index) => {
            const connectionAt = 0.5 + index * 0.16;
            const cardAt = connectionAt + 0.95;
            if (branch.line) {
              // Left branches uncover right-to-left, right branches left-to-right.
              // Clipping the outer box preserves the rotated SVGs and hover pulses.
              timeline.fromTo(branch.line, {
                opacity: 0,
                clipPath: branch.left ? "inset(-10% -10% -10% 110%)" : "inset(-10% 110% -10% -10%)",
              }, {
                opacity: 1, clipPath: "inset(-10% -10% -10% -10%)",
                duration: 0.95, ease: "power2.inOut",
              }, connectionAt);
            }
            if (branch.card) {
              timeline.from(branch.card, {
                opacity: 0, x: branch.left ? -20 : 20, y: 12,
                scale: 0.92, duration: 0.8,
              }, cardAt);
            }
            timeline.from(branch.chips, {
              opacity: 0, y: 16, scale: 0.9,
              duration: 0.65, stagger: 0.065,
            }, cardAt + 0.55);
          });

          // One slow, sub-percent depth settle after construction; no idle loop
          // or competing scroll tween on the pointer-controlled physician.
          timeline.to(image, { scale: 1.008, y: -3, duration: 2, ease: "sine.inOut" })
            .to(image, { scale: 1, y: 0, duration: 2, ease: "sine.inOut", clearProps: "transform,opacity" });

          // Keyboard users can reach a card before the scroll sequence completes.
          const onFocus = (event: Event) => {
            if (event.target instanceof Element && event.target.closest("[data-plan-card]")) {
              timeline.totalProgress(1);
            }
          };
          diagram.addEventListener("focusin", onFocus);
          return () => diagram.removeEventListener("focusin", onFocus);
        }

        const mobile = section.querySelector<HTMLElement>("[data-plan-mobile]");
        if (!mobile) return;
        const elements = Array.from(mobile.querySelectorAll<HTMLElement>("[data-plan-image], [data-plan-card], [data-plan-chip]"));
        const items: { element: HTMLElement; timeline: gsap.core.Timeline; ready: boolean }[] = [];
        let next = 0;
        const advance = () => {
          if (items[next]?.ready) items[next].timeline.play();
        };

        // Each item must enter the viewport AND follow its predecessor. A fast
        // swipe still constructs portrait -> cards -> chips, with no scroll scrub.
        elements.forEach((element) => {
          const portrait = element.hasAttribute("data-plan-image");
          const chip = element.hasAttribute("data-plan-chip");
          const duration = portrait ? 1.2 : chip ? 0.45 : 0.65;
          const timeline = gsap.timeline({ paused: true }).from(element, {
            opacity: 0, y: portrait ? 30 : chip ? 14 : 12,
            scale: portrait ? 0.94 : chip ? 0.9 : 0.92,
            duration,
            ease: "power3.out", clearProps: "transform,opacity",
          }).call(() => { next++; advance(); }, [], chip ? 0.065 : duration);
          items.push({ element, timeline, ready: false });
        });
        items.forEach((item, index) => {
          ScrollTrigger.create({
            trigger: item.element, start: "top 85%", once: true,
            onEnter: () => { item.ready = true; if (index === next) advance(); },
          });
        });

        const onFocus = (event: Event) => {
          const index = items.findIndex((item) => event.target instanceof Node && item.element.contains(event.target));
          if (index < next) return;
          // Finish earlier entrances without leaving focus on an invisible button.
          while (next <= index) items[next].timeline.totalProgress(1);
        };
        mobile.addEventListener("focusin", onFocus);
        return () => mobile.removeEventListener("focusin", onFocus);
      }, section);
      return () => ctx.revert();
    });

    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#171718] lg:flex lg:min-h-[calc(1029*var(--u))] lg:flex-col lg:justify-end"
      style={{ "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000971817))" } as React.CSSProperties}
    >
      <div
        className={`mx-auto flex w-full max-w-360 flex-col gap-12 px-5 py-16 lg:max-w-[calc(1440*var(--u))] lg:gap-[var(--g48)] lg:px-[var(--p100)] lg:py-[var(--p100)] ${styles.content}`}
        style={{ ["--g48" as string]: u(48), ["--p100" as string]: u(100) }}
      >
        <div className={`flex flex-col gap-6 lg:flex-row lg:items-end lg:gap-[var(--g48)] ${styles.copy}`}>
          <h2 data-plan-copy className={`flex-1 text-[28px] font-normal leading-[normal] text-white sm:text-[36px] lg:text-[length:max(24px,var(--h))] ${styles.heading}`} style={{ ["--h" as string]: u(44) }}>
            Your workout plan is built by a{" "}
            <em className={`comprehensive-serif italic ${styles.physicianWord}`}>physician</em> who sees how
            you <em className="comprehensive-serif italic">train.</em>
          </h2>
          <p data-plan-copy className={`flex-1 text-[16px] leading-[normal] text-white lg:text-[length:max(13px,var(--p))] ${styles.description}`} style={{ ["--p" as string]: u(20) }}>
            Your Meddy physician sees your workouts, progress, training load,
            injuries, cardiovascular activity, recovery, and health data and
            uses that information to build and adjust your plan.
          </p>
        </div>

        <div data-plan-desktop onPointerMove={movePhysician} onPointerLeave={resetPhysician} className={`relative mx-auto hidden w-full lg:block ${styles.diagram}`} style={{ height: u(601), maxWidth: u(1222.5), ["--p16" as string]: u(16), ["--p8" as string]: u(8) }}>
          <div data-plan-image className="absolute overflow-hidden opacity-80" style={{ left: u(300.83), top: 0, width: u(601), height: u(601) }}>
            <FitnessPhysician src="/fitness/plan-physician-center-new.png" active={activeCard} sizes="700px" />
          </div>

          {LINES.map((l) => (
            <div key={l.src} data-plan-line={l.src === "7500" ? 0 : l.src === "7502" ? 1 : l.src === "7501" ? 2 : 3} className="absolute" style={{ left: u(l.x), top: u(l.y), width: u(l.w), height: u(l.h) }}>
              <div
                className="absolute left-1/2 top-1/2"
                style={{ width: u(l.iw), height: u(l.ih), transform: `translate(-50%, -50%) ${l.t}` }}
              >
                <Image
                  src={`/fitness/plan-vec-${l.src}.svg`}
                  alt=""
                  width={200}
                  height={120}
                  className="absolute max-w-none"
                  style={{
                    left: `-${l.inset[1]}%`,
                    top: `-${l.inset[0]}%`,
                    width: `${100 + 2 * l.inset[1]}%`,
                    height: `${100 + 2 * l.inset[0]}%`,
                  }}
                />
                <svg
                  aria-hidden="true"
                  className={styles.signal}
                  data-lit={activeCard === (l.src === "7500" ? 0 : l.src === "7502" ? 1 : l.src === "7501" ? 2 : 3)}
                  viewBox={l.src === "7503" ? "0 0 159.633 126.324" : "0 0 179.667 111.167"}
                  preserveAspectRatio="none"
                  style={{ left: `-${l.inset[1]}%`, top: `-${l.inset[0]}%`, width: `${100 + 2 * l.inset[1]}%`, height: `${100 + 2 * l.inset[0]}%` }}
                >
                  {[styles.signalTrack, styles.signalPulse].map((className) => (
                    <path key={className} className={className} fill="none" pathLength={100}
                      d={l.src === "7503" ? "M5.33333 5.33333 L48.3818 54.5936 C61.2169 69.2804 76.7404 81.3815 94.4043 90.4594 L154.3 120.991"
                        : l.src === "7502" ? "M5.33333 5.33333 L62.4102 21.2548 C87.2712 28.1897 109.9225 41.4223 128.173 59.6728 L174.333 105.833"
                        : l.src === "7501" ? "M5.33333 5.33333 L41.9445 44.3799 C64.2398 68.1582 92.8668 85.069 124.453 93.1197 L174.333 105.833"
                        : "M5.33333 5.33333 L49.464 11.4344 C90.53 17.11 127.42 39.53 151.368 73.3781 L174.333 105.833"}
                    />
                  ))}
                </svg>
              </div>
            </div>
          ))}

          <div
            className="absolute"
            style={{
              left: u(421.83),
              top: u(511),
              width: u(358),
              height: u(80),
              background: "linear-gradient(180deg, rgba(23,23,24,0) 0%, #171718 80.323%)",
            }}
          />

          {CARDS.map((c, index) => (
            <button
              key={c.title}
              type="button"
              {...cardInteraction(index)}
              data-plan-card={index}
              className={`absolute flex items-start border border-white/20 bg-[#111110] p-[var(--p16)] shadow-[0px_0px_5px_rgba(0,0,0,0.25)] ${styles.card}`}
              style={{ left: u(c.x), top: u(c.y), width: u(c.w), gap: u(8), borderRadius: u(12) }}
            >
              <Image
                src={c.icon}
                alt=""
                width={24}
                height={24}
                className="shrink-0"
                style={{ width: u(c.iconW), height: u(24) }}
              />
              <span className="whitespace-nowrap leading-[normal] text-white" style={{ fontSize: `max(12px, ${u(20)})` }}>
                {c.title}
              </span>
            </button>
          ))}

          {CHIPS.map((ch) => (
            <div
              key={ch.text}
              data-plan-chip={ch.x < 600 ? (ch.y < 300 ? 0 : 2) : (ch.y < 300 ? 1 : 3)}
              className="absolute whitespace-nowrap rounded-[36px] border border-white/20 bg-[#232323] px-[var(--p16)] py-[var(--p8)] shadow-[0px_0px_5px_rgba(0,0,0,0.25)]"
              style={{ left: u(ch.x), top: u(ch.y) }}
            >
              <span className="block italic leading-[normal] text-white" style={{ fontSize: `max(10px, ${u(16)})` }}>
                {ch.text}
              </span>
            </div>
          ))}
        </div>

        <div data-plan-mobile className={styles.mobileDiagram} aria-label="Your physician considers your body, training, goals, and preferences">
          <div data-plan-image className={styles.mobilePortrait}>
            <FitnessPhysician src="/fitness/plan-physician-center-new.png" active={activeCard}
              sizes="(max-width: 511px) 90vw, 448px" />
            <div className={styles.mobileFade} />
          </div>
          <svg className={styles.mobileConnectors} viewBox="0 0 298 390" aria-hidden="true">
            {MOBILE_LINES.map((path, index) => (
              <path key={path} d={path} fill="none" stroke="#abc8b5" strokeWidth="0.65"
                opacity={activeCard === index ? 1 : 0.7} />
            ))}
            {[[101, 76], [177, 66], [108, 301], [172, 328]].map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r="1.2" fill="#cce7d5" />
            ))}
          </svg>
          {CARDS.map((c, index) => (
            <button key={c.title} type="button" {...cardInteraction(index)} data-plan-card={index}
              className={`${styles.mobileCard} ${styles.card}`}
              style={{ left: m(MOBILE_CARDS[index].x), top: m(MOBILE_CARDS[index].y) }}>
              <Image src={c.icon} alt="" width={24} height={24} className={styles.mobileIcon} />
              <span>{c.title}</span>
            </button>
          ))}
          {CHIPS.map((ch) => (
            <div key={ch.text} data-plan-chip className={styles.mobileChip}
              style={{ left: m(MOBILE_CHIPS[ch.text][0]), top: m(MOBILE_CHIPS[ch.text][1]) }}>
              <span className={ch.y < 300 ? styles.mobileItalic : undefined}>{ch.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
