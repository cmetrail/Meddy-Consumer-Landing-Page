"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

const NAV_ITEMS = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Physician Care", href: "/physician-care" },
  { label: "WHY MEDDY", href: "/why-meddy" },
  { label: "Nutrition", href: "/#how-it-works" },
  { label: "Sleep", href: "/#how-it-works" },
];

type HeaderVariant = "light" | "dark";

const VARIANTS = {
  light: {
    logo: { src: "/pricing/pricing-logo.svg", width: 44, height: 28, className: "h-[28px] w-auto", unoptimized: true },
    linkActive: "font-semibold text-[#17925A]",
    linkInactive: "font-medium text-[#6E7A72] hover:text-[#17925A]",
    underline: "border-[#17925A]",
    hamburger: "bg-[#17925A]",
    hamburgerPill: "bg-black/[0.03]",
    hamburgerBlur: "blur(14px)",
    dropdown: "bg-[#F1E7D5]/95",
    dropdownLinkActive: "font-semibold text-[#17925A]",
    dropdownLinkInactive: "font-medium text-[#6E7A72]",
  },
  dark: {
    logo: { src: "/meddy-logo-white.svg", width: 44, height: 28, className: "h-[28px] w-auto", unoptimized: true },
    linkActive: "text-white",
    linkInactive: "text-[#E6DEDE] hover:text-white",
    underline: "border-white",
    hamburger: "bg-[#F4F4F4]",
    hamburgerPill: "bg-white/[0.02]",
    hamburgerBlur: "blur(14px)",
    dropdown: "bg-black/70",
    dropdownLinkActive: "text-white",
    dropdownLinkInactive: "text-[#E6DEDE]",
  },
} as const;

export default function Header({
  active = "How it works",
  variant = "light",
}: {
  active?: string;
  variant?: HeaderVariant;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const v = VARIANTS[variant];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [menuOpen]);

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
      <nav className="anim-fade-down absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center lg:gap-12.5 gap-4" style={{ animationDelay: "0.15s" }}>
        {NAV_ITEMS.map(({ label, href }) => {
          const isActive = label === active;
          return (
            <Link key={label} href={href}
              className={`group relative whitespace-nowrap text-base leading-tight tracking-[0.01em] uppercase transition-colors
                ${isActive ? v.linkActive : v.linkInactive}`}
            >
              {label}
              <span
                className={`absolute left-0 -bottom-2 w-[64px] border-t-2 border-dashed transition-opacity ${v.underline}
                  ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              />
            </Link>
          );
        })}
      </nav>

      {/* CTA + hamburger */}
      <div className="flex items-center gap-2.5">
        <Link
          href="/#how-it-works"
          className="hidden sm:block rounded-[22px] bg-[#17925A] px-[19px] py-[13px] font-medium uppercase leading-[100%] text-white text-[14px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)]"
        >
          Book Free consultation
        </Link>
        <button
          className={`flex flex-col justify-center items-center rounded-[26px] h-[41px] w-[53px] ${v.hamburgerPill}`}
          style={{ backdropFilter: v.hamburgerBlur, WebkitBackdropFilter: v.hamburgerBlur, backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid #17925A" }}
          onClick={() => {
            if (window.matchMedia("(min-width: 1024px)").matches) return;
            setMenuOpen(v => !v);
          }}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.75 w-[31px] rounded-[2px] ${v.hamburger} origin-center transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`mt-[3px] block h-[3px] w-[21px] rounded-[2px] ${v.hamburger} transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`mt-[3px] block h-[3px] w-[11px] rounded-[2px] ${v.hamburger} origin-center transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile full-screen menu */}
      {menuOpen &&
        mounted &&
        createPortal(
          <div className="fixed inset-0 z-[999999] flex flex-col bg-[#17925A]">
            <div className="mx-auto flex w-full max-w-360 items-center justify-between px-5 py-5 lg:px-10">
              <Link href="/" onClick={() => setMenuOpen(false)} className="focus:outline-none">
                <Image
                  src="/meddy-logo-white.svg"
                  alt="Meddy Health"
                  width={44}
                  height={28}
                  unoptimized
                  className="h-[28px] w-auto"
                />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              >
                <X size={26} className="text-white" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col items-stretch justify-center gap-8 px-6">
              {NAV_ITEMS.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center text-2xl font-semibold uppercase tracking-[0.02em] text-white transition-opacity hover:opacity-80"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>,
          document.body,
        )}
    </header>
  );
}
