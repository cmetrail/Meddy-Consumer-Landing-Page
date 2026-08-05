"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

export default function HeroHeader() {
  const containerRef = useRef<HTMLElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const navRef       = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from([logoRef.current, navRef.current], {
        y: -60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <header
      ref={containerRef}
      className="flex flex-row justify-between items-center max-w-360 mx-auto px-13 py-8"
    >
      {/* Logo */}
      <div ref={logoRef}>
        <Image src="/app-logo.png" height={45} width={69} alt="Meddy Health" />
      </div>

      {/* Nav */}
      <nav ref={navRef} className="flex items-center gap-12.5">

        {/* HOW IT WORKS — active: white + dashed underline */}
        <a
          href="#"
          className="relative text-white font-semibold text-xl uppercase leading-none tracking-[0.01em]
            after:content-[''] after:absolute after:left-0 after:-bottom-1.75
            after:w-22 after:border-t-2 after:border-dashed after:border-white"
        >
          How it works
        </a>

        <a
          href="#"
          className="text-[#C5C5C5] font-semibold text-xl uppercase leading-none tracking-[0.01em] hover:text-white transition-colors"
        >
          Pricing
        </a>

        <a
          href="#"
          className="text-[#C5C5C5] font-semibold text-xl uppercase leading-none tracking-[0.01em] hover:text-white transition-colors"
        >
          For Physicians
        </a>

      </nav>
    </header>
  );
}
