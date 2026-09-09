// Single source of truth for the hero's fluid scale. The scale factor itself
// lives in `app/globals.css` as `--s: clamp(0.22, 100vw / 1440px, 1)` — every
// spacing/font value in the hero is a `px * var(--s)` multiple so the whole
// poster scales uniformly with viewport width (the design canvas is 1440px).

export const S = (v: number) => `calc(${v}px * var(--s))`;

export const fluid = (v: number, minPx: number) => `max(${minPx}px, ${S(v)})`;
