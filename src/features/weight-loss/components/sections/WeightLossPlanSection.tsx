"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Figma: desktop node 12593:13162 (1440 x 1361, fixed px, content box 1200 / padding 120), mobile node 12722:9067 (402 x 798).
// The revolving text ring uses the SVG textPath + <animate startOffset> technique from MedicationOrbitalSection.
const ease = [0.22, 1, 0.36, 1] as const;

const P = "/weight-loss/plan";
const BG = "#E4FAE1";

const RING_TEXT =
  "PRESCRIBE OR ADJUST - FOLLOW YOUR RESPONSE - REVIEW SYMPTOMS + HEALTH DATA + LABS - CONTINUE • ADJUST • REASSESS - ";

/** Ring geometry from the Figma "text circle" frame: viewBox, ellipse radii, font sizes, reflection offset. */
type RingGeo = { w: number; h: number; rx: number; ry: number; font: number; shadowFont: number; shadowDy: number };
const RING_D: RingGeo = { w: 1027.8, h: 294.1, rx: 421.5, ry: 94.5, font: 32, shadowFont: 36, shadowDy: 56 };
const RING_M: RingGeo = { w: 384.67, h: 122.23, rx: 156.7, ry: 36.2, font: 14, shadowFont: 15.5, shadowDy: 21 };

/** Elliptical text ring: `front` (green) or `shadow` (blurred, flattened gray reflection). The copy slowly travels along the path. */
function Ring({ id: baseId, part, g }: { id: string; part: "front" | "shadow"; g: RingGeo }) {
  const id = `${baseId}-${part}`;
  const dur = "60s";
  const cx = g.w / 2;
  const cy = g.h / 2;
  const perim = Math.PI * (3 * (g.rx + g.ry) - Math.sqrt((3 * g.rx + g.ry) * (g.rx + 3 * g.ry)));
  // clockwise from the bottom, so the copy reads upright across the top
  const path = `M ${cx} ${cy + g.ry} A ${g.rx} ${g.ry} 0 1 1 ${cx} ${cy - g.ry} A ${g.rx} ${g.ry} 0 1 1 ${cx} ${cy + g.ry}`;
  const k = g.font / 32;
  const texts = (fill: string, size: number) => (
    <>
      {[0, -perim].map((from, i) => (
        <text key={i} fontSize={size} fontWeight="600" fill={fill} stroke={fill} strokeWidth={0.8 * k} style={{ fontFamily: "var(--font-plus-jakarta), sans-serif" }}>
          <textPath href={`#${id}`} startOffset={from} textLength={perim} lengthAdjust="spacing">
            {RING_TEXT}
            <animate attributeName="startOffset" from={from} to={from + perim} dur={dur} repeatCount="indefinite" />
          </textPath>
        </text>
      ))}
    </>
  );
  return (
    <svg viewBox={`0 0 ${g.w} ${g.h}`} className="block w-full overflow-visible" aria-hidden="true">
      <defs>
        <path id={id} d={path} fill="none" />
        <filter id={`${id}-blur`} x="-10%" y="-60%" width="120%" height="220%">
          <feGaussianBlur stdDeviation={2 * k} />
        </filter>
      </defs>
      {part === "shadow" ? (
        <g transform={`translate(0 ${cy + g.shadowDy}) scale(1 -0.4) translate(0 -${cy})`} filter={`url(#${id}-blur)`} opacity="0.3">
          {texts("#A9A9A9", g.shadowFont)}
        </g>
      ) : (
        texts("#17925A", g.font)
      )}
    </svg>
  );
}

