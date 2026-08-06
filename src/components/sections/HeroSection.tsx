"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import HeroHeader from "@/components/helper/HeroHeader";

gsap.registerPlugin(useGSAP);

// ─── Slide data — swap content per slide here ───────────────────────────────
const SLIDES = [
  {
    bg:       "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #2FC380 0%, #1D6B40 100%)",
    image:    "/doctor.png",
    headline: "PRIMARYCARE",
    tagline:  "That actually knows your habit",
    body:     "A physician-guided health plan built around your nutrition, workouts, sleep, and labs — that moves the needle.",
    arrow:    "#17925A",
  },
  {
    bg:       "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #E6B27D 0%, #B48037 100%)",
    image:    "/women.png",
    headline: "PRIMARYCARE",
    tagline:  "That actually knows your habit",
    body:     "A physician-guided health plan built around your nutrition, workouts, sleep, and labs — that moves the needle.",
    arrow:    "#B48037",
  },
  {
    bg:       "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #7DD5E6 0%, #1D6B6B 100%)",
    image:    "/runner.png",
    headline: "PRIMARYCARE",
    tagline:  "That actually knows your habit",
    body:     "A physician-guided health plan built around your nutrition, workouts, sleep, and labs — that moves the needle.",
    arrow:    "#1D6B6B",
  },
  {
    bg:       "radial-gradient(49.4% 83.3% at 53.93% 56.81%, #A78BCD 0%, #4A2D7A 100%)",
    image:    "/women-with-pillow.png",
    headline: "PRIMARYCARE",
    tagline:  "That actually knows your habit",
    body:     "A physician-guided health plan built around your nutrition, workouts, sleep, and labs — that moves the needle.",
    arrow:    "#4A2D7A",
  },
];

const ICONS_SVG = [
  <><path d="M4.8 3H7.2C7.64 3 8 3.36 8 3.8V8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8V3.8C16 3.36 16.36 3 16.8 3H19.2" stroke="#585454" strokeWidth="1.5" strokeLinecap="round"/><path d="M12 12V15M12 15C10.34 15 9 16.34 9 18C9 19.66 10.34 21 12 21C13.66 21 15 19.66 15 18" stroke="#585454" strokeWidth="1.5" strokeLinecap="round"/><circle cx="17" cy="18" r="2" stroke="#585454" strokeWidth="1.5"/></>,
  <path d="M3 2V8C3 10.21 4.79 12 7 12V22M7 2V8M11 2V8C11 10.21 12.79 12 15 12V22M21 2C21 2 21 8 18 10C15 12 15 22 15 22" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
  <path d="M6 4H8V20H6V4ZM16 4H18V20H16V4ZM4 9H6M18 9H20M4 15H6M18 15H20M8 11H16M2 8H4V16H2V8ZM20 8H22V16H20V8Z" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>,
  <><path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 11.54 20.96 11.08 20.9 10.64C19.92 11.5 18.63 12 17.2 12C14.33 12 12 9.67 12 6.8C12 5.37 12.5 4.08 13.36 3.1C12.92 3.04 12.46 3 12 3Z" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 2L20 4L22 5L20 6L19 8L18 6L16 5L18 4L19 2Z" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></>,
];

