"use client";

import { useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import FullScreenMenu from "./FullScreenMenu";

const NAV_ITEMS = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Physician Care", href: "/physician-care" },
  { label: "WHY MEDDY", href: "/why-meddy" },
  { label: "Nutrition", href: "/nutrition" },
  { label: "Fitness", href: "/fitness" },
  { label: "Sleep", href: "/sleep" },
];

type HeaderVariant = "light" | "dark";

const VARIANTS = {
  light: {
    logo: {
      src: "/pricing/pricing-logo.svg",
      width: 44,
      height: 28,
      className: "h-[28px] w-auto",
      unoptimized: true,
    },
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
    logo: {
      src: "/meddy-logo-white.svg",
      width: 44,
      height: 28,
      className: "h-[28px] w-auto",
      unoptimized: true,
    },
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
  variant = "light",
  hideMobileConsultation = true,
}: {
  variant?: HeaderVariant;
  hideMobileConsultation?: boolean;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const logoRef = useRef<HTMLAnchorElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const v = VARIANTS[variant];

  return (
    <header className="relative mx-auto grid max-w-360 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 lg:px-10">
      {/* Logo */}
      <Link
        ref={logoRef}
        href="/"
        aria-current={pathname === "/" ? "page" : undefined}
        className="anim-fade-down focus:outline-none"
        style={{ animationDelay: "0.05s" }}
      >
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
      <nav
        aria-label="Main navigation"
        className="anim-fade-down col-start-2 hidden min-w-0 items-center justify-center xl:flex"
        style={{
          animationDelay: "0.15s",
          // Keep generous spacing even at the smallest desktop width.
          columnGap: "clamp(40px, calc(6.25vw - 40px), 50px)",
        }}
      >
        {NAV_ITEMS.map(({ label, href }) => {
          const isActive = pathname === href || pathname?.startsWith(`${href}/`);
          return (
            <Link
              key={label}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`group relative whitespace-nowrap text-base leading-tight tracking-[0.01em] uppercase transition-colors
                ${isActive ? v.linkActive : v.linkInactive}`}
            >
              {label}
              <span
                className={`absolute left-0 -bottom-2 w-full border-t-2 border-dashed transition-opacity ${v.underline}
                  ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              />
            </Link>
          );
        })}
      </nav>

      {/* CTA + hamburger */}
      <div className="col-start-3 flex shrink-0 items-center gap-2.5">
        <Link
          href="/book-consultation"
          className={`${hideMobileConsultation ? "hidden lg:block" : ""} rounded-[22px] bg-[#FFFFFF] px-[14px] py-[10px] font-medium uppercase leading-[100%] text-[#1A231F] text-[12px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)] whitespace-nowrap sm:px-[19px] sm:py-[13px] sm:text-[14px]`}
        >
          Book Free consultation
        </Link>
        <button
          ref={menuButtonRef}
          className={`flex h-[41px] w-[53px] flex-col items-center justify-center rounded-[26px] ${v.hamburgerPill}`}
          style={{
            backdropFilter: v.hamburgerBlur,
            WebkitBackdropFilter: v.hamburgerBlur,
            backgroundColor: "rgba(255,255,255,0.02)",
            border: "1px solid #FFFFFF",
          }}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          aria-controls={menuId}
          aria-haspopup="dialog"
        >
          <span
            className={`block h-0.75 w-[31px] rounded-[2px] ${v.hamburger} origin-center transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`}
          />
          <span
            className={`mt-[3px] block h-[3px] w-[21px] rounded-[2px] ${v.hamburger} transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`mt-[3px] block h-[3px] w-[11px] rounded-[2px] ${v.hamburger} origin-center transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`}
          />
        </button>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <FullScreenMenu key="navigation" id={menuId} logoAnchor={logoRef} buttonAnchor={menuButtonRef} onClose={() => setMenuOpen(false)} />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}
