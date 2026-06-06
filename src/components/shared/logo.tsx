import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 group ${className}`}>
      {/* Logo Mark */}
      <div className="relative w-8 h-8 flex-shrink-0">
        <div className="absolute inset-0 rounded-xl gradient-brand opacity-90 group-hover:opacity-100 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a7 7 0 0 1 0 20" />
            <path d="M12 2a7 7 0 0 0 0 20" />
            <path d="M2 12h20" />
          </svg>
        </div>
      </div>
      {/* Logo Text */}
      <span className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
        Ink<span className="gradient-text">Sphere</span>
      </span>
    </Link>
  );
}
