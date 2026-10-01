export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#ABB1AD] font-bold uppercase  tracking-[2%] leading-[100%] text-[26px] sm:text-[36px] lg:text-[48px]" >
      {children}
    </p>
  );
}
