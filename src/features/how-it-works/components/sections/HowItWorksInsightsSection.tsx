"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MoveHorizontal, TrendingUp } from "lucide-react";
import styles from "./HowItWorksInsightsSection.module.css";

const A = "/how-it-works/insights";
gsap.registerPlugin(ScrollTrigger, useGSAP);
const bars = [75, 63, 72, 63, 81, 67, 72];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const dates = ["Jun 1", "Jun 8", "Jun 15", "Jun 22", "Jun 30"];
const metrics = [
  { title: "Sleep", value: "7h 45m", warning: false },
  { title: "Activity", value: "8,200", warning: false },
  { title: "Weight", value: "192 lbs", warning: true },
];

function MetricCard({ title, value, warning }: typeof metrics[number]) {
  return (
    <div className={`${styles.card} mobile-glass-card`} data-insights-card>
      <div className={styles.cardTop}>
        <p className={styles.label}><Image src={`${A}/icon.svg`} alt="" width={14} height={19} unoptimized />{title}</p>
        <span className={`${styles.badge} ${warning ? styles.amber : styles.green}`}><i />{warning ? "Needs attention" : "On track"}</span>
      </div>
      <p className={styles.value}>{value}{warning ? <MoveHorizontal className={styles.warningTrend} /> : <TrendingUp />}</p>
      {title === "Sleep" ? (
        <div className={styles.sleepChart} role="img" aria-label="Sleep duration for Monday through Sunday">
          {bars.map((height, i) => (
            <div className={styles.barColumn} key={days[i]}>
              <div className={styles.bar} style={{ height: `calc(${height} * var(--insights-unit))` }} />
              <span>{days[i]}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.lineChart}>
          <div className={styles.plot}>
            {warning ? (
              <svg viewBox="0 0 220 80" preserveAspectRatio="none" role="img" aria-label="Weight staying near 192 pounds">
                <defs><linearGradient id="insights-weight-fill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#148bd5" stopOpacity=".65" /><stop offset=".6" stopColor="#70c8ec" stopOpacity=".8" /><stop offset="1" stopColor="#b4e3f5" stopOpacity="0" /></linearGradient></defs>
                <path d="M0 12 C15 18 15 1 30 4 S56 9 65 13 S95 14 112 15 S147 22 166 18 S198 15 220 21 V80 H0 Z" fill="url(#insights-weight-fill)" />
                <path d="M0 12 C15 18 15 1 30 4 S56 9 65 13 S95 14 112 15 S147 22 166 18 S198 15 220 21" fill="none" stroke="white" strokeWidth=".7" />
              </svg>
            ) : <Image src={`${A}/chart.svg`} alt="Activity increasing through June" fill unoptimized />}
          </div>
          <div className={styles.dates}>{dates.map(date => <span key={date}>{date}</span>)}</div>
        </div>
      )}
    </div>
  );
}

export default function HowItWorksInsightsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const root = sectionRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", (mediaContext) => {
      const headingLines = root.querySelectorAll(`.${styles.heading} > span`);
      const description = root.querySelector(`.${styles.description}`);
      const closing = root.querySelector(`.${styles.closing}`);
      const cards = root.querySelectorAll<HTMLElement>("[data-insights-card]");

      gsap.from(headingLines, {
        autoAlpha: 0, y: 30, duration: 0.8, stagger: 0.18, ease: "power3.out",
        scrollTrigger: { trigger: root.querySelector(`.${styles.intro}`), start: "top 85%", once: true },
      });
      gsap.from(description, {
        autoAlpha: 0, y: 20, duration: 0.7, delay: 0.3, ease: "power2.out",
        scrollTrigger: { trigger: description, start: "top 88%", once: true },
      });
      gsap.from(closing, {
        autoAlpha: 0, y: 24, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: closing, start: "top 92%", once: true },
      });

      cards.forEach(card => {
        gsap.set(card, { autoAlpha: 0, y: 24 });
        gsap.set(card.querySelectorAll(`.${styles.bar}`), { scaleY: 0, transformOrigin: "50% 100%" });
        gsap.set(card.querySelector(`.${styles.plot}`), { clipPath: "inset(0 100% 0 0)" });
      });

      // IntersectionObserver respects the mobile scroller's horizontal clipping.
      // Each graph begins when its own card is visible, including after a swipe.
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          observer.unobserve(card);
          mediaContext.add(() => {
            const index = Array.from(cards).indexOf(card);
            const timeline = gsap.timeline({
              delay: window.matchMedia("(min-width: 600px)").matches ? index * 0.12 : 0,
              defaults: { ease: "power3.out" },
            });
            timeline.to(card, { autoAlpha: 1, y: 0, duration: 0.65 })
              .from(card.querySelector(`.${styles.value}`), { autoAlpha: 0, y: 8, duration: 0.4 }, 0.2)
              .from(card.querySelector(`.${styles.badge}`), { autoAlpha: 0, scale: 0.9, duration: 0.4 }, 0.35);
            const sleepBars = card.querySelectorAll(`.${styles.bar}`);
            const plot = card.querySelector(`.${styles.plot}`);
            if (sleepBars.length) {
              timeline.to(sleepBars, { scaleY: 1, duration: 0.75, stagger: 0.09, ease: "power2.out" }, 0.35);
            }
            if (plot) {
              timeline.to(plot, { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power1.inOut" }, 0.35)
                .from(card.querySelectorAll(`.${styles.dates} > span`), { autoAlpha: 0, duration: 0.3, stagger: 0.1 }, 0.45);
            }
          });
        });
      }, { threshold: 0.25 });
      cards.forEach(card => observer.observe(card));
      return () => observer.disconnect();
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section data-story-chapter="insights" ref={sectionRef} className={styles.section} aria-labelledby="insights-heading">
      <div className={styles.backdrop}><Image src={`${A}/scene.png`} alt="" fill sizes="126vw" className={styles.photo} /></div>
      <div className={styles.canvas}>
        <div className={styles.intro}>
          <h2 id="insights-heading" className={styles.heading}>
            <span><em>Know</em> What&rsquo;s working.</span>
            <span><em>Change</em> What Isn&rsquo;t</span>
          </h2>
          <p className={styles.description}>Meddy turns your data into clear insights, so you can double down on what works, adjust what doesn&rsquo;t, and keep moving toward your goals with confidence.</p>
        </div>
        <div className={styles.cardScroller}>
          <div className={styles.cards}>
            {metrics.map(metric => <div key={metric.title}><MetricCard {...metric} /></div>)}
          </div>
        </div>
        <p className={styles.closing}>Adjust with <em>Confidence</em></p>
      </div>
    </section>
  );
}
