"use client";

import Image from "next/image";

type CardProps = {
  bg: string;
  title: string;
  titleColor: string;
  align: "right" | "left";
  desc: React.ReactNode;
  image: string;
  imageAlt: string;
  imageClass: string;
};

function Card({
  bg,
  title,
  titleColor,
  align,
  desc,
  image,
  imageAlt,
  imageClass,
}: CardProps) {
  const isRight = align === "right";
  return (
    <div
      className="relative flex h-[520px] overflow-hidden rounded-[12px] md:h-[560px]"
      style={{ background: bg }}
    >
      <div className={`absolute ${imageClass}`}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="600px"
          className="object-contain"
        />
      </div>

      <div
        className={`relative z-10 flex w-full flex-col gap-2 p-4 md:p-6 ${
          isRight ? "items-end text-right" : "items-start text-left"
        }`}
      >
        <h3
          className="max-w-[440px] font-extrabold uppercase leading-[1.05] text-[24px] md:text-[38px] xl:text-[48px]"
          style={{ color: titleColor }}
        >
          {title}
        </h3>
        <p className="max-w-[324px] font-bold uppercase leading-[1.4] text-[14px] md:text-[16px]">
          {desc}
        </p>
      </div>
    </div>
  );
}

const Italic = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <em className="italic" style={{ color }}>
    {children}
  </em>
);

export default function WearablesPlatformsSection() {
  return (
    <section className="bg-[#FAF9F5] py-16 lg:py-[120px]">
      <div className="mx-auto flex w-full max-w-360 flex-col gap-12 px-5 lg:px-[100px]">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2 text-center lg:gap-5">
          <h2 className="font-medium uppercase leading-[1.05] text-[32px] md:text-[40px] lg:text-[48px]">
            <span className="block text-[#A1AAA3]">Keep wearing</span>
            <span className="block text-[#46524B]">
              what you already love.
            </span>
          </h2>
          <p className="max-w-[644px] font-medium text-[16px] text-[#9A9A9A]">
            Meddy connects with the{" "}
            <span className="font-bold text-[#6E7A72]">
              health platforms and devices already part of your day.
            </span>
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          <Card
            bg="#FFFFFF"
            title="Apple Health"
            titleColor="#46524B"
            align="right"
            image="/wearables/apple-health-phone-49d12c.png"
            imageAlt="Apple Health on iPhone"
            imageClass="left-[-11%] top-[23%] h-[93%] w-[125%] md:left-[-3%] md:top-[15%] md:h-[82%] md:w-[68%]"
            desc={
              <>
                Your everyday{" "}
                <Italic color="#A1AAA3">
                  activity, workouts, heart rate, sleep, and fitness data
                </Italic>
                —connected to Meddy.
              </>
            }
          />
          <Card
            bg="#FCFFE6"
            title="Oura Ring"
            titleColor="#9FA765"
            align="left"
            image="/wearables/oura-ring-card-51c6bd.png"
            imageAlt="Oura Ring"
            imageClass="left-[-39%] top-[11%] h-[97%] w-[167%] md:left-[-3%] md:top-[3%] md:h-[110%] md:w-[117%]"
            desc={
              <span className="text-[#929677]">
                Bring your{" "}
                <Italic color="#929677">
                  sleep, HRV, resting heart rate, activity, and recovery data
                </Italic>
                <br />
                into your health picture.
              </span>
            }
          />
          <Card
            bg="#E7EDFD"
            title="Google Health Connect"
            titleColor="#6F65A7"
            align="left"
            image="/wearables/google-health-phone-bc22a8.png"
            imageAlt="Google Health Connect on phone"
            imageClass="left-[16%] top-[23%] h-[108%] w-[123%] md:left-[32%] md:top-[16%] md:h-[123%] md:w-[87%]"
            desc={
              <span className="text-[#968CB9]">
                Connect your{" "}
                <Italic color="#968CB9">
                  activity, workouts, heart rate, sleep,
                </Italic>{" "}
                and other supported health data.
              </span>
            }
          />
          <Card
            bg="#C3FAD3"
            title="Fitbit"
            titleColor="#65A76D"
            align="left"
            image="/wearables/fitbit-card-527868.png"
            imageAlt="Fitbit device"
            imageClass="left-0 top-[22%] h-[80%] w-[142%] md:left-[27%] md:top-[21%] md:h-[79%] md:w-[86%]"
            desc={
              <span className="text-[#769C7D]">
                Bring your{" "}
                <Italic color="#769C7D">
                  activity, sleep, workouts, heart rate, and supported fitness
                  data
                </Italic>{" "}
                into Meddy.
              </span>
            }
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-4">
          <Image
            src="/wearables/powered-accent.svg"
            alt=""
            width={9}
            height={49}
            className="hidden h-[49px] w-[9px] md:block"
          />
          <span className="text-center font-medium uppercase text-[16px] text-[#9A9A9A] md:text-[20px]">
            Powered through Apple Health and Google Health Connect.
          </span>
        </div>
      </div>
    </section>
  );
}
