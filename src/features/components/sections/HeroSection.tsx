"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroHeader from "@/components/HeroHeader";
import EnrollmentCard from "../helper/EnrollmentCard";
import { fluid } from "@/lib/scale";

gsap.registerPlugin(useGSAP);

// ─── Slide data — swap content per slide here ───────────────────────────────
const SLIDES = [
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #2FC380 0%, #1D6B40 100%)",
    image: "/doctor.png", rightImage: "/right-doctor.png", arrow: "#17925A", width: 1200, height: 1600,
    headline: "PRIMARYCARE", tagline: "That actually knows your habit",
    body: "A physician-guided health plan built around your nutrition, workouts, sleep, and labs — that moves the needle."
  },
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #E6B27D 0%, #B48037 100%)",
    image: "/women.png", rightImage: "/right-nutrition.png", arrow: "#B48037", width: 835, height: 913,
    headline: "PRIMARYCARE", tagline: "Eat for your health—not someone else's.",
    body: "Log meals in seconds with AI, understand how food affects your health, and receive guidance that's actually personalized."
  },
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #DDD1B9 0%, #B3A07E 100%)",
    image: "/runner.png", rightImage: "/right-workout.png", arrow: "#B3A07E", width: 757, height: 836,
    headline: "PRIMARYCARE", tagline: "Exercise with purpose.",
    body: "Steps, workouts, heart rate, calories, strength, and cardio—all connected so your physician sees more than a yearly physical."
  },
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #97CEF0 0%, #547B93 100%)",
    image: "/women-with-pillow.png", rightImage: "/right-sleep.png", arrow: "#547B93", width: 942, height: 865,
    headline: "PRIMARYCARE", tagline: "Better sleep. Better health.",
    body: "Track sleep duration, quality, heart rate, and recovery automatically. Your care plan adapts as your sleep improves—or when it doesn't."
  },
];

// Monotone noise overlay — size 0.2, density 75%, #000 at 25% opacity (Figma spec)
const NOISE_BG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E\")";


// ─── Timing constants ────────────────────────────────────────────────────────
const BG_DURATION = 1.4;   // bg curtain slide duration
const CONTENT_EXIT_AT = 0.55;  // when curtain edge "touches" content (s after bg starts)
const CONTENT_ENTER_AT = CONTENT_EXIT_AT + 0.1;

