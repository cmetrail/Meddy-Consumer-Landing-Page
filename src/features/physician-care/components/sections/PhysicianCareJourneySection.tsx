import Image from "next/image";

export default function PhysicianCareJourneySection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FFFFF9]">
      <Image
        src="/physician-care/journey-section.png"
        alt="Care that grows with you"
        width={1440}
        height={1024}
        className="h-auto w-full"
      />
    </section>
  );
}
