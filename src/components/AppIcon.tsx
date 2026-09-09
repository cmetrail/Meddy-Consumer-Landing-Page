import type { SVGProps } from "react";

type IconName = "stethoscope" | "utensils" | "dumbbell" | "moon-star";

const PATHS: Record<IconName, React.ReactNode> = {
  stethoscope: (
    <>
      <path d="M4.8 3H7.2C7.64 3 8 3.36 8 3.8V8C8 10.21 9.79 12 12 12C14.21 12 16 10.21 16 8V3.8C16 3.36 16.36 3 16.8 3H19.2" stroke="#585454" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12V15M12 15C10.34 15 9 16.34 9 18C9 19.66 10.34 21 12 21C13.66 21 15 19.66 15 18" stroke="#585454" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="18" r="2" stroke="#585454" strokeWidth="1.5" />
    </>
  ),
  utensils: (
    <path d="M3 2V8C3 10.21 4.79 12 7 12V22M7 2V8M11 2V8C11 10.21 12.79 12 15 12V22M21 2C21 2 21 8 18 10C15 12 15 22 15 22" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  dumbbell: (
    <path d="M6 4H8V20H6V4ZM16 4H18V20H16V4ZM4 9H6M18 9H20M4 15H6M18 15H20M8 11H16M2 8H4V16H2V8ZM20 8H22V16H20V8Z" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "moon-star": (
    <>
      <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 11.54 20.96 11.08 20.9 10.64C19.92 11.5 18.63 12 17.2 12C14.33 12 12 9.67 12 6.8C12 5.37 12.5 4.08 13.36 3.1C12.92 3.04 12.46 3 12 3Z" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 2L20 4L22 5L20 6L19 8L18 6L16 5L18 4L19 2Z" stroke="#BABABA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

export default function AppIcon({ name, size = 24, ...props }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
      {PATHS[name]}
    </svg>
  );
}
