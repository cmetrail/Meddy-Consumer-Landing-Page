"use client";

import Image from "next/image";
import Link from "next/link";

type BreadthCard = {
  label: string;
  src: string;
  // lg+: Figma position (x, y, w, h of the image box) inside the 1290 x 1234 grid
  x: number;
  y: number;
  w: number;
  h: number;
};

const CARDS: BreadthCard[] = [
  { label: "Heart", src: "/biomarkers/breadth/heart.png", x: 89, y: 0, w: 207.5, h: 198 },
  { label: "Thyroid", src: "/biomarkers/breadth/thyroid.png", x: 312.5, y: 0, w: 207.5, h: 198 },
  { label: "Cancer", src: "/biomarkers/breadth/cancer.png", x: 536, y: 0, w: 207.5, h: 194 },
  { label: "Autoimmunity", src: "/biomarkers/breadth/autoimmunity-rect.png", x: 993.5, y: 0, w: 207.5, h: 198 },
  { label: "Immune Regulation", src: "/biomarkers/breadth/immune-regulation.png", x: 89, y: 252, w: 218, h: 198 },
  { label: "Male Health", src: "/biomarkers/breadth/male-health.png", x: 540.2, y: 250, w: 209.6, h: 198 },
  { label: "Female Health", src: "/biomarkers/breadth/female-health.png", x: 765.8, y: 252, w: 209.6, h: 198 },
  { label: "Metabolic", src: "/biomarkers/breadth/metabolic.png", x: 991.4, y: 250, w: 209.6, h: 202 },
  { label: "Liver", src: "/biomarkers/breadth/liver.png", x: 0.5, y: 500, w: 197, h: 198 },
  { label: "Biological Age", src: "/biomarkers/breadth/biological-age.png", x: 213.5, y: 500, w: 197, h: 198 },
  { label: "Nutrients", src: "/biomarkers/breadth/nutrients.png", x: 873.5, y: 500, w: 197, h: 198 },
  { label: "Stress & Aging", src: "/biomarkers/breadth/stress-aging.png", x: 1086.5, y: 500, w: 203, h: 198 },
  { label: "Electrolytes", src: "/biomarkers/breadth/electrolytes.png", x: 0, y: 750, w: 197, h: 198 },
  { label: "Kidneys", src: "/biomarkers/breadth/kidneys.png", x: 437.2, y: 750, w: 197, h: 198 },
  { label: "Pancreas", src: "/biomarkers/breadth/pancreas.png", x: 655.8, y: 750, w: 197, h: 198 },
  { label: "Brain Health", src: "/biomarkers/breadth/brain-health.png", x: 1093, y: 750, w: 197, h: 198 },
  { label: "Gut", src: "/biomarkers/breadth/gut.png", x: 227, y: 1000, w: 197, h: 198 },
  { label: "Infections", src: "/biomarkers/breadth/infections.png", x: 653, y: 1000, w: 197, h: 198 },
  { label: "MRI & CT Scans", src: "/biomarkers/breadth/mri-ct.png", x: 866, y: 1000, w: 197, h: 198 },
];

// lg+: Figma node 11264:9660 (1440 wide) scaled by --u (width only, the section is taller than a screen)
const u = (n: number) => `calc(${n} * var(--u))`;

function Label({ children }: { children: string }) {
  return (
    <span className="text-center text-[15px] leading-[1.416] text-[#111110] sm:text-[18px] lg:whitespace-nowrap lg:text-[length:max(11px,var(--d))]" style={{ ["--d" as string]: u(20) }}>
      {children}
    </span>
  );
}

function CardImage({ label, src, sizes }: { label: string; src: string; sizes: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-[#17925A] bg-[#FDFAF3]">
      <Image src={src} alt={label} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export default function BiomarkersBreadthSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-white py-[80px] lg:py-[calc(120*var(--u))]"
      style={{ "--u": "calc(min(100vw, 1440px) * 0.000694444)" } as React.CSSProperties}
    >
      <div className="mx-auto flex w-full max-w-360 flex-col items-center gap-[48px] px-5 lg:gap-[var(--g48)] lg:px-10" style={{ ["--g48" as string]: u(48) }}>
        {/* Header */}
        <div className="flex flex-col items-center">
          <h2
            className="font-medium uppercase leading-[1.416] text-[#81A972] text-[48px] sm:text-[64px] lg:text-[length:max(48px,var(--d))]"
            style={{ ["--d" as string]: u(100) }}
          >
            Breadth
          </h2>
          <p
            className="uppercase leading-[1.416] text-[#46524B] text-[16px] sm:text-[18px] lg:text-[length:max(13px,var(--d))]"
            style={{ ["--d" as string]: u(20) }}
          >
            See more of your health
          </p>
        </div>

        {/* mobile / tablet: wrapped grid */}
        <div className="flex flex-wrap items-start justify-center gap-x-4 gap-y-10 lg:hidden">
          {CARDS.map((c) => (
            <div key={c.label} className="flex w-[150px] flex-col items-center gap-2 sm:w-[180px]">
              <div className="relative aspect-square w-full">
                <CardImage label={c.label} src={c.src} sizes="180px" />
              </div>
              <Label>{c.label}</Label>
            </div>
          ))}
          <p className="w-full text-center leading-[1.416] text-[#111110] text-[24px] sm:text-[28px]">
            One connected view
            <br />
            of your <span className="comprehensive-serif italic text-[#17925A]">biomarkers</span>.
          </p>
        </div>

        {/* lg+: Figma placement */}
        <div className="relative hidden w-full lg:block" style={{ maxWidth: u(1290), height: u(1234) }}>
          {CARDS.map((c) => (
            <div key={c.label} className="absolute flex flex-col items-center" style={{ left: u(c.x), top: u(c.y), width: u(c.w), gap: u(8) }}>
              <div style={{ width: "100%", height: u(c.h) }}>
                <CardImage label={c.label} src={c.src} sizes="260px" />
              </div>
              <Label>{c.label}</Label>
            </div>
          ))}
          <p
            className="absolute text-center leading-[1.416] text-[#111110] lg:text-[length:max(22px,var(--d))]"
            style={{ ["--d" as string]: u(36), left: u(468), top: u(564.5), width: u(354) }}
          >
            One connected view
            <br />
            of your <span className="comprehensive-serif italic text-[#17925A]">biomarkers</span>.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/what-we-test"
          className="rounded-[35px] bg-[#17925A] px-[24px] py-[16px] text-[16px] leading-none text-white sm:text-[18px] lg:text-[length:max(15px,var(--d))]"
          style={{ ["--d" as string]: u(20) }}
        >
          Explore What We Test
        </Link>
      </div>
    </section>
  );
}
