import Image from "next/image";

function A1cChart() {
  const grid = [182.287, 213.481, 244.657, 275.834, 307.01, 338.187, 369.363, 400.54, 431.716, 462.893, 494.069];
  const linePath =
    "M49.1953 275.784C93.7146 312.854 187.478 306.499 328 302.503" +
    "C539 296.503 560.399 338.989 659 323.503" +
    "C910.5 284.003 795.071 396.655 1018.03 396.655" +
    "C1219.5 396.655 1225.14 398.932 1324.2 494.784";
  const dots = [
    [181.5, 304.5],
    [770.5, 316.503],
    [1209.5, 408.5],
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-[5px] bg-white px-1 py-2">
      <svg viewBox="45 95 1350 410" className="block w-full" preserveAspectRatio="none">
        <defs>
          <radialGradient id="a1c-card-line-grad" cx="0" cy="0" r="1" gradientTransform="matrix(-663.337 -21.2647 66.2132 -1470.75 712.532 310.058)" gradientUnits="userSpaceOnUse">
            <stop stopColor="#61D253" />
            <stop offset="0.687" stopColor="#4C8935" />
            <stop offset="0.951" stopColor="#57A832" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="a1c-card-dot-grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(10.4999 10.5) rotate(87.3975) scale(12.8466)">
            <stop offset="0.016" stopColor="#68AD75" />
            <stop offset="1" stopColor="#17622B" />
          </radialGradient>
          <filter id="a1c-card-dot-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.8" />
          </filter>
        </defs>

        <g opacity="0.2">
          {grid.map((y) => (
            <line key={y} x1="118.213" y1={y} x2="1388.803" y2={y} stroke="#000000" strokeWidth="0.784314" />
          ))}
        </g>
        <path d={linePath} stroke="url(#a1c-card-line-grad)" strokeWidth="10.03" fill="none" strokeLinecap="round" />
        <line x1="771" y1="276.003" x2="771" y2="495.003" stroke="#3EAE1C" strokeWidth="2" strokeDasharray="3 3" />
        {dots.map(([cx, cy]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="13.5" fill="#55C272" opacity="0.75" filter="url(#a1c-card-dot-glow)" />
            <circle cx={cx} cy={cy} r="10.5" fill="url(#a1c-card-dot-grad)" />
          </g>
        ))}
      </svg>

      <span className="absolute left-[7%] top-[42%] text-[7px] font-bold text-black">
        A1c
      </span>
      <div className="absolute left-[50%] top-[4%] rounded-[3px] bg-[#003B1D] px-1.5 py-1">
        <span className="block text-[5px] text-[#ADADAD]">Jan 4</span>
        <span className="block text-[5px] text-[#ADADAD]">Semaglutide dose</span>
        <span className="block text-[5px] text-[#3EAE1C]">increased</span>
        <span className="mt-0.5 block text-[6px] font-bold text-white">1.7 mg → <span className="text-[#3EAE1C]">2.4 mg</span></span>
      </div>
    </div>
  );
}

export default function A1cCard() {
  return (
    <div className="relative w-full" style={{ aspectRatio: "435/377" }}>
      <div className="absolute right-0 top-0 h-full w-[60%]">
        <Image src="/home/most-care-a1c.png" alt="A1c" fill className="object-cover rounded-[11px]" />
      </div>
      <div className="absolute left-0 bottom-4 w-[56%] rounded-[7px] border border-[#E2E2E2] bg-white p-2">
        <p className="text-[9px] font-medium text-[#111110]">A1c Trend</p>
        <div className="mt-1">
          <A1cChart />
        </div>
      </div>
    </div>
  );
}
