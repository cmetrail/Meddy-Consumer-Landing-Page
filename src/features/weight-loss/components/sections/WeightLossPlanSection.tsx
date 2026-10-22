"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./WeightLossPlanSection.module.css";

// Figma: desktop node 12593:13162 (1440 x 1361, fixed px, content box 1200 / padding 120), mobile node 12722:9067 (402 x 798).
// The revolving text ring uses the SVG textPath + <animate startOffset> technique from MedicationOrbitalSection.

const P = "/weight-loss/plan";
const BG = "#E4FAE1";

const RING_TEXT =
  "PRESCRIBE OR ADJUST - FOLLOW YOUR RESPONSE - REVIEW SYMPTOMS + HEALTH DATA + LABS - CONTINUE • ADJUST • REASSESS - ";

/** Ring geometry from the Figma "text circle" frame: viewBox, ellipse radii, font sizes, reflection offset. */
type RingGeo = { w: number; h: number; rx: number; ry: number; font: number; shadowFont: number; shadowDy: number };
const RING_D: RingGeo = { w: 1027.8, h: 294.1, rx: 421.5, ry: 94.5, font: 32, shadowFont: 36, shadowDy: 56 };
const RING_M: RingGeo = { w: 384.67, h: 122.23, rx: 156.7, ry: 36.2, font: 14, shadowFont: 15.5, shadowDy: 21 };

