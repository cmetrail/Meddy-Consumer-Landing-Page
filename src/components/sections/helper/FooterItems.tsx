import Image from "next/image";

const NAV_LINKS = ["How it works", "Why meddy", "Physician care", "Pricing", "FAQ"];

export function FooterItems() {
  return (
    <div data-reveal className="mt-20 w-full rounded-t-[22px] bg-white/10 backdrop-blur-xl">
      <div className="mx-auto w-full max-w-360 px-6 pb-4 pt-10 lg:px-[75px] lg:pb-[18px] lg:pt-[73px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_auto] lg:gap-x-16 lg:gap-y-0">
          <div>
            <Image
              src="/app-logo.png"
              alt="Meddy Health"
              width={279}
              height={182}
              className="h-auto w-[200px] lg:w-[279px]"
            />

            <p
              className="mt-5 max-w-[699px] text-[#F4F4F5] lg:mt-[20px]"
              style={{ fontSize: 20, fontWeight: 400, lineHeight: "150%", letterSpacing: 0 }}
            >
              Calories, workouts, sleep, labs. Most people manage them separately. Meddy connects
              them and puts a physician in charge of what they mean.
            </p>

            <div className="mt-6 flex flex-wrap gap-[19px] lg:mt-[26px]">
              <button className="flex h-[60px] items-center gap-2.5 rounded-[9px] bg-black/20 px-4 text-left transition-opacity hover:opacity-80">
                <Image src="/Apple.svg" alt="Apple" width={30} height={36} className="shrink-0" />
                <span className="flex flex-col">
                  <span className="block text-white" style={{ fontSize: 13.5, lineHeight: "13.5px" }}>
                    Download on the
                  </span>
                  <span
                    className="block font-medium text-white"
                    style={{ fontSize: 27, lineHeight: "100%", letterSpacing: "-0.7px" }}
                  >
                    App Store
                  </span>
                </span>
              </button>
              <button className="flex h-[60px] items-center gap-2.5 rounded-[9px] bg-black/20 px-4 text-left transition-opacity hover:opacity-80">
                <Image src="/Playstore.svg" alt="Google Play" width={32} height={36} className="shrink-0" />
                <span className="flex flex-col">
                  <span className="block uppercase text-white" style={{ fontSize: 15, lineHeight: "18px" }}>
                    Get it on
                  </span>
                  <span className="block font-medium text-white" style={{ fontSize: 22, lineHeight: "100%" }}>
                    Google Play
                  </span>
                </span>
              </button>
            </div>
          </div>

          <nav className="flex flex-col items-start gap-[35px] lg:items-end">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="font-medium uppercase text-white hover:opacity-70"
                style={{ fontSize: 20, lineHeight: "25px" }}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-6 border-t border-[#E0E0E0] lg:mt-[26px]" />

        <p
          className="mt-8 text-center text-[#F4F4F5] lg:mt-[36px]"
          style={{ fontSize: 12, lineHeight: "18px" }}
        >
          © 2026 Meddy · Physician services available in all 50 states except: South Carolina,
          Arkansas, Rhode Island.
        </p>
      </div>
    </div>
  );
}
