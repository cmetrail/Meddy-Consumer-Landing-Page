"use client";

import Image from "next/image";
import Header from "@/components/Header";

export default function WhyMeddyHeroSection() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: "var(--dvh)" }}>
      <Image
        src="/why-meddy/hero.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10">
        <Header variant="dark" active="WHY MEDDY" />
      </div>
      <div className="mx-auto relative z-50 flex w-full max-w-360 pt-16 sm:pt-24 lg:pt-28 px-5 lg:px-10">
        <div className="flex flex-col gap-10 sm:gap-20 w-full">
          <h1 className="text-white leading-[100%] max-w-133 mr-auto self-start text-[48px] sm:text-[64px]">
            <span className="font-dm-serif">Healthcare wasn&apos;t designed</span> 
            <span className="font-semibold text-[#8CDDA8]"> to see everyday life.</span>
          </h1>
           <h1 className="text-white leading-[1.5] max-w-92 sm:self-end text-[20px]">
           Most medical decisions are made from occasional appointments and a handful of lab results—even though your health is shaped by what happens between visits.
          </h1>
          </div>
        </div>
    </section>
  );
}
