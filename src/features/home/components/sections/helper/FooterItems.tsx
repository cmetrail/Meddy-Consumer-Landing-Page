"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type FooterLink = { label: string; href: string };

const FOOTER_COLUMNS: FooterLink[][] = [
  [
    { label: "Home page", href: "/" },
    { label: "How it works", href: "/#how-it-works" },
    { label: "Why Meddy", href: "/why-meddy" },
    { label: "Sleep and recovery", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
  ],
  [
    { label: "Nutrition", href: "/#how-it-works" },
    { label: "Physician Care", href: "/physician-care" },
    { label: "Personalized\nhealth plans", href: "/physician-care" },
    { label: "Medication\nmanagement", href: "/physician-care" },
    { label: "Longevity and\npreventive health", href: "/physician-care" },
  ],
  [
    { label: "Labs and\nBiomarkers Tracking", href: "/physician-care" },
    { label: "Weighloss and\nMetabolic", href: "/#how-it-works" },
    { label: "Werables and\nHealth Data", href: "/#how-it-works" },
    { label: "Fitness", href: "/#how-it-works" },
    { label: "24/7 Primary Care", href: "/physician-care" },
  ],
];

export function FooterItems() {
  return (
    <div className="mt-10 w-full rounded-t-[22px] bg-white/10 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-360 px-5 lg:px-10 py-16 pb-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:gap-x-16 lg:gap-y-0">
          <div data-reveal>
            <Image
              src="/app-logo.png"
              alt="Meddy Health"
              width={358}
              height={215}
              className="h-auto w-50 lg:w-89.5"
            />

            <p className="max-w-174.75 text-[#F4F4F5] text-[16px] sm:text-[18px] lg:text-[20px] leading-[150%] mt-8">
              Calories, workouts, sleep, labs… Most people manage them separately. Meddy connects
              them and puts a physician in charge of what they mean.
            </p>

            <div className="mt-6 flex flex-col gap-4.75 md:flex-row md:flex-wrap lg:mt-6.5">
              <button
                className="flex h-15 w-full items-center justify-center gap-2.5 rounded-[9px] bg-black/20 px-4 text-center transition-opacity hover:opacity-80 md:w-auto md:justify-start md:text-left"
                style={{
                  backdropFilter: "blur(14px)",
                  border: "0.75px solid #FFFFFF1A",
                }}
              >
                <Image src="/Apple.svg" alt="Apple" width={30} height={36} className="shrink-0" />
                <span className="flex flex-col">
                  <span className="block text-white text-[13.5px] leading-[13.5px] font-medium">
                    Download on the
                  </span>
                  <span className="block font-medium text-white text-[27px] leading-[100%] tracking-[-0.7px]">
                    App Store
                  </span>
                </span>
              </button>
              <button
                className="flex h-15 w-full items-center justify-center gap-2.5 rounded-[9px] bg-black/20 px-4 text-center transition-opacity hover:opacity-80 md:w-auto md:justify-start md:text-left"
                style={{
                  backdropFilter: "blur(14px)",
                  border: "0.75px solid #FFFFFF1A",
                }}
              >
                <Image src="/Playstore.svg" alt="Google Play" width={32} height={36} className="shrink-0" />
                <span className="flex flex-col gap-1">
                  <span className="block uppercase text-white text-[15px] leading-[15px] font-normal">
                    Get it on
                  </span>
                  <Image
                    src="/google-play-wordmark.svg"
                    alt="Google Play"
                    width={111}
                    height={23}
                    className="h-[22.5px] w-auto"
                  />
                </span>
              </button>
            </div>
          </div>

          <nav data-footer-nav className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:flex lg:flex-row lg:items-start lg:gap-16">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column[0].label} data-footer-col className="flex flex-col items-start gap-5 lg:items-end lg:gap-[35px]">
                {column.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block w-full whitespace-nowrap text-left lg:w-auto lg:whitespace-pre-line lg:text-right font-medium text-white text-base leading-[1.3] hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-6 border-t border-[#E0E0E0] lg:mt-8" />
        <motion.p
          className="mt-8 text-center text-[#F4F4F5] text-[12px] leading-[150%] lg:mt-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease }}
        >
          © 2026 Meddy · Physician services available in all 50 states except: South Carolina,
          Arkansas, Rhode Island.
        </motion.p>
      </div>
    </div>
  );
}
