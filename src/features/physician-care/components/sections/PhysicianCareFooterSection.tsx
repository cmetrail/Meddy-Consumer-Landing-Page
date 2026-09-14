"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PhysicianCareFooterSection() {
  return (
    <section className="relative w-full overflow-hidden text-white">
      <Image
        src="/physician-care/a7fa18a9dada820982c87923b6b38b38d14e9f7f.jpg"
        alt=""
        fill
        className="object-cover"
      />


      <div className="relative mx-auto w-full max-w-360 px-5 min-h-dvh lg:px-10 py-10">
        <div className="flex flex-col gap-16 lg:gap-24">
          <motion.div
            className="flex flex-col gap-[10px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="text-[28px] md:text-[36px] lg:text-[36px] font-medium leading-[45px] text-white">
              Because better care begins with
            </h2>
            <div className="font-dm-serif text-[64px] md:text-[96px] lg:text-[128px] uppercase leading-[1.2] text-white">
              knowing you.
            </div>
          </motion.div>

          <motion.button
            className="flex h-16 w-full max-w-[493px] items-center justify-center rounded-[10px] px-[38px] py-[15px] text-[18px] md:text-[24px] font-medium uppercase leading-[30px] text-white shadow-[6px_7px_5.3px_rgba(0,0,0,0.25)] transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(91.3deg, #4D915C 0.19%, #19995F 101.69%)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            Start Physician Care
          </motion.button>
        </div>
      </div>

      <FooterItems />
    </section>
  );
}
