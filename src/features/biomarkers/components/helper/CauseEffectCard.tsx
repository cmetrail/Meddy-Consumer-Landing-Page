import Image from "next/image";
import type { CauseEffectMetric, CauseEffectVariation } from "./causeEffectVariations";

// Card is drawn in Figma px; --k maps one Figma px to screen px (1px on mobile, --u on lg+)
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

function Metric({ label, value, delta, context, direction, small }: CauseEffectMetric) {
  return (
    <div className="flex min-w-0 flex-col items-start" style={{ gap: k(10) }}>
      <div className="flex flex-col items-start">
        <span className="whitespace-nowrap leading-[1.416] text-white" style={{ fontSize: `max(9px, ${k(12)})` }}>
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
      className="flex h-full flex-col justify-between rounded-[var(--r)] border border-white bg-white/10 p-[var(--cp)] [--k:min(1px,calc((100vw-76px)/284.5))] lg:[--k:var(--u)]"
      style={{ ["--cp" as string]: k(16.452), ["--r" as string]: k(8.226), gap: k(24) }}
    >
      <div className="grid grid-cols-2" style={{ width: k(284.5) }}>
        <Metric {...metricA} />
        <Metric {...metricB} />
      </div>

      <div className="flex flex-col" style={{ width: k(284.5) }}>
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
                style={{ width: images.length === 1 ? k(284.5) : i === 0 ? k(142.5) : k(142), height: "auto" }}
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
              left: `calc(${k(line.x)} - ${k(lineSvgW / 2)})`,
              top: `calc(${k(line.top - 2.32 + lineSvgW / 2)} - ${k(2.32)})`,
              transform: "rotate(90deg)",
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          {[legendA, legendB].map((l) => (
            <span key={l.label} className="flex items-center" style={{ gap: k(4) }}>
              <span className="whitespace-nowrap leading-[1.416] text-white" style={{ fontSize: `max(8px, ${k(10)})` }}>
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
