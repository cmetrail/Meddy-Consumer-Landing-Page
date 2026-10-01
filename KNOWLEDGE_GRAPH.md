# Meddy Health — Animation & Design Knowledge Graph

Authoritative reference for future work on this codebase. Maintained per request.

---

## 1. Stack & Commands

| Concern | Value |
| --- | --- |
| Framework | Next.js 16.3.0 (App Router, Turbopack) |
| React | 19.2.8 |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Package manager | pnpm 11.17.0 |
| Animation | gsap 3.15.0, @gsap/react 2.1.2 |
| Smooth scroll | lenis 1.3.25 |
| Motion (legacy) | framer-motion 12.43.0 (only WhyMeddyFooter/PhysicianCareFooter) |
| Charts | recharts 3.10.1 |

Commands:
- `pnpm lint` → eslint (0 errors expected; 20 pre-existing `unused-vars` warnings are benign)
- `pnpm exec tsc --noEmit` → typecheck (there is NO `typecheck` script)
- `pnpm dev` / `pnpm build` / `pnpm start`

> IMPORTANT: This repo's Next.js version is newer than training data. Read `node_modules/next/dist/docs/` before writing framework-specific code. `AGENTS.md` auto-injected.

---

## 2. GSAP Standard Setup

### 2.1 `src/lib/gsap.ts` (single source of truth)

```ts
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { CustomEase } from "gsap/CustomEase";

export const DURATION = 0.618; // golden-ratio reciprocal
export const EASE = CustomEase.create("meddy-ease", "0.175, 0.885, 0.32, 1");

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase);
  gsap.config({ autoSleep: 60, nullTargetWarn: false });
  gsap.defaults({ ease: EASE });
}

export { gsap, ScrollTrigger, TextPlugin, CustomEase };
```

**Rule: ALWAYS `import { gsap } from "@/lib/gsap"` — NEVER `import gsap from "gsap"`.** This keeps a single gsap instance with shared defaults/plugins. Grep for `from "gsap"` should return zero hits.

### 2.2 `src/providers/SmoothScrollProvider.tsx` (Lenis)

Wraps the whole app. Lenis `duration: 1.2`, exponential easing. Integrates with GSAP via:
- `lenis.on("scroll", ScrollTrigger.update)`
- `gsap.ticker.add((t) => lenis.raf(t * 1000))`
- `gsap.ticker.lagSmoothing(0)`
- `ScrollTrigger.refresh()` on resize + fonts ready

### 2.3 `app/globals.css` — FOUC prevention

- Defines `--dvh`, `--s` CSS vars (used by `lib/scale.ts` `S(v)` / `fluid(v,minPx)`).
- `@keyframes meddy-fade-up/down/rise` + `.anim-fade-up/.anim-fade-down/.anim-rise` (now UNUSED — hero was converted off CSS).
- **Critical FOUC list** (`[data-*] { opacity: 0 }`): `data-problem-heading, data-scatter, data-hmw-text/phone/strip/icon, data-feature-text/image/card, data-graph-title/chart, data-statement, data-reveal, data-ray-copy/buttons/social/badges, data-tm-card`. `data-plan-card` is INTENTIONALLY not in this list.

### 2.4 FOUC rules

