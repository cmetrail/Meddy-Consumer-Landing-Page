"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

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
    <header ref={containerRef} className="relative flex flex-row justify-between items-center max-w-360 mx-auto px-[clamp(16px,5.21vw,75px)] pt-[clamp(24px,4.72vw,68px)] pb-4">

      {/* Logo */}
      <div ref={logoRef} style={{ opacity: 0 }}>
        <Image src="/app-logo.png" height={45} width={69} alt="Meddy Health" />
      </div>

      {/* Desktop nav */}
      <nav ref={navRef} className="hidden lg:flex items-center gap-[clamp(24px,3.47vw,50px)]" style={{ opacity: 0 }}>
        {[
          { label: "How it works", active: true },
          { label: "Pricing", active: false },
          { label: "For Physicians", active: false },
        ].map(({ label, active }) => (
          <a key={label} href="#"
            className={`relative font-semibold uppercase leading-none tracking-[0.01em] text-[clamp(14px,1.39vw,20px)] transition-colors
              ${active
                ? "text-white after:content-[''] after:absolute after:left-0 after:-bottom-1.75 after:w-[88px] after:border-t-2 after:border-dashed after:border-white"
                : "text-[#C5C5C5] hover:text-white"}`}>
            {label}
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
          <a href="#" className="text-white font-semibold text-lg uppercase tracking-[0.01em]">How it works</a>
          <a href="#" className="text-[#C5C5C5] font-semibold text-lg uppercase tracking-[0.01em]">Pricing</a>
          <a href="#" className="text-[#C5C5C5] font-semibold text-lg uppercase tracking-[0.01em]">For Physicians</a>
        </div>
      </div>

    </header>
  );
}
