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
    <div className="flex flex-col gap-20  lg:max-w-156.25 lg:gap-32.5">
      <div className="flex flex-col gap-10 lg:gap-22.5">
      <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="text-[#ABB1AD] font-bold uppercase leading-[100%] tracking-[2%] text-[28px] sm:text-[36px]">
        {headline.map((item) => {
          return <div key={item}>{item}</div>
        })}
        <span className="text-[#578951]">{accent}</span>
        </h3>
      </div>
      <p className="text-[#ABB1AD]  max-w-xl text-[16px] sm:text-[24px] leading-[100%] tracking-[2%]" >
        {sub}
      </p>
    </div>
  );
}
