import Reveal from "./Reveal";
import GiantNumber from "./GiantNumber";

export default function FeatureRow({
  number,
  chart,
  content,
  reverse = false,
}: {
  number: string;
  chart: React.ReactNode;
  content: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className="max-w-360 mx-auto px-6 lg:px-13 relative">
      <GiantNumber n={number} />
      <div className="relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal className={reverse ? "lg:order-2" : ""}>{chart}</Reveal>
        <Reveal className={reverse ? "lg:order-1" : ""}>{content}</Reveal>
      </div>
    </div>
  );
}
