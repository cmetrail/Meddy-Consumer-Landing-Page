"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PhysicianCareSecondSection() {
  return (
    <section className="relative mx-auto w-full h-dvh py-8 max-w-360 px-5 lg:px-10 bg-white">
        <div className=" relative h-full w-full overflow-hidden rounded-[10px]">
          {/* Full-width photo */}
          <div className=" h-full  w-full">
            <Image
              src="/physician-care/7563e41f70a1b3650024dc32a5364a1454a492d9.png"
              alt=""
              fill
              className="object-cover h-full w-full"
            />
          </div>

          {/* Chart card (top-right, overlapping photo) */}
          <motion.div
            className="absolute right-[3.5%] top-[4%] w-[24.8%] max-w-86"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
          >
            <ChartCard />
          </motion.div>

          {/* Headline (lower-middle, over photo) */}
          <motion.div
            className="absolute left-[3.5%] top-[55%]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <h2 className="font-dm-serif uppercase leading-[100%] text-[#46524B] text-[40px] sm:text-[56px] lg:text-[96px]">
              Stay ahead
            </h2>
            <p className="uppercase leading-[100%] text-[#46524B] text-[20px] sm:text-[28px] lg:text-[40px]">
              of your health
            </p>
          </motion.div>

          {/* Tagline (bottom-left, over photo) */}
          <div className="absolute left-[3.5%] bottom-[3%]">
            <motion.p
              className="font-light uppercase italic leading-[100%] text-[#46524B] text-[14px] sm:text-[18px] lg:text-[24px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              Catch changes earlier.
            </motion.p>
            <motion.p
              className="font-normal uppercase leading-[100%] text-[#46524B] text-[16px] sm:text-[20px] lg:text-[32px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              Act sooner.
            </motion.p>
          </div>
        </div>
    </section>
  );
}

function ChartCard() {
  return (
    <div className="w-full overflow-hidden rounded-[10px] bg-white shadow-[9px_6px_8.9px_rgba(0,0,0,0.25)]">
      <svg viewBox="0 0 344.25 264" className="h-auto w-full" style={{ fontFamily: "var(--font-plus-jakarta)" }}>
        {/* Green curve (Earlier intervention -> Better outcomes) */}
        <path
          d="M12.75 163.837C12.75 163.837 29.71 133.171 52.5 130.462C72.36 128.102 77.94 145.782 97.88 147.337C124.15 149.387 128.91 105.012 154.5 111.337C168.55 114.81 170.51 129.398 184.5 133.087C221.47 142.835 231 63.3372 236.62 50.2122C242.25 37.0872 253.95 17.2846 273.75 15.3372C296.62 13.0869 300 22.8372 300 22.8372"
          fill="none"
          stroke="#46524B"
          strokeWidth={3.75}
        />
        {/* Red curve (No intervention -> condition worsens) */}
        <path
          d="M9.75 212.401C9.75 212.401 30.08 196.023 52.88 193.314C72.73 190.954 74.56 201.884 94.5 203.439C120.78 205.489 130.23 179.652 154.5 189.939C189 204.564 190.09 178.296 209.25 180.938C220.12 182.438 225.75 194.813 235.88 194.813C246 194.813 271.04 184.161 283.12 188.25C308.62 196.875 303.38 215.625 303.38 215.625"
          fill="none"
          stroke="#BD3A3A"
          strokeWidth={2.25}
        />
        {/* Dashed vertical line */}
        <line
          x1={191.62}
          y1={72.337}
          x2={191.62}
          y2={146.587}
          stroke="#46524B"
          strokeWidth={0.75}
          strokeDasharray="1.5 1.5"
        />
        {/* Dot outer glow */}
        <circle cx={191.62} cy={134.212} r={5.625} fill="radial-gradient(95% 95% at 50% 50%, #FFFFFF 2.32%, rgba(180,172,172,0.53) 75.75%)" />
        {/* Dot core */}
        <circle cx={191.62} cy={134.212} r={4.125} fill="radial-gradient(59.38% 59.38% at 50% 50%, #46524B 0%, #B4ACAC 75.75%)" />

        {/* Labels */}
        <text x={152.25} y={63.6} fill="#46524B" fontSize={9} fontWeight={600}>Earlier intervention</text>
        <text x={144} y={208.75} fill="#FF5252" fontSize={9} fontWeight={400}>No intervention</text>
        <text x={243.75} y={62} fill="#46524B" fontSize={12} fontWeight={600}>BETTER</text>
        <text x={243.75} y={76} fill="#46524B" fontSize={12} fontWeight={600}>OUTCOMES</text>
        <text x={243.75} y={222.5} fill="#FF5252" fontSize={12} fontWeight={600}>CONDITION</text>
        <text x={243.75} y={236.5} fill="#FF5252" fontSize={12} fontWeight={600}>WORSENS</text>
      </svg>
    </div>
  );
}
