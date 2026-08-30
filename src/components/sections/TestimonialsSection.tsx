"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Size = "sm" | "md" | "lg";

type Testimonial = {
  name: string;
  age: number;
  plan: string;
  quote: string;
  image: string;
  color: string;
  nameColor?: string;
  planColor?: string;
  ageColor?: string;
  size: Size;
  left: string;
  top: string;
  width: string;
};

const FONT: Record<Size, { name: string; plan: string; age: string; quote: string; glyph: string }> = {
  sm: {
    name: "clamp(10px,1.04vw,15px)",
    plan: "clamp(6px,0.63vw,9px)",
    age: "clamp(16px,1.67vw,24px)",
    quote: "clamp(7px,0.73vw,10.5px)",
    glyph: "clamp(20px,2.08vw,30px)",
  },
  md: {
    name: "clamp(12px,1.28vw,18.49px)",
    plan: "clamp(7px,0.77vw,11.09px)",
    age: "clamp(20px,2.05vw,29.58px)",
    quote: "clamp(9px,0.9vw,12.94px)",
    glyph: "clamp(24px,2.5vw,36px)",
  },
  lg: {
    name: "clamp(15px,1.54vw,22.12px)",
    plan: "clamp(9px,0.92vw,13.27px)",
    age: "clamp(24px,2.46vw,35.39px)",
    quote: "clamp(10px,1.08vw,15.49px)",
    glyph: "clamp(28px,2.92vw,42px)",
  },
};

const RADIUS: Record<Size, number> = { sm: 7.5, md: 9.245, lg: 11.06 };

const SHADOW: Record<Size, string> = {
  sm: "5.25px 5.25px 6.3px rgba(0,0,0,0.26)",
  md: "6.47px 6.47px 7.77px rgba(0,0,0,0.26)",
  lg: "7.74px 7.74px 9.29px rgba(0,0,0,0.26)",
};

