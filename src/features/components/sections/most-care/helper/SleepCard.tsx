import Image from "next/image";

export default function SleepCard() {
  return (
    <div className="relative w-full" style={{ aspectRatio: "418/329" }}>
      <div className="absolute left-0 top-0 h-full w-[69%]">
        <Image src="/home/most-care-sleep.png" alt="Sleep" fill className="object-cover rounded-[10px]" />
      </div>
      {/* score + graph card */}
      <div className="absolute right-0 bottom-0 top-[48%] w-[45%] flex flex-col gap-2 rounded-[10px] bg-white p-3 shadow-[4px_4px_8px_rgba(0,0,0,0.25)]">
        <div className="flex flex-col items-end shrink-0">
          <span className="text-theme-textSecondary text-[7px] font-medium">Score</span>
          <p className="font-bold text-base leading-tight text-[#18181B]">93%</p>
          <span className="flex items-center gap-1 rounded-full bg-[#57E6FF] px-2 py-0.5 text-[#0C0D0F] text-[7px] font-semibold">
            Very Stable
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4.5" stroke="#0C0D0F" strokeWidth="1" />
              <text x="5" y="7.5" textAnchor="middle" fontSize="6" fill="#0C0D0F" fontWeight="700">i</text>
            </svg>
          </span>
        </div>
        <div className="relative flex-1 min-h-0">
          <Image
            src="/home/sleep-graphs.png"
            alt="Sleep chart"
            fill
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
}