type Box = { l: number; t: number; w: number; h: number };
type PhotoGeo = {
  w: number;
  h: number;
  body: Box & { img: [string, string, string, string] };
  fade: Box & { stops: [string, string] };
  ring: { l: number; t: number; w: number; g: RingGeo };
  head: Box & { img: [string, string, string, string] };
};
const PHOTO_D: PhotoGeo = {
  w: 931.25,
  h: 809,
  body: { l: 167.49, t: 0, w: 581.19, h: 803.94, img: ["115.05%", "-16.38%", "127.32%", "0"] },
  fade: { l: 155.22, t: 606.54, w: 582.08, h: 202.46, stops: ["20.268%", "92.736%"] },
  ring: { l: -10, t: 308.39, w: 1027.85, g: RING_D },
  head: { l: 166.48, t: 0, w: 560.32, h: 465.92, img: ["198.52%", "-16.9%", "132.16%", "0"] },
};
const PHOTO_M: PhotoGeo = {
  w: 362,
  h: 313,
  body: { l: 70.65, t: 0.11, w: 226.01, h: 312.63, img: ["115.05%", "-16.38%", "127.32%", "0"] },
  fade: { l: 68, t: 228.89, w: 226, h: 84, stops: ["20.268%", "101.53%"] },
  ring: { l: -11, t: 93.85, w: 384.67, g: RING_M },
  head: { l: 72, t: 0, w: 218, h: 162, img: ["221.94%", "-17.02%", "132.04%", "0.07%"] },
};

const imgStyle = ([h, l, w, t]: [string, string, string, string]) => ({ height: h, left: l, width: w, top: t });

/**
 * Doctor + revolving ring. The body and the head overlay are the SAME photo at the same offset, so the ring
 * passes in front of the body but behind the head, and the gray reflection sits behind the body.
 * `--k` = px per design unit.
 */
function PhotoStack({ ringId, geo }: { ringId: string; geo: PhotoGeo }) {
  const u = (n: number) => `calc(${n} * var(--k))`;
  const { body, fade, ring, head } = geo;
  return (
    <div className="relative shrink-0" style={{ width: u(geo.w), height: u(geo.h) }}>
      <div className="pointer-events-none absolute" style={{ left: u(ring.l), top: u(ring.t), width: u(ring.w) }}>
        <Ring id={ringId} part="shadow" g={ring.g} />
      </div>
      <div className="absolute overflow-hidden" style={{ left: u(body.l), top: u(body.t), width: u(body.w), height: u(body.h) }}>
        <Image src={`${P}/doctor.png`} alt="Meddy physician" width={1080} height={1350} sizes="600px" priority className="absolute max-w-none" style={imgStyle(body.img)} />
      </div>
      <div
        className="absolute"
        style={{ left: u(fade.l), top: u(fade.t), width: u(fade.w), height: u(fade.h), background: `linear-gradient(180deg, rgba(228,250,225,0) ${fade.stops[0]}, #E4FAE1 ${fade.stops[1]})` }}
      />
      <div className="pointer-events-none absolute" style={{ left: u(ring.l), top: u(ring.t), width: u(ring.w) }}>
        <Ring id={ringId} part="front" g={ring.g} />
      </div>
      <div className="absolute overflow-hidden" style={{ left: u(head.l), top: u(head.t), width: u(head.w), height: u(head.h) }}>
        <Image src={`${P}/doctor.png`} alt="" width={1080} height={1350} sizes="600px" priority className="absolute max-w-none" style={imgStyle(head.img)} />
      </div>
    </div>
  );
}

type PlanItem = { icon: string; title: string; rows: string[][] };

const PLAN_ITEMS: PlanItem[] = [
  { icon: "icon-data.svg", title: "Your Data", rows: [["Nutrition", "Exercise", "Sleep"], ["Medications", "Labs", "Weight"]] },
  { icon: "icon-physician.svg", title: "Your Physician", rows: [] },
  { icon: "icon-plan.svg", title: "Your Plan", rows: [["Nutrition", "Exercise", "Testing"], ["Medications", "Follow-up"]] },
  { icon: "icon-response.svg", title: "Measure the response", rows: [] },
];

