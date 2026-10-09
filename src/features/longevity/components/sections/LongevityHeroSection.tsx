"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";

// Figma: desktop node 12613:14341 (1440 x 1096), mobile node 12721:17771 (402 x 874), cream #FFF8E4.
// Hero text sits between six photos. Each photo is the Figma bounding box (left/top/w/h) holding the raw
// image at its own size, rotated + skewed like the design so the edges end up as parallelograms/trapezoids.
// Desktop: 1200 x 838 stage, scaled down to always fit the viewport under the header. Mobile: two 362px photo rows.
const ease = [0.22, 1, 0.36, 1] as const;

type Photo = {
  src: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  w: number; // bounding box
  h: number;
  iw?: number; // inner (pre-transform) size, defaults to the box
  ih?: number;
  rot?: number; // deg, rotate + skewX share the angle
  sy?: number; // scaleY
  flip?: string; // transform for the flipped trapezoids
};

const DESKTOP: Photo[] = [
  { src: "/longevity/top-center.png", left: "calc(50% - 20.51px)", top: "0px", w: 181.025, h: 196.901, flip: "translateX(-50%) scaleY(-1)" },
  { src: "/longevity/bottom-center.png", left: "calc(50% - 0.28px)", bottom: "0.3px", w: 210.561, h: 227.696, flip: "translateX(-50%) scaleX(-1)" },
  { src: "/longevity/top-left.jpg", left: "0px", top: "41.99px", w: 201.033, h: 264.428, iw: 205.344, ih: 222.575, rot: 11.76, sy: 0.98 },
  { src: "/longevity/top-right.png", right: "40.81px", top: "42.93px", w: 200.557, h: 263.623 },
  { src: "/longevity/bottom-left.jpg", left: "0px", top: "502.98px", w: 204.844, h: 298.523, iw: 214.967, ih: 233.333, rot: 17.65, sy: 0.95 },
  { src: "/longevity/bottom-right.jpg", right: "0.77px", top: "502.98px", w: 217.23, h: 276.478, iw: 220.446, ih: 238.961, rot: -9.8, sy: 0.99 },
];

const MOBILE_TOP: Photo[] = [
  { src: "/longevity/top-left.jpg", left: "0px", top: "12.5px", w: 98.196, h: 131.872, iw: 100.39, ih: 111, rot: 12, sy: 0.98 },
  { src: "/longevity/top-center.png", left: "131px", top: "0px", w: 100, h: 111, flip: "scaleY(-1)" },
  { src: "/longevity/top-right.png", left: "280px", top: "33.5px", w: 82, h: 111 },
];

const MOBILE_BOTTOM: Photo[] = [
  { src: "/longevity/bottom-left.jpg", left: "0px", top: "0px", w: 95.444, h: 142.012, iw: 100.356, ih: 111, rot: 18, sy: 0.95 },
  { src: "/longevity/bottom-center.png", left: "131px", top: "31px", w: 100, h: 111, flip: "scaleX(-1)" },
  { src: "/longevity/bottom-right.jpg", left: "263px", top: "14px", w: 98.832, h: 128.427, iw: 100.356, ih: 111, rot: -10, sy: 0.98 },
];

function Photos({ list }: { list: Photo[] }) {
  return (
    <>
      {list.map((p) => (
        <div
          key={p.src}
          className="pointer-events-none absolute flex items-center justify-center"
          style={{ left: p.left, right: p.right, top: p.top, bottom: p.bottom, width: p.w, height: p.h, transform: p.flip }}
        >
          <div
            className="relative shrink-0"
            style={{
              width: p.iw ?? p.w,
              height: p.ih ?? p.h,
              rotate: p.rot ? `${p.rot}deg` : undefined,
              scale: p.sy ? `1 ${p.sy}` : undefined,
              transform: p.rot ? `skewX(${p.rot}deg)` : undefined,
            }}
          >
            <Image src={p.src} alt="" fill sizes="220px" className="max-w-none object-cover" />
          </div>
        </div>
      ))}
    </>
  );
}

const STAGE_W = 1200;
const STAGE_H = 838;

