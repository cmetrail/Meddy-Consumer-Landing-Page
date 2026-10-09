"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header";

// Figma: desktop node 12613:16078 (1440 x 1024). Teal gradient, dark header, headline + copy on the left, a cut-out portrait
// with grid / dotted-ellipse layers on the right (all positioned from the middle of the row, like the design), and a frosted
// card with four photo tiles flush with the bottom edge. Mobile (node 12721:16036): the same layers at ~0.6 scale placed from the
// text column's top-left, and the tiles in a sideways scroller on a frosted strip at the bottom.
const ease = [0.22, 1, 0.36, 1] as const;
const A = "/personalized-health-plans/hero";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

// each tile image is the Figma layer cropped inside a 195px frame (height / top as %)
const CARDS = [
  { label: "Nutrition", src: "card-nutrition.jpg", img: { height: "100%", top: "0%" } },
  { label: "Fitness", src: "card-fitness.jpg", img: { height: "133.33%", top: "-28.31%" } },
  { label: "Sleep", src: "card-sleep.jpg", img: { height: "166.67%", top: "-62.64%" } },
  { label: "Labs", src: "card-labs.jpg", img: { height: "166.56%", top: "-31.59%" } },
];

const mid = (offset: number) => `calc(50% + ${offset}px)`;

/** the portrait composition: 510px wide box hanging 6px past the right edge, every layer placed from the row's vertical middle */
function Composition() {
  return (
    <>
      <div className="absolute mix-blend-soft-light" style={{ right: -6.01, top: mid(-77.18), width: 510.008, height: 633.637, transform: "translateY(-50%)" }}>
        <Image src={`${A}/grid.svg`} alt="" fill unoptimized priority className="block max-w-none" />
      </div>
      <div className="absolute mix-blend-soft-light" style={{ right: 37.88, top: mid(85.25), width: 422.225, height: 60.022, transform: "translateY(-50%)" }}>
        <Image src={`${A}/ellipse-a.png`} alt="" fill priority sizes="423px" className="block max-w-none" />
      </div>
      <div className="absolute" style={{ right: 38.5, top: mid(85.56), width: 421.606, height: 51.978, transform: "translateY(-50%)" }}>
        <Image src={`${A}/ellipse-b.svg`} alt="" fill unoptimized priority className="block max-w-none" />
      </div>
      <div className="absolute overflow-hidden" style={{ right: 5.69, top: mid(37.04), width: 415.006, height: 559.114, transform: "translateY(-50%) scaleX(-1)" }}>
        <Image
          src={`${A}/photo.png`}
          alt="A woman with her eyes closed, calm"
          width={1199}
          height={1495}
          priority
          sizes="512px"
          className="pointer-events-none absolute max-w-none"
          style={{ height: "114.07%", left: "-8.94%", top: "-14.06%", width: "123.25%" }}
        />
      </div>
      <div className="absolute" style={{ right: 57.97, top: mid(164.14), width: 259.679, height: 169.547, transform: "translateY(-50%)" }}>
        <Image src={`${A}/vector.svg`} alt="" fill unoptimized priority className="block max-w-none" />
      </div>
      <div
        className="absolute"
        style={{
          right: -6,
          top: mid(264.5),
          width: 510,
          height: 105,
          transform: "translateY(-50%)",
          background: "linear-gradient(180deg, rgba(75,145,130,0) 20.268%, #4c9182 92.736%)",
        }}
      />
    </>
  );
}

/** mobile portrait composition: same layers, ~0.6 scale, placed from the top-left of the text column; the portrait runs off the right edge */
function MobileComposition() {
  return (
    <>
      <div className="absolute mix-blend-soft-light" style={{ left: 110, top: 190.5, width: 307.789, height: 382.399 }}>
        <Image src={`${A}/grid.svg`} alt="" fill unoptimized priority className="block max-w-none" />
      </div>
      <div className="absolute mix-blend-soft-light" style={{ left: 136.49, top: 461.61, width: 254.812, height: 36.223 }}>
        <Image src={`${A}/ellipse-a.png`} alt="" fill priority sizes="255px" className="block max-w-none" />
      </div>
      <div className="absolute" style={{ left: 136.49, top: 464.23, width: 254.439, height: 31.369 }}>
        <Image src={`${A}/ellipse-b.svg`} alt="" fill unoptimized priority className="block max-w-none" />
      </div>
      <div className="absolute overflow-hidden" style={{ left: 154.71, top: 235.77, width: 250.455, height: 337.424, transform: "scaleX(-1)" }}>
        <Image
          src={`${A}/photo.png`}
          alt="A woman with her eyes closed, calm"
          width={1199}
          height={1495}
          priority
          sizes="251px"
          className="pointer-events-none absolute max-w-none"
          style={{ height: "114.07%", left: "-8.94%", top: "-14.06%", width: "123.25%" }}
        />
      </div>
      <div className="absolute" style={{ left: 222.46, top: 476.18, width: 156.716, height: 102.322 }}>
        <Image src={`${A}/vector.svg`} alt="" fill unoptimized priority className="block max-w-none" />
      </div>
    </>
  );
}

