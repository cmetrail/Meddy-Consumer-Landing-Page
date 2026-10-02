"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import { MoveRight } from "lucide-react";

// lg+: Figma node 11274:1211 "Desktop - 356" (1440 x 1028) scaled by --u so the
// hero always fits one viewport:
//   --u = min(100vw, 1440px) / 1440  vs  100dvh / 1028, whichever is smaller
const u = (n: number) => `calc(${n} * var(--u))`;

const BG = "linear-gradient(178deg, rgb(81, 123, 95) 0%, rgb(164, 210, 188) 100%)";

function SleepBar({ fill, variant }: { fill: number; variant: "before" | "after" }) {
  const isAfter = variant === "after";
  return (
    <div
      className="relative shrink-0 rounded-[29px] lg:h-[var(--bh)] lg:w-[var(--bw)]"
      style={{
        height: 21,
        width: 160,
        ["--bh" as string]: u(21),
        ["--bw" as string]: u(242),
        background: isAfter ? "rgba(76, 131, 76, 0.1)" : "#A8C9B7",
        border: `1px solid ${isAfter ? "rgba(76, 131, 76, 0.5)" : "#B4E8BC"}`,
      }}
    >
      <div
        className="absolute left-[-1px] top-[-1px] h-[calc(100%+2px)] rounded-[29px]"
        style={{ width: `${(fill / 242) * 100}%`, background: isAfter ? "#4C834C" : "#D3FBD3" }}
      />
    </div>
  );
}

