"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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
    glyph: "clamp(32px,3.33vw,48px)",
  },
  md: {
    name: "clamp(12px,1.28vw,18.49px)",
    plan: "clamp(7px,0.77vw,11.09px)",
    age: "clamp(20px,2.05vw,29.58px)",
    quote: "clamp(9px,0.9vw,12.94px)",
    glyph: "clamp(40px,4.11vw,59.17px)",
  },
  lg: {
    name: "clamp(15px,1.54vw,22.12px)",
    plan: "clamp(9px,0.92vw,13.27px)",
    age: "clamp(24px,2.46vw,35.39px)",
    quote: "clamp(10px,1.08vw,15.49px)",
    glyph: "clamp(48px,4.92vw,70.79px)",
  },
};

const RADIUS: Record<Size, number> = { sm: 7.5, md: 9.245, lg: 11.06 };

const SHADOW: Record<Size, string> = {
  sm: "5.25px 5.25px 6.3px rgba(0,0,0,0.26)",
  md: "6.47px 6.47px 7.77px rgba(0,0,0,0.26)",
  lg: "7.74px 7.74px 9.29px rgba(0,0,0,0.26)",
};

// Exact Figma positions (% of the 1440×842 frame, 1440×961 trimmed of top/bottom whitespace)
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
    left: "7.71%",
    top: "16.86%",
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
    left: "22.00%",
    top: "23.93%",
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
    left: "40.82%",
    top: "26.56%",
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
    left: "62.76%",
    top: "22.66%",
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
    left: "79.41%",
    top: "15.43%",
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
    top: "54.04%",
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
    top: "60.19%",
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
    top: "61.07%",
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
    top: "58.43%",
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
    top: "52.38%",
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
        style={{ background: "linear-gradient(180deg, rgba(115,115,115,0) 26%, #0C0C0C 97%)" }}
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
        <span
          aria-hidden
          className="block select-none text-[#E4E4E4]"
          style={{ fontSize: f.glyph, lineHeight: 0.55, letterSpacing: "0.02em" }}
        >
          &ldquo;
        </span>
        <p
          className="font-medium text-[#AEAEAE]"
          style={{ fontSize: f.quote, lineHeight: 1.25, letterSpacing: "0.02em" }}
        >
          {t.quote}
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]", sectionRef.current).forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, ease: "none",
          scrollTrigger: { trigger: el, start: "top 88%", end: "top 60%", scrub: true },
        });
      });

      // Cards loop like a carousel along each row's own curve: the top row
      // drifts left → right, the bottom row drifts right → left. As a card
      // slides it morphs through the row's slot shapes (top/width) so it
      // rides the same arc the static layout defines — the first card eases
      // into the second card's position, and so on — instead of moving in a
      // straight line. Each card exits one edge and (clipped by the section's
      // overflow-hidden) reappears from the opposite edge, with the row's
      // curve positions always occupied.
      const cards = gsap.utils.toArray<HTMLElement>("[data-tm-loop]", sectionRef.current);
      const containerWidth = desktopRef.current?.offsetWidth ?? window.innerWidth;

      const cardInfos = cards.map((card) => ({
        card,
        leftPx: (parseFloat(card.style.left) / 100) * containerWidth,
        topPct: parseFloat(card.style.top),
        widthPct: parseFloat(card.style.width),
        cardWidth: card.offsetWidth,
      }));

      // Smooth (Hermite/Catmull-Rom style) interpolation through the row's
      // slot points: tangents are derived from each point's neighbours so
      // the card eases through every slot on a true curve instead of
      // bending along straight, kinked line segments.
      type CurvePoint = { x: number; top: number; width: number };
      const buildCurve = (points: CurvePoint[]) => {
        const sorted = [...points].sort((a, b) => a.x - b.x);
        const n = sorted.length;
        const tangent = (key: "top" | "width", i: number) => {
          const prev = sorted[Math.max(i - 1, 0)];
          const next = sorted[Math.min(i + 1, n - 1)];
          const dx = next.x - prev.x;
          return dx === 0 ? 0 : (next[key] - prev[key]) / dx;
        };
        return (x: number) => {
          const cx = Math.min(Math.max(x, sorted[0].x), sorted[n - 1].x);
          for (let i = 0; i < n - 1; i++) {
            const p0 = sorted[i];
            const p1 = sorted[i + 1];
            if (cx >= p0.x && cx <= p1.x) {
              const dx = p1.x - p0.x || 1;
              const t = (cx - p0.x) / dx;
              const h00 = 2 * t ** 3 - 3 * t ** 2 + 1;
              const h10 = t ** 3 - 2 * t ** 2 + t;
              const h01 = -2 * t ** 3 + 3 * t ** 2;
              const h11 = t ** 3 - t ** 2;
              const hermite = (key: "top" | "width") => {
                const m0 = tangent(key, i);
                const m1 = tangent(key, i + 1);
                return h00 * p0[key] + h10 * dx * m0 + h01 * p1[key] + h11 * dx * m1;
              };
              return { top: hermite("top"), width: hermite("width") };
            }
          }
          const last = sorted[n - 1];
          return { top: last.top, width: last.width };
        };
      };

      const topRowCards = cardInfos.filter((c) => c.topPct < 50);
      const bottomRowCards = cardInfos.filter((c) => c.topPct >= 50);
      const topCurve = buildCurve(topRowCards.map((c) => ({ x: c.leftPx, top: c.topPct, width: c.widthPct })));
      const bottomCurve = buildCurve(bottomRowCards.map((c) => ({ x: c.leftPx, top: c.topPct, width: c.widthPct })));

      const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
      const mapRange = (v: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
        outMin + clamp01((v - inMin) / (inMax - inMin || 1)) * (outMax - outMin);

      // Each row is its own independent loop: own curve, own bounds, own
      // phase — nothing shared between the top and bottom row's timelines.
      // The off-screen wrap buffer is now a small fixed margin (not a full
      // card width), so cards sit closer together with far less dead gap
      // between one leaving and the next entering. Opacity fades over that
      // margin hide the wrap teleport instead of relying on distance alone.
      [
        { row: topRowCards, curve: topCurve, direction: 1 },
        { row: bottomRowCards, curve: bottomCurve, direction: -1 },
      ].forEach(({ row, curve, direction }) => {
        if (row.length === 0) return;
        const sortedRow = [...row].sort((a, b) => a.leftPx - b.leftPx);
        const maxCardWidth = Math.max(...sortedRow.map((c) => c.cardWidth));
        const margin = Math.max(maxCardWidth * 0.25, 48);
        const absoluteMin = -margin;
        const absoluteMax = containerWidth + margin;
        const period = absoluteMax - absoluteMin;
        const wrap = gsap.utils.wrap(absoluteMin, absoluteMax);
        const duration = 30;
        const step = period / sortedRow.length;

        sortedRow.forEach(({ card, leftPx }, i) => {
          const startAbsoluteX = absoluteMin + i * step;
          const startX = startAbsoluteX - leftPx;
          gsap.set(card, { x: startX });
          gsap.to(card, {
            x: `${direction > 0 ? "+=" : "-="}${period}`,
            ease: "none",
            duration,
            repeat: -1,
            modifiers: { x: (v) => `${wrap(parseFloat(v) + leftPx) - leftPx}px` },
            onUpdate: () => {
              const currentX = Number(gsap.getProperty(card, "x"));
              const absoluteX = leftPx + currentX;
              const { top, width } = curve(absoluteX);
              card.style.top = `${top}%`;
              card.style.width = `${width}%`;
              const fadeIn = mapRange(absoluteX, absoluteMin, absoluteMin + margin, 0, 1);
              const fadeOut = mapRange(absoluteX, absoluteMax - margin, absoluteMax, 1, 0);
              card.style.opacity = `${Math.min(fadeIn, fadeOut)}`;
            },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-full overflow-hidden"
      style={{
        background:
          "linear-gradient(225deg, #051F20 0%, #163B32 0%, #366B4C 23%, #EBE4CC 55%, #336D4D 80%, #395C3F 100%)",
      }}
    >
      <div className="relative max-w-360 mx-auto px-5 lg:px-10 py-16">
        {/* Heading (mobile / tablet) */}
        <div data-reveal className="text-center lg:hidden">
          <h2 className="text-white max-w-93 font-bold leading-tight">
            <span className="block text-[32px] font-bold leading-[100%] tracking-[2%] " >
              REAL PEOPLE.
            </span>
            <span className="block mt-1 max-w-93 text-[#E7F0A3] text-[32px] font-bold leading-[100%] tracking-[2%]" >
              BETTER HEALTH.
            </span>
          </h2>
          <p className="text-white  max-w-93 mt-6 mx-auto text-[16px] font-normal leading-[100%] tracking-[2%] " >
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

        {/* Desktop: infinite carousel along the curved collage (1440×842) */}
        <div ref={desktopRef} className="hidden lg:block relative w-full aspect-1440/1024 overflow-hidden">
          <div data-reveal className="absolute left-0 right-0 top-[4.69%] z-10 text-center">
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
              data-tm-loop
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
