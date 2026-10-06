"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Header from "@/components/Header";

// Figma: desktop node 12593:12993 (1440 x 1024), mobile node 12722:8882 (402 x 875).
// lg+: `u` scales the 1440 frame to the viewport (fits one screen). <lg: `m` scales the 402 frame.
const u = (n: number) => `calc(${n} * var(--u))`;
// fonts/button scale with width only (never shrink because the viewport is short)
const w = (n: number) => `calc(${n} * var(--w))`;
const m = (n: number) => `calc(${n} * var(--m))`;

const ease = [0.22, 1, 0.36, 1] as const;
const A = "/weight-loss/hero";

// Serif accent gradient (Figma): linear-gradient(150deg, #FFF0D9 27%, #FFEBCD 171%)
const SERIF_GRADIENT = "linear-gradient(150deg, rgb(255, 240, 217) 27%, rgb(255, 235, 205) 171%)";

// decorative rings: [file, desktop x/y/size (1440 frame), mobile x/y/size (402 frame)]
const RINGS = [
  { src: "d-r1.svg", d: [1018, 153, 36], m: [33, 129.5, 36] },
  { src: "d-r2.svg", d: [668, 572, 63.72], m: [297, 162.5, 63.72] },
  { src: "d-r3.svg", d: [1237, 298, 51], m: [59, 708.5, 51] },
] as const;

export default function WeightLossHeroSection() {
  return (
    <section
      id="weight-loss-hero"
      className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-[#101010] lg:h-[calc(1024*var(--u))] lg:min-h-0"
      style={
        {
          "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000976562))",
          "--w": "calc(min(100vw, 1440px) * 0.000694444)",
          "--m": "calc(min(100vw, 500px) / 402)",
        } as React.CSSProperties
      }
    >
      {/* Mobile green base (Figma "Medication bg") */}
      <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(171deg, #517B5F 3.2%, #A4D2BC 96.8%)" }} />

      {/* Desktop: full-bleed photo */}
      <Image src={`${A}/d-bg.png`} alt="" fill priority sizes="100vw" className="hidden object-cover lg:block" />

      {/* Mobile: photo box 1234 x 875 pinned to the right edge, then a 20% black wash */}
      <div className="absolute right-0 top-0 overflow-hidden lg:hidden" style={{ width: m(1234), height: m(875) }}>
        <Image src={`${A}/d-bg.png`} alt="" fill priority sizes="1234px" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/20 lg:hidden" />

      {/* Decorative rings — desktop (1440 frame, centred) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden lg:block">
        <div className="absolute top-0 h-full" style={{ left: `calc(50% - ${u(720)})`, width: u(1440) }}>
          {RINGS.map((r) => (
            <Image key={r.src} src={`${A}/${r.src}`} alt="" width={64} height={64} unoptimized className="absolute max-w-none" style={{ left: u(r.d[0]), top: u(r.d[1]), width: u(r.d[2]), height: u(r.d[2]) }} />
          ))}
        </div>
      </div>

      {/* Decorative rings — mobile (402 frame, left aligned to the 500 cap) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 lg:hidden">
        <div className="relative mx-auto h-full max-w-[500px]">
          {RINGS.map((r) => (
            <Image key={r.src} src={`${A}/${r.src}`} alt="" width={64} height={64} unoptimized className="absolute max-w-none" style={{ left: m(r.m[0]), top: m(r.m[1]), width: m(r.m[2]), height: m(r.m[2]) }} />
          ))}
        </div>
      </div>

      {/* Header: same spacing as the other pages */}
      <div className="relative z-30">
        <Header variant="dark" active="Weight Loss" />
      </div>

      {/* Content: vertically centred between the nav and the 120px bottom padding */}
      <div className="relative z-20 mx-auto flex w-full max-w-360 flex-1 flex-col justify-center px-5 pb-[var(--pbm)] pt-[var(--ptm)] lg:px-10 lg:pb-[var(--pb)] lg:pt-0" style={{ ["--pb" as string]: u(120), ["--pbm" as string]: m(64), ["--ptm" as string]: m(48) } as React.CSSProperties}>
        <motion.div
          className="flex w-full max-w-[565px] flex-col"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          {/* desktop paragraph has a trailing blank line in Figma (+20px above the button); desktop sizes are fixed px (Figma): H2 56 / hero serif 64 / body 16 / button 20, 16px gaps */}
          <div className="flex flex-col gap-[var(--g48)] lg:gap-4" style={{ ["--g48" as string]: m(48) } as React.CSSProperties}>
            <h1 className="flex flex-col font-medium text-[#F4F4F5]">
              <span className="flex flex-col gap-[5px] whitespace-nowrap text-[24px] leading-[1.5] lg:gap-0 lg:text-[56px]">
                <span>Understand what&rsquo;s</span>
                <span>Actually moving your</span>
              </span>
              <span
                className="comprehensive-serif text-[44px] italic leading-[1.5] lg:text-[64px]"
                style={{ background: SERIF_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
              >
                weight.
              </span>
            </h1>

            <p className="text-[16px] font-normal leading-[1.5] text-[#E2DADA] lg:max-w-[464px] lg:pb-5 lg:leading-[normal]">
              Weight loss is more than a number on the scale. Meddy connects{" "}
              <strong className="font-bold text-[#F4F4F5]">what you eat, how you move, how you sleep, your medications, and your biomarkers</strong>
              —so you and your physician can understand what&rsquo;s working and what needs to change.
            </p>

            <Link
              href="/#how-it-works"
              className="inline-flex w-fit items-center justify-center rounded-[49px] bg-white px-[var(--px)] py-[var(--py)] text-[16px] font-normal leading-[normal] text-[#17925A] transition-opacity hover:opacity-90 lg:px-6 lg:py-4 lg:text-[20px]"
              style={{ ["--px" as string]: m(20), ["--py" as string]: m(12) } as React.CSSProperties}
            >
              Book Free Consultation
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
