"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { desktopMotion } from "@/lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Figma: desktop node 12613:14372 (1440 x ~1091) + chart cards 12613:14938. Blue gradient section with a portrait
// pinned to the right; the left column holds the heading and a 609.5px chart card (rail of three bars beside it).
// On desktop the cards cross-fade while the section is pinned (rail bar follows); below that they stack, scaled to fit.
// Chart bodies are the Figma layers at fixed px: card 1 plain, card 2 is the mirrored (flipX) layout from the design.
const A = "/longevity/changes";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const BLUE = "#148bd5";
const GREEN = "#17925a";
const INK = "#111110";

function Svg({ src }: { src: string }) {
  return <Image src={`${A}/${src}`} alt="" fill unoptimized className="block max-w-none" />;
}

const TXT = "whitespace-nowrap text-[15.169px] font-normal leading-[1.5]";

/** x-axis: tick + month, six equal columns */
function Months() {
  return (
    <div className="flex w-full items-start justify-between">
      {MONTHS.map((m) => (
        <div key={m} className="flex min-w-px flex-1 flex-col items-center justify-center gap-[3.034px]">
          <div className="h-[12.14px] w-[1.516px] shrink-0 bg-[#111110]" />
          <p className={`${TXT} shrink-0 text-[#111110]`}>{m}</p>
        </div>
      ))}
    </div>
  );
}

/** the horizontal grid: 4 solid rows + the two bottom rows (own svgs) */
function GridLines({ p, inset }: { p: "c1" | "c2"; inset: string }) {
  return (
    <div className="flex w-full flex-col items-start gap-[16.63px]">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="relative h-[28.834px] w-full shrink-0">
          <div className="absolute" style={{ inset }}>
            <Svg src={`${p}-grid.svg`} />
          </div>
        </div>
      ))}
      <div className="relative h-[27.316px] w-full shrink-0">
        <Svg src={`${p}-grid-a.svg`} />
      </div>
      <div className="relative h-[27.316px] w-full shrink-0">
        <Svg src={`${p}-grid-b.svg`} />
      </div>
    </div>
  );
}

/** plot box: 264.795px tall, grid pinned to the bottom, charts/pills absolutely placed on top */
function Plot({ p, inset, children }: { p: "c1" | "c2"; inset: string; children: React.ReactNode }) {
  return (
    <div className="relative flex h-[264.795px] w-full shrink-0 flex-col items-end justify-end gap-[15.169px]">
      <div className="h-[28.834px] w-full shrink-0" />
      <GridLines p={p} inset={inset} />
      {children}
    </div>
  );
}

function Pill({ text, style, bg, border }: { text: string; style: React.CSSProperties; bg: string; border: string }) {
  return (
    <div
      className="absolute flex items-center justify-center rounded-[15.244px] border-[0.693px] border-solid px-[8.315px] backdrop-blur-[50px]"
      style={{ ...style, background: bg, borderColor: border }}
      data-pill=""
    >
      <p className="whitespace-nowrap text-[11.086px] font-normal leading-[1.5] text-black">{text}</p>
    </div>
  );
}

function Labels({ vals, color, className = "" }: { vals: string[]; color: string; className?: string }) {
  return (
    <>
      {vals.map((v) => (
        <p key={v} className={`relative shrink-0 ${className}`} style={{ color }}>
          {v}
        </p>
      ))}
    </>
  );
}

const COL = "flex h-full flex-col justify-end gap-[23.559px] leading-[1.5] text-[15.169px] font-normal whitespace-nowrap";

