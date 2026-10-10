"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { desktopMotion } from "@/lib/motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";
import { ArrowRight, ChevronUp, Flame, Footprints } from "lucide-react";
import styles from "./MostCareSection.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SCATTER = [
  { x: -80, y: -60, r: -8 },
  { x: 0, y: -90, r: 6 },
  { x: 80, y: -50, r: 10 },
  { x: -70, y: 70, r: -10 },
  { x: -30, y: 90, r: 6 },
  { x: 70, y: 70, r: -6 },
];

const muscles = [
  { name: "Chest", load: 180, color: "#e09a2a", size: 13 },
  { name: "Biceps", load: 100, color: "#6ee7a0", size: 6 },
  { name: "Triceps", load: 120, color: "#ea2989", legendColor: "#c084fc", size: 7 },
  { name: "Back", load: 150, color: "#148bd5", size: 21 },
  { name: "Core", load: 150, color: "#c084fc", legendColor: "#8be8d1", size: 20 },
  { name: "Calves", load: 160, color: "#824aaa", legendColor: "#ea2989", size: 10 },
  { name: "Forearms", load: 120, color: "#39b957", size: 8 },
  { name: "Legs", load: 250, color: "#8bd9b1", legendColor: "#c084fc", size: 6 },
  { name: "Arms", load: 120, color: "#6ee7a0", size: 5 },
  { name: "Shoulders", load: 100, color: "#ff7043", size: 5 },
];

function Photo({ src, alt, className }: { src: string; alt: string; className: string }) {
  return <div className={className}><Image src={src} alt={alt} fill sizes="(max-width: 600px) 240px, 280px" className={styles.photo} /></div>;
}

function AnimatedCard({ className, children }: { className: string; children: ReactNode }) {
  return <div className={className}><div data-scatter className={styles.cardMotion}>{children}</div></div>;
}

function MealPanel() {
  const meals = [
    { name: "Banana Milkshake", calories: 399, image: "/home/meal2.png", macros: ["9g", "39g", "3g"] },
    { name: "Side Salad", calories: 454, image: "/home/meal1.png", macros: ["40g", "18g", "20g"] },
  ];
  return <div className={styles.mealPanel}>
    <div className={styles.mealHeader}>
      <div><p>Breakfast</p><span>853 kcal</span></div>
      <div className={styles.mealAvatars}>
        {meals.map(meal => <Image key={meal.name} src={meal.image} width={18} height={18} alt="" />)}
        <div className={styles.chevron}><ChevronUp size={12} /></div>
      </div>
    </div>
    {meals.map(meal => <div key={meal.name} className={styles.mealRow}>
      <Image src={meal.image} alt="" width={27} height={27} className={styles.mealThumbnail} />
      <div className={styles.mealDescription}><p>{meal.name}</p><div className={styles.macros}>
        {meal.macros.map((macro, i) => <span key={i}><Image src={['/home/carbs.svg', '/home/meat.svg', '/home/water.svg'][i]} width={6} height={6} alt="" />{macro}</span>)}
      </div></div>
      <div className={styles.mealCalories}><p>{meal.calories}</p><span>kcal</span></div>
    </div>)}
  </div>;
}

function LoadPanel() {
  return <div className={styles.loadPanel}>
    <div className={styles.loadHeader}><span>Cumulative</span><div><span>%</span><strong>Load</strong></div></div>
    <div className={styles.loadBar}>{muscles.map(m => <span key={m.name} style={{ background: m.color, flex: m.size }} />)}</div>
    <div className={styles.loadLegend}>{muscles.map(m => <div key={m.name}><i style={{ background: m.legendColor ?? m.color }} /><span>{m.name}</span><b>{m.load} lbs</b></div>)}</div>
  </div>;
}

function NutrientsPanel() {
  return <div className={styles.nutrientsPanel}><p>Nutrients</p><div className={styles.nutrientBars}>
    {[{ name: "Protein", short: "P", value: 40, color: "#e09a2a" }, { name: "Fats", short: "F", value: 30, color: "#8a8a82" }, { name: "Carbs", short: "C", value: 30, color: "#17925a" }].map(item => <div key={item.name} style={{ flex: item.value, color: item.color }}>
      <span style={{ background: item.color }}>{item.short} {item.value}%</span><div className={styles.nutrientTicks} /><p>{item.name}</p>
    </div>)}
  </div></div>;
}

