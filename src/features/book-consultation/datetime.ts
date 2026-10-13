/**
 * Slot times come from the Meddy backend as UTC wall-clock ISO strings
 * (`2026-06-26T09:00:00Z` means 9:00 AM in the provider's clock — the same
 * convention the EMR uses). We therefore read the clock digits directly instead
 * of converting through the visitor's timezone.
 */
const WALL_CLOCK_RE = /T(\d{2}):(\d{2})/;

export function wallClockParts(iso?: string | null): { hour: number; minute: number } | null {
  if (!iso) return null;
  const match = iso.match(WALL_CLOCK_RE);
  if (!match) return null;
  return { hour: Number(match[1]), minute: Number(match[2]) };
}

export function formatSlotTime(iso?: string | null): string {
  const parts = wallClockParts(iso);
  if (!parts) return "";
  const suffix = parts.hour < 12 ? "AM" : "PM";
  const display = parts.hour % 12 === 0 ? 12 : parts.hour % 12;
  return `${display}:${String(parts.minute).padStart(2, "0")} ${suffix}`;
}

export function addMinutes(iso: string, minutes: number): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  date.setUTCMinutes(date.getUTCMinutes() + minutes);
  return date.toISOString();
}

export function formatLongDate(isoDate?: string | null): string {
  if (!isoDate) return "";
  const date = new Date(`${isoDate.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}
