import Eyebrow from "./Eyebrow";

export default function FeatureCopy({
  eyebrow,
  headline,
  accent,
  sub,
}: {
  eyebrow: string;
  headline: string;
  accent: string;
  sub: string;
}) {
  return (
    <div>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h3 className="text-[#ABB1AD] font-bold uppercase leading-[1.05] tracking-tight" style={{ fontSize: "clamp(26px, 2.5vw, 36px)" }}>
        {headline.split(accent)[0]}
        <span className="text-[#578951]">{accent}</span>
        {headline.split(accent)[1] ?? ""}
      </h3>
      <p className="text-[#ABB1AD] mt-5 max-w-xl leading-normal" style={{ fontSize: 20 }}>
        {sub}
      </p>
    </div>
  );
}
