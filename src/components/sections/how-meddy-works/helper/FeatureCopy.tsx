import Eyebrow from "./Eyebrow";

export default function FeatureCopy({
  eyebrow,
  headline,
  accent,
  sub,
}: {
  eyebrow: string;
    headline: string[];
  accent: string;
  sub: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:gap-8 max-w-156.25 lg:gap-32.5">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3 className="text-[#ABB1AD] font-bold uppercase leading-[1.05] tracking-tight" style={{ fontSize: "clamp(30px, 5vw, 36px)" }}>
        {headline.map((item) => {
          return <div key={item}>{item}</div>
        })}
        <span className="text-[#578951]">{accent}</span>
      </h3>
      <p className="text-[#ABB1AD] mt-5 max-w-xl leading-normal" style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}>
        {sub}
      </p>
    </div>
  );
}
