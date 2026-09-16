import Image from "next/image";

const FOOTER_COLUMNS: string[][] = [
  ["Home page", "How it works", "Why Meddy", "Sleep and recovery", "Pricing"],
  [
    "Nutrition",
    "Physician Care",
    "Personalized\nhealth plans",
    "Medication\nmanagement",
    "Longevity and\npreventive health",
  ],
  [
    "Labs and\nBiomarkers Tracking",
    "Weighloss and\nMetabolic",
    "Werables and\nHealth Data",
    "Fitness",
    "24/7 Primary Care",
  ],
];

export function FooterItems() {
  return (
    <div className="mt-10 w-full rounded-t-[22px] bg-white/10 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-360 px-5 lg:px-10 py-16 pb-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:gap-x-16 lg:gap-y-0">
          <div>
            <Image
              src="/app-logo.png"
              alt="Meddy Health"
              width={358}
              height={215}
              className="h-auto w-50 lg:w-89.5"
            />

            <p className="max-w-174.75 text-[#F4F4F5] text-[20px] leading-[150%] mt-8">
              Calories, workouts, sleep, labs… Most people manage them separately. Meddy connects
              them and puts a physician in charge of what they mean.
            </p>

            <div className="mt-6 flex flex-wrap gap-4.75 lg:mt-6.5">
              <button
                className="flex h-15 items-center gap-2.5 rounded-[9px] bg-black/20 px-4 text-left transition-opacity hover:opacity-80"
                style={{
                  backdropFilter: "blur(14px)",
                  border: "0.75px solid #FFFFFF1A",
                }}
              >
                <Image src="/Apple.svg" alt="Apple" width={30} height={36} className="shrink-0" />
                <span className="flex flex-col">
                  <span className="block text-white text-[13.5px] leading-[13.5px] font-medium">
                    Download on the
                  </span>
                  <span className="block font-medium text-white text-[27px] leading-[100%] tracking-[-0.7px]">
                    App Store
                  </span>
                </span>
              </button>
              <button
                className="flex h-15 items-center gap-2.5 rounded-[9px] bg-black/20 px-4 text-left transition-opacity hover:opacity-80"
                style={{
                  backdropFilter: "blur(14px)",
                  border: "0.75px solid #FFFFFF1A",
                }}
              >
                <Image src="/Playstore.svg" alt="Google Play" width={32} height={36} className="shrink-0" />
                <span className="flex flex-col gap-1">
                  <span className="block uppercase text-white text-[15px] leading-[15px] font-normal">
                    Get it on
                  </span>
                  <Image
                    src="/google-play-wordmark.svg"
                    alt="Google Play"
                    width={111}
                    height={23}
                    className="h-[22.5px] w-auto"
                  />
                </span>
              </button>
            </div>
          </div>

          <nav className="flex flex-col items-start gap-10 lg:flex-row lg:items-start lg:gap-16">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column[0]} className="flex flex-col items-end gap-[35px]">
                {column.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="whitespace-pre-line text-right font-medium text-white text-base leading-[1.3] hover:opacity-70"
                  >
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-6 border-t border-[#E0E0E0] lg:mt-8" />
        <p className="mt-8 text-center text-[#F4F4F5] text-[12px] leading-[150%] lg:mt-8">
          © 2026 Meddy · Physician services available in all 50 states except: South Carolina,
          Arkansas, Rhode Island.
        </p>
      </div>
    </div>
  );
}
