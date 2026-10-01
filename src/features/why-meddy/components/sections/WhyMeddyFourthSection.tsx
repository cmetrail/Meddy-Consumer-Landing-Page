"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const MORE_CONTEXT = [
  { fontSize: 7,  fontWeight: 400 },
  { fontSize: 8,  fontWeight: 400 },
  { fontSize: 10, fontWeight: 400 },
  { fontSize: 11, fontWeight: 500 },
  { fontSize: 13, fontWeight: 500 },
  { fontSize: 15, fontWeight: 600 },
  { fontSize: 18, fontWeight: 600 },
  { fontSize: 21, fontWeight: 700 },
  { fontSize: 25, fontWeight: 700 },
  { fontSize: 29, fontWeight: 800 },
];

export default function WhyMeddyFourthSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Gallery wall background */}
      <Image
        src="/why-meddy/574592ae3ce5fcc9eeb91ce60875127f20212f84.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-360 flex-col gap-12 px-5 py-16 lg:gap-16 lg:px-10 lg:py-24">

        {/* Heading */}
        <motion.h2
          className="text-center text-[28px] font-normal leading-[120%] text-white sm:text-[40px] lg:text-[64px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease }}
        >
          A{" "}
          <em className="rounded-lg bg-[#2A4D38] px-2 font-normal font-dm-serif italic text-[#8CDDA8] lg:px-3">
            different philosophy
          </em>
          <br />
          of primary care.
        </motion.h2>

        {/* 4 poster frames */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">

          {/* Card 1: Doctors photo + "Less Fragmentation" */}
          <motion.div
            className="flex flex-col overflow-hidden border-[3px] border-black"
            style={{ aspectRatio: "3/4" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0, ease }}
          >
            <div className="relative min-h-0 flex-1">
              <Image
                src="/why-meddy/cc5cbd24170609a436bdf75d3438f6764ae93b69.jpg"
                alt=""
                fill
                sizes="(min-width: 1024px) 22vw, 45vw"
                className="object-cover object-top"
              />
            </div>
            <div className="rounded-t-[10px] h-[169px] bg-[#EFE9E1] flex flex-col justify-between px-5 py-3">
              <p className="text-[13px] font-semibold leading-tight text-[#2C2C2C] sm:text-[18px] lg:text-[20px]">
                Less<br />Fragmentation
              </p>
              <p className="font-dm-serif text-right italic text-[12px] text-[#2C2C2C]">
                Meddy
              </p>
            </div>
          </motion.div>

          {/* Card 2: More Context cascade */}
          <motion.div
            className="flex flex-col justify-between overflow-hidden border-[3px] border-black px-5 py-3"
            style={{ aspectRatio: "3/4", background: "linear-gradient(180deg, #175447 0%, #7F938F 100%)" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            <div className="flex h-[70%] flex-col items-center justify-between text-center">
              {MORE_CONTEXT.map(({ fontSize, fontWeight }, i) => (
                <p
                  key={i}
                  className="leading-tight text-white"
                  style={{ fontSize, fontWeight }}
                >
                  More Context
                </p>
              ))}
            </div>
            <p className="text-right font-dm-serif italic text-[12px] text-white">
              Meddy
            </p>
          </motion.div>

          {/* Card 3: Better Decisions + thumbs up */}
          <motion.div
            className="flex flex-col overflow-hidden border-[3px] border-black bg-[#F5F0E8] py-3"
            style={{ aspectRatio: "3/4" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <p className="px-5 font-dm-serif font-bold text-[#283D32] text-[16px] sm:text-[18px] lg:text-[20px]">
              Better Decisions
            </p>
            <div className="relative flex-1">
              <Image
                src="/why-meddy/fb34952e26900ef07df148e0cf153f9aab19ee6e.png"
                alt=""
                fill
                sizes="20vw"
                className="object-cover z-50 scale-x-[-1]"
              />
              {/* Circle overlay centered on image */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="aspect-square w-[90%] rounded-full border-2 border-[#1E3A2A]" />
              </div>
            </div>
            <p className="px-5 text-right font-dm-serif italic text-[12px] text-[#2C2C2C]">
              Meddy
            </p>
          </motion.div>

          {/* Card 4: Photo + care tagline */}
          <motion.div
            className="relative overflow-hidden border-[3px] border-black"
            style={{ aspectRatio: "3/4" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            <Image
              src="/why-meddy/43afe996582fb06aa73b50b30e8e07260ae19d2f.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 py-3">
              <p className="font-[Palatino_Linotype,Palatino,'Book_Antiqua',serif] text-[14px] sm:text-[18px] lg:text-[20px] font-bold leading-[100%] tracking-normal text-white">
                Care built<br />around how<br />you actually<br />live
              </p>
              <p className="self-end font-dm-serif italic text-[12px] text-white">
                Meddy
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
