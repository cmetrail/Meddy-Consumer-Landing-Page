"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FooterItems } from "@/features/home/components/sections/helper/FooterItems";

const ease = [0.22, 1, 0.36, 1] as const;

export default function WhyMeddyFooterSection() {
  return (
    <section className="relative w-full overflow-hidden text-white">
      <Image
        src="/why-meddy/6c4544264640d72d349c7f77f7eb2856c08a65eb.jpg"
        alt=""
        fill
        className="object-cover object-top"
      />


      <div className="relative mx-auto w-full max-w-360 px-5 min-h-[50dvh] lg:px-10 py-10">
      </div>

      <FooterItems />
    </section>
  );
}
