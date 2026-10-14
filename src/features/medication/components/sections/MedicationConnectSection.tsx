"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./MedicationConnectSection.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Figma node 11274:1266 "Desktop - 359" — scroll-connected care diagram.
// Scaled by width only so it keeps its natural aspect ratio:
//   --u = min(100vw, 1440px) / 1440
const u = (n: number) => `calc(${n} * var(--u))`;

const grad = (deg: number) =>
  `linear-gradient(${deg}deg, rgb(227, 239, 223) 28.962%, rgb(246, 244, 237) 42.836%, rgb(246, 244, 237) 63.859%, rgb(240, 230, 207) 100.98%)`;
const CARD_BG = grad(155);

// NB: the global reset zeroes inline padding, so padding goes through classes + vars
const PAD_PILL = "px-[var(--px)] py-[var(--py)]";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-[31px] border border-[#6E7A72] ${PAD_PILL}`}
      style={{ ["--px" as string]: u(10), ["--py" as string]: u(5) }}
    >
      <span className="leading-[normal] text-[#6E7A72]" style={{ fontSize: `max(10px, ${u(14)})` }}>
        {children}
      </span>
    </span>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <span className="comprehensive-serif italic leading-[normal] text-[#46524B]" style={{ fontSize: `max(26px, ${u(46)})` }}>
      {children}
    </span>
  );
}

function Number({ children }: { children: React.ReactNode }) {
  return (
    <span className="px-[var(--px)] leading-[normal] text-[#A1AAA3]" style={{ fontSize: `max(16px, ${u(24)})`, ["--px" as string]: u(2) }}>
      {children}
    </span>
  );
}

/** glass card shell, absolutely placed on the 1440 frame */
function Card({ x, y, w, deg, className = "", children }: { x: number; y: number; w?: number; deg: number; className?: string; children: React.ReactNode }) {
  return (
    <div
      data-connect-card
      className={`absolute border border-[#46524B] p-[var(--cp)] ${styles.card} ${className}`}
      style={{ left: u(x), top: u(y), width: w ? u(w) : undefined, background: grad(deg), borderRadius: u(10), ["--cp" as string]: u(15) }}
    >
      {children}
    </div>
  );
}

// mobile helpers: 1 Figma px = var(--m)
const m = (n: number) => `calc(${n} * var(--m))`;

