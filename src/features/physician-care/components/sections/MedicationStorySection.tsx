"use client";

import { useEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Heart,
  Leaf,
  MessageCircle,
  Moon,
  Stethoscope,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_MOTION } from "@/lib/motion";
import type { CareModel } from "../helper/createCareModel";
import styles from "./MedicationStorySection.module.css";

const chapters = [
  {
    label: "THE INITIATION SIGNAL",
    title: "Make the first dose visible.",
    text: "When a patient uses the medication pen for the first time, that event can mark the start of therapy. It gives the care team a clear initiation signal and a shared point of reference for follow-up.",
    note: "First use starts the care journey.",
    icon: Stethoscope,
  },
  {
    label: "THE WHOLE PICTURE",
    title: "One part. All connected.",
    text: "When medication is part of your physician-guided plan, it sits alongside nutrition, movement, and sleep. Every part belongs in the same conversation.",
    note: "Care that sees the connections.",
    icon: Leaf,
  },
  {
    label: "THE ONGOING CARE",
    title: "Your plan grows with you.",
    text: "Questions, check-ins, and a view of your health over time help keep the conversation going. Your physician can revisit your plan as your needs change.",
    note: "A continuing conversation.",
    icon: MessageCircle,
  },
];

export default function MedicationStorySection({ penDestinationRef }: {
  penDestinationRef?: RefObject<HTMLDivElement | null>;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const modelLayerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current!;
    const journey = journeyRef.current!;
    const visual = visualRef.current!;
    const host = canvasRef.current!;
    const media = gsap.matchMedia();

    media.add(
      {
        motion: SCROLL_MOTION,
        compact: "(max-width: 1023px)",
        touch: "(pointer: coarse)",
      },
      (context) => {
        if (!context.conditions?.motion) return;
        const compact = context.conditions.compact;
        const scrub = compact || context.conditions.touch ? 0.35 : 0.65;
        let disposed = false;
        let model: CareModel | undefined;
        let progress = 0;
        let started = false;
        const sharedJourney = section.closest("[data-care-journey]");
        const target = penDestinationRef?.current ?? sharedJourney
          ?.querySelector<HTMLElement>("[data-care-pen-target]");
        const chart = target?.closest(".a1c-scroll");
        const layer = modelLayerRef.current!;
        const travel = { progress: 0 };
        // Keep the same canvas and pose throughout the handoff. Measure the
        // untransformed visual so refreshes and reverse scrolling stay stable.
        const positionModel = () => {
          if (!target) return;
          const from = visual.getBoundingClientRect();
          const to = target.getBoundingClientRect();
          if (!from.height || !to.height) return;
          const p = travel.progress;
          gsap.set(layer, {
            x: (to.left + to.width / 2 - from.left - from.width / 2) * p,
            y: (to.top + to.height / 2 - from.top - from.height / 2) * p,
            scale: 1 + (to.height / from.height - 1) * p,
          });
        };
        const handoff = target ? gsap.to(travel, {
          progress: 1,
          ease: "power2.inOut",
          onUpdate: positionModel,
          scrollTrigger: {
            trigger: compact ? chart : journey,
            start: compact ? "top 90%" : "bottom bottom",
            endTrigger: chart,
            end: "top 45%",
            scrub,
            invalidateOnRefresh: true,
            onRefresh: positionModel,
          },
        }) : undefined;
        // The source is sticky on phones. Keep tracking its live position even
        // after the travel tween ends, until both sections have left the screen.
        const alignment = target && sharedJourney ? ScrollTrigger.create({
          trigger: sharedJourney,
          start: "top bottom",
          end: "bottom top",
          onUpdate: positionModel,
          onRefresh: positionModel,
        }) : undefined;
        if (target) target.dataset.sharedPen = "true";
        const trigger = ScrollTrigger.create({
          trigger: journey,
          start: compact ? "top 85%" : "top 15%",
          end: compact ? "bottom bottom" : "bottom 85%",
          onUpdate: (self) => {
            progress = self.progress;
            visual.dataset.stage = String(
              Math.min(2, Math.floor(progress * 3)),
            );
            model?.update(progress);
          },
        });
        progress = trigger.progress;
        visual.dataset.stage = String(Math.min(2, Math.floor(progress * 3)));
        const observer = new IntersectionObserver(
          async ([entry]) => {
            if (!entry.isIntersecting || started) return;
            started = true;
            observer.disconnect();
            try {
              const { createCareModel } =
                await import("../helper/createCareModel");
              if (disposed) return;
              const loaded = await createCareModel(host);
              if (disposed) {
                loaded.dispose();
                return;
              }
              model = loaded;
              model.update(progress);
              visual.dataset.loaded = "true";
            } catch {
              // The rendered poster remains visible if WebGL or the model is unavailable.
              visual.dataset.loaded = "false";
            }
          },
          { rootMargin: "300px" },
        );
        observer.observe(compact ? visual : section);
        return () => {
          disposed = true;
          observer.disconnect();
          handoff?.scrollTrigger?.kill();
          handoff?.kill();
          alignment?.kill();
          gsap.set(layer, { clearProps: "transform" });
          if (target) delete target.dataset.sharedPen;
          trigger.kill();
          model?.dispose();
          delete visual.dataset.loaded;
          delete visual.dataset.stage;
        };
      },
    );
    return () => media.revert();
  }, [penDestinationRef]);

  return (
    <section
      ref={sectionRef}
      id="connected-care"
      className={styles.section}
      aria-labelledby="medication-story-heading"
    >
      <div className={styles.intro}>
        <p className={styles.eyebrow}>
          <span /> THE BIGGER PICTURE
        </p>
        <h2
          id="medication-story-heading"
          className="text-[#ABB1AD] font-bold uppercase  tracking-[2%] leading-[100%] text-[26px] sm:text-[36px] lg:text-[48px]"
        >
          One part of a <br />
          <span className="text-[#578951]">more personal plan.</span>
        </h2>
        <div className={styles.introBottom}>
          <p>
            Medication has a place.
            {/* <br /> */}
            You stay at the center.
          </p>
        </div>
      </div>

      <div ref={journeyRef} className={styles.journey}>
        <div className={styles.chapters}>
          {chapters.map((chapter, index) => (
            <article key={chapter.label} data-mobile-reveal className={styles.chapter}>
              <div className={styles.chapterMeta}>
                <span>0{index + 1}</span>
                <p>{chapter.label}</p>
              </div>
              <h3>{chapter.title}</h3>
              <p className={styles.description}>{chapter.text}</p>
              <div className={styles.chapterNote}>
                <chapter.icon size={19} strokeWidth={1.5} />
                <span>{chapter.note}</span>
              </div>
              {index === 2 && (
                <Link href="/pricing" className={styles.cta}>
                  Explore care plans <ArrowUpRight size={19} />
                </Link>
              )}
            </article>
          ))}
        </div>

        <div
          ref={visualRef}
          className={styles.visual}
          data-stage="0"
          role="img"
          aria-label="An illustrative medication pen whose first-use event signals medication initiation, with connected KPI tracking and ongoing support."
        >
          <div className={styles.orbit} />
          <div className={styles.orbitInner} />
          <span className={styles.visualLabel}>
            PHYSICIAN-GUIDED. PERSON-CENTERED.
          </span>
          <div className={styles.modelShadow} />
          <div ref={modelLayerRef} className={styles.modelLayer}>
            <Image
              src="/models/care-pen.webp"
              alt=""
              width={720}
              height={960}
              sizes="(max-width: 900px) 80vw, 40vw"
              className={styles.poster}
            />
            <div ref={canvasRef} className={styles.canvas} />
          </div>

          <div className={`${styles.card} ${styles.physicianCard}`}>
            <span className={styles.iconCircle}>
              <Stethoscope size={21} />
            </span>
            <div>
              <small>MEDICATION INITIATED</small>
              <strong>
                First pen use
                <br />
                signals day one.
              </strong>
            </div>
            <span className={styles.statusDot} />
          </div>
          <div className={`${styles.card} ${styles.kpiCard}`}>
            <div className={styles.kpiHeading}>
              <span className={styles.kpiPulse} />
              <small>CONNECTED KPI SIGNAL</small>
            </div>
            <strong>Initiation rate</strong>
            <div className={styles.kpiValue}>Trackable</div>
            <p>
              First-use data can support timely outreach and clearer
              time-to-therapy reporting.
            </p>
          </div>
          <div className={`${styles.card} ${styles.habitsCard}`}>
            <small>THE EVERYDAY FOUNDATIONS</small>
            <div>
              <span>
                <Leaf size={16} /> Nutrition
              </span>
              <span>
                <Heart size={16} /> Movement
              </span>
              <span>
                <Moon size={16} /> Sleep
              </span>
            </div>
          </div>
          <div className={`${styles.card} ${styles.supportCard}`}>
            <div className={styles.supportHeading}>
              <MessageCircle size={19} />
              <strong>Care keeps going.</strong>
            </div>
            <p>Check in. Ask questions. Revisit your plan.</p>
            <div className={styles.timeline}>
              <span>
                <Check size={12} />
              </span>
              <i />
              <span>
                <Check size={12} />
              </span>
              <i />
              <span className={styles.timelineCurrent} />
            </div>
          </div>
          <div className={styles.visualFooter}>
            <span>ONE CONNECTED PLAN</span>
            <div>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </div>
      <p className={styles.caption}>
        Illustrative model. Treatment options are discussed with your physician
        based on your individual needs.
      </p>
    </section>
  );
}
