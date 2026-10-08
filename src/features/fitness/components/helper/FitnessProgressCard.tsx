"use client";

import { useState } from "react";
import Image from "next/image";
import { Dumbbell, Heart, NotebookPen } from "lucide-react";
import styles from "./FitnessProgressCard.module.css";

function RunningIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="15" cy="4" r="2" />
      <path d="m5 9 4-2 4 2-3 5 4 3 2 5M13 9l3 3 4-3M10 14l-3 4H3" />
    </svg>
  );
}

const TABS = [
  { label: "Strength", icon: Dumbbell },
  { label: "Cardio", icon: RunningIcon },
  { label: "Intensity", icon: Heart },
  { label: "HR Zone", icon: NotebookPen },
];

/* ---------- Strength ---------- */
const STRENGTH_GROUPS = [
  { label: "Chest", load: 110, percent: 22, color: "#E09A2A", width: 24 },
  { label: "Back", load: 50, percent: 10, color: "#148BD5", width: 18.4 },
  { label: "Legs", load: 100, percent: 20, color: "#C084FC", width: 22.8 },
  { label: "Arms", load: 120, percent: 15, color: "#6EE7A0", width: 11.5 },
  { label: "Shoulders", load: 100, percent: 13, color: "#FF7043", width: 7.8 },
  { label: "Biceps", load: 40, percent: 8, color: "#FFFFFF", width: 6.5 },
  { label: "Triceps", load: 35, percent: 7, color: "#8A8A8A", width: 6.3 },
  { label: "Calves", load: 15, percent: 3, color: "#820DE8", width: 1.7 },
  { label: "Forearms", load: 10, percent: 2, color: "#17925A", width: 1.5 },
];

function StrengthContent() {
  const [unit, setUnit] = useState<"percent" | "load">("percent");

  return (
    <div className={styles.strength}>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.caption}>Cumulative</span>
          <div className={styles.unitToggle} role="group" aria-label="Strength units">
            <button
              type="button"
              aria-label="Percentage"
              aria-pressed={unit === "percent"}
              onClick={() => setUnit("percent")}
              className={styles.unitButton}
            >
              %
            </button>
            <button
              type="button"
              aria-pressed={unit === "load"}
              onClick={() => setUnit("load")}
              className={styles.unitButton}
            >
              Load
            </button>
          </div>
        </div>

        <div className={styles.bar} role="img" aria-label="Cumulative muscle group distribution">
          {STRENGTH_GROUPS.map((group) => (
            <div
              key={group.label}
              className={styles.segment}
              style={{ flexGrow: group.width, background: group.color }}
            />
          ))}
        </div>

        <div className={styles.legend}>
          {[STRENGTH_GROUPS.slice(0, 5), STRENGTH_GROUPS.slice(5)].map((column, index) => (
            <div key={index} className={styles.legendColumn}>
              {column.map((group) => (
                <div key={group.label} className={styles.legendItem}>
                  <span className={styles.swatch} style={{ background: group.color }} />
                  <span className={styles.muscleName}>{group.label}</span>
                  <span className={styles.value}>
                    {unit === "percent" ? `${group.percent}%` : `${group.load} lbs`}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Cardio ---------- */
const HR_ZONES = [
  { label: "Zone 1", pct: "25%", color: "#D69D43", width: 30.04 },
  { label: "Zone 2", pct: "20%", color: "#4089CF", width: 13.37 },
  { label: "Zone 3", pct: "35%", color: "#B786F5", width: 36.43 },
  { label: "Zone 4", pct: "10%", color: "#ED7950", width: 10.08 },
  { label: "Zone 5", pct: "10%", color: "#8EE4A6", width: 9.30 },
];

function CardioContent() {
  return (
    <div className={styles.cardio}>
      <span className={styles.cardioTitle}>Cardiovascular Training</span>
      <span className={styles.durationLabel}>Total Duration</span>
      <span className={styles.durationValue}>210 mins</span>

      <div className={styles.cardioStats}>
        <div className={styles.cardioStat}>
          <span className={styles.statLabel}>Session Days</span>
          <div className={styles.statValueRow}>
            <span className={styles.statValue}>3</span>
            <span className={styles.statDelta}>+2</span>
          </div>
        </div>
        <div className={styles.cardioStat}>
          <span className={styles.statLabel}>Average HR</span>
          <div className={styles.statValueRow}>
            <span className={styles.statValue}>142 bpm</span>
            <span className={styles.statDelta}>+3%</span>
          </div>
        </div>
      </div>

      <div className={styles.zones}>
        <span className={styles.zonesTitle}>HR Zones</span>
        <div className={styles.zoneBar} role="img" aria-label="Heart rate zones: Zone 1 25%, Zone 2 20%, Zone 3 35%, Zone 4 10%, Zone 5 10%">
          {HR_ZONES.map((zone) => (
            <div key={zone.label} className={styles.zoneSegment} style={{ flexGrow: zone.width, background: zone.color }} />
          ))}
        </div>
        <div className={styles.zonePercentages}>
          {HR_ZONES.map((zone) => (
            <span key={zone.label} style={{ flexGrow: zone.width }}>{zone.pct}</span>
          ))}
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
  const [active, setActive] = useState(0);

  return (
    <div className={styles.card}>
      <div className={styles.tabs} role="group" aria-label="Training category">
        {TABS.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = i === active;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={styles.tab}
            >
              <Icon className={styles.tabIcon} />
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
