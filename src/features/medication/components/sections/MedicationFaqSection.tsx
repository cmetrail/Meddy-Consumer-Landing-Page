"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Faq = { q: string; a: string };

const FAQS: Faq[] = [
  {
    q: "Can my Meddy physician prescribe medications?",
    a: "Yes. When clinically appropriate, your Meddy physician can prescribe and manage medications as part of your care.",
  },
  {
    q: "Can Meddy manage medications I'm already taking?",
    a: "Yes. Your Meddy physician can review the medications you're already taking and help manage them alongside your labs, health metrics, and lifestyle.",
  },
  {
    q: "Can Meddy adjust my medication dose?",
    a: "Yes. When clinically appropriate, your Meddy physician can adjust your dose and monitor how the change affects your health over time.",
  },
  {
    q: "Can Meddy show whether my medication is working?",
    a: "Yes. Meddy connects your medications with the health measures they're meant to improve, so you and your physician can see how they're working.",
  },
  {
    q: "Can my physician order labs to monitor my medication?",
    a: "Yes. Your Meddy physician can order clinically appropriate labs to monitor your medication and your overall health.",
  },
  {
    q: "What if I'm having a problem with a medication?",
    a: "Message your Meddy physician right away. They can review your symptoms, adjust your treatment, or guide you on the next steps.",
  },
  {
    q: "Can Meddy refill my prescriptions?",
    a: "Yes. Your Meddy physician can manage refills as part of your ongoing care.",
  },
  {
    q: "Does Meddy only use medications to manage health conditions?",
    a: "No. Medication is one tool. Your Meddy physician may also help with nutrition, exercise, sleep, and lifestyle changes to support your health.",
  },
];

// Figma: desktop node 11274:1408 (1440 wide, photo block from y=130), mobile node 12320:31293 (402 wide).
const u = (n: number) => `calc(${n} * var(--u))`;
const m = (n: number) => `calc(${n} * var(--m))`;

const A = "/medication/faq";

/** one accordion row; `k` maps a Figma px to screen px, `d` = desktop sizing */
function Item({ f, open, onToggle, k, d }: { f: Faq; open: boolean; onToggle: () => void; k: (n: number) => string; d: boolean }) {
  return (
    <div
      className="mt-[var(--mt)] border-b border-solid border-[#A1A1A1] pb-[var(--pb)] first:mt-0"
      style={{ ["--pb" as string]: k(open && !d ? 16 : 30), ["--mt" as string]: k(d ? 30 : 16) }}
    >
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex w-full items-center justify-between text-left" style={{ gap: k(16) }}>
        <span
          className="font-medium uppercase leading-[normal] text-white"
          style={{ fontSize: d ? `max(${open ? 18 : 15}px, ${k(open ? 24 : 20)})` : k(16) }}
        >
          {f.q}
        </span>
        <Image
          src={`${A}/${open ? "minus" : "plus"}.svg`}
          alt=""
          width={14}
          height={14}
          unoptimized
          className="shrink-0"
          style={{ width: k(14), height: open ? k(2) : k(14) }}
        />
      </button>
      <div className="grid transition-[grid-template-rows] duration-300 ease-out" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className={`pt-[var(--pt)] leading-[normal] text-white ${d ? "font-medium" : "font-normal"}`} style={{ ["--pt" as string]: k(15), fontSize: d ? `max(12px, ${k(14)})` : k(14) }}>
            {f.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function MedicationFaqSection() {
  const [open, setOpen] = useState<number>(0);
  const toggle = (i: number) => setOpen(open === i ? -1 : i);
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
      id="faq"
      className="relative overflow-hidden bg-[#FFFEF2]"
      style={
        {
          "--u": "calc(min(100vw, 1440px) * 0.000694444)",
          "--m": "calc(min(100vw, 500px) / 402)",
        } as React.CSSProperties
      }
    >
      {/* Desktop (lg+): dark photo block starts 130 below the top; "faq" lettering straddles the edge */}
      <div className="relative hidden lg:block">
        <div style={{ height: u(130) }} />
        <div className="relative bg-[#0d1f16] text-white">
          <Image src={`${A}/d-bg.png`} alt="" fill sizes="100vw" className="object-cover" />
          <div className="relative z-10">
            <div className="mx-auto max-w-360 px-10">
              <div className="relative pt-[var(--pt)]" style={{ ["--pt" as string]: u(201) }}>
                {/* FAQ list, right edge on the header container */}
                <div className="ml-auto" style={{ width: u(719) }}>
                  <div>
                    {FAQS.map((f, i) => (
                      <Item key={f.q} f={f} open={open === i} onToggle={() => toggle(i)} k={u} d />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ height: u(111) }} />
            </div>
            <FooterItems noTopMargin />
          </div>
        </div>
        {/* lettering */}
        <div className="pointer-events-none absolute z-20" style={{ left: `calc(max(0px, (100% - 90rem) / 2) + 2.5rem + ${u(36)})`, top: u(26), width: u(550) }}>
          <Image src={`${A}/faq.svg`} alt="faq" width={222} height={124} unoptimized className="block w-full" priority />
        </div>
      </div>

      {/* Mobile / tablet (<lg): lettering, then the list over the photo */}
      <div className="relative mx-auto max-w-[500px] lg:hidden" style={{ ["--p" as string]: m(20) } as React.CSSProperties}>
        <div className="absolute inset-y-0 -z-0" style={{ left: "calc(50% - 50vw)", right: "calc(50% - 50vw)" }}>
          <Image src={`${A}/m-bg.png`} alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="relative flex flex-col items-center px-[var(--p)] py-[var(--p64)] text-white" style={{ ["--p64" as string]: m(64), gap: m(48) } as React.CSSProperties}>
          <Image src={`${A}/faq.svg`} alt="faq" width={222} height={124} unoptimized style={{ width: m(220), height: "auto" }} />
          <div className="w-full">
            {FAQS.map((f, i) => (
              <Item key={f.q} f={f} open={open === i} onToggle={() => toggle(i)} k={m} d={false} />
            ))}
          </div>
        </div>
      </div>
      <div className="relative bg-[#0d1f16] text-white lg:hidden">
        <FooterItems noTopMargin />
      </div>
    </section>
  );
}
