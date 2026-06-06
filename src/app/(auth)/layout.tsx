export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 p-6 relative overflow-hidden">
      {/* Subtle decorative background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-indigo-100/40 via-purple-50/20 to-transparent blur-3xl -top-[400px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-blue-50/30 to-transparent blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* InkSphere Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a7 7 0 0 1 0 20" />
              <path d="M12 2a7 7 0 0 0 0 20" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            InkSphere
          </span>
          <span className="text-xs text-slate-400 mt-1 tracking-wide">
            Where Ideas Take Shape
          </span>
        </div>

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 p-8">
          {children}
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-slate-400 mt-6">
          © 2026 InkSphere. Trusted by 50,000+ creators worldwide.
        </p>
      </div>
    </div>
  );
}
