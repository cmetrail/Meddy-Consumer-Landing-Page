"use client";

import Image from "next/image";

export default function PhysicianCareNewThirdSection() {
  return (
    <section data-pc-chapter="Care shaped around you" className="relative w-full overflow-hidden">
      <Image data-pc-scene-photo
        src="/physician-care/fd372ae309b265a5dac1a5ab5c7414fa3e72d66e.png"
        alt=""
        fill
        className="object-cover"
        priority
      />

      <div className="relative z-10 mx-auto flex min-h-[560px] w-full max-w-360 flex-col justify-center px-5 py-12 sm:min-h-[720px] lg:block lg:min-h-[1024px] lg:px-[75px] lg:py-0">
        <h2 data-pc-reveal
          className="max-w-[708px] font-dm-serif italic leading-[1.371] text-white text-[36px] sm:text-[56px] lg:absolute lg:left-0 lg:top-[499px] lg:text-[96px]"
        >
          Care that&rsquo;s unique for you
        </h2>

        <p data-pc-reveal
          className="mt-8 max-w-[439px] self-end text-right font-light uppercase leading-[1.3] text-white text-[16px] sm:text-[20px] lg:absolute lg:right-0 lg:top-[823px] lg:mt-0 lg:text-[24px]"
        >
          <b>Guidance shaped by your habits,</b>
          <br />
          <em>not population averages.</em>
        </p>
      </div>
    </section>
  );
}
