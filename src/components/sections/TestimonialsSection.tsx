"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Testimonial = {
  name: string;
  age: number;
  plan: string;
  quote: string;
  image?: string;
  initials: string;
  color: string;
};

const TESTIMONIALS: Testimonial[] = [
  { name: "Maya", age: 34, plan: "Meddy care", quote: "I finally understood why I wasn't recovering.", image: "/home/testimonial-maya.jpg", initials: "M", color: "#366B4C" },
  { name: "Sarah", age: 21, plan: "Meddy complete", quote: "I stopped guessing what I should eat.", image: "/home/testimonial-sarah.jpg", initials: "S", color: "#1D3A1D" },
  { name: "Mack", age: 24, plan: "Meddy complete", quote: "My workouts finally had context.", initials: "M", color: "#163B32" },
  { name: "Steve", age: 29, plan: "Meddy care", quote: "I didn't realize my sleep was affecting everything else.", initials: "S", color: "#395C3F" },
  { name: "Ted", age: 31, plan: "Meddy complete", quote: "My doctor knew what had changed before I walked in.", initials: "T", color: "#336D4D" },
  { name: "Damon", age: 67, plan: "Meddy complete", quote: "It wasn't one thing. It was the connection.", initials: "D", color: "#1A3D2B" },
];

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl shadow-lg">
      {t.image ? (
        <Image src={t.image} alt={`${t.name} testimonial`} fill className="object-cover" />
      ) : (
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${t.color}, #0c0c0c)` }} />
      )}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(115,115,115,0) 26%, rgba(12,12,12,1) 97%)" }}
      />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="block text-[#E4E4E4] leading-none" style={{ fontSize: 40 }}>“</span>
        <p className="text-white font-medium leading-snug -mt-2" style={{ fontSize: 15 }}>{t.quote}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-white font-medium uppercase" style={{ fontSize: 13 }}>
            {t.name} <span className="text-white/60">· {t.age}</span>
          </p>
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-white/90 uppercase" style={{ fontSize: 10 }}>
            {t.plan}
          </span>
        </div>
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
          "linear-gradient(225deg, #051F20 0%, #163B32 0%, #366B4C 23%, #EBE4CC 55%, #336D4D 80%, #395C3F 100%)",
      }}
    >
      <div className="max-w-360 mx-auto px-6 lg:px-13 py-20 lg:py-28">
        <div data-reveal className="text-center">
          <h2 className="text-white font-bold" style={{ fontSize: 32 }}>
            Real people. <span className="text-[#E7F0A3]">Better health.</span>
          </h2>
          <p className="text-white mt-3 mx-auto max-w-xl" style={{ fontSize: 16 }}>
            See how connected care can change the way you understand your health.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} data-reveal>
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
