"use client";

import { useLayoutEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useIsPresent, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { getLenis } from "@/lib/lenis";
import styles from "./FullScreenMenu.module.css";

const COLUMNS = [
  [
    { label: "Physician Care", href: "/physician-care" },
    { label: "Personalized health plans", href: "/personalized-health-plans" },
    { label: "Medication management", href: "/medication" },
    { label: "Longevity and preventive health", href: "/longevity" },
  ],
  [
    { label: "Labs and biomarkers tracking", href: "/biomarkers" },
    { label: "What We Test", href: "/what-we-test" },
    { label: "Weight loss & metabolic", href: "/weight-loss" },
    { label: "Wearables & health data", href: "/wearables" },
    { label: "24/7 Primary care access", href: "/247-care" },
  ],
];

const EASE = [0.22, 1, 0.36, 1] as const;
const CLOSED = "inset(0% 0% 100% 0%)";
const OPEN = "inset(0% 0% 0% 0%)";

const DEFAULT_PREVIEW = {
  src: "/personalized-health-plans/hero/photo.png",
  title: "More life. More you.",
  description: "Personal care. A lasting connection.",
};

const PREVIEWS: Record<string, typeof DEFAULT_PREVIEW> = {
  default: DEFAULT_PREVIEW,
  "/physician-care": {
    src: "/physician-care/physician-hug-28a6d9.png",
    title: "Care that knows you.",
    description: "A physician by your side.",
  },
  "/personalized-health-plans": {
    src: "/physician-care/physician-hug-28a6d9.png",
    title: "Uniquely yours.",
    description: "A health plan that fits your life.",
  },
  "/medication": {
    src: "/medication/medication-hero-person-new.png",
    title: "Guidance at every step.",
    description: "Medication care, made personal.",
  },
  "/longevity": DEFAULT_PREVIEW,
  "/biomarkers": {
    src: "/biomarkers/annual-labs-new.png",
    title: "Know yourself better.",
    description: "Deeper insights into your health.",
  },
  "/what-we-test": {
    src: "/what-we-test/labs-hero-card-5060b1.png",
    title: "See the full picture.",
    description: "Explore the markers behind your health.",
  },
  "/weight-loss": {
    src: "/weight-loss/whole/bg.png",
    title: "Find your balance.",
    description: "Support for lasting, healthy change.",
  },
  "/wearables": {
    src: "/wearables/smartwatch-activity-5a6c38.png",
    title: "Every signal matters.",
    description: "Turn everyday data into insight.",
  },
  "/247-care": {
    src: "/247-care/hero-doctor-77e094.png",
    title: "Here when you need us.",
    description: "A connection to care, day or night.",
  },
};

export default function FullScreenMenu({ id, onClose, logoAnchor, buttonAnchor }: {
  id: string;
  onClose: () => void;
  logoAnchor: RefObject<HTMLAnchorElement | null>;
  buttonAnchor: RefObject<HTMLButtonElement | null>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const isPresent = useIsPresent();
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const [focusedHref, setFocusedHref] = useState<string | null>(null);
  const previewKey = hoveredHref ?? focusedHref ?? "default";
  const preview = PREVIEWS[previewKey];

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const alignControls = () => {
      const logo = logoAnchor.current?.querySelector("img")?.getBoundingClientRect();
      const button = buttonAnchor.current?.getBoundingClientRect();
      if (!logo || !button) return;
      const values = {
        "--menu-left": logo.left,
        "--menu-right": window.innerWidth - button.right,
        "--menu-logo-top": logo.top,
        "--menu-logo-width": logo.width,
        "--menu-logo-height": logo.height,
        "--menu-button-top": button.top,
        "--menu-button-width": button.width,
        "--menu-button-height": button.height,
        "--menu-header-bottom": Math.max(logo.bottom, button.bottom),
      };
      Object.entries(values).forEach(([name, value]) => dialog.style.setProperty(name, `${value}px`));
    };
    alignControls();
    window.addEventListener("resize", alignControls);
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const lenis = getLenis();
    const resumeScroll = lenis && !lenis.isStopped;
    lenis?.stop();
    if (scrollbar > 0) {
      document.body.style.paddingRight = `${parseFloat(getComputedStyle(document.body).paddingRight) + scrollbar}px`;
    }
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      window.removeEventListener("resize", alignControls);
      dialog.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      if (resumeScroll) lenis.start();
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [logoAnchor, buttonAnchor]);

  return (
    <motion.dialog
      ref={dialogRef}
      id={id}
      aria-label="Main navigation"
      aria-modal="true"
      className={styles.dialog}
      data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = dialogRef.current?.querySelectorAll<HTMLElement>("a[href], button");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }}
      initial="hidden"
      animate="visible"
      exit="hidden"
      style={{ pointerEvents: isPresent ? "auto" : "none" }}
    >
      <div className={styles.controls} inert={!isPresent}>
        <Link href="/" onClick={onClose} aria-label="Meddy Health home" className={styles.logo}>
          {/* Inline the existing pricing-logo.svg so opening never waits on an image request. */}
          <svg width="44" height="28" viewBox="0 0 44 28" fill="#17925A" aria-hidden="true">
            <rect y="6.47461" width="8.82074" height="20.7238" />
            <path d="M17.5375 0H26.5657L9.1318 27.2H0.103516L17.5375 0Z" />
            <path d="M34.971 0H43.9993L26.5654 27.2H17.5371L34.971 0Z" />
            <rect x="17.5371" width="9.02829" height="27.2" />
            <rect x="34.9717" width="9.02829" height="27.2" />
          </svg>
        </Link>
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu" className={styles.close}>
          <X size={44} strokeWidth={1.8} />
        </button>
      </div>
      <motion.div
        className={styles.panel}
        variants={{
          hidden: { clipPath: CLOSED, transition: { duration: reducedMotion ? 0 : 0.48, ease: EASE } },
          visible: { clipPath: OPEN, transition: { duration: reducedMotion ? 0 : 0.8, ease: EASE } },
        }}
      >
        <div className={styles.content} inert={!isPresent}>
        <div className={styles.explore}>
          <p className={styles.eyebrow}>EXPLORE MEDDY</p>
          <h2 className={styles.heading}>A healthier life.<br /><span>Built around you.</span></h2>
        <nav className={styles.navigation} aria-label="All pages" onMouseLeave={() => setHoveredHref(null)}>
          {COLUMNS.map((items, column) => (
            <div key={column}>
            <p className={styles.groupLabel}>{column === 0 ? "YOUR CARE" : "YOUR HEALTH"}</p>
            <ul className={styles.column}>
              {items.map(({ label, href }, index) => (
                <li className={styles.item} key={href}>
                  <motion.div
                    variants={{
                      hidden: { y: "110%", opacity: 0, transition: { duration: reducedMotion ? 0 : 0.22, ease: EASE } },
                      visible: { y: "0%", opacity: 1, transition: { duration: reducedMotion ? 0 : 0.65, delay: reducedMotion ? 0 : 0.24 + index * 0.045 + column * 0.07, ease: EASE } },
                    }}
                  >
                    <Link href={href} onClick={onClose} onMouseEnter={() => setHoveredHref(href)} onFocus={() => setFocusedHref(href)} onBlur={() => setFocusedHref(null)} aria-current={pathname === href ? "page" : undefined} className={styles.link}>
                      <span>{label}</span><ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
            </div>
          ))}
        </nav>
        </div>
        <aside className={styles.feature} aria-label="Care built around you">
          <div className={styles.portrait}>
            {Object.entries(PREVIEWS).map(([key, image]) => (
              <div key={key} className={styles.previewLayer} data-active={key === previewKey} aria-hidden="true">
                <Image src={image.src} alt="" fill loading="eager" sizes="(max-width: 700px) 55vw, 38vw" className={styles.portraitImage} />
              </div>
            ))}
          </div>
          <div className={styles.featureCaption}>
            <div className={styles.carePhoto}>
              <Image src="/physician-care/physician-hug-28a6d9.png" alt="" fill sizes="56px" />
            </div>
            <div><p className={styles.featureTitle}>{preview.title}</p><p className={styles.featureDescription}>{preview.description}</p></div>
          </div>
        </aside>
        <div className={styles.footer}>
          <p>Your next chapter starts with a conversation.</p>
          <Link href="/book-consultation" onClick={onClose} className={`${styles.cta} rounded-[22px] bg-[#FFFFFF] px-[14px] py-[10px] font-medium uppercase leading-[100%] text-[#1A231F] text-[12px] shadow-[2px_4px_4px_rgba(0,0,0,0.25)] whitespace-nowrap sm:px-[19px] sm:py-[13px] sm:text-[14px]`}>Book Free consultation</Link>
        </div>
        </div>
      </motion.div>
    </motion.dialog>
  );
}
