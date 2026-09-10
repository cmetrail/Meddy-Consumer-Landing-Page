"use client";

import { useState } from "react";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "How it works", href: "/", active: true },
  { label: "WHY MEDDY", href: "/", active: false },
  { label: "pHYSICIAN CARE", href: "/", active: false },
  { label: "Pricing", href: "/pricing", active: false },
  { label: "FAQ", href: "/", active: false },
];

export default function HeroHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative flex flex-row justify-between items-center max-w-360 mx-auto py-5 px-5 lg:px-10">

      {/* Logo */}
      <div className="anim-fade-down" style={{ animationDelay: "0.05s" }}>
        <Image
          src="/app-logo.png"
          height={45}
          width={69}
          alt="Meddy Health"
        />
      </div>

      {/* Desktop nav */}
      <nav className="anim-fade-down hidden lg:flex items-center lg:gap-12.5 gap-4" style={{ animationDelay: "0.15s" }}>
        {NAV_ITEMS.map(({ label, href, active }) => (
          <a key={label} href={href}
            className={`group relative font-semibold uppercase text-xl leading-tight tracking-[0.01em] transition-colors
              ${active ? "text-white" : "text-[#C5C5C5] hover:text-white"}`}
          >
            {label}
            <span
              className={`absolute left-0 bottom-[calc(-7px*var(--s))] w-[60%] border-t-2 border-dashed border-white transition-opacity
                ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            />
          </a>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden flex flex-col justify-center items-center gap-1.25 w-10 h-10"
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
          {NAV_ITEMS.map(({ label, href, active }) => (
            <a key={label} href={href}
              className={`${active ? "text-white" : "text-[#C5C5C5]"} font-semibold text-lg uppercase tracking-[0.01em]`}>
              {label}
            </a>
          ))}
        </div>
      </div>

    </header>
  );
}
