"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { CustomEase } from "gsap/CustomEase";

const DURATION = 0.618;
const EASE = CustomEase.create("meddy-ease", "0.175, 0.885, 0.32, 1");

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin, CustomEase);
  gsap.config({ autoSleep: 60, nullTargetWarn: false });
  gsap.defaults({ ease: EASE });
}

export { gsap, ScrollTrigger, TextPlugin, CustomEase, EASE, DURATION };
