"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PhysicianCareThirdSection() {
  return (
    <section
      className="w-full"
      style={{
        background: "linear-gradient(90deg, #FFFFFF -4.86%, #E5D9D9 117.29%)",
      }}
    >
      <div className="mx-auto flex h-dvh w-full max-w-360 flex-col lg:flex-row px-5 lg:px-10">
        {/* Left: text column */}
        <div className="flex flex-1 flex-col justify-between gap-8 px-5 py-16 lg:px-0 lg:py-24">
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
            <p className="uppercase leading-[100%] text-[#6E7A72] text-[24px] sm:text-[32px] lg:text-[40px]">
              That&apos;s Unique for you.
            </p>
          </motion.div>

          <motion.p
            className="max-w-109.75  uppercase leading-[130%] text-[#46524B] text-[18px] sm:text-[21px] lg:mt-0 lg:text-[24px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <b>Guidance shaped by your habits,</b> <br />not population averages.
          </motion.p>
        </div>

        {/* Right: images column */}
        <div className="flex flex-row items-stretch gap-6 lg:w-[60%] lg:gap-8 lg:px-0">
          <div className="relative hidden w-full overflow-hidden sm:block">
            <Image
              src="/physician-care/061801a14673bc4954e1d87ad78480d7ccac32dc.png"
              alt="Physician hugging patient"
              fill
              sizes="575px"
              className="object-cover w-full"
            />
          </div>

          <div className="flex w-full flex-col justify-center gap-6 py-16 sm:w-53.75 sm:py-24">
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "215 / 293" }}>
              <Image
                src="/physician-care/32dde33410501e3fe4d2146bf5f7df684df1fce0.jpg"
                alt=""
                fill
                sizes="215px"
                className="object-cover"
              />
            </div>
            <div className="relative w-full overflow-hidden" style={{ aspectRatio: "215 / 293" }}>
              <Image
                src="/physician-care/e55a70f609260cb56eb5a6c672cfd89e093f53e2.jpg"
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
