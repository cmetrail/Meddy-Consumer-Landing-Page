"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { AppIcon } from "@/utils/constant/icon";

gsap.registerPlugin(useGSAP);

const ICONS = [
  { name: "stethoscope", icon: <AppIcon.DoctorIcon /> },
  { name: "utensils",    icon: <AppIcon.Utensisls /> },
  { name: "dumbbell",    icon: <AppIcon.Dumbbell /> },
  { name: "moon-star",   icon: <AppIcon.MoonStar /> },
];

interface Props {
  iconsRef:     RefObject<HTMLDivElement | null>;
  nutritionRef: RefObject<HTMLDivElement | null>;
  activeIndex:  number;
  nextImage:    string;
}

export default function HeroRightPanel({ iconsRef, nutritionRef, activeIndex, nextImage }: Props) {
  const containerRef   = useRef<HTMLDivElement>(null);
  const iconDivRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndex      = useRef(activeIndex);

  const [displayedImage, setDisplayedImage] = useState(nextImage);
  const [imgOpacity, setImgOpacity] = useState(1);

  // Animate icon bg on activeIndex change
  useGSAP(() => {
    const prev = prevIndex.current;
    const curr = activeIndex;
    if (prev === curr) return;

    gsap.to(iconDivRefs.current[prev], {
      backgroundColor: "transparent",
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(iconDivRefs.current[curr], {
      backgroundColor: "#ffffff",
      duration: 0.4,
      ease: "power2.out",
    });

    prevIndex.current = curr;
  }, { dependencies: [activeIndex], scope: containerRef });

  // Crossfade preview image
  useEffect(() => {
    const fadeOut = setTimeout(() => setImgOpacity(0), 0);
    const swap = setTimeout(() => {
      setDisplayedImage(nextImage);
      setImgOpacity(1);
    }, 300);
    return () => {
      clearTimeout(fadeOut);
      clearTimeout(swap);
    };
  }, [nextImage]);

  return (
    <div ref={containerRef}>
      {/* Icon row */}
      <div ref={iconsRef} className="absolute flex items-center gap-2.5" style={{ top: "58.1dvh", right: "4.93%" }}>
        {ICONS.map(({ name, icon }, i) => (
          <div
            key={name}
            ref={el => { iconDivRefs.current[i] = el; }}
            className="flex items-center justify-center w-10 h-10 text-[#585454]"
            style={{
              border: "1px solid rgba(255,255,255,0.7)",
              backgroundColor: i === activeIndex ? "white" : "transparent",
            }}
          >
            {icon}
          </div>
        ))}
      </div>

      {/* Next-slide preview */}
      <div
        ref={nutritionRef}
        className="absolute overflow-hidden rounded-xl"
        style={{ top: "72.1dvh", right: "4.38%", opacity: imgOpacity, transition: "opacity 0.3s ease" }}
      >
        <Image
          src={displayedImage}
          alt="Next slide preview"
          width={239}
          height={218}
          className="w-59.75 h-auto object-cover"
        />
      </div>
    </div>
  );
}
