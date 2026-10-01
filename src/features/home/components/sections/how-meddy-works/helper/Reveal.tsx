export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div data-mobile-reveal className={className}>
      {children}
    </div>
  );
}
