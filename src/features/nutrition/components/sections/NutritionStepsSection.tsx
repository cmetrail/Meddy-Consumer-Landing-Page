"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import styles from "./NutritionStepsSection.module.css";

// Figma: component set 12659:26984 "Nutrition" (5 variants, 1200 x 500 each) / default 12659:29889. A numbered rail (01-05) with a
// green fill, a 600 x 500 blue card whose contents change per step, a big ghost number and a 32px title. Scrolling the pinned
// section moves to the next step: rail fills + circle turns green, the card's panels slide in one after another, bars/chart draw in.
// Mobile (node 12720:15490) uses the same pinned step-through with a compact rail, 100px ghost number, scaled card and serif title.
const ease = [0.22, 1, 0.36, 1] as const;
const A = "/nutrition/steps";

const STEPS = 5;
const RAIL_FILL = [17, 96, 198, 293, 405]; // Figma fill heights of the rail per variant

const TITLES: React.ReactNode[] = [
  <>
    Take a photo of your meal. <Em>Meddy does the rest.</Em>
  </>,
  <>
    Know what you&apos;re actually <Em>missing</Em>
  </>,
  <>
    Know what to eat <Em>next</Em>
  </>,
  <>
    Connect <Em>what you eat</Em> to <br />
    <Em>what happens</Em> to your body
  </>,
  <>
    <Em>Nutrition</Em> your physician can actually see
  </>,
];

function Em({ children }: { children: React.ReactNode }) {
  return <span className="comprehensive-serif font-normal italic text-[#17925a]">{children}</span>;
}

/* ------------------------------------------------------------------ shared bits */
const panelV = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
};
const stage = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.02 } }, exit: { opacity: 0, transition: { duration: 0.15 } } };

function Svg({ src, className = "" }: { src: string; className?: string }) {
  return <Image src={`${A}/${src}`} alt="" fill unoptimized className={`block max-w-none ${className}`} />;
}

const GLASS = "absolute flex flex-col items-start backdrop-blur-[25px]";

/** one label + value + coloured bar row of the step-2 cards (bar width in px of the 169px track) */
function Meter({ label, value, w, color }: { label: string; value: string; w: number; color: string }) {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-[2.25px] rounded-[3.375px]">
      <div className="flex w-full items-center justify-between whitespace-nowrap text-[12px] font-normal leading-[1.5] text-[#111110]">
        <p>{label}</p>
        <p>{value}</p>
      </div>
      <div className="flex h-[4.5px] w-full items-center justify-between">
        <motion.div className="h-full shrink-0 origin-left" style={{ width: w, background: color }} variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease, delay: 0.25 } } }} />
        <div className="h-full min-w-px flex-1 bg-[#f8f8f8]" />
      </div>
    </div>
  );
}