// TODO: temporarily disabled while the design is being finalized.
// Set to true to restore the auto-playing carousel + entrance animations.
const ANIMATION_ENABLED = true;

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const currentIndex = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [accentSlide, setAccentSlide] = useState(0);
  const [entered, setEntered] = useState(false);

  // Per-slide refs
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hlRefs = useRef<(HTMLDivElement | null)[]>([]); // headline container
  const taglineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const bodyRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const progressFillRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Exit a slide's content ────────────────────────────────────────────────
  const exitContent = (i: number) => {
    const letters = Array.from(hlRefs.current[i]?.children ?? []);
    gsap.to(letters, { opacity: 0, y: -15, duration: 0.3, stagger: 0.02, ease: "power2.in" });
    gsap.to(taglineRefs.current[i], { x: 20, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(bodyRefs.current[i], { x: 20, opacity: 0, duration: 0.3, delay: 0.05, ease: "power2.in" });
    gsap.to(imageRefs.current[i], { yPercent: 100, opacity: 0, duration: 0.9, ease: "power2.in" });
  };

  // ── Enter a slide's content ───────────────────────────────────────────────
  const enterContent = (i: number, baseDelay = 0) => {
    const d = baseDelay;
    gsap.set(contentRefs.current[i], { opacity: 1 });
    const letters = Array.from(hlRefs.current[i]?.children ?? []);
    gsap.fromTo(imageRefs.current[i],
      { yPercent: 50, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.8, delay: d, ease: "power3.out" });
    gsap.fromTo(letters,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.05, delay: d + 0.3, ease: "power2.out" });
    gsap.fromTo(taglineRefs.current[i],
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.0, delay: d + 0.5, ease: "power2.out" });
    gsap.fromTo(bodyRefs.current[i],
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.0, delay: d + 0.65, ease: "power2.out" });
  };

  // ── Progress bar fill → triggers next transition on complete ─────────────
  const startProgress = (from: number) => {
    const fill = progressFillRefs.current[from];
    if (!fill) return;

    gsap.fromTo(fill,
      { width: "0%" },
      {
        width: "100%",
        duration: 5,
        ease: "none",
        onComplete: () => {
          const to = (from + 1) % SLIDES.length;

          gsap.set(bgRefs.current[to], { x: "100%", opacity: 1 });
          gsap.set(imageRefs.current[to], { yPercent: 100, opacity: 0 });

          gsap.to(bgRefs.current[from], { x: "-100%", duration: BG_DURATION, ease: "power2.inOut" });
          gsap.to(bgRefs.current[to], { x: "0%", duration: BG_DURATION, ease: "power2.inOut" });

          gsap.delayedCall(CONTENT_EXIT_AT, () => exitContent(from));
          gsap.delayedCall(CONTENT_ENTER_AT, () => enterContent(to));

          currentIndex.current = to;
          setActiveSlide(to);
          gsap.delayedCall(BG_DURATION, () => setAccentSlide(to));
          startProgress(to);
        },
      }
    );
  };

  useGSAP(
    () => {
      if (!ANIMATION_ENABLED) {
        // Static (inspection) mode — freeze on slide 0, no transitions.
        SLIDES.forEach((_, i) => {
          gsap.set(bgRefs.current[i], { x: i === 0 ? "0%" : "100%", opacity: 1 });
          gsap.set(imageRefs.current[i], { yPercent: i === 0 ? 0 : 100, opacity: i === 0 ? 1 : 0 });
          gsap.set(contentRefs.current[i], { opacity: i === 0 ? 1 : 0 });
        });
        progressFillRefs.current.forEach((el, i) => el && gsap.set(el, { width: i === 0 ? "100%" : "0%" }));
        return;
      }

      // Init: all slides except first off-screen
      SLIDES.forEach((_, i) => {
        if (i === 0) return;
        gsap.set(bgRefs.current[i], { x: "100%", opacity: 1 });
        gsap.set(imageRefs.current[i], { yPercent: 100, opacity: 0 });
        // Hide all non-active content elements
        const letters = Array.from(hlRefs.current[i]?.children ?? []);
        gsap.set([...letters, taglineRefs.current[i], bodyRefs.current[i]], { opacity: 0 });
      });

      // Init progress bars — all empty, first will fill via startProgress
      progressFillRefs.current.forEach(el => el && gsap.set(el, { width: "0%" }));

      // Slide 0's entrance is CSS-driven (see globals.css) so it renders at
      // first paint without waiting for hydration. GSAP only drives the carousel.

      startProgress(0);
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative w-full  overflow-hidden" style={{ height: "var(--dvh)" }}>

      {/* ── Background gradient layers (slide right → left) ── */}
      {SLIDES.map((s, i) => (
        <div key={i} ref={el => { bgRefs.current[i] = el; }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: s.bg, opacity: i > 0 ? 0 : 1 }}>
          <div className="absolute inset-0" style={{ backgroundImage: NOISE_BG, backgroundRepeat: "repeat", backgroundSize: "200px 200px" }} />
        </div>
      ))}
      <div className="h-full w-full relative">
        {/* ── Header — normal flow, sits at top ── */}
        <div className="relative z-50">
          <HeroHeader />
        </div>

        {/* Person images — bottom-anchored at 60% width, height scales with --s */}
        {SLIDES.map((s, i) => (
          <div key={i} ref={el => { imageRefs.current[i] = el; }}
            className={`absolute inset-0 pointer-events-none z-20 ${i === activeSlide ? "" : "hidden"} ${i === 0 && !entered ? "anim-rise" : ""}`}>
            <div className="relative max-w-360 mx-auto px-4 h-full">
              <Image src={s.image} alt="" width={715} height={954} priority={i === 0}
                className="absolute bottom-0 left-[70%] sm:left-[70%] md:left-[62%] lg:left-[63%]  -translate-x-1/2 h-[65dvh] md:h-[75dvh] lg:h-[86dvh] w-auto object-contain object-bottom" />
            </div>
          </div>
        ))}

        {/* ── Headline / tagline / body / CTA — normal flow, left-aligned; image sits centered behind ── */}
        {SLIDES.map((s, i) => (
          <div key={i} ref={el => { contentRefs.current[i] = el; }}
            className={`z-30  flex-1 h-full w-full ${i === activeSlide ? "" : "hidden"}`}>
            <div className="max-w-360 mx-auto h-full flex flex-col flex-1 justify-between px-5 lg:px-10">
              <div className="flex-1 gap-8 flex flex-col">
                <div ref={el => { hlRefs.current[i] = el; }}
                  className={`uppercase font-bold leading-[100%] -ml-2 tracking-normal text-[#1E1E22] flex ${i === 0 && !entered ? "anim-fade-up" : ""}`}
                  style={{ fontSize: fluid(180, 18), mixBlendMode: "difference", ...(i === 0 && !entered ? { animationDelay: "0.1s" } : {}) }}>
                  {s.headline.split("").map((char, j) => <span key={j} className="inline-block p-0 m-0">{char}</span>)}
                </div>
                <div className="flex flex-col relative z-[99999]  gap-7.5 max-w-139.5 ">
                  <p ref={el => { taglineRefs.current[i] = el; }}
                    className={`text-white uppercase font-normal text-[30px] leading-[100%] ${i === 0 && !entered ? "anim-fade-up" : ""}`}
                    style={i === 0 && !entered ? { animationDelay: "0.35s" } : undefined}
                  >{s.tagline}</p>
                  <p ref={el => { bodyRefs.current[i] = el; }}
                    className={`text-white font-normal leading-[100%]  text-xl ${i === 0 && !entered ? "anim-fade-up" : ""}`}
                    style={i === 0 && !entered ? { animationDelay: "0.45s" } : undefined}
                  >{s.body}</p>
                </div>
              </div>
              <div className={`h-64.25 mb-44 ${i === 0 && !entered ? "anim-fade-up" : ""}`}
                style={i === 0 && !entered ? { animationDelay: "0.55s" } : undefined}
                onAnimationEnd={i === 0 ? () => setEntered(true) : undefined}>
                <EnrollmentCard accentColor={SLIDES[accentSlide].arrow} />
              </div>
            </div>
          </div>
        ))}

        {/* ── Progress bar indicators — bottom ── */}
        <div className="absolute bottom-5 left-0 right-0 z-40">
          <div className="max-w-360 mx-auto px-5 lg:px-10  flex gap-2">
            {SLIDES.map((_, i) => (
              <div key={i} className="flex-1 h-2.25 bg-white/30 rounded-full overflow-hidden">
                <div
                  ref={el => { progressFillRefs.current[i] = el; }}
                  className="h-full bg-white rounded-full"
                  style={{ width: i < activeSlide ? "100%" : "0%" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
