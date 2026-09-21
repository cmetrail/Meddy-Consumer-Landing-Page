"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function PhysicianCareSecondSection() {
  return (
    <section className="relative mx-auto w-full max-w-360 overflow-hidden bg-[#FFFFF9] px-5 py-14 lg:min-h-[1024px] lg:px-[75px] lg:py-0">
      <div className="relative mx-auto w-full max-w-360 lg:min-h-[1024px]">
        {/* Heading (top center) */}
        <motion.div
          className="flex flex-col items-center text-center lg:pt-[45px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="font-dm-serif italic leading-[1.371] text-[#17925A] text-[48px] sm:text-[72px] lg:text-[96px]">
            Stay ahead
          </h2>
          <p className="font-normal uppercase leading-[1.26] text-[#46524B] text-[24px] sm:text-[32px] lg:text-[40px]">
            of your health
          </p>
        </motion.div>

        {/* Photo (bottom center on desktop) */}
        <div className="relative mx-auto mt-8 w-full max-w-[784px] lg:absolute lg:bottom-0 lg:left-1/2 lg:mt-0 lg:w-[784px] lg:-translate-x-1/2">
          <Image
            src="/physician-care/55e6878efd48e3918ab12131fee3c0b0a1839437.png"
            alt=""
            width={784}
            height={784}
            className="h-auto w-full"
            priority
          />
        </div>

        {/* Chart card (bottom-left) */}
        <motion.div
          className="mx-auto mt-10 w-full max-w-[344px] lg:absolute lg:left-0 lg:top-[464px] lg:mx-0 lg:mt-0 lg:w-[344px]"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
        >
          <ChartCard />
        </motion.div>

        {/* Tagline (bottom-right) */}
        <motion.div
          className="mt-6 lg:absolute lg:right-0 lg:top-[431px] lg:mt-0"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          <div className="flex flex-col items-start gap-[10px] lg:items-end">
            <div className="flex items-center gap-[18px]">
              <p className="font-light uppercase italic leading-[100%] text-[#6E7A72] text-[16px] sm:text-[20px] lg:text-[24px]">
                Catch changes earlier.
              </p>
              <svg width={10} height={38} viewBox="0 0 10 38" className="shrink-0">
                <path d="M0 0L10 3.30435L10 34.6957L0 38Z" fill="#C5CEC8" />
              </svg>
            </div>
            <div className="flex items-center gap-[18px]">
              <p className="font-semibold uppercase leading-[100%] text-[#46524B] text-[20px] sm:text-[24px] lg:text-[32px]">
                Act sooner.
              </p>
              <svg width={10} height={52} viewBox="0 0 10 52" className="shrink-0">
                <path d="M0 0L10 4.52174L10 47.4783L0 52Z" fill="#17925A" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ChartCard() {
  return (
    <div className="w-full overflow-hidden rounded-[10px] bg-[#FFFFF9]">
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