/* ------------------------------------------------------------------ card 1 */
/** `glass` = the mobile card (same glass look + legend as cards 2/3, dark axes); default = desktop card with a title */
function Card1({ glass }: { glass?: boolean }) {
  const axL = glass ? INK : BLUE;
  const axR = glass ? INK : GREEN;
  const dim = glass ? "" : "opacity-80";
  const pills = glass
    ? [
        { text: "28", style: { left: 396.08, top: 81.61 }, bg: "#b8aeab", border: "#fff" },
        { text: "112", style: { left: 394.69, top: 172.47 }, bg: "#99a6ae", border: BLUE },
        { text: "145", style: { left: 17.91, top: 69.88 }, bg: "rgba(90,144,180,0.3)", border: BLUE },
        { text: "18", style: { left: 16.53, top: 200.83 }, bg: "#b8aeab", border: "#fff" },
      ]
    : [
        { text: "28", style: { left: 396.08, top: 81.61 }, bg: "rgba(23,146,90,0.2)", border: GREEN },
        { text: "145", style: { left: 17.91, top: 69.88 }, bg: "rgba(90,144,180,0.2)", border: BLUE },
        { text: "18", style: { left: 16.53, top: 200.83 }, bg: "rgba(23,146,90,0.2)", border: GREEN },
        { text: "112", style: { left: 394.69, top: 172.47 }, bg: "rgba(20,139,213,0.2)", border: BLUE },
      ];
  return (
    <div
      data-card-box
      className={glass ? GLASS : "flex w-full flex-col items-center gap-4 rounded-[12px] border border-solid border-white bg-white/60 p-4 backdrop-blur-[5px]"}
      style={glass ? { backgroundImage: "linear-gradient(270deg, rgba(255,255,255,0.7) 0%, rgba(20,139,213,0.7) 100%), linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%)" } : undefined}
    >
      {glass ? (
        <Legend items={[{ dot: "dot-blue.svg", label: "LDL", upper: true }, { dot: "dot-white.svg", label: "Fiber" }]} />
      ) : (
        <p className="comprehensive-serif shrink-0 whitespace-nowrap text-[14px] font-normal not-italic leading-[1.5] text-[#111110]">Tracking Fiber and Cholesterol</p>
      )}
      <div className="flex w-full items-end gap-[6.068px]">
        {/* left axis */}
        <div className="flex items-end self-stretch">
          <div className="flex h-full w-[59.136px] shrink-0 items-center gap-[11.086px] pb-[39.44px]">
            <div className="flex h-[49px] w-[23px] shrink-0 items-center justify-center">
              <p className={`${TXT} -rotate-90`} style={{ color: axL }}>mg/dL</p>
            </div>
            <div className={`${COL} relative items-start`} style={{ color: axL }}>
              <Labels vals={["180", "150", "140", "120", "100", "80"]} color={axL} className={dim} />
              <p className={`absolute left-[0.13px] top-[0.21px] ${dim}`}>(LDL)</p>
            </div>
          </div>
        </div>

        {/* plot */}
        <div className="flex min-w-px flex-1 flex-col items-start pt-[18.203px]">
          <Plot p="c1" inset="0 -0.17%">
            <div data-wipe="1" className="absolute left-[31.77px] top-[91.31px] h-[160.929px] w-[378.167px]">
              <div className="absolute" style={{ inset: "-1.25% -0.53% 0 -0.53%" }}>
                <Svg src="c1-area1.svg" />
              </div>
            </div>
            <div data-wipe="1" className="absolute left-[31.77px] top-[105.18px] flex h-[147.066px] w-[378.167px] items-center justify-center">
              <div className="flex-none -scale-y-100 rotate-180">
                <div className="relative h-[147.066px] w-[378.167px]">
                  <div className="absolute" style={{ inset: "-1.37% -0.53% 0 -0.53%" }}>
                    <Svg src="c1-area2.svg" />
                  </div>
                </div>
              </div>
            </div>
            {pills.map((pl) => (
              <Pill key={pl.text} text={pl.text} style={pl.style} bg={pl.bg} border={pl.border} />
            ))}
          </Plot>
          <Months />
        </div>

        {/* right axis */}
        <div className="flex items-end self-stretch">
          <div className="flex h-full shrink-0 items-center gap-[9.102px] pb-[39.44px]">
            <div className={`${COL} relative items-end text-right`} style={{ color: axR }}>
              <Labels vals={["35", "30", "25", "20", "15", "10"]} color={axR} className={dim} />
              <p className={`absolute left-[21px] top-[0.21px] -translate-x-full ${dim}`}>(Fiber)</p>
            </div>
            <div className="flex h-[44px] w-[23px] shrink-0 items-center justify-center">
              <p className={`${TXT} rotate-90`} style={{ color: axR }}>g/day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ cards 2 + 3 */
const GLASS = "backdrop-blur-[62.361px] flex w-full flex-col items-end gap-3 rounded-[16.63px] p-[20.787px]";

function Legend({ items }: { items: { dot: string; label: string; upper?: boolean }[] }) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-[11.086px]">
      {items.map((it) => (
        <div key={it.label} className="flex shrink-0 items-center gap-[11.086px]">
          <div className="relative h-[8.318px] w-[8.311px] shrink-0">
            <Svg src={it.dot} />
          </div>
          <p className={`shrink-0 whitespace-nowrap text-[27.716px] font-normal leading-[normal] text-white ${it.upper ? "uppercase" : ""}`}>{it.label}</p>
        </div>
      ))}
    </div>
  );
}

