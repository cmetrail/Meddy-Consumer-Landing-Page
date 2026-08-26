export default function GiantNumber({ n }: { n: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute select-none"
      style={{
        top: 0,
        left: 0,
        rotate: "0.31deg",
        opacity: 1,
        mixBlendMode: "plus-lighter",
        fontFamily: "Plus Jakarta Sans",
        fontWeight: 700,
        fontSize: "clamp(220px, 34vw, 500px)",
        lineHeight: "100%",
        letterSpacing: "2%",
        background: "linear-gradient(118.77deg, rgba(62, 161, 77, 0.05) 17.04%, rgba(23, 58, 30, 0.05) 68.57%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {n}
    </span>
  );
}
