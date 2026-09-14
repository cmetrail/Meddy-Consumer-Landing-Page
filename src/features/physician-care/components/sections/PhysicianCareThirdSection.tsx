"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PhysicianCareThirdSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #FFFFFF -4.86%, #E5D9D9 117.29%)",
      }}
    >
      <div className="relative mx-auto min-h-dvh w-full max-w-360">
        {/* Right doctor image (full height, right-center) */}
        <div className="absolute left-[36.67%] top-0 hidden h-full w-[39.93%] overflow-hidden lg:block">
          <Image
            src="/physician-care/061801a14673bc4954e1d87ad78480d7ccac32dc.png"
            alt="Physician hugging patient"
            fill
            sizes="575px"
            className="object-cover"
          />
        </div>

        {/* Two small photos (far right) */}
        <div className="absolute left-[79.86%] top-1/2 hidden w-[14.93%] -translate-y-1/2 flex-col gap-[40px] xl:flex">
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

        {/* Content */}
        <div className="relative flex min-h-dvh w-full flex-col justify-between px-5 py-16 lg:px-10 lg:py-24">
          {/* Headline */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="font-dm-serif uppercase leading-[1.37] text-[#46524B] text-[88px] sm:text-[132px] lg:text-[200px]">
              Care
            </h2>
            <p className="mt-2 uppercase leading-[1.25] text-[#6E7A72] text-[24px] sm:text-[32px] lg:text-[40px]">
              That&apos;s Unique for you.
            </p>
          </motion.div>

          {/* Bottom text */}
          <motion.p
            className="max-w-[439px] font-bold uppercase leading-[1.29] text-[#46524B] text-[18px] sm:text-[21px] lg:text-[24px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            Guidance shaped by your habits, not population averages.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
