"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PhysicianCareThirdSection() {
  return (
    <section
      className="w-full"
      style={{
        background: "linear-gradient(90deg, #FFFFFF 0%, #E5D9D9 100%)",
      }}
    >
      <div className="mx-auto flex h-dvh w-full max-w-360 flex-col lg:flex-row px-5 lg:px-[75px]">
        {/* Left: text column */}
        <div className="flex flex-1 flex-col justify-between py-16 lg:py-[75px]">
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="font-dm-serif uppercase leading-[100%] text-[#46524B] text-[88px] sm:text-[132px] lg:text-[200px]">
              Care
            </h2>
            <p className="mt-2 uppercase leading-[100%] text-[#6E7A72] text-[24px] sm:text-[32px] lg:text-[40px]">
              That&rsquo;s <span className="italic text-[#46524B]">Unique</span> for you.
            </p>
          </motion.div>

          <motion.p
            className="max-w-109.75 font-light uppercase leading-[130%] text-[#46524B] text-[18px] sm:text-[21px] lg:text-[24px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <b>Guidance shaped by your habits,</b> <br />
            <em>not population averages.</em>
          </motion.p>
        </div>

        {/* Right: images column */}
        <div className="flex flex-row items-stretch gap-6 lg:w-[60%] lg:gap-8">
          <div className="relative hidden w-full overflow-hidden sm:block">
            <Image
              src="/physician-care/physician-hug-28a6d9.png"
              alt="Physician hugging patient"
              fill
              sizes="575px"
              className="object-cover object-top w-full"
            />
          </div>

          <div className="flex w-full flex-col justify-center gap-[40px] py-16 sm:w-53.75 sm:py-24">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "215 / 293" }}>
              <Image
                src="/physician-care/physician-care-1-15fe86.png"
                alt=""
                fill
                sizes="215px"
                className="object-cover"
              />
            </div>
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "215 / 293" }}>
              <Image
                src="/physician-care/physician-care-2.png"
                alt=""
                fill
                sizes="215px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
