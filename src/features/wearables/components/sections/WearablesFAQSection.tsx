"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FAQS = [
  {
    q: "Which wearables does Meddy support?",
    a: "Meddy currently supports health data from Apple Health, Apple Watch, Oura Ring, Google Pixel Watch, and Fitbit. Additional integrations are planned over time.",
  },
  {
    q: "Do I need a wearable to use Meddy?",
    a: "No. Meddy works with the health data you already have. Connecting a wearable simply adds richer activity, sleep, heart rate, and recovery signals.",
  },
  {
    q: "What information can Meddy get from my wearable?",
    a: "Depending on your device, Meddy can bring activity, workouts, heart rate, sleep, HRV, and recovery metrics into your health picture.",
  },
  {
    q: "Can Meddy combine data from my wearable with my other health information?",
    a: "Yes. Meddy brings your wearable data together with your nutrition, weight, labs, medications, and medical history in one place.",
  },
  {
    q: "Can my physician see my wearable data?",
    a: "Yes. Your physician can see your wearable data alongside the rest of your health history so it can help inform your care.",
  },
  {
    q: "Does Meddy replace the app that came with my wearable?",
    a: "No. Keep using your device's own app. Meddy connects to it and adds clinical context to what it measures.",
  },
  {
    q: "Will Meddy support more devices?",
    a: "Yes. Additional integrations are planned over time.",
  },
  {
    q: "Who can see my wearable data?",
    a: "Only you and your Meddy care team, in line with your privacy settings.",
  },
  {
    q: "Is my data protected under HIPAA?",
    a: "Yes. Meddy protects your health information in accordance with HIPAA.",
  },
  {
    q: "Can I disconnect my wearable or delete my data?",
    a: "Yes. You can disconnect your device or delete your data at any time.",
  },
  {
    q: "Does connecting a wearable cost extra?",
    a: "No. Connecting your wearable is included at no additional cost.",
  },
];

export default function WearablesFAQSection() {
  const [open, setOpen] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () =>
      desktopMotion(() => {
        gsap.utils
          .toArray<HTMLElement>("[data-reveal]", sectionRef.current)
          .forEach((el) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 40 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top bottom", once: true },
              },
            );
          });

        const nav = sectionRef.current?.querySelector("[data-footer-nav]");
        if (nav) {
          const cols = nav.querySelectorAll<HTMLElement>("[data-footer-col]");
          const ftl = gsap.timeline({
            scrollTrigger: {
              trigger: nav,
              start: "top 92%",
              end: "top 55%",
              scrub: true,
            },
          });
          cols.forEach((el, i) => {
            ftl.fromTo(
              el,
              { opacity: 0, y: 40 },
              { opacity: 1, y: 0, ease: "none" },
              i * 0.2,
            );
          });
        }
      }),
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(to right, #151f21 9.479%, #1e2c35 112.39%)",
      }}
    >
      {/* Decorative pattern + person photo (accurate Figma coords, 1440 canvas) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden max-w-360 lg:block">
        <Image
          src="/wearables/faq-pattern.svg"
          alt=""
          width={1203}
          height={1037}
          className="absolute left-[382px] top-[-12px] h-auto w-[1203px] max-w-none mix-blend-overlay"
        />
        {/* Figma: 1605px box, photo (1186.555px square) rotated -28.03deg and centred in it */}
        <div className="absolute flex items-center justify-center" style={{ left: 468.57, top: -139.84, width: 1605.011, height: 1605.011 }}>
          <div className="relative" style={{ width: 1186.555, height: 1186.555, rotate: "-28.03deg" }}>
            <Image src="/wearables/faq-person.png" alt="" fill priority sizes="1187px" className="max-w-none object-cover" />
          </div>
        </div>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 mx-auto w-full max-w-360 px-5 pb-16 pt-12 md:px-10 md:pt-16 lg:px-[78px] lg:pt-[93px]">
        <h2 className="text-[40px] font-medium uppercase leading-[1.1] text-white sm:text-[52px] lg:text-[64px]">
          FAQ
        </h2>

        <div className="mt-8 flex flex-col lg:mt-[56px] lg:max-w-[719px]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-[#585858]">
                <div className="py-[16px] lg:py-[30px]">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span
                      className={`font-medium uppercase leading-[1.3] text-[#F5F5F5] ${
                        isOpen
                          ? "text-[18px] lg:text-[24px]"
                          : "text-[16px] lg:text-[20px]"
                      }`}
                    >
                      {f.q}
                    </span>
                    <Plus
                      className={`h-[14px] w-[14px] shrink-0 text-[#F5F5F5] transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-[15px] text-[14px] font-medium leading-[1.5] text-[#919191]">
                      {f.a}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer (shared) */}
      <div className="relative z-10">
        <FooterItems />
      </div>
    </section>
  );
}
