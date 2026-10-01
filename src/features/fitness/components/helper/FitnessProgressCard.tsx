"use client";

import { useState } from "react";
import Image from "next/image";
import { Dumbbell, Activity, Heart, NotebookPen } from "lucide-react";

const TABS = [
  { label: "Strength", icon: Dumbbell },
  { label: "Cardio", icon: Activity },
  { label: "Intensity", icon: Heart },
  { label: "HR Zone", icon: NotebookPen },
];

/* ---------- Strength ---------- */
const STRENGTH_GROUPS = [
  { label: "Chest", value: 110, color: "#E09A2A", width: "24%" },
  { label: "Back", value: 50, color: "#148BD5", width: "18.39%" },
  { label: "Legs", value: 100, color: "#C084FC", width: "30.19%" },
  { label: "Arms", value: 120, color: "#6EE7A0", width: "13.22%" },
  { label: "Shoulders", value: 100, color: "#FF7043", width: "13.22%" },
];

function StrengthContent() {
  return (
    <div className="flex flex-col justify-center rounded-[16px] bg-[#09090B] p-6 lg:min-h-[494px]">
      <div className="flex flex-col gap-5 rounded-[15.6px] border border-[#E2E2E2]/10 bg-[#111113] p-5">
        <div className="flex items-center justify-between">
          <span className="text-[15px] text-[#7B7B7B]">Cumulative</span>
          <div className="flex h-[31px] items-stretch overflow-hidden rounded-[20px] border border-[#E2E2E2]">
            <button
              type="button"
              className="flex items-center rounded-l-[20px] bg-[#17925A] px-4 text-[15px] font-bold text-white"
            >
              %
            </button>
            <button
              type="button"
              className="flex items-center rounded-r-[20px] bg-[#232324] px-4 text-[15px] font-bold text-[#7B7B7B]"
            >
              Load
            </button>
          </div>
        </div>

        <div className="flex h-[62px] w-full gap-[1.3px]">
          {STRENGTH_GROUPS.map((g) => (
            <div
              key={g.label}
              className="h-full rounded-[1.3px]"
              style={{ width: g.width, background: g.color }}
            />
          ))}
        </div>

        <div className="flex flex-col items-start gap-[10.4px]">
          {STRENGTH_GROUPS.map((g) => (
            <div
              key={g.label}
              className="flex items-center gap-2 rounded-[7.8px] bg-[#09090B] px-[10px] py-[7.8px]"
            >
              <span className="h-[15.6px] w-[15.6px] rounded-[2.6px]" style={{ background: g.color }} />
              <span className="text-[18px] font-medium text-[#7B7B7B]">{g.label}</span>
              <span className="text-[18px] font-medium text-white">
                {g.value} <span className="text-[#7B7B7B]">lbs</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Cardio ---------- */
const HR_ZONES = [
  { label: "Zone 1", pct: "25%", color: "#D69D43", width: "30.04%" , mw: "26.5%" },
  { label: "Zone 2", pct: "20%", color: "#4089CF", width: "13.37%" , mw: "10.1%" },
  { label: "Zone 3", pct: "35%", color: "#B786F5", width: "36.43%" , mw: "41.6%" },
  { label: "Zone 4", pct: "10%", color: "#ED7950", width: "10.08%" , mw: "10.2%" },
  { label: "Zone 5", pct: "10%", color: "#8EE4A6", width: "9.30%" , mw: "10.2%" },
];

function CardioContent() {
  return (
    <div className="flex flex-col rounded-[16px] bg-[#111113] p-6">
      <div className="flex flex-col gap-4 sm:gap-6">
        <span className="text-[16px] text-white sm:text-[24px]">Cardiovascular Training</span>

        <div className="flex flex-col gap-2">
          <span className="text-[14px] text-white sm:text-[20px]">Total Duration</span>
          <span className="text-[28px] font-semibold leading-none text-white sm:text-[40px]">210 mins</span>
        </div>

        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-[10px]">
            <div className="flex h-[114px] flex-col justify-center gap-2 rounded-lg bg-[#232324] p-4 sm:justify-between sm:gap-0 sm:p-6">
              <span className="text-[16px] text-white">Session Days</span>
              <div className="flex items-center gap-2">
                <span className="text-[16px] leading-none text-white sm:text-[30px]">3</span>
                <span className="text-[14px] text-white sm:text-[20px]">+1</span>
              </div>
            </div>
            <div className="flex h-[114px] flex-col justify-center gap-2 rounded-lg bg-[#232324] p-4 sm:justify-between sm:gap-0 sm:p-6">
              <span className="text-[16px] text-white">Average HR</span>
              <div className="flex items-center gap-2">
                <span className="text-[16px] leading-none text-white sm:text-[30px]">142 bpm</span>
                <span className="text-[14px] text-white sm:text-[20px]">+3%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex w-full gap-px">
              {HR_ZONES.map((z) => (
                <div key={z.label} className="h-[98px] w-[var(--mw)] sm:w-[var(--w)]" style={{ ["--mw" as string]: z.mw, ["--w" as string]: z.width, background: z.color }} />
              ))}
            </div>
            <div className="flex w-full text-[12px] text-white sm:text-[20px]">
              {HR_ZONES.map((z, i) => (
                <span key={z.label} className="w-[var(--mw)] shrink-0 whitespace-nowrap sm:w-[var(--w)]" style={{ ["--mw" as string]: z.mw, ["--w" as string]: z.width }}>
                  {z.pct}
                 
                </span>
              ))}
            </div>
            <div className="hidden w-full text-[16px] text-white opacity-60 sm:flex">
              {HR_ZONES.map((z) => (
                <span key={z.label} className="shrink-0 whitespace-nowrap" style={{ width: z.width }}>
                  {z.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Intensity ---------- */
const INTENSITY_BARS = [
  { label: "Moderate Intensity", done: "112 min", goal: "150 min", color: "#E09A2A", delta: "-10%", up: false },
  { label: "Vigorous Intensity", done: "41 min", goal: "75 min", color: "#FF546B", delta: "+ 5%", up: true },
];

const BADGES = [
  { label: "Moderate Intensity", color: "#E09A2A", flame: "amber", delta: "-2", up: false },
  { label: "Vigorous Intensity", color: "#FF546B", flame: "pink", delta: "+ 1", up: true },
];

function IntensityContent() {
  return (
    <div className="flex flex-col gap-6 rounded-[16px] bg-[#09090B] p-6 lg:h-[489px]">
      <span className="text-[24px] font-semibold leading-normal text-white">AHA Badges</span>

      <div className="flex flex-col gap-4">
        {INTENSITY_BARS.map((b) => (
          <div key={b.label} className="flex flex-col items-end gap-2">
            <div className="flex w-full items-center justify-between gap-2 text-[14px] font-semibold">
              <span className="text-white">{b.label}</span>
              <span className="whitespace-nowrap">
                <span className="text-white">{b.done}</span>
                <span className="text-[#7B7B7B]"> / {b.goal}</span>
              </span>
            </div>
            <div className="flex h-2 w-full gap-px">
              <div className="h-full shrink-0" style={{ width: "58.9%", background: b.color }} />
              <div className="h-full flex-1 bg-[#E2E2E2]" />
            </div>
            <span
              className={`flex items-center gap-1 text-[10px] font-medium ${b.up ? "text-[#17925A]" : "text-[#FF546B]"}`}
            >
              <Image
                src={b.up ? "/fitness/icons/intensity-delta-up.svg" : "/fitness/icons/intensity-delta-down.svg"}
                width={10}
                height={10}
                alt=""
              />
              {b.delta}
            </span>
          </div>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-1 gap-5 pt-4 sm:grid-cols-2">
        {BADGES.map((b) => (
          <div key={b.label} className="flex flex-col justify-between gap-4 rounded-xl bg-[#171718] p-4">
            <div className="flex items-start gap-2">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                style={{ background: b.color }}
              >
                <span className="flex h-[31px] w-[31px] items-center justify-center rounded-full bg-white/20">
                  <Image src={`/fitness/icons/intensity-flame-${b.flame}.svg`} width={17} height={22} alt="" />
                </span>
              </span>
              <div className="flex flex-col gap-4 font-semibold leading-normal">
                <span className="text-[14px] text-white">{b.label}</span>
                <span className="flex flex-col whitespace-nowrap text-[12px] text-[#7B7B7B]">
                  <span>Goal Achieved</span>
                  <span>150 min/week</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span
                className="rounded-full border px-2 py-0.5 text-[14px] font-medium"
                style={{ color: b.color, background: `${b.color}1A`, borderColor: `${b.color}33` }}
              >
                2 badges
              </span>
              <span
                className={`flex items-center gap-1 text-[10px] font-medium ${b.up ? "text-[#17925A]" : "text-[#FF546B]"}`}
              >
                <Image
                  src={b.up ? "/fitness/icons/intensity-delta-up.svg" : "/fitness/icons/intensity-delta-down.svg"}
                  width={10}
                  height={10}
                  alt=""
                />
                {b.delta}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- HR Zone ---------- */
const PROFILE_ROWS = [
  { label: "Joint Stress", level: "High", filled: 4, color: "#F97316" },
  { label: "Impact", level: "Low", filled: 1, color: "#17925A" },
  { label: "Spinal Load", level: "Min", filled: 1, color: "#17925A" },
  { label: "Balance", level: "Low", filled: 1, color: "#17925A" },
];

const STAT_CARD = "flex flex-1 flex-col items-start justify-center gap-1 rounded-[7.3px] bg-[#171718] p-[14.6px]";

function HRZoneContent() {
  return (
    <div className="flex flex-col gap-6 rounded-[16px] bg-[#09090B] p-6 lg:h-[489px]">
      <div className="flex flex-col gap-[7.3px]">
        <div className="flex gap-[7.3px] lg:h-[130px]">
          <div className={STAT_CARD}>
            <Image src="/fitness/icons/hr-icon-time.svg" width={16} height={16} alt="" />
            <span className="text-[26px] font-medium leading-normal text-white">01:30:33</span>
            <span className="text-[10px] leading-normal text-[#7B7B7B]">Total Workout Time</span>
          </div>
          <div className={STAT_CARD}>
            <Image src="/fitness/icons/hr-icon-exercises.svg" width={16} height={16} alt="" />
            <span className="text-[26px] font-medium leading-normal text-white">
              14<span className="text-[#7B7B7B]"> / 15</span>
            </span>
            <span className="text-[10px] leading-normal text-[#7B7B7B]">Exercises done</span>
          </div>
          <div className={STAT_CARD}>
            <Image src="/fitness/icons/hr-icon-calories.svg" width={16} height={16} alt="" />
            <span className="text-[26px] font-medium leading-normal text-white">
              500<span className="text-[#7B7B7B]"> Kcal</span>
            </span>
            <span className="text-[10px] leading-normal text-[#7B7B7B]">Calories Burned</span>
          </div>
        </div>

        <div className="flex gap-[7.3px] lg:h-[108px]">
          <div className={STAT_CARD}>
            <span className="text-[12px] font-semibold leading-normal text-[#7B7B7B]">Avg HR Zone</span>
            <div className="relative flex items-center gap-px">
              <span className="h-[18px] w-2 rounded-full bg-[#6EE7A0]" />
              <span className="h-[18px] w-2 rounded-full bg-[#148BD5]" />
              <span className="flex items-center gap-1 rounded-full bg-[#17925A] px-3 py-0.5">
                <Image src="/fitness/icons/hr-zone-frame.svg" width={16} height={16} alt="" />
                <span className="text-[12px] font-bold leading-normal text-white">ZONE</span>
                <span className="text-[13px] font-bold leading-normal text-white">3</span>
              </span>
              <span className="h-[18px] w-2 rounded-full bg-[#E09A2A]" />
              <span className="h-[18px] w-2 rounded-full bg-[#FF7043]" />
              <Image
                src="/fitness/icons/hr-zone-polygon.svg"
                width={15}
                height={11}
                alt=""
                className="absolute left-[78px] top-[19.5px]"
              />
            </div>
          </div>
          <div className={STAT_CARD}>
            <span className="text-[12px] font-semibold leading-normal text-[#7B7B7B]">Avg HR</span>
            <span className="text-[26px] font-medium leading-normal text-white">150 bpm</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-2">
          <span className="text-[12px] leading-normal text-white">Workout Rating</span>
          <div className="flex items-center gap-[6px]">
            <span className="h-3 w-3 rounded-full bg-[#17925A]" />
            <span className="text-[14px] font-semibold leading-normal text-white">Easy (2/5)</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-[#1F1F21] bg-[#111113] p-3">
          {PROFILE_ROWS.map((row) => (
            <div key={row.label} className="flex items-center justify-between">
              <span className="text-[12px] leading-normal text-[#7B7B7B]">{row.label}</span>
              <div className="flex items-center gap-2">
                <div className="flex w-[48px] items-center gap-[2px]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      className="h-[4px] w-2 shrink-0 rounded-[2px]"
                      style={{ background: i < row.filled ? row.color : row.label === "Joint Stress" ? "#232324" : "#333333" }}
                    />
                  ))}
                </div>
                <span className="text-[12px] leading-normal text-[#F4F4F5]">{row.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FitnessProgressCard() {
  const [active, setActive] = useState(1);

  return (
    <div className={`flex w-full flex-col gap-6 rounded-[20px] px-2 py-4 backdrop-blur-[20px] sm:px-4 sm:py-8 ${active === 0 ? "bg-white/10" : "bg-white/20"}`}>
      <div className="flex items-center overflow-x-auto [scrollbar-width:none] sm:overflow-visible">
        {TABS.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = i === active;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full p-2 text-[14px] sm:flex-1 sm:px-4 sm:py-3 lg:px-3 lg:py-4 transition-colors sm:text-[20px] ${
                isActive ? "bg-white text-[#111110]" : "text-white"
              }`}
            >
              <Icon className="h-6 w-6" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {active === 0 && <StrengthContent />}
      {active === 1 && <CardioContent />}
      {active === 2 && <IntensityContent />}
      {active === 3 && <HRZoneContent />}
    </div>
  );
}