// ─── Timing constants ────────────────────────────────────────────────────────
const BG_DURATION     = 1.4;   // bg curtain slide duration
const CONTENT_EXIT_AT = 0.55;  // when curtain edge "touches" content (s after bg starts)
const CONTENT_ENTER_AT = CONTENT_EXIT_AT + 0.1;

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const currentIndex = useRef(0);

  // Per-slide refs
  const bgRefs        = useRef<(HTMLDivElement    | null)[]>([]);
  const imageRefs     = useRef<(HTMLDivElement    | null)[]>([]);
  const hlRefs        = useRef<(HTMLDivElement    | null)[]>([]); // headline container
  const taglineRefs   = useRef<(HTMLParagraphElement | null)[]>([]);
  const bodyRefs      = useRef<(HTMLParagraphElement | null)[]>([]);
  const ctaRefs       = useRef<(HTMLButtonElement | null)[]>([]);

  // Shared one-time refs (stats / icons / nutrition — always same across slides)
  const statsRef      = useRef<HTMLDivElement>(null);
  const iconsRef      = useRef<HTMLDivElement>(null);
  const nutritionRef  = useRef<HTMLDivElement>(null);

  // ── Exit a slide's content ────────────────────────────────────────────────
  const exitContent = (i: number) => {
    const letters = Array.from(hlRefs.current[i]?.children ?? []);
    gsap.to(letters,           { opacity: 0, y: -15, duration: 0.3, stagger: 0.02, ease: "power2.in" });
    gsap.to(taglineRefs.current[i], { x: 20, opacity: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(bodyRefs.current[i],    { x: 20, opacity: 0, duration: 0.3, delay: 0.05, ease: "power2.in" });
    gsap.to(ctaRefs.current[i],     { scale: 0.9, opacity: 0, duration: 0.25, ease: "power2.in" });
    gsap.to(imageRefs.current[i],   { yPercent: 100, opacity: 0, duration: 0.9, ease: "power2.in" });
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
      gsap.set(bgRefs.current[to],    { x: "100%" });
      gsap.set(imageRefs.current[to], { yPercent: 100, opacity: 0 });

      // 1. Curtain: new bg slides in from right, old bg exits left
      gsap.to(bgRefs.current[from],  { x: "-100%", duration: BG_DURATION, ease: "power2.inOut" });
      gsap.to(bgRefs.current[to],    { x: "0%",    duration: BG_DURATION, ease: "power2.inOut" });

      // 2. When curtain edge "touches" content → exit old, enter new
      gsap.delayedCall(CONTENT_EXIT_AT,  () => exitContent(from));
      gsap.delayedCall(CONTENT_ENTER_AT, () => enterContent(to));

      currentIndex.current = to;
      scheduleNext(to);
    });
  };

  useGSAP(
    () => {
      // Init: all slides except first off-screen
      SLIDES.forEach((_, i) => {
        if (i === 0) return;
        gsap.set(bgRefs.current[i],    { x: "100%" });
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
          className="absolute inset-0 pointer-events-none" style={{ background: s.bg }} />
      ))}

      {/* ── PRIMARYCARE headline layers — no z-index so mix-blend-mode reaches bg ── */}
      {SLIDES.map((s, i) => (
        <div key={i} className="absolute inset-0 pointer-events-none">
          <div className="relative max-w-360 mx-auto h-full">
            <div ref={el => { hlRefs.current[i] = el; }}
              className="absolute uppercase font-bold leading-none tracking-normal text-[#1E1E22] whitespace-nowrap"
              style={{ top: "11.7dvh", left: "4.17%", fontSize: "clamp(80px, 12.5vw, 180px)", mixBlendMode: "difference" }}>
              {s.headline.split("").map((char, j) => <span key={j}>{char}</span>)}
            </div>
          </div>
        </div>
      ))}

      {/* ── Person image layers — z-20 sits in front of PRIMARYCARE ── */}
      {SLIDES.map((s, i) => (
        <div key={i} ref={el => { imageRefs.current[i] = el; }}
          className="absolute inset-0 pointer-events-none z-20">
          <div className="relative max-w-360 mx-auto px-13 h-full">
            <Image src={s.image} alt="" width={715} height={954} priority={i === 0}
              className="absolute bottom-0 left-[55%] -translate-x-1/2 h-[86dvh] w-auto object-contain object-bottom" />
          </div>
        </div>
      ))}

      {/* ── Tagline / body / CTA — z-30 sits in front of person image ── */}
      {SLIDES.map((s, i) => (
        <div key={i} className="absolute inset-0 pointer-events-none z-30">
          <div className="relative max-w-360 mx-auto h-full">

            <div className="absolute flex flex-col gap-[10px]" style={{ top: "33.6dvh", left: "5.21%" }}>
              <p ref={el => { taglineRefs.current[i] = el; }}
                className="text-white uppercase font-normal text-[32px] leading-[40px]">{s.tagline}</p>
              <p ref={el => { bodyRefs.current[i] = el; }}
                className="text-white font-normal text-[20px] leading-[25px] w-[477px]">{s.body}</p>
            </div>

            <div className="absolute pointer-events-auto" style={{ top: "52.2dvh", left: "5.21%" }}>
              <button ref={el => { ctaRefs.current[i] = el; }}
                className="flex items-center w-[236px] h-[64px] bg-[#18181B] rounded-[40px] pl-[15px] pr-[4px]">
                <span className="flex-1 text-[#F4F4F5] font-medium text-[24px] leading-[30px] text-left">Get Started</span>
                <span className="flex items-center justify-center w-[56px] h-[56px] rounded-full bg-[#F4F4F5] shrink-0">
                  <svg width="29" height="29" viewBox="0 0 24 24" fill="none">
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

          <div ref={statsRef} className="absolute" style={{ top: "67.9dvh", left: "5.14%" }}>
            <Image src="/stats.png" alt="Enrollment stats" width={380} height={257} className="w-[380px] h-auto" />
          </div>

          <div ref={iconsRef} className="absolute flex items-center gap-[10px]" style={{ top: "58.1dvh", right: "4.93%" }}>
            {ICONS_SVG.map((icon, i) => (
              <div key={i} className={`flex items-center justify-center w-10 h-10 ${i === 0 ? "bg-white" : "border border-white"}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">{icon}</svg>
              </div>
            ))}
          </div>

          <div ref={nutritionRef} className="absolute" style={{ top: "72.1dvh", right: "4.38%" }}>
            <Image src="/nutrition.png" alt="Nutrition" width={239} height={218} className="w-[239px] h-auto" />
          </div>

        </div>
      </div>

    </section>
  );
}
