"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./PricingFooterSection.module.css";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FooterItems } from "./PricingFooterItems";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function PricingFooterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => desktopMotion(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]", sectionRef.current).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top bottom", once: true },
          },
        );
      });

      const nav = sectionRef.current?.querySelector("[data-footer-nav]");
      if (nav) {
        const cols = nav.querySelectorAll<HTMLElement>("[data-footer-col]");
        const ftl = gsap.timeline({
          scrollTrigger: { trigger: nav, start: "top 92%", end: "top 55%", scrub: true },
        });
        cols.forEach((el, i) => {
          ftl.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, ease: "none" }, i * 0.2);
        });
      }
    }),
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className={styles.section}>
      <Image src="/pricing/footer-bg.png" alt="" fill sizes="100vw" className={styles.footerBackground} />

      <div className={styles.consultation} aria-labelledby="pricing-consultation-heading">
        <div className={styles.photo} aria-hidden="true">
          <Image src="/pricing/footer-bg.png" alt="" fill sizes="200vw" className={styles.background} />
        </div>
        <div className={styles.shade} aria-hidden="true" />
        <div className={styles.content}>
          <p className={styles.eyebrow}>Your health.</p>
          <h2 id="pricing-consultation-heading" className={styles.heading}>
            Your <span className={styles.care}>Care.</span>
          </h2>
          <ul className={styles.benefits}>
            {[
              "Start with Meddy.",
              "Add support when it makes sense.",
              "Build a healthier future with a system designed to grow with you.",
            ].map((benefit) => (
              <li key={benefit} className={styles.benefit}>
                <Image src="/pricing/footer/bullet-icon.svg" alt="" width={11} height={41} className={styles.bullet} />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          <Link href="/#how-it-works" className={styles.button}>
            Book your Free Consultation
          </Link>
        </div>
      </div>

      <FooterItems noTopMargin omitSeo className={styles.footerGlass} />
    </section>
  );
}
