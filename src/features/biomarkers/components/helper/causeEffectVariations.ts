export type CauseEffectMetric = {
  label: string;
  value: string;
  /** Highlighted change text (e.g. "14%", "12 lbs", "from 7.8%") */
  delta: string;
  /** Optional trailing context (e.g. "vs last week", "over 12 weeks") */
  context?: string;
  /** Trend icon in front of the delta: up, down (flipped), or none */
  direction: "up" | "down" | "none";
  /** Delta set at 10px instead of 16px */
  small?: boolean;
};

export type ChartImage = {
  src: string;
  width: number;
  height: number;
};

export type CauseEffectChart = {
  /** One image (spans the card) or two halves, bottom aligned */
  images: ChartImage[];
  /** Vertical "now" marker (Figma: rotated line asset), px inside the 284.5 wide chart */
  line: { src: string; x: number; top: number; length: number; svgLength: number };
};

export type CauseEffectLegend = { label: string; direction: "up" | "down" };

export type CauseEffectVariation = {
  id: string;
  tab: string;
  metrics: [CauseEffectMetric, CauseEffectMetric];
  legend: [CauseEffectLegend, CauseEffectLegend];
  chart: CauseEffectChart;
};

const P = "/biomarkers/cause-effect";

export const CAUSE_EFFECT_VARIATIONS: CauseEffectVariation[] = [
  {
    id: "nutrition",
    tab: "Nutrition",
    metrics: [
      { label: "Daily Fiber", value: "32g", delta: "↓ from 16 g/day", direction: "none" },
      { label: "A1C", value: "6.4%", delta: "from 7.8%", direction: "down" },
    ],
    legend: [
      { label: "Daily Fiber", direction: "up" },
      { label: "A1C", direction: "down" },
    ],
    chart: {
      images: [
        { src: `${P}/chart-fiber-1.svg`, width: 143.02, height: 83.5 },
        { src: `${P}/chart-fiber-2.svg`, width: 142.11, height: 80 },
      ],
      line: { src: `${P}/line-fiber.svg`, x: 142.44, top: 3.55, length: 79.9, svgLength: 82.66 },
    },
  },
  {
    id: "weight",
    tab: "Weight",
    metrics: [
      { label: "Weight (lbs)", value: "174", delta: "12 lbs", context: "over 12 weeks", direction: "down" },
      { label: "Blood pressure (mmHg)", value: "124/80", delta: "from 138/88", direction: "down" },
    ],
    legend: [
      { label: "Weight", direction: "down" },
      { label: "Blood pressure", direction: "down" },
    ],
    chart: {
      images: [{ src: `${P}/chart-weight.svg`, width: 295, height: 83 }],
      line: { src: `${P}/line-weight.svg`, x: 137.1, top: 55.4, length: 27.97, svgLength: 30.62 },
    },
  },
  {
    id: "exercise",
    tab: "Exercise",
    metrics: [
      { label: "Exercise Days", value: "6 days", delta: "2 days", context: "vs prev week", direction: "up" },
      { label: "Resting heart rate", value: "68 bpm", delta: "10 bpm", context: "from 78", direction: "down" },
    ],
    legend: [
      { label: "Exercise", direction: "up" },
      { label: "Resting heart rate", direction: "down" },
    ],
    chart: {
      images: [
        { src: `${P}/chart-exercise-1.svg`, width: 143, height: 77 },
        { src: `${P}/chart-exercise-2.svg`, width: 143, height: 70 },
      ],
      line: { src: `${P}/line-exercise.svg`, x: 142.54, top: 3.45, length: 73, svgLength: 75.75 },
    },
  },
  {
    id: "sleep",
    tab: "Sleep",
    metrics: [
      { label: "Sleep Duration", value: "7h 45m", delta: "from 6h 20m", direction: "up", small: true },
      { label: "Recovery score", value: "82", delta: "from 68", direction: "up", small: true },
    ],
    legend: [
      { label: "Recovery", direction: "up" },
      { label: "Sleep", direction: "up" },
    ],
    chart: {
      images: [{ src: `${P}/chart-sleep.svg`, width: 295, height: 83 }],
      // mirrored horizontally in Figma
      line: { src: `${P}/line-weight.svg`, x: 147.4, top: 55.4, length: 27.97, svgLength: 30.62 },
    },
  },
  {
    id: "medication",
    tab: "Medication",
    metrics: [
      { label: "Metformin Dose Change", value: "1000mg", delta: "up 50%", direction: "up", small: true },
      { label: "A1C", value: "5.9%", delta: "from 6.4%", direction: "down", small: true },
    ],
    legend: [
      { label: "Medication", direction: "up" },
      { label: "A1C", direction: "down" },
    ],
    chart: {
      images: [
        { src: `${P}/chart-medication-1.svg`, width: 143, height: 77 },
        { src: `${P}/chart-medication-2.svg`, width: 143, height: 76 },
      ],
      line: { src: `${P}/line-medication.svg`, x: 142.53, top: -0.4, length: 76.85, svgLength: 79.61 },
    },
  },
];
