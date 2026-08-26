export default function GiantNumber({ n }: { n: string }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute select-none font-bold leading-none"
      style={{
        fontSize: 500,
        top: -80,
        left: -40,
        background: "linear-gradient(114deg, rgba(62,161,77,0.05) 7%, rgba(23,58,30,0.05) 71%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {n}
    </span>
  );
}
