"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroHeader from "@/components/helper/HeroHeader";
import EnrollmentCard from "@/components/helper/EnrollmentCard";

gsap.registerPlugin(useGSAP);

// ─── Slide data — swap content per slide here ───────────────────────────────
const SLIDES = [
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #2FC380 0%, #1D6B40 100%)",
    image: "/doctor.png", rightImage: "/right-doctor.png", arrow: "#17925A",
    headline: "PRIMARYCARE", tagline: "That actually knows your habit",
    body: "A physician-guided health plan built around your nutrition, workouts, sleep, and labs — that moves the needle."
  },
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #E6B27D 0%, #B48037 100%)",
    image: "/women.png", rightImage: "/right-nutrition.png", arrow: "#B48037",
    headline: "PRIMARYCARE", tagline: "Eat for your health—not someone else's.",
    body: "Log meals in seconds with AI, understand how food affects your health, and receive guidance that's actually personalized."
  },
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #DDD1B9 0%, #B3A07E 100%)",
    image: "/runner.png", rightImage: "/right-workout.png", arrow: "#B3A07E",
    headline: "PRIMARYCARE", tagline: "Exercise with purpose.",
    body: "Steps, workouts, heart rate, calories, strength, and cardio—all connected so your physician sees more than a yearly physical."
  },
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #97CEF0 0%, #547B93 100%)",
    image: "/women-with-pillow.png", rightImage: "/right-sleep.png", arrow: "#547B93",
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

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const currentIndex = useRef(0);
  const [activeSlide, setActiveSlide] = useState(0);

  // Per-slide refs
  const bgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hlRefs = useRef<(HTMLDivElement | null)[]>([]); // headline container
  const taglineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const bodyRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const statsRef = useRef<HTMLDivElement>(null);
  const progressFillRefs = useRef<(HTMLDivElement | null)[]>([]);

  // ── Exit a slide's content ────────────────────────────────────────────────
  const exitContent = (i: number) => {
    const letters = Array.from(hlRefs.current[i]?.children ?? []);
    gsap.to(letters, { opacity: 0, y: -15, duration: 0.3, stagger: 0.02, ease: "power2.in" });
    gsap.to(taglineRefs.current[i], { x: 20, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(bodyRefs.current[i], { x: 20, opacity: 0, duration: 0.3, delay: 0.05, ease: "power2.in" });
    gsap.to(ctaRefs.current[i], { scale: 0.9, opacity: 0, duration: 0.25, ease: "power2.in" });
    gsap.to(imageRefs.current[i], { yPercent: 100, opacity: 0, duration: 0.9, ease: "power2.in" });
  };

  // ── Enter a slide's content ───────────────────────────────────────────────
  const enterContent = (i: number, baseDelay = 0) => {
    const d = baseDelay;
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
    gsap.fromTo(ctaRefs.current[i],
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, delay: d + 0.8, ease: "back.out(1.4)" });
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

          gsap.set(bgRefs.current[to], { x: "100%" });
          gsap.set(imageRefs.current[to], { yPercent: 100, opacity: 0 });

          gsap.to(bgRefs.current[from], { x: "-100%", duration: BG_DURATION, ease: "power2.inOut" });
          gsap.to(bgRefs.current[to], { x: "0%", duration: BG_DURATION, ease: "power2.inOut" });

          gsap.delayedCall(CONTENT_EXIT_AT, () => exitContent(from));
          gsap.delayedCall(CONTENT_ENTER_AT, () => enterContent(to));

          currentIndex.current = to;
          setActiveSlide(to);
          startProgress(to);
        },
      }
    );
  };

  useGSAP(
    () => {
      // Init: all slides except first off-screen
      SLIDES.forEach((_, i) => {
        if (i === 0) return;
        gsap.set(bgRefs.current[i], { x: "100%" });
        gsap.set(imageRefs.current[i], { yPercent: 100, opacity: 0 });
        // Hide all non-active content elements
        const letters = Array.from(hlRefs.current[i]?.children ?? []);
        gsap.set([...letters, taglineRefs.current[i], bodyRefs.current[i], ctaRefs.current[i]], { opacity: 0 });
      });

      // Initial entrance for slide 0
      enterContent(0, 0);

      gsap.fromTo(statsRef.current,
        { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, delay: 1.6, ease: "power3.out" });

      // Init progress bars — all empty, first will fill via startProgress
      progressFillRefs.current.forEach(el => el && gsap.set(el, { width: "0%" }));

      startProgress(0);
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative h-dvh w-full overflow-hidden flex flex-col">

      {/* ── Background gradient layers (slide right → left) ── */}
      {SLIDES.map((s, i) => (
        <div key={i} ref={el => { bgRefs.current[i] = el; }}
          className="absolute inset-0 pointer-events-none" style={{ background: s.bg }}>
          <div className="absolute inset-0" style={{ backgroundImage: NOISE_BG, backgroundRepeat: "repeat", backgroundSize: "200px 200px" }} />
        </div>
      ))}

      {/* ── Header — normal flow, sits at top ── */}
      <div className="relative z-50 shrink-0">
        <HeroHeader />
      </div>

      {/* ── Main area — fills remaining height ── */}
      <div className="relative flex-1 overflow-hidden">

        {/* Person images — bottom-anchored, animate from center upward */}
        {SLIDES.map((s, i) => (
          <div key={i} ref={el => { imageRefs.current[i] = el; }}
            className="absolute inset-0 pointer-events-none z-20">
            <div className="relative max-w-360 mx-auto px-4 h-full">
              <Image src={s.image} alt="" width={715} height={954} priority={i === 0}
                className="absolute bottom-0 left-[70%] sm:left-[70%] md:left-[62%] lg:left-[55%] -translate-x-1/2 h-[65dvh] md:h-[75dvh] lg:h-[86dvh] w-auto object-contain object-bottom" />
            </div>
          </div>
        ))}

        {/* ── Tagline / body / CTA — no z-index so mix-blend-mode reaches background ── */}
        {SLIDES.map((s, i) => (
          <div key={i} className="absolute inset-0 pointer-events-none">
            <div className="max-w-360 relative mx-auto px-4 h-full flex flex-col justify-start  gap-4 lg:gap-6">
              <div ref={el => { hlRefs.current[i] = el; }}
                className="uppercase font-bold leading-none tracking-normal text-[#1E1E22] whitespace-nowrap"
                style={{ fontSize: "clamp(48px, 10vw, 180px)", mixBlendMode: "difference" }}>
                {s.headline.split("").map((char, j) => <span key={j}>{char}</span>)}
              </div>
              <div className="flex flex-col gap-2 relative z-999 lg:gap-3">
                <p ref={el => { taglineRefs.current[i] = el; }}
                  className="text-white uppercase font-normal text-[22px] md:text-[28px] lg:text-[32px] leading-tight lg:leading-[40px]">{s.tagline}</p>
                <p ref={el => { bodyRefs.current[i] = el; }}
                  className="text-white font-normal text-[16px] lg:text-[20px] leading-[22px] lg:leading-[25px] w-[min(85vw,477px)]">{s.body}</p>
              </div>
              <div>
                <button ref={el => { ctaRefs.current[i] = el; }}
                  className="pointer-events-auto flex items-center relative z-999 w-[200px] h-[54px] lg:w-[236px] lg:h-[64px] bg-[#18181B] rounded-[40px] pl-[12px] lg:pl-[15px] pr-1">
                  <span className="flex-1 text-[#F4F4F5] font-medium text-[20px] lg:text-[24px] leading-[30px] text-left">Get Started</span>
                  <span className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#F4F4F5] shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17L17 7M17 7H7M17 7V17" stroke={s.arrow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>
      <div ref={statsRef} className="absolute left-0 right-0 z-20 bottom-14">
        <div className="max-w-360 mx-auto px-4 flex gap-2">
          <div className="origin-left scale-[0.62] sm:scale-75 md:scale-90 lg:scale-100">
            <EnrollmentCard accentColor={SLIDES[activeSlide].arrow} />
          </div>
        </div>
      </div>

      {/* ── Progress bar indicators — bottom ── */}
      <div className="absolute bottom-5 left-0 right-0 z-40">
        <div className="max-w-360 mx-auto px-4 flex gap-2">
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

    </section>
  );
}