function MeterCard({ title, color, rows, style, border }: { title: string; color: string; rows: [string, string, number][]; style: React.CSSProperties; border: string }) {
  return (
    <motion.div className={`${GLASS} w-[201px] gap-[9px] rounded-[9px] border-[0.563px] border-solid bg-[rgba(255,255,255,0.1)] p-4`} style={{ ...style, borderColor: border }} variants={panelV}>
      <p className="w-full text-[16px] font-normal leading-[1.5] text-white">{title}</p>
      {rows.map(([l, v, w]) => (
        <Meter key={l} label={l} value={v} w={w} color={color} />
      ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ step 1 */
function Step1() {
  return (
    <motion.div className="absolute right-0 top-0 h-[507px] w-[398px] overflow-hidden" variants={panelV}>
      <Image src={`${A}/hand.png`} alt="A hand holding a phone scanning a plate of eggs on toast" width={4000} height={3000} priority sizes="860px" className="pointer-events-none absolute max-w-none" style={{ height: "120.25%", left: "-68.64%", top: "-20.25%", width: "213.45%" }} />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ step 2 */
function Step2() {
  return (
    <>
      <motion.div className="absolute overflow-hidden" style={{ left: 127, top: 157.52, width: 428, height: 533 }} variants={panelV}>
        <Image src={`${A}/phone2.png`} alt="The Meddy nutrition tab" width={4000} height={3000} sizes="900px" className="pointer-events-none absolute max-w-none" style={{ height: "125.51%", left: "-51.38%", top: "-13.83%", width: "208.58%" }} />
      </motion.div>
      <MeterCard title="Vitamins" color="#c084fc" border="#f5f5f0" style={{ left: 45, top: 23.52 }} rows={[["Vitamin A", "36% DV", 48], ["Vitamin C", "10% DV", 20], ["Vitamin D", "65% DV", 109], ["Vitamin E", "55% DV", 99], ["Vitamin K", "25% DV", 53]]} />
      <MeterCard title="Elements" color="#148bd5" border="#fff" style={{ left: 89, top: 283 }} rows={[["Iron", "21% DV", 48], ["Zinc", "16% DV", 26], ["Copper", "51% DV", 90], ["Manganese", "68% DV", 112], ["Iodine", "28% DV", 40]]} />
      <MeterCard title="Minerals" color="#e09a2a" border="#f5f5f0" style={{ left: 354, top: 107 }} rows={[["Calcium", "15% DV", 38], ["Phosphorus", "65% DV", 112], ["Magnesium", "73% DV", 128], ["Sodium", "28% DV", 39], ["Potassium", "90% DV", 138]]} />
    </>
  );
}

/* ------------------------------------------------------------------ step 3 */
const MACROS = [
  { icon: "e-fire.svg", name: "Calories", v: "640", t: "Target: 705 Kcal" },
  { icon: "e-meat.svg", name: "Protein", v: "42g", t: "Target: 50 g" },
  { icon: "e-grain.svg", name: "Carbs", v: "58", t: "Target: 70 g" },
  { icon: "e-avocado.svg", name: "Fat", v: "22 g", t: "Target: 25 g" },
  { icon: "e-leaf.svg", name: "Fiber", v: "9g" },
  { icon: "e-salt.svg", name: "Sodium", v: "480mg" },
];

function FoodCard({ src, name, over }: { src: string; name: string; over?: string }) {
  return (
    <div className="flex min-w-px flex-1 flex-col items-center gap-[6px] rounded-[12px] border border-solid border-white bg-[rgba(245,245,240,0.2)] p-3">
      <div className="relative size-[32px] shrink-0 overflow-hidden rounded-[8px]">
        <Image src={`${A}/${src}`} alt="" fill sizes="64px" className="max-w-none object-cover" />
        {over && <Image src={`${A}/${over}`} alt="" fill sizes="64px" className="max-w-none object-cover" />}
      </div>
      <p className="w-full text-center text-[12px] font-semibold leading-[1.5] text-[#111110]">{name}</p>
    </div>
  );
}

function Nut({ label, pct, tag, tagColor, fill, fillColor, foods }: { label: string; pct: string; tag: string; tagColor: string; fill: number; fillColor: string; foods: { src: string; name: string; over?: string }[] }) {
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <div className="flex w-full flex-col items-start gap-2">
        <div className="flex w-full items-center justify-between whitespace-nowrap leading-[1.5]">
          <p className="text-[14px] font-semibold text-[#111110]">{label}</p>
          <div className="flex items-center gap-[6px]">
            <p className="text-[14px] font-semibold text-[#111110]">{pct}</p>
            <p className="text-[12px] font-normal" style={{ color: tagColor }}>{tag}</p>
          </div>
        </div>
        <div className="flex h-[4px] w-full items-start overflow-clip rounded-[100px] bg-white">
          <motion.div className="h-full shrink-0 origin-left" style={{ width: fill, background: fillColor }} variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease, delay: 0.3 } } }} />
        </div>
      </div>
      <div className="flex w-full items-start gap-2">
        {foods.map((f) => (
          <FoodCard key={f.name} {...f} />
        ))}
      </div>
    </div>
  );
}

function Step3() {
  return (
    <>
      <div className="absolute w-[413px]" style={{ left: 18, top: 164.45, transform: "translateY(-50%)" }}>
      <motion.div className="flex w-full flex-col items-start" variants={panelV}>
        <div className="flex w-full flex-col items-center gap-[19.566px] rounded-[14.674px] border-[1.223px] border-solid border-[#e2e2e2] bg-[rgba(245,245,240,0.2)] p-[19.566px] backdrop-blur-[25px]">
          <div className="grid w-full grid-cols-3 gap-y-[19.725px]">
            {MACROS.map((m, i) => (
              <div key={m.name} className={`flex w-[61.642px] flex-col items-start gap-[6.164px] ${i % 3 === 1 ? "justify-self-center" : i % 3 === 2 ? "justify-self-end" : ""}`}>
                <span className="relative block size-[20px] shrink-0"><Svg src={m.icon} /></span>
                <div className="flex w-full flex-col items-start gap-[4.931px] whitespace-nowrap leading-none">
                  <p className="text-[12.328px] font-normal text-black">{m.name}</p>
                  <p className="comprehensive-serif text-[17.26px] font-normal not-italic text-[#111110]">{m.v}</p>
                  {m.t && <p className="text-[8px] font-normal text-black">{m.t}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      </div>
      <div className="absolute w-[413px]" style={{ left: 136, top: 307, transform: "translateY(-50%)" }}>
      <motion.div className="flex w-full flex-col items-start overflow-clip" variants={panelV}>
        <div className="flex h-[298px] w-full flex-col items-center gap-[19.566px] rounded-[14.674px] border-[1.223px] border-solid border-white bg-[rgba(245,245,240,0.2)] p-[19.566px] backdrop-blur-[25px]">
          <Nut label="Vitamin A" pct="30% DV" tag="(Increase)" tagColor="#17925a" fill={111} fillColor="#17925a" foods={[{ src: "t-carrots.png", name: "Carrots" }, { src: "t-sweet.png", name: "Sweet Potato" }, { src: "t-spinach.jpg", name: "Spinach" }]} />
          <Nut label="Vitamin C" pct="95% DV" tag="(Maintain)" tagColor="#148bd5" fill={303} fillColor="#148bd5" foods={[{ src: "t-oranges-bg.jpg", over: "t-oranges.png", name: "Oranges" }, { src: "t-pepper.jpg", name: "Bell Peppers" }, { src: "t-straw.png", name: "Strawberries" }]} />
        </div>
      </motion.div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ step 4 */
function Step4() {
  const fillId = useId();
  const macros = [
    { x: 52, width: 228, color: "#1499e3", tag: "P 40%", label: "Protein", tagX: 65, tagWidth: 47, textColor: "#fff" },
    { x: 280, width: 172, color: "#ffdb45", tag: "F 30%", label: "Fats", tagX: 295, tagWidth: 46, textColor: "#111110" },
    { x: 453, width: 120, color: "#9affad", tag: "C 30%", label: "Carbs", tagX: 464, tagWidth: 48, textColor: "#111110" },
  ];
  return (
    <motion.div className="absolute inset-0" variants={panelV}>
      <svg viewBox="0 0 624 520" className="block h-full w-full" fontWeight="400" role="img" aria-label="Nutrition breakdown from January to May: protein 40%, fats 30%, carbs 30%. Current weight 176 pounds, down 8% from 191 pounds.">
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0.5" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="35.5" y="14.5" width="553" height="491" rx="8" fill="#f5f5f0" fillOpacity="0.1" stroke="white" />
        <text x="52" y="46" fill="#111110" fontSize="14" fontWeight="600">Nutrition Breakdown</text>
        <text x="52" y="64" fill="#32647a" fontSize="10">Average Macronutrient Breakdown : Jan&#8211;May</text>
        <text x="52" y="90" fill="#111110" fontSize="14">Jan - May</text>
        {macros.map((macro) => (
          <g key={macro.label}>
            <line x1={macro.x} y1="119" x2={macro.x} y2="190" stroke={macro.color} strokeWidth="2" />
            <rect x={macro.tagX} y="119" width={macro.tagWidth} height="20" rx="2" fill={macro.color} />
            <text x={macro.tagX + 4} y="133" fill={macro.textColor} fontSize="12" fontWeight="700">{macro.tag}</text>
            {Array.from({ length: Math.floor(macro.width / 10.8) }, (_, i) => (
              <motion.line key={i} x1={macro.x + (i + 1) * 10.8} y1="151" x2={macro.x + (i + 1) * 10.8} y2="190" stroke={macro.color} strokeWidth="2"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { delay: 0.2 + i * 0.015 } } }} />
            ))}
            <text x={macro.x - 1} y="207" fill="white" fontSize="12" fontWeight="600">{macro.label}</text>
          </g>
        ))}
        <text x="52" y="238" fill="white" fontSize="13">Current Weight</text>
        <text x="51" y="279" fill="white" fontSize="30" fontWeight="600">176 lbs</text>
        <circle cx="172" cy="277" r="10" fill="#65e6a3" />
        <path d="M172 272V282M168 278L172 282L176 278" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="188" y="282" fill="white" fontSize="14">8% down</text>
        <text x="52" y="305" fill="white" fontSize="13">from 191 lbs</text>
        <g>
          <text transform="translate(60 402) rotate(-90)" fill="white" fontSize="8" textAnchor="middle">Weight (lbs)</text>
          {[200, 190, 180, 170, 160].map((weight, i) => (
            <g key={weight}>
              <text x="87" y={351 + i * 27.25} textAnchor="end" fill="white" fontSize="12">{weight}</text>
              <line x1="92" y1={347 + i * 27.25} x2="573" y2={347 + i * 27.25}
                stroke={weight === 160 ? "#526d78" : "#618ba1"} strokeOpacity={weight === 160 ? 1 : 0.35} strokeDasharray={weight === 160 ? "2.5 5" : undefined} />
            </g>
          ))}
          <motion.g variants={{ hidden: { clipPath: "inset(0 100% 0 0)" }, show: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.3, ease, delay: 0.3 } } }}>
            <path d="M131 369 C205 386 306 404 383 411 S486 417 523 415 L523 456 L131 456 Z" fill={`url(#${fillId})`} />
            <path d="M131 369 C205 386 306 404 383 411 S486 417 523 415" fill="none" stroke="white" strokeWidth="1.5" />
            <line x1="523" y1="398" x2="523" y2="456" stroke="white" strokeWidth="1" />
            <circle cx="523" cy="415" r="4" fill="white" />
          </motion.g>
          <g>
            <rect x="454" y="377" width="84" height="17" rx="4" fill="white" />
            <path d="M520 394L526 394L523 398Z" fill="white" />
            <text x="461" y="389" fill="#111110" fontSize="8">May, 2026 - 176 lbs</text>
          </g>
          {["Jan", "Feb", "Mar", "Apr", "May"].map((month, i) => (
            <g key={month}>
              <line x1={131 + i * 98} y1="467" x2={131 + i * 98} y2="475" stroke="#e2e2e2" strokeWidth="1.5" />
              <text x={131 + i * 98} y="488" textAnchor="middle" fill="#111110" fontSize="10">{month}</text>
            </g>
          ))}
        </g>
      </svg>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ step 5 */
type Meal = { name: string; dot: string; note: string; kcal: string; color: string; items: { n: string; days: string; fill: number; kcal: string; macros: string }[] };
const MEALS: Meal[] = [
  { name: "Breakfast", dot: "dot-purple.svg", note: "Most Frequent · 28 days logged", kcal: "420", color: "#c084fc", items: [{ n: "Eggs & turkey bacon", days: "22 of 28 days", fill: 56, kcal: "320", macros: "P: 28g · F: 20g · C: 4g" }, { n: "Greek yogurt + berries", days: "18 of 28 days", fill: 46, kcal: "100", macros: "P: 12g · F: 0g · C: 15g" }] },
  { name: "Lunch", dot: "dot-orange.svg", note: "Most Frequent · 26 days logged", kcal: "560", color: "#ff7043", items: [{ n: "Grilled chicken salad", days: "20 of 26 days", fill: 55, kcal: "380", macros: "P: 42g · F: 14g · C: 20g" }, { n: "Turkey wrap", days: "12 of 26 days", fill: 32, kcal: "506", macros: "P: 20g · F: 8g · C: 18g" }] },
  { name: "Dinner", dot: "dot-yellow.svg", note: "Most Frequent · 24 days logged", kcal: "480", color: "#e09a2a", items: [{ n: "Salmon + roasted vegetables", days: "18 of 24 days", fill: 54, kcal: "480", macros: "P: 36g · F: 22g · C: 32g" }] },
];

function MealCard({ m, small }: { m: Meal; small?: boolean }) {
  return (
    <div className="flex w-full flex-col items-start rounded-[7.101px] border-[0.592px] border-solid border-white bg-[rgba(255,255,255,0.2)] p-[11.836px]">
      <div className="flex w-full items-center justify-between border-b-[0.592px] border-solid border-[#25282e] pb-[5px]">
        <div className="flex items-center gap-[5.918px]">
          <span className="relative block size-[5.918px] shrink-0"><Svg src={m.dot} /></span>
          <p className="whitespace-nowrap text-[8.285px] font-semibold leading-[1.5] text-[#111110]">{m.name}</p>
          <p className="whitespace-nowrap text-[7.101px] font-normal leading-[1.5] text-[#8a8a82]">{m.note}</p>
        </div>
        <div className="flex items-center gap-1">
          <span className="relative block size-[9px] shrink-0"><Svg src="e-fire.svg" /></span>
          <p className="whitespace-nowrap text-[9.468px] font-semibold leading-[1.5] text-[#111110]">{m.kcal} kcal</p>
        </div>
      </div>
      {!small &&
        m.items.map((it) => (
          <div key={it.n} className="flex w-full items-center justify-between py-[4.734px]">
            <div className="flex min-w-px flex-1 flex-col items-start gap-[2.367px]">
              <p className="whitespace-nowrap text-[7.101px] font-semibold leading-[1.5] text-[#111110]">{it.n}</p>
              <div className="flex items-center gap-[4.734px]">
                <div className="flex h-[3.551px] w-[71.013px] items-start overflow-clip rounded-[1.775px] bg-white">
                  <motion.div className="h-full origin-left rounded-[1.775px]" style={{ width: it.fill, background: m.color }} variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease, delay: 0.5 } } }} />
                </div>
                <p className="whitespace-nowrap text-[5.918px] font-normal leading-[1.5] text-[#111110]">{it.days}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-[2.367px] whitespace-nowrap leading-[1.5] text-[#111110]">
              <p className="text-[8.285px] font-semibold">{it.kcal} kcal</p>
              <p className="text-[5.918px] font-normal">{it.macros}</p>
            </div>
          </div>
        ))}
    </div>
  );
}

function Step5() {
  return (
    <>
      {/* soft back panel (blurred, behind) */}
      <motion.div className="absolute flex flex-col items-start gap-[14.203px] overflow-clip rounded-[9.468px] bg-[rgba(245,245,240,0.1)] p-[18.937px] blur-[4px]" style={{ left: 234, top: -80, width: 473, height: 451 }} variants={panelV}>
        <p className="text-[11.836px] font-semibold text-[#111110]">Full Nutrition Report</p>
        <MealCard m={MEALS[0]} />
        <MealCard m={MEALS[1]} />
      </motion.div>
      {/* front panel */}
      <motion.div className="absolute flex flex-col items-start gap-[14.203px] overflow-clip rounded-[9.468px] border border-solid border-[#f8f8f8] bg-[rgba(245,245,240,0.1)] p-[18.937px] backdrop-blur-[25px]" style={{ left: 0, top: 105, width: 465, height: 451 }} variants={panelV}>
        <div className="flex w-full items-center justify-between">
          <p className="text-[11.836px] font-semibold leading-[1.5] text-[#111110]">Full Nutrition Report</p>
          <span className="relative block size-[17.753px] shrink-0"><Svg src="close.svg" /></span>
        </div>
        {MEALS.map((m) => (
          <MealCard key={m.name} m={m} />
        ))}
      </motion.div>
    </>
  );
}

const STEP_VIEWS = [Step1, Step2, Step3, Step4, Step5];

/** the 600 x 500 blue card (gradient + the step's panels). `animate` toggles the staggered reveal. */
function Card({ i }: { i: number }) {
  const View = STEP_VIEWS[i];
  return (
    <div className="relative h-[500px] w-[600px] shrink-0 overflow-clip rounded-[12px]" style={{ backgroundImage: "linear-gradient(-31.158deg, rgb(255, 255, 249) 4.4664%, rgb(116, 205, 255) 37.376%, rgb(42, 128, 184) 98.112%)" }}>
      <AnimatePresence mode="wait">
        <motion.div key={i} className="absolute inset-0" variants={stage} initial="hidden" animate="show" exit="exit">
          <View />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ rail */
function Rail({ active, onPick, m }: { active: number; onPick: (i: number) => void; m?: boolean }) {
  const fill = m ? [17, 106, 195, 284, 341].map((v) => v) : RAIL_FILL;
  return (
    <div className={`relative flex shrink-0 flex-col items-center justify-center gap-[40px] ${m ? "" : "w-[60px] items-start"}`}>
      <div className={`absolute w-[5px] bg-[#7b7b7b] opacity-20 ${m ? "left-1/2 top-[38.61px] h-[341px] -translate-x-1/2" : "left-[27px] top-[39px] h-[375px]"}`} />
      <motion.div className={`absolute w-[5px] rounded-[23px] bg-[#17925a] ${m ? "left-1/2 top-[39px] -translate-x-1/2" : "left-[27px] top-[39px]"}`} initial={false} animate={{ height: fill[active] }} transition={{ duration: 0.8, ease }} />
      {Array.from({ length: STEPS }, (_, i) => {
        const on = i <= active;
        return (
          <motion.button
            key={i}
            type="button"
            onClick={() => onPick(i)}
            className={`relative flex cursor-pointer flex-col items-center justify-center rounded-[42px] ${m ? "px-4 py-[14px]" : "w-full p-4"}`}
            initial={false}
            animate={{ backgroundColor: on ? "#17925a" : "#f5f5f0", color: on ? "#ffffff" : "#111110" }}
            transition={{ duration: 0.45, ease }}
          >
            <span className={`w-full text-center font-normal leading-[1.5] ${m ? "text-[14px]" : "text-[20px]"}`}>{`0${i + 1}`}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

/** ghost number + title */
function Copy({ i, m }: { i: number; m?: boolean }) {
  return (
    <div className="flex min-w-px flex-1 flex-col items-start justify-between self-stretch">
      <div className={`flex w-full items-center justify-end overflow-visible mix-blend-darken ${m ? "h-[127px]" : "h-[316px]"}`}>
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            className={`-rotate-[0.31deg] whitespace-nowrap bg-clip-text font-bold leading-[normal] text-transparent ${m ? "text-[100px] tracking-[2px]" : "text-[250px] tracking-[5px]"}`}
            style={{ backgroundImage: "linear-gradient(118deg, rgba(62,161,77,0.05) 17.036%, rgba(23,58,30,0.05) 68.574%)" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease }}
          >
            {`0${i + 1}`}
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.p key={i} className={m ? "comprehensive-serif text-[16px] font-normal not-italic leading-[1.5] text-[#111110]" : "text-[32px] font-medium leading-[1.5] text-[#111110]"} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease }}>
            {TITLES[i]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileNumber({ i }: { i: number }) {
  return (
    <div className="flex h-[127px] w-[115px] items-center justify-center mix-blend-darken">
      <AnimatePresence mode="wait">
        <motion.p key={i} className="-rotate-[0.31deg] whitespace-nowrap bg-clip-text text-[100px] font-bold leading-[normal] tracking-[2px] text-transparent" style={{ backgroundImage: "linear-gradient(116deg, rgba(62,161,77,0.05) 17.036%, rgba(23,58,30,0.05) 68.574%)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45, ease }}>{`0${i + 1}`}</motion.p>
      </AnimatePresence>
    </div>
  );
}

function MobileTitle({ i }: { i: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.p key={i} className="comprehensive-serif text-[16px] font-normal not-italic leading-[1.5] text-[#111110]" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease }}>
        {TITLES[i]}
      </motion.p>
    </AnimatePresence>
  );
}

/** scales a 600 x 500 card to the width it is given (mobile) */
function Scaled({ children }: { children: React.ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useEffect(() => {
    const calc = () => outer.current && setK(Math.min(1, outer.current.clientWidth / 600));
    calc();
    const ro = new ResizeObserver(calc);
    if (outer.current) ro.observe(outer.current);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={outer} className="w-full" style={{ height: 500 * k }}>
      <div style={{ width: 600, height: 500, transform: `scale(${k})`, transformOrigin: "top left" }}>{children}</div>
    </div>
  );
}

export default function NutritionStepsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.max(0, Math.min(STEPS - 1, Math.floor(v * STEPS * 0.999)))));

  return (
    <section ref={ref} className={`${styles.track} relative w-full bg-[#faf9f5]`}>
      {/* desktop: pinned stage, same container as the header */}
      <div className={`${styles.stage} sticky top-0 hidden items-center lg:flex`}>
        <div className="mx-auto flex w-full max-w-360 items-center gap-[43px] px-10">
          <Rail active={active} onPick={setActive} />
          <div className="flex min-w-px flex-1 items-center gap-12">
            <Card i={active} />
            <Copy i={active} />
          </div>
        </div>
      </div>

      {/* mobile (node 12720:15490): same pinned step-through, rail + ghost number + scaled card + 16px serif title */}
      <div className={`${styles.stage} sticky top-0 flex items-center lg:hidden`}>
        <div className="flex w-full items-center gap-4 px-5">
          <Rail active={active} onPick={setActive} m />
          <div className="flex min-w-px flex-1 flex-col items-end gap-4">
            <div className="flex w-full justify-end">
              <MobileNumber i={active} />
            </div>
            <div className="w-full overflow-clip rounded-[5.86px]">
              <Scaled>
                <Card i={active} />
              </Scaled>
            </div>
            <div className="w-full"><MobileTitle i={active} /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
