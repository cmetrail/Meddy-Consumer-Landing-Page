"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";

// Figma: desktop node 12659:28470 (1440 x 1024) + mobile node 12720:14088 (402 x 875). Dark-green -> light-green gradient with a
// multiplied texture, the "See What Your NUTRITION is Doing To Your Body" lockup, a food stack with four glass chips,
// copy on the left and a three-step list on the right. Everything is placed from the middle of the frame like the design.
const ease = [0.22, 1, 0.36, 1] as const;
const A = "/nutrition/hero";

const GRADIENT = "linear-gradient(180deg, rgb(20, 42, 28) 4.5495%, rgb(44, 93, 61) 29.952%, rgb(56, 119, 78) 42.653%, rgb(180, 211, 191) 100%)";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

type Chip = { label: string; x: number; y: number; w: number; h: number; dotFirst: boolean; border: boolean };

// desktop: centre offsets from the frame's middle (x from 720, y from 512)
const CHIPS_D: Chip[] = [
  { label: "Healthy fats", x: 104.31, y: -139.44, w: 119.629, h: 32.359, dotFirst: true, border: true },
  { label: "Fiber", x: -143.86, y: 305.97, w: 78.445, h: 32.359, dotFirst: false, border: false },
  { label: "Carbohydrates", x: 216.98, y: 76.52, w: 135.318, h: 32.359, dotFirst: true, border: true },
  { label: "Protein", x: -203.68, y: 44.16, w: 90.212, h: 32.359, dotFirst: false, border: false },
];
// mobile: centre positions in the 402-wide frame (x from the left, y from the lockup's top)
const CHIPS_M: Chip[] = [
  { label: "Healthy fats", x: 299.6, y: 130, w: 93.234, h: 29.927, dotFirst: true, border: true },
  { label: "Fiber", x: 104.7, y: 360, w: 57.552, h: 29.927, dotFirst: false, border: false },
  { label: "Carbohydrates", x: 338.3, y: 234, w: 104.744, h: 29.927, dotFirst: true, border: true },
  { label: "Protein", x: 66, y: 202, w: 67.911, h: 29.927, dotFirst: false, border: false },
];

const STEPS = [
  { n: "01.", a: "Meals", b: "you eat", src: "step1.svg", box: "size-[50px]", inset: undefined },
  { n: "02.", a: "Nutrition", b: "analyzed", src: "step2.svg", box: "h-[50px] w-[48px]", inset: "-20% -20.83%" },
  { n: "03.", a: "IMPACT you", b: "understand", src: "step3.svg", box: "size-[50px]", inset: undefined },
];

function ChipEl({ c, mobile }: { c: Chip; mobile?: boolean }) {
  const dot = (
    <span className={`relative block shrink-0 ${mobile ? "size-[6px]" : "size-[9.23px]"}`}>
      <Image src={`${A}/dot.svg`} alt="" fill unoptimized className="block max-w-none" />
    </span>
  );
  return (
    <div
      className={`absolute flex items-center justify-center rounded-[48.456px] border-[1.154px] border-solid bg-[rgba(17,93,44,0.5)] backdrop-blur-[2.307px] ${mobile ? "gap-1 px-2 py-[6px]" : "gap-[9.23px] px-[18.46px] py-[9.23px]"}`}
      style={{ width: c.w, height: c.h, left: c.x, top: c.y, transform: "translate(-50%, -50%)", borderColor: c.border ? "#fff" : "rgba(255,255,255,0)" }}
    >
      {c.dotFirst && dot}
      <p className={`comprehensive-serif whitespace-nowrap font-normal capitalize not-italic leading-[1.5] text-white ${mobile ? "text-[10px] leading-[normal]" : "text-[16px]"}`}>{c.label}</p>
      {!c.dotFirst && dot}
    </div>
  );
}

function Food({ w, h, src }: { w: number; h: number; src: string }) {
  return (
    <div className="absolute overflow-hidden" style={{ width: w, height: h }}>
      <Image
        src={`${A}/${src}`}
        alt="A stack of salmon, avocado, feta, bread, papaya and broccoli on a plate"
        width={961}
        height={1200}
        priority
        sizes="580px"
        className="pointer-events-none absolute max-w-none"
        style={{ height: "134.06%", left: "-10.37%", top: "-23.32%", width: "123.02%" }}
      />
    </div>
  );
}

