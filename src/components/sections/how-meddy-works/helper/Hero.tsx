import Image from "next/image";

const ICONS = [
  "/home/scattered-1.png",
  "/home/scattered-2.png",
  "/home/scattered-3.png",
  "/home/scattered-4.png",
  "/home/scattered-5.png",
  "/home/scattered-6.png",
];

export default function Hero() {
  return (
    <div className="relative overflow-hidden" style={{ height: "var(--dvh)" }}>
      {/* Curtain background */}
      <Image
        src="/home/how-it-work-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />

      <div className="relative z-10 flex pt-16 h-full max-w-360 px-5 lg:px-10 mx-auto flex-col">

        {/* Text */}
        <div className="text-center gap-2 sm:gap-5 max-w-214 mx-auto flex flex-col shrink-0">
          <p
            className="uppercase tracking-[0.18em] leading-[100%] text-xl font-bold text-[#ABB1AD]"
          >
            How Meddy Works
          </p>

          <h2 className="flex flex-col gap-5">
            <span
              className="block font-normal text-[50px] leading-[100%] text-[#ABB1AD]"
              // style={{ fontSize: "clamp(24px, 4.2vw, 50px)" }}
            >
              Your health system ,
            </span>
            <span
              className="block font-bold text-[50px] leading-[100%] uppercase"
              style={{
                // fontSize: "clamp(24px, 4.2vw, 54px)",
                background: "linear-gradient(90deg, #578951 0%, #2F6328 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              All in one place.
            </span>
          </h2>

          <p
            className="text-[#ABB1AD] text-[24px] font-medium"

          >
            Everything you log becomes something your doctor can act on.
          </p>
        </div>
        <div className="relative h-full">
        {/* Phone mockup — single image already contains both phones */}
          <div className="flex flex-1 min-h-0 items-end justify-center px-4">
          <Image
            src="/home/iPhone-17.png"
            alt="Meddy app screens"
            width={800}
            height={600}
              className="object-contain object-bottom"
            style={{
              width: "clamp(360px, 100%, 650px)",
              height: "auto",
              maxHeight: "66dvh",
            }}
          />
        </div>

        {/* Icon strip — centered rounded shelf */}
          <div className="absolute left-0 right-0 bottom-[8%] max-md:bottom-[8%]">
          <div
            className="mx-auto flex items-center py-3.25 bg-white/10 justify-around px-2 sm:px-6 lg:px-10"
            style={{
              maxWidth: 1018,
              borderRadius: 16,
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {ICONS.map((src) => (
              <div key={src} className="relative w-[129px] h-[69px]">
                <Image src={src} alt="" fill className="object-contain" />
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
