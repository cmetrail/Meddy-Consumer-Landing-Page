"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-reveal className={className}>
      {children}
    </div>
  );
}

function CaloriesCard() {
  return (
    <div
      className="h-full rounded-xl p-6 shadow-[6px_8px_8px_rgba(0,0,0,0.2)]"
      style={{ background: "linear-gradient(150deg, #1A3D2B 0%, #1E4A33 50%, #163322 100%)" }}
    >
      <p className="text-[#6EE7A0] font-semibold uppercase tracking-[0.02em]" style={{ fontSize: 13 }}>
        Calories today
      </p>
      <p className="mt-2 text-white font-medium" style={{ fontSize: 48 }}>
        1,240 <span className="text-white/70 text-lg font-normal">kcal</span>
      </p>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {[
          { k: "Steps", v: "6,842" },
          { k: "Burned", v: "320" },
          { k: "Net", v: "920" },
        ].map(({ k, v }) => (
          <div key={k} className="rounded-lg bg-white/10 p-2.5 text-center">
            <p className="text-white font-semibold" style={{ fontSize: 15 }}>{v}</p>
            <p className="text-white/60 uppercase" style={{ fontSize: 10 }}>{k}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function NutrientsCard() {
  return (
    <div className="h-full rounded-xl bg-white p-6 shadow-md">
      <p className="text-[#18181B] font-semibold" style={{ fontSize: 15 }}>Nutrients</p>
      {[
        { label: "Protein", pct: 40, color: "#E09A2A" },
        { label: "Fat", pct: 30, color: "#8A8A82" },
        { label: "Carbs", pct: 30, color: "#17925A" },
      ].map((n) => (
        <div key={n.label} className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-[#18181B]/80" style={{ fontSize: 13 }}>{n.label}</span>
            <span className="text-[#18181B]/60" style={{ fontSize: 12 }}>{n.pct}%</span>
          </div>
          <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-[#F0F0F0]">
            <div className="h-full rounded-full" style={{ width: `${n.pct}%`, background: n.color }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function PhotoCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-full min-h-[220px] overflow-hidden rounded-xl shadow-md">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  );
}

export default function MostCareSection() {
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
    <section ref={sectionRef} className="relative w-full bg-[#F2EEE3] overflow-hidden">
      <div className="max-w-360 mx-auto px-6 lg:px-13 py-20 lg:py-28">
        {/* Central statement */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[#228755] uppercase tracking-[0.02em]" style={{ fontSize: 20 }}>
            Always on-care
          </p>
          <p className="text-[#7B7B7B] font-medium mt-4" style={{ fontSize: 32 }}>
            Most care happens in 15-minute visits.
          </p>
          <p className="text-[#363636] font-semibold mt-1" style={{ fontSize: 36 }}>
            Meddy happens everyday
          </p>
        </Reveal>

        {/* Bento collage */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-4">
          <Reveal className="col-span-2 md:col-span-1">
            <CaloriesCard />
          </Reveal>
          <Reveal className="md:row-span-2">
            <PhotoCard src="/home/sleep-card.jpg" alt="Sleep score card" />
          </Reveal>
          <Reveal>
            <NutrientsCard />
          </Reveal>
          <Reveal>
            <PhotoCard src="/home/meal-card.jpg" alt="Meal tracking card" />
          </Reveal>
          <Reveal className="md:row-span-2">
            <PhotoCard src="/home/a1c-card.jpg" alt="A1c trend card" />
          </Reveal>
          <Reveal className="col-span-2 md:col-span-1">
            <PhotoCard src="/home/strength-card.jpg" alt="Strength training card" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
