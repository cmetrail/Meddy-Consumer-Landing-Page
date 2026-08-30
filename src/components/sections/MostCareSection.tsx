"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  Flame,
  Footprints,
  Activity,
  Moon,
} from "lucide-react";
import { MealCard as MealCardBase } from "./how-meddy-works/helper/MealCard";
import { MacroBar } from "./how-meddy-works/helper/macro-bar";
import { SleepArchitectureBar, type ISleepStage } from "./how-meddy-works/helper/SleepArchitectureBar";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-reveal className={className}>
      {children}
    </div>
  );
}

/* ─────────────────────────────── Calories Card ─────────────────────────────── */

function CaloriesCard() {
  const stats = [
    { icon: Footprints, label: "Steps", value: "6,842" },
    { icon: Flame, label: "Burned", value: "320" },
    { icon: Activity, label: "Net", value: "920" },
  ];
  return (
    <div
      className="relative overflow-hidden rounded-[10px] shadow-[6px_8px_8px_rgba(0,0,0,0.2)]"
      style={{ background: "linear-gradient(150deg, #1A3D2B 0%, #1E4A33 50%, #163322 100%)" }}
    >
      {/* glow */}
      <div className="absolute -top-[53px] right-[-1rem] h-[168px] w-[168px] rounded-full bg-[#17925A] blur-[75px]" />

      {/* header */}
      <div className="relative flex items-start justify-between px-6 pt-6">
        <div>
          <p className="text-[#6EE7A0] text-[10px] font-medium uppercase tracking-wide">Calories today</p>
          <div className="mt-1 flex items-end gap-1.5">
            <span className="text-white text-[48px] font-medium leading-none tracking-[-0.015em]">1,240</span>
            <span className="pb-1 text-white text-xs font-semibold">kcal</span>
          </div>
        </div>
        <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[13px] border border-[#17925A]/25 bg-[#17925A]/15">
          <Flame size={17} className="text-[#6EE7A0]" />
        </div>
      </div>

      {/* divider + stats */}
      <div className="relative mt-6 border-t border-white/10">
        <div className="grid grid-cols-3">
          {stats.map(({ icon: Icon, label, value }, i) => (
            <div
              key={label}
              className="flex flex-col gap-0.5 px-6 py-4"
              style={{
                borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <div className="flex items-center gap-1.5">
                <Icon size={13} className="text-white/80" />
                <span className="text-white/70 text-[10px]">{label}</span>
              </div>
              <span className="text-white text-[18px] font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────── Nutrients Card ────────────────────────────── */

function NutrientsCard() {
  return (
    <div className="rounded-[12px] border border-[#E2E2E2] bg-white p-4 shadow-[2.4px_3.6px_9.5px_rgba(0,0,0,0.2)]">
      <p className="text-[#111110] text-base font-semibold">Nutrients</p>

      <div className="mt-6">
        <MacroBar
          variant="light"
          items={[
            { key: "protein", label: "Protein", shortLabel: "P", percentage: 40, color: "#E09A2A" },
            { key: "fats", label: "Fats", shortLabel: "F", percentage: 30, color: "#8A8A82" },
            { key: "carbs", label: "Carbs", shortLabel: "C", percentage: 30, color: "#17925A" },
          ]}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────── Meal Card ──────────────────────────────── */

function MealCard() {
  return (
    <div className="relative w-full" style={{ aspectRatio: "428/321" }}>
      <Image
        src="/home/most-care-meal.png"
        alt="Meal"
        fill
        className="object-cover rounded-[11px]"
      />
      {/* meal list card */}
      <div className="absolute right-0 bottom-0 w-[62%]">
        <MealCardBase variant="light" className="w-full rounded-[11px]" />
      </div>
    </div>
  );
}

/* ─────────────────────────────── Workout Card ─────────────────────────────── */

function WorkoutCard() {
  const breakdown: ISleepStage[] = [
    { key: "chest", label: "Chest", shortLabel: "Chest", percentage: 23, color: "bg-[#E09A2A]", badgeBg: "bg-[#E09A2A]", extraLabelValue: <span>110 lbs</span> },
    { key: "back", label: "Back", shortLabel: "Back", percentage: 10, color: "bg-[#148BD5]", badgeBg: "bg-[#148BD5]", extraLabelValue: <span>50 lbs</span> },
    { key: "legs", label: "Legs", shortLabel: "Legs", percentage: 21, color: "bg-[#C084FC]", badgeBg: "bg-[#C084FC]", extraLabelValue: <span>100 lbs</span> },
    { key: "arms", label: "Arms", shortLabel: "Arms", percentage: 25, color: "bg-[#17925A]", badgeBg: "bg-[#17925A]", extraLabelValue: <span>120 lbs</span> },
    { key: "shoulders", label: "Shoulders", shortLabel: "Shoulders", percentage: 21, color: "bg-[#FF7043]", badgeBg: "bg-[#FF7043]", extraLabelValue: <span>100 lbs</span> },
  ];
  return (
    <div className="relative w-full" style={{ aspectRatio: "512/345" }}>
      <Image
        src="/home/most-care-workout.png"
        alt="Workout"
        fill
        className="object-cover rounded-[10px]"
      />
      {/* cumulative load card */}
      <div className="absolute right-0 top-0 h-full w-[40%] rounded-md border border-[#E2E2E2] bg-white p-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[#7B7B7B] text-[9px]">Cumulative</span>
          <div className="flex overflow-hidden rounded-lg border border-[#E2E2E2] text-[8px] font-bold">
            <span className="bg-[#17925A] px-1.5 py-0.5 text-white">Load</span>
            <span className="bg-[#F8F8F8] px-1.5 py-0.5 text-[#7B7B7B]">%</span>
          </div>
        </div>

        <div className="mt-3">
          <SleepArchitectureBar variant="light" items={breakdown} />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────── A1c Card ───────────────────────────────── */

function A1cChart() {
  const grid = [16, 14, 12, 10, 8, 6, 4, 2, 0];
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  const line = "26.37,90.49 51.54,95.29 74.91,100.09 91.09,103.68 136.64,110.27 166.01,113.27";
  const dots = [
    [26.37, 90.49],
    [51.54, 95.29],
    [74.91, 100.09],
    [91.09, 103.68],
    [136.64, 110.27],
    [166.01, 113.27],
  ];
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 214 187" className="w-full">
        {/* horizontal grid lines */}
        {grid.map((g, i) => {
          const y = 23.38 + i * 16.48;
          return (
            <g key={g}>
              <line x1={26.37} y1={y} x2={200.17} y2={y} stroke="#1F1F21" strokeWidth={0.3} />
              <text x={4.8} y={y + 2.6} fontSize={6} fill="#8A8A82" fontFamily="Plus Jakarta Sans">
                {g}%
              </text>
            </g>
          );
        })}
        {/* dashed average */}
        <line x1={26.37} y1={40.38} x2={200.17} y2={40.38} stroke="#F2A61A" strokeWidth={0.6} strokeDasharray="3.6 2.4" />
        {/* trend line */}
        <polyline points={line} fill="none" stroke="#F2A61A" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.8} fill="#F2A61A" />
        ))}
      </svg>

      {/* Avg badge */}
      <div className="absolute left-[12%] top-[13%] rounded-[2px] bg-[#D98C0D] px-1.5 py-0.5">
        <span className="text-[6px] font-bold text-black">Avg: 14.3%</span>
      </div>

      {/* KPI tooltip */}
      <div className="absolute right-0 top-[42%] w-[28%] rounded-[5px] border border-[#1F1F21] bg-[#232324] px-1.5 py-1">
        <span className="text-[6px] text-[#999999]">KPI</span>
        <div className="mt-1 flex items-center gap-1">
          <span className="h-[5px] w-[5px] rounded-full bg-[#E09A2A]" />
          <span className="text-[6px] text-[#F4F4F5]">A1c: 12.8%</span>
        </div>
      </div>

      {/* months */}
      <div className="mt-0.5 flex justify-between pl-[12%]">
        {months.map((m, i) => (
          <span key={i} className="text-[6px] text-[#8A8A82]">{m}</span>
        ))}
      </div>
    </div>
  );
}

function A1cCard() {
  return (
    <div className="relative w-full" style={{ aspectRatio: "435/377" }}>
      <div className="absolute right-0 top-0 h-full w-[60%]">
        <Image src="/home/most-care-a1c.png" alt="A1c" fill className="object-cover rounded-[11px]" />
      </div>
      <div className="absolute left-0 bottom-0 w-[56%] rounded-[7px] border border-[#E2E2E2] bg-white p-2 shadow-md">
        <p className="text-[9px] font-medium text-[#111110]">A1c Trend</p>
        <div className="mt-1">
          <A1cChart />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────── Sleep Card ──────────────────────────────── */

function SleepCard() {
  const bars = [
    { h: 39, label: "Mon" },
    { h: 36, label: "Tue" },
    { h: 34, label: "Wed" },
    { h: 32, label: "Thu" },
    { h: 35, label: "Fri" },
    { h: 54, label: "Sat", active: true },
  ];
  const times = ["20:00", "00:00", "04:00", "08:00", "12:00"];
  return (
    <div className="relative w-full" style={{ aspectRatio: "418/329" }}>
      <div className="absolute left-0 top-0 h-full w-[69%]">
        <Image src="/home/most-care-sleep.png" alt="Sleep" fill className="object-cover rounded-[10px]" />
      </div>
      {/* score + graph card */}
      <div className="absolute right-0 bottom-0 top-[48%] w-[55%] rounded-[10px] bg-white p-3 shadow-[4px_4px_8px_rgba(0,0,0,0.25)]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[8px] font-medium text-[#878787]">Score</p>
            <p className="text-[17px] font-bold leading-tight text-[#18181B]">93%</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="rounded-[2px] bg-[#57E6FF] px-1.5 py-0.5 text-[8px] font-bold text-[#0C0D0F]">
              Very Stable
            </span>
            <Moon size={10} className="text-[#57E6FF]" />
          </div>
        </div>

        <div className="mt-2 flex">
          <div className="flex flex-col justify-between text-right text-[7px] text-[#7B7B7B]">
            {times.map((t) => (
              <span key={t} className="leading-none">{t}</span>
            ))}
          </div>
          <div className="ml-1.5 flex flex-1 items-end gap-1 border-b border-l border-[#C7C7C7] pb-0.5 pl-1.5" style={{ height: 64 }}>
            {bars.map((b) => (
              <div key={b.label} className="flex h-full flex-1 flex-col justify-end">
                <div
                  className="w-full rounded-[2px]"
                  style={{ height: `${b.h}%`, background: b.active ? "#7B7B7B" : "#DBDBDB" }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="ml-7 mt-1 flex gap-0 text-[6px] text-[#7B7B7B]">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d} className="flex-1 text-center">{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────── Section ─────────────────────────────────── */

export default function MostCareSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F2EEE3] overflow-hidden">
      <div className="max-w-360 mx-auto px-6 lg:px-13 py-20 lg:py-28">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          <Reveal className="lg:mt-12">
            <MealCard />
          </Reveal>
          <Reveal>
            <WorkoutCard />
          </Reveal>
          <Reveal className="lg:mt-24">
            <CaloriesCard />
          </Reveal>
        </div>

        {/* Central statement */}
        <Reveal className="mx-auto mt-16 lg:mt-20 max-w-2xl text-center">
          <p className="text-[#228755] uppercase tracking-[0.02em]" style={{ fontSize: 20 }}>
            Always on-care
          </p>
          <p className="text-[#7B7B7B] font-medium mt-4" style={{ fontSize: 32 }}>
            Most care happens in 15-minute visits.
          </p>
          <p className="text-[#363636] font-semibold mt-1" style={{ fontSize: 36 }}>
            Meddy happens everyday
          </p>
        </Reveal>

        {/* Bottom row */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          <Reveal>
            <NutrientsCard />
          </Reveal>
          <Reveal className="lg:mt-14">
            <A1cCard />
          </Reveal>
          <Reveal>
            <SleepCard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
