export default function GiantNumber({ n, className = "left-0" }: { n: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute select-none ${className}`}
      style={{
        top: 0,
        rotate: "0.31deg",
        opacity: 1,
        mixBlendMode: "plus-lighter",
        fontFamily: "Plus Jakarta Sans",
        fontWeight: 700,
        fontSize: "clamp(220px, 34vw, 500px)",
        lineHeight: "100%",
        letterSpacing: "2%",
        background: "linear-gradient(114deg, rgba(62, 161, 77, 0.05) 7%, rgba(23, 58, 30, 0.05) 71%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {n}
    </span>
  );
}
