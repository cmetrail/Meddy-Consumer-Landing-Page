"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroHeader from "@/components/helper/HeroHeader";
import HeroRightPanel from "@/components/helper/HeroRightPanel";
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
    headline: "PRIMARYCARE", tagline: "That actually knows your habit",
    body: "A physician-guided health plan built around your nutrition, workouts, sleep, and labs — that moves the needle."
  },
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #DDD1B9 0%, #B3A07E 100%)",
    image: "/runner.png", rightImage: "/right-workout.png", arrow: "#B3A07E",
    headline: "PRIMARYCARE", tagline: "That actually knows your habit",
    body: "A physician-guided health plan built around your nutrition, workouts, sleep, and labs — that moves the needle."
  },
  {
    bg: "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #97CEF0 0%, #547B93 100%)",
    image: "/women-with-pillow.png", rightImage: "/right-sleep.png", arrow: "#547B93",
    headline: "PRIMARYCARE", tagline: "That actually knows your habit",
    body: "A physician-guided health plan built around your nutrition, workouts, sleep, and labs — that moves the needle."
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

  // Shared one-time refs (stats / icons / nutrition — always same across slides)
  const statsRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const nutritionRef = useRef<HTMLDivElement>(null);

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
      { yPercent: 100, opacity: 0 },
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

  // ── Schedule + run next transition ───────────────────────────────────────
  const scheduleNext = (from: number) => {
    gsap.delayedCall(5, () => {
      const to = (from + 1) % SLIDES.length;

      // Reset incoming bg + image off-screen
      gsap.set(bgRefs.current[to], { x: "100%" });
      gsap.set(imageRefs.current[to], { yPercent: 100, opacity: 0 });

      // 1. Curtain: new bg slides in from right, old bg exits left
      gsap.to(bgRefs.current[from], { x: "-100%", duration: BG_DURATION, ease: "power2.inOut" });
      gsap.to(bgRefs.current[to], { x: "0%", duration: BG_DURATION, ease: "power2.inOut" });

      // 2. When curtain edge "touches" content → exit old, enter new
      gsap.delayedCall(CONTENT_EXIT_AT, () => exitContent(from));
      gsap.delayedCall(CONTENT_ENTER_AT, () => enterContent(to));

      currentIndex.current = to;
      setActiveSlide(to);
      scheduleNext(to);
    });
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

      // Shared elements entrance (stats, icons, nutrition)
      gsap.fromTo(statsRef.current,
        { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0, delay: 1.6, ease: "power3.out" });
      gsap.fromTo(iconsRef.current,
        { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, delay: 1.4, ease: "power2.out" });
      gsap.fromTo(nutritionRef.current,
        { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 1.5, ease: "power2.out" });

      scheduleNext(0);
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="relative h-dvh w-full overflow-hidden">

      {/* ── Background gradient layers (slide right → left) ── */}
      {SLIDES.map((s, i) => (
        <div key={i} ref={el => { bgRefs.current[i] = el; }}
          className="absolute inset-0 pointer-events-none" style={{ background: s.bg }}>
          {/* Monotone noise overlay */}
          <div className="absolute inset-0" style={{ backgroundImage: NOISE_BG, backgroundRepeat: "repeat", backgroundSize: "200px 200px" }} />
        </div>
      ))}

      {/* ── PRIMARYCARE headline layers ── */}
      {SLIDES.map((s, i) => (
        <div key={i} className="absolute inset-0 pointer-events-none">
          <div className="relative max-w-360 mx-auto h-full">
            <div ref={el => { hlRefs.current[i] = el; }}
              className="absolute uppercase font-bold leading-none tracking-normal text-[#1E1E22] whitespace-nowrap top-[8dvh] left-[3%] lg:top-[11.7dvh] lg:left-[4.17%]"
              style={{ fontSize: "clamp(48px, 10vw, 180px)", mixBlendMode: "difference" }}>
              {s.headline.split("").map((char, j) => <span key={j}>{char}</span>)}
            </div>
          </div>
        </div>
      ))}

      {/* ── Person image layers — hidden below sm, responsive size/position ── */}
      {SLIDES.map((s, i) => (
        <div key={i} ref={el => { imageRefs.current[i] = el; }}
          className="absolute inset-0 pointer-events-none z-20">
          <div className="relative max-w-360 mx-auto px-13 h-full">
            <Image src={s.image} alt="" width={715} height={954} priority={i === 0}
              className="hidden sm:block absolute bottom-0 left-[75%] sm:left-[70%] md:left-[62%] lg:left-[55%] -translate-x-1/2 h-[55dvh] sm:h-[65dvh] md:h-[75dvh] lg:h-[86dvh] w-auto object-contain object-bottom" />
          </div>
        </div>
      ))}

      {/* ── Tagline / body / CTA ── */}
      {SLIDES.map((s, i) => (
        <div key={i} className="absolute inset-0 pointer-events-none z-30">
          <div className="relative max-w-360 mx-auto h-full">

            <div className="absolute flex flex-col gap-2.5 top-[22dvh] left-[5%] lg:top-[33.6dvh] lg:left-[5.21%]">
              <p ref={el => { taglineRefs.current[i] = el; }}
                className="text-white uppercase font-normal text-[22px] md:text-[28px] lg:text-[32px] leading-tight lg:leading-[40px]">{s.tagline}</p>
              <p ref={el => { bodyRefs.current[i] = el; }}
                className="text-white font-normal text-[16px] lg:text-[20px] leading-[22px] lg:leading-[25px] w-[min(85vw,477px)]">{s.body}</p>
            </div>

            <div className="absolute pointer-events-auto top-[40dvh] left-[5%] lg:top-[52.2dvh] lg:left-[5.21%]">
              <button ref={el => { ctaRefs.current[i] = el; }}
                className="flex items-center w-[200px] h-[54px] lg:w-[236px] lg:h-[64px] bg-[#18181B] rounded-[40px] pl-[12px] lg:pl-[15px] pr-1">
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

      {/* ── Header (always on top) ── */}
      <div className="absolute inset-x-0 top-0 z-50">
        <HeroHeader />
      </div>

      {/* ── Shared elements: stats / icons / nutrition ── */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div className="relative max-w-360 mx-auto h-full">

          <div ref={statsRef} className="absolute top-[55dvh] left-[5%] md:top-[60dvh] lg:top-[67.9dvh] lg:left-[5.14%] origin-top-left scale-[0.65] sm:scale-[0.75] md:scale-[0.85] lg:scale-100">
            <EnrollmentCard accentColor={SLIDES[activeSlide].arrow} />
          </div>

          {/* Right panel — desktop only */}
          <div className="hidden lg:contents">
            <HeroRightPanel
              iconsRef={iconsRef}
              nutritionRef={nutritionRef}
              activeIndex={activeSlide}
              nextImage={SLIDES[(activeSlide + 1) % SLIDES.length].rightImage}
            />
          </div>

        </div>
      </div>

    </section>
  );
}
