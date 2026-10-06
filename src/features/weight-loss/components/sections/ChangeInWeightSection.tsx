"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  CHANGE_IN_WEIGHT_VARIANTS,
  CHANGE_IN_WEIGHT_DESC,
  type ChangeInWeightVariant,
} from "../helper/changeInWeightVariations";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Figma: desktop node 12593:13150 (+ card variants 12593:12330), mobile node 12722:9029 (402 wide).
// The card is one pinned scrollytelling stage: photo + text crossfade through the 3 variants while the timeline fills.
const ease = [0.22, 1, 0.36, 1] as const;

type Geo = { h: number; trackY: number; trackH: number; dotCy: number; fills: number[]; stage: number; scroll: number };
// Timeline geometry + fill heights per step, taken from the Figma variants.
const DESKTOP: Geo = { h: 506, trackY: 23.85, trackH: 455.9, dotCy: 496.5, fills: [48.88, 246, 456], stage: 506, scroll: 1.8 };
const MOBILE: Geo = { h: 357.5, trackY: 23.44, trackH: 309.9, dotCy: 348, fills: [33.47, 167.2, 309.9], stage: 771.5, scroll: 1.5 };

const DESC_BOLD = "nutrition, exercise, sleep, weight, and medications";

/** Desktop card text (Figma 12593:12329, 585px wide) */
function DesktopContent({ v }: { v: ChangeInWeightVariant }) {
  return (
    <div className="flex w-[585px] flex-col items-end" style={{ gap: 32 }}>
      <div className="flex w-full flex-col items-end" style={{ gap: 32 }}>
        <div className="flex w-full items-start justify-between leading-[1.5]">
          <div className="flex flex-col items-start text-left text-[#A1AAA3]">
            <p className="text-[40px] font-medium">{v.step}</p>
            <p className="whitespace-nowrap text-[16px] font-normal">{v.label}</p>
          </div>
          <p className="comprehensive-serif whitespace-nowrap text-right text-[40px] italic text-[#46524B]">{v.title}</p>
        </div>
        <div className="flex items-center" style={{ gap: 8 }}>
          <div className="flex flex-col items-start text-left font-medium leading-[1.5] text-[#46524B]">
            <p className="whitespace-nowrap text-[64px]">{v.before}</p>
            <p className="whitespace-nowrap text-[32px]">{v.unit}</p>
          </div>
          <div className="flex h-[42px] w-[64px] shrink-0 items-center justify-center">
            <p className="-rotate-90 flex-none whitespace-nowrap text-[64px] font-normal leading-none text-[#46524B]">↓</p>
          </div>
          <div className="flex flex-col items-end text-left font-medium leading-[1.5] text-[#46524B]">
            <p className="whitespace-nowrap text-[64px]">{v.after}</p>
            <div className="flex items-center justify-center px-[5px]">
              <p className="whitespace-nowrap text-[32px]">{v.unit}</p>
            </div>
          </div>
        </div>
      </div>
      <p className="w-[411px] text-right text-[16px] font-normal leading-[1.5] text-[#6E7A72]">{CHANGE_IN_WEIGHT_DESC}</p>
    </div>
  );
}

/** Mobile card body (Figma 12722:9041, 335px wide at 402) — text column + 156x210 photo */
function MobileContent({ v, index }: { v: ChangeInWeightVariant; index: number }) {
  const [before, bold, after] = CHANGE_IN_WEIGHT_DESC.split(new RegExp(`(${DESC_BOLD})`));
  return (
    <div className="flex w-full flex-col items-end" style={{ gap: 16 }}>
      <div className="flex w-full items-start leading-[1.5]">
        <div className="flex min-w-0 flex-1 flex-col items-start text-[#A1AAA3]">
          <p className="text-[32px] font-medium">{v.step}</p>
          <p className="whitespace-nowrap text-[16px] font-normal">{v.label}</p>
        </div>
        <p className="comprehensive-serif w-[170px] shrink-0 text-right text-[24px] italic text-[#46524B]">{v.title}</p>
      </div>
      <div className="flex w-full items-start" style={{ gap: 24 }}>
        <div className="flex min-w-0 flex-1 flex-col items-start" style={{ gap: 72, minHeight: 213 }}>
          <div className="flex items-center" style={{ gap: 8 }}>
            <div className="flex flex-col items-start text-[16px] font-normal leading-[1.5] text-[#46524B]">
              <p className="whitespace-nowrap">{v.before}</p>
              <p>{v.unit}</p>
            </div>
            <div className="flex h-[16px] w-[24px] shrink-0 items-center justify-center">
              <p className="-rotate-90 flex-none whitespace-nowrap text-[24px] font-medium leading-none text-[#46524B]">↓</p>
            </div>
            <div className="flex flex-col items-end text-[16px] font-normal leading-[1.5] text-[#46524B]">
              <p className="whitespace-nowrap">{v.after}</p>
              <div className="flex items-center justify-center px-[5px]">
                <p className="whitespace-nowrap">{v.unit}</p>
              </div>
            </div>
          </div>
          <p className="w-full text-[12px] font-normal leading-[1.5] text-[#6E7A72]">
            {before}
            <strong className="font-bold">{bold}</strong>
            {after}
          </p>
        </div>
        <div className="relative shrink-0 overflow-hidden" style={{ width: 156, height: 210 }}>
          <Image src={v.image} alt={v.title} fill sizes="156px" className={`object-cover ${index === 1 ? "object-top" : ""}`} />
        </div>
      </div>
    </div>
  );
}

