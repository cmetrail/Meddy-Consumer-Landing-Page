type FaqIconProps = {
  open: boolean;
  className?: string;
};

export function FaqIcon({ open, className = "" }: FaqIconProps) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {open ? (
        <path d="M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ) : (
        <>
          <path d="M7 1V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
