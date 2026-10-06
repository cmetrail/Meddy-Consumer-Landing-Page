"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const MOBILE_MOTION =
  "((max-width: 1023px) or (pointer: coarse)) and (prefers-reduced-motion: no-preference)";

const TARGETS = [
  "[data-problem-heading]", "[data-scatter]", "[data-hmw-line]",
  "[data-hmw-phone]", "[data-hmw-strip]", "[data-feature-line]",
  "[data-feature-image]", "[data-feature-card]", "[data-line]",
  "[data-reveal]", "[data-footer-col]", "[data-ray-buttons]",
  "[data-ray-social]", "[data-ray-badges]", "[data-plan-card]",
  "[data-mobile-reveal]",
].join(",");

const VISUALS =
  "[data-scatter], [data-feature-image], [data-feature-card], [data-hmw-phone], [data-plan-card], [data-mobile-reveal=card]";

type Preset = { x: number; y: number; scale: number; rotate: number; visual: boolean };

function presetFor(element: HTMLElement, index: number): Preset {
  const visual = element.matches(VISUALS);
  if (element.matches("[data-feature-image]")) {
    const fromRight = element.matches("[data-mobile-direction=from-right]");
    return { x: fromRight ? 40 : -40, y: 0, scale: 1, rotate: 0, visual: true };
  }
  if (element.matches("[data-feature-card]")) return { x: 0, y: 24, scale: 1, rotate: 0, visual: true };
  if (element.matches("[data-plan-card]")) return { x: 0, y: -80, scale: 1, rotate: 0, visual: true };
  if (element.matches("[data-ray-buttons]")) return { x: 40, y: 0, scale: 1, rotate: 0, visual: false };
  if (element.matches("[data-ray-social], [data-footer-col]")) return { x: 0, y: 40, scale: 1, rotate: 0, visual: false };
  if (element.matches("[data-ray-badges]")) return { x: 0, y: 20, scale: 1, rotate: 0, visual: false };
  if (element.matches("[data-hmw-phone]")) return { x: 0, y: 120, scale: 1, rotate: 0, visual: true };
  if (element.matches("[data-hmw-strip]")) return { x: 0, y: 0, scale: 0.8, rotate: 0, visual: true };
  if (element.matches("[data-hmw-icon]")) return { x: 0, y: -70, scale: 0.6, rotate: 0, visual: true };
  if (element.matches("[data-feature-line]")) return { x: 0, y: 48, scale: 1, rotate: 0, visual: false };
  if (element.matches("[data-line]")) return { x: 0, y: 30, scale: 1, rotate: 0, visual: false };
  if (element.matches("[data-scatter]")) {
    const directions = [[-70, 24, -7], [56, -30, 6], [-44, 38, 5], [48, 24, -5]];
    const [x, y, rotate] = directions[index % directions.length];
    return { x, y, scale: 1, rotate, visual: true };
  }
  return { x: 0, y: visual ? 40 : 40, scale: visual ? 0.98 : 1, rotate: 0, visual };
}

/** One observer, one reveal per element, and no work on every scroll frame. */
export default function MobileScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (!("IntersectionObserver" in window) || !("animate" in Element.prototype)) return;

    const media = window.matchMedia(MOBILE_MOTION);
    let stop = () => {};
    const setup = () => {
      stop();
      if (!media.matches) return;

      const animations = new Set<Animation>();
      const pending = new Map<HTMLElement, { from: string; to: string; visual: boolean }>();
      const reveal = (element: HTMLElement) => {
        element.removeAttribute("data-mobile-motion");
        element.style.removeProperty("--mobile-reveal-from");
        pending.delete(element);
      };
      const observer = new IntersectionObserver((entries) => {
        let stagger = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          const state = pending.get(element);
          observer.unobserve(element);
          if (!state) continue;
          // Anchor jumps and fast swipes should expose content immediately.
          if (entry.boundingClientRect.top < 0) {
            reveal(element);
            continue;
          }

          // Keep the prepared state throughout the delay; never reset visible content.
          const animation = element.animate([
            { opacity: 0, transform: state.from },
            { opacity: 1, transform: state.to },
          ], {
            duration: state.visual ? 700 : 600,
            delay: Math.min(stagger++, 2) * 70,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both",
          });
          animations.add(animation);
          animation.onfinish = () => {
            // Restore the identical underlying end state before removing the animation.
            reveal(element);
            animation.cancel();
            animations.delete(animation);
          };
        }
      }, { threshold: 0.01, rootMargin: "0px 0px -24px 0px" });

      // Batch layout reads before preparing any styles. Only offscreen elements
      // are hidden, so hydration never blanks content already being read.
      document.querySelectorAll<HTMLElement>(`main :is(${TARGETS})`).forEach((element, index) => {
        const nestedCard = element.matches("[data-feature-card], [data-mobile-reveal=card]");
        // Desktop animates feature images and their floating cards separately.
        // Preserve that relationship on touch devices instead of collapsing the
        // cards into the image wrapper's single reveal.
        // FitnessPlanSection owns its portrait/card/chip sequence on mobile.
        if (element.closest("[data-plan-mobile]")) return;
        if ((!nestedCard && element.parentElement?.closest(TARGETS)) || element.closest("#hero")) return;
        const rect = element.getBoundingClientRect();
        // Keep anything above the viewport revealed, but observe partially
        // visible content as well. This matters for cards that overlap the
        // bottom edge of an image when a section first enters view.
        if (rect.width === 0 || rect.height === 0 || rect.bottom <= 0) return;
        const preset = presetFor(element, index);
        const to = getComputedStyle(element).transform;
        const base = to === "none" ? "" : to;
        pending.set(element, {
          from: `${base} translate(${preset.x}px, ${preset.y}px) scale(${preset.scale}) rotate(${preset.rotate}deg)`,
          to,
          visual: preset.visual,
        });
      });
      pending.forEach((state, element) => {
        element.style.setProperty("--mobile-reveal-from", state.from);
        element.dataset.mobileMotion = "pending";
        observer.observe(element);
      });

      // Keyboard / assistive-technology navigation must not land on hidden content.
      const onFocus = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return;
        const element = event.target.closest<HTMLElement>("[data-mobile-motion]");
        if (!element) return;
        observer.unobserve(element);
        element.getAnimations().forEach((animation) => {
          if (!animations.has(animation)) return;
          animation.cancel();
          animations.delete(animation);
        });
        reveal(element);
      };
      document.addEventListener("focusin", onFocus);
      stop = () => {
        observer.disconnect();
        document.removeEventListener("focusin", onFocus);
        // Reveal before cancellation to avoid a frame in the prepared state.
        pending.forEach((_, element) => reveal(element));
        animations.forEach((animation) => animation.cancel());
        animations.clear();
      };
    };

    setup();
    media.addEventListener("change", setup);
    return () => {
      media.removeEventListener("change", setup);
      stop();
    };
  }, [pathname]);

  return null;
}
