"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CARDS = [
  { label: "Nutrition App",   image: "/section2/neutrition.png", alt: "Nutrition" },
  { label: "Fitness Tracker", image: "/section2/fitness.png",    alt: "Fitness"   },
  { label: "Sleep Monitor",   image: "/section2/sleep.png",      alt: "Sleep"     },
  { label: "Lab Results",     image: "/section2/lab.png",        alt: "Lab"       },
];

const HEADLINE_WORDS = "You're doing the right things but not seeing results.".split(" ");

export default function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);
  const wordRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const bodyRef    = useRef<HTMLParagraphElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      // Text reveals on scroll enter
      gsap.from(labelRef.current, {
        opacity: 0, y: 20, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
      gsap.from(wordRefs.current, {
        opacity: 0, y: 44, duration: 0.7, stagger: 0.055, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
      gsap.from(bodyRef.current, {
        opacity: 0, x: -24, duration: 0.8, delay: 0.2, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 76%", once: true },
      });

      // Pin + scrub — 2 phases
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=420%",
          pin: true,
          scrub: 1.2,
          pinSpacing: true,
        },
      });

      // Phase 1: whole content slides up so cards reach center (~40vh)
      tl.to(contentRef.current, { y: "-10vh", ease: "none", duration: 1.2 }, 0);


      // Phase 2: cards rise one by one (start after phase 1 settles)
      tl.from(cardRefs.current[0], { yPercent: 105, ease: "none" }, 1.0)
        .from(cardRefs.current[1], { yPercent: 105, ease: "none" }, 1.9)
        .from(cardRefs.current[2], { yPercent: 105, ease: "none" }, 2.8)
        .from(cardRefs.current[3], { yPercent: 105, ease: "none" }, 3.7);
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="bg-[#F0E8DC] w-full px-6 lg:px-0 pt-16 lg:pt-20 pb-0">
      <div ref={contentRef} className="max-w-360 mx-auto lg:px-13">

        {/* Top row — content-driven height */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-24 mb-12">

          <div className="flex-1">
            <p ref={labelRef}
              className="text-[#1E1E22]/60 uppercase text-[12px] font-semibold tracking-[0.12em] mb-4">
              The Problem
            </p>
            <h2 className="text-[#1E1E22] font-bold text-[20px] sm:text-[24px] lg:text-[32px]  uppercase max-w-130 flex flex-wrap gap-x-[0.3em]">
              {HEADLINE_WORDS.map((word, i) => (
                <span key={i} ref={el => { wordRefs.current[i] = el; }} className="inline-block">
                  {word}
                </span>
              ))}
            </h2>
          </div>

          <div className="flex-1 max-w-120 bg-theme-accent p-4">
            <p ref={bodyRef} className="text-white text-[18px] lg:text-[20px] leading-normal">
              Calories, workouts, sleep, labs. Most people manage them separately.
              Meddy connects them and puts a physician in charge of what they mean.
            </p>
          </div>

        </div>

        {/* Cards — aspect-ratio driven, never squished */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 overflow-hidden">
          {CARDS.map(({ label, image, alt }, i) => (
            <div key={label} ref={el => { cardRefs.current[i] = el; }}
              className="bg-[#F0E8DC] rounded-2xl p-1">
              <div className="relative aspect-[3/5] overflow-hidden rounded-xl">
                <Image src={image} alt={alt} fill className="object-cover object-center" />
                <p
                  className="absolute top-4 left-4 font-extrabold text-[32px] leading-10 uppercase text-[#1E1E22]"
                  style={{ mixBlendMode: "color-dodge" }}
                >
                  {label}.
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
