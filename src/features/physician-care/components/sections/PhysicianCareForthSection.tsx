"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const PHOTO = "/physician-care/32dde33410501e3fe4d2146bf5f7df684df1fce0.jpg";

const TILES = [
  { objectPosition: "0% 0%" },
  { objectPosition: "0% 100%" },
  { objectPosition: "100% 0%" },
  { objectPosition: "100% 100%" },
];

export default function PhysicianCareForthSection() {
  return (
    <section
      className="relative min-h-dvh w-full overflow-hidden lg:h-dvh"
      style={{
        background: "linear-gradient(118.95deg, #5A7C52 -2.24%, #5E7558 104.19%)",
      }}
    >
      <div className="relative mx-auto flex min-h-dvh w-full max-w-360 flex-col px-5 py-16 lg:h-dvh lg:px-10 lg:py-24">
        {/* Top statement */}
        <motion.h2
          className="max-w-[285px] font-extralight uppercase leading-[1.29] text-white text-[32px] sm:text-[40px] lg:text-[48px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          A physician who knows your story.
        </motion.h2>

        {/* Masked photo grid (staggered 2-col mosaic) */}
        <motion.div
          className="relative mt-10 flex justify-end lg:absolute lg:right-0 lg:top-[120px] lg:mt-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          <div className="flex gap-4 lg:gap-[26.76px]">
            <div className="flex translate-y-12 flex-col gap-4 lg:translate-y-[80px] lg:gap-[26.76px]">
              <Tile objectPosition={TILES[0].objectPosition} />
              <Tile objectPosition={TILES[1].objectPosition} />
            </div>
            <div className="flex flex-col gap-4 lg:gap-[26.76px]">
              <Tile objectPosition={TILES[2].objectPosition} />
              <Tile objectPosition={TILES[3].objectPosition} />
            </div>
          </div>
        </motion.div>

        {/* Bottom headline */}
        <motion.div
          className="mt-12 flex flex-col lg:mt-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <p className="font-semibold uppercase leading-[1.25] text-white text-[24px] sm:text-[30px] lg:text-[36px]">
            every decision begins with
          </p>
          <h3 className="font-dm-serif uppercase leading-[1.37] text-white text-[72px] sm:text-[100px] lg:text-[128px]">
            context
          </h3>
        </motion.div>
      </div>
    </section>
  );
}

function Tile({ objectPosition }: { objectPosition: string }) {
  return (
    <div className="relative h-[140px] w-[140px] overflow-hidden bg-[#D9D9D9] sm:h-[190px] sm:w-[190px] lg:h-[300px] lg:w-[284px]">
      <Image
        src={PHOTO}
        alt=""
        fill
        sizes="(min-width: 1024px) 284px, 190px"
        className="object-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}
