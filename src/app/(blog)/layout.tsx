import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/shared/logo";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Blog Top Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 h-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="w-px h-4 bg-slate-200" />
            <span className="text-xs font-semibold text-slate-500 tracking-wider uppercase">Blog</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/signup"
              className="btn-primary inline-flex items-center gap-1.5 text-xs py-1.5 px-3.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 fill-white/20" />
              Create your Blog
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Blog Footer */}
      <footer className="border-t border-slate-100 bg-slate-50/50 py-12 mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg gradient-brand flex items-center justify-center text-[10px] font-bold text-white">
              IS
            </div>
            <span className="text-sm font-semibold text-slate-700">InkSphere Publications</span>
          </div>
          <p className="text-xs text-slate-400">
            Powered by <Link href="/" className="text-indigo-600 hover:underline">InkSphere SaaS Platforms</Link> · © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