- `fromTo()` is SAFE with the `[data-*]{opacity:0}` CSS (explicit `to` overrides).
- `from()` is BROKEN against CSS `opacity:0` (animates 0→0 = invisible forever). Never use `gsap.from()` for opacity reveals here — always `fromTo()` (or `gsap.set()` then `.to()`).
- Below-fold content does NOT flash on SSR (from/fromTo apply their from-state pre-paint via useGSAP's layout effect).
- Above-fold (hero) content WILL flash visible→hidden→animate unless you add inline `style={{ opacity: 0 }}` on the SSR-rendered element. The hero does this manually.

---

## 3. Animation Patterns

### A. Per-element scroll reveal (STANDARD for below-fold)

```tsx
"use client";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = sectionRef.current;
    if (!root) return;
    gsap.fromTo("[data-feature-text]", { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: root.querySelector("[data-feature-text]"), start: "top 85%", once: true } });
  }, { scope: sectionRef });

  return <div ref={sectionRef}><div data-feature-text>…</div></div>;
}
```

Key points:
- Trigger on the **element itself** (`trigger: el`), NOT the whole tall section — otherwise animation completes before it is actually in view (the user's #1 complaint).
- `start: "top 85%"` = element top crosses 85% down the viewport.
- `once: true` = play once, stay revealed. (Optional alternative: `toggleActions: "play none none reverse"` for reverse-on-scroll-up — not yet applied project-wide.)

### B. Timeline (coordinated, single trigger)

Used when several elements must animate in a specific order from one trigger. Use `tl.fromTo(...).fromTo(..., position)`.

### C. Scroll-scrub (progress tied to scroll)

```ts
scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
```
Used for the HowMeddyWorks hero background (scale 1.15→1).

### D. Infinite loops (float / marquee)

```ts
gsap.to(el, { y: "+=12", duration: 2.2, yoyo: true, repeat: -1, ease: "sine.inOut" });        // float
gsap.to(top, { x: -top.scrollWidth / 2, duration: 35, ease: "none", repeat: -1 });            // marquee
```
Start loops from a timeline's `onComplete` or after the element's reveal `onComplete`.

### E. Graph draw-on (SVG line + dots + cards)

- SVG paths carry `pathLength="1"` so `strokeDashoffset` maps 0→1 progress.
- Static `<style>` sets `stroke-dasharray:1; stroke-dashoffset:1` (hidden) on lines and `opacity:0` on dot/card groups.
- GSAP timeline (trigger `top 80%`, once): title fade → chart fade → line `.to(sel,{strokeDashoffset:0,dur:2.2})` → dots `.to(sel,{opacity:1,stagger:.08})` → cards `.to(sel,{opacity:1})`.

---

## 4. Home Page Section Map

`src/features/home/routes/home.tsx` render order and their animations:

| # | Component | Animation (from `Meddy Animation doc.pdf`) |
| --- | --- | --- |
| 1 | `HeroSection` | Load intro (logo/header slide down, doctor slide up, text box slide right, button resize, "500 Patients" card slides **bottom→up**) + idle cycle + 5s carousel. |
| 2 | `ProblemSection` (`problem/index.tsx`) | 6 photos scatter in from `DIRECTIONS` + float; heading reveal. |
| 3 | `HowMeddyWorksSection` (`how-meddy-works/helper/Hero.tsx`) | bg scrub; text → phones slide up → nav strip → icons drop one-by-one. |
| 4 | `how-meddy-works/helper/{GraphBand,FitnessTrend,SleepTrend,A1cTrend}.tsx` + `{Nutrition,Workout,Sleep,Insights}Section.tsx` | 4 graphs draw-on; 4 feature sections text/image/cards reveal. |
| 5 | `MostCareSection` (`most-care/index.tsx`) | 6 cards scatter into position (`SCATTER` offsets) + statement. |
| 6 | `TestimonialsSection` | cards stagger in + top/bottom marquee loop. |
| 7 | `PhysicianRaySection` | photo fade, copy, buttons slide R→L, social proof, badges. |
| 8 | `Pricing` (inside `FooterSection`) | cards slide down 1st→3rd→2nd. |
| — | `FooterSection` / `FooterItems` | **NO animation** (doc says footer = none). |

---

## 5. Gotchas & Lessons Learned

1. **Always scope `toArray`** — `gsap.utils.toArray("[data-x]", sectionRef.current)`. Unscoped selects document-wide, creating duplicate ScrollTriggers on shared elements → crash `"Cannot read properties of undefined (reading 'end')"`. Note `data-scatter` is used by BOTH `problem/index.tsx` and `most-care/index.tsx`.
2. **`useGSAP(cb, { scope: ref })`** auto-cleans up (gsap.context) on unmount; use it, don't hand-roll `useEffect + gsap.context`.
3. **`"use client"` must be line 1** of any file importing gsap/ScrollTrigger. Server components (e.g. `Pricing.tsx`, `FooterItems.tsx`) can still carry `data-*` attributes — the animation runs in a parent client component.
4. **Never animate the same element from two `useGSAP` calls.**
5. **Footer = no animation** per doc. `FooterItems.tsx` is rendered by 4 page sections, only 2 of which animate `[data-reveal]` — so it must NOT carry `data-reveal` (would stay invisible on why-meddy / physician-care pages).
6. **Converting server→client components**: presentational helpers (FeatureCopy, GiantNumber, cards) are pure JSX, safe to import from client components.
7. `most-care/helper/Reveal.tsx` is dead code (no imports).

---

## 6. Design Specs (Figma file `9EFXUcADyGwWymAEpV6a70`)

Model cannot read images — rely on `figma_get_figma_data` JSON only.

### Header (`src/components/Header.tsx`)
- Logo white `public/meddy-logo-white.svg` 44×28 (dark variant); `app-logo.png` elsewhere.
- Nav: Plus Jakarta Sans Medium 500, 16px, UPPER, color `#E6DEDE`; items "How it works", "Why meddy", "pHYSICIAN CARE", "Pricing", "FAQ"; gap 50px; centered `absolute left-1/2 -translate-x-1/2`.
- Hamburger visible on all breakpoints; pill `rounded-[26px] px-[11px] py-[13px]`, 3 bars 31/21/11px, `#F4F4F4`, frosted `backdropFilter blur(14px)` (inline style, not Tailwind class). onClick no-op on `min-width:1024px`.

### Footer (`FooterSection.tsx` + `helper/FooterItems.tsx`)
- Shared body `FooterItems.tsx`; 4 wrappers (home/pricing/why-meddy/physician-care) each pass their own bg image.
- 3 right-aligned nav columns, NO headings, `text-base font-medium` white title-case, gap 35px, multi-line links use `whitespace-pre-line text-right`:
  - Col1: Home page / How it works / Why Meddy / Sleep and recovery / Pricing
  - Col2: Nutrition / Physician Care / Personalized\nhealth plans / Medication\nmanagement / Longevity and\npreventive health
  - Col3: Labs and\nBiomarkers Tracking / Weighloss and\nMetabolic / Werables and\nHealth Data / Fitness / 24/7 Primary Care
  - (Keep literal misspellings "Weighloss"/"Werables" — they are Figma's actual text.)
- Description (ellipsis "labs…"): "Calories, workouts, sleep, labs… Most people manage them separately. Meddy connects them and puts a physician in charge of what they mean."
- Store buttons: App Store "Download on the" title-case 13.5px + "App Store" 27px; Google Play "GET IT ON" 15px uppercase + `public/google-play-wordmark.svg` (111×23, fill set to #FFFFFF — original export was fill="none").
- Copyright 12px: "© 2026 Meddy · Physician services available in all 50 states except: South Carolina, Arkansas, Rhode Island."
- Frame: `bg-white/10 rounded-t-[22px]`, divider `#E0E0E0`, logo `app-logo.png` 358×215.

---

## 7. Known Remaining / Open Items

- Repeated graphs (Sleep/Health Insight): doc ambiguous whether they animate 0→target numbers or just reveal. User has NOT answered.
- `toggleActions: "play none none reverse"` (reverse-on-scroll-up) is a candidate polish — currently all reveals use `once: true`.
- Consider `ScrollTrigger.refresh()` after images finish loading (currently refresh only on resize/fonts).
- Unused CSS keyframes `.anim-fade-*` in globals.css can be removed.
