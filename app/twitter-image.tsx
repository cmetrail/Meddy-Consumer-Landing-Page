import { renderOgImage } from "@/lib/og-image";

export const alt = "Meddy Health — Physician-Guided Primary Care";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return renderOgImage();
}
