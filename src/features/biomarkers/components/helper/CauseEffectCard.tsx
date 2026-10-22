import Image from "next/image";
import styles from "./CauseEffectCard.module.css";
import type { CauseEffectMetric, CauseEffectVariation } from "./causeEffectVariations";

// The containing panel supplies --k to scale the chart with its layout.
const k = (n: number) => `calc(${n} * var(--k))`;

function Trend({ size, down }: { size: "lg" | "sm"; down: boolean }) {
  const px = size === "lg" ? 19.7 : 12;
  return (
    <Image
      src={`/biomarkers/cause-effect/icon-trend-${size}.svg`}
      alt=""
      width={px}
      height={px}
      unoptimized
      className="shrink-0"
      style={{ width: k(px), height: k(px), transform: down ? "scaleY(-1)" : undefined }}
    />
  );
}

function Metric({ label, value, delta, context, direction, small, alignEnd = false }: CauseEffectMetric & { alignEnd?: boolean }) {
  const alignment = alignEnd ? "items-end text-right" : "items-start";
  return (
    <div className={`flex min-w-0 flex-col ${alignment}`} style={{ gap: k(10) }}>
      <div className={`flex flex-col ${alignment}`}>
        <span className="whitespace-nowrap leading-[1.416] text-white" style={{ fontSize: k(12) }}>
          {label}
        </span>
        <span className="whitespace-nowrap font-semibold leading-[1.416] text-white" style={{ fontSize: `max(18px, ${k(32)})` }}>
          {value}
        </span>
      </div>
      <div className="flex items-center" style={{ gap: k(small ? 4 : 6) }}>
        {direction !== "none" && <Trend size="lg" down={direction === "down"} />}
        <span className="whitespace-nowrap leading-[1.416] text-white" style={{ fontSize: `max(${small ? 9 : 11}px, ${k(small ? 10 : 16)})` }}>
          {delta}
        </span>
        {context && (
          <span className="whitespace-nowrap leading-[1.416] text-white" style={{ fontSize: `max(9px, ${k(10)})` }}>
            {context}
          </span>
        )}
      </div>
    </div>
  );
}

export default function CauseEffectCard({ variation }: { variation: CauseEffectVariation }) {
  const [metricA, metricB] = variation.metrics;
  const [legendA, legendB] = variation.legend;
  const { images, line } = variation.chart;
  const chartH = Math.max(...images.map((i) => i.height));
  const lineSvgW = line.svgLength;

  return (
    <div
      className={`flex h-full flex-col justify-between border border-white bg-white/10 ${styles.card}`}
      style={{ ["--cp" as string]: k(16.452), ["--r" as string]: k(8.226), gap: k(24) }}
    >
      <div className={`grid grid-cols-2 ${styles.metrics}`}>
        <Metric {...metricA} />
        <Metric {...metricB} alignEnd />
      </div>

      <div className="flex w-full flex-col">
        <div className="relative" style={{ height: k(chartH) }}>
          <div className="absolute inset-x-0 bottom-0 flex items-end">
            {images.map((img, i) => (
              <Image
                key={img.src}
                src={img.src}
                alt=""
                width={img.width}
                height={img.height}
                unoptimized
                className="max-w-none shrink-0"
                style={{ width: images.length === 1 ? "100%" : i === 0 ? "50.088%" : "49.912%", height: k(img.height) }}
              />
            ))}
          </div>
          {/* "now" marker: Figma rotates a horizontal line asset 90deg */}
          <Image
            src={line.src}
            alt=""
            width={lineSvgW}
            height={4.64}
            unoptimized
            className="absolute max-w-none"
            style={{
              width: k(lineSvgW),
              height: k(4.64),
              left: `calc(${line.x / 284.5 * 100}% - ${k(lineSvgW / 2)})`,
              top: `calc(${k(line.top - 2.32 + lineSvgW / 2)} - ${k(2.32)})`,
              transform: "rotate(90deg)",
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          {[legendA, legendB].map((l) => (
            <span key={l.label} className="flex items-center" style={{ gap: k(4) }}>
              <span className="whitespace-nowrap leading-[1.416] text-white" style={{ fontSize: `max(8px, ${k(12)})` }}>
                {l.label}
              </span>
              <Trend size="sm" down={l.direction === "down"} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