function MCard({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) {
  return (
    <div
      data-connect-card
      className={`absolute flex items-start border-solid border-[#46524B] p-[var(--cp)] ${styles.card}`}
      style={{ background: CARD_BG, ["--cp" as string]: style.padding, ...style, padding: undefined } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
const MNum = ({ children }: { children: string }) => (
  <span className="leading-[normal] text-[#A1AAA3]" style={{ fontSize: m(16), paddingLeft: 0 }}>{children}</span>
);
const MTitle = ({ children }: { children: string }) => (
  <span className="comprehensive-serif italic leading-[normal] text-[#46524B]" style={{ fontSize: m(18.6) }}>{children}</span>
);
function MPill({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center justify-center whitespace-nowrap rounded-[22px] border-[0.7px] border-solid border-[#6E7A72] px-[var(--px)] py-[var(--py)]" style={{ ["--px" as string]: m(8), ["--py" as string]: m(4) }}>
      <span className="leading-[normal] text-[#6E7A72]" style={{ fontSize: m(12) }}>{children}</span>
    </span>
  );
}
function MImg({ src, w, h, style, crop }: { src: string; w: number; h: number; style: React.CSSProperties; crop?: React.CSSProperties }) {
  return (
    <div className="relative shrink-0 overflow-hidden" style={style}>
      <Image src={`/medication/connect/${src}`} alt="" width={w} height={h} sizes="200px" className={crop ? "absolute max-w-none" : "h-full w-full object-cover"} style={crop} />
    </div>
  );
}

function Connectors({ mobile = false }: { mobile?: boolean }) {
  // Normalized SVGs keep the diagram visible even before hydration.
  const paths = mobile
    ? ["M272.5 71.4 H312 Q332 71.4 332 91.4 V171.5", "M95 245 H54 Q34 245 34 265 V350.6"]
    : ["M512 456 H1067 Q1107 456 1107 496 V576", "M848 676 H346 Q306 676 306 716 V863"];
  return (
    <svg data-connect-lines className={styles.lines} viewBox={mobile ? "0 0 364 538.6" : "0 0 1440 1550"} preserveAspectRatio="none" aria-hidden="true">
      {paths.map((d, i) => (
        <g key={i}>
          <path data-connect-track d={d} className={styles.track} />
          <path data-connect-path d={d} pathLength="1" className={styles.progress} />
          <circle data-connect-tip r={mobile ? 3 : 5} className={styles.tip} opacity="0" />
          <circle data-connect-node r={mobile ? 3 : 5} className={styles.node} opacity="0" />
        </g>
      ))}
    </svg>
  );
}

export default function MedicationConnectSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 1024px)", mobile: "(max-width: 1023px)", reduce: "(prefers-reduced-motion: reduce)" }, (context) => {
      const root = sectionRef.current!;
      const desktop = Boolean(context.conditions?.desktop);
      const layout = root.querySelector<HTMLElement>(desktop ? "[data-connect-desktop]" : "[data-connect-mobile]")!;
      const scene = layout.querySelector<HTMLElement>("[data-connect-scene]") ?? layout;
      const cards = Array.from(scene.querySelectorAll<HTMLElement>("[data-connect-card]"));
      const svg = scene.querySelector<SVGSVGElement>("[data-connect-lines]")!;
      const paths = Array.from(svg.querySelectorAll<SVGPathElement>("[data-connect-path]"));
      const tracks = Array.from(svg.querySelectorAll<SVGPathElement>("[data-connect-track]"));
      const tips = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-connect-tip]"));
      const nodes = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-connect-node]"));

      const measure = () => {
        svg.setAttribute("viewBox", `0 0 ${scene.offsetWidth} ${scene.offsetHeight}`);
        paths.forEach((path, i) => {
          const from = cards[i];
          const to = cards[i + 1];
          const x = from.offsetLeft + (i === 0 ? from.offsetWidth : 0);
          const y = from.offsetTop + from.offsetHeight * 0.48;
          const endX = to.offsetLeft + to.offsetWidth * (i === 0 ? 0.82 : 0.22);
          const endY = to.offsetTop;
          const direction = i === 0 ? 1 : -1;
          const radius = Math.min(desktop ? 32 : 18, Math.abs(endX - x) / 2, Math.max(1, endY - y) / 2);
          const d = `M${x} ${y} H${endX - direction * radius} Q${endX} ${y} ${endX} ${y + radius} V${endY}`;
          path.setAttribute("d", d);
          tracks[i].setAttribute("d", d);
          nodes[i].setAttribute("cx", String(endX));
          nodes[i].setAttribute("cy", String(endY));
        });
      };
      measure();
      ScrollTrigger.addEventListener("refreshInit", measure);

      if (!context.conditions?.reduce) {
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            id: "medication-connect",
            trigger: scene,
            start: () => `top+=${cards[0].offsetTop} 88%`,
            end: () => `top+=${cards[2].offsetTop + cards[2].offsetHeight} 72%`,
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });
        gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 });
        cards.forEach((card, i) => {
          const at = [0, 1.65, 3.3][i];
          timeline.fromTo(card,
            { autoAlpha: 0, y: desktop ? 65 : 28, scale: 0.94, rotation: i === 1 ? 2 : -2 },
            { autoAlpha: 1, y: 0, scale: 1, rotation: 0, duration: 0.85 }, at);
          timeline.fromTo(card.querySelectorAll("img"), { scale: 1.16 }, { scale: 1, duration: 1.1 }, at);
          timeline.fromTo(card.querySelectorAll("span"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.035, duration: 0.4 }, at + 0.15);
        });
        paths.forEach((path, i) => {
          const at = 0.65 + i * 1.65;
          const travel = { progress: 0 };
          // Preserve fractional offsets on the normalized path instead of rounding to pixels.
          timeline.to(path, { strokeDashoffset: 0, autoRound: false, ease: "none", duration: 1.15 }, at);
          timeline.to(tips[i], { opacity: 1, duration: 0.12 }, at);
          timeline.to(travel, {
            progress: 1, ease: "none", duration: 1.15,
            onUpdate: () => {
              const point = path.getPointAtLength(path.getTotalLength() * travel.progress);
              tips[i].setAttribute("cx", String(point.x));
              tips[i].setAttribute("cy", String(point.y));
            },
          }, at);
          timeline.to(tips[i], { opacity: 0, duration: 0.2 }, at + 1.15);
          timeline.fromTo(nodes[i], { opacity: 0, scale: 0, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3 }, at + 1.05);
        });
        gsap.fromTo(layout.querySelectorAll("[data-connect-intro]"), { autoAlpha: 0, y: 24 }, {
          autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: layout, start: "top 82%", toggleActions: "play none none reverse" },
        });
        gsap.fromTo(layout.querySelector("[data-connect-outro]"), { autoAlpha: 0, y: 20 }, {
          autoAlpha: 1, y: 0, duration: 0.7,
          scrollTrigger: { trigger: layout.querySelector("[data-connect-outro]"), start: "top 94%", toggleActions: "play none none reverse" },
        });
      }
      return () => {
        ScrollTrigger.removeEventListener("refreshInit", measure);
        tips.forEach((tip) => { tip.removeAttribute("cx"); tip.removeAttribute("cy"); });
      };
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="medication-connect"
      className="relative w-full overflow-hidden bg-[#FFFEF2]"
      style={{ ["--u" as string]: "calc(min(100vw, 1440px) * 0.000694444)" }}
    >
      {/* Desktop (lg+) — Figma node 11274:1266 (1440 x 1550) absolute layout */}
      <div data-connect-desktop className="relative mx-auto hidden max-w-360 lg:block" style={{ height: u(1550) }}>
        {/* Connector lines (drawn under the cards) */}
        <Connectors />

        {/* Heading (left) */}
        <div data-connect-intro className="absolute flex flex-col leading-[normal]" style={{ left: 40, top: u(74) }}>
          <span className="whitespace-nowrap text-[#A1AAA3]" style={{ fontSize: `max(22px, ${u(36)})` }}>Keep your medications</span>
          <span className="comprehensive-serif whitespace-nowrap italic text-[#46524B]" style={{ fontSize: `max(24px, ${u(38)})` }}>
            connected to your care.
          </span>
        </div>

        {/* Statement (right) */}
        <div data-connect-intro className="absolute flex flex-col uppercase leading-[normal]" style={{ left: u(800), top: u(189), width: u(565), gap: u(10), fontSize: `max(20px, ${u(36)})` }}>
          <span className="text-right text-[#A1AAA3]">One place to understand</span>
          <span className="whitespace-nowrap font-medium italic text-[#6E7A72]">what you&apos;re taking and why.</span>
        </div>

        {/* Card 01 — Vitamin D */}
        <Card x={75} y={355} deg={156.85}>
          <div className="flex items-start" style={{ gap: u(47) }}>
            <div className="flex flex-col" style={{ width: u(234) }}>
              <Number>01</Number>
              <div className="flex flex-col" style={{ gap: u(9) }}>
                <CardTitle>Vitamin D</CardTitle>
                <div className="flex flex-wrap" style={{ gap: u(5) }}>
                  <Pill>50,000 IU</Pill>
                  <Pill>Once Weekly</Pill>
                  <Pill>Oral</Pill>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 overflow-hidden" style={{ width: u(118), height: u(110), borderRadius: u(5) }}>
              <Image src="/medication/connect/d-card-01.png" alt="" fill sizes="240px" className="object-cover" />
            </div>
          </div>
        </Card>

        {/* Card 02 — Why you're taking it */}
        <Card x={848} y={576} w={517} deg={157.22}>
          <div className="flex items-start justify-between">
            <div className="flex flex-col" style={{ width: u(344), gap: u(5) }}>
              <Number>02</Number>
              <div className="flex flex-col" style={{ gap: u(9) }}>
                <CardTitle>Why you&apos;re taking it</CardTitle>
                <div className="flex flex-wrap" style={{ gap: u(5) }}>
                  <Pill>Type II Diabetes</Pill>
                </div>
              </div>
            </div>
            <div className="relative shrink-0 overflow-hidden" style={{ width: u(118), height: u(110), borderRadius: u(5) }}>
              <Image src="/medication/connect/d-card-02.png" alt="" width={736} height={1104} sizes="240px" className="absolute max-w-none" style={{ left: 0, top: "-61%", width: "100%", height: "160.91%" }} />
            </div>
          </div>
        </Card>

        {/* Card 03 — What we're following */}
        <Card x={75} y={863} w={519} deg={139.49}>
          <div className="flex flex-col" style={{ gap: u(34) }}>
            <div className="relative overflow-hidden" style={{ height: u(234), borderRadius: u(5) }}>
              <Image src="/medication/connect/d-card-03.png" alt="" width={1057} height={670} sizes="520px" className="absolute max-w-none" style={{ left: 0, top: "-0.18%", width: "100%", height: "131.92%" }} />
            </div>
            <div className="flex flex-col" style={{ gap: u(20) }}>
              <div className="flex flex-col">
                <Number>03</Number>
                <CardTitle>What we&apos;re following</CardTitle>
              </div>
              <div className="flex flex-col" style={{ gap: u(10) }}>
                <div className="flex" style={{ gap: u(5) }}>
                  <Pill>Fasting Blood Glucose</Pill>
                  <Pill>A1c</Pill>
                </div>
                <div className="flex" style={{ gap: u(5) }}>
                  <Pill>Post Prandial Glucose</Pill>
                  <Pill>Vitamin D Levels</Pill>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Closing note */}
        <div data-connect-outro className="absolute flex items-center justify-end" style={{ left: u(828), top: u(1253), gap: u(8) }}>
          <span className="whitespace-pre text-right uppercase leading-[normal] text-[#6E7A72]" style={{ fontSize: `max(20px, ${u(36)})` }}>
            {"Your physician sees the \nsame connected picture."}
          </span>
          <Image src="/medication/connect/d-bar.svg" alt="" width={12} height={90} unoptimized style={{ width: u(12), height: u(90), transform: "scaleY(-1)" }} />
        </div>
      </div>

      {/* Mobile / tablet (<lg) — Figma node 12306:29654 (402 wide); 1 design px = --m */}
      <div
        data-connect-mobile
        className="mx-auto flex max-w-[500px] flex-col items-center px-[var(--p20)] py-[var(--p64)] lg:hidden"
        style={{ ["--m" as string]: "calc(min(100vw, 500px) / 402)", ["--p20" as string]: "20px", ["--p64" as string]: m(64), gap: m(32) } as React.CSSProperties}
      >
        {/* Heading */}
        <div data-connect-intro className="flex w-full flex-col items-start whitespace-nowrap text-left leading-[normal]" style={{ gap: m(16) }}>
          <div className="flex flex-col items-start">
            <span className="text-[#A1AAA3]" style={{ fontSize: m(24) }}>Keep your medications</span>
            <span className="comprehensive-serif italic text-[#46524B]" style={{ fontSize: m(32) }}>connected to your care.</span>
          </div>
          <div className="flex flex-col items-start uppercase" style={{ gap: m(5), fontSize: m(16) }}>
            <span className="text-[#A1AAA3]">One place to understand</span>
            <span className="font-medium italic text-[#6E7A72]">what you&apos;re taking and why.</span>
          </div>
        </div>

        {/* Diagram: three cards joined by two connector lines */}
        <div data-connect-scene className="relative" style={{ width: m(364), height: m(538.6) }}>
          <Connectors mobile />

          {/* 01 */}
          <MCard style={{ left: 0, top: 0, width: m(272.5), height: m(142.8), padding: m(16.7), borderRadius: m(7.12), borderWidth: m(0.712) }}>
            <div className="flex items-center justify-between" style={{ width: "100%" }}>
              <div className="flex flex-col" style={{ width: m(155) }}>
                <MNum>01</MNum>
                <MTitle>Vitamin D</MTitle>
                <div className="flex flex-wrap" style={{ gap: m(8), marginTop: m(6.4) }}>
                  <MPill>50,000 IU</MPill>
                  <MPill>Once Weekly</MPill>
                  <MPill>Oral</MPill>
                </div>
              </div>
              <MImg src="m-card-01.png" w={1080} h={1350} style={{ width: m(84), height: m(78.35), borderRadius: m(3.56) }} />
            </div>
          </MCard>

          {/* 02 */}
          <MCard style={{ left: m(95), top: m(171.5), width: m(269), height: m(147), padding: m(17), borderRadius: m(10), borderWidth: 1 }}>
            <div className="flex items-start justify-between" style={{ width: "100%" }}>
              <div className="flex flex-col" style={{ width: m(120), gap: m(5) }}>
                <MNum>02</MNum>
                <div className="flex flex-col items-start" style={{ gap: m(9) }}>
                  <MTitle>Why you&apos;re taking it</MTitle>
                  <MPill>Type II Diabetes</MPill>
                </div>
              </div>
              <MImg src="m-card-02.png" w={736} h={1104} style={{ width: m(100), height: m(93), borderRadius: m(5) }} crop={{ left: "0", top: "-61%", width: "100%", height: "160.91%" }} />
            </div>
          </MCard>

          {/* 03 */}
          <MCard style={{ left: m(4), top: m(350.6), width: m(356), height: m(188), padding: m(17), borderRadius: m(10), borderWidth: 1 }}>
            <div className="flex items-start justify-between" style={{ width: "100%" }}>
              <div className="flex flex-col" style={{ width: m(184), gap: m(8) }}>
                <MNum>03</MNum>
                <div className="flex flex-col" style={{ gap: m(8) }}>
                  <MTitle>What we&apos;re following</MTitle>
                  <div className="flex flex-wrap" style={{ gap: m(4) }}>
                    <MPill>Fasting Blood Glucose</MPill>
                    <div className="flex" style={{ gap: m(4) }}>
                      <MPill>A1c</MPill>
                      <MPill>Post Prandial Glucose</MPill>
                    </div>
                    <MPill>Vitamin D Levels</MPill>
                  </div>
                </div>
              </div>
              <MImg src="m-card-03.png" w={1948} h={936} style={{ width: m(123), height: m(114), borderRadius: m(5) }} />
            </div>
          </MCard>
        </div>

        {/* Closing note */}
        <div data-connect-outro className="flex items-center justify-between" style={{ width: m(335) }}>
          <Image src="/medication/connect/m-bar.svg" alt="" width={5} height={20} unoptimized style={{ width: m(5), height: m(20), transform: "scaleY(-1)" }} />
          <span className="whitespace-pre uppercase leading-[normal] text-[#6E7A72]" style={{ fontSize: m(12) }}>
            Your physician sees the same connected picture.
          </span>
        </div>
      </div>
    </section>
  );
}
