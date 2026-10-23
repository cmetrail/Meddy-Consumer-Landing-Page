import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { href: "/how-it-works", label: "How Meddy works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/biomarkers", label: "Biomarkers" },
  { href: "/physician-care", label: "Physician care" },
  { href: "/why-meddy", label: "Why Meddy" },
];

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh w-full flex-1 flex-col items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#e6f7ff_0%,#ffffff_45%,#e4ffee_100%)] px-5 py-16 text-center">
      <Link href="/" aria-label="Meddy Health home" className="mb-12">
        <Image src="/meddy-emr-logo.svg" alt="Meddy Health" width={148} height={24} unoptimized className="h-[24px] w-auto" />
      </Link>

      <p className="text-[14px] font-medium leading-[1.5] text-[#17925a]">404</p>
      <h1 className="mt-2 text-[32px] font-medium leading-[1.5] text-[#17925a]">We can&apos;t find that page</h1>
      <p className="mt-2 max-w-[480px] text-[16px] leading-[1.5] text-[#7b7b7b]">
        The page may have moved or the link may be wrong. Head home, or try one of these.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-[16px]">
        <Link
          href="/"
          className="rounded-[35px] bg-[#17925a] px-[20px] py-[12px] text-[14px] leading-[1.5] text-white transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          href="/book-consultation"
          className="rounded-[35px] border border-solid border-[#17925a] px-[20px] py-[12px] text-[14px] leading-[1.5] text-[#111110] transition-colors hover:bg-[#17925a]/5"
        >
          Book a free consultation
        </Link>
      </div>

      <nav aria-label="Popular pages" className="mt-10">
        <ul className="flex flex-wrap items-center justify-center gap-x-[24px] gap-y-[8px] text-[14px] leading-[1.5]">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-[#46524b] underline underline-offset-2 hover:text-[#17925a]">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
