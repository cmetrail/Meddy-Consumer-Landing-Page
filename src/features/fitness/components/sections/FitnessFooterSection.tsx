"use client";

import { useEffect, useRef, useState } from "react";
import { desktopMotion, DESKTOP_MOTION } from "@/lib/motion";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FitnessFooterSection() {
  const outerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const [isStickyActive, setIsStickyActive] = useState<boolean>(false);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const mq = window.matchMedia(DESKTOP_MOTION);

    const checkSticky = (h: number) => {
      // Enable sticky reveal when desktop motion matches and viewport height accommodates the footer
      const fits = window.innerHeight >= h * 0.8;
      setIsStickyActive(mq.matches && fits);
    };

    const updateHeight = () => {
      if (!el) return;
      const h = Math.round(el.offsetHeight);
      if (h > 0) {
        setFooterHeight(h);
        checkSticky(h);
        ScrollTrigger.refresh();
      }
    };

    updateHeight();

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const h = Math.round(entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height);
        if (h > 0) {
          setFooterHeight(h);
          checkSticky(h);
          ScrollTrigger.refresh();
        }
      }
    });

    ro.observe(el);

    const onResize = () => {
      updateHeight();
    };

    window.addEventListener("resize", onResize);
    mq.addEventListener("change", onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onResize);
    };
  }, []);

  // Track when the footer spacer enters view to safely enable pointer events
  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { rootMargin: "100px 0px" },
    );

    io.observe(outer);
    return () => io.disconnect();
  }, []);

  // Coordinated GSAP reveal animations as the curtain opens
  useGSAP(
    () =>
      desktopMotion(() => {
        if (!outerRef.current) return;

        const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]", outerRef.current);
        if (reveals.length) {
          gsap.fromTo(
            reveals,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: outerRef.current,
                start: "top 95%",
                once: true,
              },
            },
          );
        }

        const nav = outerRef.current?.querySelector("[data-footer-nav]");
        if (nav) {
          const cols = nav.querySelectorAll<HTMLElement>("[data-footer-col]");
          gsap.fromTo(
            cols,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: outerRef.current,
                start: "top 90%",
                once: true,
              },
            },
          );
        }
      }),
    { scope: outerRef, dependencies: [isStickyActive] },
  );

  return (
    <footer
      ref={outerRef}
      className="relative w-full"
      style={{
        height: isStickyActive && footerHeight ? `${footerHeight}px` : "auto",
        clipPath: isStickyActive ? "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" : "none",
      }}
    >
      <div
        className={
          isStickyActive
            ? "fixed bottom-0 left-0 z-0 w-full bg-[#171718]"
            : "relative w-full bg-[#171718]"
        }
        style={{
          height: isStickyActive && footerHeight ? `${footerHeight}px` : "auto",
          pointerEvents: isStickyActive ? (isIntersecting ? "auto" : "none") : "auto",
        }}
      >
        <div ref={contentRef} className="w-full">
          <FooterItems noTopMargin />
        </div>
      </div>
    </footer>
  );
}