const motionQuery = "(prefers-reduced-motion: no-preference)";
function subscribeMotion(notify: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
const motionSnapshot = () => window.matchMedia(motionQuery).matches;
const serverMotionSnapshot = () => false;

/** Elliptical text ring: `front` (green) or `shadow` (blurred, flattened gray reflection). The copy slowly travels along the path. */
function Ring({ id: baseId, part, g }: { id: string; part: "front" | "shadow"; g: RingGeo }) {
  const animate = useSyncExternalStore(subscribeMotion, motionSnapshot, serverMotionSnapshot);
  const id = `${baseId}-${part}`;
  const dur = "60s";
  const cx = g.w / 2;
  const cy = g.h / 2;
  const perim = Math.PI * (3 * (g.rx + g.ry) - Math.sqrt((3 * g.rx + g.ry) * (g.rx + 3 * g.ry)));
  // clockwise from the bottom, so the copy reads upright across the top
  const path = `M ${cx} ${cy + g.ry} A ${g.rx} ${g.ry} 0 1 1 ${cx} ${cy - g.ry} A ${g.rx} ${g.ry} 0 1 1 ${cx} ${cy + g.ry}`;
  const k = g.font / 32;
  const texts = (fill: string, size: number) => (
    <>
      {[0, -perim].map((from, i) => (
        <text key={i} fontSize={size} fontWeight="600" fill={fill} stroke={fill} strokeWidth={0.8 * k} style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          <textPath href={`#${id}`} startOffset={from} textLength={perim} lengthAdjust="spacing">
            {RING_TEXT}
            {animate && <animate attributeName="startOffset" from={from} to={from + perim} dur={dur} repeatCount="indefinite" />}
          </textPath>
        </text>
      ))}
    </>
  );
  return (
    <svg viewBox={`0 0 ${g.w} ${g.h}`} className="block w-full overflow-visible" aria-hidden="true">
      <defs>
        <path id={id} d={path} fill="none" />
        <filter id={`${id}-blur`} x="-10%" y="-60%" width="120%" height="220%">
          <feGaussianBlur stdDeviation={2 * k} />
        </filter>
      </defs>
      {part === "shadow" ? (
        <g transform={`translate(0 ${cy + g.shadowDy}) scale(1 -0.4) translate(0 -${cy})`} filter={`url(#${id}-blur)`} opacity="0.3">
          {texts("#A9A9A9", g.shadowFont)}
        </g>
      ) : (
        texts("#17925A", g.font)
      )}
    </svg>
  );
}

type Box = { l: number; t: number; w: number; h: number };
type PhotoGeo = {
  w: number;
  h: number;
  body: Box & { img: [string, string, string, string] };
  fade: Box & { stops: [string, string] };
  ring: { l: number; t: number; w: number; g: RingGeo };
  head: Box & { img: [string, string, string, string] };
};
const PHOTO_D: PhotoGeo = {
  w: 931.25,
  h: 809,
  body: { l: 167.49, t: 0, w: 581.19, h: 803.94, img: ["115.05%", "-16.38%", "127.32%", "0"] },
  fade: { l: 155.22, t: 606.54, w: 582.08, h: 202.46, stops: ["20.268%", "92.736%"] },
  ring: { l: -10, t: 308.39, w: 1027.85, g: RING_D },
  head: { l: 166.48, t: 0, w: 560.32, h: 465.92, img: ["198.52%", "-16.9%", "132.16%", "0"] },
};
const PHOTO_M: PhotoGeo = {
  w: 362,
  h: 313,
  body: { l: 70.65, t: 0.11, w: 226.01, h: 312.63, img: ["115.05%", "-16.38%", "127.32%", "0"] },
  fade: { l: 68, t: 228.89, w: 226, h: 84, stops: ["20.268%", "101.53%"] },
  ring: { l: -11, t: 93.85, w: 384.67, g: RING_M },
  head: { l: 72, t: 0, w: 218, h: 162, img: ["221.94%", "-17.02%", "132.04%", "0.07%"] },
};

const imgStyle = ([h, l, w, t]: [string, string, string, string]) => ({ height: h, left: l, width: w, top: t });

/**
 * Doctor + revolving ring. The body and the head overlay are the SAME photo at the same offset, so the ring
 * passes in front of the body but behind the head, and the gray reflection sits behind the body.
 * `--k` = px per design unit.
 */
function PhotoStack({ ringId, geo }: { ringId: string; geo: PhotoGeo }) {
  const u = (n: number) => `calc(${n} * var(--k))`;
  const { body, fade, ring, head } = geo;
  return (
    <div className="relative shrink-0" style={{ width: u(geo.w), height: u(geo.h) }}>
      <div className="pointer-events-none absolute" style={{ left: u(ring.l), top: u(ring.t), width: u(ring.w) }}>
        <Ring id={ringId} part="shadow" g={ring.g} />
      </div>
      <div className="absolute overflow-hidden" style={{ left: u(body.l), top: u(body.t), width: u(body.w), height: u(body.h) }}>
        <Image src={`${P}/doctor.png`} alt="Meddy physician" width={1080} height={1350} sizes="600px" priority className="absolute max-w-none" style={imgStyle(body.img)} />
      </div>
      <div
        className="absolute"
        style={{ left: u(fade.l), top: u(fade.t), width: u(fade.w), height: u(fade.h), background: `linear-gradient(180deg, rgba(228,250,225,0) ${fade.stops[0]}, #E4FAE1 ${fade.stops[1]})` }}
      />
      <div className="pointer-events-none absolute" style={{ left: u(ring.l), top: u(ring.t), width: u(ring.w) }}>
        <Ring id={ringId} part="front" g={ring.g} />
      </div>
      <div className="absolute overflow-hidden" style={{ left: u(head.l), top: u(head.t), width: u(head.w), height: u(head.h) }}>
        <Image src={`${P}/doctor.png`} alt="" width={1080} height={1350} sizes="600px" priority className="absolute max-w-none" style={imgStyle(head.img)} />
      </div>
    </div>
  );
}

const PLAN_ITEMS = [
  {
    icon: "icon-data.svg", label: "Your data", title: "It starts with your whole picture.",
    description: "Bring your nutrition, exercise, sleep, medications, labs, and weight together. See how your daily habits connect to your progress.",
    tags: ["Nutrition", "Exercise", "Sleep", "Medications", "Labs", "Weight"],
    outcome: "Your health data, connected.",
  },
  {
    icon: "icon-physician.svg", label: "Your physician", title: "Shared data. Personal care.",
    description: "Your physician reviews the same picture you see, alongside your symptoms and health history, to understand what is moving your weight.",
    tags: ["Health history", "Symptoms", "Connected insights"],
    outcome: "A physician who sees the whole you.",
  },
  {
    icon: "icon-plan.svg", label: "Your plan", title: "A plan built around you.",
    description: "Your physician creates a plan around your goals and health, connecting nutrition, exercise, testing, and medication when appropriate.",
    tags: ["Nutrition", "Exercise", "Testing", "Medications", "Follow-up"],
    outcome: "Clear next steps, made personal.",
  },
  {
    icon: "icon-response.svg", label: "Your progress", title: "Measure. Learn. Adjust.",
    description: "Follow changes in your weight, habits, and health markers. Your physician reviews your response and adjusts your plan as your needs change.",
    tags: ["Weight trends", "Health markers", "Plan adjustments"],
    outcome: "Your progress informs what comes next.",
  },
];

export default function WeightLossPlanSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)", () => {
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setActive(Math.min(3, Math.floor(self.progress * 4))),
        onRefresh: (self) => setActive(Math.min(3, Math.floor(self.progress * 4))),
      });
      return () => trigger.kill();
    });
    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} id="weight-loss-plan" className={styles.section} aria-labelledby="weight-loss-plan-heading" style={{ background: BG }}>
      <div className={styles.sticky}>
        <div className={styles.inner}>
          <header className={styles.heading}>
            <p className={styles.eyebrow}>CONNECTED DATA. CONTINUOUS CARE.</p>
            <h2 id="weight-loss-plan-heading">A weight-loss plan that changes when you do.</h2>
            <p className={`comprehensive-serif ${styles.subtitle}`}>Your physician sees the same data you do.</p>
          </header>

          <div className={styles.story}>
            <div className={styles.visual}>
              <div className={styles.photoDesktop}><PhotoStack ringId="wl-plan-ring-d" geo={PHOTO_D} /></div>
              <div className={styles.photoMobile}><PhotoStack ringId="wl-plan-ring-m" geo={PHOTO_M} /></div>
              <div className={styles.visualCaption}><span /> Your data and your care, always connected.</div>
            </div>
            <div className={styles.panels}>
              {PLAN_ITEMS.map((item, index) => (
                <article key={item.label} id={`weight-loss-step-${index}`} className={styles.panel} data-active={index === active}>
                  <div className={styles.stepTop}>
                    <Image src={`${P}/${item.icon}`} alt="" width={96} height={96} unoptimized />
                    <span className={styles.stepCount}>0{index + 1} <span>/ 04</span></span>
                  </div>
                  <p className={styles.stageLabel}>{item.label}</p>
                  <h3>{item.title}</h3>
                  <p className={styles.description}>{item.description}</p>
                  <div className={styles.tags}>{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <p className={styles.outcome}><span aria-hidden="true">↗</span>{item.outcome}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
