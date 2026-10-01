"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const MAIN_IMAGE = "/physician-care/fifth-main-7843b8.png";
const ARC = "/physician-care/fifth-arc.svg";

// Exact "Subtract" shape from Figma node 2645-7648 (rounded rect with a
// top-left notch for the heading and a bottom-right notch for the tagline),
// normalized to objectBoundingBox units so it scales with the image.
const CLIP_PATH =
  "M 1 0.82353 C 1 0.83859 0.9915 0.8508 0.98102 0.8508 H 0.67821 C 0.66773 0.8508 0.65923 0.863 0.65923 0.87806 V 0.97274 C 0.65923 0.98779 0.65073 1 0.64025 1 H 0.01898 C 0.0085 1 0 0.98779 0 0.97274 V 0.19355 C 0 0.17849 0.0085 0.16629 0.01898 0.16629 H 0.32179 C 0.33227 0.16629 0.34077 0.15408 0.34077 0.13902 V 0.02726 C 0.34077 0.01221 0.34927 0 0.35975 0 H 0.98102 C 0.9915 0 1 0.01221 1 0.02726 V 0.82353 Z";

// White "Photoroom" person silhouettes (transparent-background cutouts) that
// blend over the photo. Positions are percentages of the 1317x917 image.
const PEOPLE = [
  { src: "/physician-care/fifth-person-a-588068.png", left: "4.78%", top: "78.84%", width: "12.53%", aspect: "165 / 240" },
  { src: "/physician-care/fifth-person-b-2cfe92.png", left: "19.06%", top: "70.88%", width: "12.53%", aspect: "165 / 320" },
  { src: "/physician-care/fifth-person-b-2cfe92.png", left: "34.85%", top: "62.92%", width: "14.88%", aspect: "196 / 380" },
  { src: "/physician-care/fifth-person-c.png", left: "48.67%", top: "61.50%", width: "20.58%", aspect: "271 / 406" },
];

export default function PhysicianCareFifthSection() {
  return (
    <section className="relative w-full bg-white">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="fifth-subtract-clip" clipPathUnits="objectBoundingBox">
            <path d={CLIP_PATH} />
          </clipPath>
        </defs>
      </svg>

      <style>{`
        @media (min-width: 1024px) {
          .fifth-subtract-img { clip-path: url(#fifth-subtract-clip); }
        }
      `}</style>

      <div className="mx-auto w-full max-w-360 px-5 pb-[64px] lg:px-[75px] lg:pb-[91px]">
        <div className="relative">
          {/* Heading — top-left, sits in the image's top-left notch on desktop */}
          <motion.div
            className="relative z-10 pt-[36px] lg:pt-[91px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="uppercase leading-[1.25] text-[#46524B] text-[18px] sm:text-[22px] lg:text-[36px]">
              Care that
            </p>
            <h2 className="font-dm-serif uppercase leading-[1.37] text-[#46524B] text-[34px] sm:text-[44px] lg:text-[78px]">
              Grows
              <br />
              with you
            </h2>
          </motion.div>

          {/* Main image — pulled up only on desktop so the heading sits in its notch */}
          <div className="relative mt-0 lg:-mt-[133px]">
            <div className="relative" style={{ aspectRatio: "1317 / 917" }}>
              <Image
                src={MAIN_IMAGE}
                alt=""
                fill
                sizes="(min-width: 1440px) 1290px, 100vw"
                className="fifth-subtract-img object-cover"
              />

              {/* White person silhouettes blended over the photo */}
              {PEOPLE.map((p, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    left: p.left,
                    top: p.top,
                    width: p.width,
                    aspectRatio: p.aspect,
                  }}
                >
                  <Image
                    src={p.src}
                    alt=""
                    fill
                    unoptimized
                    sizes="600px"
                    className="object-cover"
                    style={{ filter: "blur(16px)", opacity: 0.3, mixBlendMode: "luminosity" }}
                  />
                </div>
              ))}

              {/* Decorative arc */}
              <div
                className="absolute"
                style={{
                  left: "67.27%",
                  top: "56.93%",
                  width: "31.05%",
                  aspectRatio: "409 / 212",
                }}
              >
                <Image
                  src={ARC}
                  alt=""
                  fill
                  unoptimized
                  sizes="500px"
                  className="object-contain"
                />
              </div>
            </div>

            {/* Tagline — below image on mobile/tablet, in the bottom-right notch on desktop */}
            <motion.div
              className="mt-5 text-left lg:absolute lg:bottom-0 lg:right-0 lg:mt-0 lg:w-[34.4%] lg:text-right"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <p className="uppercase text-[#46524B] text-[16px] sm:text-[20px] lg:text-[24px]">
                Your health changes.
              </p>
              <p className="uppercase font-semibold italic text-[#46524B] text-[24px] sm:text-[30px] lg:text-[36px]">
                So should your care.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
