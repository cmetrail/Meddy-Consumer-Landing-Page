"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import Header from "@/components/Header";
import EnrollmentCard from "../helper/EnrollmentCard";
import Link from "next/link";
import styles from "./HeroSection.module.css";

gsap.registerPlugin(useGSAP);

// ─── Slide data — swap content per slide here ───────────────────────────────
const SLIDES = [
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #2FC380 0%, #1D6B40 100%)",
    image: "/doctor.png",
    rightImage: "/right-doctor.png",
    arrow: "#17925A",
    width: 1200,
    height: 1600,
    headline: "PRIMARYCARE",
    tagline: "That actually knows your habits",
    body: "A physician-guided health plan built around your nutrition, workouts, sleep, and labs — that moves the needle.",
  },
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #E6B27D 0%, #B48037 100%)",
    image: "/women.png",
    rightImage: "/right-nutrition.png",
    arrow: "#B48037",
    width: 835,
    height: 913,
    headline: "PRIMARYCARE",
    tagline: "Eat for your health—not someone else's.",
    body: "Log meals in seconds with AI, understand how food affects your health, and receive guidance that's actually personalized.",
  },
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #DDD1B9 0%, #B3A07E 100%)",
    image: "/runner.png",
    rightImage: "/right-workout.png",
    arrow: "#B3A07E",
    width: 757,
    height: 836,
    headline: "PRIMARYCARE",
    tagline: "Exercise with purpose.",
    body: "Steps, workouts, heart rate, calories, strength, and cardio—all connected so your physician sees more than a yearly physical.",
  },
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #B8DCED 0%, #8BA9B8 100%)",
    image: "/women-with-pillow.png",
    rightImage: "/right-sleep.png",
    arrow: "#547B93",
    width: 942,
    height: 865,
    headline: "PRIMARYCARE",
    tagline: "Better sleep. Better health.",
    body: "Track sleep duration, quality, heart rate, and recovery automatically. Your care plan adapts as your sleep improves—or when it doesn't.",
  },
];

// Monotone noise overlay — size 0.2, density 75%, #000 at 25% opacity (Figma spec)
const NOISE_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E\")";

// ─── Timing constants ────────────────────────────────────────────────────────
const BG_DURATION = 1.4;   // bg curtain slide duration
const CONTENT_EXIT_AT = 0.55;  // when curtain edge "touches" content (s after bg starts)
const CONTENT_ENTER_AT = CONTENT_EXIT_AT + 0.1;

