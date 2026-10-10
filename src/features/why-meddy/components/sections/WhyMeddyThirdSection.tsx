"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./WhyMeddyThirdSection.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

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
    src: "/why-meddy/meddy/Rectangle%2018171.png",
    left: 0,
    top: 0,
    width: 32.35,
    height: 32.78,
    from: { x: "-60vw", y: "-50vh", rotate: -8 },
    delay: 0,
  },
  {
    src: "/why-meddy/meddy/Rectangle%2018172.png",
    left: 0,
    top: 34.89,
    width: 27.83,
    height: 31.56,
    from: { x: "-60vw", y: "10vh" },
    delay: 0.06,
  },
  {
    src: "/why-meddy/meddy/Rectangle%2018176.png",
    left: 0,
    top: 68.11,
    width: 27.83,
    height: 31.67,
    from: { x: "-60vw", y: "60vh" },
    delay: 0.12,
  },
  {
    src: "/why-meddy/meddy/Rectangle%2018178.png",
    left: 33.07,
    top: 0,
    width: 22.13,
    height: 42.45,
    from: { x: "-15vw", y: "-60vh", rotate: 6 },
    delay: 0.04,
  },
  {
    src: "/why-meddy/meddy/Rectangle%2018173.png",
    left: 29.27,
    top: 48.78,
    width: 16.72,
    height: 51.22,
    from: { x: "-20vw", y: "60vh" },
    delay: 0.1,
  },
  {
    src: "/why-meddy/meddy/Rectangle%2018179.png",
    left: 55.95,
    top: 0,
    width: 16.18,
    height: 40.94,
    from: { x: "15vw", y: "-60vh", rotate: -6 },
    delay: 0.08,
  },
  {
    src: "/why-meddy/meddy/Rectangle%2018174.png",
    left: 47.06,
    top: 48.78,
    width: 16.86,
    height: 50.56,
    from: { x: "20vw", y: "60vh" },
    delay: 0.14,
  },
  {
    src: "/why-meddy/meddy/Rectangle%2018180.png",
    left: 72.95,
    top: 0,
    width: 27.04,
    height: 31.33,
    from: { x: "60vw", y: "-50vh", rotate: 8 },
    delay: 0.02,
  },
  {
    src: "/why-meddy/meddy/Rectangle%2018177.png",
    left: 72.95,
    top: 32.78,
    width: 27.04,
    height: 67,
    from: { x: "60vw", y: "10vh" },
    delay: 0.06,
  },
  {
    src: "/why-meddy/meddy/Rectangle%2018175.png",
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

export default function WhyMeddyThirdSection() {
  return (
    <section className={`${styles.section} relative w-full overflow-hidden bg-[radial-gradient(84.22%_84.22%_at_50%_50%,#5A8972_0%,#20352B_100%)] pt-8! pb-12! md:pt-10! md:pb-20!`}>
      <div className={`${styles.inner} mx-auto! flex w-full max-w-360 flex-col items-center gap-8 px-5! lg:px-10!`}>
        {/* Centered heading and supporting copy */}
        <div className={`${styles.text} flex w-full max-w-[1240px] flex-col items-center gap-4 text-center`}>
          <motion.h2
            className="text-[clamp(32px,4.52vw,64px)] leading-[1.45] font-medium text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            We built <em className="font-dm-serif! font-normal text-[#8CDDA8] italic">Meddy</em> to give physicians the{" "}
            <em className={`${styles.emphasis} block font-dm-serif! font-normal text-[#8CDDA8] italic`}>complete picture.</em>
          </motion.h2>
          <motion.p
            className="max-w-[1200px] text-[clamp(14px,1.45vw,20px)] leading-[1.5] font-normal text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
          >
            Instead of treating isolated symptoms or isolated numbers, physicians can understand how
            everyday behaviors influence long-term health—and build care plans that evolve as your life
            changes.
          </motion.p>
        </div>

        {/* Photo collage forming the Meddy mark */}
        <div className={`${styles.desktopCollage} w-full max-w-[1000px] sm:w-[74%]`}>
          <motion.div
            className="relative w-full"
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
                  sizes="(min-width: 1440px) 330px, (min-width: 640px) 25vw, 33vw"
                  className="object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className={styles.mobileCollage} role="img" aria-label="Physician care, movement, sleep, nutrition, and health wearables connected around the Meddy mark">
          {[
            ["care", "/why-meddy/meddy/Rectangle%2018171.png"],
            ["doctor", "/physician-care/doctor.png"],
            ["physician", "/medication/orbital-physician-body.png"],
            ["movement", "/biomarkers/cause-effect-bg.png"],
            ["wellbeing", "/home/a1c-card.jpg"],
            ["sleep", "/sleep/sleep-quality-image.png"],
            ["nutrition", "/biomarkers/physician-led/adjusts-plan.png"],
            ["watch", "/wearables/smartwatch-activity-5a6c38.png"],
          ].map(([name, src]) => (
            <div key={name} className={styles[name]}><Image src={src} alt="" fill unoptimized sizes="(max-width: 767px) 33vw, 1px" /></div>
          ))}
          <div className={styles.rings}><span /><span /></div>
        </div>
      </div>
    </section>
  );
}