export default function NutritionHeroSection() {
  return (
    <section className="relative flex min-h-[875px] w-full flex-col overflow-hidden lg:min-h-[1024px]" style={{ background: GRADIENT }}>
      {/* texture, multiplied over the gradient */}
      <div className="pointer-events-none absolute top-[-46.5px] mix-blend-multiply lg:top-[-24px]" style={{ left: "50%", width: 1908, height: 1073, transform: "translateX(-50%)" }}>
        <Image src={`${A}/bg.png`} alt="" fill priority sizes="1908px" className="object-cover" />
      </div>

      <div className="relative z-30">
        <Header variant="dark" active="Nutrition" />
      </div>

      {/* ------------------------------------------------------------ mobile */}
      <div className="relative mx-auto mt-[67px] flex w-full max-w-[402px] flex-1 flex-col items-center px-5 pb-16 lg:hidden">
        <div className="relative h-[540px] w-[402px] shrink-0">
          {/* lockup */}
          <motion.div className="absolute left-1/2 top-0 -translate-x-1/2" {...fade(0)}>
            <div className="relative h-[95px] w-[357.5px]">
              <p className="absolute whitespace-nowrap text-[16px] font-normal capitalize leading-[normal] text-[#7cb18f]" style={{ left: 128, top: 0 }}>See What Your</p>
              <p className="absolute whitespace-nowrap text-[16px] font-normal capitalize leading-[normal] text-[#7cb18f]" style={{ left: 0, top: 74.47 }}>is Doing</p>
              <p className="absolute whitespace-nowrap text-[16px] font-normal capitalize leading-[normal] text-[#7cb18f]" style={{ left: 269, top: 74.47 }}>To Your Body</p>
              <div className="absolute" style={{ left: 3.94, top: 22.04, width: 357.517, height: 52.431 }}>
                <Image src={`${A}/headline-m.svg`} alt="Nutrition" fill unoptimized priority className="block max-w-none" />
              </div>
            </div>
          </motion.div>

          {/* food stack + chips, positioned from the lockup's top-left (402 frame) */}
          <motion.div className="absolute inset-0" {...fade(0.15)}>
            <div className="absolute" style={{ left: 20, top: 422, width: 318.534, height: 46.417 }}>
              <div className="absolute" style={{ inset: "-68.14% -9.93%" }}>
                <Image src={`${A}/shadow-m.svg`} alt="" fill unoptimized className="block max-w-none" />
              </div>
            </div>
            <div className="absolute" style={{ left: 14.4, top: 44.5 }}>
              <Food w={372.683} h={427.033} src="food-m.png" />
            </div>
            {CHIPS_M.map((c) => (
              <ChipEl key={c.label} c={c} mobile />
            ))}
          </motion.div>
        </div>

        <motion.p className="mt-0 w-full max-w-[362px] text-center text-[16px] font-normal leading-[normal] text-white" {...fade(0.25)}>
          Track <b className="font-bold">calories, macros, vitamins, minerals, hydration,</b> and more. Then see how changes in what you eat connect to changes in your body over time.
        </motion.p>
      </div>

      {/* ------------------------------------------------------------ desktop */}
      <div className="relative hidden flex-1 lg:block">
        {/* centred 1440 x 1024 stage (same coordinates as the frame, minus the header height) */}
        <div className="absolute left-1/2 h-[1024px] w-[1440px] -translate-x-1/2" style={{ top: -82 }}>
          <motion.div {...fade(0)}>
            {[
              { t: "See What Your", l: 720 - 138, tp: 179 },
              { t: "is Doing", l: 720 - 472, tp: 385 },
              { t: "To Your Body", l: 720 + 222, tp: 385 },
            ].map((p) => (
              <p key={p.t} className="absolute whitespace-nowrap text-[40px] font-medium leading-[1.5] text-[#7cb18f]" style={{ left: p.l, top: p.tp }}>{p.t}</p>
            ))}
            <div className="absolute" style={{ left: 720.5 - 470.5, top: 246, width: 941, height: 138 }}>
              <Image src={`${A}/headline.svg`} alt="Nutrition" fill unoptimized priority className="block max-w-none" />
            </div>
          </motion.div>

          <motion.div {...fade(0.15)}>
            <div className="absolute" style={{ left: 720 - 0.81 - 246, top: 1024 - 97.17 - 71.688, width: 491.96, height: 71.688 }}>
              <div className="absolute" style={{ inset: "-44.12% -6.43%" }}>
                <Image src={`${A}/shadow.svg`} alt="" fill unoptimized className="block max-w-none" />
              </div>
            </div>
            <div className="absolute" style={{ left: 720 - 0.21 - 287.786, top: 512 + 131.23 - 329.766 }}>
              <Food w={575.572} h={659.531} src="food.png" />
            </div>
            {CHIPS_D.map((c) => (
              <ChipEl key={c.label} c={{ ...c, x: 720 + c.x, y: 512 + c.y }} />
            ))}
          </motion.div>
        </div>

        {/* copy + steps share the header container's edges */}
        <div className="absolute inset-x-0 mx-auto max-w-360 px-10" style={{ top: -82 }}>
          <motion.p className="absolute left-10 w-[433px] text-[16px] font-normal leading-[1.5] text-white" style={{ top: 692 }} {...fade(0.2)}>
            Track calories, macros, vitamins, minerals, hydration, and more. Then see how changes in what you eat connect to changes in your body over time.
          </motion.p>
          <motion.div className="absolute right-10 flex flex-col items-center justify-center gap-8" style={{ top: 516 }} {...fade(0.25)}>
            {STEPS.map((s) => (
              <div key={s.n} className="flex flex-col items-center gap-[6px]">
                <span className={`relative block shrink-0 ${s.box}`}>
                  {s.inset ? (
                    <span className="absolute" style={{ inset: s.inset }}>
                      <Image src={`${A}/${s.src}`} alt="" fill unoptimized className="block max-w-none" />
                    </span>
                  ) : (
                    <Image src={`${A}/${s.src}`} alt="" fill unoptimized className="block max-w-none" />
                  )}
                </span>
                <div className="flex items-start justify-center gap-[6px] text-[16px] font-bold uppercase text-white">
                  <p className="comprehensive-serif whitespace-nowrap text-center font-bold leading-[normal]">{s.n}</p>
                  <div className="leading-[normal]">
                    <p>{s.a}</p>
                    <p>{s.b}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