function Cards() {
  return (
    <>
      {/* Blood pressure */}
      <div
        className="flex w-full flex-col justify-between rounded-[21px] border border-white/30 p-5 backdrop-blur-[10px] lg:h-[var(--h)] lg:min-w-0 lg:flex-[1_1_var(--w)] lg:p-[var(--p)]"
        style={{
          background: "rgba(217, 217, 217, 0.2)",
          ["--w" as string]: u(420),
          ["--h" as string]: u(186),
          ["--p" as string]: `${u(23)} ${u(28)} ${u(29)} ${u(29)}`,
        }}
      >
        <span className="text-[14px] uppercase leading-[1.42] text-white lg:text-[length:max(12px,var(--d))]" style={{ ["--d" as string]: u(16) }}>
          Blood pressure
        </span>
        <div className="mt-4 flex items-center justify-between gap-3 lg:mt-0 lg:justify-start lg:gap-[var(--g24)]" style={{ ["--g24" as string]: u(24) }}>
          <div className="flex flex-col lg:gap-[var(--g7)]" style={{ ["--g7" as string]: u(7) }}>
            <span className="text-[28px] leading-none text-white lg:text-[length:max(24px,var(--d))]" style={{ ["--d" as string]: u(40) }}>132/84</span>
            <span className="mt-1 text-[11px] text-white lg:mt-0 lg:text-[length:max(10px,var(--d))]" style={{ ["--d" as string]: u(12) }}>mmHg</span>
          </div>
          <MoveRight className="shrink-0 text-white" style={{ width: u(48), height: u(48) }} />
          <div className="flex flex-col lg:gap-[var(--g7)]" style={{ ["--g7" as string]: u(7) }}>
            <span className="text-[28px] leading-none text-white lg:text-[length:max(24px,var(--d))]" style={{ ["--d" as string]: u(40) }}>128/80</span>
            <span className="mt-1 text-[11px] text-white lg:mt-0 lg:text-[length:max(10px,var(--d))]" style={{ ["--d" as string]: u(12) }}>mmHg</span>
          </div>
        </div>
      </div>

      {/* Resting heart rate */}
      <div
        className="flex w-full flex-col rounded-[21px] border border-white/30 p-5 backdrop-blur-[10px] lg:h-[var(--h)] lg:min-w-0 lg:flex-[1_1_var(--w)] lg:p-[var(--p)]"
        style={{
          background: "rgba(217, 217, 217, 0.2)",
          ["--w" as string]: u(420),
          ["--h" as string]: u(186),
          ["--p" as string]: `${u(23)} ${u(28)} ${u(16)}`,
        }}
      >
        <span className="text-[14px] uppercase leading-[1.42] text-white lg:text-[length:max(12px,var(--d))]" style={{ ["--d" as string]: u(16) }}>
          Resting heart rate
        </span>
        <div className="mt-5 flex flex-col items-center gap-4 lg:mt-[var(--g25)] lg:gap-[var(--g18)]" style={{ ["--g18" as string]: u(18), ["--g25" as string]: u(25) }}>
          <div className="w-full max-w-[363px] lg:w-[var(--w)]" style={{ ["--w" as string]: u(363) }}>
            <Image src="/medication/heart-rate-line-new.svg" alt="" width={364} height={38} unoptimized className="h-auto w-full" />
          </div>
          <div className="flex items-center gap-3 lg:gap-[var(--g11)]" style={{ ["--g11" as string]: u(11) }}>
            <span className="flex items-end gap-1 lg:gap-[var(--g9)]" style={{ ["--g9" as string]: u(9) }}>
              <span className="text-[20px] leading-none text-white lg:text-[length:max(18px,var(--d))]" style={{ ["--d" as string]: u(24) }}>72</span>
              <span className="text-[11px] text-white lg:text-[length:max(10px,var(--d))]" style={{ ["--d" as string]: u(12) }}>bpm</span>
            </span>
            <MoveRight className="shrink-0 text-white" style={{ width: u(24), height: u(24) }} />
            <span className="flex items-end gap-1 lg:gap-[var(--g9)]" style={{ ["--g9" as string]: u(9) }}>
              <span className="text-[20px] leading-none text-white lg:text-[length:max(18px,var(--d))]" style={{ ["--d" as string]: u(24) }}>68</span>
              <span className="text-[11px] text-white lg:text-[length:max(10px,var(--d))]" style={{ ["--d" as string]: u(12) }}>bpm</span>
            </span>
          </div>
        </div>
      </div>

      {/* Sleep Duration */}
      <div
        className="flex w-full flex-col rounded-[21px] border border-white/30 p-5 backdrop-blur-[10px] lg:h-[var(--h)] lg:min-w-0 lg:flex-[1_1_var(--w)] lg:p-[var(--p)]"
        style={{
          background: "rgba(217, 217, 217, 0.2)",
          ["--w" as string]: u(410),
          ["--h" as string]: u(186),
          ["--p" as string]: `${u(23)} ${u(19)} ${u(16)}`,
        }}
      >
        <span className="text-[14px] uppercase leading-[1.42] text-white lg:text-[length:max(12px,var(--d))]" style={{ ["--d" as string]: u(16) }}>
          Sleep Duration
        </span>
        <div className="mt-6 flex flex-col justify-center gap-6 lg:mt-0 lg:flex-1 lg:gap-[var(--g36)]" style={{ ["--g36" as string]: u(36) }}>
          <div className="flex items-center gap-3 lg:gap-[var(--g10)]" style={{ ["--g10" as string]: u(10) }}>
            <span className="w-[60px] shrink-0 text-[13px] uppercase text-[#F4F4F5] lg:w-[var(--w)] lg:text-[length:max(12px,var(--d))]" style={{ ["--w" as string]: u(57), ["--d" as string]: u(14) }}>
              Before
            </span>
            <SleepBar fill={98} variant="before" />
            <span className="shrink-0 text-[14px] text-[#D3FBD3] lg:text-[length:max(13px,var(--d))]" style={{ ["--d" as string]: u(16) }}>6h 12m</span>
          </div>
          <div className="flex items-center gap-3 lg:gap-[var(--g10)]" style={{ ["--g10" as string]: u(10) }}>
            <span className="w-[60px] shrink-0 text-[13px] font-semibold uppercase text-[#F4F4F5] lg:w-[var(--w)] lg:text-[length:max(12px,var(--d))]" style={{ ["--w" as string]: u(57), ["--d" as string]: u(16) }}>
              After
            </span>
            <SleepBar fill={189} variant="after" />
            <span className="shrink-0 text-[14px] font-semibold text-[#4C834C] lg:text-[length:max(13px,var(--d))]" style={{ ["--d" as string]: u(16) }}>7h 18m</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Mobile card strip (Figma node 12306:29602, 402 wide): three glass cards, middle one centred
const M_CARD = "flex h-[118px] shrink-0 snap-center flex-col justify-center rounded-[16px] bg-[rgba(217,217,217,0.2)] border border-white/30 backdrop-blur-[10px]";

function MobileCards() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const centerOn = (i: number, behavior: ScrollBehavior) =>
      el.scrollTo({ left: cards[i].offsetLeft - (el.clientWidth - cards[i].offsetWidth) / 2, behavior });
    // card whose centre is closest to the strip centre
    const current = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      return cards.reduce((best, c, i) =>
        Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) < Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - mid) ? i : best, 0);
    };

    centerOn(1, "instant");

    // auto-slide on a loop (last card wraps to the first); paused while the user is touching it
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let pausedUntil = 0;
    const pause = () => (pausedUntil = Date.now() + 5000);
    el.addEventListener("pointerdown", pause);
    el.addEventListener("touchstart", pause, { passive: true });
    el.addEventListener("wheel", pause, { passive: true });
    const timer = window.setInterval(() => {
      if (Date.now() < pausedUntil) return;
      centerOn((current() + 1) % cards.length, "smooth");
    }, 3000);
    return () => {
      window.clearInterval(timer);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("touchstart", pause);
      el.removeEventListener("wheel", pause);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50%-105px)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className={`${M_CARD} w-[210px] p-4`}>
        <div className="flex flex-col gap-[5px]">
          <span className="text-[12px] uppercase leading-[1.1241] text-white">Blood pressure</span>
          <div className="flex items-center gap-[10px]">
            <div className="flex flex-col leading-[1.1241] text-white">
              <span className="text-[20px]">132/84</span>
              <span className="text-[10px]">mmHg</span>
            </div>
            <MoveRight className="size-6 shrink-0 text-white" />
            <div className="flex flex-col leading-[1.1241] text-white">
              <span className="text-[20px]">128/80</span>
              <span className="text-[10px]">mmHg</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`${M_CARD} w-[208px] p-4`}>
        <div className="flex flex-col gap-2">
          <span className="text-[12px] uppercase leading-[1.1241] text-white">Resting heart rate</span>
          <Image src="/medication/heart-rate-line-new.svg" alt="" width={176} height={16} unoptimized className="h-[15.7px] w-full" />
          <div className="flex items-center justify-between text-white">
            <span className="flex items-end gap-[9px] leading-[1.1241]">
              <span className="text-[16px]">72</span>
              <span className="py-[3px] text-[10px]">bpm</span>
            </span>
            <MoveRight className="size-6 shrink-0" />
            <span className="flex items-end gap-[9px] leading-[1.1241]">
              <span className="text-[16px]">68</span>
              <span className="py-[3px] text-[10px]">bpm</span>
            </span>
          </div>
        </div>
      </div>

      <div className={`${M_CARD} w-[208px] p-2`}>
        <div className="flex flex-col gap-[15px]">
          <span className="text-[12px] uppercase leading-[1.1241] text-white">Sleep Duration</span>
          <div className="flex flex-col gap-[10px] text-[12px] leading-[1.1241] text-[#F4F4F5]">
            {[
              { l: "Before", fill: 40.5, t: "6h 12m", c: "#D3FBD3", fw: 400, variant: "before" },
              { l: "After", fill: 78.1, t: "7h 18m", c: "#4C834C", fw: 600, variant: "after" },
            ].map((r) => {
              const isAfter = r.variant === "after";
              return (
                <div key={r.l} className="flex items-center gap-2">
                  <span className="shrink-0 uppercase" style={{ fontWeight: r.fw }}>{r.l}</span>
                  <div
                    className="relative h-3 flex-1 rounded-[29px]"
                    style={{
                      background: isAfter ? "rgba(76, 131, 76, 0.1)" : "#A8C9B7",
                      border: `1px solid ${isAfter ? "rgba(76, 131, 76, 0.5)" : "#B4E8BC"}`,
                    }}
                  >
                    <div
                      className="absolute left-[-1px] top-[-1px] h-[calc(100%+2px)] rounded-[29px]"
                      style={{ width: `${r.fill}%`, background: isAfter ? "#4C834C" : "#D3FBD3" }}
                    />
                  </div>
                  <span className="shrink-0" style={{ color: r.c, fontWeight: r.fw }}>{r.t}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MedicationHeroSection() {
  return (
    <section
      className="relative flex min-h-[calc(875*var(--m))] w-full flex-col overflow-hidden text-white lg:block lg:h-[calc(1028*var(--u))] lg:min-h-0"
      style={
        {
          "--u": "min(calc(min(100vw, 1440px) * 0.000694444), calc(100dvh * 0.000972763))",
          "--m": "calc(min(100vw, 500px) / 402)",
          background: BG,
        } as React.CSSProperties
      }
    >
      <div className="relative z-30 shrink-0">
        <Header variant="dark" active="Medication" />
      </div>

      {/* Screen-reader heading */}
      <h1 className="sr-only">Know what your medications are actually doing.</h1>

      {/* Desktop (lg+) — Figma node 11274:1211, absolute layout on the 1440 frame */}
      <div className="absolute inset-0 z-10 hidden lg:block">
        <div className="relative mx-auto h-full" style={{ width: u(1440) }}>
          {/* Big serif word, behind the person */}
          <div className="absolute" style={{ left: u(204), top: u(152), zIndex: 0 }}>
            <span className="comprehensive-serif block whitespace-nowrap italic text-[#DCFFD8]" style={{ fontSize: u(188), lineHeight: 1.45 }}>
              medications
            </span>
          </div>

          {/* Person photo: Figma crops a 1199 x 1592 cut-out inside a 603 x 1030 box (bleeds off the bottom) */}
          <div className="absolute overflow-hidden" style={{ left: u(472), top: u(246), width: u(603), height: u(1030), zIndex: 10 }}>
            <Image
              src="/medication/medication-hero-person-new.png"
              alt=""
              width={1199}
              height={1592}
              priority
              sizes="1000px"
              className="absolute max-w-none"
              style={{ left: "-41.22%", top: "-26.55%", width: "162.86%", height: "126.58%" }}
            />
          </div>

          <div className="absolute font-medium uppercase text-white" style={{ left: u(916), top: u(398), zIndex: 20 }}>
            <span className="block whitespace-nowrap" style={{ fontSize: u(40), lineHeight: 1.1241 }}>are actually doing.</span>
          </div>
        </div>

        {/* Left copy + cards share the header container (max-w-360, px-10) */}
        <div className="absolute inset-0 mx-auto max-w-360 px-10">
          <div className="relative h-full">
          {/* Heading + copy + CTA */}
          <div className="absolute font-medium uppercase text-white" style={{ left: 0, top: u(172), zIndex: 20 }}>
            <span className="block whitespace-nowrap" style={{ fontSize: u(40), lineHeight: 1.1241 }}>Know what your</span>
          </div>
          <p className="absolute text-white" style={{ left: 0, top: u(470), width: u(412), fontSize: `max(13px, ${u(16)})`, lineHeight: 1.47, zIndex: 20 }}>
            Meddy helps your physician follow what happens before and after a medication starts or
            changes—so your treatment can evolve based on how you respond.
          </p>
          <button
            type="button"
            className="absolute flex items-center justify-center whitespace-nowrap rounded-[var(--r)] bg-white px-[var(--px)] py-[var(--py)] font-medium uppercase leading-[1.1241] text-[#5D5D5D] shadow-[0px_4px_2px_rgba(34,33,33,0.25)] transition-opacity hover:opacity-90"
            style={{
              left: 0,
              top: u(600),
              zIndex: 20,
              fontSize: `max(11px, ${u(14)})`,
              ["--r" as string]: u(10),
              ["--px" as string]: u(33),
              ["--py" as string]: u(13),
            }}
          >
            Start Physician Care
          </button>

          {/* Bottom metric cards */}
          <div className="absolute inset-x-0 flex items-stretch" style={{ top: u(786), gap: u(21), zIndex: 20 }}>
            <Cards />
          </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet (<lg) — Figma node 12306:29602 (402 x 875) */}
      <div className="pointer-events-none absolute inset-0 mx-auto max-w-[500px] lg:hidden">
        <div className="absolute overflow-hidden" style={{ left: "calc(155 * var(--m))", top: "calc(305.5 * var(--m))", width: "calc(334 * var(--m))", height: "calc(570 * var(--m))" }}>
          <Image
            src="/medication/medication-hero-person-new.png"
            alt=""
            width={1199}
            height={1592}
            priority
            sizes="400px"
            className="absolute max-w-none"
            style={{ left: "-41.22%", top: "-26.55%", width: "162.86%", height: "126.58%" }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[500px] flex-1 flex-col gap-8 pb-16 pt-4 lg:hidden">
        <div className="flex flex-col gap-5 px-5">
          <div className="flex flex-col gap-[35px]">
            <p className="leading-[normal]">
              <span className="block px-[5px] text-[24px] font-medium uppercase leading-[1.1241] text-white">Know what your</span>
              <span className="comprehensive-serif text-[42px] italic leading-[normal] text-[#DCFFD8]">medications </span>
              <span className="text-[24px] font-medium uppercase leading-[1.1241] text-white">are actually doing.</span>
            </p>
            <p className="text-[16px] leading-[1.416] text-white">
              Meddy helps your physician follow what happens before and after a medication starts or
              changes—so your treatment can evolve based on how you respond.
            </p>
          </div>
          <button
            type="button"
            className="w-fit rounded-[49px] bg-white px-5 py-3 text-[16px] leading-[normal] text-[#17925A]"
          >
            Start Physician Care
          </button>
        </div>

        <div className="mt-auto">
          <MobileCards />
        </div>
      </div>
    </section>
  );
}