/** Icon + title + outlined chips. Desktop (Figma 12593:13180): 128px icon, 20px title. Mobile (12785:15700): 40px icon, 14px title. */
function PlanItemCard({ item, mobile = false }: { item: PlanItem; mobile?: boolean }) {
  const icon = mobile ? 40 : 128;
  return (
    <div className={`flex flex-col items-center ${mobile ? "shrink-0" : "w-full"}`} style={{ gap: mobile ? 8 : 10 }}>
      <div className="flex flex-col items-center" style={{ gap: mobile ? 4 : 10 }}>
        <Image src={`${P}/${item.icon}`} alt="" width={icon} height={icon} unoptimized className="shrink-0" style={{ width: icon, height: icon }} />
        <p className={`whitespace-nowrap text-right font-normal text-[#46524B] ${mobile ? "text-[14px] leading-[1.5]" : "text-[20px] leading-[normal]"}`}>{item.title}</p>
      </div>
      {item.rows.length > 0 && (
        <div className="flex flex-col items-center" style={{ gap: mobile ? 4 : 8 }}>
          {item.rows.map((row) => (
            <div key={row.join()} className="flex items-center" style={{ gap: mobile ? 4 : 5 }}>
              {row.map((t) => (
                <span
                  key={t}
                  className={`flex items-center justify-center whitespace-nowrap rounded-[55px] border border-solid border-[#6E7A72] text-[12px] font-normal text-[#6E7A72] ${
                    mobile ? "px-[8px] py-[4px] leading-[1.5]" : "px-[10px] py-[5px] leading-[normal]"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function WeightLossPlanSection() {
  return (
    <section id="weight-loss-plan" className="relative w-full overflow-hidden" style={{ background: BG }}>
      {/* ===================== DESKTOP (lg+) ===================== */}
      <div className="relative hidden lg:block">
        <div className="mx-auto w-full max-w-[1200px] py-[120px]">
          <div className="flex flex-col items-center" style={{ gap: 32 }}>
            <motion.div
              className="flex flex-col items-center whitespace-nowrap text-[40px]"
              style={{ gap: 8 }}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
            >
              <h2 className="text-center text-[40px] font-medium leading-[1.5] text-[#111110]">A weight-loss plan that changes when you do. </h2>
              <p className="comprehensive-serif text-[40px] italic leading-[normal] text-[#17925A]">Your physician sees the same data you do.</p>
            </motion.div>

            <div className="flex w-full items-center justify-between">
              <motion.div
                style={{ ["--k" as string]: "1px" } as React.CSSProperties}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease }}
              >
                <PhotoStack ringId="wl-plan-ring-d" geo={PHOTO_D} />
              </motion.div>

              <motion.div
                className="flex shrink-0 flex-col items-start"
                style={{ width: 218, gap: 24 }}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, delay: 0.15, ease }}
              >
                {PLAN_ITEMS.map((item) => (
                  <PlanItemCard key={item.title} item={item} />
                ))}
              </motion.div>
            </div>

            <motion.ul
              className="flex w-full flex-col items-start justify-center text-[20px] font-normal text-[#6E7A72]"
              style={{ gap: 8 }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, delay: 0.1, ease }}
            >
              <li className="ms-[30px] list-disc whitespace-nowrap leading-[1.5]">No generic plan.</li>
              <li className="ms-[30px] list-disc whitespace-nowrap leading-[1.5]">No waiting months to find out whether it&rsquo;s working.</li>
            </motion.ul>
          </div>
        </div>
      </div>

      {/* ===================== MOBILE (<lg): 402 frame, scaled by --k ===================== */}
      <div
        className="mx-auto flex w-full max-w-[500px] flex-col py-16 lg:hidden"
        style={{ gap: 32, ["--k" as string]: "calc(min(100vw, 500px) / 402)" } as React.CSSProperties}
      >
        <div className="flex flex-col px-5" style={{ gap: 24 }}>
          <motion.p
            className="text-center text-[20px] font-medium leading-[1.5] text-[#111110]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
          >
            A weight-loss plan that changes when you do. <span className="comprehensive-serif italic text-[#17925A]">Your physician sees the same data you do. </span>
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease }}
          >
            <PhotoStack ringId="wl-plan-ring-m" geo={PHOTO_M} />
          </motion.div>
        </div>

        {/* items scroll sideways, bleeding to the screen edge like the frame */}
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max items-start px-5" style={{ gap: 32 }}>
            {PLAN_ITEMS.map((item) => (
              <PlanItemCard key={item.title} item={item} mobile />
            ))}
          </div>
        </div>

        <ul className="flex flex-col px-5 text-[12px] font-normal text-[#6E7A72]" style={{ gap: 8 }}>
          <li className="ms-[18px] list-disc leading-[1.5]">No generic plan.</li>
          <li className="ms-[18px] list-disc leading-[1.5]">No waiting months to find out whether it&rsquo;s working.</li>
        </ul>
      </div>
    </section>
  );
}
