"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./HowItWorksInsightsSection.module.css";

// Figma node 14770:6019. Two glass cards, each pairing two metrics with a before | after chart split by a dotted divider.
const A = "/how-it-works/insights";
gsap.registerPlugin(ScrollTrigger, useGSAP);

type Trend = "up" | "down" | "flat";
type Metric = { label: string; value: string; from: string; trend: Trend; badge?: string };
type Card = { chart: string; left: Metric; right: Metric };

const cards: Card[] = [
  {
    chart: "m-chart-sleep.svg",
    left: { label: "Sleep", value: "7h 45m", from: "from 5h 30m", trend: "up" },
    right: { label: "Resting Heart Rate", value: "66 bpm", from: "from 72 bpm", trend: "down" },
  },
  {
    chart: "m-chart-activity.svg",
    left: { label: "Daily Activity", value: "8,200", from: "from 5,200 steps", trend: "up" },
    right: { label: "Weight", value: "192 lbs", from: "from 192 lbs", trend: "flat", badge: "Unchanged" },
  },
];

function TrendIcon({ trend, small }: { trend: Trend; small?: boolean }) {
  const size = small ? styles.iconSm : styles.icon;
  const src = trend === "flat" ? (small ? "m-move-sm.svg" : "m-move.svg") : small ? "m-trend-up-sm.svg" : "m-trend-up.svg";
  return (
    <Image
      src={`${A}/${src}`}
      alt=""
      width={small ? 12 : 20}
      height={small ? 12 : 20}
      unoptimized
      className={`${size} ${trend === "down" ? styles.flipY : ""}`}
    />
  );
}

function MetricBlock({ metric, align }: { metric: Metric; align: "left" | "right" }) {
  return (
    <div className={`${styles.metric} ${align === "right" ? styles.metricRight : ""}`} data-insights-metric>
      <div className={styles.metricHead}>
        <div className={styles.labelRow}>
          <p className={styles.label}>{metric.label}</p>
          {metric.badge ? (
            <span className={styles.badge} data-insights-badge>
              <Image src={`${A}/m-dot-amber.svg`} alt="" width={8} height={8} unoptimized />
              {metric.badge}
            </span>
          ) : null}
        </div>
        <p className={styles.value}>{metric.value}</p>
      </div>
      <p className={styles.from}>
        <TrendIcon trend={metric.trend} />
        {metric.from}
      </p>
    </div>
  );
}

function InsightCard({ card }: { card: Card }) {
  return (
    <div className={`${styles.card} mobile-glass-card`} data-insights-card>
      <div className={styles.metrics}>
        <MetricBlock metric={card.left} align="left" />
        <MetricBlock metric={card.right} align="right" />
      </div>
      <div className={styles.chartBlock}>
        <div className={styles.charts} role="img" aria-label={`${card.left.label} and ${card.right.label} compared with before`}>
          <div className={styles.chartLeft} data-insights-plot>
            <Image src={`${A}/m-chart-before.svg`} alt="" fill unoptimized />
          </div>
          <div className={styles.chartRight} data-insights-plot>
            <Image src={`${A}/${card.chart}`} alt="" fill unoptimized />
          </div>
        </div>
        <span className={styles.divider} aria-hidden data-insights-divider>
          <Image src={`${A}/m-divider.svg`} alt="" width={83} height={5} unoptimized />
        </span>
        <div className={styles.footer}>
          <p><span>{card.left.label}</span><TrendIcon trend={card.left.trend} small /></p>
          <p><span>{card.right.label}</span><TrendIcon trend={card.right.trend} small /></p>
        </div>
      </div>
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
      const cardEls = root.querySelectorAll<HTMLElement>("[data-insights-card]");

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

      cardEls.forEach((card) => {
        gsap.set(card, { autoAlpha: 0, y: 24 });
        gsap.set(card.querySelectorAll("[data-insights-plot]"), { clipPath: "inset(0 100% 0 0)" });
        gsap.set(card.querySelector("[data-insights-divider]"), { scaleY: 0, transformOrigin: "50% 0%" });
      });

      // IntersectionObserver respects the mobile scroller's horizontal clipping.
      // Each graph begins when its own card is visible, including after a swipe.
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target as HTMLElement;
          observer.unobserve(card);
          mediaContext.add(() => {
            const index = Array.from(cardEls).indexOf(card);
            const plots = card.querySelectorAll("[data-insights-plot]");
            const timeline = gsap.timeline({
              delay: window.matchMedia("(min-width: 600px)").matches ? index * 0.15 : 0,
              defaults: { ease: "power3.out" },
            });
            timeline
              .to(card, { autoAlpha: 1, y: 0, duration: 0.65 })
              .from(card.querySelectorAll(`.${styles.value}`), { autoAlpha: 0, y: 10, duration: 0.45, stagger: 0.1 }, 0.2)
              .from(card.querySelectorAll("[data-insights-badge]"), { autoAlpha: 0, scale: 0.85, duration: 0.4 }, 0.5)
              .to(plots[0], { clipPath: "inset(0 0% 0 0)", duration: 0.8, ease: "power1.inOut" }, 0.35)
              .to(card.querySelector("[data-insights-divider]"), { scaleY: 1, duration: 0.35, ease: "power2.out" }, 1.1)
              .to(plots[1], { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power1.inOut" }, 1.15)
              .from(card.querySelectorAll(`.${styles.footer} > p`), { autoAlpha: 0, y: 6, duration: 0.35, stagger: 0.1 }, 1.3);
          });
        });
      }, { threshold: 0.25 });
      cardEls.forEach((card) => observer.observe(card));
      return () => observer.disconnect();
    });
    return () => media.revert();
  }, { scope: sectionRef });

  return (
    <section data-story-chapter="insights" ref={sectionRef} className={styles.section} aria-labelledby="insights-heading">
      <div className={styles.backdrop}><Image src={`${A}/scene.png`} alt="" fill sizes="140vw" className={styles.photo} /></div>
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
            {cards.map((card) => <div key={card.left.label}><InsightCard card={card} /></div>)}
          </div>
        </div>
        <p className={styles.closing}>Adjust with <em>Confidence</em></p>
      </div>
    </section>
  );
}
