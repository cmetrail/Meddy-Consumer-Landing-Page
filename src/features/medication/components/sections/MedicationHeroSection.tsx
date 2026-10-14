"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";
import styles from "./MedicationHeroSection.module.css";
import { MoveRight } from "lucide-react";

const BG = "linear-gradient(178deg, #577e63 0%, #a4d2bc 100%)";

function Cards() {
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <span className={styles.cardTitle}>Blood pressure</span>
        <div className={styles.pressure}>
          <div>
            <span className={styles.metric}>132/84</span>
            <span className={styles.unit}>mmHg</span>
          </div>
          <MoveRight
            aria-hidden="true"
            className={styles.pressureArrow}
            strokeWidth={1}
          />
          <div>
            <span className={styles.metric}>128/80</span>
            <span className={styles.unit}>mmHg</span>
          </div>
        </div>
      </div>
      <div className={`${styles.card} ${styles.heartCard}`}>
        <span className={styles.cardTitle}>Resting heart rate</span>
        <Image
          src="/medication/heart-rate-line-new.svg"
          alt=""
          width={364}
          height={35}
          unoptimized
          className={styles.chart}
        />
        <div className={styles.heartValues}>
          <span className={styles.metric}>72</span>
          <span className={styles.bpm}>bpm</span>
          <MoveRight
            aria-hidden="true"
            className={styles.heartArrow}
            strokeWidth={1}
          />
          <span className={styles.metric}>68</span>
          <span className={styles.bpm}>bpm</span>
        </div>
      </div>
      <div className={`${styles.card} ${styles.sleepCard}`}>
        <span className={styles.cardTitle}>Sleep duration</span>
        <div className={styles.sleepRows}>
          <div className={styles.sleepRow}>
            <span>Before</span>
            <div className={styles.sleepTrack}>
              <div className={styles.beforeFill} />
            </div>
            <span className={styles.beforeTime}>6h 12m</span>
          </div>
          <div className={styles.sleepRow}>
            <span>After</span>
            <div className={`${styles.sleepTrack} ${styles.afterTrack}`}>
              <div className={styles.afterFill} />
            </div>
            <span className={styles.afterTime}>7h 18m</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mobile card strip (Figma node 12306:29602, 402 wide): three glass cards, middle one centred
const M_CARD =
  "flex h-[118px] shrink-0 snap-center flex-col justify-center rounded-[16px] bg-[rgba(217,217,217,0.2)] border border-white/30 backdrop-blur-[10px]";

function MobileCards() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = Array.from(el.children) as HTMLElement[];
    const centerOn = (i: number, behavior: ScrollBehavior) =>
      el.scrollTo({
        left: cards[i].offsetLeft - (el.clientWidth - cards[i].offsetWidth) / 2,
        behavior,
      });
    // card whose centre is closest to the strip centre
    const current = () => {
      const mid = el.scrollLeft + el.clientWidth / 2;
      return cards.reduce(
        (best, c, i) =>
          Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid) <
          Math.abs(cards[best].offsetLeft + cards[best].offsetWidth / 2 - mid)
            ? i
            : best,
        0,
      );
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
          <span className="text-[12px] uppercase leading-[1.1241] text-white">
            Blood pressure
          </span>
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
          <span className="text-[12px] uppercase leading-[1.1241] text-white">
            Resting heart rate
          </span>
          <Image
            src="/medication/heart-rate-line-new.svg"
            alt=""
            width={176}
            height={16}
            unoptimized
            className="h-[15.7px] w-full"
          />
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
          <span className="text-[12px] uppercase leading-[1.1241] text-white">
            Sleep Duration
          </span>
          <div className="flex flex-col gap-[10px] text-[12px] leading-[1.1241] text-[#F4F4F5]">
            {[
              {
                l: "Before",
                fill: 40.5,
                t: "6h 12m",
                c: "#D3FBD3",
                fw: 400,
                variant: "before",
              },
              {
                l: "After",
                fill: 78.1,
                t: "7h 18m",
                c: "#4C834C",
                fw: 600,
                variant: "after",
              },
            ].map((r) => {
              const isAfter = r.variant === "after";
              return (
                <div key={r.l} className="flex items-center gap-2">
                  <span
                    className="shrink-0 uppercase"
                    style={{ fontWeight: r.fw }}
                  >
                    {r.l}
                  </span>
                  <div
                    className="relative h-3 flex-1 rounded-[29px]"
                    style={{
                      background: isAfter
                        ? "rgba(76, 131, 76, 0.1)"
                        : "#A8C9B7",
                      border: `1px solid ${isAfter ? "rgba(76, 131, 76, 0.5)" : "#B4E8BC"}`,
                    }}
                  >
                    <div
                      className="absolute left-[-1px] top-[-1px] h-[calc(100%+2px)] rounded-[29px]"
                      style={{
                        width: `${r.fill}%`,
                        background: isAfter ? "#4C834C" : "#D3FBD3",
                      }}
                    />
                  </div>
                  <span
                    className="shrink-0"
                    style={{ color: r.c, fontWeight: r.fw }}
                  >
                    {r.t}
                  </span>
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
    <>
      <div className={styles.desktopHeader}>
        <Header variant="dark" />
      </div>
      <section
        className={`${styles.hero} relative flex min-h-[calc(875*var(--m))] w-full flex-col overflow-hidden text-white lg:block lg:min-h-0`}
        style={
          {
            "--u": "calc(min(100vw, 1440px) / 1440)",
            "--m": "calc(min(100vw, 500px) / 402)",
            background: BG,
          } as React.CSSProperties
        }
      >
        <div className="relative z-30 shrink-0 lg:hidden">
          <Header variant="dark" />
        </div>

        {/* Screen-reader heading */}
        <h1 className="sr-only">
          Know what your medications are actually doing.
        </h1>

        <div className={styles.desktop}>
          <div className={styles.canvas}>
            <span className={styles.intro}>Know what your</span>
            <span className={styles.medications}>medications</span>
            <Image
              src="/medication/medication-hero-person-new.png"
              alt="Hand holding a green medication capsule"
              width={1199}
              height={1592}
              preload
              unoptimized
              sizes="(max-width: 1440px) 68vw, 980px"
              className={styles.hand}
            />
            <span className={styles.outro}>Are actually doing</span>
            <p className={styles.description}>
              Meddy helps your physician follow what happens before and after a
              medication starts or changes—so your treatment can evolve based on
              how you respond.
            </p>
            <Link href="/book-consultation" className={styles.cta}>
              Start Physician Care
            </Link>
            <Cards />
          </div>
        </div>

        {/* Mobile / tablet (<lg) — Figma node 12306:29602 (402 x 875) */}
        <div className="pointer-events-none absolute inset-0 mx-auto max-w-[500px] lg:hidden">
          <div
            className="absolute overflow-hidden"
            style={{
              left: "calc(155 * var(--m))",
              top: "calc(305.5 * var(--m))",
              width: "calc(334 * var(--m))",
              height: "calc(570 * var(--m))",
            }}
          >
            <Image
              src="/medication/medication-hero-person-new.png"
              alt=""
              width={1199}
              height={1592}
              priority
              sizes="400px"
              className="absolute max-w-none"
              style={{
                left: "-41.22%",
                top: "-26.55%",
                width: "162.86%",
                height: "126.58%",
              }}
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[500px] flex-1 flex-col gap-8 pb-16 pt-4 lg:hidden">
          <div className="flex flex-col gap-5 px-5">
            <div className="flex flex-col gap-[35px]">
              <p className="leading-[normal]">
                <span className="block text-[24px] font-medium uppercase leading-[1.1241] text-white">
                  Know what your
                </span>
                <span className="comprehensive-serif text-[42px] italic leading-[normal] text-[#DCFFD8]">
                  medications{" "}
                </span>
                <span className="text-[24px] font-medium uppercase leading-[1.1241] text-white">
                  are actually doing.
                </span>
              </p>
              <p className="text-[16px] leading-[1.416] text-white">
                Meddy helps your physician follow what happens before and after
                a medication starts or changes—so your treatment can evolve
                based on how you respond.
              </p>
            </div>
            <Link
              href="/book-consultation"
              className="w-fit rounded-[49px] bg-white px-5 py-3 text-[16px] leading-[normal] text-[#17925A]"
            >
              Start Physician Care
            </Link>
          </div>

          <div className="mt-auto">
            <MobileCards />
          </div>
        </div>
      </section>
    </>
  );
}
