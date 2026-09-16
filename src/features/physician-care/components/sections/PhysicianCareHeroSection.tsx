"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";

const AVATARS = [
  { src: "/physician-care/avatar-1.png", alt: "Patient" },
  { src: "/physician-care/avatar-2.png", alt: "Patient" },
  { src: "/physician-care/avatar-3-36fb88.png", alt: "Patient" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function PhysicianCareHeroSection() {
  return (
    <section className="relative flex h-dvh w-full flex-col overflow-hidden bg-[#F0E6D4]">
      {/* Header */}
      <div className="relative z-30">
        <Header active="pHYSICIAN CARE" />
      </div>

      {/* Doctor image — pinned to the right (desktop) */}
      <motion.div
        className="absolute top-[114px] right-10 z-0 hidden lg:block"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.1 }}
      >
        <div
          className="relative"
          style={{
            width: "min(728px, 50vw, calc((100dvh - 152px) * 728 / 910))",
            aspectRatio: "728 / 910",
          }}
        >
          <Image
            src="/physician-care/doctor.png"
            alt="Meddy physician"
            fill
            priority
            sizes="728px"
            className="object-cover object-bottom"
          />
          <div
            aria-hidden
            className="absolute left-1/2 -translate-x-1/2 border-4 border-white"
            style={{ top: "-1.1%", width: "44.64%", height: "89.67%" }}
          />
          {/* Pulse icon (blurred ECG) — just right of the box */}
          <div
            aria-hidden
            className="pointer-events-none absolute hidden xl:block"
            style={{ left: "73.2%", top: "14.4%", width: "24.04%", aspectRatio: "1 / 1" }}
          >
            <Image
              src="/physician-care/pulse.svg"
              alt=""
              fill
              unoptimized
            />
          </div>
        </div>
      </motion.div>

      {/* Text content */}
      <div className="relative z-20 mx-auto flex w-full max-w-360 flex-1 py-10 lg:py-20 flex-col px-5 lg:px-10">
        <div className="flex flex-col justify-between gap-4 flex-1">
          <div className="flex flex-col gap-12">
          <motion.div
            className="flex flex-col gap-3"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <h1 className="font-dm-serif text-[#46524B] uppercase leading-[100%] text-[44px] sm:text-[64px] lg:text-[100px]">
              Primary care
            </h1>
            <p className="text-[#46524B] font-medium leading-[100%] text-[24px] sm:text-[32px] lg:text-[40px] lg:-mt-2.5">
              that knows you beyond the office visit.
            </p>
          </motion.div>

          <p className=" max-w-108 text-[#6E7A72] font-normal leading-[140%] text-[16px] lg:text-[20px]">
            When you need more than insights, Meddy gives you direct access to
            physician guidance connected to your health data.
            </p>
            </div>

          {/* CTA */}
          <motion.div
            className=""
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
          >
            <button
              className="inline-flex items-center justify-center rounded-[10px] px-9.5 py-3.75 hover:opacity-80 text-[#FFFFFF] uppercase text-[18px] sm:text-[24px] leading-[30px] font-medium shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
              style={{ background: "linear-gradient(130deg, #4D915C 0%, #19995F 100%)" }}
            >
              Start Physician Care
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="flex items-center gap-2.75 "
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
          >
            <div className="flex items-center">
              {AVATARS.map((avatar, i) => (
                <div
                  key={avatar.src}
                  className={`relative h-[53.75px] w-[53.75px] overflow-hidden rounded-full border-[2.78px] border-white ${i === 0 ? "" : "-ml-[11px]"}`}
                >
                  <Image
                    src={avatar.src}
                    alt={avatar.alt}
                    fill
                    sizes="54px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-inter text-[#6E7A72] font-medium leading-[100%] text-[16px]">
                Now accepting our first 500 patients
              </span>
              <div className="flex items-center gap-2.5">
                <span className="font-playfair text-[#46524B] font-bold leading-[100%] text-[36px]">
                  327
                </span>
                <span className="font-inter text-[#6E7A72] font-medium leading-[100%] text-[16px]">
                  remaining spots
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
