"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Figma: desktop node 12688:9322 (1440 x 1097, fixed px). Full-bleed blue photo ("image 191"), a right-aligned headline +
// intro, three glass metric cards (Sleep bars / Activity line / Weight line), then "Adjust with Confidence" on the right.
// Mobile: node 12765:15120 (402 x 912) — 32px two-line headline, three 362px cards in a sideways scroller, stacked "Adjust with / Confidence".
const ease = [0.22, 1, 0.36, 1] as const;
const A = "/how-it-works/insights";

const SLEEP_BARS = [
  { day: "Mon", h: 75 },
  { day: "Tue", h: 63 },
  { day: "Wed", h: 72 },
  { day: "Thu", h: 63 },
  { day: "Fri", h: 81 },
  { day: "Sat", h: 67 },
  { day: "Sun", h: 72 },
];
const DATES = ["Jun 1", "Jun 8", "Jun 15", "Jun 22", "Jun 30"];

type Tone = "green" | "amber";

function Badge({ label, tone }: { label: string; tone: Tone }) {
  const green = tone === "green";
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-[15.244px] border-[0.693px] border-solid px-2 py-1"
      style={{ gap: 4, background: green ? "rgba(110,231,160,0.3)" : "rgba(224,154,42,0.3)", borderColor: green ? "#6EE7A0" : "#E09A2A" }}
    >
      <span className="relative block size-2 shrink-0">
        <Image src={`${A}/${green ? "dot-green" : "dot-amber"}.svg`} alt="" fill unoptimized className="max-w-none" />
      </span>
      <p className="whitespace-nowrap text-[16px] font-normal leading-[1.5] text-white">{label}</p>
    </div>
  );
}

/** icon + title + badge, then the big value with its trend arrow (Figma 12976:12625) */
function CardHead({ title, strong, value, badge, tone, down, small }: { title: string; strong?: boolean; value: string; badge: string; tone: Tone; down?: boolean; small?: boolean }) {
  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center" style={{ gap: 8 }}>
          <span className="relative block h-[19.018px] w-[14px] shrink-0">
            <Image src={`${A}/icon.svg`} alt="" fill unoptimized className="max-w-none" />
          </span>
          <p className={`whitespace-nowrap text-center text-[20px] leading-[1.5] text-white ${strong ? "font-medium" : "font-normal"}`}>{title}</p>
        </div>
        <Badge label={badge} tone={tone} />
      </div>
      <div className="flex items-center" style={{ gap: 4 }}>
        <p className={`whitespace-nowrap text-center font-medium leading-[1.5] text-white ${small ? "text-[32px] lg:text-[40px]" : "text-[40px]"}`}>{value}</p>
        <span className="relative block size-[33px] shrink-0" style={down ? { transform: "scaleY(-1)" } : undefined}>
          <Image src={`${A}/${down ? "trend-warn" : "trend-up"}.svg`} alt="" fill unoptimized className="max-w-none" />
        </span>
      </div>
    </div>
  );
}

const CARD =
  "flex h-[319.9px] w-[362px] min-w-0 shrink-0 flex-col justify-between rounded-[8.226px] border border-solid border-white lg:h-auto lg:min-h-[319.9px] lg:w-auto lg:flex-1 lg:shrink lg:self-stretch bg-gradient-to-l from-[rgba(20,139,213,0.5)] to-[rgba(255,255,255,0.5)] p-[16.452px] backdrop-blur-[6.855px]";

