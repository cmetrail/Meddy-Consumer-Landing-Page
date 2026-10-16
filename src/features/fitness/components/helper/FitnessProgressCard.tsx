"use client";

import { useEffect, useRef, useState } from "react";
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

const AUTO_ROTATE_INTERVAL = 5000;

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
        <div className={styles.zoneLabels}>
          {HR_ZONES.map((zone, index) => (
            <span key={zone.label} style={{ flexGrow: zone.width }}>HR Zones {index + 1}</span>
          ))}
        </div>
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
    <div className={styles.intensity}>
      <span className={styles.intensityTitle}>AHA Badges</span>
      <div className={styles.intensityProgressList}>
        {INTENSITY_BARS.map((bar) => (
          <div key={bar.label} className={styles.intensityProgress}>
            <div className={styles.intensityProgressLabel}>
              <span>{bar.label}</span>
              <span className={styles.intensityMinutes}>{bar.done}<span> / {bar.goal}</span></span>
            </div>
            <div className={styles.intensityTrack} role="img" aria-label={`${bar.label}: ${bar.done} of ${bar.goal}`}>
              <div style={{ width: "58.9%", background: bar.color }} />
            </div>
            <span className={styles.intensityDelta} style={{ color: bar.up ? "#17925A" : "#FF546B" }}>
              <Image src={bar.up ? "/fitness/icons/intensity-delta-up.svg" : "/fitness/icons/intensity-delta-down.svg"} width={10} height={10} alt="" />
              {bar.delta}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.intensityBadges}>
        {BADGES.map((badge) => (
          <div key={badge.label} className={styles.intensityBadge}>
            <span className={styles.intensityBadgeIcon} style={{ background: badge.color }}>
              <span><Image src={`/fitness/icons/intensity-flame-${badge.flame}.svg`} width={17} height={22} alt="" /></span>
            </span>
            <div className={styles.intensityBadgeCopy}>
              <span>{badge.label}</span>
              <span className={styles.intensityGoal}><span>Goal Achieved</span><span>150 min/week</span></span>
            </div>
            <div className={styles.intensityBadgeResult}>
              <span className={styles.intensityBadgeCount} style={{ color: badge.color, background: `${badge.color}1A`, borderColor: `${badge.color}33` }}>2 badges</span>
              <span className={styles.intensityDelta} style={{ color: badge.up ? "#17925A" : "#FF546B" }}>
                <Image src={badge.up ? "/fitness/icons/intensity-delta-up.svg" : "/fitness/icons/intensity-delta-down.svg"} width={10} height={10} alt="" />
                {badge.delta}
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

function HRZoneContent() {
  return (
    <div className={styles.hrZone}>
      <div className={styles.hrSummary}>
        <div className={styles.hrTopStats}>
          <div className={styles.hrStat}>
            <Image src="/fitness/icons/hr-icon-time.svg" width={16} height={16} alt="" />
            <span className={styles.hrValue}>01:30:33</span>
            <span className={styles.hrCaption}>Total Workout Time</span>
          </div>
          <div className={styles.hrStat}>
            <Image src="/fitness/icons/hr-icon-exercises.svg" width={16} height={16} alt="" />
            <span className={styles.hrValue}>14<span className={styles.hrMuted}> / 15</span></span>
            <span className={styles.hrCaption}>Exercises done</span>
          </div>
          <div className={styles.hrStat}>
            <Image src="/fitness/icons/hr-icon-calories.svg" width={16} height={16} alt="" />
            <span className={styles.hrValue}>500<span className={styles.hrMuted}> Kcal</span></span>
            <span className={styles.hrCaption}>Calories Burned</span>
          </div>
        </div>
        <div className={styles.hrBottomStats}>
          <div className={styles.hrStat}>
            <span className={styles.hrLabel}>Avg HR Zone</span>
            <div className={styles.hrZoneIndicator}>
              <span className={styles.hrZoneTick} style={{ background: "#6EE7A0" }} />
              <span className={styles.hrZoneTick} style={{ background: "#148BD5" }} />
              <span className={styles.hrZonePill}>
                <Image src="/fitness/icons/hr-zone-frame.svg" width={16} height={16} alt="" />
                <span>ZONE 3</span>
              </span>
              <span className={styles.hrZoneTick} style={{ background: "#E09A2A" }} />
              <span className={styles.hrZoneTick} style={{ background: "#FF7043" }} />
              <Image src="/fitness/icons/hr-zone-polygon.svg" width={15} height={11} alt="" className={styles.hrZonePointer} />
            </div>
          </div>
          <div className={styles.hrStat}>
            <span className={styles.hrLabel}>Avg HR</span>
            <span className={styles.hrValue}>150 bpm</span>
          </div>
        </div>
      </div>
      <div className={styles.hrProfile}>
        <div className={styles.hrRating}>
          <span>Workout Rating</span>
          <span className={styles.hrRatingValue}><i />Easy (2/5)</span>
        </div>
        <div className={styles.hrProfileRows}>
          {PROFILE_ROWS.map((row) => (
            <div key={row.label} className={styles.hrProfileRow}>
              <span className={styles.hrMuted}>{row.label}</span>
              <div className={styles.hrProfileResult}>
                <div className={styles.hrProfileTicks} aria-hidden="true">
                  {Array.from({ length: row.label === "Joint Stress" ? 5 : 3 }, (_, index) => (
                    <span key={index} style={{ background: index < row.filled ? row.color : row.label === "Joint Stress" ? "#232324" : "#333333" }} />
                  ))}
                </div>
                <span>{row.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FitnessProgressCard() {
  const [active, setActive] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const timer = window.setInterval(() => {
      const bounds = container.getBoundingClientRect();
      const hovering = window.matchMedia("(hover: hover)").matches && container.matches(":hover");
      // Let people read or interact without the selected panel changing underneath them.
      if (document.hidden || bounds.bottom <= 0 || bounds.top >= window.innerHeight ||
          hovering || container.contains(document.activeElement)) return;

      setActive((current) => (current + 1) % TABS.length);
    }, AUTO_ROTATE_INTERVAL);

    return () => window.clearInterval(timer);
  }, [active]);

  return (
    <div ref={containerRef} className={styles.cardContainer}>
      <div className={`${styles.card} ${(active !== 0) ? styles.referenceCard : ""} ${(active === 2 || active === 3) ? styles.intensityCard : ""}`}>
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
    </div>
  );
}
