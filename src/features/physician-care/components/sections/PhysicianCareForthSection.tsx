"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const PHOTO = "/physician-care/32dde33410501e3fe4d2146bf5f7df684df1fce0.jpg";

// Section background green — sampled from the gradient so the divider
// lines blend into the section's own background.
const DIVIDER_COLOR = "#5C7654";

export default function PhysicianCareForthSection() {
  return (
    <section
      className="relative min-h-dvh w-full overflow-hidden lg:h-dvh"
      style={{
        background: "linear-gradient(118.95deg, #5A7C52 -2.24%, #5E7558 104.19%)",
      }}
    >
      <div className="relative mx-auto flex min-h-dvh w-full max-w-360 flex-col px-5 py-10 lg:h-dvh lg:px-10 lg:py-10">
        {/* Top statement */}
        <div className="flex flex-col gap-10 justify-between h-full">
          <motion.h2
            className="max-w-71.25 uppercase leading-[130%] text-white text-[32px] sm:text-[40px] lg:text-[48px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className="font-extralight">A physician who </span>
            <em><b>knows your story.</b></em>
          </motion.h2>
          {/* Bottom headline */}
          <motion.div
            className="flex flex-col lg:mt-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            <p className="uppercase leading-[130%] text-white text-[24px] sm:text-[30px] lg:text-[36px]">
              <b>every decision</b> <span className="text-[#B2B2B2]"> begins with</span>
            </p>
            <h3 className="font-dm-serif uppercase leading-[130%] text-white text-[72px] sm:text-[100px] lg:text-[128px]">
              context
            </h3>
          </motion.div>
        </div>

        {/* Photo grid — single image split into 4 quadrants by divider lines */}
        <motion.div
          className="relative mt-10 flex justify-end lg:absolute lg:right-0 lg:top-27.5 lg:mt-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <div
            className="relative overflow-hidden bg-[#D9D9D9] w-75 lg:w-115"
            style={{ aspectRatio: "686 / 855" }}
          >
            <div
              className="absolute"
              style={{
                left: "-23.87%",
                top: "-3.63%",
                width: "136.82%",
                height: "98.13%",
              }}
            >
              <Image
                src={PHOTO}
                alt=""
                fill
                sizes="(min-width: 1024px) 630px, 410px"
                className="object-cover"
              />
            </div>

            {/* empty space above left column (left grid sits lower) */}
            <div
              className="absolute"
              style={{ left: 0, top: 0, width: "48.05%", height: "15.27%", background: DIVIDER_COLOR }}
            />
            {/* empty space below right column (right grid sits higher) */}
            <div
              className="absolute"
              style={{ left: "51.95%", top: "84.73%", width: "48.05%", height: "15.27%", background: DIVIDER_COLOR }}
            />
            {/* vertical divider between columns */}
            <div
              className="absolute top-0 h-full"
              style={{ left: "48.05%", width: "3.9%", background: DIVIDER_COLOR }}
            />
            {/* horizontal divider — left column (sits lower) */}
            <div
              className="absolute"
              style={{ left: 0, top: "56.08%", width: "48.05%", height: "3.13%", background: DIVIDER_COLOR }}
            />
            {/* horizontal divider — right column (sits higher) */}
            <div
              className="absolute"
              style={{ left: "51.95%", top: "40.8%", width: "48.05%", height: "3.13%", background: DIVIDER_COLOR }}
            />
          </div>
        </motion.div>


      </div>
    </section>
  );
}
