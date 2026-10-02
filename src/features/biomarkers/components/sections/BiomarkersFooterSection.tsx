"use client";

import Image from "next/image";
import Link from "next/link";

type FooterLink = { label: string; href: string };

const FOOTER_COLUMNS: FooterLink[][] = [
  [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Why Meddy", href: "/why-meddy" },
    { label: "Physician care", href: "/physician-care" },
    { label: "Pricing", href: "/pricing" },
    { label: "Longevity and\npreventive health", href: "/physician-care" },
  ],
  [
    { label: "Nutrition", href: "/#how-it-works" },
    { label: "Sleep", href: "/#how-it-works" },
    { label: "Fitness", href: "/fitness" },
    { label: "Medication\nmanagement", href: "/physician-care" },
    { label: "What we test", href: "/what-we-test" },
    { label: "SEO", href: "/#" },
  ],
  [
    { label: "Labs and\nbiomarkers Tracking", href: "/biomarkers" },
    { label: "Weight loss and\nmetabolic", href: "/#how-it-works" },
    { label: "Wearables and\nhealth data", href: "/wearables" },
    { label: "Personalized\nhealth plans", href: "/physician-care" },
    { label: "24/7 Primary care", href: "/247-care" },
  ],
];

export default function BiomarkersFooterSection() {
  return (
    <section className="w-full bg-[#17231D] text-white">
      <div className="w-full rounded-[15px] bg-white/10">
        <div className="mx-auto w-full max-w-360 px-5 pb-[30px] pt-10 lg:px-[80px] lg:pt-[50px]">
          {/* Top: brand + nav */}
          <div className="grid grid-cols-1 gap-10 border-b border-white/40 pb-6 lg:grid-cols-[1fr_auto] lg:gap-x-16 lg:pb-[24px]">
            <div className="flex flex-col gap-10 lg:gap-[40px]">
              <div className="flex flex-col gap-[25px]">
                <Image
                  src="/biomarkers/footer/meddy-logo.svg"
                  alt="Meddy Health"
                  width={358}
                  height={216}
                  className="h-auto w-44 sm:w-56 lg:w-[358px]"
                />
                <p className="max-w-[373px] text-[#F4F4F5] text-[16px] leading-[1.5]">
                  Calories, workouts, sleep, labs. Most people manage them separately. Meddy
                  connects them and puts a physician in charge of what they mean.
                </p>
              </div>

              <div className="flex flex-col gap-[19px] md:flex-row md:items-center">
                <button
                  className="flex h-[60px] w-full items-center justify-center gap-2.5 rounded-[9px] bg-black/20 px-4 transition-opacity hover:opacity-80 md:w-[180px] md:justify-start"
                  style={{
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "0.75px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Image src="/Apple.svg" alt="Apple" width={30} height={36} className="shrink-0" />
                  <span className="flex flex-col text-left">
                    <span className="block text-[13.5px] font-medium leading-[13.5px] text-white">
                      Download on the
                    </span>
                    <span className="block text-[27px] font-medium leading-[100%] tracking-[-0.7px] text-white">
                      App Store
                    </span>
                  </span>
                </button>

                <button
                  className="flex h-[60px] w-full items-center justify-center gap-2.5 rounded-[9px] bg-black/20 px-4 transition-opacity hover:opacity-80 md:w-[180px] md:justify-start"
                  style={{
                    backdropFilter: "blur(14px)",
                    WebkitBackdropFilter: "blur(14px)",
                    border: "0.75px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Image
                    src="/Playstore.svg"
                    alt="Google Play"
                    width={32}
                    height={36}
                    className="shrink-0"
                  />
                  <span className="flex flex-col gap-1 text-left">
                    <span className="block text-[15px] font-normal uppercase leading-[15px] text-white">
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

            <nav className="grid grid-cols-2 items-start gap-8 sm:grid-cols-3 lg:flex lg:flex-row lg:items-start lg:gap-[85px]">
              {FOOTER_COLUMNS.map((column) => (
                <div
                  key={column[0].label}
                  className="flex flex-col items-start gap-5 lg:items-end lg:gap-[35px]"
                >
                  {column.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="whitespace-pre-line text-left text-[14px] font-medium uppercase leading-[1.3] text-white hover:opacity-70 sm:text-[16px] lg:text-right"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom: legal */}
          <div className="flex flex-col items-center gap-2 pt-[31px] text-center">
            <p className="text-[12px] leading-[1.5] text-[#F4F4F5]">
              Meddy is a service of Meddy Health LLC.
            </p>
            <p className="text-[12px] leading-[1.5] text-[#F4F4F5]">
              © 2026 Meddy Health LLC. All rights reserved. Privacy Policy · Terms of Use · Notice
              of Privacy Practices · Accessibility · Contact Us
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
