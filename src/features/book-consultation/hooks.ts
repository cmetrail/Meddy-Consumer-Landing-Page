"use client";

import { useEffect, useState } from "react";
import {
  getBookingContext,
  getProviderAvailability,
  getProviderSlots,
  type BookingContext,
  type SlotStartTime,
} from "./api";

const toISO = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

export function useBookingContext() {
  const [context, setContext] = useState<BookingContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getBookingContext()
      .then((ctx) => {
        if (active) {
          setContext(ctx);
          setError(null);
        }
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : "We couldn't load availability.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { context, loading, error };
}

export function useDaySlots(date: string | undefined, duration: number) {
  const requestKey = date ? `${date}|${duration}` : "";
  const [result, setResult] = useState<{
    key: string;
    slots: SlotStartTime[];
    error: string | null;
  }>({ key: "", slots: [], error: null });

  useEffect(() => {
    if (!date) return;
    let active = true;
    getProviderSlots(date, duration)
      .then((res) => {
        if (active) setResult({ key: requestKey, slots: res.startTimes ?? [], error: null });
      })
      .catch((err) => {
        if (active) {
          setResult({
            key: requestKey,
            slots: [],
            error: err instanceof Error ? err.message : "We couldn't load times for this day.",
          });
        }
      });
    return () => {
      active = false;
    };
  }, [date, duration, requestKey]);

  const loading = Boolean(date) && result.key !== requestKey;

  return { slots: result.slots, loading, error: result.error };
}

export function useMonthAvailability(year: number, month: number, duration: number) {
  const [availability, setAvailability] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let active = true;
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    getProviderAvailability(toISO(start), toISO(end), duration)
      .then((res) => {
        if (!active) return;
        const map: Record<string, boolean> = {};
        (res.days ?? []).forEach((day) => {
          map[day.date] = Boolean(day.isBookable);
        });
        setAvailability(map);
      })
      .catch(() => {
        if (active) setAvailability({});
      });
    return () => {
      active = false;
    };
  }, [year, month, duration]);

  return availability;
}
