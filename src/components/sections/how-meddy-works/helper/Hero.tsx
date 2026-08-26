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
    <div className="relative overflow-hidden" >
      {/* Curtain background */}
      <Image
        src="/home/how-it-work-bg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />

      <div className="relative z-10 flex flex-col">

        {/* Text */}
        <div className="text-center gap-2 sm:gap-7.5 max-w-214 mx-auto sm:pt-16 pt-10 px-4 flex flex-col">
          <p
            className="uppercase tracking-[0.18em] text-xl font-bold text-[#ABB1AD]"
          >
            How Meddy Works
          </p>

          <h2 >
            <span
              className="block font-normal text-[#ABB1AD]"
              style={{ fontSize: "clamp(28px, 4.8vw, 64px)" }}
            >
              Your health system ,
            </span>
            <span
              className="block font-bold uppercase"
              style={{
                fontSize: "clamp(28px, 4.8vw, 64px)",
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
            className="text-[#ABB1AD] font-medium"
            style={{ fontSize: "clamp(14px, 1.25vw, 20px)" }}
          >
            Everything you log becomes something your doctor can act on.
          </p>
        </div>

        {/* Phone mockup — single image already contains both phones */}
        <div className=" flex items-end justify-center relative px-4">
          <Image
            src="/home/iPhone-17.png"
            alt="Meddy app screens"
            width={800}
            height={600}
            className="relative z-10 sm:-top-8   object-contain object-bottom"
            style={{
              width: "clamp(360px, 100%, 600px)",
              maxHeight: "none",
            }}
          />
        </div>

        {/* Icon strip — centered rounded shelf */}
        <div className="relative z-20 px-4 -mt-20 lg:px-8 pb-6 ">
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
              <div key={src} className="relative" style={{ height: 54, width: 76 }}>
                <Image src={src} alt="" fill sizes="76px" className="object-contain" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