/** Vertical timeline; `data-ciw-fill` / `data-ciw-dot` are driven by the scroll timeline */
function Timeline({ g }: { g: Geo }) {
  return (
    <svg width={19} height={g.h} viewBox={`0 0 19 ${g.h}`} fill="none" className="shrink-0" aria-hidden>
      <rect x="7" y={g.trackY} width="5" height={g.trackH} fill="#DCE0DD" />
      <rect data-ciw-fill x="7" y={g.trackY} width="5" height={g.fills[0]} fill="#46524B" />
      <circle cx="9.5" cy="9.5" r="9.5" fill="#46524B" />
      <circle data-ciw-dot cx="9.5" cy={g.dotCy} r="9.5" fill="#A1AAA3" />
    </svg>
  );
}

/** Label + headline + intro (desktop 12593:13151, mobile 12901:10909) */
function Heading({ className }: { className: string }) {
  return (
  <div className={className}>
          <motion.div
            className="flex items-center gap-[8px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="h-[16px] w-[16px] bg-[#17925A]" />
            <span className="whitespace-nowrap text-[12px] leading-[1.5] text-[#46524B] lg:text-[14px]">Change In Weight</span>
          </motion.div>

          <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:gap-[48px]">
            <motion.h2
              className="text-[32px] font-medium leading-[1.5] text-[#46524B] lg:min-w-0 lg:flex-1 lg:text-[56px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              FIND OUT WHAT&rsquo;S ACTUALLY MAKING A DIFFERENCE<span className="hidden lg:inline">.</span>
            </motion.h2>
            <motion.div
              className="flex flex-col items-end gap-[8px] lg:min-w-0 lg:flex-1 lg:items-start"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <span className="w-[276px] text-right text-[20px] font-medium leading-[1.5] text-[#46524B] lg:w-auto lg:whitespace-nowrap lg:text-left lg:font-normal">
                When something changes, see what happens next.
              </span>
              <span className="hidden text-[16px] leading-[1.5] text-[#6E7A72] lg:block">
                Meddy can identify sustained changes in your behavior and compare what happened before and after.
              </span>
            </motion.div>
          </div>
        </div>
  );
}

export default function ChangeInWeightSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dTrackRef = useRef<HTMLDivElement>(null);
  const mTrackRef = useRef<HTMLDivElement>(null);

  // Mobile: the pinned frame is 771px tall; on shorter screens scale it down so the whole section stays visible.
  const [k, setK] = useState(1);
  useEffect(() => {
    const fit = () => setK(Math.min(1, Math.max(0.6, Math.floor((window.innerHeight / MOBILE.stage) * 20) / 20)));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        { desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)", mobile: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)" },
        (ctx) => {
          const desktop = !!ctx.conditions?.desktop;
          const track = desktop ? dTrackRef.current : mTrackRef.current;
          const g = desktop ? DESKTOP : MOBILE;
          const stage = desktop ? g.stage : g.stage * k;
          if (!track) return;
          const imgs = Array.from(track.querySelectorAll<HTMLElement>("[data-ciw-img]"));
          const contents = Array.from(track.querySelectorAll<HTMLElement>("[data-ciw-content]"));
          const fill = track.querySelector<SVGRectElement>("[data-ciw-fill]");
          const dot = track.querySelector<SVGCircleElement>("[data-ciw-dot]");
          const N = contents.length;
          if (N < 2) return;

          imgs.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 }));
          contents.forEach((el, i) => gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 24, force3D: true }));
          if (fill) gsap.set(fill, { attr: { height: g.fills[0] } });

          const HOLD = 1;
          const FADE = 0.5;
          const SEG = HOLD + FADE;

          const tl = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: track,
              // pin begins when the card is centred in the viewport; scrub spans `g.scroll` viewport heights
              start: () => `top ${Math.max(0, (window.innerHeight - stage) / 2)}px`,
              end: () => `+=${window.innerHeight * g.scroll}`,
              invalidateOnRefresh: true,
              scrub: 1,
            },
          });

          for (let i = 0; i < N - 1; i++) {
            const out = HOLD + i * SEG;
            if (imgs.length) {
              tl.to(imgs[i], { autoAlpha: 0, duration: FADE }, out).fromTo(imgs[i + 1], { autoAlpha: 0 }, { autoAlpha: 1, duration: FADE }, out);
            }
            tl.to(contents[i], { autoAlpha: 0, y: -24, duration: FADE }, out).fromTo(
              contents[i + 1],
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: FADE },
              out,
            );
          }

          if (fill) {
            for (let i = 1; i < N; i++) {
              tl.to(fill, { attr: { height: g.fills[i] }, duration: FADE }, HOLD + (i - 1) * SEG);
            }
          }
          if (dot) tl.to(dot, { fill: "#46524B", duration: FADE }, HOLD + (N - 2) * SEG);
        },
      );
      return () => media.revert();
    },
    { scope: sectionRef, dependencies: [k], revertOnUpdate: true },
  );

  return (
    <section id="change-in-weight" ref={sectionRef} className="relative w-full bg-[#FFFEF2]">
      {/* Desktop heading */}
      <Heading className="mx-auto hidden w-full max-w-[1200px] flex-col gap-2 pb-8 pt-[120px] lg:flex" />

      {/* Mobile: the whole 771px frame (heading + card) pins, then the card crossfades through the 3 variants */}
      <div ref={mTrackRef} className="relative lg:hidden" style={{ height: `calc(${MOBILE.stage * k}px + ${MOBILE.scroll * 100}vh)` }}>
        <div className="sticky overflow-hidden" style={{ top: `max(0px, calc(50vh - ${(MOBILE.stage * k) / 2}px))`, height: MOBILE.stage * k }}>
          <div className="flex flex-col px-5 py-16" style={{ gap: 32, width: `${100 / k}%`, height: MOBILE.stage, transform: `scale(${k})`, transformOrigin: "top left" }}>
            <Heading className="flex w-full flex-col gap-6" />
            <div className="flex items-center" style={{ gap: 8, height: MOBILE.h }}>
              <Timeline g={MOBILE} />
              <div className="grid min-w-0 flex-1">
                {CHANGE_IN_WEIGHT_VARIANTS.map((v, i) => (
                  <div key={v.step} data-ciw-content className="col-start-1 row-start-1" style={{ opacity: i === 0 ? 1 : 0 }}>
                    <MobileContent v={v} index={i} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: the card sits 32px under the heading, then pins centred while photo + text crossfade and the timeline fills */}
      <div ref={dTrackRef} className="relative hidden pb-[120px] lg:block" style={{ height: `calc(${DESKTOP.stage}px + ${DESKTOP.scroll * 100}vh + 120px)` }}>
        <div className="sticky" style={{ top: `max(0px, calc(50vh - ${DESKTOP.stage / 2}px))` }}>
          <div className="mx-auto flex w-full max-w-[1200px] items-start" style={{ gap: 48, height: DESKTOP.h }}>
            <div className="relative shrink-0" style={{ width: 425, height: 505 }}>
              {CHANGE_IN_WEIGHT_VARIANTS.map((v, i) => (
                <Image
                  key={v.step}
                  data-ciw-img
                  src={v.image}
                  alt={v.title}
                  fill
                  sizes="425px"
                  className={`absolute inset-0 object-cover ${i === 1 ? "object-top" : ""}`}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                />
              ))}
            </div>

            <div className="flex min-w-0 flex-1 items-center justify-end" style={{ gap: 48 }}>
              <Timeline g={DESKTOP} />
              <div className="grid w-[585px] shrink-0">
                {CHANGE_IN_WEIGHT_VARIANTS.map((v, i) => (
                  <div key={v.step} data-ciw-content className="col-start-1 row-start-1 flex justify-end" style={{ opacity: i === 0 ? 1 : 0 }}>
                    <DesktopContent v={v} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
