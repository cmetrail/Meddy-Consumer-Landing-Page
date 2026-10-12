"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { desktopMotion } from "@/lib/motion";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";
import { ArrowRight, ChevronUp, Flame, Footprints } from "lucide-react";
import styles from "./MostCareSection.module.css";
import ChartZoom from "./helper/ChartZoom";

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
      <div className={styles.mealDescription}><p><span className={styles.mealFullName}>{meal.name}</span><span className={styles.mealShortName}>{meal.name === "Banana Milkshake" ? "Milkshake" : meal.name}</span></p><div className={styles.macros}>
        {meal.macros.map((macro, i) => <span key={i}><Image src={['/home/carbs.svg', '/home/meat.svg', '/home/water.svg'][i]} width={6} height={6} alt="" />{macro}</span>)}
      </div></div>
      <div className={styles.mealCalories}><p>{meal.calories}</p><span>kcal</span></div>
    </div>)}
  </div>;
}

function LoadPanel() {
  return <ChartZoom className={styles.loadPanel} title="Workout load chart">
    <div className={styles.loadHeader}><span>Cumulative</span><div><span>%</span><strong>Load</strong></div></div>
    <div className={styles.loadBar}>{muscles.map(m => <span key={m.name} style={{ background: m.color, flex: m.size }} />)}</div>
    <div data-chart-legend className={styles.loadLegend}>{muscles.map(m => <div key={m.name}><i style={{ background: m.legendColor ?? m.color }} /><span>{m.name}</span><b>{m.load} lbs</b></div>)}</div>
  </ChartZoom>;
}

function NutrientsPanel() {
  return <ChartZoom className={styles.nutrientsPanel} title="Nutrient chart"><p>Nutrients</p><div data-nutrient-bars className={styles.nutrientBars}>
    {[{ name: "Protein", short: "P", value: 40, color: "#e09a2a" }, { name: "Fats", short: "F", value: 30, color: "#8a8a82" }, { name: "Carbs", short: "C", value: 30, color: "#17925a" }].map(item => <div key={item.name} style={{ flex: item.value, color: item.color }}>
      <span style={{ background: item.color }}>{item.short} {item.value}%</span><div className={styles.nutrientTicks} /><p>{item.name}</p>
    </div>)}
  </div></ChartZoom>;
}

function A1cPanel() {
  return <ChartZoom className={styles.a1cPanel} title="A1c trend chart"><p>Longitudinal A1c View</p>
    <svg viewBox="0 0 130 100" role="img" aria-label="A1c trend decreases over the year, averaging 6.8 percent">
      {Array.from({ length: 9 }, (_, i) => <g key={i}>{i % 4 === 0 && <text x="0" y={9 + i * 10.4} fill="#39463e" fontSize="7">{16 - i * 2}%</text>}<line x1="15" x2="123" y1={8 + i * 10.4} y2={8 + i * 10.4} stroke="#aaa" strokeWidth=".5" /></g>)}
      <line x1="15" x2="123" y1="57" y2="57" stroke="#e09a2a" strokeWidth=".6" strokeDasharray="2 2" />
      <path d="M16 48 L28 50 L38 52 L48 56 L58 58 L68 59 L78 61 L88 61 L99 62 L111 64 L123 64" fill="none" stroke="#e09a2a" strokeWidth="1" />
      <rect x="16" y="43" width="54" height="14" rx="1" fill="#e09a2a" /><text x="19" y="53.5" fontSize="6" fontWeight="700">Avg 6.8%</text>
      <rect x="77" y="31" width="48" height="25" rx="2" fill="#252525" /><text x="81" y="40" fontSize="6" fill="#ddd">Sep</text><circle cx="82" cy="49" r="1.5" fill="#e09a2a" /><text x="86" y="51" fontSize="6" fill="white">6.5%</text>
      {['Jan','Apr','Jul','Oct'].map((month,i) => <text key={month} x={15+i*28} y="99" fontSize="7" fill="#39463e">{month}</text>)}
    </svg>
  </ChartZoom>;
}