const FLIP = "flex-none -scale-y-100 rotate-180";

/** card 2 – Weight + Blood pressure; the whole chart is the design's mirrored (flipX) frame, text flipped back */
function Card2() {
  return (
    <div data-card-box className={GLASS} style={{ backgroundImage: "linear-gradient(270deg, rgba(20,139,213,0.7) 0%, rgba(255,255,255,0.7) 100%), linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%)" }}>
      <Legend items={[{ dot: "dot-white.svg", label: "Weight" }, { dot: "dot-blue.svg", label: "Blood pressure" }]} />
      <div className="flex w-full items-center justify-center">
        <div className={`${FLIP} w-full`}>
          <div className="flex w-full flex-col items-start">
            <div className="flex w-full items-end gap-[6.068px]">
              {/* (appears right) blood pressure axis */}
              <div className="flex items-end self-stretch">
                <div className="flex h-full items-center justify-center">
                  <div className={`${FLIP} h-full`}>
                    <div className="flex h-full w-[59.136px] items-center gap-[11.086px] pb-[39.44px]">
                      <div className={`${COL} relative items-start`} style={{ color: INK }}>
                        <Labels vals={["150", "140", "130", "120", "110", "100"]} color={INK} />
                        <p className="absolute right-[109.58px] top-[0.21px] translate-x-full">Blood pressure</p>
                      </div>
                      <div className="flex h-[49px] w-[23px] shrink-0 items-center justify-center">
                        <p className={`${TXT} rotate-90`} style={{ color: INK }}>mmHg</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex min-w-px flex-1 flex-col items-start pt-[18.203px]">
                <Plot p="c2" inset="0 -0.18%">
                  <div data-wipe="2" className="absolute left-[31.77px] top-[59.43px] flex h-[192.816px] w-[378.167px] items-center justify-center">
                    <div className={FLIP}>
                      <div className="relative h-[192.816px] w-[378.167px]">
                        <div className="absolute" style={{ inset: "-1.05% -0.53% 0 -0.53%" }}>
                          <Svg src="c2-area1.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div data-wipe="2" className="absolute left-[31.77px] top-[85.77px] flex h-[166.475px] w-[378.167px] items-center justify-center">
                    <div className={FLIP}>
                      <div className="relative h-[166.475px] w-[378.167px]">
                        <div className="absolute" style={{ inset: "-1.21% -0.53% 0 -0.53%" }}>
                          <Svg src="c2-area2.svg" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <FlipPill text="112" style={{ left: 16.31, top: 203.61 }} bg="#b8aeab" border="#fff" />
                  <FlipPill text="152" style={{ left: 13.31, top: 154.45 }} bg="#99a6ae" border={BLUE} />
                  <FlipPill text="205" style={{ left: 390.75, top: 36.61 }} bg="rgba(90,144,180,0.3)" border={BLUE} />
                  <FlipPill text="138" style={{ left: 394.98, top: 94.08 }} bg="#b8aeab" border="#fff" />
                </Plot>
                <div className="flex w-full items-center justify-center">
                  <div className={`${FLIP} w-full`}>
                    <Months />
                  </div>
                </div>
              </div>

              {/* (appears left) weight axis */}
              <div className="flex items-end self-stretch">
                <div className="flex h-full items-center justify-center">
                  <div className={`${FLIP} h-full`}>
                    <div className="flex h-full items-center gap-[9.102px] pb-[39.44px]">
                      <div className="flex h-[22px] w-[23px] shrink-0 items-center justify-center">
                        <p className={`${TXT} -rotate-90`} style={{ color: INK }}>lbs</p>
                      </div>
                      <div className={`${COL} relative items-end text-right`} style={{ color: INK }}>
                        <Labels vals={["220", "200", "180", "160", "140", "120"]} color={INK} />
                        <p className="absolute left-[52.11px] top-[0.21px] -translate-x-full">Weight</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FlipPill({ text, style, bg, border }: { text: string; style: React.CSSProperties; bg: string; border: string }) {
  return (
    <div className="absolute flex items-center justify-center" style={style} data-pill="">
      <div className={FLIP}>
        <div className="flex items-center justify-center rounded-[15.244px] border-[0.693px] border-solid px-[8.315px] backdrop-blur-[50px]" style={{ background: bg, borderColor: border }}>
          <p className="whitespace-nowrap text-[11.086px] font-normal leading-[1.5] text-black">{text}</p>
        </div>
      </div>
    </div>
  );
}

/** card 3 – A1C + Weight, not mirrored */
function Card3({ mobile }: { mobile?: boolean }) {
  const L = mobile ? "#fff" : INK;
  return (
    <div data-card-box className={GLASS} style={{ backgroundImage: "linear-gradient(270deg, rgba(255,255,255,0.7) 0%, rgba(20,139,213,0.7) 100%), linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.2) 100%)" }}>
      <Legend items={[{ dot: "dot-blue.svg", label: "A1C", upper: true }, { dot: "dot-white.svg", label: "Weight" }]} />
      <div className="flex w-full flex-col items-start">
        <div className="flex w-full items-end gap-[6.068px]">
          <div className="flex items-end self-stretch">
            <div className="flex h-full w-[59.136px] shrink-0 items-center gap-[11.086px] pb-[39.44px]">
              <div className="flex h-[15px] w-[23px] shrink-0 items-center justify-center">
                <p className={`${TXT} -rotate-90`} style={{ color: L }}>%</p>
              </div>
              <div className={`${COL} relative items-start`} style={{ color: L }}>
                <Labels vals={["9", "8", "7", "6", "5", "4"]} color={L} />
                <p className="absolute left-[0.13px] top-[0.47px]">A1C</p>
              </div>
            </div>
          </div>

          <div className="flex min-w-px flex-1 flex-col items-start pt-[18.203px]">
            <Plot p="c2" inset="0 -0.18%">
              <div data-wipe="3" className="absolute left-[31.77px] top-[59.42px] h-[192.816px] w-[378.167px]">
                <div className="absolute" style={{ inset: "-1.05% -0.53% 0 -0.53%" }}>
                  <Svg src="c3-area1.svg" />
                </div>
              </div>
              <div data-wipe="3" className="absolute left-[31.77px] top-[71.9px] h-[180.338px] w-[378.167px]">
                <div className="absolute" style={{ inset: "-0.35% -0.53% 0 -0.53%" }}>
                  <Svg src="c3-area2.svg" />
                </div>
              </div>
              <Pill text="5.6" style={{ left: 393.31, top: 167.56 }} bg="#b8aeab" border="#fff" />
              <Pill text="162" style={{ left: 394.69, top: 130.88 }} bg="#99a6ae" border={BLUE} />
              <Pill text="204" style={{ left: 17.91, top: 36.61 }} bg="rgba(90,144,180,0.3)" border={BLUE} />
              <Pill text="8" style={{ left: 16.53, top: 80.22 }} bg="#b8aeab" border="#fff" />
            </Plot>
            <Months />
          </div>

          <div className="flex items-end self-stretch">
            <div className="flex h-full shrink-0 items-center gap-[9.102px] pb-[39.44px]">
              <div className={`${COL} relative items-end text-right`} style={{ color: INK }}>
                <Labels vals={["220", "200", "180", "160", "140", "120"]} color={INK} />
                <p className="absolute left-[32px] top-[0.47px] -translate-x-full">Weight</p>
              </div>
              <div className="flex h-[22px] w-[23px] shrink-0 items-center justify-center">
                <p className={`${TXT} rotate-90`} style={{ color: INK }}>lbs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
    const calc = () => setW(Math.min(MOBILE_CARD_W, window.innerWidth - 44));
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
        // rail column is a fixed 392px (card 1's height); cards 2/3 are taller, so nudge it down by half the difference
        // to keep the three bars centred on the active card (Tailwind !important beats inline height, so use a transform)
        const railBox = q("[data-change-rails]")[0];
        const boxH = (i: number) => q(`${cardSel(i)} [data-card-box]`)[0]?.offsetHeight;
        const fitRails = (i: number, animate: boolean) => {
          const h = boxH(i);
          if (railBox && h) gsap.to(railBox, { y: (h - 392) / 2, duration: animate ? 0.4 : 0, ease: "power2.out" });
        };
        fitRails(0, false);

        const go = (next: number) => {
          if (next === cur) return;
          const from = cur;
          cur = next;
          gsap.killTweensOf([...q(cardSel(from)), ...q(cardSel(next)), ...q(`${cardSel(next)} [data-wipe]`), ...q(`${cardSel(next)} [data-pill]`)]);
          gsap.to(cardSel(from), { autoAlpha: 0, y: -24, duration: 0.3, ease: "power2.in" });
          gsap.fromTo(cardSel(next), { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power3.out" });
          gsap.fromTo(`${cardSel(next)} [data-wipe]`, wipeOut(next === 1), { ...wipeIn, duration: 1.4, delay: 0.5, ease: "power2.inOut" });
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
          .changes-scroll { min-height: 100svh; }
          .changes-sticky { position: relative; min-height: 100svh; display: flex; align-items: flex-start; background: linear-gradient(131.78deg, rgb(255, 255, 249) 0%, rgb(116, 205, 255) 20%, rgb(42, 128, 184) 82.462%); }
          @media (min-width: 1024px) { .changes-sticky { align-items: center; background: linear-gradient(145.38deg, rgb(42, 128, 184) 2.2521%, rgb(116, 205, 255) 44.988%, rgb(255, 255, 249) 80.207%); } }
          @media (min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
            .changes-scroll { min-height: 260svh; }
            .changes-sticky { position: sticky; top: 0; }
            [data-change-card='2'], [data-change-card='3'] { opacity: 0; visibility: hidden; }
            .changes-cards { gap: 0; }
            .changes-cards > * { grid-area: 1 / 1; }
          }
        `}</style>

        <div
          ref={stickyRef}
          className="changes-sticky overflow-clip"
        >
          {/* mobile portrait (node 12721:17816): 417 x 554 at 91.67% - 57px, with a soft blue fade at its top-right corner */}
          <div className="pointer-events-none absolute lg:hidden" style={{ left: "calc(91.67% - 57px)", top: 337.5, width: 417, height: 554, transform: "translateX(-50%)" }}>
            <Image src={`${A}/bg.png`} alt="" fill sizes="417px" className="object-cover" />
          </div>
          <div
            className="pointer-events-none absolute lg:hidden"
            style={{ left: "calc(100% - 59.5px)", top: 335.5, width: 119, height: 113, transform: "translateX(-50%) scaleY(-1)", background: "linear-gradient(173.12deg, rgba(105, 192, 244, 0) 57.218%, rgb(86, 173, 226) 94.412%)" }}
          />
          {/* portrait: 1088 x 1445 box pinned to the right, 188px bleed */}
          <div className="pointer-events-none absolute hidden lg:block" style={{ right: -188, top: -2, bottom: -18.83, aspectRatio: "1088 / 1445" }}>
            <Image src={`${A}/bg.png`} alt="" fill priority sizes="1088px" className="object-cover" />
          </div>
          {/* same container as the header */}
          <div className="relative mx-auto flex min-h-svh w-full max-w-360 flex-col items-start gap-12 px-5 py-16 lg:min-h-0 lg:gap-16 lg:px-10 lg:py-[120px]">
            <div className="flex w-full flex-1 flex-col items-start gap-8 leading-[1.5] text-white lg:flex-none lg:gap-[173px]">
              <p className="text-[32px] font-medium lg:whitespace-nowrap lg:text-[40px]">FIND THE CHANGES THAT MATTER EARLY.</p>
              <div className="flex w-full flex-col items-start gap-[30px] lg:gap-2">
                <div className="flex flex-col items-start whitespace-nowrap">
                  <p className="text-[24px] font-medium lg:text-[32px]">Your health changes</p>
                  <p className="comprehensive-serif text-[32px] italic lg:text-[40px]">before you feel it.</p>
                </div>
                <p className="w-full max-w-[750px] text-[16px] font-normal">
                  Follow your <b className="font-bold lg:font-normal">biomarkers and health metrics</b> over time so meaningful changes don&apos;t have to wait for an annual appointment to be noticed. Find out what&rsquo;s working and not working.
                </p>
              </div>
            </div>

            {/* mobile: three 364px cards in a sideways scroller */}
            <div className="-mx-5 w-[calc(100%+40px)] overflow-x-auto px-5 [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max items-start gap-2">
                <MobileCard>
                  <Card1 glass />
                </MobileCard>
                <MobileCard>
                  <Card2 />
                </MobileCard>
                <MobileCard>
                  <Card3 mobile />
                </MobileCard>
              </div>
            </div>

            <div className="relative hidden w-full flex-col items-center gap-4 lg:flex lg:w-auto">
              <div className="flex w-full items-start gap-4 lg:w-auto">
                <div data-change-rails className="hidden h-[392px] shrink-0 flex-col items-start justify-center gap-2 lg:flex">
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
                    <p className="whitespace-nowrap text-[16px] font-normal leading-[1.5] text-[#0c0d0f]">Weight ↓ 26% | Blood pressure ↓ 19%</p>
                  </div>
                  <div data-change-card="3" className="flex flex-col items-center gap-4">
                    <FitBox width={CARD_W}>
                      <Card3 />
                    </FitBox>
                    <p className="whitespace-nowrap text-[16px] font-normal leading-[1.5] text-[#0c0d0f]">A1c ↓ 30% | Weight ↓ 21%</p>
                  </div>
                </div>
              </div>

              {/* note over the bottom of card 1 */}
              <div
                data-change-card="1"
                className="flex items-center justify-center rounded-[12px] border border-solid border-[rgba(17,17,16,0.2)] bg-white/30 px-4 py-2 backdrop-blur-[10px] lg:absolute lg:left-[353px] lg:top-[380px]"
              >
                <div className="text-[14px] font-normal leading-[1.5] text-[#111110] lg:whitespace-nowrap">
                  <p>As daily fiber intake increased from 18g to 28g, </p>
                  <p>LDL cholesterol decreased from 145 to 112 mg/dL </p>
                  <p>over six months.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