// Use the same curtain, text, and image sequence at every viewport size.
const ANIMATION_ENABLED = true;

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headerWrapRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);

  // Per-slide refs
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hlRefs = useRef<(HTMLDivElement | null)[]>([]); // headline container
  const taglineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const bodyRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const progressFillRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Exit a slide's content ────────────────────────────────────────────────
  const exitContent = (i: number) => {
    const letters = Array.from(hlRefs.current[i]?.querySelectorAll("[data-hero-letter]") ?? []);
    gsap.to(hlRefs.current[i]?.children ?? [], { opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(contentRefs.current[i], { autoAlpha: 0, duration: 0.1, delay: 0.5 });
    gsap.to(letters, { opacity: 0, y: -15, duration: 0.3, stagger: 0.02, ease: "power2.in" });
    gsap.to(taglineRefs.current[i], { x: 20, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to([bodyRefs.current[i], ctaRefs.current[i]], { x: 20, opacity: 0, duration: 0.3, delay: 0.05, ease: "power2.in" });
    gsap.to(cardRefs.current[i], { y: -20, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(imageRefs.current[i], { yPercent: 100, opacity: 0, duration: 0.9, ease: "power2.in" });
  };

  // ── Enter a slide's content ───────────────────────────────────────────────
  const enterContent = (i: number, baseDelay = 0) => {
    const d = baseDelay;
    gsap.set(contentRefs.current[i], { autoAlpha: 1 });
    gsap.fromTo(hlRefs.current[i]?.children ?? [], { opacity: 0 }, { opacity: 1, duration: 0.8, delay: d + 0.3, ease: "power2.out" });
    const letters = Array.from(hlRefs.current[i]?.querySelectorAll("[data-hero-letter]") ?? []);
    gsap.fromTo(imageRefs.current[i],
      { yPercent: 50, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.8, delay: d, ease: "power3.out" });
    gsap.fromTo(letters,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, delay: d + 0.3, ease: "power2.out" });
    gsap.fromTo(taglineRefs.current[i],
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.0, delay: d + 0.5, ease: "power2.out" });
    gsap.fromTo([bodyRefs.current[i], ctaRefs.current[i]],
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.0, delay: d + 0.65, ease: "power2.out" });
    gsap.fromTo(cardRefs.current[i],
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: d + 0.7, ease: "power3.out" });
  };

  // ── Progress bar fill → triggers next transition on complete ─────────────
  const startProgress = (from: number, context: gsap.Context) => {
    const fill = progressFillRefs.current[from];
    if (!fill) return;
    // Load the next image during the reading interval, before its entrance.
    const nextImage = imageRefs.current[(from + 1) % SLIDES.length]?.querySelector("img");
    if (nextImage) nextImage.loading = "eager";

    gsap.fromTo(fill,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 5,
        ease: "none",
        onComplete: context.add("advanceSlide", () => {
          const to = (from + 1) % SLIDES.length;

          gsap.set(bgRefs.current[to], { x: "100%", opacity: 1 });
          gsap.set(imageRefs.current[to], { yPercent: 100, opacity: 0 });

          gsap.to(bgRefs.current[from], { x: "-100%", duration: BG_DURATION, ease: "power2.inOut" });
          gsap.to(bgRefs.current[to], { x: "0%", duration: BG_DURATION, ease: "power2.inOut" });

          gsap.delayedCall(CONTENT_EXIT_AT, context.add("exitSlide", () => exitContent(from)));
          gsap.delayedCall(CONTENT_ENTER_AT, context.add("enterSlide", () => enterContent(to)));

          currentIndex.current = to;
          startProgress(to, context);
        }) as gsap.Callback,
      }
    );
  };

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add({ reduced: "(prefers-reduced-motion: reduce)", all: "all" }, (context) => {
        currentIndex.current = 0;
        if (!ANIMATION_ENABLED || context.conditions?.reduced) {
          gsap.set(headerWrapRef.current, { opacity: 1, y: 0 });
          gsap.set([...(hlRefs.current[0]?.querySelectorAll("[data-hero-letter]") ?? []), taglineRefs.current[0], bodyRefs.current[0], ctaRefs.current[0], cardRefs.current[0]], { opacity: 1, x: 0, y: 0 });
          gsap.set(hlRefs.current[0]?.children ?? [], { opacity: 1 });
          // Honor reduced motion with a readable, static first slide.
          SLIDES.forEach((_, i) => {
            gsap.set(bgRefs.current[i], { x: i === 0 ? "0%" : "100%", opacity: 1 });
            gsap.set(imageRefs.current[i], { yPercent: i === 0 ? 0 : 100, opacity: i === 0 ? 1 : 0 });
            gsap.set(contentRefs.current[i], { autoAlpha: i === 0 ? 1 : 0 });
          });
          progressFillRefs.current.forEach((el, i) => el && gsap.set(el, { scaleX: i === 0 ? 1 : 0 }));
          return;
        }

        // Init: all slides except first off-screen
        SLIDES.forEach((_, i) => {
          if (i === 0) return;
          gsap.set(bgRefs.current[i], { x: "100%", opacity: 1 });
          gsap.set(imageRefs.current[i], { yPercent: 100, opacity: 0 });
          // Hide all non-active content elements
          const letters = Array.from(hlRefs.current[i]?.querySelectorAll("[data-hero-letter]") ?? []);
          gsap.set(contentRefs.current[i], { autoAlpha: 0 });
          gsap.set([...(hlRefs.current[i]?.children ?? []), ...letters, taglineRefs.current[i], bodyRefs.current[i], ctaRefs.current[i], cardRefs.current[i]], { opacity: 0 });
        });

        // Init progress bars — all empty, first will fill via startProgress
        progressFillRefs.current.forEach(el => el && gsap.set(el, { scaleX: 0 }));

        // Use the same first-slide entrance on desktop and mobile.
        const letters = Array.from(hlRefs.current[0]?.querySelectorAll("[data-hero-letter]") ?? []);
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro
          .fromTo(headerWrapRef.current, { y: -24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
          .fromTo(imageRefs.current[0], { yPercent: 50, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.5 }, 0.1)
          .fromTo(hlRefs.current[0]?.children ?? [], { opacity: 0 }, { opacity: 1, duration: 0.8, ease: "power2.out" }, 0.3)
          .fromTo(letters, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, ease: "power2.out" }, 0.3)
          .fromTo(taglineRefs.current[0], { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.0, ease: "power2.out" }, 0.5)
          .fromTo([bodyRefs.current[0], ctaRefs.current[0]], { x: -50, opacity: 0 }, { x: 0, opacity: 1, duration: 1.0, ease: "power2.out" }, 0.6)
          .fromTo(cardRefs.current[0], { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.7);

        startProgress(0, context);

        // Pause the entire sequence, including delayed callbacks and the intro,
        // without changing the relative timing of its individual animations.
        let inView = false;
        const syncPlayback = () => {
          const roots = new Set<gsap.core.Animation>();
          context.getTweens().forEach((tween: gsap.core.Tween) => {
            let animation: gsap.core.Animation = tween;
            while (animation.parent && animation.parent !== gsap.globalTimeline) {
              animation = animation.parent;
            }
            if (animation.parent === gsap.globalTimeline) roots.add(animation);
          });
          roots.forEach((animation) => animation.paused(!inView || document.hidden));
        };
        syncPlayback();
        const observer = new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
          syncPlayback();
        }, { threshold: [0, 0.25] });
        observer.observe(containerRef.current!);
        document.addEventListener("visibilitychange", syncPlayback);
        return () => {
          observer.disconnect();
          document.removeEventListener("visibilitychange", syncPlayback);
        };
      });
      return () => media.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className={`relative w-full overflow-hidden ${styles.hero}`}
      style={{ height: "var(--dvh)" }}
    >
      {/* ── Background gradient layers (slide right → left) ── */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          ref={(el) => {
            bgRefs.current[i] = el;
          }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: s.bg, opacity: i > 0 ? 0 : 1 }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: NOISE_BG,
              backgroundRepeat: "repeat",
              backgroundSize: "200px 200px",
            }}
          />
        </div>
      ))}
      <div className="h-full w-full relative">
        {/* ── Header — normal flow, sits at top ── */}
        <div
          ref={headerWrapRef}
          className="relative z-50"
        >
          <Header variant="dark" active="How it works" />
        </div>

        {/* Person images — bottom-anchored at 60% width, height scales with --s */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className="absolute inset-0 pointer-events-none z-20"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className={styles.personFrame}>
              <Image
                src={s.image}
                alt=""
                width={s.width}
                height={s.height}
                sizes="(max-width: 1023px) 90vw, 55vw"
                priority={i === 0}
                className={`${styles.person} ${i === 1 ? styles.nutritionPerson : i === 2 ? styles.fitnessPerson : i === 3 ? styles.sleepPerson : ""}`}
              />
            </div>
          </div>
        ))}

        {/* ── Headline / tagline / body / CTA — normal flow, left-aligned; image sits centered behind ── */}
        {SLIDES.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              contentRefs.current[i] = el;
            }}
            className={`${styles.content} ${i === 1 ? styles.nutrition : i === 2 ? styles.fitness : i === 3 ? styles.sleep : ""}`}
            style={{ opacity: i === 0 ? 1 : 0, visibility: i === 0 ? "visible" : "hidden" }}
          >
            <div
              ref={(el) => { hlRefs.current[i] = el; }}
              className={styles.headline}
              role="heading"
              aria-level={1}
              aria-label="Primary care"
            >
              <span className={styles.primaryWord} aria-hidden="true">
                {s.headline.slice(0, 7).split("").map((char, j) => (
                  <span key={j} data-hero-letter>{char}</span>
                ))}
              </span>
              <span className={styles.careWord} aria-hidden="true">
                {s.headline.slice(7).split("").map((char, j) => (
                  <span key={j} data-hero-letter>{j === 0 ? "\u00a0" : ""}{char}</span>
                ))}
              </span>
            </div>
            <div className={styles.copy}>
              <p ref={(el) => { taglineRefs.current[i] = el; }} className={styles.tagline}>
                {i === 0 ? <>That actually knows your <em>habits</em></> : i === 1 ? <><em>Eat for your health,</em> not someone else&apos;s</> : i === 2 ? <>Exercise with <em>purpose.</em></> : i === 3 ? <>Better sleep. <em>Better health.</em></> : s.tagline}
              </p>
              <p ref={(el) => { bodyRefs.current[i] = el; }} className={styles.body}>{s.body}</p>
              <Link ref={(el) => { ctaRefs.current[i] = el; }} href="/#how-it-works" className={styles.consultation}>Book Free Consultation</Link>
              <div ref={(el) => { cardRefs.current[i] = el; }} className={styles.card}>
                <EnrollmentCard />
              </div>
            </div>
          </div>
        ))}

        {/* ── Scroll cue — glide into the next section ── */}
        {/* <button
          type="button"
          aria-label="Scroll to next section"
          onClick={() => scrollTo("#problem")}
          className="absolute left-1/2 -translate-x-1/2 bottom-10 z-40 flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
          <svg className="animate-bounce" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 7l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button> */}

        {/* ── Progress bar indicators — bottom ── */}
        <div className={styles.progress}>
          <div className="flex w-full gap-1">
            {SLIDES.map((_, i) => (
              <div
                key={i}
                className={styles.progressTrack}
              >
                <div
                  ref={(el) => {
                    progressFillRefs.current[i] = el;
                  }}
                  className="h-full w-full bg-white rounded-full origin-left"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
