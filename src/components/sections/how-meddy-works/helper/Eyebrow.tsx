export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#ABB1AD] font-bold uppercase tracking-[0.02em] mb-4" style={{ fontSize: 20 }}>
      {children}
    </p>
  );
}
