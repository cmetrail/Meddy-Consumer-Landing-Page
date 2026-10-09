"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

type FooterLink = { label: string; href: string };

const FOOTER_COLUMNS: FooterLink[][] = [
  [
    { label: "How it works", href: "/how-it-works" },
    { label: "Why Meddy", href: "/why-meddy" },
    { label: "Physician care", href: "/physician-care" },
    { label: "Pricing", href: "/pricing" },
    { label: "Longevity and\npreventive health", href: "/longevity" },
  ],
  [
    { label: "Nutrition", href: "/#nutrition" },
    { label: "Sleep", href: "/sleep" },
    { label: "Fitness", href: "/fitness" },
    { label: "Medication\nmanagement", href: "/medication" },
    { label: "What we test", href: "/what-we-test" },
    { label: "SEO", href: "/#how-it-works" },
  ],
  [
    { label: "Labs and\nBiomarkers Tracking", href: "/biomarkers" },
    { label: "Weight loss and\nmetabolic", href: "/weight-loss" },
    { label: "Wearables and\nhealth data", href: "/wearables" },
    { label: "Personalized\nhealth plans", href: "/personalized-health-plans" },
    { label: "24/7 Primary care", href: "/247-care" },
  ],
];

type Social = { label: string; path: string };

const SOCIALS: Social[] = [
  {
    label: "Facebook",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: "Twitter",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "LinkedIn",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z",
  },
];

export function FooterItems({ noTopMargin }: { noTopMargin?: boolean }) {
  return (
    <div
      className={`${noTopMargin ? "" : "mt-10"} w-full rounded-t-[22px] bg-white/10 backdrop-blur-xl`}
    >
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
              Calories, workouts, sleep, labs. Most people manage them separately. Meddy connects
              them and puts a physician in charge of what they mean.
            </p>

            <div className="mt-6 flex items-center gap-3.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="text-[#F4F4F5] transition-opacity hover:opacity-70"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

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
                    className="block w-full whitespace-nowrap text-left lg:w-auto lg:whitespace-pre-line lg:text-right font-medium text-white text-base leading-[1.3] uppercase hover:opacity-70"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-6 border-t border-[#E0E0E0] lg:mt-8" />
        <motion.div
          className="mt-8 flex flex-col items-center gap-2 text-center text-[#F4F4F5] text-[14px] leading-[150%] lg:mt-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease }}
        >
          <p>Meddy is operated by Meddy Health LLC.</p>
          <p>
            Medical services are provided by Sameer Aggarwal Medical PLLC. Meddy is not for
            emergencies. If you have a medical emergency, call 911.
            <br />
            © 2026 Meddy Health LLC. All rights reserved.
            <br />
            Privacy Policy · Terms of Service · Notice of Privacy Practices
          </p>
        </motion.div>
      </div>
    </div>
  );
}
