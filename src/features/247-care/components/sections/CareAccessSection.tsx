"use client";

import { useRef } from "react";
import Image from "next/image";
import layoutStyles from "../../CareLayout.module.css";
import buttonStyles from "./CareButton.module.css";
import styles from "./CareAccessSection.module.css";
import CareBusinessHoursSection from "./CareBusinessHoursSection";
import { useCareSectionMotion } from "./useCareSectionMotion";
import { desktopMotion } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LIST_ITEMS = [
  "24/7 response",
  "Same physician",
  "Phone & video appointments",
  "Secure messaging",
  "Ongoing care",
];

const HEADLINE_IMAGES = [
  { src: "/247-care/section5-img-1-104627.png", alt: "Access" },
  { src: "/247-care/section5-img-2-5751bf.png", alt: "You" },
  { src: "/247-care/section5-img-3-778c76.png", alt: "Continuity" },
];

function HeadlineImage({ src, alt }: { src: string; alt: string }) {
  return (
    <span className={`${styles.headlineImage} relative inline-block h-[48px] w-[66px] shrink-0 overflow-hidden rounded-[6px] sm:h-[64px] sm:w-[88px] lg:h-[81px] lg:w-[112px]`}>
      <Image src={src} alt={alt} fill sizes="112px" className="object-cover" />
    </span>
  );
}

function HeadlineWord({ children }: { children: React.ReactNode }) {
  return (
    <span className={`${styles.headlineWord} font-medium uppercase leading-[100%] text-[#46524B] text-[32px] sm:text-[48px] lg:text-[64px]`}>
      {children}
    </span>
  );
}

export default function CareAccessSection() {
  const sectionRef = useCareSectionMotion("access");
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => desktopMotion(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]", footerRef.current).forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 92%", end: "top 55%", scrub: true },
          },
        );
      });

      const nav = footerRef.current?.querySelector("[data-footer-nav]");
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
    { scope: footerRef },
  );

  return (
    <>
    <section ref={sectionRef} data-care-story="access" className={`${styles.section} w-full bg-[#FAF9F5]`}>
      <div className={`${layoutStyles.rail} ${styles.content} pt-16 lg:pt-24`}>
        {/* Top-right -Meddy */}
        <div
          data-cs-reveal
          className={`${styles.signature} text-right`}
        >
          <span className="font-dm-serif italic leading-[100%] text-[#46524B] text-[24px] lg:text-[32px]">
            -Meddy
          </span>
        </div>

        {/* Divider below -Meddy */}
        <div data-cs-rule className={`${styles.divider} mt-3 h-px w-full bg-[#797979]`} />

        {/* Headline + numbered list */}
        <div className={`${styles.mainRow} mt-10 flex flex-col gap-14 lg:mt-[98px] lg:flex-row lg:justify-between`}>
          <div
            className={`${styles.headline} flex flex-col gap-4`}
          >
            <div data-cs-access-line className={`${styles.headlineRow} flex items-center gap-4 lg:gap-6`}>
              <HeadlineWord>Access</HeadlineWord>
              <HeadlineImage {...HEADLINE_IMAGES[0]} />
              <HeadlineWord>when</HeadlineWord>
            </div>
            <div data-cs-access-line className={`${styles.headlineRow} flex items-center gap-4 lg:gap-6`}>
              <HeadlineWord>You</HeadlineWord>
              <HeadlineImage {...HEADLINE_IMAGES[1]} />
              <HeadlineWord>Need it.</HeadlineWord>
            </div>
            <div data-cs-access-line className={`${styles.headlineRow} flex items-center gap-4 lg:gap-6`}>
              <HeadlineWord>Continuity</HeadlineWord>
              <HeadlineImage {...HEADLINE_IMAGES[2]} />
            </div>
            <div data-cs-access-line className={`${styles.headlineRow} flex items-center gap-4 lg:gap-6`}>
              <HeadlineWord>when</HeadlineWord>
              <HeadlineWord>You</HeadlineWord>
              <HeadlineWord>Don&rsquo;t.</HeadlineWord>
            </div>
          </div>

          {/* Numbered list */}
          <div
            className={`${styles.list} flex w-full flex-col lg:w-[535px]`}
          >
            {LIST_ITEMS.map((label, i) => (
              <div data-cs-item key={label}>
                <div className={`${styles.listRow} flex items-center justify-between py-4 lg:py-5`}>
                  <span className={`${styles.number} w-[27px] text-center text-[#A1AAA3] text-[18px] lg:text-[24px] leading-[100%]`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`${styles.listLabel} font-dm-serif italic text-right text-[#6E7A72] text-[24px] lg:text-[32px] leading-[100%]`}>
                    {label}
                  </span>
                </div>
                <div data-cs-rule className="h-px w-full bg-[#D4D4D4]" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row: italic + paragraph (left), CTA (right) */}
        <div className={`${styles.bottomRow} mt-16 flex flex-col gap-10 pb-16 lg:mt-20 lg:flex-row lg:items-end lg:justify-between lg:pb-20`}>
          <div
            data-cs-reveal
            className={`${styles.summary} flex max-w-[670px] flex-col gap-4`}
          >
            <p className={`${styles.summaryLead} italic leading-[120%] text-[#6E7A72] text-[24px] lg:text-[32px]`}>
              Appointments are only one part of your care.
            </p>
            <p className={`${styles.summaryCopy} max-w-[302px] text-[#6E7A72] font-normal leading-[150%] text-[16px]`}>
              <b className="font-bold">Meddy combines 24/7 access with a physician</b> who follows
              your health over time—so you have somewhere to turn when something changes and someone
              who already knows your story.
            </p>
          </div>

          <button
            data-cs-cta
            className={`${buttonStyles.button} ${styles.mobileCta}`}
          >
            Start Physician Care →
          </button>
        </div>
      </div>

    </section>

      <CareBusinessHoursSection />

      {/* Footer has its own screen, separate from the access section. */}
      <footer ref={footerRef} className={`${styles.footer} relative w-full overflow-hidden text-white`}>
        <Image
          src="/247-care/footer-bg-c974ec.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className={styles.footerContent}><FooterItems noTopMargin mobileReference mobileVariant="247-care" className={styles.footerPanel} /></div>
      </footer>
    </>
  );
}
