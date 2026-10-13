"use client";

import { useEffect, useRef } from "react";

/** Distance (px) the list must scroll before emitting another tick. */
const STEP_PX = 22;
/** Minimum ms between ticks so fast flicks don't buzz continuously. */
const MIN_INTERVAL_MS = 24;
const VIBRATE_MS = 8;

type AudioContextCtor = typeof AudioContext;

function resolveAudioContext(): AudioContextCtor | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & { webkitAudioContext?: AudioContextCtor };
  return window.AudioContext ?? w.webkitAudioContext ?? null;
}

/**
 * Adds a haptic "tick" to a scrollable element: a short vibration where the
 * device supports it (`navigator.vibrate`, mainly Android) plus a very quiet,
 * short Web Audio blip so iOS/desktop get feedback too.
 */
export function useScrollHaptics<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let audioCtx: AudioContext | null = null;
    let lastIndex = 0;
    let lastTickAt = 0;

    const getAudioContext = () => {
      if (!audioCtx) {
        const Ctor = resolveAudioContext();
        if (!Ctor) return null;
        try {
          audioCtx = new Ctor();
        } catch {
          return null;
        }
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume().catch(() => undefined);
      }
      return audioCtx;
    };

    const tick = () => {
      const vibrate = (
        navigator as Navigator & { vibrate?: (pattern: number) => boolean }
      ).vibrate;
      if (typeof vibrate === "function") {
        try {
          vibrate.call(navigator, VIBRATE_MS);
        } catch {
          /* ignore */
        }
      }

      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1400, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.045, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    };

    const onScroll = () => {
      const index = Math.floor(el.scrollTop / STEP_PX);
      if (index === lastIndex) return;
      lastIndex = index;

      const now = performance.now();
      if (now - lastTickAt < MIN_INTERVAL_MS) return;
      lastTickAt = now;
      tick();
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      audioCtx?.close().catch(() => undefined);
    };
  }, []);

  return ref;
}