export default function PersonalizedHealthPlansHeroSection() {
  return (
    <section
      className="relative flex min-h-dvh w-full flex-col overflow-hidden lg:min-h-[max(1024px,100dvh)]"
      style={{ background: "linear-gradient(126.08deg, rgb(78, 121, 89) 3.1626%, rgb(74, 153, 144) 104.37%)" }}
    >
      <div className="relative z-30">
        <Header variant="dark" active="Personalized Health Plans" />
      </div>

      {/* same container as the header: text, portrait and the card all share its edges. No z-index here so the soft-light
          layers of the portrait blend with the gradient behind them. */}
      <div className="relative mx-auto flex w-full max-w-360 flex-1 flex-col px-5 lg:px-10 lg:pt-6">
        <div className="relative flex flex-1 flex-col items-start justify-start pt-2 lg:justify-center lg:py-0">
          {/* text: stops 540px short of the right edge on desktop so it never runs into the portrait, wrapping instead */}
          <div className="relative flex w-full flex-col items-start gap-5 lg:max-w-[calc(100%-540px)]">
            <div className="flex w-full flex-col items-start gap-[35px]">
              <motion.div className="flex w-full flex-col items-start gap-4 leading-[1.5] lg:gap-0" {...fade(0)}>
                <h1 className="flex flex-col items-start">
                  <span className="whitespace-nowrap px-[5px] text-[20px] font-medium text-white lg:-mb-[31px] lg:text-[64px]">A HEALTH PLAN BUILT</span>
                  <span className="comprehensive-serif whitespace-nowrap text-[44px] font-normal italic text-[#d8ffde] lg:text-[104px]">around you.</span>
                </h1>
                <p className="max-w-[337px] text-[16px] font-normal text-white lg:max-w-none lg:text-[20px]">
                  Your nutrition. Your Workouts. Your sleep. Your <span className="text-[#d8ffde] lg:text-white">labs</span>. Your{" "}
                  <span className="text-[#d8ffde] lg:text-white">medications</span>. Your <span className="text-[#d8ffde] lg:text-white">goals</span>.{" "}
                </p>
              </motion.div>
              <motion.p className="w-full text-[14px] font-normal leading-[1.5] text-[#e2dada] lg:text-[16px]" {...fade(0.15)}>
                Meddy brings them together so your physician can build a plan around how you actually live—and adjust it as your health changes.
              </motion.p>
            </div>
            <motion.button
              type="button"
              className="rounded-[49px] bg-white px-5 py-3 text-[16px] font-normal leading-[normal] text-[#17925a] transition-transform duration-300 hover:scale-[1.03] lg:px-6 lg:py-4 lg:text-[20px]"
              {...fade(0.3)}
            >
              Build My Health Plan
            </motion.button>

            {/* portrait composition (mobile): placed from this column's top-left, on top of the text like the design */}
            <div className="pointer-events-none absolute left-0 top-0 lg:hidden" aria-hidden>
              <MobileComposition />
            </div>
          </div>
          {/* mobile: room for the portrait that hangs below the button */}
          <div className="h-[225px] w-full shrink-0 lg:hidden" aria-hidden />

          {/* portrait composition (desktop) */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
            <Composition />
          </div>
        </div>

        {/* frosted card with four tiles, flush with the bottom edge */}
        <motion.div
          className="relative hidden w-full shrink-0 flex-col items-center justify-center overflow-clip rounded-t-[12px] bg-[rgba(223,249,255,0.2)] p-8 lg:flex lg:h-[307px]"
          {...fade(0.4)}
        >
          <div className="flex min-h-px w-full flex-1 items-center">
            {CARDS.map((c) => (
              <div key={c.label} className="mr-4 flex h-full min-w-px flex-1 flex-col items-start gap-2 rounded-[10px] bg-white p-2 last:mr-0">
                <div className="relative h-[195px] w-full shrink-0 overflow-hidden rounded-[5px]">
                  <Image
                    src={`${A}/${c.src}`}
                    alt={c.label}
                    width={1200}
                    height={1200}
                    sizes="270px"
                    className="pointer-events-none absolute left-0 w-full max-w-none"
                    style={{ height: c.img.height, top: c.img.top }}
                  />
                </div>
                <p className="comprehensive-serif whitespace-nowrap text-[16px] font-normal italic leading-[1.5] text-[#46524b]">{c.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* mobile: frosted strip with the tiles in a sideways scroller, full width, pinned to the bottom */}
      <div className="relative w-full bg-[rgba(223,249,255,0.2)] pb-16 pt-2 lg:hidden">
        <div className="flex w-full items-center gap-[5.215px] overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CARDS.map((c) => (
            <div key={c.label} className="relative h-[165.57px] w-[184.474px] shrink-0 rounded-[6.519px] bg-white">
              <div className="absolute left-[7.82px] top-[7.82px] h-[127.111px] w-[169.481px] overflow-hidden rounded-[3.259px]">
                <Image
                  src={`${A}/${c.src}`}
                  alt={c.label}
                  width={1200}
                  height={1200}
                  sizes="170px"
                  className="pointer-events-none absolute left-0 w-full max-w-none"
                  style={{ height: c.img.height, top: c.img.top }}
                />
              </div>
              <p className="absolute left-[7.82px] top-[142.76px] whitespace-nowrap text-[10px] font-bold uppercase italic leading-[normal] text-[#46524b]">{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
