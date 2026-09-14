"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const PEOPLE = [
  { src: "/physician-care/fifth-person-1.png", left: "4.78%", top: "78.84%", width: "12.53%", aspect: "165 / 240" },
  { src: "/physician-care/fifth-person-2.png", left: "18.15%", top: "70.88%", width: "12.53%", aspect: "165 / 320" },
  { src: "/physician-care/fifth-person-2.png", left: "32.5%", top: "62.7%", width: "14.88%", aspect: "196 / 380" },
  { src: "/physician-care/fifth-person-3.png", left: "45.33%", top: "59.87%", width: "21.87%", aspect: "288 / 432" },
];

export default function PhysicianCareFifthSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="mx-auto w-full max-w-360 px-5 py-16 lg:px-10 lg:py-20">
        {/* Headline */}
        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="uppercase leading-[1.25] text-[#46524B] text-[24px] sm:text-[30px] lg:text-[36px]">
            Care that
          </p>
          <h2 className="font-dm-serif uppercase leading-[1.37] text-[#46524B] text-[48px] sm:text-[64px] lg:text-[78px]">
            Grows with you
          </h2>
        </motion.div>

        {/* Main card with people overlays */}
        <motion.div
          className="relative mt-8 w-full overflow-hidden rounded-[25px] lg:mt-[81px]"
          style={{ aspectRatio: "1317 / 917" }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <Image
            src="/physician-care/Subtract.png"
            alt=""
            fill
            sizes="(min-width: 1360px) 1317px, 100vw"
            className="object-cover"
          />
          {PEOPLE.map((p, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: p.left,
                top: p.top,
                width: p.width,
                aspectRatio: p.aspect,
                mixBlendMode: "soft-light",
              }}
            >
              <Image src={p.src} alt="" fill sizes="300px" className="object-cover" />
            </div>
          ))}
        </motion.div>

        {/* Bottom-right text */}
        <motion.p
          className="mt-6 text-right uppercase leading-[1.25] text-[#46524B] text-[18px] sm:text-[21px] lg:text-[24px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
        >
          Your health changes. So should your care.
        </motion.p>
      </div>
    </section>
  );
}
