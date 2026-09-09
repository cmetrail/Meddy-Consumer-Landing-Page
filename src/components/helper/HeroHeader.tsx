"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { S, fluid } from "@/lib/scale";

gsap.registerPlugin(useGSAP);

const NAV_ITEMS = [
  { label: "How it works", active: true },
  { label: "WHY MEDDY", active: false },
  { label: "pHYSICIAN CARE", active: false },
  { label: "Pricing", active: false },
  { label: "FAQ", active: false },
];

export default function HeroHeader() {
  const containerRef = useRef<HTMLElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const navRef       = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(
    () => {
      gsap.fromTo([logoRef.current, navRef.current],
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power3.out" });
    },
    { scope: containerRef },
  );

  return (
    <header ref={containerRef} className="relative flex flex-row justify-between items-center max-w-360 mx-auto py-5 px-5 lg:px-20">

      {/* Logo */}
      <div ref={logoRef} style={{ opacity: 0 }}>
        <Image
          src="/app-logo.png"
          height={45}
          width={69}
          alt="Meddy Health"
          style={{ width: S(69.5), height: S(45.3) }}
        />
      </div>

      {/* Desktop nav */}
      <nav ref={navRef} className="hidden lg:flex items-center" style={{ gap: S(50), opacity: 0 }}>
        {NAV_ITEMS.map(({ label, active }) => (
          <a key={label} href="#"
            className={`relative font-semibold uppercase leading-[1.25] tracking-[0.01em] transition-colors
              ${active ? "text-white" : "text-[#C5C5C5] hover:text-white"}`}
            style={{ fontSize: fluid(20, 14) }}>
            {label}
            {active && (
              <span
                className="absolute left-0 -bottom-[calc(7px*var(--s))] border-t-2 border-dashed border-white"
                style={{ width: S(88) }}
              />
            )}
          </a>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10"
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span className={`block h-[2px] w-6 bg-white origin-center transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
        <span className={`block h-[2px] w-6 bg-white transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block h-[2px] w-6 bg-white origin-center transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
      </button>

      {/* Mobile dropdown */}
      <div className={`
        lg:hidden absolute top-full left-0 right-0 z-50
        bg-black/70 backdrop-blur-md overflow-hidden
        transition-all duration-300 ease-in-out
        ${menuOpen ? "max-h-60 py-6" : "max-h-0 py-0"}
      `}>
        <div className="flex flex-col gap-6 px-6">
          {NAV_ITEMS.map(({ label, active }) => (
            <a key={label} href="#"
              className={`${active ? "text-white" : "text-[#C5C5C5]"} font-semibold text-lg uppercase tracking-[0.01em]`}>
              {label}
            </a>
          ))}
        </div>
      </div>

    </header>
  );
}
