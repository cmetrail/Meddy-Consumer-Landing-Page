"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "How it works", href: "/", active: false },
  { label: "WHY MEDDY", href: "/", active: false },
  { label: "pHYSICIAN CARE", href: "/", active: false },
  { label: "Pricing", href: "/pricing", active: true },
  { label: "FAQ", href: "/", active: false },
];

export default function PricingHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative flex flex-row justify-between items-center max-w-360 mx-auto py-5 px-5 lg:px-10">
      {/* Logo */}
      <Link href="/" className="anim-fade-down focus:outline-none" style={{ animationDelay: "0.05s" }}>
        <Image
          src="/pricing/pricing-logo.svg"
          alt="Meddy Health"
          width={55}
          height={34}
          unoptimized
          className="h-[45px] w-auto"
        />
      </Link>

      {/* Desktop nav */}
      <nav className="anim-fade-down hidden lg:flex items-center lg:gap-12.5 gap-4" style={{ animationDelay: "0.15s" }}>
        {NAV_ITEMS.map(({ label, href, active }) => (
          <Link key={label} href={href}
            className={`group relative text-xl leading-tight tracking-[0.01em] uppercase transition-colors
              ${active ? "font-semibold text-[#2A7653]" : "font-medium text-[#6E7A72] hover:text-[#2A7653]"}`}
          >
            {label}
            <span
              className={`absolute left-0 -bottom-2 w-[60%] border-t-2 border-dashed border-[#2A7653] transition-opacity
                ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
            />
          </Link>
        ))}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden flex flex-col justify-center items-center gap-1.25 w-10 h-10"
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span className={`block h-[2px] w-6 bg-[#2A7653] origin-center transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
        <span className={`block h-[2px] w-6 bg-[#2A7653] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block h-[2px] w-6 bg-[#2A7653] origin-center transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
      </button>

      {/* Mobile dropdown */}
      <div className={`
        lg:hidden absolute top-full left-0 right-0 z-50
        bg-[#F1E7D5]/95 backdrop-blur-md overflow-hidden
        transition-all duration-300 ease-in-out
        ${menuOpen ? "max-h-60 py-6" : "max-h-0 py-0"}
      `}>
        <div className="flex flex-col gap-6 px-6">
          {NAV_ITEMS.map(({ label, href, active }) => (
            <Link key={label} href={href}
              className={`${active ? "font-semibold text-[#2A7653]" : "font-medium text-[#6E7A72]"} text-lg uppercase tracking-[0.01em]`}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
