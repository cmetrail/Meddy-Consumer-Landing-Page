import Header from "@/components/Header";
import type { LegalDoc } from "../types";
import LegalContent from "./LegalContent";
import LegalFooterSection from "./LegalFooterSection";

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <main
      className="min-h-dvh text-white"
      style={{
        background: [
          "radial-gradient(ellipse 60% 38% at 50% -6%, rgba(23,146,90,0.20), transparent 62%)",
          "radial-gradient(ellipse 45% 32% at 92% 16%, rgba(110,231,160,0.10), transparent 58%)",
          "radial-gradient(ellipse 55% 40% at 8% 60%, rgba(20,139,213,0.07), transparent 60%)",
          "linear-gradient(180deg, #0d100d 0%, #09090b 70%)",
        ].join(", "),
      }}
    >
      <div className="relative">
        <Header variant="dark" />
      </div>
      <LegalContent doc={doc} />
      <LegalFooterSection />
    </main>
  );
}