function SleepScorePanel() {
  return <ChartZoom className={styles.sleepScorePanel} title="Weekly sleep chart">
    <span>Score</span><strong>93%</strong><b>Very Stable</b>
    <svg viewBox="0 0 154 86" role="img" aria-label="Sleep duration throughout the week">
      {[12, 28, 44, 60].map(y => <line key={y} x1="24" x2="151" y1={y} y2={y} stroke="#dededb" strokeWidth=".6" />)}
      {['10h', '6h', '4h'].map((t, i) => <text key={t} x="0" y={[14,46,62][i]} fontSize="10" fill="#39463e">{t}</text>)}
      {[36, 48, 0, 38, 37, 46, 57].map((height, i) => <rect key={i} x={29 + i * 17} y={65 - height} width="10" height={height} fill="#b7c3b2" />)}
      {['M','T','W','T','F','S','S'].map((day, i) => <text key={i} x={34 + i * 17} y="83" textAnchor="middle" fontSize="12" fill="#39463e">{day}</text>)}
    </svg>
  </ChartZoom>;
}

function SleepPanel() {
  return <div className={styles.sleepPanel}><p>Sleep Architecture</p><span className={styles.sleepLabel}>Time asleep</span><strong>5h 50m</strong>
    <svg viewBox="0 0 296 120" role="img" aria-label="Sleep stages from 11 PM to 6 AM">
      {[22, 51, 80, 109].map(y => <line key={y} x1="37" x2="294" y1={y} y2={y} stroke="#f3f3f1" strokeWidth="1" />)}
      <path d="M45 44H69V73H94V102H106V22H110V44H141V73H161V102H175V44H210V102H227V15H230V44H256V73H268V102H286V44H294" fill="none" stroke="#ff9c76" strokeWidth=".7" />
      {[[45,24],[110,31],[175,35],[230,26],[286,8]].map(([x,w]) => <rect key={x} x={x} y="43" width={w} height="9" fill="#148bd5" />)}
      {[[69,25],[141,20],[256,12]].map(([x,w]) => <rect key={x} x={x} y="72" width={w} height="9" fill="#c084fc" />)}
      {[[94,12],[161,14],[210,17],[268,18]].map(([x,w]) => <rect key={x} x={x} y="101" width={w} height="9" fill="#ff7043" />)}
      <rect x="106" y="22" width="5" height="9" fill="#e09a2a" />
      <rect x="227" y="15" width="3" height="9" rx="1.5" fill="#e09a2a" />
    </svg>
    <div className={styles.sleepAxis}>{['11PM','12AM','1AM','2AM','3AM','4AM','5AM','6AM'].map(time => <span key={time}>{time}</span>)}</div>
    <div className={styles.sleepRange}><span>Bedtime 10:45 PM</span><span>Wake 4:35 AM</span></div>
    <div className={styles.sleepLegend}>{[
      ['Awake', '13m', '27%', '#e09a2a'], ['Light', '3h 15m', '49%', '#148bd5'], ['Deep', '1h 15m', '10%', '#c084fc'], ['REM', '1h 07m', '5%', '#ff7043'],
    ].map(([name, time, percent, color]) => <div key={name}><i style={{ background: color }} /><span>{name}</span><span>{time}</span><span>{percent}</span></div>)}</div>
  </div>;
}

export default function MostCareSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = section?.querySelector<HTMLElement>(`.${styles.canvas}`);
    const header = document.querySelector("#hero header");
    if (!canvas || !header) return;
    const alignImages = () => {
      const logo = header.querySelector("img")?.getBoundingClientRect();
      const button = header.querySelector("button")?.getBoundingClientRect();
      if (!logo || !button) return;
      const bounds = canvas.getBoundingClientRect();
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const referenceWidth = isMobile ? 400 : 1440;
      const scale = bounds.width / referenceWidth;
      canvas.style.setProperty("--collage-scale", `${scale}`);
      canvas.style.setProperty("--sleep-render-scale", `${scale * (isMobile ? .588 : 1.2)}`);
      canvas.style.setProperty("--collage-left", `${(logo.left - bounds.left) / scale}px`);
      canvas.style.setProperty("--collage-right", `${(button.right - bounds.left) / scale}px`);
    };
    alignImages();
    const observer = new ResizeObserver(alignImages);
    observer.observe(canvas);
    observer.observe(header);
    window.addEventListener("resize", alignImages);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", alignImages);
    };
  }, []);

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
      <AnimatedCard className={styles.sleep}><div className={styles.sleepArtwork}><Photo src="/home/most-care-sleep.png" alt="Woman sleeping peacefully" className={styles.sleepPhoto} /><SleepPanel /><SleepScorePanel /></div></AnimatedCard>
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
