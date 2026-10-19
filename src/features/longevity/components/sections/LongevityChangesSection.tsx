"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { desktopMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Figma: desktop node 12613:14372 (1440 x ~1091) + chart cards 12613:14938. Blue gradient section with a portrait
// pinned to the right; the left column holds the heading and a 609.5px chart card (rail of three bars beside it).
// On desktop the cards cross-fade while the section is pinned (rail bar follows); below that they stack, scaled to fit.
// Chart bodies use fixed geometry and scale together with their value labels and notes.
const A = "/longevity/changes";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const BLUE = "#148bd5";
const GREEN = "#17925a";
const INK = "#111110";

/** Fixed SVG geometry keeps the axes, curves and endpoint labels aligned at every size. */
function TrackingCard({ kind }: { kind: 1 | 2 | 3 }) {
  const id = useId().replace(/:/g, "");
  const fiber = kind === 1;
  const pressure = kind === 2;
  const leftColor = kind === 3 ? GREEN : BLUE;
  const rightColor = kind === 3 ? BLUE : GREEN;
  const leftValues = fiber ? [180, 150, 140, 120, 100, 80] : pressure ? [220, 200, 180, 160, 140, 120] : [9, 8, 7, 6, 5, 4];
  const rightValues = fiber ? [35, 30, 25, 20, 15, 10] : pressure ? [150, 140, 130, 120, 110, 100] : [220, 200, 180, 160, 140, 120];
  const xStart = fiber ? 126 : 131;
  const xEnd = fiber ? 545 : 550;
  const blueStart = fiber ? 140 : 104;
  const blueEnd = fiber ? 257 : pressure ? 236 : 205;
  const greenStart = fiber ? 255 : pressure ? 137 : 117;
  const greenEnd = fiber ? 155 : pressure ? 254 : 247;
  const blueCurve = fiber
    ? "M126 140 C208 175 275 201 335 220 S421 229 461 238 S514 250 545 257"
    : pressure
      ? "M131 104 C204 132 274 163 338 181 S469 215 550 236"
      : "M131 104 C209 125 277 152 338 170 S471 204 550 205";
  const greenCurve = fiber
    ? "M126 255 C210 244 277 232 335 219 S473 191 545 155"
    : pressure
      ? "M131 137 C205 164 273 188 338 208 S471 236 550 254"
      : "M131 117 C204 164 273 184 338 209 S470 239 550 247";
  const caption = fiber
    ? "As fiber intake rose from 18g to 28g, LDL dropped from 145 to 112 mg/dL in six months."
    : pressure
      ? "As weight fell from 205 to 152 lbs, blood pressure dropped from 138 to 112 mmHg in six months."
      : "As weight decreased from 204 to 162 lbs, A1c levels dropped from 8% to 5.6% over six months.";
  const valuePill = (text: string, x: number, y: number, color: string) => {
    const width = text.length === 1 ? 26 : text.length === 2 ? 34 : 39;
    return (
      <g data-pill="" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <rect x={x - width / 2} y={y - 9.5} width={width} height="19" rx="9.5" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="0.7" />
        <text x={x} y={y + 4} textAnchor="middle" fill={INK} fontSize="12">{text}</text>
      </g>
    );
  };
  return (
    <div className="tracking-card-wrap relative w-full pb-[66px]">
      <div data-card-box className="w-full overflow-hidden rounded-[12px] border border-white bg-white/60 backdrop-blur-[5px]">
        <svg viewBox="0 0 676 392" className="block h-auto w-full" role="img" aria-label={caption}>
          <defs>
            <linearGradient id={`${id}-blue`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a80b8" /><stop offset="100%" stopColor="#2a80b8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`${id}-green`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={fiber ? GREEN : "#008b7e"} stopOpacity={fiber ? "0.6" : "0.85"} /><stop offset="100%" stopColor={GREEN} stopOpacity="0" />
            </linearGradient>
          </defs>
          <g fontSize="17" fontWeight="400">
            {leftValues.map((value, i) => (
              <g key={value}>
                <line x1="90" x2="594" y1={66 + i * 50} y2={66 + i * 50} stroke={INK} strokeOpacity="0.3" strokeWidth="1.5" />
                <text x="84" y={66 + i * 50} textAnchor="end" fill={leftColor}>{value}</text>
                <text x="603" y={66 + i * 50} fill={rightColor}>{rightValues[i]}</text>
              </g>
            ))}
            <text transform="translate(38 174) rotate(-90)" textAnchor="middle" fill={leftColor}>{fiber ? "mg/dL" : pressure ? "lbs" : "%"}</text>
            <text transform="translate(638 174) rotate(90)" textAnchor="middle" fill={rightColor}>{fiber ? "g/day" : pressure ? "mmHg" : "lbs"}</text>
          </g>
          <g data-wipe={kind}>
            <path d={`${blueCurve} L${xEnd} 316 L${xStart} 316 Z`} fill={`url(#${id}-blue)`} />
            <path d={`${greenCurve} L${xEnd} 316 L${xStart} 316 Z`} fill={`url(#${id}-green)`} />
            <path d={blueCurve} fill="none" stroke={fiber ? BLUE : "white"} strokeWidth="1" />
            <path d={greenCurve} fill="none" stroke={fiber ? GREEN : "white"} strokeWidth="1" strokeDasharray="8 7" />
            {[[xStart, blueStart], [xEnd, blueEnd], [xStart, greenStart], [xEnd, greenEnd]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.2" fill={fiber ? i < 2 ? BLUE : GREEN : "white"} />
            ))}
          </g>
          <g fill="white" fillOpacity="0.85" fontSize="17">
            <text x={xStart + 8} y={blueStart + (fiber ? 39 : 23)}>{fiber ? "LDL" : "lbs"}</text>
            <text x={fiber ? xEnd - 45 : xStart + 8} y={fiber ? greenEnd + 40 : greenStart + 40}>{fiber ? "Fiber" : pressure ? "mmHg" : "%"}</text>
          </g>
          {valuePill(fiber ? "145" : pressure ? "205" : "204", xStart + (fiber ? 3 : 0), blueStart - 16, BLUE)}
          {valuePill(fiber ? "112" : pressure ? "152" : "162", xEnd, blueEnd - 17, BLUE)}
          {valuePill(fiber ? "18" : pressure ? "138" : "8", xStart - 2, greenStart + (fiber ? 15 : 17), GREEN)}
          {valuePill(fiber ? "28" : pressure ? "112" : "5.6", xEnd, greenEnd + (pressure ? 17 : -17), GREEN)}
          {MONTHS.map((month, i) => (
            <g key={month} fill={INK} fontSize="17">
              <line x1={132 + i * 84} x2={132 + i * 84} y1="331" y2="344" stroke={INK} strokeWidth="1.5" />
              <text x={132 + i * 84} y="368" textAnchor="middle">{month}</text>
            </g>
          ))}
        </svg>
      </div>
      <p className={`tracking-card-note absolute top-[344px] rounded-[12px] border border-black/20 bg-white/30 px-4 py-2 text-[14px] font-normal leading-[1.5] text-[#111110] backdrop-blur-[10px] ${fiber ? "w-[328px]" : "w-[360px]"}`}>{caption}</p>
    </div>
  );
}