function A1cPanel() {
  return <div className={styles.a1cPanel}><p>Longitudinal A1c View</p>
    <svg viewBox="0 0 130 100" role="img" aria-label="A1c trend decreases over the year, averaging 6.8 percent">
      {Array.from({ length: 9 }, (_, i) => <g key={i}><text x="0" y={9 + i * 10.4} fill="#969690" fontSize="3.8">{16 - i * 2}%</text><line x1="15" x2="123" y1={8 + i * 10.4} y2={8 + i * 10.4} stroke="#aaa" strokeWidth=".5" /></g>)}
      <line x1="15" x2="123" y1="57" y2="57" stroke="#e09a2a" strokeWidth=".6" strokeDasharray="2 2" />
      <path d="M16 48 L28 50 L38 52 L48 56 L58 58 L68 59 L78 61 L88 61 L99 62 L111 64 L123 64" fill="none" stroke="#e09a2a" strokeWidth="1" />
      <rect x="16" y="48" width="29" height="8" rx="1" fill="#e09a2a" /><text x="19" y="53.5" fontSize="4.5" fontWeight="700">Avg 6.8%</text>
      <rect x="81" y="39" width="36" height="17" rx="2" fill="#252525" /><text x="84" y="44" fontSize="3.4" fill="#aaa">Sep</text><circle cx="85" cy="50" r="1.5" fill="#e09a2a" /><text x="89" y="51.5" fontSize="3.6" fill="white">A1c: 6.5%</text>
      {['J','F','M','A','M','J','J','A','S','O','N','D'].map((month,i) => <g key={i}><line x1={18+i*9.3} x2={18+i*9.3} y1="91" y2="94" stroke="#aaa" strokeWidth=".5" /><text x={17+i*9.3} y="99" fontSize="3.5" fill="#777">{month}</text></g>)}
    </svg>
  </div>;
}

function SleepPanel() {
  return <div className={styles.sleepPanel}><p>Sleep Architecture</p><span className={styles.sleepLabel}>Time asleep</span><strong>5h 50m</strong>
    <svg viewBox="0 0 108 68" role="img" aria-label="Sleep stages throughout the night">
      <path d="M14 25H22V36H31V47H36V24H48V36H55V47H60V25H73V47H79V14H80V25H89V36H93V47H101V25H104" fill="none" stroke="#c1c1ba" strokeWidth=".5" />
      {[[14,25,8],[36,25,12],[60,25,13],[80,25,9],[101,25,3]].map(([x,y,w],i) => <rect key={i} x={x} y={y} width={w} height="3" fill="#148bd5" />)}
      {[[22,36,9],[48,36,7],[89,36,4]].map(([x,y,w],i) => <rect key={i} x={x} y={y} width={w} height="3" fill="#c084fc" />)}
      {[[31,47,5],[55,47,5],[73,47,6],[93,47,8]].map(([x,y,w],i) => <rect key={i} x={x} y={y} width={w} height="3" fill="#ff7043" />)}
      <rect x="79" y="14" width="1" height="35" fill="#e09a2a" />
      {['12AM','1AM','2AM','3AM','4AM','5AM','6AM'].map((t,i) => <text key={t} x={12+i*14} y="63" fontSize="2.8" fill="#888">{t}</text>)}
    </svg>
    <div className={styles.sleepRange}><span>Bedtime 12:45 AM</span><span>Wake 6:35 AM</span></div>
    <div className={styles.sleepLegend}>{[
      ['Awake', '25m', '7%', '#e09a2a'], ['Light', '3h 10m', '49%', '#148bd5'], ['Deep', '1h 10m', '18%', '#c084fc'], ['REM', '1h 5m', '17%', '#ff7043'],
    ].map(([name, time, percent, color]) => <div key={name}><i style={{ background: color }} /><span>{name}</span><span>{time}</span><span>{percent}</span></div>)}</div>
  </div>;
}

