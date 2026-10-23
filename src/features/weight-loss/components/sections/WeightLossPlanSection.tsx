"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./WeightLossPlanSection.module.css";

// Figma: desktop node 12593:13162 (1440 x 1024, content box 1200 / padding 120).
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
  w: 568,
  h: 528.305,
  body: { l: 101.54, t: 0, w: 382, h: 525, img: ["115.05%", "-16.38%", "127.32%", "0"] },
  fade: { l: 94.67, t: 396.12, w: 355.028, h: 132.184, stops: ["20.268%", "92.736%"] },
  ring: { l: -14.285, t: 208.174, w: 625.319, g: RING_D },
  head: { l: 101.54, t: 0, w: 368, h: 305, img: ["198.52%", "-16.9%", "132.16%", "0"] },
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

const PLAN_STEPS = [
  { title: "Your Data", icon: "icon-data.svg", tags: ["Nutrition", "Exercise", "Sleep", "Medications", "Labs", "Weight"] },
  { title: "Your Physician", icon: "icon-physician.svg", tags: ["Health history", "Symptoms", "Connected insights"] },
  { title: "Your Plan", icon: "icon-plan.svg", tags: ["Nutrition", "Exercise", "Testing", "Medications", "Follow-up"] },
  { title: "Your Progress", icon: "icon-response.svg", tags: ["Weight trends", "Health markers", "Plan adjustments"] },
];

export default function WeightLossPlanSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)", () => {
      const update = (self: ScrollTrigger) => setActive(Math.min(PLAN_STEPS.length - 1, Math.floor(self.progress * PLAN_STEPS.length)));
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top top",
        end: "bottom bottom",
        onUpdate: update,
        onRefresh: update,
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
          <h2 id="weight-loss-plan-heading">A weight-loss plan that changes when you do.</h2>
          <p className={`comprehensive-serif ${styles.subtitle}`}>Your physician sees the same data you do.</p>
        </header>

        <div className={styles.story}>
          <div className={styles.visual}>
            <div className={styles.photoDesktop}><PhotoStack ringId="wl-plan-ring-d" geo={PHOTO_D} /></div>
            <div className={styles.photoMobile}><PhotoStack ringId="wl-plan-ring-m" geo={PHOTO_M} /></div>
          </div>
          <div className={styles.panels}>
          {PLAN_STEPS.map((step, index) => (
          <article key={step.title} className={styles.panel} data-active={active === index} aria-labelledby={`weight-loss-step-${index}`}>
            <div className={styles.details}>
              <p className={styles.stepCount}>0{index + 1} /04</p>
              <div className={styles.stage}>
                <Image src={`${P}/${step.icon}`} alt="" width={72} height={72} unoptimized />
                <h3 id={`weight-loss-step-${index}`}>{step.title}</h3>
              </div>
              <ul className={styles.tags} aria-label="Connected health data">
                {step.tags.map(tag => <li key={tag}>{tag}</li>)}
              </ul>
            </div>
            <ul className={styles.bullets}>
              <li>No generic plan.</li>
              <li>No waiting months to find out whether it&apos;s working.</li>
            </ul>
          </article>
          ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