function LineChartArea({ flip }: { flip?: boolean }) {
  return (
    <div className="flex min-h-px w-full flex-1 flex-col items-start justify-end" style={{ gap: 0 }}>
      {/* wipes in left to right (card variants drive it); the weight chart is the same graphic mirrored */}
      <motion.div
        className="relative min-h-[117px] w-full flex-1"
        variants={{
          hidden: { clipPath: "inset(-2% 100% -2% -2%)" },
          show: { clipPath: "inset(-2% -2% -2% -2%)", transition: { duration: 1.6, ease: "easeInOut", delay: 0.5 } },
        }}
      >
        <div className="absolute inset-0" style={flip ? { transform: "scaleX(-1)" } : undefined}>
          <span className="absolute block" style={{ inset: "-0.43% 0 0 -0.12%" }}>
            <Image src={`${A}/chart.svg`} alt="" fill unoptimized className="max-w-none" />
          </span>
        </div>
      </motion.div>
      <div className="flex w-full shrink-0 items-center justify-between text-center text-[10px] font-normal leading-[1.416] text-white">
        {DATES.map((d) => (
          <p key={d} className="whitespace-nowrap">
            {d}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function HowItWorksInsightsSection() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white">
      {/* "image 191": 1990 x 1120 box, 275px bleed each side, top-aligned */}
      <div className="pointer-events-none absolute hidden lg:block" style={{ left: -275, right: -275, top: 0.39, aspectRatio: "1672 / 941" }}>
        <Image src={`${A}/scene.png`} alt="" fill priority sizes="1990px" className="object-cover" />
      </div>
      {/* mobile: 1650 x 928 box centred 150px right of the middle, plus the dark fade */}
      <div className="pointer-events-none absolute lg:hidden" style={{ left: "calc(50% + 150px)", top: "calc(50% + 0.55px)", width: 1650, height: 928, transform: "translate(-50%, -50%)" }}>
        <Image src={`${A}/scene.png`} alt="" fill priority sizes="1650px" className="object-cover" />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[889px] opacity-60 lg:hidden"
        style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 15.937%, #030C16 100%)" }}
      />

      {/* same container as the header */}
      <div className="relative z-10 mx-auto flex w-full max-w-360 flex-col items-end gap-8 px-5 py-16 lg:gap-12 lg:px-10 lg:py-[120px]">
        {/* headline + intro, right aligned */}
        <motion.div
          className="flex flex-col items-end text-right font-normal"
          style={{ gap: 16 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="flex flex-col items-end text-[0px] leading-[0] text-[#111110] lg:whitespace-nowrap">
            <p>
              <span className="comprehensive-serif text-[32px] italic leading-[1.5] text-white lg:text-[64px]">Know</span>
              <span className="text-[32px] leading-[normal] lg:text-[96px]"> </span>
              <span className="text-[32px] font-medium leading-[1.5] text-[#111110] lg:text-[56px]">What&rsquo;s <br className="lg:hidden" />working.</span>
            </p>
            <p>
              <span className="comprehensive-serif text-[32px] italic leading-[1.5] text-white lg:text-[64px]">Change</span>
              <span className="comprehensive-serif text-[32px] italic leading-[normal] text-[#17925A] lg:text-[86px]"> </span><br className="lg:hidden" />
              <span className="text-[32px] font-medium leading-[1.5] text-[#111110] lg:text-[56px]">What Isn&rsquo;t</span>
            </p>
          </div>
          <p className="w-full max-w-[615px] text-[16px] leading-[1.5] text-white lg:text-[20px]">
            Meddy turns your data into clear insights, so you can double down on what works, adjust what doesn&rsquo;t, and keep moving toward your goals with confidence.
          </p>
        </motion.div>

        {/* three metric cards */}
        <div className="-mx-5 w-[calc(100%+40px)] overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:w-full lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max items-start lg:w-full lg:items-stretch" style={{ gap: 8 }}>
          {/* Sleep */}
          <motion.div
            className={CARD}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 0.2 } },
            }}
          >
            <div className="flex h-[287px] w-full flex-col items-start" style={{ gap: 64 }}>
              <CardHead title="Sleep" strong small value="7h 45m" badge="On track" tone="green" />
              <div className="flex min-h-px w-full flex-1 items-end" style={{ gap: 8 }}>
                {SLEEP_BARS.map((b, i) => (
                  <div key={b.day} className="flex min-w-0 flex-1 flex-col items-center">
                    <motion.div
                      className="flex w-full origin-bottom flex-col items-center rounded-b-[1px] rounded-t-[4px] bg-white/50 py-[3px] backdrop-blur-[5px]"
                      style={{ height: b.h }}
                      variants={{
                        hidden: { scaleY: 0 },
                        show: { scaleY: 1, transition: { duration: 0.8, ease, delay: 0.5 + i * 0.07 } },
                      }}
                    />
                    <p className="whitespace-nowrap text-center text-[12px] font-normal leading-[1.5] text-white">{b.day}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Activity */}
          <motion.div
            className={CARD}
            style={{ gap: 64 }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 0.3 } },
            }}
          >
            <CardHead title="Activity" value="8,200" badge="On track" tone="green" />
            <LineChartArea />
          </motion.div>

          {/* Weight (same chart, mirrored) */}
          <motion.div
            className={CARD}
            style={{ gap: 64 }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: "some" }}
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: 0.4 } },
            }}
          >
            <CardHead title="Weight" value="192 lbs" badge="Needs attention" tone="amber" down />
            <LineChartArea flip />
          </motion.div>
        </div>
        </div>

        {/* bottom line */}
        <motion.p
          className="whitespace-nowrap text-right"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
        >
          <span className="text-[32px] font-medium leading-[1.5] text-[#111110] lg:text-[56px]">Adjust with</span>
          <span className="text-[32px] font-normal leading-[normal] text-[#111110] lg:text-[50px]"> </span>
          <br className="lg:hidden" />
          <span className="comprehensive-serif text-[32px] italic leading-[1.5] text-white lg:text-[64px]">Confidence</span>
        </motion.p>
      </div>
    </section>
  );
}
