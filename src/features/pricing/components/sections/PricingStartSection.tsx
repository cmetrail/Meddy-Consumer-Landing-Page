"use client";

import { useEffect, useRef, useState } from "react";
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
};

const IMAGES: CollageImage[] = [
  {
    src: "/pricing/start-with/Rectangle-18171.png",
    left: 0,
    top: 0,
    width: 32.35,
    height: 32.78,
    from: { x: "-60vw", y: "-50vh", rotate: -8 },
    delay: 0,
  },
  {
    src: "/pricing/start-with/Rectangle-18172.png",
    left: 0,
    top: 34.89,
    width: 27.83,
    height: 31.56,
    from: { x: "-60vw", y: "10vh" },
    delay: 0.06,
  },
  {
    src: "/pricing/start-with/Rectangle-18176.png",
    left: 0,
    top: 68.11,
    width: 27.83,
    height: 31.67,
    from: { x: "-60vw", y: "60vh" },
    delay: 0.12,
  },
  {
    src: "/pricing/start-with/Rectangle-18178.png",
    left: 33.07,
    top: 0,
    width: 22.13,
    height: 42.45,
    from: { x: "-15vw", y: "-60vh", rotate: 6 },
    delay: 0.04,
  },
  {
    src: "/pricing/start-with/Rectangle-18173.png",
    left: 29.27,
    top: 48.78,
    width: 16.72,
    height: 51.22,
    from: { x: "-20vw", y: "60vh" },
    delay: 0.1,
  },
  {
    src: "/pricing/start-with/Rectangle-18179.png",
    left: 55.95,
    top: 0,
    width: 16.18,
    height: 40.94,
    from: { x: "15vw", y: "-60vh", rotate: -6 },
    delay: 0.08,
  },
  {
    src: "/pricing/start-with/Rectangle-18174.png",
    left: 47.06,
    top: 48.78,
    width: 16.86,
    height: 50.56,
    from: { x: "20vw", y: "60vh" },
    delay: 0.14,
  },
  {
    src: "/pricing/start-with/Rectangle-18180.png",
    left: 72.95,
    top: 0,
    width: 27.04,
    height: 31.33,
    from: { x: "60vw", y: "-50vh", rotate: 8 },
    delay: 0.02,
  },
  {
    src: "/pricing/start-with/Rectangle-18177.png",
    left: 72.95,
    top: 32.78,
    width: 27.04,
    height: 67,
    from: { x: "60vw", y: "10vh" },
    delay: 0.06,
  },
  {
    src: "/pricing/start-with/Rectangle-18175.png",
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
  const collageRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const measure = () => {
      const el = collageRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      setScale(Math.min(width / 1290, height / 858) * 1.06);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (collageRef.current) ro.observe(collageRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      className="relative flex flex-col overflow-hidden bg-[#F2EEE3]"
      style={{ height: "var(--dvh)" }}
    >
      <div className="mx-auto flex h-full w-full max-w-360 flex-col gap-10 px-5 py-10 pb-8  lg:px-10">
        <div className="flex items-end justify-between gap-8">
          <motion.div
            className="flex max-w-218.75 flex-col gap-2.5 lg:gap-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-[30px] font-bold uppercase leading-[100%] text-[#46524B]  sm:text-[48px]">
              <span className="block">Start</span>
              <span className="block">
                with{" "}
                <span className="text-[#17925A]">understanding.</span>
              </span>
            </h2>
            <p className="text-[16px] font-medium uppercase leading-[100%] text-[#6E7A72]  sm:text-[24px]">
              Most people begin with Meddy.
            </p>
          </motion.div>

          <motion.p
            className="hidden max-w-83.25 text-right text-[13px] font-normal leading-snug text-[#6E7A72] md:block sm:text-[18px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            When you want deeper insight, <b>physician guidance</b>, or more
            personalized support, <b>Meddy Care</b> and <b>Meddy Complete</b> are there.
          </motion.p>
        </div>

        <div
          ref={collageRef}
          className="flex min-h-0 flex-1 items-center justify-center"
        >
          <motion.div
            className="relative"
            style={{ width: 1290 * scale, height: 858 * scale }}
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
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