// Exact Figma positions (% of the 1440×961 frame)
const TESTIMONIALS: Testimonial[] = [
  {
    name: "Maya",
    age: 34,
    plan: "Meddy care",
    quote: "I finally understood why I wasn't recovering.",
    image: "/home/testimonial-maya.jpg",
    color: "#366B4C",
    nameColor: "#555555",
    planColor: "#888888",
    ageColor: "#555555",
    size: "sm",
    left: "7.99%",
    top: "17.96%",
    width: "11.04%",
  },
  {
    name: "Sarah",
    age: 21,
    plan: "Meddy complete",
    quote: "I stopped guessing what I should eat.",
    image: "/home/testimonial-sarah.jpg",
    color: "#163B32",
    size: "md",
    left: "22.27%",
    top: "25.49%",
    width: "13.61%",
  },
  {
    name: "Mack",
    age: 24,
    plan: "Meddy complete",
    quote: "My workouts finally had context.",
    image: "/home/testimonial/mack.jpg",
    color: "#1D3A1D",
    size: "lg",
    left: "41.09%",
    top: "28.30%",
    width: "16.28%",
  },
  {
    name: "Steve",
    age: 29,
    plan: "Meddy care",
    quote: "I didn't realize my sleep was affecting everything else.",
    image: "/home/testimonial/steve.jpg",
    color: "#336D4D",
    nameColor: "#525252",
    planColor: "#666666",
    ageColor: "#666666",
    size: "md",
    left: "63.04%",
    top: "24.14%",
    width: "13.61%",
  },
  {
    name: "Ray",
    age: 34,
    plan: "Meddy care",
    quote: "Someone finally explained what my numbers meant.",
    image: "/home/testimonial/ray-top.jpg",
    color: "#1A3D2B",
    size: "sm",
    left: "79.69%",
    top: "16.44%",
    width: "11.04%",
  },
  {
    name: "Ted",
    age: 31,
    plan: "Meddy complete",
    quote: "My doctor knew what had changed before I walked in.",
    image: "/home/testimonial/ted.jpg",
    color: "#395C3F",
    size: "sm",
    left: "7.71%",
    top: "57.54%",
    width: "11.04%",
  },
  {
    name: "Damon",
    age: 67,
    plan: "Meddy complete",
    quote: "It wasn't one thing. It was the connection.",
    image: "/home/testimonial/damon.jpg",
    color: "#051F20",
    size: "md",
    left: "22.08%",
    top: "64.10%",
    width: "13.61%",
  },
  {
    name: "Liza",
    age: 26,
    plan: "Meddy care",
    quote: "I finally understood why I wasn't recovering",
    image: "/home/testimonial/liza.jpg",
    color: "#163B32",
    size: "lg",
    left: "40.90%",
    top: "65.04%",
    width: "16.32%",
  },
  {
    name: "Steve",
    age: 37,
    plan: "Meddy care",
    quote: "I finally understood why I wasn't recovering",
    image: "/home/testimonial/steve-bottom.jpg",
    color: "#366B4C",
    size: "md",
    left: "62.92%",
    top: "62.23%",
    width: "13.33%",
  },
  {
    name: "Ray",
    age: 48,
    plan: "Meddy care",
    quote: "I finally understood why I wasn't recovering",
    image: "/home/testimonial/ray.jpg",
    color: "#1A3D2B",
    size: "sm",
    left: "79.72%",
    top: "55.77%",
    width: "11.04%",
  },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  const f = FONT[t.size];
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: "159/179.25",
        borderRadius: RADIUS[t.size],
        background: t.color,
        filter: `drop-shadow(${SHADOW[t.size]})`,
      }}
    >
      <Image src={t.image} alt={`${t.name} testimonial`} fill className="object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(115,115,115,0) 26.36%, #0C0C0C 96.58%)" }}
      />

      {/* header — name + plan (left), age (right) */}
      <div className="absolute left-2.5 right-2.5 top-2 flex items-start  justify-between gap-2">
        <div className="flex flex-col">
          <span
            className="font-medium uppercase leading-none"
            style={{ fontSize: f.name, color: t.nameColor ?? "#FAFAFA", letterSpacing: "0.02em" }}
          >
            {t.name}
          </span>
          <span className="mt-1 leading-none" style={{ fontSize: f.plan, color: t.planColor ?? "#E0D6D6", letterSpacing: "0.02em" }}>
            {t.plan}
          </span>
        </div>
        <span className="font-semibold leading-none" style={{ fontSize: f.age, color: t.ageColor ?? "#E0D6D6", letterSpacing: "0.02em" }}>
          {t.age}
        </span>
      </div>

      {/* quote */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5">
        <svg viewBox="0 0 24 18" fill="none" aria-hidden="true" style={{ width: 20, height: "auto", marginBottom: 4 }}>
          <path d="M0 18V10.8C0 7.2 1 4.2 3 1.8 5 .6 7.5 0 10.5 0v3.6C8.5 4.2 7 5.4 6 7.2 5 9 4.5 10.8 4.5 12.6H10.5V18H0ZM13.5 18V10.8c0-3.6 1-6.6 3-9 2-1.2 4.5-1.8 7.5-1.8v3.6c-2 .6-3.5 1.8-4.5 3.6-1 1.8-1.5 3.6-1.5 5.4H24V18H13.5Z" fill="#E4E4E4" />
        </svg>
        <p
          className="font-medium leading-none mt-2"
          style={{ fontSize: f.quote, color: "#AEAEAE", letterSpacing: "0.02em" }}
        >
          {t.quote}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(245.75deg, #051F20 -15.25%, #163B32 -0.52%, #366B4C 23.33%, #EBE4CC 55.47%, #336D4D 79.63%, #395C3F 103.78%)",
      }}
    >
      <div className="relative max-w-360 mx-auto px-4 py-20 lg:py-28">
        {/* Heading (mobile / tablet) */}
        <div data-reveal className="text-center lg:hidden">
          <h2 className="text-white max-w-93 font-bold leading-tight">
            <span className="block" style={{ fontSize: "clamp(24px,2.22vw,32px)", letterSpacing: "0.02em" }}>
              REAL PEOPLE.
            </span>
            <span className="block mt-1 max-w-93 text-[#E7F0A3]" style={{ fontSize: "clamp(24px,2.22vw,32px)", letterSpacing: "0.02em" }}>
              BETTER HEALTH.
            </span>
          </h2>
          <p className="text-white  max-w-93 mt-6 mx-auto " style={{ fontSize: "clamp(14px,1.11vw,16px)", lineHeight: 1.25 }}>
            See how connected care can change the way you understand your health.
          </p>
        </div>

        {/* Mobile / tablet */}
        <div className="lg:hidden mt-14 grid grid-cols-2 gap-3 justify-items-center sm:grid-cols-3 md:grid-cols-5">
          {TESTIMONIALS.map((t) => (
            <div key={`${t.name}-${t.age}`} data-reveal className="w-full max-w-35 sm:max-w-45 md:max-w-none">
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

        {/* Desktop: exact Figma collage (1440×961) with heading integrated */}
        <div className="hidden lg:block relative w-full aspect-1440/961">
          <div data-reveal className="absolute left-0 right-0 top-[4.99%] text-center">
            <h2 className="text-white font-bold leading-tight">
              <span className="block" style={{ fontSize: "clamp(24px,2.22vw,32px)", letterSpacing: "0.02em" }}>
                REAL PEOPLE.
              </span>
              <span className="block mt-1 text-[#E7F0A3]" style={{ fontSize: "clamp(24px,2.22vw,32px)", letterSpacing: "0.02em" }}>
                BETTER HEALTH.
              </span>
            </h2>
            <p className="text-white mt-6 mx-auto  max-w-93" style={{ fontSize: "clamp(14px,1.11vw,16px)", lineHeight: 1.25 }}>
              See how connected care can change the way you understand your health.
            </p>
          </div>
          {TESTIMONIALS.map((t) => (
            <div
              key={`${t.name}-${t.age}`}
              data-reveal
              className="absolute"
              style={{ left: t.left, top: t.top, width: t.width }}
            >
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
