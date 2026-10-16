"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Link from "next/link";
import styles from "./MedicationHeroSection.module.css";
import { MoveRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const BG = "linear-gradient(178deg, #577e63 0%, #a4d2bc 100%)";

function MedicationLetters() {
  return (
    <span className={styles.word}>
      {Array.from("medications").map((letter, index) => (
        <span key={index} data-medication-letter className={styles.letter}>
          {letter}
        </span>
      ))}
    </span>
  );
}

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
      <div data-hero-card className={`${M_CARD} w-[210px] p-4`}>
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

      <div data-hero-card className={`${M_CARD} w-[208px] p-4`}>
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

      <div data-hero-card className={`${M_CARD} w-[208px] p-2`}>
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
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = heroRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add({
      desktop: "(min-width: 1024px)",
      mobile: "(max-width: 1023px)",
      reduce: "(prefers-reduced-motion: reduce)",
      pointer: "(hover: hover) and (pointer: fine)",
    }, (context) => {
      const { desktop, reduce, pointer } = context.conditions!;
      if (reduce) return;

      const select = gsap.utils.selector(root);
      const heading = desktop
        ? select(`.${styles.intro}, .${styles.medications}, .${styles.outro}`)
        : select("[data-hero-heading] > span");
      const hand = select(desktop ? `.${styles.hand}` : "[data-hero-hand]");
      const copy = select(desktop ? `.${styles.description}` : "[data-hero-copy]");
      const cta = select(desktop ? `.${styles.cta}` : "[data-hero-cta]");
      const cards = select(desktop ? `.${styles.card}` : "[data-hero-card]");
      const glow = select(`.${styles.glow}`);
      const fills = desktop ? select(`.${styles.beforeFill}, .${styles.afterFill}`) : [];
      const letters = select(desktop
        ? `.${styles.desktop} [data-medication-letter]`
        : "[data-hero-heading] [data-medication-letter]");
      gsap.set(letters, { transformOrigin: "50% 90%" });
      const xylophone = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 3.8 });
      letters.forEach((letter: HTMLElement, index: number) => {
        const strike = index * 0.085;
        xylophone
          .to(letter, { yPercent: 5, scaleY: 0.92, scaleX: 1.025, duration: 0.09, ease: "power2.in" }, strike)
          .to(letter, {
            yPercent: -(22 - index * 0.8), scaleY: 1.035, scaleX: 0.99,
            rotation: index % 2 ? 2 : -2, duration: 0.2, ease: "power2.out",
          }, strike + 0.09)
          .to(letter, {
            yPercent: 0, scaleY: 1, scaleX: 1, rotation: 0,
            duration: 1.05, ease: "elastic.out(1, 0.32)",
          }, strike + 0.29);
      });
      let entered = false;
      let visible = true;

      const entrance = gsap.timeline({ defaults: { ease: "power3.out" },
        onComplete: () => { entered = true; syncPlayback(); },
      });
      entrance
        .fromTo(glow, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.8 }, 0)
        .fromTo(heading, { y: desktop ? 38 : 20, opacity: 0, clipPath: "inset(0% 0% 100% 0%)" },
          { y: 0, opacity: 1, clipPath: "inset(0% 0% -15% 0%)", duration: 1.1, stagger: 0.14, clearProps: "clipPath" }, 0.12)
        .fromTo(hand, { y: desktop ? 90 : 42, scale: 1.045, opacity: 0, rotation: -2 },
          { y: 0, scale: 1, opacity: 1, rotation: 0, duration: 1.65, transformOrigin: "50% 90%" }, 0.25)
        .fromTo(copy, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85 }, 0.65)
        .fromTo(cta, { y: 16, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.8 }, 0.8)
        .fromTo(cards, { y: desktop ? 42 : 24, opacity: 0, rotationX: desktop ? 8 : 0 },
          { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.12, transformPerspective: 900, clearProps: "transform" }, 1);
      if (desktop) {
        entrance.fromTo(fills, { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 1.15, stagger: 0.12 }, 1.35);
        entrance.fromTo(select(`.${styles.chart}`), { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power2.inOut", clearProps: "clipPath" }, 1.2);
      }

      const ambient = gsap.to(glow, {
        xPercent: 5, yPercent: -4, scale: 1.06, duration: 7,
        repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.8,
      });
      // Keep decorative work idle when the hero is offscreen or the tab is hidden.
      const syncPlayback = () => {
        const active = visible && !document.hidden;
        ambient.paused(!active);
        xylophone.paused(!entered || !active);
        if (!entered) entrance.paused(!active);
      };
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      });
      observer.observe(root);
      document.addEventListener("visibilitychange", syncPlayback);

      const moveX = desktop && pointer ? gsap.quickTo(hand, "x", { duration: 1.2, ease: "power3.out" }) : null;
      const rotate = desktop && pointer ? gsap.quickTo(hand, "rotation", { duration: 1.4, ease: "power3.out" }) : null;
      const move = (event: PointerEvent) => {
        if (!entered || !visible || event.pointerType !== "mouse") return;
        const bounds = root.getBoundingClientRect();
        const offset = (event.clientX - bounds.left) / bounds.width - 0.5;
        moveX?.(offset * 18);
        rotate?.(offset * 1.2);
      };
      const reset = () => { moveX?.(0); rotate?.(0); };
      if (moveX) {
        root.addEventListener("pointermove", move);
        root.addEventListener("pointerleave", reset);
      }
      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", syncPlayback);
        root.removeEventListener("pointermove", move);
        root.removeEventListener("pointerleave", reset);
      };
    });
    return () => media.revert();
  }, { scope: heroRef });

  return (
    <div ref={heroRef} className={styles.viewport}>
      <div className={styles.desktopHeader}>
        <Header variant="dark" />
      </div>
      <section
        className={`${styles.hero} relative flex min-h-0 w-full flex-col overflow-hidden text-white lg:block`}
        style={
          {
            "--u": "calc(min(100vw, 1440px) / 1440)",
            "--m": "calc(min(100vw, 500px) / 402)",
            background: BG,
          } as React.CSSProperties
        }
      >
        <div aria-hidden="true" className={styles.glow} />
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
            <span className={styles.medications} aria-hidden="true"><MedicationLetters /></span>
            <Image
              src="/medication/med.png"
              alt="Hand holding a green medication capsule"
              width={959}
              height={1639}
              preload
              unoptimized
              sizes="(max-width: 1440px) 40vw, 568px"
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
              top: "max(390px, calc(305.5 * var(--m)))",
              width: "calc(334 * var(--m))",
              height: "calc(570 * var(--m))",
            }}
          >
            <Image
              src="/medication/med.png"
              alt=""
              width={959}
              height={1639}
              priority
              sizes="400px"
              className="absolute max-w-none"
              data-hero-hand
              style={{
                left: "0.8%",
                top: "0.6%",
                width: "94.4%",
                height: "auto",
              }}
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[500px] flex-1 flex-col gap-8 pb-16 pt-4 lg:hidden">
          <div className="flex flex-col gap-5 px-5">
            <div className="flex flex-col gap-[35px]">
              <p data-hero-heading className="leading-[normal]">
                <span className="block text-[24px] font-medium uppercase leading-[1.1241] text-white">
                  Know what your
                </span>
                <span aria-hidden="true" className="comprehensive-serif text-[42px] italic leading-[normal] text-[#DCFFD8]">
                  <MedicationLetters />{" "}
                </span>
                <span className="text-[24px] font-medium uppercase leading-[1.1241] text-white">
                  are actually doing.
                </span>
              </p>
              <p data-hero-copy className="text-[16px] leading-[1.416] text-white">
                Meddy helps your physician follow what happens before and after
                a medication starts or changes—so your treatment can evolve
                based on how you respond.
              </p>
            </div>
            <Link
              href="/book-consultation"
              data-hero-cta
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
    </div>
  );
}
