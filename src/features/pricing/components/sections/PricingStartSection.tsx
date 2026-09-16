"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type CollageImage = {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  from: { x: string; y: string; rotate?: number };
  delay: number;
  shape?: string;
};

const IMAGES: CollageImage[] = [
  {
    src: "/pricing/start-with/2228.png",
    left: 0,
    top: 0,
    width: 32.35,
    height: 32.78,
    from: { x: "-60vw", y: "-50vh", rotate: -8 },
    delay: 0,
  },
  {
    src: "/pricing/start-with/2231.png",
    left: 0,
    top: 34.89,
    width: 27.83,
    height: 31.56,
    from: { x: "-60vw", y: "10vh" },
    delay: 0.06,
  },
  {
    src: "/pricing/start-with/2232-5ceec2.png",
    left: 0,
    top: 68.11,
    width: 27.83,
    height: 31.67,
    from: { x: "-60vw", y: "60vh" },
    delay: 0.12,
  },
  {
    src: "/pricing/start-with/2229-a3dcc9.png",
    left: 33.07,
    top: 0,
    width: 22.13,
    height: 42.45,
    from: { x: "-15vw", y: "-60vh", rotate: 6 },
    delay: 0.04,
    shape:
      "polygon(0% 0%, 100% 0%, 100% 55.37%, 59.48% 55.37%, 23.83% 100%, 23.83% 77.36%, 0% 77.36%)",
  },
  {
    src: "/pricing/start-with/2236.png",
    left: 29.27,
    top: 48.78,
    width: 16.72,
    height: 51.22,
    from: { x: "-20vw", y: "60vh" },
    delay: 0.1,
    shape:
      "polygon(0% 40.95%, 0% 37.5%, 52.32% 37.71%, 100% 0%, 100% 38.25%, 100% 100%, 0% 100%)",
  },
  {
    src: "/pricing/start-with/2230-a3a09d.png",
    left: 55.95,
    top: 0,
    width: 16.18,
    height: 40.94,
    from: { x: "15vw", y: "-60vh", rotate: -6 },
    delay: 0.08,
    shape: "polygon(0% 0%, 0% 100%, 44.57% 58.89%, 100% 58.89%, 100% 0%)",
  },
  {
    src: "/pricing/start-with/2235.png",
    left: 47.06,
    top: 48.78,
    width: 16.86,
    height: 50.56,
    from: { x: "20vw", y: "60vh" },
    delay: 0.14,
    shape:
      "polygon(0% 37.24%, 54.68% 37.24%, 100% 0%, 100% 100%, 0% 100%)",
  },
  {
    src: "/pricing/start-with/2237.png",
    left: 72.95,
    top: 0,
    width: 27.04,
    height: 31.33,
    from: { x: "60vw", y: "-50vh", rotate: 8 },
    delay: 0.02,
  },
  {
    src: "/pricing/start-with/2234.png",
    left: 72.95,
    top: 32.78,
    width: 27.04,
    height: 67,
    from: { x: "60vw", y: "10vh" },
    delay: 0.06,
    shape:
      "polygon(0% 0%, 100% 0%, 100% 100%, 58.36% 100%, 58.36% 49%, 0% 49%)",
  },
  {
    src: "/pricing/start-with/2233.png",
    left: 64.78,
    top: 67,
    width: 23.17,
    height: 32.67,
    from: { x: "60vw", y: "60vh" },
    delay: 0.12,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.02 } },
};

const itemVariants = {
  hidden: (img: CollageImage) => ({
    x: img.from.x,
    y: img.from.y,
    rotate: img.from.rotate ?? 0,
    scale: 0.8,
    opacity: 0,
  }),
  visible: (img: CollageImage) => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 70,
      damping: 15,
      mass: 0.9,
      delay: img.delay,
    },
  }),
};

export default function PricingStartSection() {
  return (
    <section className="relative flex flex-col overflow-hidden bg-[#F2EEE3]">
      <div className="mx-auto flex w-full max-w-360 flex-col px-5 pt-12 pb-10 lg:px-[75px] lg:pt-[127px] lg:pb-[77px]">
        <div className="flex items-end gap-6 lg:gap-[70px]">
          <motion.div
            className="flex max-w-218.75 flex-col gap-[25px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-[30px] font-bold uppercase leading-[115%] text-[#46524B] sm:text-[48px] lg:text-[64px] lg:leading-[126%]">
              <span className="block">Your health is more</span>
              <span className="block">
                than <span className="text-[#17925A]">Healthcare.</span>
              </span>
            </h2>
            <p className="text-[18px] font-medium uppercase leading-[100%] text-[#6E7A72] sm:text-[24px] lg:text-[32px]">
              Everything works together.
            </p>
          </motion.div>

          <motion.p
            className="hidden max-w-83.25 text-right text-[14px] font-normal leading-snug text-[#6E7A72] md:block sm:text-[16px] lg:text-[20px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <b>Nutrition, fitness, sleep, biomarkers, and medical care</b>
            —all connected around you.
          </motion.p>
        </div>

        <motion.div
          className="relative mt-10 w-full lg:mt-[74px]"
          style={{ aspectRatio: "1290 / 858" }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {IMAGES.map((img) => (
            <motion.div
              key={img.src}
              className="absolute"
              style={{
                left: `${img.left}%`,
                top: `${img.top}%`,
                width: `${img.width}%`,
                height: `${img.height}%`,
              }}
              variants={itemVariants}
              custom={img}
            >
              <Image
                src={img.src}
                alt=""
                fill
                sizes="30vw"
                className="object-cover"
                style={{
                  clipPath: img.shape,
                  filter: img.shape
                    ? "drop-shadow(7px 8px 9.6px rgba(0, 0, 0, 0.25))"
                    : undefined,
                  boxShadow: img.shape
                    ? undefined
                    : "7px 8px 9.6px rgba(0, 0, 0, 0.25)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
