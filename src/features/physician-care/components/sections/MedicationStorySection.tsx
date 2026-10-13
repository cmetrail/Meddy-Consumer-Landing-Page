"use client";

import { useEffect, useRef, type RefObject } from "react";
import Image from "next/image";
import {
  Check,
  Dumbbell,
  HeartPulse,
  MessageCircle,
  Moon,
  Stethoscope,
  Utensils,
} from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_MOTION } from "@/lib/motion";
import type { CareModel } from "../helper/createCareModel";
import styles from "./MedicationStorySection.module.css";

export default function MedicationStorySection({
  penDestinationRef,
}: {
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
        const target =
          penDestinationRef?.current ??
          sharedJourney?.querySelector<HTMLElement>("[data-care-pen-target]");
        const chart = target?.closest(".a1c-scroll");
        const layer = modelLayerRef.current!;
        const travel = { progress: 0 };
        const storyCopy = journey.querySelector<HTMLElement>(
          `.${styles.storyCopy}`,
        );
        const supportCard = visual.querySelector<HTMLElement>(
          `.${styles.supportCard}`,
        );
        const syncMobileCards = () => {
          if (!compact || !storyCopy || !supportCard) return;
          const copyBounds = storyCopy.getBoundingClientRect();
          const visualTop = visual.getBoundingClientRect().top;
          // Ignore the entrance translation of cards that are still invisible.
          const cardBottom =
            visualTop + supportCard.offsetTop + supportCard.offsetHeight;
          const copyOverlapsCards =
            copyBounds.top < cardBottom + 12 &&
            copyBounds.bottom > visualTop;
          visual.dataset.cardsHidden = String(
            copyOverlapsCards || travel.progress > 0.001,
          );
        };
        // Keep the same canvas and pose throughout the handoff. Measure the
        // untransformed visual so refreshes and reverse scrolling stay stable.
        const positionModel = () => {
          syncMobileCards();
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
        const handoff = target
          ? gsap.to(travel, {
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
            })
          : undefined;
        // The source is sticky on phones. Keep tracking its live position even
        // after the travel tween ends, until both sections have left the screen.
        const alignment =
          target && sharedJourney
            ? ScrollTrigger.create({
                trigger: sharedJourney,
                start: "top bottom",
                end: "bottom top",
                onUpdate: positionModel,
                onRefresh: positionModel,
              })
            : undefined;
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
            syncMobileCards();
          },
          onRefresh: syncMobileCards,
        });
        progress = trigger.progress;
        visual.dataset.stage = String(Math.min(2, Math.floor(progress * 3)));
        syncMobileCards();
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
          delete visual.dataset.cardsHidden;
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
      <div ref={journeyRef} className={styles.journey}>
        <div className={styles.storyTrack}>
          <div className={styles.storyCopy}>
            <h2 id="medication-story-heading">
              Every medication
              <br />
              change <em>tells a story.</em>
            </h2>
            <p className={styles.storyDescription}>
              From medication to daily habits, Meddy tracks what happens next
            </p>
            <p className={styles.storyNote}>Care that sees the connections.</p>
          </div>
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
                First use
                <br />
                signals day one.
              </strong>
            </div>
            <span className={styles.statusDot} />
          </div>

          <div className={`${styles.card} ${styles.habitsCard}`}>
            <small>THE EVERYDAY FOUNDATIONS</small>
            <div>
              <span>
                <Utensils size={16} /> Nutrition
              </span>
              <span>
                <Dumbbell size={16} /> WorkOut
              </span>
              <span>
                <Moon size={16} /> Sleep
              </span>
              <span>
                <HeartPulse size={16} /> Recovery
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
    </section>
  );
}