function Card1() {
  return <TrackingCard kind={1} />;
}

function Card2() {
  return <TrackingCard kind={2} />;
}

function Card3() {
  return <TrackingCard kind={3} />;
}

/** scales a fixed-width (609.5px) block down to the space it is given, keeping its height in the layout */
function FitBox({ width, children }: { width: number; children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [s, setS] = useState(1);
  const [h, setH] = useState<number | undefined>(undefined);

  useEffect(() => {
    const calc = () => {
      if (!outer.current || !inner.current) return;
      const k = Math.min(1, outer.current.clientWidth / width);
      setS(k);
      setH(inner.current.offsetHeight * k);
    };
    calc();
    const ro = new ResizeObserver(calc);
    if (outer.current) ro.observe(outer.current);
    if (inner.current) ro.observe(inner.current);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={outer} className="w-full" style={{ height: h }}>
      <div ref={inner} style={{ width, transform: `scale(${s})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}

const CARD_W = 609.5;
const MOBILE_CARD_W = 364.44; // Figma mobile cards are the desktop cards at 0.598

/** a desktop card drawn at 609.5px and scaled to its mobile width (364px, or narrower so the next card always peeks in) */
function MobileCard({ children }: { children: React.ReactNode }) {
  const inner = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(MOBILE_CARD_W);
  const [h, setH] = useState<number | undefined>(undefined);
  const k = w / CARD_W;
  useEffect(() => {
    const calc = () => setW(Math.min(MOBILE_CARD_W, window.innerWidth * MOBILE_CARD_W / 402));
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.offsetHeight * k));
    ro.observe(el);
    return () => ro.disconnect();
  }, [k]);
  return (
    <div className="shrink-0" style={{ width: w, height: h }}>
      <div ref={inner} style={{ width: CARD_W, transform: `scale(${k})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}

export default function LongevityChangesSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () =>
      desktopMotion(() => {
        // The stage is taller than short viewports: it only sticks once its bottom (the charts) reaches the bottom of the
        // screen, so the charts are in view the whole time they change, then the section scrolls away normally.
        const stickTop = () => Math.min(0, window.innerHeight - (stickyRef.current?.offsetHeight ?? 0));
        const applyTop = () => {
          if (stickyRef.current) stickyRef.current.style.top = `${stickTop()}px`;
        };
        applyTop();
        ScrollTrigger.addEventListener("refreshInit", applyTop);

        const wipeIn = { clipPath: "inset(-4% -4% -4% -4%)" };
        const wipeOut = (flip: boolean) => ({ clipPath: flip ? "inset(-4% -4% -4% 100%)" : "inset(-4% 100% -4% -4%)" });

        // card 1: draws itself once as the section scrolls into view
        gsap.fromTo("[data-wipe='1']", wipeOut(false), { ...wipeIn, duration: 1.6, ease: "power2.inOut", scrollTrigger: { trigger: rootRef.current, start: "top 60%", once: true } });
        gsap.fromTo("[data-change-card='1'] [data-pill]", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, delay: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: rootRef.current, start: "top 60%", once: true } });

        // Discrete steps (no scrubbed cross-fade): the pinned scroll is split in thirds; crossing a third plays one clean swap
        const q = (sel: string) => gsap.utils.toArray<HTMLElement>(sel);
        const cardSel = (i: number) => `[data-change-card='${i + 1}']`;
        const rails = q("[data-change-rail]");
        gsap.set([cardSel(1), cardSel(2)].join(","), { autoAlpha: 0 });
        let cur = 0;
        // Keep the rail centred beside the card, including when the fixed geometry is resized.
        const railBox = q("[data-change-rails]")[0];
        const boxH = (i: number) => q(`${cardSel(i)} [data-card-box]`)[0]?.offsetHeight;
        const fitRails = (i: number, animate: boolean) => {
          const h = boxH(i);
          if (railBox && h) gsap.to(railBox, { y: (h - 354) / 2, duration: animate ? 0.4 : 0, ease: "power2.out" });
        };
        fitRails(0, false);

        const go = (next: number) => {
          if (next === cur) return;
          const from = cur;
          cur = next;
          gsap.killTweensOf([...q(cardSel(from)), ...q(cardSel(next)), ...q(`${cardSel(next)} [data-wipe]`), ...q(`${cardSel(next)} [data-pill]`)]);
          gsap.to(cardSel(from), { autoAlpha: 0, y: -24, duration: 0.3, ease: "power2.in" });
          gsap.fromTo(cardSel(next), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power3.out" });
          gsap.fromTo(`${cardSel(next)} [data-wipe]`, wipeOut(false), { ...wipeIn, duration: 1.4, delay: 0.5, ease: "power2.inOut" });
          gsap.fromTo(`${cardSel(next)} [data-pill]`, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, delay: 1, ease: "back.out(2)" });
          rails.forEach((r, i) => gsap.to(r, { backgroundColor: i === next ? BLUE : "#d9d9d9", duration: 0.3 }));
          fitRails(next, true);
        };

        ScrollTrigger.create({
          trigger: rootRef.current,
          start: () => `top ${stickTop()}px`,
          end: "bottom bottom",
          invalidateOnRefresh: true,
          onUpdate: (self) => go(self.progress < 0.34 ? 0 : self.progress < 0.67 ? 1 : 2),
        });

        return () => ScrollTrigger.removeEventListener("refreshInit", applyTop);
      }),
    { scope: rootRef },
  );

  return (
    <section className="relative w-full overflow-clip bg-[#2A80B8]">

      <div ref={rootRef} className="changes-scroll relative">
        <style>{`
          .tracking-card-note { right: 0; }
          .changes-scroll { min-height: 100svh; }
          .changes-sticky { position: relative; min-height: 100svh; display: flex; align-items: flex-start; background: linear-gradient(131.78deg, rgb(255, 255, 249) 0%, rgb(116, 205, 255) 20%, rgb(42, 128, 184) 82.462%); }
          @layer theme {
          @media (max-width: 1023px) {
            .changes-sticky { --changes-unit: calc(min(100vw, 402px) / 402); }
            .changes-content { min-height: calc(868 * var(--changes-unit)) !important; padding: calc(64 * var(--changes-unit)) calc(20 * var(--changes-unit)) !important; gap: 0 !important; }
            .changes-intro { flex: none !important; gap: calc(32 * var(--changes-unit)) !important; }
            .changes-title { font-size: calc(32 * var(--changes-unit)) !important; font-weight: 400 !important; }
            .changes-summary { gap: calc(30 * var(--changes-unit)) !important; }
            .changes-subtitle { font-size: calc(24 * var(--changes-unit)) !important; font-weight: 400 !important; }
            .changes-serif { font-size: calc(32 * var(--changes-unit)) !important; }
            .changes-description { font-size: calc(16 * var(--changes-unit)) !important; }
            .changes-mobile-portrait { left: calc(91.67% - 57 * var(--changes-unit)) !important; top: calc(337.5 * var(--changes-unit)) !important; width: calc(417 * var(--changes-unit)) !important; height: calc(554 * var(--changes-unit)) !important; }
            .changes-mobile-fade { left: calc(100% - 59.5 * var(--changes-unit)) !important; top: calc(335.5 * var(--changes-unit)) !important; width: calc(119 * var(--changes-unit)) !important; height: calc(113 * var(--changes-unit)) !important; }
            .changes-mobile-carousel { width: calc(100% + 40 * var(--changes-unit)) !important; margin: calc(160 * var(--changes-unit)) calc(-20 * var(--changes-unit)) 0 !important; padding: 0 calc(20 * var(--changes-unit)) !important; scroll-snap-type: x mandatory; }
            .changes-mobile-carousel > div { gap: calc(8 * var(--changes-unit)) !important; }
            .changes-mobile-carousel > div > div { scroll-snap-align: start; scroll-margin-left: calc(20 * var(--changes-unit)); }
          }
          }
          @media (min-width: 1024px) { .changes-sticky { align-items: center; background: linear-gradient(145.38deg, rgb(42, 128, 184) 2.2521%, rgb(116, 205, 255) 44.988%, rgb(255, 255, 249) 80.207%); } }
          @media (min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
            .changes-scroll { min-height: 260svh; }
            .changes-sticky { position: sticky; top: 0; }
            [data-change-card='2'], [data-change-card='3'] { opacity: 0; visibility: hidden; }
            .tracking-card-note { right: -84px; }
            .changes-cards { gap: 0; }
            .changes-cards > * { grid-area: 1 / 1; }
          }
        `}</style>

        <div
          ref={stickyRef}
          className="changes-sticky overflow-clip"
        >
          {/* mobile portrait (node 12721:17816): 417 x 554 at 91.67% - 57px, with a soft blue fade at its top-right corner */}
          <div className="changes-mobile-portrait pointer-events-none absolute lg:hidden" style={{ left: "calc(91.67% - 57px)", top: 337.5, width: 417, height: 554, transform: "translateX(-50%)" }}>
            <Image src={`${A}/bg.png`} alt="" fill sizes="417px" className="object-cover" />
          </div>
          <div
            className="changes-mobile-fade pointer-events-none absolute lg:hidden"
            style={{ left: "calc(100% - 59.5px)", top: 335.5, width: 119, height: 113, transform: "translateX(-50%) scaleY(-1)", background: "linear-gradient(173.12deg, rgba(105, 192, 244, 0) 57.218%, rgb(86, 173, 226) 94.412%)" }}
          />
          {/* portrait: 1088 x 1445 box pinned to the right, 188px bleed */}
          <div className="pointer-events-none absolute hidden lg:block" style={{ right: -188, top: -2, bottom: -18.83, aspectRatio: "1088 / 1445" }}>
            <Image src={`${A}/bg.png`} alt="" fill priority sizes="1088px" className="object-cover" />
          </div>
          {/* same container as the header */}
          <div className="changes-content relative mx-auto flex min-h-svh w-full max-w-360 flex-col items-start gap-12 px-5 py-16 lg:min-h-0 lg:gap-16 lg:px-10 lg:py-[120px]">
            <div className="changes-intro flex w-full flex-1 flex-col items-start gap-8 leading-[1.5] text-white lg:flex-none lg:gap-[173px]">
              <p className="changes-title text-[32px] font-medium lg:whitespace-nowrap lg:text-[40px]">FIND THE CHANGES THAT MATTER EARLY.</p>
              <div className="changes-summary flex w-full flex-col items-start gap-[30px] lg:gap-2">
                <div className="flex flex-col items-start whitespace-nowrap">
                  <p className="changes-subtitle text-[24px] font-medium lg:text-[32px]">Your health changes</p>
                  <p className="changes-serif comprehensive-serif text-[32px] italic lg:text-[40px]">before you feel it.</p>
                </div>
                <p className="changes-description w-full max-w-[750px] text-[16px] font-normal">
                  Follow your <b className="font-bold lg:font-normal">biomarkers and health metrics</b> over time so meaningful changes don&apos;t have to wait for an annual appointment to be noticed. Find out what&rsquo;s working and not working.
                </p>
              </div>
            </div>

            {/* mobile: three 364px cards in a sideways scroller */}
            <div className="changes-mobile-carousel -mx-5 w-[calc(100%+40px)] overflow-x-auto px-5 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max items-start gap-2">
                <MobileCard>
                  <Card1 />
                </MobileCard>
                <MobileCard>
                  <Card2 />
                </MobileCard>
                <MobileCard>
                  <Card3 />
                </MobileCard>
              </div>
            </div>

            <div className="relative hidden w-full flex-col items-center gap-4 lg:flex lg:w-auto">
              <div className="flex w-full items-start gap-4 lg:w-auto">
                <div data-change-rails className="hidden h-[354px] shrink-0 flex-col items-start justify-center gap-2 lg:flex">
                  {[0, 1, 2].map((i) => (
                    <span key={i} data-change-rail={i} className="block h-[100px] w-[6px] shrink-0 rounded-[22px]" style={{ background: i === 0 ? BLUE : "#d9d9d9" }} />
                  ))}
                </div>

                <div className="changes-cards grid w-full min-w-0 grid-cols-[minmax(0,1fr)] gap-6 lg:w-[609.5px]">
                  <div data-change-card="1">
                    <FitBox width={CARD_W}>
                      <Card1 />
                    </FitBox>
                  </div>
                  <div data-change-card="2" className="flex flex-col items-center gap-4">
                    <FitBox width={CARD_W}>
                      <Card2 />
                    </FitBox>
                  </div>
                  <div data-change-card="3" className="flex flex-col items-center gap-4">
                    <FitBox width={CARD_W}>
                      <Card3 />
                    </FitBox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
