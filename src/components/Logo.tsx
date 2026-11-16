export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 64 64" width="40" height="40" aria-hidden="true" className="shrink-0">
        <rect width="64" height="64" rx="14" fill="#0f2537" />
        <path
          d="M32 10 14 17v14c0 11.5 7.4 20 18 23 10.6-3 18-11.5 18-23V17Z"
          fill="none"
          stroke="#fbbf24"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="m24 41 8-20 8 20m-13-6.500h10"
          fill="none"
          stroke="#fff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display leading-tight">
        <span className="block text-lg font-extrabold tracking-tight whitespace-nowrap">Andrews Insurance</span>
        <span className="block text-xs font-semibold tracking-[0.18em] uppercase opacity-75">
          Agency
        </span>
      </span>
    </span>
  );
}