// stage = header container width (max-w-360 px-10, min 1200 then scaled), photos pinned to its left/right edges
function useStageScale() {
  const [s, setS] = useState({ d: 1, w: STAGE_W, m: 1, ready: false }); // ready: hide the stage until measured, so it never jumps from the 1200 default
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      const avail = Math.min(vw, 1440) - 80; // header container: max-w-360 px-10
      setS({ d: Math.min(1, avail / STAGE_W), w: Math.max(STAGE_W, avail), m: Math.min(1, (vw - 40) / 362), ready: true });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return s;
}

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

export default function LongevityHeroSection() {
  const { d: s, w, m, ready } = useStageScale();

  return (
    <section className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-[#FFF8E4] lg:min-h-[1096px]">
      <div className="relative z-30">
        <Header variant="light" active="Longevity" />
      </div>

      {/* Mobile */}
      <div className="relative z-20 mx-auto flex w-full max-w-[402px] flex-1 flex-col items-center justify-center gap-6 px-5 pb-16 pt-6 lg:hidden">
        <div className="relative" style={{ width: 362 * m, height: 145 * m, visibility: ready ? "visible" : "hidden" }}>
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: 362, height: 145, transform: `scale(${m})` }}>
            <Photos list={MOBILE_TOP} />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-9">
          <div className="flex w-full flex-col items-center gap-4 text-center">
            <div className="flex w-full flex-col items-center leading-[1.5]">
              <motion.p className="whitespace-nowrap text-[24px] font-medium uppercase text-[#6E7A72]" {...fade(0)}>
                Don&rsquo;t just live longer.
              </motion.p>
              <motion.h1 className="comprehensive-serif whitespace-nowrap text-[32px] font-normal italic text-[#46524B]" {...fade(0.1)}>
                Stay healthier longer.
              </motion.h1>
            </div>
            <motion.p className="w-full text-[14px] font-normal leading-[1.5] text-[#6E7A72]" {...fade(0.2)}>
              Meddy brings your <b className="font-bold">biomarkers, nutrition, fitness, sleep, weight, medications, and health history</b> together so you and your
              physician can understand where your health is going and act earlier.
            </motion.p>
          </div>
          <motion.button type="button" className="rounded-[35px] bg-[#17925A] px-5 py-3 text-[16px] font-normal leading-[normal] text-white" {...fade(0.3)}>
            Get Started
          </motion.button>
        </div>

        <div className="relative" style={{ width: 362 * m, height: 143 * m, visibility: ready ? "visible" : "hidden" }}>
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: 362, height: 143, transform: `scale(${m})` }}>
            <Photos list={MOBILE_BOTTOM} />
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="relative z-20 hidden flex-1 items-start justify-center pb-[120px] pt-[70px] lg:flex">
        <div style={{ width: w * s, height: STAGE_H * s, visibility: ready ? "visible" : "hidden" }}>
          <div
            className="relative flex flex-col items-center justify-center text-center"
            style={{ width: w, height: STAGE_H, transform: `scale(${s})`, transformOrigin: "top left" }}
          >
            <Photos list={DESKTOP} />

            <div className="flex flex-col items-center gap-9">
              <div className="flex flex-col items-center">
                <motion.p className="-mb-[10px] text-[40px] font-medium uppercase leading-[1.5] text-[#6E7A72]" {...fade(0)}>
                  Don&rsquo;t just live longer
                </motion.p>
                <motion.h1 className="comprehensive-serif whitespace-nowrap text-[104px] font-normal italic leading-[1.5] text-[#46524B]" {...fade(0.1)}>
                  Stay healthier longer.
                </motion.h1>
                <motion.p className="whitespace-nowrap text-[16px] font-normal leading-[1.5] text-[#6E7A72]" {...fade(0.2)}>
                  Meddy brings your biomarkers, nutrition, fitness, sleep, weight, medications, and health history together
                  <br />
                  so you and your physician can understand where your health is going and act earlier.
                </motion.p>
              </div>
              <motion.button type="button" className="rounded-[35px] bg-[#17925A] px-6 py-4 text-[20px] font-normal leading-[normal] text-white transition-opacity hover:opacity-85" {...fade(0.3)}>
                Get Started
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
