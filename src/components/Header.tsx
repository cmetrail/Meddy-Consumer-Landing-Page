"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_ITEMS = [
  { label: "How it works", href: "/" },
  { label: "WHY MEDDY", href: "/" },
  { label: "pHYSICIAN CARE", href: "/physician-care" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/" },
];

type HeaderVariant = "light" | "dark";

const VARIANTS = {
  light: {
    logo: { src: "/pricing/pricing-logo.svg", width: 55, height: 34, className: "h-[45px] w-auto", unoptimized: true },
    linkActive: "font-semibold text-[#2A7653]",
    linkInactive: "font-medium text-[#6E7A72] hover:text-[#2A7653]",
    underline: "border-[#2A7653]",
    hamburger: "bg-[#2A7653]",
    dropdown: "bg-[#F1E7D5]/95",
    dropdownLinkActive: "font-semibold text-[#2A7653]",
    dropdownLinkInactive: "font-medium text-[#6E7A72]",
  },
  dark: {
    logo: { src: "/app-logo.png", width: 69, height: 45, className: "h-[45px] w-auto", unoptimized: false },
    linkActive: "text-white",
    linkInactive: "text-[#C5C5C5] hover:text-white",
    underline: "border-white",
    hamburger: "bg-white",
    dropdown: "bg-black/70",
    dropdownLinkActive: "text-white",
    dropdownLinkInactive: "text-[#C5C5C5]",
  },
} as const;

export default function Header({
  active = "Pricing",
  variant = "light",
}: {
  active?: string;
  variant?: HeaderVariant;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const v = VARIANTS[variant];

  return (
    <header className="relative flex flex-row justify-between items-center max-w-360 mx-auto py-5 px-5 lg:px-10">
      {/* Logo */}
      <Link href="/" className="anim-fade-down focus:outline-none" style={{ animationDelay: "0.05s" }}>
        <Image
          src={v.logo.src}
          alt="Meddy Health"
          width={v.logo.width}
          height={v.logo.height}
          unoptimized={v.logo.unoptimized}
          className={v.logo.className}
        />
      </Link>

      {/* Desktop nav */}
      <nav className="anim-fade-down hidden lg:flex items-center lg:gap-12.5 gap-4" style={{ animationDelay: "0.15s" }}>
        {NAV_ITEMS.map(({ label, href }) => {
          const isActive = label === active;
          return (
            <Link key={label} href={href}
              className={`group relative text-xl leading-tight tracking-[0.01em] uppercase transition-colors
                ${isActive ? v.linkActive : v.linkInactive}`}
            >
              {label}
              <span
                className={`absolute left-0 -bottom-2 w-[60%] border-t-2 border-dashed transition-opacity ${v.underline}
                  ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden flex flex-col justify-center items-center gap-1.25 w-10 h-10"
        onClick={() => setMenuOpen(v => !v)}
        aria-label="Toggle menu"
      >
        <span className={`block h-[2px] w-6 ${v.hamburger} origin-center transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
        <span className={`block h-[2px] w-6 ${v.hamburger} transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
        <span className={`block h-[2px] w-6 ${v.hamburger} origin-center transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
      </button>

      {/* Mobile dropdown */}
      <div className={`
        lg:hidden absolute top-full left-0 right-0 z-50
        ${v.dropdown} backdrop-blur-md overflow-hidden
        transition-all duration-300 ease-in-out
        ${menuOpen ? "max-h-60 py-6" : "max-h-0 py-0"}
      `}>
        <div className="flex flex-col gap-6 px-6">
          {NAV_ITEMS.map(({ label, href }) => {
            const isActive = label === active;
            return (
              <Link key={label} href={href}
                className={`${isActive ? v.dropdownLinkActive : v.dropdownLinkInactive} text-lg uppercase tracking-[0.01em]`}>
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