function SleepScorePanel() {
  return <div className={styles.sleepScorePanel}>
    <span>Score</span><strong>93%</strong><b>Very Stable</b>
    <svg viewBox="0 0 154 86" role="img" aria-label="Sleep duration throughout the week">
      {[12, 28, 44, 60].map(y => <line key={y} x1="15" x2="151" y1={y} y2={y} stroke="#dededb" strokeWidth=".6" />)}
      {['10:00', '08:00', '06:00', '04:00'].map((t, i) => <text key={t} x="0" y={14 + i * 16} fontSize="4" fill="#999">{t}</text>)}
      {[36, 48, 0, 38, 37, 46, 57].map((height, i) => <rect key={i} x={23 + i * 18} y={65 - height} width="9" height={height} fill="#d8d8d5" />)}
      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => <text key={day} x={23 + i * 18} y="76" fontSize="4" fill="#888">{day}</text>)}
      <text x="138" y="12" fontSize="4" fill="#888">9:07</text>
    </svg>
  </div>;
}

export default function MostCareSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => desktopMotion(() => {
      const root = sectionRef.current;
      if (!root) return;

      gsap.utils.toArray<HTMLElement>("[data-scatter]", root).forEach((el, i) => {
        const s = SCATTER[i % SCATTER.length];
        gsap.fromTo(el, { x: s.x, y: s.y, rotate: s.r, opacity: 0 }, {
          x: 0, y: 0, rotate: 0, opacity: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top 88%", end: "top 60%", scrub: true },
        });
      });

      const statement = root.querySelector("[data-statement]");
      if (statement) {
        const lines = statement.querySelectorAll<HTMLElement>("[data-line]");
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: statement, start: "top 92%", end: "top 55%", scrub: true },
        });
        lines.forEach((el, i) => {
          timeline.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none" }, i * 0.15);
        });
      }
    }),
    { scope: sectionRef },
  );

  return <section ref={sectionRef} id="why-meddy" className={styles.section} aria-labelledby="most-care-heading">
    <div className={styles.canvas}><div className={styles.stage}>
      <AnimatedCard className={styles.meal}><Photo src="/home/most-care-meal.png" alt="Healthy meal, smoothie, and a meal planning notebook" className={styles.mealPhoto} /><MealPanel /></AnimatedCard>
      <AnimatedCard className={styles.workout}><Photo src="/home/most-care-workout.png" alt="Athlete resting after a workout" className={styles.workoutPhoto} /><LoadPanel /></AnimatedCard>
      <AnimatedCard className={styles.calories}><div className={styles.calorieHeader}><div><p>Calories today</p><div className={styles.calorieTotal}>1,240 <span>kcal</span></div></div><div className={styles.flame}><Flame size={15} /></div></div><div className={styles.calorieStats}>
        {[{ Icon: Footprints, label: 'Steps', value: '6,842' }, { Icon: Flame, label: 'Burned', value: '320' }, { Icon: ArrowRight, label: 'Net', value: '920' }].map(({Icon,label,value}) => <div key={label}><p><Icon size={11} />{label}</p><span>{value}</span></div>)}
      </div></AnimatedCard>
      <div data-statement className={styles.statement}><p data-line className={styles.eyebrow}>Always On Care</p><h2 data-line id="most-care-heading">Most care happens in 15-minute visits.</h2><p data-line className={styles.everyday}>Meddy happens everyday</p></div>
      <AnimatedCard className={styles.nutrients}><NutrientsPanel /></AnimatedCard>
      <AnimatedCard className={styles.a1c}><Photo src="/home/most-care-a1c.png" alt="Woman stretching outdoors in the sunshine" className={styles.a1cPhoto} /><A1cPanel /></AnimatedCard>
      <AnimatedCard className={styles.sleep}><Photo src="/home/most-care-sleep.png" alt="Woman sleeping peacefully" className={styles.sleepPhoto} /><SleepPanel /><SleepScorePanel /></AnimatedCard>
      <div className={styles.connection}>
        <p>
          Meddy connects daily <em>habits, biology, and medical care</em>
          <br className={styles.connectionBreak} />{" "}
          so your health plan evolves with your body.
        </p>
      </div>
    </div></div>
  </section>;
}
