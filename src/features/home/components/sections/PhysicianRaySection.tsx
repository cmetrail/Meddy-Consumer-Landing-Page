"use client";

// @refresh reset
// Remount on edits so GSAP hooks and pinned timelines never retain stale state.

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./PhysicianRaySection.module.css";
import { ShieldCheck, Clock, GlobeLock, ClockCheck } from "lucide-react";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const TRUST_BADGES = [
  { Icon: ShieldCheck, text: "Board-certified physician" },
  { Icon: Clock, text: "First consultation free" },
  { Icon: GlobeLock, boldPart: "HIPAA", text: " compliant" },
  { Icon: ClockCheck, text: "Available in New York" },
];

export default function PhysicianRaySection() {
  const sectionRef = useRef<HTMLElement>(null);



  useGSAP(
    () => desktopMotion(() => {
      const root = sectionRef.current;
      if (!root) return;

      const elements = root.querySelectorAll(
        "[data-reveal], [data-ray-copy] [data-line], [data-ray-buttons], [data-ray-social], [data-ray-badges]",
      );
      gsap.fromTo(elements, { opacity: 0 }, {
        opacity: 1,
        duration: 0.65,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: root, start: "top 60%", once: true },
      });
    }),
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="physician-care" className={styles.section}>
      <div className={styles.canvas}>
        <div data-reveal className={styles.portrait}>
          <Image
            src="/home/doctor.png"
            alt="Dr. Ray, board-certified physician"
            width={1254}
            height={1254}
            sizes="(max-width: 540px) 115vw, 103vh"
            className={styles.doctor}
          />
        </div>

        <div data-ray-copy className={styles.copy}>
          <p data-line className={styles.eyebrow}>Limited availability</p>
          <p data-line className={styles.spots}>500 spots.</p>
          <h2 data-line className={styles.heading}>One physician.</h2>
          <p data-line className={styles.tagline}>Your data finally means something.</p>
        </div>

        <div data-ray-buttons className={styles.buttons}>
          <Link href="/#how-it-works" className={styles.primaryButton}>Book Free Consultation</Link>
          <Link href="/how-it-works" className={styles.secondaryButton}>See How It Works</Link>
        </div>

        <div data-ray-social className={styles.social}>
          <Image
            src="/home/one-physician.svg"
            alt="Now accepting our first 500 patients. 337 remaining spots."
            width={337}
            height={268}
            sizes="(max-width: 540px) 150px, 31vh"
            className={styles.enrollment}
          />
        </div>

        <div data-ray-badges className={styles.badges}>
          {TRUST_BADGES.map(({ Icon, text, boldPart }) => (
            <div key={text} className={styles.badge}>
              <Icon aria-hidden="true" strokeWidth={1.5} />
              <span>{boldPart && <strong>{boldPart}</strong>}{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
